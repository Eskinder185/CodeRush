/**
 * Content validation. Run with `npm run validate:content`.
 * These tests are the source of truth for the counts quoted in the README.
 */
import { describe, it, expect } from 'vitest'
import { commands, getCommand } from './commands'
import { scenarios } from './scenarios'
import { learningPaths } from './paths'
import { languageTracks, codeLessonCount, getLesson } from './code'
import { answersFor, matchesAny } from '../lib/terminal/match'
import { SHELL_OF } from '../lib/terminal/simulator'

const PREFIX = { linux: 'linux.', powershell: 'ps.', 'windows-cmd': 'win.', 'cisco-ios': 'ios.' } as const

/** IPv4 addresses allowed in sample output: documentation, private, special-purpose, masks, and example.com. */
function allowedIPv4(ip: string): boolean {
  const o = ip.split('.').map(Number)
  if (o.length !== 4 || o.some((n) => Number.isNaN(n) || n > 255)) return true // not an address, e.g. a version number
  if (/^\d{1,2}\.0\.0\.0$/.test(ip)) return true // module versions such as 7.0.0.0
  const [a, b, c] = o as [number, number, number, number]
  return (
    (a === 192 && b === 0 && c === 2) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a === 10 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a === 127 ||
    (a === 169 && b === 254) ||
    a === 0 ||
    a === 255 ||
    a >= 224 ||
    ip === '93.184.215.14' // example.com, an IANA-reserved example domain
  )
}

describe('programming lessons', () => {
  it('preserves all 45 original lessons across nine tracks', () => {
    expect(languageTracks).toHaveLength(9)
    expect(codeLessonCount).toBe(45)
  })
  it('has unique lesson ids and non-empty code', () => {
    const ids = new Set<string>()
    for (const t of languageTracks)
      for (const l of t.lessons) {
        expect(ids.has(l.id), l.id).toBe(false)
        ids.add(l.id)
        expect(l.code.trim().length).toBeGreaterThan(20)
      }
  })
})

describe('command exercises', () => {
  it('meets the 200 distinct exercise target', () => {
    expect(commands.length).toBeGreaterThanOrEqual(200)
  })

  it('has unique, well-formed ids that match their platform', () => {
    const ids = new Set<string>()
    for (const c of commands) {
      expect(ids.has(c.id), `duplicate id ${c.id}`).toBe(false)
      ids.add(c.id)
      expect(c.id.startsWith(PREFIX[c.platform]), c.id).toBe(true)
      expect(c.id).toMatch(/^[a-z]+\.[a-z0-9-]+$/)
      expect(c.shell).toBe(SHELL_OF[c.platform])
    }
  })

  it('does not repeat a command under a different title', () => {
    const seen = new Map<string, string>()
    for (const c of commands) {
      const key = `${c.platform}|${c.command.toLowerCase().replace(/\s+/g, ' ')}`
      expect(seen.get(key), `${c.id} duplicates ${seen.get(key)}`).toBeUndefined()
      seen.set(key, c.id)
    }
  })

  it('fills every required field', () => {
    for (const c of commands) {
      for (const f of ['command', 'title', 'subcategory', 'objective', 'summary', 'whenToUse', 'recallPrompt'] as const) {
        expect(c[f].trim().length, `${c.id}.${f}`).toBeGreaterThan(0)
      }
      expect(c.syntax.length, `${c.id}.syntax`).toBeGreaterThan(0)
      expect(c.mistakes.length, `${c.id}.mistakes`).toBeGreaterThan(0)
      expect(c.practice.length, `${c.id}.practice`).toBeGreaterThan(0)
      expect(c.source.url, `${c.id}.source`).toMatch(/^https:\/\//)
      expect(typeof c.sampleOutput, `${c.id}.sampleOutput`).toBe('string')
    }
  })

  it('resolves related commands and prerequisites', () => {
    for (const c of commands) {
      for (const r of [...(c.related ?? []), ...(c.prerequisites ?? [])]) {
        expect(getCommand(r), `${c.id} -> ${r}`).toBeDefined()
      }
    }
  })

  it('does not give the answer away in recall prompts', () => {
    for (const c of commands) {
      if (c.command.length < 8) continue
      expect(c.recallPrompt.toLowerCase().includes(c.command.toLowerCase()), c.id).toBe(false)
    }
  })

  it('labels elevated and state-changing commands honestly', () => {
    for (const c of commands) {
      if (/^sudo\s/.test(c.command)) expect(c.permissions, c.id).toBe('elevated')
      const changes = /^(sudo\s+)?(rm|kill|chmod|chown|mkdir|touch|cp|mv|ln|tar\s+-c|export)\b|^(Restart|Stop|Remove|Clear|New|Copy|Update)-|Export-Csv|>|^copy |ipconfig \/(renew|flushdns)/i
      if (changes.test(c.command.replace(/2>\/dev\/null/g, '')) && !/-WhatIf/i.test(c.command)) {
        expect(c.safety, `${c.id} changes state but is labelled read-only`).not.toBe('read-only')
      }
    }
  })

  it('uses only documentation, private, or reserved IPv4 addresses in sample output', () => {
    for (const c of commands) {
      for (const ip of c.sampleOutput.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) ?? []) {
        expect(allowedIPv4(ip), `${c.id} uses ${ip}`).toBe(true)
      }
    }
  })

  it('covers every major platform at more than one difficulty level', () => {
    for (const p of Object.keys(PREFIX)) {
      const levels = new Set(commands.filter((c) => c.platform === p).map((c) => c.difficulty))
      expect(levels.size, p).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('scenarios', () => {
  it('meets the 30 scenario target with unique ids', () => {
    expect(scenarios.length).toBeGreaterThanOrEqual(30)
    expect(new Set(scenarios.map((s) => s.id)).size).toBe(scenarios.length)
  })

  it('has valid steps', () => {
    for (const s of scenarios) {
      expect(s.steps.length, s.id).toBeGreaterThan(0)
      expect(s.wrapUp.meaning && s.wrapUp.nextStep, s.id).toBeTruthy()
      s.steps.forEach((step, i) => {
        const where = `${s.id} step ${i + 1}`
        expect(step.explanation.trim().length, where).toBeGreaterThan(0)
        if (step.kind === 'command') {
          const ids = step.commandIds ?? []
          const answers = [...(step.accepted ?? []), ...ids.flatMap((id) => answersFor(getCommand(id)!))]
          expect(answers.length, `${where} has no accepted answer`).toBeGreaterThan(0)
          for (const id of ids) {
            const cmd = getCommand(id)
            expect(cmd, `${where} -> ${id}`).toBeDefined()
            expect(cmd!.platform, `${where} platform mismatch`).toBe(s.platform)
          }
          // Each explicitly accepted answer must be recognized by the matcher.
          for (const a of step.accepted ?? []) expect(matchesAny(a, answers, SHELL_OF[s.platform]), where).toBe(true)
          const hasOutput = step.output !== undefined || ids.length > 0
          expect(hasOutput, `${where} has no output`).toBe(true)
        } else {
          expect(step.choices?.length ?? 0, where).toBeGreaterThanOrEqual(2)
          expect(step.choices!.filter((c) => c.correct).length, `${where} must have exactly one correct choice`).toBe(1)
          for (const c of step.choices!) expect(c.why.trim().length, where).toBeGreaterThan(0)
        }
      })
    }
  })

  it('uses only documentation, private, or reserved IPv4 addresses', () => {
    for (const s of scenarios) {
      const text = [s.context, ...s.steps.flatMap((st) => [st.prompt, st.output ?? '', ...(st.choices ?? []).map((c) => c.label)])].join('\n')
      for (const ip of text.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) ?? []) expect(allowedIPv4(ip), `${s.id} uses ${ip}`).toBe(true)
    }
  })
})

describe('learning paths', () => {
  const modules = learningPaths.flatMap((p) => p.modules)

  it('has globally unique module and question ids', () => {
    const ids = new Set<string>()
    for (const m of modules) {
      expect(ids.has(m.id), m.id).toBe(false)
      expect(getCommand(m.id), `${m.id} collides with a command id`).toBeUndefined()
      ids.add(m.id)
    }
    const qids = modules.flatMap((m) => m.quiz.map((q) => q.id))
    expect(new Set(qids).size).toBe(qids.length)
  })

  it('resolves every command, scenario, and lesson reference', () => {
    const scen = new Set(scenarios.map((s) => s.id))
    for (const m of modules) {
      for (const id of m.commandIds) expect(getCommand(id), `${m.id} -> ${id}`).toBeDefined()
      for (const id of m.scenarioIds) expect(scen.has(id), `${m.id} -> ${id}`).toBe(true)
      for (const ref of m.lessonRefs ?? []) {
        const [lang, lesson] = ref.split('/')
        expect(getLesson(lang!, lesson!), `${m.id} -> ${ref}`).toBeDefined()
      }
    }
  })

  it('gives every module an outcome, a concept, and a valid quiz', () => {
    for (const m of modules) {
      expect(m.outcome.trim().length, m.id).toBeGreaterThan(0)
      expect(m.concept.length, m.id).toBeGreaterThan(0)
      expect(m.quiz.length, `${m.id} needs a quiz`).toBeGreaterThan(0)
      for (const q of m.quiz) {
        expect(q.choices.length, q.id).toBeGreaterThanOrEqual(2)
        expect(new Set(q.choices).size, `${q.id} has duplicate choices`).toBe(q.choices.length)
        expect(q.answer >= 0 && q.answer < q.choices.length, q.id).toBe(true)
      }
    }
  })

  it('places every command exercise in at least one module', () => {
    const used = new Set(modules.flatMap((m) => m.commandIds))
    const orphans = commands.filter((c) => !used.has(c.id)).map((c) => c.id)
    expect(orphans).toEqual([])
  })

  it('places every scenario in at least one module', () => {
    const used = new Set(modules.flatMap((m) => m.scenarioIds))
    expect(scenarios.filter((s) => !used.has(s.id)).map((s) => s.id)).toEqual([])
  })

  it('includes every programming lesson in the programming path', () => {
    const refs = new Set(modules.flatMap((m) => m.lessonRefs ?? []))
    expect(refs.size).toBe(45)
  })

  it('matches the module counts the spec asks for', () => {
    const count = (id: string) => learningPaths.find((p) => p.id === id)!.modules.length
    expect(count('powershell')).toBe(27)
    expect(count('networking')).toBe(24)
    expect(count('linux-networking')).toBe(10)
    expect(count('cybersecurity')).toBe(19)
  })
})
