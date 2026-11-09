/**
 * Mastery scoring. Documented in docs/MASTERY.md and covered by mastery.test.ts.
 *
 * Mastery is separate from typing speed. WPM never affects it.
 *
 * Command mastery, 0 to 100:
 *   typing      30%  best accuracy on a perfect typed attempt, 0 if never typed perfectly
 *   recall      40%  successful recalls from memory, capped at 2
 *   repetition  30%  distinct days with a success, capped at 3
 * Levels: not started (no attempts), learning (under 40), practiced (40 to 79),
 * mastered (80 or more AND at least one successful recall).
 *
 * Module mastery combines the parts a module has, reweighted to sum to 100%:
 *   commands or lessons 60%, quiz best score 25%, scenarios completed 15%.
 * A module is complete when its quiz best is at least 50%, every command is practiced or better,
 * every lesson is passed, and every scenario is complete. It is mastered when complete and 85 or more.
 */
import type { LearningModule, LearningPath } from '../content/types'
import type { AppData, CommandProgress } from './storage/schema'
import { passedLessonIds } from './progress'

export type CommandLevel = 'not-started' | 'learning' | 'practiced' | 'mastered'
export type ModuleStatus = 'not-started' | 'in-progress' | 'completed' | 'mastered'

export interface Part {
  label: string
  weight: number
  /** 0..1 */
  value: number
  detail: string
}

export interface CommandMastery {
  score: number
  level: CommandLevel
  parts: Part[]
}

export const WEIGHTS = { typing: 0.3, recall: 0.4, repetition: 0.3 } as const
export const RECALL_CAP = 2
export const DAYS_CAP = 3

export function commandMastery(p: CommandProgress | undefined): CommandMastery {
  const typing = p && p.typedPerfect > 0 ? p.typedBestAccuracy / 100 : 0
  const recall = p ? Math.min(p.recallSuccess, RECALL_CAP) / RECALL_CAP : 0
  const repetition = p ? Math.min(p.successDays.length, DAYS_CAP) / DAYS_CAP : 0
  const parts: Part[] = [
    {
      label: 'Typing',
      weight: WEIGHTS.typing,
      value: typing,
      detail: p && p.typedPerfect > 0 ? `Best accuracy on a perfect attempt: ${Math.round(p.typedBestAccuracy)}%` : 'No perfect typed attempt yet',
    },
    {
      label: 'Recall',
      weight: WEIGHTS.recall,
      value: recall,
      detail: `${Math.min(p?.recallSuccess ?? 0, RECALL_CAP)} of ${RECALL_CAP} successful recalls from memory`,
    },
    {
      label: 'Repetition',
      weight: WEIGHTS.repetition,
      value: repetition,
      detail: `Succeeded on ${Math.min(p?.successDays.length ?? 0, DAYS_CAP)} of ${DAYS_CAP} different days`,
    },
  ]
  const score = Math.round(100 * parts.reduce((s, x) => s + x.weight * x.value, 0))
  // A progress record exists only after the learner has attempted the command at least once.
  let level: CommandLevel = p ? 'learning' : 'not-started'
  if (score >= 40) level = 'practiced'
  if (score >= 80 && (p?.recallSuccess ?? 0) >= 1) level = 'mastered'
  return { score, level, parts }
}

export interface ModuleMastery {
  score: number
  status: ModuleStatus
  parts: Part[]
  /** Human-readable reasons the module is not yet complete. */
  remaining: string[]
}

export function moduleMastery(module: LearningModule, data: AppData): ModuleMastery {
  const parts: Part[] = []
  const remaining: string[] = []
  let activity = false

  if (module.commandIds.length > 0) {
    const ms = module.commandIds.map((id) => commandMastery(data.commands[id]))
    const avg = ms.reduce((s, m) => s + m.score, 0) / ms.length / 100
    const practiced = ms.filter((m) => m.level === 'practiced' || m.level === 'mastered').length
    if (ms.some((m) => m.level !== 'not-started')) activity = true
    parts.push({ label: 'Commands', weight: 0.6, value: avg, detail: `${practiced} of ${ms.length} commands practiced or mastered` })
    if (practiced < ms.length) remaining.push(`Practice ${ms.length - practiced} more command${ms.length - practiced === 1 ? '' : 's'} to "Practiced"`)
  }

  if (module.lessonRefs && module.lessonRefs.length > 0) {
    const byLang = new Map<string, Set<string>>()
    const passed = module.lessonRefs.filter((ref) => {
      const [lang, id] = ref.split('/') as [string, string]
      if (!byLang.has(lang)) byLang.set(lang, passedLessonIds(data, lang))
      return byLang.get(lang)!.has(id)
    }).length
    const attempted = data.sessions.some((s) => s.kind === 'lesson' && module.lessonRefs!.includes(`${s.trackId}/${s.itemId}`))
    if (attempted) activity = true
    parts.push({ label: 'Lessons', weight: 0.6, value: passed / module.lessonRefs.length, detail: `${passed} of ${module.lessonRefs.length} lessons passed with an exact match` })
    if (passed < module.lessonRefs.length) remaining.push(`Pass ${module.lessonRefs.length - passed} more lesson${module.lessonRefs.length - passed === 1 ? '' : 's'}`)
  }

  if (module.quiz.length > 0) {
    const r = data.quizzes[module.id]
    if (r) activity = true
    parts.push({ label: 'Quiz', weight: 0.25, value: r?.best ?? 0, detail: r ? `Best quiz score ${Math.round(r.best * 100)}%` : 'Quiz not taken' })
    if (!r || r.best < 0.5) remaining.push('Score at least 50% on the quiz')
  }

  if (module.scenarioIds.length > 0) {
    const done = module.scenarioIds.filter((id) => data.scenarios[id]?.completed).length
    if (done > 0) activity = true
    parts.push({ label: 'Scenarios', weight: 0.15, value: done / module.scenarioIds.length, detail: `${done} of ${module.scenarioIds.length} scenarios completed` })
    if (done < module.scenarioIds.length) remaining.push(`Complete ${module.scenarioIds.length - done} more scenario${module.scenarioIds.length - done === 1 ? '' : 's'}`)
  }

  const totalWeight = parts.reduce((s, p) => s + p.weight, 0) || 1
  for (const p of parts) p.weight = p.weight / totalWeight
  const score = Math.round(100 * parts.reduce((s, p) => s + p.weight * p.value, 0))

  let status: ModuleStatus = activity ? 'in-progress' : 'not-started'
  if (remaining.length === 0 && parts.length > 0) status = score >= 85 ? 'mastered' : 'completed'
  return { score, status, parts, remaining }
}

export interface PathProgress {
  completed: number
  total: number
  percent: number
  inProgress: number
  /** First module that is not completed, the recommended next step. */
  nextModuleId?: string
}

export function pathProgress(path: LearningPath, data: AppData): PathProgress {
  let completed = 0
  let inProgress = 0
  let nextModuleId: string | undefined
  for (const m of path.modules) {
    const s = moduleMastery(m, data).status
    if (s === 'completed' || s === 'mastered') completed++
    else {
      if (s === 'in-progress') inProgress++
      nextModuleId ??= m.id
    }
  }
  const total = path.modules.length
  return { completed, total, percent: total ? Math.round((completed / total) * 100) : 0, inProgress, nextModuleId }
}

/** Earlier modules in the same path that are not complete. Learners may skip ahead; this only informs. */
export function unmetPrerequisites(path: LearningPath, moduleIndex: number, data: AppData): LearningModule[] {
  return path.modules.slice(0, moduleIndex).filter((m) => {
    const s = moduleMastery(m, data).status
    return s !== 'completed' && s !== 'mastered' && m.level === 'beginner'
  })
}
