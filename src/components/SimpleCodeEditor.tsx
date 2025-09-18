import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface SimpleCodeEditorProps {
  code: string
  language: string
  onTypingChange: (userInput: string, isComplete: boolean) => void
  onStatsUpdate: (stats: { wpm: number; accuracy: number; mistakes: number }) => void
  isPaused?: boolean
  onPauseToggle?: () => void
  onReset?: () => void
  readOnly?: boolean
  theme?: string
  showLineNumbers?: boolean
  showStatusBar?: boolean
}

const SimpleCodeEditor = ({
  code,
  language,
  onTypingChange,
  onStatsUpdate,
  isPaused = false,
  onPauseToggle,
  onReset,
  readOnly = false,
  showLineNumbers = true,
  showStatusBar = true
}: SimpleCodeEditorProps) => {
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [currentLine, setCurrentLine] = useState(1)
  const [currentColumn, setCurrentColumn] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  useEffect(() => {
    if (userInput.length > 0 && !isTyping) {
      setIsTyping(true)
      setStartTime(Date.now())
    }
    
    // Calculate accuracy and mistakes
    const correctChars = code.slice(0, userInput.length).split('').filter((char, index) => 
      char === userInput[index]
    ).length
    
    const currentMistakes = userInput.length - correctChars
    const currentAccuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100

    setMistakes(currentMistakes)
    setAccuracy(Math.round(currentAccuracy))

    // Calculate WPM
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // minutes
      const words = userInput.split(' ').length
      const currentWpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0
      setWpm(currentWpm)
      
      onStatsUpdate({ wpm: currentWpm, accuracy: currentAccuracy, mistakes: currentMistakes })
    }
    
    // Check if complete
    const isComplete = userInput.length === code.length && userInput === code
    onTypingChange(userInput, isComplete)
    
    // Update line/column
    const lines = userInput.split('\n')
    setCurrentLine(lines.length)
    setCurrentColumn(lines[lines.length - 1].length + 1)
  }, [userInput, startTime, isTyping, code, onTypingChange, onStatsUpdate])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value)
  }

  const handleReset = () => {
    setUserInput('')
    setIsTyping(false)
    setStartTime(null)
    setMistakes(0)
    setWpm(0)
    setAccuracy(100)
    setCurrentLine(1)
    setCurrentColumn(1)
    onReset?.()
  }

  const getLanguageDisplayName = (lang: string) => {
    const languageMap: Record<string, string> = {
      'python': 'Python',
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'java': 'Java',
      'cpp': 'C++',
      'html': 'HTML',
      'css': 'CSS',
      'sql': 'SQL',
      'bash': 'Bash',
      'go': 'Go'
    }
    return languageMap[lang] || lang.toUpperCase()
  }


  return (
    <div className="relative">
      {/* Editor Container */}
      <div className="border border-dark-border rounded-lg overflow-hidden">
        {/* Editor Header */}
        <div className="bg-dark-card border-b border-dark-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-400 font-mono">
              {getLanguageDisplayName(language)} • {code.split('\n').length} lines
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {onPauseToggle && (
              <button
                onClick={onPauseToggle}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? '▶️' : '⏸️'}
              </button>
            )}
            {onReset && (
              <button
                onClick={handleReset}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Reset"
              >
                🔄
              </button>
            )}
          </div>
        </div>

        {/* Code Display */}
        <div className="relative">
          <SyntaxHighlighter
            language={language === 'python' ? 'python' : language === 'javascript' ? 'javascript' : 'text'}
            style={vscDarkPlus}
            className="syntax-highlighter"
            showLineNumbers={showLineNumbers}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        {/* Typing Area */}
        <div className="border-t border-dark-border">
          <textarea
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type the code above to start practicing..."
            className="w-full h-40 bg-dark-bg border-0 p-4 text-white font-mono text-sm resize-none focus:outline-none transition-colors duration-300"
            spellCheck={false}
            disabled={readOnly}
            style={{ 
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* Status Bar */}
        {showStatusBar && (
          <div className="bg-dark-card border-t border-dark-border px-4 py-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Ln {currentLine}, Col {currentColumn}</span>
              <span>UTF-8</span>
              <span>{getLanguageDisplayName(language)}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{userInput.length}/{code.length} chars</span>
              <span>{wpm} WPM</span>
              <span>{accuracy}% acc</span>
              <span>{mistakes} errors</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleCodeEditor
