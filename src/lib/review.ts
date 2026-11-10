import { getCommand } from '../content/commands'
import type { CommandCategory, Difficulty, Platform } from '../content/types'
import { dailyChallenge } from './daily'
import { commandMastery, type CommandLevel } from './mastery'
import { findWeaknesses } from './recommend'
import type { AppData } from './storage/schema'
import { localDateKey } from './storage/store'
import { readPreferences, recommendedPath } from './onboarding'

export interface PlanItem { id: string; title: string; reason: string; to: string; minutes: number }

export interface CommandConfusionDetail {
  otherId: string
  otherCommand: string
  otherTitle: string
  direction: 'expected-this-got-other' | 'expected-other-got-this'
  count: number
  lastAt: string
}

export interface CommandReviewItem {
  id: string
  command: string
  title: string
  platform: Platform
  category: CommandCategory
  difficulty: Difficulty
  lastPracticed: string
  lastPracticedDate: Date
  intervalDays: number
  nextReviewDate: Date
  isDue: boolean
  daysUntilDue: number
  masteryScore: number
  masteryLevel: CommandLevel
  recallAttempts: number
  recallSuccess: number
  recallRate: number
  lastRecallCorrect?: boolean
  typedPerfect: number
  typedBestAccuracy: number
  successDaysCount: number
  recentWpm?: number
  recentAccuracy?: number
  confusions: CommandConfusionDetail[]
}

export function reviewIntervalDays(score: number, lastRecallCorrect?: boolean): number {
  if (lastRecallCorrect === false) return 1
  if (score >= 80) return 14
  if (score >= 60) return 7
  if (score >= 40) return 3
  return 1
}

export function getCommandReview(data: AppData, commandId: string, now = new Date()): CommandReviewItem | null {
  const cmd = getCommand(commandId)
  const p = data.commands[commandId]
  if (!cmd || !p) return null

  const lastMs = Date.parse(p.lastPracticed)
  const validLast = Number.isFinite(lastMs) ? lastMs : now.getTime()
  const mastery = commandMastery(p)
  const interval = reviewIntervalDays(mastery.score, p.lastRecallCorrect)
  const nextMs = validLast + interval * 86_400_000
  const isDue = now.getTime() >= nextMs
  const daysUntilDue = Math.ceil((nextMs - now.getTime()) / 86_400_000)

  // Find confusions involving this command
  const confusionMap = new Map<string, { count: number; lastAt: string; direction: 'expected-this-got-other' | 'expected-other-got-this' }>()
  for (const c of data.confusions) {
    if (c.expected === commandId) {
      const cur = confusionMap.get(c.got) ?? { count: 0, lastAt: c.at, direction: 'expected-this-got-other' as const }
      cur.count += 1
      if (Date.parse(c.at) > Date.parse(cur.lastAt)) cur.lastAt = c.at
      confusionMap.set(c.got, cur)
    } else if (c.got === commandId) {
      const cur = confusionMap.get(c.expected) ?? { count: 0, lastAt: c.at, direction: 'expected-other-got-this' as const }
      cur.count += 1
      if (Date.parse(c.at) > Date.parse(cur.lastAt)) cur.lastAt = c.at
      confusionMap.set(c.expected, cur)
    }
  }

  const confusions: CommandConfusionDetail[] = Array.from(confusionMap.entries()).map(([otherId, info]) => {
    const other = getCommand(otherId)
    return {
      otherId,
      otherCommand: other?.command ?? otherId,
      otherTitle: other?.title ?? otherId,
      direction: info.direction,
      count: info.count,
      lastAt: info.lastAt,
    }
  }).sort((a, b) => b.count - a.count)

  // Find recent typing session for this command
  const lastSession = [...data.sessions].reverse().find((s) => s.itemId === commandId)

  return {
    id: cmd.id,
    command: cmd.command,
    title: cmd.title,
    platform: cmd.platform,
    category: cmd.category,
    difficulty: cmd.difficulty,
    lastPracticed: p.lastPracticed,
    lastPracticedDate: new Date(validLast),
    intervalDays: interval,
    nextReviewDate: new Date(nextMs),
    isDue,
    daysUntilDue,
    masteryScore: mastery.score,
    masteryLevel: mastery.level,
    recallAttempts: p.recallAttempts,
    recallSuccess: p.recallSuccess,
    recallRate: p.recallAttempts > 0 ? Math.round((p.recallSuccess / p.recallAttempts) * 100) : 0,
    lastRecallCorrect: p.lastRecallCorrect,
    typedPerfect: p.typedPerfect,
    typedBestAccuracy: p.typedBestAccuracy,
    successDaysCount: p.successDays.length,
    recentWpm: lastSession?.wpm,
    recentAccuracy: lastSession?.accuracy,
    confusions,
  }
}

export function getCommandReviews(data: AppData, now = new Date()): CommandReviewItem[] {
  const items: CommandReviewItem[] = []
  for (const id of Object.keys(data.commands)) {
    const item = getCommandReview(data, id, now)
    if (item) items.push(item)
  }
  // Sort due items first, then by next review date ascending
  return items.sort((a, b) => {
    if (a.isDue && !b.isDue) return -1
    if (!a.isDue && b.isDue) return 1
    return a.nextReviewDate.getTime() - b.nextReviewDate.getTime()
  })
}

export function commandReviewSummary(reviews: CommandReviewItem[]) {
  const total = reviews.length
  const due = reviews.filter((r) => r.isDue).length
  const mastered = reviews.filter((r) => r.masteryLevel === 'mastered').length
  const practiced = reviews.filter((r) => r.masteryLevel === 'practiced').length
  const learning = reviews.filter((r) => r.masteryLevel === 'learning').length
  const totalRecallAttempts = reviews.reduce((s, r) => s + r.recallAttempts, 0)
  const totalRecallSuccess = reviews.reduce((s, r) => s + r.recallSuccess, 0)
  const avgRecallRate = totalRecallAttempts > 0 ? Math.round((totalRecallSuccess / totalRecallAttempts) * 100) : 0
  const totalConfusions = reviews.reduce((s, r) => s + r.confusions.reduce((cs, c) => cs + c.count, 0), 0)

  return {
    total,
    due,
    mastered,
    practiced,
    learning,
    avgRecallRate,
    totalConfusions,
  }
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
