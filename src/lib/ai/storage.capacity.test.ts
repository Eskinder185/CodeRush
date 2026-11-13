import { beforeEach, describe, expect, it } from 'vitest'
import { duplicateAIPractice, getSavedAIPractices, saveAIPractice } from './storage'
import { emptyData, LIMITS, STORAGE_KEY } from '../storage/schema'
import { resetStoreCache } from '../storage/store'
import type { AIPractice } from './types'

function practice(id: string): AIPractice {
  return {
    id, type: 'typing', title: id, language: 'TypeScript',
    difficulty: 'beginner', topic: 'Variables',
    content: { kind: 'typing', data: {
      type: 'typing', instructions: 'Type the declaration', targetText: 'const x = 1',
      explanation: 'A constant', hints: [],
    } },
    createdAt: '2026-11-01T12:00:00.000Z', updatedAt: '2026-11-01T12:00:00.000Z',
  }
}

describe('AI library capacity', () => {
  beforeEach(() => {
    localStorage.clear()
    resetStoreCache()
    const data = emptyData()
    // The library stores newly added practices first.
    data.aiPractices = Array.from({ length: LIMITS.aiPractices }, (_, i) => practice(`existing-${i}`))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  })

  it.each(['save', 'duplicate'] as const)('retains the new practice on %s at capacity, including after reload', (action) => {
    const added = action === 'duplicate' ? duplicateAIPractice('existing-0')! : practice('new-practice')
    if (action === 'save') saveAIPractice(added)

    for (const reload of [false, true]) {
      if (reload) resetStoreCache()
      const saved = getSavedAIPractices()
      expect(saved).toHaveLength(LIMITS.aiPractices)
      expect(saved[0]?.id).toBe(added.id)
      expect(saved.some((p) => p.id === `existing-${LIMITS.aiPractices - 1}`)).toBe(false)
      expect(saved.some((p) => p.id === 'existing-0')).toBe(true)
    }
  })
})
