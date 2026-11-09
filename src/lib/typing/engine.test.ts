import { describe, it, expect } from 'vitest'
import { applyInput, applyTab, computeMetrics, createEngine, charStateAt, type EngineState } from './engine'
import { categoriesAt } from './categories'

const strict = { forgiving: false }
const forgiving = { forgiving: true }

/** Type text one character at a time, the way a keyboard does. */
function type(state: EngineState, text: string, opts = strict): EngineState {
  let s = state
  for (const ch of text) s = applyInput(s, s.input + ch, opts, { inputType: 'insertText' })
  return s
}
function backspace(state: EngineState, n = 1): EngineState {
  let s = state
  for (let i = 0; i < n; i++) s = applyInput(s, s.input.slice(0, -1), strict, { inputType: 'deleteContentBackward' })
  return s
}

describe('typing engine', () => {
  it('reports 100% accuracy and zero WPM before any input', () => {
    const m = computeMetrics(createEngine('abc'), 0)
    expect(m.accuracy).toBe(100)
    expect(m.wpm).toBe(0)
    expect(m.rawWpm).toBe(0)
    expect(m.missing).toBe(3)
    expect(m.progress).toBe(0)
  })

  it('matches correct characters', () => {
    const s = type(createEngine('ls -la'), 'ls -la')
    const m = computeMetrics(s, 60_000)
    expect(m.perfect).toBe(true)
    expect(m.complete).toBe(true)
    expect(m.accuracy).toBe(100)
    expect(m.correctChars).toBe(6)
    expect(charStateAt(s, 0)).toBe('correct')
  })

  it('marks incorrect characters and keeps them as uncorrected errors', () => {
    const s = type(createEngine('pwd'), 'pxd')
    const m = computeMetrics(s, 60_000)
    expect(charStateAt(s, 1)).toBe('error')
    expect(m.uncorrected).toBe(1)
    expect(m.corrected).toBe(0)
    expect(m.perfect).toBe(false)
    expect(m.complete).toBe(true)
    expect(m.accuracy).toBeCloseTo(66.7, 1)
  })

  it('counts errors fixed with Backspace as corrected but keeps them in accuracy', () => {
    let s = type(createEngine('cat'), 'cx')
    s = backspace(s)
    s = type(s, 'at')
    const m = computeMetrics(s, 60_000)
    expect(m.perfect).toBe(true)
    expect(m.uncorrected).toBe(0)
    expect(m.corrected).toBe(1)
    expect(m.keystrokes).toBe(4)
    expect(m.accuracy).toBe(75)
    expect(s.backspaces).toBe(1)
  })

  it('computes net WPM from correct characters and raw WPM from all keystrokes', () => {
    // 10 correct chars + 5 wrong-then-deleted keystrokes in one minute.
    let s = type(createEngine('0123456789'), '01234')
    s = type(s, 'xxxxx')
    s = backspace(s, 5)
    s = type(s, '56789')
    const m = computeMetrics(s, 60_000)
    expect(m.wpm).toBe(2) // 10 / 5
    expect(m.rawWpm).toBe(3) // 15 / 5
  })

  it('handles multiline targets and newline characters', () => {
    const target = 'a\nb'
    let s = type(createEngine(target), 'a')
    s = applyInput(s, s.input + '\n', strict, { inputType: 'insertLineBreak' })
    s = type(s, 'b')
    expect(computeMetrics(s, 1000).perfect).toBe(true)
  })

  it('normalizes CRLF targets and input', () => {
    const s = applyInput(createEngine('a\r\nb'), 'a\r\n', strict, { inputType: 'insertLineBreak' })
    expect(s.target).toBe('a\nb')
    expect(s.input).toBe('a\n')
  })

  it('auto-fills indentation in forgiving mode without counting it as typed', () => {
    const target = 'if x:\n    y'
    let s = type(createEngine(target), 'if x:\n', forgiving)
    expect(s.input).toBe('if x:\n    ')
    s = type(s, 'y', forgiving)
    const m = computeMetrics(s, 60_000)
    expect(m.perfect).toBe(true)
    expect(m.keystrokes).toBe(7)
    expect(m.correctChars).toBe(7) // the four auto-filled spaces are excluded
  })

  it('requires indentation to be typed in strict mode', () => {
    const s = type(createEngine('a\n  b'), 'a\n', strict)
    expect(s.input).toBe('a\n')
  })

  it('fills a whitespace run with the explicit Tab mechanism and declines otherwise', () => {
    const s0 = type(createEngine('x\n\tif'), 'x\n')
    const s1 = applyTab(s0, strict)
    expect(s1?.input).toBe('x\n\t')
    expect(applyTab(s1!, strict)).toBeNull()
  })

  it('rejects pasted text so scores cannot be inflated', () => {
    const s0 = createEngine('Get-Process')
    const pasted = applyInput(s0, 'Get-Process', strict, { inputType: 'insertFromPaste' })
    expect(pasted.input).toBe('')
    expect(pasted.rejectedPastes).toBe(1)
    const burst = applyInput(s0, 'Get-Proc', strict, {})
    expect(burst.input).toBe('')
  })

  it('accepts multi-character IME composition commits', () => {
    const s = applyInput(createEngine('日本語'), '日本語', strict, { composed: true })
    expect(computeMetrics(s, 1000).perfect).toBe(true)
  })

  it('allows paste only when the mode opts in', () => {
    const s = applyInput(createEngine('abcdef'), 'abcdef', { forgiving: false, allowPaste: true }, { inputType: 'insertFromPaste' })
    expect(s.input).toBe('abcdef')
  })

  it('counts keystrokes after the end as excess and ignores them', () => {
    const s = type(createEngine('ok'), 'okay')
    const m = computeMetrics(s, 1000)
    expect(s.input).toBe('ok')
    expect(m.excess).toBe(2)
    expect(m.perfect).toBe(true)
  })

  it('handles characters outside the Basic Multilingual Plane', () => {
    let s = type(createEngine('a🚀b'), 'a🚀b')
    expect(computeMetrics(s, 1000).perfect).toBe(true)
    s = type(createEngine('a🚀b'), 'ax')
    expect(charStateAt(s, 1)).toBe('error')
    expect(s.input.length).toBe(3) // wrong char occupies the emoji's two code units
  })

  it('treats composed and decomposed accents as equal', () => {
    const s = type(createEngine('café'), 'cafe\u0301'.normalize('NFC'))
    expect(computeMetrics(s, 1000).perfect).toBe(true)
  })

  it('records per-character and per-category statistics', () => {
    const s = type(createEngine('a | b'), 'a / b')
    expect(s.charStats['|']).toEqual([1, 1])
    expect(s.categoryStats.pipe).toEqual([1, 1])
    expect(s.errors[0]).toEqual({ index: 2, expected: '|', typed: '/' })
  })

  it('reports partial progress and missing characters', () => {
    const m = computeMetrics(type(createEngine('abcd'), 'ab'), 1000)
    expect(m.progress).toBe(0.5)
    expect(m.missing).toBe(2)
    expect(m.complete).toBe(false)
  })

  it('blocks progress on a wrong key in accuracy mode but still counts the error', () => {
    const opts = { forgiving: false, blockOnError: true }
    let s = applyInput(createEngine('ab'), 'x', opts, { inputType: 'insertText' })
    expect(s.input).toBe('')
    expect(s.keystrokes).toBe(1)
    s = applyInput(s, 'a', opts, { inputType: 'insertText' })
    s = applyInput(s, 'ab', opts, { inputType: 'insertText' })
    const m = computeMetrics(s, 1000)
    expect(m.perfect).toBe(true)
    expect(m.accuracy).toBeCloseTo(66.7, 1)
    expect(m.corrected).toBe(1)
  })

  it('treats an empty target as never complete', () => {
    const m = computeMetrics(createEngine(''), 1000)
    expect(m.complete).toBe(false)
    expect(m.perfect).toBe(false)
  })
})

describe('mistake categories', () => {
  it('detects command parameters and indentation', () => {
    const t = 'Test-NetConnection -Port 443\n    x'
    expect(categoriesAt(t, t.indexOf('-Port') + 1)).toContain('parameters')
    expect(categoriesAt(t, t.indexOf('-Port'))).toEqual(expect.arrayContaining(['hyphen', 'parameters']))
    expect(categoriesAt(t, 4)).toEqual(['hyphen']) // the hyphen inside Test-NetConnection is not a parameter
    expect(categoriesAt(t, t.indexOf('\n') + 1)).toContain('indentation')
    expect(categoriesAt(t, 0)).toContain('capitalization')
  })
})
