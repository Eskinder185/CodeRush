import { UserStats } from '../data/lessons'

export type { UserStats }

const STATS_KEY = 'coderush_user_stats'

export interface LanguageProgress {
  language: string
  totalLessons: number
  completedLessons: number
  averageWpm: number
  averageAccuracy: number
  totalTimeSpent: number
  lastPracticed: Date | null
}

export interface OverallStats {
  totalWpm: number
  totalAccuracy: number
  totalTimeSpent: number
  totalLessonsCompleted: number
  languagesPracticed: string[]
}

export const saveStats = (stats: UserStats): void => {
  try {
    const existingStats = getStoredStats()
    const updatedStats = [...existingStats, stats]
    localStorage.setItem(STATS_KEY, JSON.stringify(updatedStats))
  } catch (error) {
    console.error('Failed to save stats:', error)
  }
}

export const getStoredStats = (): UserStats[] => {
  try {
    const stored = localStorage.getItem(STATS_KEY)
    if (!stored) return []
    
    const stats = JSON.parse(stored)
    // Convert date strings back to Date objects
    return stats.map((stat: any) => ({
      ...stat,
      completedAt: new Date(stat.completedAt)
    }))
  } catch (error) {
    console.error('Failed to load stats:', error)
    return []
  }
}

export const getLanguageProgress = (language: string): LanguageProgress => {
  const allStats = getStoredStats()
  const languageStats = allStats.filter(stat => stat.language === language)
  
  if (languageStats.length === 0) {
    return {
      language,
      totalLessons: 0,
      completedLessons: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      totalTimeSpent: 0,
      lastPracticed: null
    }
  }
  
  const completedLessons = new Set(languageStats.map(stat => stat.lessonId)).size
  const averageWpm = languageStats.reduce((sum, stat) => sum + stat.wpm, 0) / languageStats.length
  const averageAccuracy = languageStats.reduce((sum, stat) => sum + stat.accuracy, 0) / languageStats.length
  const totalTimeSpent = languageStats.reduce((sum, stat) => sum + stat.timeSpent, 0)
  const lastPracticed = languageStats.reduce((latest, stat) => 
    stat.completedAt > latest ? stat.completedAt : latest, 
    new Date(0)
  )
  
  return {
    language,
    totalLessons: languageStats.length, // This should be total available lessons
    completedLessons,
    averageWpm: Math.round(averageWpm),
    averageAccuracy: Math.round(averageAccuracy),
    totalTimeSpent,
    lastPracticed: lastPracticed.getTime() > 0 ? lastPracticed : null
  }
}

export const getOverallStats = (): OverallStats => {
  const allStats = getStoredStats()
  
  if (allStats.length === 0) {
    return {
      totalWpm: 0,
      totalAccuracy: 0,
      totalTimeSpent: 0,
      totalLessonsCompleted: 0,
      languagesPracticed: []
    }
  }
  
  const totalWpm = allStats.reduce((sum, stat) => sum + stat.wpm, 0) / allStats.length
  const totalAccuracy = allStats.reduce((sum, stat) => sum + stat.accuracy, 0) / allStats.length
  const totalTimeSpent = allStats.reduce((sum, stat) => sum + stat.timeSpent, 0)
  const totalLessonsCompleted = new Set(allStats.map(stat => `${stat.language}-${stat.lessonId}`)).size
  const languagesPracticed = [...new Set(allStats.map(stat => stat.language))]
  
  return {
    totalWpm: Math.round(totalWpm),
    totalAccuracy: Math.round(totalAccuracy),
    totalTimeSpent,
    totalLessonsCompleted,
    languagesPracticed
  }
}

export const clearStats = (): void => {
  localStorage.removeItem(STATS_KEY)
}

export const exportStats = (): string => {
  const stats = getStoredStats()
  return JSON.stringify(stats, null, 2)
}

export const importStats = (jsonData: string): boolean => {
  try {
    const stats = JSON.parse(jsonData)
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
    return true
  } catch (error) {
    console.error('Failed to import stats:', error)
    return false
  }
}
