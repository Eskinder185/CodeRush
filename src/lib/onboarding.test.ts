import { describe, expect, it } from 'vitest'
import { parsePreferences, recommendedPath } from './onboarding'

describe('onboarding preferences', () => {
  it('recommends existing paths for every goal', () => {
    expect(recommendedPath('network').id).toBe('networking')
    expect(recommendedPath('security').id).toBe('cybersecurity')
    expect(recommendedPath('typing').id).toBe('programming')
  })

  it('rejects incomplete or unsupported saved preferences', () => {
    expect(parsePreferences('{bad')).toBeNull()
    expect(parsePreferences(JSON.stringify({ version: 1, goal: 'unknown', level: 'Advanced', dailyMinutes: 10 }))).toBeNull()
    expect(parsePreferences(JSON.stringify({ version: 1, goal: 'linux', level: 'Advanced', dailyMinutes: 20 }))).toEqual({ version: 1, goal: 'linux', level: 'Advanced', dailyMinutes: 20 })
  })
})
