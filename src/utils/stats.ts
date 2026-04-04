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

/** Export file format version (bump when shape changes). */
export const STATS_EXPORT_VERSION = 1 as const

/**
 * Derive character counts and CPM for a session. Uses stored totals when present;
 * otherwise infers from accuracy, mistakes, WPM, and time (for older localStorage rows).
 */
export function sessionCharMetrics(s: UserStats): { totalTyped: number; correct: number; cpm: number } {
  if (
    typeof s.totalChars === 'number' &&
    typeof s.correctChars === 'number' &&
    typeof s.cpm === 'number'
  ) {
    return { totalTyped: s.totalChars, correct: s.correctChars, cpm: s.cpm }
  }

  const minutes = Math.max(s.timeSpent / 60, 1 / 60)
  const mistakes = s.mistakes
  const acc = s.accuracy / 100

  if (mistakes === 0) {
    if (acc >= 0.999) {
      const correct = Math.max(0, Math.round(s.wpm * minutes * 5))
      return {
        totalTyped: correct,
        correct,
        cpm: Math.round(correct / minutes),
      }
    }
    return { totalTyped: 0, correct: 0, cpm: 0 }
  }

  const denom = 1 - acc
  if (denom <= 0.0001) {
    const totalTyped = mistakes
    return {
      totalTyped,
      correct: Math.max(0, totalTyped - mistakes),
      cpm: Math.round(totalTyped / minutes),
    }
  }

  const totalTyped = Math.round(mistakes / denom)
  const correct = Math.max(0, totalTyped - mistakes)
  return {
    totalTyped,
    correct,
    cpm: Math.round(totalTyped / minutes),
  }
}

function formatPracticeDuration(totalSeconds: number): string {
  const sec = Math.max(0, Math.floor(totalSeconds))
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export interface CodeRushStatsExport {
  exportVersion: typeof STATS_EXPORT_VERSION
  app: 'CodeRush'
  exportedAt: string
  summary: {
    sessionCount: number
    uniqueLessonCompletions: number
    totalPracticeTimeSeconds: number
    totalPracticeTimeDisplay: string
    averageWpm: number
    averageAccuracy: number
    bestWpm: number
    bestCpm: number
    totalTypedCharacters: number
    totalCorrectCharacters: number
  }
  byLanguage: Record<
    string,
    {
      sessionCount: number
      totalPracticeTimeSeconds: number
      averageWpm: number
      averageAccuracy: number
      bestWpm: number
      bestCpm: number
      typedCharacters: number
      correctCharacters: number
    }
  >
  /** Same shape as localStorage rows (ISO dates); safe to re-import via Import. */
  sessions: Array<{
    language: string
    lessonId: string
    wpm: number
    cpm: number
    accuracy: number
    timeSpent: number
    mistakes: number
    symbolsMissed: string[]
    completedAt: string
    totalChars: number
    correctChars: number
  }>
}

export function buildStatsExportDocument(): CodeRushStatsExport {
  const raw = getStoredStats()
  const sessions = raw.map((s) => {
    const { totalTyped, correct, cpm } = sessionCharMetrics(s)
    return {
      language: s.language,
      lessonId: s.lessonId,
      wpm: s.wpm,
      cpm,
      accuracy: s.accuracy,
      timeSpent: s.timeSpent,
      mistakes: s.mistakes,
      symbolsMissed: s.symbolsMissed,
      completedAt: s.completedAt.toISOString(),
      totalChars: s.totalChars ?? totalTyped,
      correctChars: s.correctChars ?? correct,
    }
  })

  const totalPracticeTimeSeconds = raw.reduce((sum, s) => sum + s.timeSpent, 0)
  const uniqueLessonCompletions = new Set(raw.map((s) => `${s.language}-${s.lessonId}`)).size
  const sessionCount = raw.length

  let averageWpm = 0
  let averageAccuracy = 0
  let bestWpm = 0
  let bestCpm = 0
  let totalTypedCharacters = 0
  let totalCorrectCharacters = 0

  if (sessionCount > 0) {
    averageWpm = Math.round(raw.reduce((sum, s) => sum + s.wpm, 0) / sessionCount)
    averageAccuracy = Math.round(raw.reduce((sum, s) => sum + s.accuracy, 0) / sessionCount)
    bestWpm = Math.max(...raw.map((s) => s.wpm))
    bestCpm = Math.max(...raw.map((s) => sessionCharMetrics(s).cpm))
    totalTypedCharacters = raw.reduce((sum, s) => sum + sessionCharMetrics(s).totalTyped, 0)
    totalCorrectCharacters = raw.reduce((sum, s) => sum + sessionCharMetrics(s).correct, 0)
  }

  const byLanguage: CodeRushStatsExport['byLanguage'] = {}
  const langKeys = [...new Set(raw.map((s) => s.language))]
  for (const lang of langKeys) {
    const subs = raw.filter((s) => s.language === lang)
    const n = subs.length
    const times = subs.reduce((sum, s) => sum + s.timeSpent, 0)
    const typedSum = subs.reduce((sum, s) => sum + sessionCharMetrics(s).totalTyped, 0)
    const correctSum = subs.reduce((sum, s) => sum + sessionCharMetrics(s).correct, 0)
    byLanguage[lang] = {
      sessionCount: n,
      totalPracticeTimeSeconds: times,
      averageWpm: n ? Math.round(subs.reduce((sum, s) => sum + s.wpm, 0) / n) : 0,
      averageAccuracy: n ? Math.round(subs.reduce((sum, s) => sum + s.accuracy, 0) / n) : 0,
      bestWpm: n ? Math.max(...subs.map((s) => s.wpm)) : 0,
      bestCpm: n ? Math.max(...subs.map((s) => sessionCharMetrics(s).cpm)) : 0,
      typedCharacters: typedSum,
      correctCharacters: correctSum,
    }
  }

  return {
    exportVersion: STATS_EXPORT_VERSION,
    app: 'CodeRush',
    exportedAt: new Date().toISOString(),
    summary: {
      sessionCount,
      uniqueLessonCompletions,
      totalPracticeTimeSeconds,
      totalPracticeTimeDisplay: formatPracticeDuration(totalPracticeTimeSeconds),
      averageWpm,
      averageAccuracy,
      bestWpm,
      bestCpm,
      totalTypedCharacters,
      totalCorrectCharacters,
    },
    byLanguage,
    sessions,
  }
}

/** Pretty-printed JSON for the full export document (includes summary + sessions). */
export function formatStatsExportJson(): string {
  return JSON.stringify(buildStatsExportDocument(), null, 2)
}

/**
 * Trigger a browser download of stats JSON (GitHub Pages–safe: Blob + temporary object URL).
 */
export function downloadStatsExport(): void {
  const json = formatStatsExportJson()
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const d = new Date()
  const y = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  a.href = url
  a.download = `coderush-stats-${y}-${mo}-${day}.json`
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** @deprecated Prefer downloadStatsExport or formatStatsExportJson for the rich export. */
export const exportStats = formatStatsExportJson

export const importStats = (jsonData: string): boolean => {
  try {
    const parsed = JSON.parse(jsonData) as unknown
    let rows: unknown
    if (Array.isArray(parsed)) {
      rows = parsed
    } else if (
      parsed &&
      typeof parsed === 'object' &&
      parsed !== null &&
      'sessions' in parsed &&
      Array.isArray((parsed as { sessions: unknown }).sessions)
    ) {
      rows = (parsed as { sessions: unknown[] }).sessions
    } else {
      return false
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      return false
    }

    const normalized = rows.map((row: Record<string, unknown>) => ({
      language: row.language,
      lessonId: row.lessonId,
      wpm: row.wpm,
      accuracy: row.accuracy,
      timeSpent: row.timeSpent,
      completedAt: row.completedAt,
      mistakes: row.mistakes ?? 0,
      symbolsMissed: Array.isArray(row.symbolsMissed) ? row.symbolsMissed : [],
      ...(typeof row.cpm === 'number' ? { cpm: row.cpm } : {}),
      ...(typeof row.totalChars === 'number' ? { totalChars: row.totalChars } : {}),
      ...(typeof row.correctChars === 'number' ? { correctChars: row.correctChars } : {}),
    }))

    for (const row of normalized) {
      if (
        typeof row.language !== 'string' ||
        typeof row.lessonId !== 'string' ||
        row.completedAt == null ||
        typeof row.wpm !== 'number' ||
        typeof row.accuracy !== 'number' ||
        typeof row.timeSpent !== 'number'
      ) {
        return false
      }
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(normalized))
    return true
  } catch (error) {
    console.error('Failed to import stats:', error)
    return false
  }
}
