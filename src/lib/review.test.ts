import { describe, expect, it } from 'vitest'
import { emptyData } from './storage/schema'
import { dueCommandIds, reviewIntervalDays, todayPlan } from './review'

describe('review planning', () => {
  it('schedules wrong recall earlier and strong mastery later', () => {
    expect(reviewIntervalDays(80, false)).toBe(1)
    expect(reviewIntervalDays(80, true)).toBe(14)
    expect(reviewIntervalDays(45)).toBe(3)
  })

  it('uses recorded practice and does not invent due items', () => {
    const data = emptyData()
    expect(dueCommandIds(data, new Date('2026-11-09T12:00:00Z'))).toEqual([])
    data.commands['linux.pwd'] = { typedBestAccuracy: 100, typedPerfect: 1, recallAttempts: 0, recallSuccess: 0, successDays: ['2026-11-05'], lastPracticed: '2026-11-05T12:00:00Z' }
    expect(dueCommandIds(data, new Date('2026-11-09T12:00:00Z'))).toContain('linux.pwd')
    expect(todayPlan(data, new Date('2026-11-09T12:00:00Z'), null)[0]?.reason).toContain('pwd')
  })
})
