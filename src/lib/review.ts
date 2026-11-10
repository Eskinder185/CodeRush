import { getCommand } from '../content/commands'
import { dailyChallenge } from './daily'
import { commandMastery } from './mastery'
import { findWeaknesses } from './recommend'
import type { AppData } from './storage/schema'
import { localDateKey } from './storage/store'
import { readPreferences, recommendedPath } from './onboarding'

export interface PlanItem { id: string; title: string; reason: string; to: string; minutes: number }

export function reviewIntervalDays(score: number, lastRecallCorrect?: boolean): number {
  if (lastRecallCorrect === false) return 1
  if (score >= 80) return 14
  if (score >= 60) return 7
  if (score >= 40) return 3
  return 1
}

export function dueCommandIds(data: AppData, now = new Date()): string[] {
  return Object.entries(data.commands)
    .filter(([id, p]) => {
      if (!getCommand(id)) return false
      const last = Date.parse(p.lastPracticed)
      if (!Number.isFinite(last)) return true
      const days = reviewIntervalDays(commandMastery(p).score, p.lastRecallCorrect)
      return now.getTime() - last >= days * 86_400_000
    })
    .sort((a, b) => Date.parse(a[1].lastPracticed) - Date.parse(b[1].lastPracticed))
    .map(([id]) => id)
}

export function todayPlan(data: AppData, now = new Date(), preferences = readPreferences()): PlanItem[] {
  const minutes = preferences?.dailyMinutes ?? 10
  const items: PlanItem[] = []
  const due = dueCommandIds(data, now).slice(0, 3)
  if (due.length) {
    const label = due.map((id) => getCommand(id)!.command).join(', ')
    items.push({ id: 'review', title: `Review ${due.length} command${due.length === 1 ? '' : 's'}`, reason: `${label} ${due.length === 1 ? 'is' : 'are'} due based on your last practice and recall results.`, to: `/lab/command/${due[0]}`, minutes: Math.min(5, minutes) })
  }
  const weak = findWeaknesses(data, 1)[0]
  if (weak) items.push({ id: 'typing', title: `Practice ${weak.label.toLowerCase()}`, reason: weak.reason, to: `/practice?drill=${weak.category}`, minutes: 5 })
  const path = preferences ? recommendedPath(preferences.goal) : null
  if (path) items.push({ id: 'path', title: `Continue ${path.title}`, reason: `You chose ${preferences!.goal === 'typing' ? 'technical typing' : path.title} as your learning goal.`, to: `/learn/${path.id}`, minutes: Math.max(5, minutes - items.reduce((n, x) => n + x.minutes, 0)) })
  if (!items.length) items.push({ id: 'start', title: 'Choose a learning path', reason: 'You have no saved activity or goal yet.', to: '/learn', minutes })
  const date = localDateKey(now)
  if (!data.daily[date] && items.reduce((n, x) => n + x.minutes, 0) < minutes) {
    const challenge = dailyChallenge(date)
    items.push({ id: 'daily', title: challenge.title, reason: 'Today’s challenge is still open.', to: '/challenges', minutes: Math.min(5, minutes) })
  }
  return items
}
