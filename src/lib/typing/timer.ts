/**
 * Active-time stopwatch. Starts on the first keystroke, excludes paused time.
 * Pure state plus a clock argument, so it is testable without fake timers.
 */
export interface TimerState {
  startedAt: number | null
  pausedAt: number | null
  pausedTotal: number
}

export const idleTimer: TimerState = { startedAt: null, pausedAt: null, pausedTotal: 0 }

export function startTimer(t: TimerState, now: number): TimerState {
  return t.startedAt === null ? { ...t, startedAt: now } : t
}

export function pauseTimer(t: TimerState, now: number): TimerState {
  if (t.startedAt === null || t.pausedAt !== null) return t
  return { ...t, pausedAt: now }
}

export function resumeTimer(t: TimerState, now: number): TimerState {
  if (t.pausedAt === null) return t
  return { ...t, pausedAt: null, pausedTotal: t.pausedTotal + (now - t.pausedAt) }
}

export function elapsedMs(t: TimerState, now: number): number {
  if (t.startedAt === null) return 0
  const end = t.pausedAt ?? now
  return Math.max(0, end - t.startedAt - t.pausedTotal)
}

export function isPaused(t: TimerState): boolean {
  return t.pausedAt !== null
}
