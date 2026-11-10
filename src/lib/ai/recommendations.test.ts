import { describe, expect, it } from 'vitest'
import { getNextRecommendations } from './recommendations'
import type { AIPractice } from './types'
import type { SessionResult } from '../../components/typing/useTypingSession'
import { createEngine, computeMetrics } from '../typing/engine'

describe('AI Recommendations', () => {
  const basePractice: AIPractice = {
    id: 'p_rec_1',
    type: 'typing',
    title: 'Rust Ownership Basics',
    language: 'Rust',
    difficulty: 'beginner',
    topic: 'Ownership',
    content: {
      kind: 'typing',
      data: {
        type: 'typing',
        instructions: 'Type code',
        targetText: 'let s = String::from("hello");',
        explanation: 'Ownership test',
        hints: [],
      },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  it('suggests bracket syntax drill if learner struggled with brackets', () => {
    const engine = {
      ...createEngine('test'),
      categoryStats: {
        brackets: [10, 3] as [number, number],
      },
    }
    const metrics = {
      ...computeMetrics(engine, 20000),
      accuracy: 92, // simulate < 96%
    }

    const mockResult: SessionResult = {
      durationSec: 20,
      wpmSeries: [30, 35],
      timedOut: false,
      metrics,
      engine,
    }

    const recs = getNextRecommendations(basePractice, mockResult)
    const bracketRec = recs.find((r) => r.id === 'rec_brackets')
    expect(bracketRec).toBeDefined()
    expect(bracketRec?.title).toContain('Bracket')
  })

  it('proposes next curriculum progression for Rust', () => {
    const recs = getNextRecommendations(basePractice)
    const progressionRec = recs.find((r) => r.id === 'rec_curriculum_next')
    expect(progressionRec).toBeDefined()
    expect(progressionRec?.title).toContain('Borrowing')
  })

  it('proposes conceptual quiz check following typing practice', () => {
    const recs = getNextRecommendations(basePractice)
    const quizRec = recs.find((r) => r.id === 'rec_quiz_check')
    expect(quizRec).toBeDefined()
    expect(quizRec?.request.practiceType).toBe('quiz')
  })
})
