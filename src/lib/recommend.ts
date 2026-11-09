/**
 * Smart Mistake Training. Deterministic rules, no AI:
 * 1. Add up per-category attempts and errors from the most recent typing sessions.
 * 2. A category is a weakness when it has at least MIN_ATTEMPTS attempts and an error rate of at
 *    least MIN_RATE.
 * 3. For each weakness, build a drill from library lines that contain the most characters of that
 *    category, and explain the numbers behind the recommendation.
 * 4. Recall mistakes where the learner typed a different known command are reported as confusions.
 */
import { commands, getCommand } from '../content/commands'
import { languageTracks } from '../content/code'
import { CATEGORY_LABELS, categoryDensity, type MistakeCategory } from './typing/categories'
import { mergeStats, type StatPair } from './typing/engine'
import type { AppData } from './storage/schema'

export const RECENT_SESSIONS = 30
export const MIN_ATTEMPTS = 15
export const MIN_RATE = 0.06

export interface Weakness {
  category: MistakeCategory
  label: string
  attempts: number
  errors: number
  rate: number
  reason: string
}

export function recentCategoryStats(data: AppData, n = RECENT_SESSIONS): Partial<Record<MistakeCategory, StatPair>> {
  const recent = data.sessions.filter((s) => s.categoryStats).slice(-n)
  return recent.reduce<Partial<Record<MistakeCategory, StatPair>>>((acc, s) => mergeStats(acc, s.categoryStats!), {})
}

export function findWeaknesses(data: AppData, limit = 3): Weakness[] {
  const stats = recentCategoryStats(data)
  const sessions = Math.min(RECENT_SESSIONS, data.sessions.filter((s) => s.categoryStats).length)
  return (Object.entries(stats) as [MistakeCategory, StatPair][])
    .filter(([, [a, e]]) => a >= MIN_ATTEMPTS && e / a >= MIN_RATE)
    .map(([category, [attempts, errors]]) => ({
      category,
      label: CATEGORY_LABELS[category],
      attempts,
      errors,
      rate: errors / attempts,
      reason: `You mistyped ${CATEGORY_LABELS[category].toLowerCase()} ${errors} times in ${attempts} attempts (${Math.round((errors / attempts) * 100)}%) across your last ${sessions} session${sessions === 1 ? '' : 's'}.`,
    }))
    .sort((a, b) => b.rate - a.rate || b.errors - a.errors)
    .slice(0, limit)
}

interface Candidate {
  text: string
  source: string
}

let pool: Candidate[] | null = null
function candidatePool(): Candidate[] {
  if (pool) return pool
  const lines: Candidate[] = commands.map((c) => ({ text: c.command, source: c.title }))
  for (const t of languageTracks) {
    for (const l of t.lessons) {
      for (const line of l.code.split('\n')) {
        if (line.trim().length >= 12 && line.length <= 90) lines.push({ text: line, source: `${t.languageName}: ${l.title}` })
      }
    }
  }
  // Deduplicate identical lines.
  const seen = new Set<string>()
  pool = lines.filter((c) => (seen.has(c.text) ? false : (seen.add(c.text), true)))
  return pool
}

/** Build a drill of up to `lines` lines that concentrate one category. */
export function buildDrill(category: MistakeCategory, lines = 8): { text: string; sources: string[] } {
  const scored = candidatePool()
    .map((c) => ({ c, score: (categoryDensity(c.text)[category] ?? 0) / Math.sqrt(c.text.length) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.c.text.localeCompare(b.c.text))
    .slice(0, lines)
  return { text: scored.map((x) => x.c.text).join('\n'), sources: [...new Set(scored.map((x) => x.c.source))] }
}

export interface Confusion {
  expected: string
  got: string
  count: number
  reason: string
}

export function findConfusions(data: AppData, limit = 3): Confusion[] {
  const counts = new Map<string, number>()
  for (const c of data.confusions) {
    const key = `${c.expected}|${c.got}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= 2)
    .map(([key, count]) => {
      const [expected, got] = key.split('|') as [string, string]
      const a = getCommand(expected)
      const b = getCommand(got)
      return {
        expected,
        got,
        count,
        reason: `When asked for "${a?.title ?? expected}", you answered with ${b ? `"${b.command}"` : 'another command'} ${count} times.`,
      }
    })
    .sort((x, y) => y.count - x.count)
    .slice(0, limit)
}

/** Per-character error rates across all sessions, for the keyboard heatmap. */
export function keyErrorRates(data: AppData): Map<string, { attempts: number; errors: number; rate: number }> {
  const total = data.sessions.reduce<Record<string, StatPair>>((acc, s) => (s.charStats ? (mergeStats(acc, s.charStats) as Record<string, StatPair>) : acc), {})
  const out = new Map<string, { attempts: number; errors: number; rate: number }>()
  for (const [ch, [a, e]] of Object.entries(total)) out.set(ch, { attempts: a, errors: e, rate: a ? e / a : 0 })
  return out
}
