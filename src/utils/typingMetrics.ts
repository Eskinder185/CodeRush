/**
 * Typing practice metrics — pure functions for tests and React derivation.
 *
 * Accuracy: correct keystrokes / total keystrokes in the typed prefix (0% edge → 100%).
 * WPM: (correct characters / 5) / elapsed minutes (standard typing-test definition).
 * CPM: total characters typed / elapsed minutes.
 */

export type CharStatus = 'correct' | 'incorrect' | 'current' | 'pending'

/** Live metrics for editor status bars (parent-derived). */
export interface TypingStatsDisplay {
  wpm: number
  accuracy: number
  mistakes: number
  cpm: number
}

export function countCorrectPrefix(target: string, typed: string): number {
  const n = Math.min(target.length, typed.length)
  let correct = 0
  for (let i = 0; i < n; i++) {
    if (target[i] === typed[i]) correct++
  }
  return correct
}

export function charStatusAt(target: string, typed: string, index: number): CharStatus {
  if (index >= target.length) return 'pending'
  if (index < typed.length) {
    return typed[index] === target[index] ? 'correct' : 'incorrect'
  }
  if (index === typed.length) return 'current'
  return 'pending'
}

export interface TypingMetrics {
  correct: number
  incorrect: number
  totalTyped: number
  accuracy: number
  wpm: number
  cpm: number
  mistakes: number
}

const MIN_MINUTES = 1 / 60 // 1 second floor so early typing shows finite rates

export function computeTypingMetrics(
  target: string,
  typed: string,
  elapsedActiveMs: number
): TypingMetrics {
  const totalTyped = typed.length
  const correct = countCorrectPrefix(target, typed)
  const incorrect = totalTyped - correct
  const minutes = Math.max(elapsedActiveMs / 60_000, MIN_MINUTES)

  const accuracy =
    totalTyped === 0 ? 100 : Math.round((correct / totalTyped) * 1000) / 10

  const wpm = Math.round((correct / 5) / minutes)
  const cpm = Math.round(totalTyped / minutes)

  return {
    correct,
    incorrect,
    totalTyped,
    accuracy,
    wpm,
    cpm,
    mistakes: incorrect,
  }
}

export function isTypingComplete(target: string, typed: string): boolean {
  return typed.length === target.length && typed === target
}

/** True when the user has filled the snippet (length); text may still contain mistakes. */
export function hasReachedTypingEnd(target: string, typed: string): boolean {
  return target.length > 0 && typed.length >= target.length
}
