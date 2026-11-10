import { describe, it, expect } from 'vitest'
import { commandMastery, moduleMastery, pathProgress, unmetPrerequisites } from './mastery'
import { languageProgress, overallStats, weekKey } from './progress'
import { emptyData, type AppData, type PracticeSession } from './storage/schema'
import { getPath } from '../content/paths'
import { findWeaknesses, buildDrill, findConfusions } from './recommend'
import { dailyChallenge, dailyScore, dailyStreak, daysCompletedInLast } from './daily'
import { checkAnswer, explain, generateQuestion, subnetInfo, ipToInt } from './subnet'
import { achievements, earned } from './achievements'
import { search } from './search'
import { parseSettings, DEFAULT_SETTINGS } from './settings'

function session(over: Partial<PracticeSession>): PracticeSession {
  return {
    id: Math.random().toString(36),
    kind: 'lesson',
    trackId: 'python',
    itemId: 'python-basics-1',
    completedAt: '2026-03-01T10:00:00.000Z',
    durationSec: 60,
    wpm: 40,
    rawWpm: 45,
    accuracy: 96,
    correctChars: 200,
    keystrokes: 210,
    uncorrected: 0,
    corrected: 3,
    missing: 0,
    excess: 0,
    passed: true,
    ...over,
  }
}

describe('command mastery', () => {
  it('is not started without a record', () => {
    expect(commandMastery(undefined)).toMatchObject({ score: 0, level: 'not-started' })
  })

  it('weights typing, recall, and repetition and explains each part', () => {
    const m = commandMastery({ typedBestAccuracy: 100, typedPerfect: 1, recallAttempts: 1, recallSuccess: 1, successDays: ['2026-03-01'], lastPracticed: '2026-03-01T00:00:00Z' })
    // 0.3*1 + 0.4*0.5 + 0.3*(1/3) = 0.6
    expect(m.score).toBe(60)
    expect(m.level).toBe('practiced')
    expect(m.parts.map((p) => p.label)).toEqual(['Typing', 'Recall', 'Repetition'])
  })

  it('requires a successful recall to reach mastered', () => {
    const typedOnly = commandMastery({ typedBestAccuracy: 100, typedPerfect: 5, recallAttempts: 0, recallSuccess: 0, successDays: ['a', 'b', 'c'], lastPracticed: 'x' })
    expect(typedOnly.score).toBe(60)
    const full = commandMastery({ typedBestAccuracy: 98, typedPerfect: 3, recallAttempts: 3, recallSuccess: 2, successDays: ['a', 'b', 'c'], lastPracticed: 'x' })
    expect(full.score).toBe(99)
    expect(full.level).toBe('mastered')
  })

  it('ignores typing accuracy when no attempt was perfect', () => {
    const m = commandMastery({ typedBestAccuracy: 90, typedPerfect: 0, recallAttempts: 1, recallSuccess: 0, successDays: [], lastPracticed: 'x' })
    expect(m.score).toBe(0)
    expect(m.level).toBe('learning')
  })
})

describe('module mastery and path progress', () => {
  const path = getPath('linux')!
  const nav = path.modules[0]!

  it('starts not started', () => {
    expect(moduleMastery(nav, emptyData()).status).toBe('not-started')
    expect(pathProgress(path, emptyData())).toMatchObject({ completed: 0, percent: 0, nextModuleId: nav.id })
  })

  it('requires the quiz and every command to be practiced', () => {
    const d: AppData = emptyData()
    d.quizzes[nav.id] = { best: 1, last: 1, attempts: 1, lastAt: '2026-03-01T00:00:00Z' }
    const r1 = moduleMastery(nav, d)
    expect(r1.status).toBe('in-progress')
    expect(r1.remaining[0]).toMatch(/Practice 5 more commands/)
    for (const id of nav.commandIds) d.commands[id] = { typedBestAccuracy: 100, typedPerfect: 1, recallAttempts: 1, recallSuccess: 1, successDays: ['2026-03-01'], lastPracticed: 'x' }
    const r2 = moduleMastery(nav, d)
    expect(r2.status).toBe('completed')
    expect(r2.parts.reduce((s, p) => s + p.weight, 0)).toBeCloseTo(1)
    expect(pathProgress(path, d).completed).toBe(1)
  })

  it('keeps 50% quiz completion distinct from 80% mastery', () => {
    const d = emptyData()
    d.quizzes[nav.id] = { best: 0.5, last: 0.5, attempts: 1, lastAt: '2026-03-01T00:00:00Z' }
    for (const id of nav.commandIds) d.commands[id] = { typedBestAccuracy: 100, typedPerfect: 3, recallAttempts: 2, recallSuccess: 2, successDays: ['2026-03-01', '2026-03-02', '2026-03-03'], lastPracticed: 'x' }
    expect(moduleMastery(nav, d).status).toBe('completed')
    d.quizzes[nav.id]!.best = 0.8
    expect(moduleMastery(nav, d).status).toBe('mastered')
  })

  it('reports unmet beginner prerequisites without blocking access', () => {
    expect(unmetPrerequisites(path, 3, emptyData()).length).toBeGreaterThan(0)
    expect(unmetPrerequisites(path, 0, emptyData())).toEqual([])
  })

  it('counts programming lessons only when passed', () => {
    const py = getPath('programming')!.modules.find((m) => m.id === 'programming.python')!
    const d = emptyData()
    d.sessions.push(session({ passed: false }))
    expect(moduleMastery(py, d).parts.find((p) => p.label === 'Lessons')!.value).toBe(0)
    d.sessions.push(session({ passed: true }))
    expect(moduleMastery(py, d).parts.find((p) => p.label === 'Lessons')!.value).toBeCloseTo(1 / py.lessonRefs!.length)
  })
})

describe('lesson progress (1.x bug fixes)', () => {
  it('uses the library size as the denominator, not the attempt count', () => {
    const d = emptyData()
    d.sessions.push(session({}), session({}), session({}))
    const p = languageProgress(d, 'python')
    expect(p.total).toBe(5)
    expect(p.passed).toBe(1)
    expect(p.percent).toBe(20)
  })

  it('does not count attempts that ended with mistakes as completed', () => {
    const d = emptyData()
    d.sessions.push(session({ passed: false, uncorrected: 4 }))
    expect(languageProgress(d, 'python').passed).toBe(0)
    expect(languageProgress(d, 'python').attempted).toBe(1)
    expect(overallStats(d).lessonsPassed).toBe(0)
  })

  it('computes ISO week keys', () => {
    expect(weekKey('2026-01-01T12:00:00')).toBe('2026-W01')
    expect(weekKey('2026-03-03T12:00:00')).toBe('2026-W10')
  })
})

describe('smart mistake training', () => {
  it('finds weaknesses only with enough evidence and explains them', () => {
    const d = emptyData()
    d.sessions.push(session({ categoryStats: { pipe: [10, 5] } }))
    expect(findWeaknesses(d)).toEqual([])
    d.sessions.push(session({ categoryStats: { pipe: [20, 4], braces: [30, 0] } }))
    const w = findWeaknesses(d)
    expect(w).toHaveLength(1)
    expect(w[0]!.category).toBe('pipe')
    expect(w[0]!.reason).toMatch(/9 times in 30 attempts \(30%\)/)
  })

  it('builds drills dense in the weak category', () => {
    const drill = buildDrill('pipe')
    const lines = drill.text.split('\n')
    expect(lines.length).toBeGreaterThan(3)
    expect(lines.every((l) => l.includes('|'))).toBe(true)
    expect(buildDrill('pipe').text).toBe(drill.text) // deterministic
  })

  it('reports repeated command confusions', () => {
    const d = emptyData()
    d.confusions.push({ expected: 'linux.ip-route-show', got: 'linux.ip-addr-show', at: 'x' })
    expect(findConfusions(d)).toEqual([])
    d.confusions.push({ expected: 'linux.ip-route-show', got: 'linux.ip-addr-show', at: 'y' })
    expect(findConfusions(d)[0]!.reason).toMatch(/ip addr show/)
  })
})

describe('daily challenge', () => {
  it('is deterministic per date and varies across dates', () => {
    expect(dailyChallenge('2026-03-03')).toEqual(dailyChallenge('2026-03-03'))
    const texts = new Set(['2026-03-01', '2026-03-02', '2026-03-03', '2026-03-04', '2026-03-05'].map((d) => dailyChallenge(d).text))
    expect(texts.size).toBeGreaterThan(1)
    expect(dailyChallenge('2026-03-03').text.length).toBeGreaterThan(10)
  })

  it('scores accuracy above raw speed', () => {
    expect(dailyScore(50, 100)).toBeGreaterThan(dailyScore(60, 85))
  })

  it('computes a gentle streak', () => {
    const d = emptyData()
    const r = { score: 1, wpm: 1, accuracy: 100, completedAt: 'x' }
    d.daily['2026-03-01'] = r
    d.daily['2026-03-02'] = r
    expect(dailyStreak(d, '2026-03-03')).toBe(2) // today not done yet, streak still shown
    d.daily['2026-03-03'] = r
    expect(dailyStreak(d, '2026-03-03')).toBe(3)
    expect(dailyStreak(d, '2026-03-05')).toBe(0)
    expect(daysCompletedInLast(d, '2026-03-05', 30)).toBe(3)
  })
})

describe('subnetting', () => {
  it('computes subnet details', () => {
    expect(subnetInfo('192.0.2.70', 26)).toMatchObject({
      mask: '255.255.255.192',
      network: '192.0.2.64',
      broadcast: '192.0.2.127',
      firstHost: '192.0.2.65',
      lastHost: '192.0.2.126',
      usableHosts: 62,
      blockSize: 64,
    })
    expect(subnetInfo('10.20.30.40', 16)).toMatchObject({ network: '10.20.0.0', broadcast: '10.20.255.255', usableHosts: 65534 })
    expect(subnetInfo('172.16.5.9', 30)).toMatchObject({ network: '172.16.5.8', usableHosts: 2 })
  })

  it('rejects malformed addresses', () => {
    expect(ipToInt('300.1.1.1')).toBeNaN()
    expect(ipToInt('1.2.3')).toBeNaN()
  })

  it('checks answers leniently on format but strictly on value', () => {
    const q = { ip: '192.0.2.70', prefix: 26, fields: [] }
    expect(checkAnswer(q, 'network', ' 192.0.2.64 ')).toBe(true)
    expect(checkAnswer(q, 'network', '192.0.2.0')).toBe(false)
    expect(checkAnswer(q, 'usableHosts', '62')).toBe(true)
    expect(checkAnswer(q, 'usableHosts', '64')).toBe(false)
  })

  it('generates deterministic, valid questions in range', () => {
    for (let seed = 1; seed < 200; seed++) {
      const q = generateQuestion(seed, 'advanced')
      expect(q.prefix).toBeGreaterThanOrEqual(16)
      expect(q.prefix).toBeLessThanOrEqual(30)
      expect(Number.isNaN(ipToInt(q.ip))).toBe(false)
    }
    expect(generateQuestion(42)).toEqual(generateQuestion(42))
  })

  it('explains the calculation step by step', () => {
    const steps = explain({ ip: '192.0.2.70', prefix: 26, fields: [] })
    expect(steps.join(' ')).toMatch(/Block size = 256 - 192 = 64/)
  })
})

describe('achievements', () => {
  it('awards nothing to a new learner', () => {
    expect(earned(emptyData())).toEqual([])
  })
  it('reflects recorded activity', () => {
    const d = emptyData()
    d.sessions.push(session({ passed: true, accuracy: 100, keystrokes: 120 }))
    const ids = earned(d).map((a) => a.id)
    expect(ids).toContain('first-lesson')
    expect(ids).toContain('perfect-score')
    expect(achievements.every((a) => typeof a.detail(d) === 'string')).toBe(true)
  })
})

describe('search', () => {
  const top = (q: string, n = 5) => search(q).slice(0, n).map((r) => r.entry.id)

  it('finds commands through aliases and synonyms', () => {
    expect(top('find ip address', 8)).toEqual(expect.arrayContaining(['linux.ip-addr-show']))
    expect(top('check open ports', 8).some((id) => ['linux.ss-tuln', 'ps.get-nettcpconnection-listen', 'win.netstat-ano'].includes(id))).toBe(true)
    expect(top('powershell firewall', 6).some((id) => id.startsWith('ps.get-netfirewall'))).toBe(true)
    expect(top('routing table', 8).some((id) => ['linux.ip-route-show', 'win.route-print', 'ios.show-ip-route', 'ps.get-netroute'].includes(id))).toBe(true)
  })

  it('finds learning paths, languages, and lessons', () => {
    expect(top('dns', 10).some((id) => id.startsWith('module:') || id.includes('dns') || id.includes('dig'))).toBe(true)
    expect(search('python functions').some((r) => r.entry.kind === 'lesson')).toBe(true)
    expect(search('linux permissions').length).toBeGreaterThan(0)
    expect(search('network troubleshooting').some((r) => r.entry.kind === 'scenario' || r.entry.kind === 'module')).toBe(true)
  })

  it('applies filters', () => {
    const r = search('dns', { platform: 'powershell' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((x) => x.entry.platform === 'powershell')).toBe(true)
    expect(search('dns', { kind: 'scenario' }).every((x) => x.entry.kind === 'scenario')).toBe(true)
  })

  it('returns nothing for empty or nonsense queries', () => {
    expect(search('')).toEqual([])
    expect(search('zzqqxxy')).toEqual([])
  })
})

describe('settings', () => {
  it('falls back to defaults for invalid stored values', () => {
    expect(parseSettings({ theme: 'neon', fontSize: 400, sound: 'yes' })).toEqual({ ...DEFAULT_SETTINGS, fontSize: 26 })
    expect(parseSettings(null)).toEqual(DEFAULT_SETTINGS)
  })
})
