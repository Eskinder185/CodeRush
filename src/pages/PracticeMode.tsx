import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Target, Zap, Settings, Play, Pause, Shuffle } from 'lucide-react'
import CodeEditor from '../components/CodeEditor'
import SimpleCodeEditor from '../components/SimpleCodeEditor'
import SimpleCodeDisplay from '../components/SimpleCodeDisplay'
import ThemeSwitcher from '../components/ThemeSwitcher'
import MonacoErrorBoundary from '../components/MonacoErrorBoundary'

interface PracticeSettings {
  testLength: 'short' | 'medium' | 'long'
  includeSymbols: boolean
  includeNumbers: boolean
  theme: 'vs-code-dark' | 'monokai' | 'solarized'
}

const PracticeMode = () => {
  const { language } = useParams<{ language: string }>()
  const [userInput, setUserInput] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [accuracy, setAccuracy] = useState(100)
  const [wpm, setWpm] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [currentSnippet, setCurrentSnippet] = useState('')
  const [editorTheme, setEditorTheme] = useState('vs-dark')

  const [settings, setSettings] = useState<PracticeSettings>({
    testLength: 'medium',
    includeSymbols: true,
    includeNumbers: true,
    theme: 'vs-code-dark'
  })

  const currentLanguage = language || 'javascript'

  // Sample code snippets for different languages
  const codeSnippets: Record<string, string[]> = {
    javascript: [
      `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a, b) => a + b;

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(greet("World"));
console.log(add(5, 3));
console.log(doubled);
console.log(sum);`,
      `// Object destructuring
const user = { name: "Alice", age: 30, city: "New York" };
const { name, age, city } = user;

// Template literals
const message = \`User \${name} is \${age} years old and lives in \${city}.\`;

// Conditional rendering
const isLoggedIn = true;
const displayName = isLoggedIn ? name : "Guest";

// Array destructuring
const colors = ["red", "green", "blue"];
const [primary, secondary, tertiary] = colors;

console.log(message);
console.log(displayName);
console.log(primary, secondary, tertiary);`
    ],
    python: [
      `# Function definition
def greet(name):
    return f"Hello, {name}!"

# Lambda function
add = lambda a, b: a + b

# List comprehension
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
total = sum(numbers)

print(greet("World"))
print(add(5, 3))
print(doubled)
print(total)`,
      `# Dictionary operations
user = {"name": "Alice", "age": 30, "city": "New York"}
name = user["name"]
age = user.get("age", 0)

# String formatting
message = f"User {name} is {age} years old and lives in {user['city']}."

# Conditional expression
is_logged_in = True
display_name = name if is_logged_in else "Guest"

# Tuple unpacking
colors = ("red", "green", "blue")
primary, secondary, tertiary = colors

print(message)
print(display_name)
print(primary, secondary, tertiary)`
    ],
    java: [
      `// Class definition
public class Calculator {
    private int result;
    
    public Calculator() {
        this.result = 0;
    }
    
    public int add(int a, int b) {
        return a + b;
    }
    
    public int multiply(int a, int b) {
        return a * b;
    }
    
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("Sum: " + calc.add(5, 3));
        System.out.println("Product: " + calc.multiply(4, 6));
    }
}`,
      `// Interface and implementation
interface Drawable {
    void draw();
    void resize(int width, int height);
}

class Circle implements Drawable {
    private int radius;
    
    public Circle(int radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius: " + radius);
    }
    
    @Override
    public void resize(int width, int height) {
        this.radius = Math.min(width, height) / 2;
    }
}`
    ]
  }

  useEffect(() => {
    generateNewSnippet()
  }, [language, settings.testLength])

  useEffect(() => {
    let interval: number | null = null
    
    if (isTyping && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTyping, isPaused])

  const generateNewSnippet = () => {
    const snippets = codeSnippets[currentLanguage] || codeSnippets.javascript
    const randomIndex = Math.floor(Math.random() * snippets.length)
    setCurrentSnippet(snippets[randomIndex])
    resetPractice()
  }

  const handleTypingChange = (input: string, isComplete: boolean) => {
    setUserInput(input)
    
    if (!isTyping && input.length > 0) {
      setIsTyping(true)
    }
    
    if (isComplete) {
      setIsTyping(false)
      // Auto-generate new snippet after completion
      setTimeout(() => {
        generateNewSnippet()
      }, 2000)
    }
  }

  const handleStatsUpdate = (stats: { wpm: number; accuracy: number; mistakes: number }) => {
    setWpm(stats.wpm)
    setAccuracy(stats.accuracy)
  }


  const resetPractice = () => {
    setUserInput('')
    setTimeElapsed(0)
    setIsTyping(false)
    setIsPaused(false)
    setAccuracy(100)
    setWpm(0)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    return Math.round((userInput.length / currentSnippet.length) * 100)
  }

  return (
    <motion.div
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to={`/languages/${language}/lessons`} 
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="text-gradient">Free Practice Mode</span>
              </h1>
              <p className="text-gray-400">
                Practice with random code snippets in {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeSwitcher 
              currentTheme={editorTheme} 
              onThemeChange={setEditorTheme} 
            />
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="btn-secondary flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
            {isTyping && (
              <button
                onClick={togglePause}
                className="btn-secondary flex items-center"
              >
                {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            )}
            <button
              onClick={generateNewSnippet}
              className="btn-secondary flex items-center"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              New Snippet
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <motion.div
            className="card mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Practice Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Test Length</label>
                <select
                  value={settings.testLength}
                  onChange={(e) => setSettings({...settings, testLength: e.target.value as any})}
                  className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-white"
                >
                  <option value="short">Short (1-2 lines)</option>
                  <option value="medium">Medium (3-5 lines)</option>
                  <option value="long">Long (6+ lines)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Include Symbols</label>
                <input
                  type="checkbox"
                  checked={settings.includeSymbols}
                  onChange={(e) => setSettings({...settings, includeSymbols: e.target.checked})}
                  className="w-4 h-4 text-neon-blue bg-dark-card border-dark-border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Include Numbers</label>
                <input
                  type="checkbox"
                  checked={settings.includeNumbers}
                  onChange={(e) => setSettings({...settings, includeNumbers: e.target.checked})}
                  className="w-4 h-4 text-neon-blue bg-dark-card border-dark-border rounded"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-gray-400">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-dark-border rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Code to Type</h2>
              <span className="text-sm text-gray-400">
                {currentSnippet.split('\n').length} lines
              </span>
            </div>
            
            {/* Code Display - Always Visible */}
            <div className="mb-4">
              <SimpleCodeDisplay 
                code={currentSnippet} 
                language={currentLanguage} 
              />
            </div>
            
            <MonacoErrorBoundary
              fallback={
                <SimpleCodeEditor
                  code={currentSnippet}
                  language={currentLanguage}
                  onTypingChange={handleTypingChange}
                  onStatsUpdate={handleStatsUpdate}
                  isPaused={isPaused}
                  onPauseToggle={togglePause}
                  onReset={resetPractice}
                  theme={editorTheme}
                  showLineNumbers={true}
                  showStatusBar={true}
                />
              }
            >
              <CodeEditor
                code={currentSnippet}
                language={currentLanguage}
                onTypingChange={handleTypingChange}
                onStatsUpdate={handleStatsUpdate}
                isPaused={isPaused}
                onPauseToggle={togglePause}
                onReset={resetPractice}
                theme={editorTheme}
                showLineNumbers={true}
                showStatusBar={true}
              />
            </MonacoErrorBoundary>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card text-center">
              <Clock className="w-6 h-6 text-neon-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-gray-400">Time</div>
            </div>
            <div className="card text-center">
              <Target className="w-6 h-6 text-neon-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="card text-center">
              <Zap className="w-6 h-6 text-neon-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{wpm}</div>
              <div className="text-sm text-gray-400">WPM</div>
            </div>
          </motion.div>

          {/* Practice Tips */}
          <motion.div
            className="card bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3">Practice Tips</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Focus on accuracy over speed initially</li>
              <li>• Use proper indentation and spacing</li>
              <li>• Practice regularly to build muscle memory</li>
              <li>• Try different test lengths to challenge yourself</li>
              <li>• Use the settings to customize your practice</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default PracticeMode