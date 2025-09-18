import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Play, Clock, Target, BookOpen, Trophy, TrendingUp } from 'lucide-react'
import { getLanguageTrack, getLessonsByDifficulty } from '../data/lessons'
import { getLanguageProgress } from '../utils/stats'

const LanguageLessons = () => {
  const { language } = useParams<{ language: string }>()
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('all')
  
  const track = getLanguageTrack(language || '')
  const progress = getLanguageProgress(language || '')
  
  if (!track) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Language not found</h1>
          <Link to="/languages" className="btn-primary">
            Back to Languages
          </Link>
        </div>
      </div>
    )
  }

  const filteredLessons = selectedDifficulty === 'all' 
    ? track.lessons 
    : getLessonsByDifficulty(language || '', selectedDifficulty)

  const difficultyStats = {
    beginner: track.lessons.filter(l => l.difficulty === 'beginner').length,
    intermediate: track.lessons.filter(l => l.difficulty === 'intermediate').length,
    advanced: track.lessons.filter(l => l.difficulty === 'advanced').length
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/languages" 
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Languages
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient">{track.languageName}</span> Lessons
              </h1>
              <p className="text-gray-400">
                Master {track.languageName} with structured lessons
              </p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={itemVariants}
        >
          <div className="card text-center">
            <BookOpen className="w-8 h-8 text-neon-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{progress.completedLessons}/{track.lessons.length}</div>
            <div className="text-sm text-gray-400">Lessons Completed</div>
          </div>
          <div className="card text-center">
            <TrendingUp className="w-8 h-8 text-neon-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{progress.averageWpm}</div>
            <div className="text-sm text-gray-400">Average WPM</div>
          </div>
          <div className="card text-center">
            <Target className="w-8 h-8 text-neon-blue mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{progress.averageAccuracy}%</div>
            <div className="text-sm text-gray-400">Average Accuracy</div>
          </div>
          <div className="card text-center">
            <Clock className="w-8 h-8 text-neon-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{Math.round(progress.totalTimeSpent / 60)}m</div>
            <div className="text-sm text-gray-400">Time Practiced</div>
          </div>
        </motion.div>

        {/* Difficulty Filter */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedDifficulty === 'all'
                  ? 'bg-neon-blue text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
              }`}
            >
              All Lessons ({track.lessons.length})
            </button>
            <button
              onClick={() => setSelectedDifficulty('beginner')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedDifficulty === 'beginner'
                  ? 'bg-green-600 text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
              }`}
            >
              Beginner ({difficultyStats.beginner})
            </button>
            <button
              onClick={() => setSelectedDifficulty('intermediate')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedDifficulty === 'intermediate'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
              }`}
            >
              Intermediate ({difficultyStats.intermediate})
            </button>
            <button
              onClick={() => setSelectedDifficulty('advanced')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedDifficulty === 'advanced'
                  ? 'bg-red-600 text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border'
              }`}
            >
              Advanced ({difficultyStats.advanced})
            </button>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          className="grid gap-6"
          variants={containerVariants}
        >
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className="card group hover:scale-[1.02] transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lesson.difficulty === 'beginner' ? 'bg-green-600/20 text-green-400' :
                      lesson.difficulty === 'intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.expectedTime} min
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    {lesson.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lesson.concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-dark-bg border border-dark-border rounded text-xs text-gray-300"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="ml-6">
                  <Link
                    to={`/languages/${language}/lesson/${lesson.id}`}
                    className="btn-primary flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Lesson
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Practice Mode CTA */}
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <div className="card bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Want More Practice?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Try our free practice mode with customizable settings, random code snippets, 
              and unlimited practice sessions.
            </p>
            <Link
              to={`/languages/${language}/practice`}
              className="btn-secondary"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Free Practice Mode
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LanguageLessons
