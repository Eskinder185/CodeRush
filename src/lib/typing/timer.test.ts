import { describe, it, expect } from 'vitest'
import { elapsedMs, idleTimer, isPaused, pauseTimer, resumeTimer, startTimer } from './timer'

describe('typing timer', () => {
  it('stays at zero until started', () => {
    expect(elapsedMs(idleTimer, 5000)).toBe(0)
  })

  it('measures active time and excludes pauses', () => {
    let t = startTimer(idleTimer, 1000)
    expect(elapsedMs(t, 3000)).toBe(2000)
    t = pauseTimer(t, 3000)
    expect(isPaused(t)).toBe(true)
    expect(elapsedMs(t, 10_000)).toBe(2000)
    t = resumeTimer(t, 10_000)
    expect(elapsedMs(t, 11_000)).toBe(3000)
  })

  it('ignores a second start and double pause', () => {
    let t = startTimer(idleTimer, 1000)
    t = startTimer(t, 5000)
    expect(t.startedAt).toBe(1000)
    t = pauseTimer(t, 2000)
    t = pauseTimer(t, 4000)
    expect(t.pausedAt).toBe(2000)
  })

  it('does not pause before starting', () => {
    expect(pauseTimer(idleTimer, 100)).toBe(idleTimer)
  })

  it('resets cleanly for an immediate restart', () => {
    const t = startTimer(idleTimer, 1000)
    expect(elapsedMs(idleTimer, 2000)).toBe(0)
    expect(elapsedMs(t, 1000)).toBe(0)
  })
})
