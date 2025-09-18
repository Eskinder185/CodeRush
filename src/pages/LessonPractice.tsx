import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Target, Zap, CheckCircle, Play, Pause } from 'lucide-react'
import { getLesson } from '../data/lessons'
import { saveStats, UserStats } from '../utils/stats'
import CodeEditor from '../components/CodeEditor'
import SimpleCodeEditor from '../components/SimpleCodeEditor'
import SimpleCodeDisplay from '../components/SimpleCodeDisplay'
import ThemeSwitcher from '../components/ThemeSwitcher'
import MonacoErrorBoundary from '../components/MonacoErrorBoundary'

const LessonPractice = () => {
  const { language, lessonId } = useParams<{ language: string; lessonId: string }>()
  const [userInput, setUserInput] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [accuracy, setAccuracy] = useState(100)
  const [wpm, setWpm] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [symbolsMissed, setSymbolsMissed] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [editorTheme, setEditorTheme] = useState('vs-dark')

  const lesson = getLesson(language || '', lessonId || '')
  
  if (!lesson) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
          <p className="text-gray-400 mb-6">The lesson you're looking for doesn't exist.</p>
          <Link to="/languages" className="btn-primary">
            Back to Languages
          </Link>
        </div>
      </div>
    )
  }

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

  const handleTypingChange = (input: string, isComplete: boolean) => {
    setUserInput(input)
    
    if (!isTyping && input.length > 0) {
      setIsTyping(true)
    }
    
    if (isComplete) {
      setIsTyping(false)
      setIsCompleted(true)
      saveLessonStats()
    }
  }

  const saveLessonStats = () => {
    const stats: UserStats = {
      language: language || '',
      lessonId: lessonId || '',
      wpm,
      accuracy,
      mistakes,
      timeSpent: timeElapsed,
      completedAt: new Date(),
      symbolsMissed
    }
    saveStats(stats)
  }

  const handleStatsUpdate = (stats: { wpm: number; accuracy: number; mistakes: number }) => {
    setWpm(stats.wpm)
    setAccuracy(stats.accuracy)
    setMistakes(stats.mistakes)
  }


  const resetPractice = () => {
    setUserInput('')
    setTimeElapsed(0)
    setIsTyping(false)
    setIsPaused(false)
    setAccuracy(100)
    setWpm(0)
    setMistakes(0)
    setSymbolsMissed([])
    setIsCompleted(false)
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
    return Math.round((userInput.length / lesson.code.length) * 100)
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
                <span className="text-gradient">{lesson.title}</span>
              </h1>
              <p className="text-gray-400">
                {lesson.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeSwitcher 
              currentTheme={editorTheme} 
              onThemeChange={setEditorTheme} 
            />
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
              onClick={resetPractice}
              className="btn-secondary flex items-center"
            >
              Reset
            </button>
          </div>
        </div>

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
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                lesson.difficulty === 'beginner' ? 'bg-green-600/20 text-green-400' :
                lesson.difficulty === 'intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                'bg-red-600/20 text-red-400'
              }`}>
                {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
              </span>
            </div>
            
            {/* Code Display - Always Visible */}
            <div className="mb-4">
              <SimpleCodeDisplay 
                code={lesson.code} 
                language={language || 'text'} 
              />
            </div>
            
            <MonacoErrorBoundary
              fallback={
                <SimpleCodeEditor
                  code={lesson.code}
                  language={language || 'text'}
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
                code={lesson.code}
                language={language || 'text'}
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

          {/* Completion Message */}
          {isCompleted && (
            <motion.div
              className="card bg-gradient-to-r from-green-600/20 to-green-500/20 border-green-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Lesson Completed!</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Final WPM:</span>
                  <span className="text-white ml-2 font-semibold">{wpm}</span>
                </div>
                <div>
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-white ml-2 font-semibold">{accuracy}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white ml-2 font-semibold">{formatTime(timeElapsed)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Mistakes:</span>
                  <span className="text-white ml-2 font-semibold">{mistakes}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Concepts Learned */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3">Concepts in This Lesson</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm"
                >
                  {concept}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default LessonPractice