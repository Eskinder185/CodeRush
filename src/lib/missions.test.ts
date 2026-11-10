import { describe, expect, it } from 'vitest'
import { missions } from '../content/missions'
import { missionScore } from './missions'

describe('mission scoring', () => {
  it('accepts any valid evidence order and scores actual actions', () => {
    const mission = missions[0]!
    const ids = mission.tools.map((t) => t.id)
    expect(missionScore(mission, new Set(ids), 0, 0)).toBe(100)
    expect(missionScore(mission, new Set(ids.reverse()), 0, 0)).toBe(100)
    expect(missionScore(mission, new Set([ids[0]!]), 1, 1)).toBeLessThan(100)
  })

  it('keeps all mission commands unique and tied to evidence', () => {
    for (const mission of missions) {
      expect(new Set(mission.tools.map((t) => t.command.toLowerCase())).size).toBe(mission.tools.length)
      expect(mission.diagnoses.filter((x) => x.correct)).toHaveLength(1)
      expect(mission.resolutions.filter((x) => x.correct)).toHaveLength(1)
    }
  })
})
