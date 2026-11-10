import { learningPaths } from '../content/paths'

export const PREFERENCE_KEY = 'coderush:preferences:v1'

export const GOALS = [
  { id: 'software', label: 'Software Development', path: 'programming' },
  { id: 'security', label: 'Cybersecurity / SOC', path: 'cybersecurity' },
  { id: 'network', label: 'Networking & IT Support', path: 'networking' },
  { id: 'cloud', label: 'Cloud & DevOps', path: 'linux-networking' },
  { id: 'linux', label: 'Linux Administration', path: 'linux' },
  { id: 'typing', label: 'Improve Technical Typing', path: 'programming' },
] as const

export const LEVELS = ['Complete beginner', 'Some experience', 'Intermediate', 'Advanced'] as const
export const DAILY_MINUTES = [5, 10, 20, 30] as const
export type GoalId = (typeof GOALS)[number]['id']

export interface Preferences {
  version: 1
  goal: GoalId
  level: (typeof LEVELS)[number]
  dailyMinutes: (typeof DAILY_MINUTES)[number]
}

export function recommendedPath(goal: GoalId) {
  const id = GOALS.find((x) => x.id === goal)?.path ?? 'programming'
  return learningPaths.find((x) => x.id === id)!
}

export function parsePreferences(raw: string | null): Preferences | null {
  if (!raw) return null
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object') return null
    const p = value as Partial<Preferences>
    if (p.version !== 1 || !GOALS.some((x) => x.id === p.goal) || !LEVELS.some((x) => x === p.level) || !DAILY_MINUTES.some((x) => x === p.dailyMinutes)) return null
    return p as Preferences
  } catch {
    return null
  }
}

export function readPreferences(): Preferences | null {
  try { return parsePreferences(localStorage.getItem(PREFERENCE_KEY)) } catch { return null }
}

export function savePreferences(p: Preferences): boolean {
  try { localStorage.setItem(PREFERENCE_KEY, JSON.stringify(p)); return true } catch { return false }
}
