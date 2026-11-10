import { describe, it, expect, beforeEach } from 'vitest'
import { importComparison, loadFromStrings, migrateLegacyRow, parseImport, validateAppData, mergeData } from './migrate'
import { emptyData, LEGACY_KEY, PREVIOUS_KEY, STORAGE_KEY } from './schema'
import {
  getData,
  importText,
  exportDocument,
  recordCommandTyped,
  recordRecall,
  recordSession,
  resetStoreCache,
  clearAllData,
  toggleFavorite,
} from './store'

const legacyRow = {
  language: 'python',
  lessonId: 'python-basics-1',
  wpm: 42,
  accuracy: 97.5,
  timeSpent: 61,
  completedAt: '2026-03-01T10:00:00.000Z',
  mistakes: 0,
  symbolsMissed: [],
  cpm: 230,
  totalChars: 240,
  correctChars: 234,
}

beforeEach(() => {
  localStorage.clear()
  resetStoreCache()
})

describe('legacy migration', () => {
  it('migrates a version 1 row and marks exact matches as passed', () => {
    const s = migrateLegacyRow(legacyRow)!
    expect(s.kind).toBe('lesson')
    expect(s.trackId).toBe('python')
    expect(s.passed).toBe(true)
    expect(s.rawWpm).toBe(46)
    expect(s.legacy).toBe(true)
  })

  it('does not count attempts that ended with wrong characters as passed', () => {
    expect(migrateLegacyRow({ ...legacyRow, mistakes: 3 })!.passed).toBe(false)
  })

  it('rejects malformed rows', () => {
    expect(migrateLegacyRow({ ...legacyRow, wpm: 'fast' })).toBeNull()
    expect(migrateLegacyRow({ ...legacyRow, completedAt: 'yesterday-ish' })).toBeNull()
    expect(migrateLegacyRow(null)).toBeNull()
  })

  it('loads v1 data when no v2 data exists, and keeps the v1 key', () => {
    localStorage.setItem(LEGACY_KEY, JSON.stringify([legacyRow]))
    const d = getData()
    expect(d.sessions).toHaveLength(1)
    expect(d.migratedFromV1?.sessions).toBe(1)
    expect(localStorage.getItem(LEGACY_KEY)).not.toBeNull()
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()
  })

  it('prefers v2 data and falls back to v1 when v2 is corrupt', () => {
    const v1 = JSON.stringify([legacyRow])
    expect(loadFromStrings('{not json', null, v1).data.sessions).toHaveLength(1)
    const v2 = JSON.stringify(emptyData())
    expect(loadFromStrings(null, v2, v1).data.sessions).toHaveLength(0)
    expect(loadFromStrings(v2, null, v1).data.sessions).toHaveLength(0)
  })

  it('migrates v2 progress to v3 without deleting the old key', () => {
    const old = { ...emptyData(), version: 2, missions: undefined, favorites: ['linux.pwd'] }
    localStorage.setItem(PREVIOUS_KEY, JSON.stringify(old))
    expect(getData().favorites).toEqual(['linux.pwd'])
    expect(getData().missions).toEqual({})
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull()
    expect(localStorage.getItem(PREVIOUS_KEY)).not.toBeNull()
  })
})

describe('validation', () => {
  it('drops invalid sessions and counts them', () => {
    const good = migrateLegacyRow(legacyRow)!
    const r = validateAppData({ ...emptyData(), sessions: [good, { id: 'x' }, { ...good, id: 'y', accuracy: 'high' }] })
    expect(r.accepted).toBe(1)
    expect(r.rejected).toBe(2)
  })

  it('rejects lastVisited paths that are not app-relative', () => {
    const r = validateAppData({ ...emptyData(), lastVisited: { path: 'https://evil.example', title: 't', at: '2026-01-01T00:00:00Z' } })
    expect(r.data.lastVisited).toBeUndefined()
  })
})

describe('import and export', () => {
  it('round-trips a v3 export', () => {
    recordSession({
      kind: 'speed', trackId: 'mixed', itemId: 'mixed', durationSec: 30, wpm: 50, rawWpm: 55, accuracy: 96,
      correctChars: 125, keystrokes: 130, uncorrected: 0, corrected: 5, missing: 0, excess: 0, passed: false,
    })
    toggleFavorite('linux.pwd')
    const text = exportDocument()
    clearAllData()
    expect(getData().sessions).toHaveLength(0)
    const r = importText(text, 'replace')
    expect(r.ok).toBe(true)
    expect(r.format).toBe('v3')
    expect(getData().sessions).toHaveLength(1)
    expect(getData().favorites).toEqual(['linux.pwd'])
  })

  it('imports a version 1 export document and raw array', () => {
    expect(parseImport(JSON.stringify({ exportVersion: 1, app: 'CodeRush', sessions: [legacyRow] })).format).toBe('v1-export')
    expect(parseImport(JSON.stringify([legacyRow])).format).toBe('v1-array')
  })

  it('accepts a version 2 export without missions', () => {
    const old = { ...emptyData(), version: 2, missions: undefined, favorites: ['linux.pwd'] }
    const result = parseImport(JSON.stringify({ app: 'CodeRush', schemaVersion: 2, data: old }))
    expect(result.format).toBe('v2')
    expect(result.data?.favorites).toEqual(['linux.pwd'])
    expect(result.data?.missions).toEqual({})
  })

  it('explains failures', () => {
    expect(parseImport('nope').error).toMatch(/not valid JSON/)
    expect(parseImport('{"hello":1}').error).toMatch(/does not contain/)
    expect(parseImport(JSON.stringify({ app: 'CodeRush', schemaVersion: 99, data: {} })).error).toMatch(/newer version/)
    expect(parseImport('[]').ok).toBe(false)
  })

  it('merges without duplicating sessions', () => {
    const a = parseImport(JSON.stringify([legacyRow])).data!
    const merged = mergeData(a, a)
    expect(merged.sessions).toHaveLength(1)
  })

  it('previews counts and duplicate IDs across all progress records', () => {
    const current = emptyData()
    const incoming = emptyData()
    current.sessions = [migrateLegacyRow(legacyRow)!]
    incoming.sessions = [migrateLegacyRow(legacyRow)!]
    current.commands['linux.pwd'] = { typedBestAccuracy: 100, typedPerfect: 1, recallAttempts: 0, recallSuccess: 0, successDays: [], lastPracticed: '2026-03-01T10:00:00Z' }
    incoming.commands['linux.pwd'] = current.commands['linux.pwd']!
    incoming.commands['linux.ls'] = current.commands['linux.pwd']!
    const preview = importComparison(current, incoming)
    expect(preview.sessions).toEqual({ current: 1, incoming: 1, duplicates: 1, afterMerge: 1 })
    expect(preview.commands).toEqual({ current: 1, incoming: 2, duplicates: 1, afterMerge: 2 })
    expect(preview.missions.afterMerge).toBe(0)
  })
})

describe('command progress', () => {
  it('counts only perfect typed attempts toward mastery and logs recall confusion', () => {
    recordCommandTyped('linux.ls', 80, false)
    expect(getData().commands['linux.ls']!.typedPerfect).toBe(0)
    recordCommandTyped('linux.ls', 95, true)
    expect(getData().commands['linux.ls']!.typedBestAccuracy).toBe(95)
    recordRecall('linux.ls', false, 'linux.pwd')
    expect(getData().commands['linux.ls']!.lastRecallCorrect).toBe(false)
    recordRecall('linux.ls', true)
    expect(getData().commands['linux.ls']!.lastRecallCorrect).toBe(true)
    expect(getData().confusions[0]).toMatchObject({ expected: 'linux.ls', got: 'linux.pwd' })
    expect(getData().recent[0]).toBe('linux.ls')
  })
})
