import type { AppData } from './storage/schema'
import { weekKey } from './progress'

export const WEEKLY_GOAL_KEY = 'coderush:weekly-goal:v1'
export const WEEKLY_GOALS = [30, 60, 120, 180] as const
export type WeeklyGoalMinutes = (typeof WEEKLY_GOALS)[number]

export function readWeeklyGoal(): WeeklyGoalMinutes {
  try {
    const value = Number(localStorage.getItem(WEEKLY_GOAL_KEY))
    return WEEKLY_GOALS.find((n) => n === value) ?? 60
  } catch { return 60 }
}

export function saveWeeklyGoal(minutes: WeeklyGoalMinutes): boolean {
  try { localStorage.setItem(WEEKLY_GOAL_KEY, String(minutes)); return true } catch { return false }
}

export function weeklyPracticeMinutes(data: AppData, now = new Date()): number {
  const week = weekKey(now.toISOString())
  return Math.floor(data.sessions.filter((s) => weekKey(s.completedAt) === week).reduce((sum, s) => sum + s.durationSec, 0) / 60)
}
