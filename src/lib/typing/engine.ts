/**
 * CodeRush typing engine. Pure functions, no React.
 *
 * Definitions, used everywhere in the app and covered by engine.test.ts:
 * - keystroke: one character the learner inserted. Auto-filled indentation is not a keystroke.
 * - accuracy: correct keystrokes / keystrokes. Errors fixed with Backspace still count against it.
 * - net WPM: (correct characters currently in the text, excluding auto-filled ones / 5) / minutes.
 * - raw WPM: (keystrokes / 5) / minutes, including keystrokes later deleted.
 * - uncorrected errors: positions that are wrong right now.
 * - corrected errors: error keystrokes whose position is now correct.
 * - missing: target characters never reached. excess: keystrokes typed after the end.
 * - perfect: the final text equals the target exactly.
 */
import { categoriesAt, type MistakeCategory } from './categories'

export type StatPair = [attempts: number, errors: number]

export interface ErrorEvent {
  index: number
  expected: string
  typed: string
}

export interface EngineState {
  target: string
  input: string
  /** auto[i] is true when input[i] was filled in by the engine, not typed. */
  auto: boolean[]
  keystrokes: number
  correctKeystrokes: number
  backspaces: number
  excess: number
  rejectedPastes: number
  errors: ErrorEvent[]
  charStats: Record<string, StatPair>
  categoryStats: Partial<Record<MistakeCategory, StatPair>>
}

export interface EngineOptions {
  /** Forgiving: after a correct newline, leading indentation is filled in automatically. */
  forgiving: boolean
  /** Paste is never allowed on scored surfaces; Custom Practice pastes into a separate source box. */
  allowPaste?: boolean
  /** Accuracy Training: a wrong key is counted as an error but does not advance the cursor. */
  blockOnError?: boolean
}

export type InputMeta = {
  /** InputEvent.inputType when the browser provides it. */
  inputType?: string
  /** True when the text came from an IME composition commit. */
  composed?: boolean
}

/** Larger single insertions are treated as a paste unless they come from IME composition. */
export const MAX_BURST = 3

export function createEngine(target: string): EngineState {
  return {
    target: normalizeNewlines(target),
    input: '',
    auto: [],
    keystrokes: 0,
    correctKeystrokes: 0,
    backspaces: 0,
    excess: 0,
    rejectedPastes: 0,
    errors: [],
    charStats: {},
    categoryStats: {},
  }
}

/** CRLF to LF and Unicode NFC, so "é" typed as one or two code points compares equal. */
export function normalizeNewlines(s: string): string {
  return s.replace(/\r\n?/g, '\n').normalize('NFC')
}

function commonPrefix(a: string, b: string): number {
  const n = Math.min(a.length, b.length)
  let i = 0
  while (i < n && a.charCodeAt(i) === b.charCodeAt(i)) i++
  return i
}

function bump(map: Record<string, StatPair>, key: string, error: boolean) {
  const cur = map[key] ?? [0, 0]
  map[key] = [cur[0] + 1, cur[1] + (error ? 1 : 0)]
}

/** Leading whitespace run that starts at `from` in the target. */
function indentRunLength(target: string, from: number): number {
  let i = from
  while (i < target.length && (target[i] === ' ' || target[i] === '\t')) i++
  return i - from
}

/**
 * Apply a new textarea value. Returns the same object when the change is rejected,
 * so callers can detect rejection with reference equality.
 */
export function applyInput(
  state: EngineState,
  rawNext: string,
  opts: EngineOptions,
  meta: InputMeta = {}
): EngineState {
  const next = normalizeNewlines(rawNext)
  const prev = state.input
  if (next === prev) return state

  const prefix = commonPrefix(prev, next)
  const deleted = prev.length - prefix
  const inserted = next.slice(prefix)

  const isPasteType = meta.inputType === 'insertFromPaste' || meta.inputType === 'insertFromDrop'
  if (!opts.allowPaste && (isPasteType || (inserted.length > MAX_BURST && !meta.composed))) {
    return { ...state, rejectedPastes: state.rejectedPastes + 1 }
  }

  let input = prev.slice(0, prefix)
  let auto = state.auto.slice(0, prefix)
  let { keystrokes, correctKeystrokes, backspaces, excess } = state
  const errors = state.errors.slice()
  const charStats = { ...state.charStats }
  const categoryStats = { ...state.categoryStats } as Record<MistakeCategory, StatPair>
  const target = state.target

  if (deleted > 0) backspaces += 1

  for (const ch of Array.from(inserted)) {
    const index = input.length
    if (index >= target.length) {
      excess += 1
      continue
    }
    // Compare by code point so characters outside the BMP, such as emoji, match as one unit.
    const expected = String.fromCodePoint(target.codePointAt(index)!)
    const ok = ch === expected
    keystrokes += 1
    if (ok) correctKeystrokes += 1
    else errors.push({ index, expected, typed: ch })
    bump(charStats, expected, !ok)
    for (const cat of categoriesAt(target, index)) bump(categoryStats, cat, !ok)
    if (!ok && opts.blockOnError) break
    // A wrong character occupies the width of the expected one so later positions stay aligned.
    const written = ok || ch.length === expected.length ? ch : '�'.repeat(expected.length)
    input += written
    for (let k = 0; k < written.length; k++) auto.push(false)

    if (ok && ch === '\n' && opts.forgiving) {
      const run = indentRunLength(target, input.length)
      if (run > 0) {
        input += target.slice(input.length, input.length + run)
        auto = auto.concat(new Array<boolean>(run).fill(true))
      }
    }
  }

  return {
    ...state,
    input,
    auto,
    keystrokes,
    correctKeystrokes,
    backspaces,
    excess,
    errors,
    charStats,
    categoryStats,
  }
}

/**
 * Explicit Tab mechanism: when the next expected characters are whitespace, fill that run.
 * Returns null when Tab should keep its normal focus-navigation behavior.
 */
export function applyTab(state: EngineState, opts: EngineOptions): EngineState | null {
  const at = state.input.length
  const run = indentRunLength(state.target, at)
  if (run === 0) return null
  const fill = state.target.slice(at, at + run)
  let s = state
  // Feed one character at a time so each counts as a deliberate keystroke.
  for (const ch of fill) s = applyInput(s, s.input + ch, { ...opts, forgiving: false }, { inputType: 'insertText' })
  return s
}

export interface TypingMetrics {
  wpm: number
  rawWpm: number
  accuracy: number
  correctChars: number
  keystrokes: number
  uncorrected: number
  corrected: number
  missing: number
  excess: number
  progress: number
  perfect: boolean
  complete: boolean
}

const MIN_MINUTES = 1 / 60

export function computeMetrics(state: EngineState, elapsedMs: number): TypingMetrics {
  const { target, input, auto } = state
  let correctChars = 0
  let uncorrected = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] === target[i]) {
      if (!auto[i]) correctChars++
    } else uncorrected++
  }
  let corrected = 0
  for (const e of state.errors) {
    if (e.index < input.length && input[e.index] === target[e.index]) corrected++
  }
  const minutes = Math.max(elapsedMs / 60_000, MIN_MINUTES)
  const hasTime = elapsedMs > 0
  return {
    wpm: hasTime ? Math.round(correctChars / 5 / minutes) : 0,
    rawWpm: hasTime ? Math.round(state.keystrokes / 5 / minutes) : 0,
    accuracy:
      state.keystrokes === 0 ? 100 : Math.round((state.correctKeystrokes / state.keystrokes) * 1000) / 10,
    correctChars,
    keystrokes: state.keystrokes,
    uncorrected,
    corrected,
    missing: Math.max(0, target.length - input.length),
    excess: state.excess,
    progress: target.length === 0 ? 0 : Math.min(1, input.length / target.length),
    perfect: input === target && target.length > 0,
    complete: input.length >= target.length && target.length > 0,
  }
}

export type CharState = 'correct' | 'error' | 'pending'

export function charStateAt(state: EngineState, index: number): CharState {
  if (index >= state.input.length) return 'pending'
  return state.input[index] === state.target[index] ? 'correct' : 'error'
}

/** Merge per-session stats into a running total. */
export function mergeStats<K extends string>(
  into: Partial<Record<K, StatPair>>,
  add: Partial<Record<K, StatPair>>
): Partial<Record<K, StatPair>> {
  const out = { ...into }
  for (const k of Object.keys(add) as K[]) {
    const a = out[k] ?? [0, 0]
    const b = add[k]!
    out[k] = [a[0] + b[0], a[1] + b[1]]
  }
  return out
}
