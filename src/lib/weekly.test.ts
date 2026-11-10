import { beforeEach, describe, expect, it } from 'vitest'
import { emptyData } from './storage/schema'
import { readWeeklyGoal, saveWeeklyGoal, weeklyPracticeMinutes } from './weekly'

beforeEach(() => localStorage.clear())

describe('weekly goal', () => {
  it('saves an allowed target and rejects an unsupported stored value', () => {
    expect(readWeeklyGoal()).toBe(60)
    expect(saveWeeklyGoal(120)).toBe(true)
    expect(readWeeklyGoal()).toBe(120)
    localStorage.setItem('coderush:weekly-goal:v1', '9999')
    expect(readWeeklyGoal()).toBe(60)
  })

  it('counts only recorded sessions in the current local week', () => {
    const data = emptyData()
    const session = { id: 'a', completedAt: '2026-03-03T12:00:00', durationSec: 3700 }
    data.sessions = [session, { ...session, id: 'b', completedAt: '2026-02-23T12:00:00', durationSec: 600 }] as typeof data.sessions
    expect(weeklyPracticeMinutes(data, new Date('2026-03-04T12:00:00'))).toBe(61)
  })
})
