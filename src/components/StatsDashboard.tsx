import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Clock, Trophy, BarChart3, Award } from 'lucide-react'
import { getOverallStats, getLanguageProgress, LanguageProgress } from '../utils/stats'
import { languageTracks } from '../data/lessons'

const StatsDashboard = () => {
  const [overallStats, setOverallStats] = useState(getOverallStats())
  const [languageProgress, setLanguageProgress] = useState<LanguageProgress[]>([])

  useEffect(() => {
    const progress = languageTracks.map(track => getLanguageProgress(track.language))
    setLanguageProgress(progress)
    setOverallStats(getOverallStats())
  }, [])

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

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-green-600'
    if (percentage >= 60) return 'from-yellow-500 to-yellow-600'
    if (percentage >= 40) return 'from-orange-500 to-orange-600'
    return 'from-red-500 to-red-600'
  }

  const getLanguageName = (language: string) => {
    const track = languageTracks.find(t => t.language === language)
    return track?.languageName || language
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Overall Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={itemVariants}
      >
        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-neon-blue mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{overallStats.totalWpm}</div>
          <div className="text-sm text-gray-400">Average WPM</div>
        </div>
        <div className="card text-center">
          <Target className="w-8 h-8 text-neon-purple mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{overallStats.totalAccuracy}%</div>
          <div className="text-sm text-gray-400">Average Accuracy</div>
        </div>
        <div className="card text-center">
          <Clock className="w-8 h-8 text-neon-blue mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{Math.round(overallStats.totalTimeSpent / 60)}m</div>
          <div className="text-sm text-gray-400">Total Time</div>
        </div>
        <div className="card text-center">
          <Trophy className="w-8 h-8 text-neon-purple mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{overallStats.totalLessonsCompleted}</div>
          <div className="text-sm text-gray-400">Lessons Completed</div>
        </div>
      </motion.div>

      {/* Language Progress */}
      <motion.div
        className="card"
        variants={itemVariants}
      >
        <div className="flex items-center mb-6">
          <BarChart3 className="w-6 h-6 text-neon-blue mr-3" />
          <h2 className="text-2xl font-bold text-white">Language Progress</h2>
        </div>
        
        <div className="space-y-6">
          {languageProgress.map((progress, index) => {
            const completionPercentage = progress.totalLessons > 0 
              ? Math.round((progress.completedLessons / progress.totalLessons) * 100)
              : 0
            
            return (
              <motion.div
                key={progress.language}
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-white">
                      {getLanguageName(progress.language)}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {progress.completedLessons}/{progress.totalLessons} lessons
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{completionPercentage}%</div>
                    <div className="text-sm text-gray-400">
                      {progress.averageWpm} WPM, {progress.averageAccuracy}% acc
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-dark-border rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(completionPercentage)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                
                {progress.lastPracticed && (
                  <div className="text-sm text-gray-400">
                    Last practiced: {progress.lastPracticed.toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="card"
        variants={itemVariants}
      >
        <div className="flex items-center mb-6">
          <Award className="w-6 h-6 text-neon-purple mr-3" />
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {overallStats.totalLessonsCompleted >= 1 && (
            <div className="flex items-center space-x-3 p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
              <Trophy className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-sm font-semibold text-white">First Steps</div>
                <div className="text-xs text-gray-400">Complete your first lesson</div>
              </div>
            </div>
          )}
          
          {overallStats.totalLessonsCompleted >= 5 && (
            <div className="flex items-center space-x-3 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <Award className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-sm font-semibold text-white">Getting Started</div>
                <div className="text-xs text-gray-400">Complete 5 lessons</div>
              </div>
            </div>
          )}
          
          {overallStats.totalWpm >= 30 && (
            <div className="flex items-center space-x-3 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-sm font-semibold text-white">Speed Demon</div>
                <div className="text-xs text-gray-400">Achieve 30+ WPM</div>
              </div>
            </div>
          )}
          
          {overallStats.totalAccuracy >= 95 && (
            <div className="flex items-center space-x-3 p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <Target className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-sm font-semibold text-white">Precision Master</div>
                <div className="text-xs text-gray-400">Achieve 95%+ accuracy</div>
              </div>
            </div>
          )}
          
          {overallStats.languagesPracticed.length >= 3 && (
            <div className="flex items-center space-x-3 p-3 bg-red-600/20 border border-red-500/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-sm font-semibold text-white">Polyglot</div>
                <div className="text-xs text-gray-400">Practice 3+ languages</div>
              </div>
            </div>
          )}
          
          {overallStats.totalTimeSpent >= 3600 && (
            <div className="flex items-center space-x-3 p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
              <Clock className="w-6 h-6 text-indigo-400" />
              <div>
                <div className="text-sm font-semibold text-white">Dedicated Learner</div>
                <div className="text-xs text-gray-400">Practice for 1+ hours</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StatsDashboard
