/**
 * Programming lesson progress. Fixes two CodeRush 1.x bugs:
 * - the per-language denominator now comes from the lesson library, not from the number of attempts;
 * - a lesson counts as completed only when an attempt matched the lesson text exactly.
 */
import { getLanguageTrack } from '../content/code'
import type { AppData, PracticeSession } from './storage/schema'

export function passedLessonIds(data: AppData, language: string): Set<string> {
  return new Set(data.sessions.filter((s) => s.kind === 'lesson' && s.trackId === language && s.passed).map((s) => s.itemId))
}

export interface LanguageProgress {
  language: string
  total: number
  passed: number
  attempted: number
  percent: number
  averageWpm: number
  averageAccuracy: number
  bestWpm: number
  timeSec: number
  lastPracticed?: string
}

export function languageProgress(data: AppData, language: string): LanguageProgress {
  const track = getLanguageTrack(language)
  const total = track?.lessons.length ?? 0
  const valid = new Set(track?.lessons.map((l) => l.id) ?? [])
  const sessions = data.sessions.filter((s) => s.kind === 'lesson' && s.trackId === language && valid.has(s.itemId))
  const passed = [...passedLessonIds(data, language)].filter((id) => valid.has(id)).length
  const attempted = new Set(sessions.map((s) => s.itemId)).size
  return {
    language,
    total,
    passed,
    attempted,
    percent: total ? Math.round((passed / total) * 100) : 0,
    ...averages(sessions),
    lastPracticed: sessions.at(-1)?.completedAt,
  }
}

export function averages(sessions: PracticeSession[]) {
  const n = sessions.length
  if (n === 0) return { averageWpm: 0, averageAccuracy: 0, bestWpm: 0, timeSec: 0 }
  return {
    averageWpm: Math.round(sessions.reduce((s, x) => s + x.wpm, 0) / n),
    averageAccuracy: Math.round((sessions.reduce((s, x) => s + x.accuracy, 0) / n) * 10) / 10,
    bestWpm: Math.max(...sessions.map((s) => s.wpm)),
    timeSec: sessions.reduce((s, x) => s + x.durationSec, 0),
  }
}

/** Sessions that measure typing, excluding guided single-command reps that are too short to compare. */
export function typingSessions(data: AppData): PracticeSession[] {
  return data.sessions.filter((s) => s.legacy || (s.kind !== 'guided' && s.keystrokes >= 20))
}

export interface OverallStats {
  sessions: number
  lessonsPassed: number
  averageWpm: number
  bestWpm: number
  averageAccuracy: number
  timeSec: number
  languages: string[]
}

export function overallStats(data: AppData): OverallStats {
  const typed = typingSessions(data)
  const passed = new Set(data.sessions.filter((s) => s.kind === 'lesson' && s.passed).map((s) => `${s.trackId}/${s.itemId}`))
  const a = averages(typed)
  return {
    sessions: data.sessions.length,
    lessonsPassed: passed.size,
    averageWpm: a.averageWpm,
    bestWpm: a.bestWpm,
    averageAccuracy: a.averageAccuracy,
    timeSec: data.sessions.reduce((s, x) => s + x.durationSec, 0),
    languages: [...new Set(data.sessions.filter((s) => s.kind === 'lesson').map((s) => s.trackId))],
  }
}

export function formatDuration(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s % 60}s`
  return `${s}s`
}

/** ISO week key "YYYY-Www" for weekly charts, using local time. */
export function weekKey(iso: string): string {
  const d = new Date(iso)
  const day = (d.getDay() + 6) % 7
  const thursday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - day + 3)
  const firstThursday = new Date(thursday.getFullYear(), 0, 4)
  const week = 1 + Math.round(((thursday.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7)
  return `${thursday.getFullYear()}-W${String(week).padStart(2, '0')}`
}
