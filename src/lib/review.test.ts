import { describe, expect, it } from 'vitest'
import { emptyData } from './storage/schema'
import { commandReviewSummary, dueCommandIds, getCommandReview, getCommandReviews, reviewIntervalDays, todayPlan } from './review'

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

  it('constructs detailed command review history with recall, typing, next review, and confusions', () => {
    const data = emptyData()
    data.commands['linux.ip-addr-show'] = {
      typedBestAccuracy: 95,
      typedPerfect: 2,
      recallAttempts: 4,
      recallSuccess: 3,
      lastRecallCorrect: true,
      successDays: ['2026-11-01', '2026-11-05'],
      lastPracticed: '2026-11-05T10:00:00Z',
    }
    data.confusions.push({
      expected: 'linux.ip-addr-show',
      got: 'linux.traceroute',
      at: '2026-11-05T09:59:00Z',
    })
    data.sessions.push({
      id: 'session-1',
      kind: 'command',
      trackId: 'linux',
      itemId: 'linux.ip-addr-show',
      completedAt: '2026-11-05T10:00:00Z',
      durationSec: 10,
      wpm: 55,
      rawWpm: 60,
      accuracy: 95,
      correctChars: 12,
      keystrokes: 13,
      uncorrected: 0,
      corrected: 1,
      missing: 0,
      excess: 0,
      passed: true,
    })

    const now = new Date('2026-11-06T10:00:00Z')
    const review = getCommandReview(data, 'linux.ip-addr-show', now)
    expect(review).not.toBeNull()
    expect(review?.command).toBe('ip addr show')
    expect(review?.platform).toBe('linux')
    expect(review?.recallAttempts).toBe(4)
    expect(review?.recallSuccess).toBe(3)
    expect(review?.recallRate).toBe(75)
    expect(review?.lastRecallCorrect).toBe(true)
    expect(review?.typedBestAccuracy).toBe(95)
    expect(review?.typedPerfect).toBe(2)
    expect(review?.recentWpm).toBe(55)
    expect(review?.recentAccuracy).toBe(95)
    expect(review?.confusions).toHaveLength(1)
    expect(review?.confusions[0]?.otherId).toBe('linux.traceroute')
    expect(review?.confusions[0]?.count).toBe(1)
    expect(review?.nextReviewDate.toISOString()).toBeDefined()

    const all = getCommandReviews(data, now)
    expect(all).toHaveLength(1)
    expect(all[0]?.id).toBe('linux.ip-addr-show')

    const summary = commandReviewSummary(all)
    expect(summary.total).toBe(1)
    expect(summary.totalConfusions).toBe(1)
    expect(summary.avgRecallRate).toBe(75)
  })
})
