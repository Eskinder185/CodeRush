import type { StatPair } from '../typing/engine'
import type { MistakeCategory } from '../typing/categories'

/** Bump when AppData changes shape, and add a step to migrate.ts. */
export const SCHEMA_VERSION = 2 as const

export const STORAGE_KEY = 'coderush:data:v2'
/** Version 1 key, written by CodeRush 1.x. It is read for migration and never deleted. */
export const LEGACY_KEY = 'coderush_user_stats'
export const SETTINGS_KEY = 'coderush:settings'

export type SessionKind =
  | 'lesson' // a programming lesson from the 45-lesson library
  | 'guided' // a command typed inside a guided lesson
  | 'speed'
  | 'accuracy'
  | 'command'
  | 'syntax'
  | 'timed'
  | 'custom'
  | 'daily'
  | 'weakness'

export interface PracticeSession {
  id: string
  kind: SessionKind
  /** Language id for code lessons (python, bash...) or command platform (linux, powershell...). */
  trackId: string
  /** Lesson id, command id, or "mixed". */
  itemId: string
  title?: string
  completedAt: string
  durationSec: number
  wpm: number
  rawWpm: number
  accuracy: number
  correctChars: number
  keystrokes: number
  uncorrected: number
  corrected: number
  missing: number
  excess: number
  /** The final text matched the target exactly. Only passed lesson sessions complete a lesson. */
  passed: boolean
  charStats?: Record<string, StatPair>
  categoryStats?: Partial<Record<MistakeCategory, StatPair>>
  /** Net WPM sampled once per second. */
  wpmSeries?: number[]
  /** Migrated from CodeRush 1.x, where some fields were not recorded. */
  legacy?: boolean
}

export interface CommandProgress {
  /** Best accuracy on a perfect typed attempt, 0..100. */
  typedBestAccuracy: number
  typedPerfect: number
  recallAttempts: number
  recallSuccess: number
  /** Distinct local dates (YYYY-MM-DD) with a successful typed or recalled attempt. Capped at 10. */
  successDays: string[]
  lastPracticed: string
}

export interface QuizResult {
  best: number // 0..1
  last: number
  attempts: number
  lastAt: string
}

export interface ScenarioResult {
  completed: boolean
  attempts: number
  /** Steps answered correctly on the first try in the best run, 0..1. */
  bestFirstTry: number
  completedAt?: string
}

export interface DailyResult {
  score: number
  wpm: number
  accuracy: number
  completedAt: string
}

export interface Confusion {
  expected: string
  got: string
  at: string
}

export interface AppData {
  version: typeof SCHEMA_VERSION
  sessions: PracticeSession[]
  commands: Record<string, CommandProgress>
  quizzes: Record<string, QuizResult>
  scenarios: Record<string, ScenarioResult>
  daily: Record<string, DailyResult>
  confusions: Confusion[]
  favorites: string[]
  recent: string[]
  subnet: { attempts: number; correct: number }
  lastVisited?: { path: string; title: string; at: string }
  /** Set when data was migrated from CodeRush 1.x. */
  migratedFromV1?: { at: string; sessions: number }
}

export function emptyData(): AppData {
  return {
    version: SCHEMA_VERSION,
    sessions: [],
    commands: {},
    quizzes: {},
    scenarios: {},
    daily: {},
    confusions: [],
    favorites: [],
    recent: [],
    subnet: { attempts: 0, correct: 0 },
  }
}

export const LIMITS = {
  sessions: 3000,
  confusions: 200,
  recent: 20,
  successDays: 10,
  wpmSeries: 240,
} as const
