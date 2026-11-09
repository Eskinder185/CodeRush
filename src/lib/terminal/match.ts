/**
 * Command recognition for the simulated terminal.
 *
 * SAFETY: this module only compares strings. Input is never evaluated, executed, sent anywhere,
 * or used to build code. The terminal can only print output that is stored in content files.
 *
 * Matching rules, per shell:
 * - All shells: surrounding whitespace and a trailing semicolon are ignored, runs of spaces collapse,
 *   spacing around | ; is normalized, and '...' and "..." are treated alike when the quoted text
 *   contains no $ or backslash.
 * - bash: case-sensitive. Bundled short flags are order-independent, so -la equals -al.
 * - powershell: case-insensitive. Spacing around { } ( ) and commas is normalized, and named
 *   parameters within each pipeline segment may appear in any order.
 * - cmd: case-insensitive.
 * - ios: case-insensitive, and each word may be abbreviated to a prefix of at least two letters,
 *   the way Cisco IOS accepts "sh ip int br".
 */
import type { CommandExercise } from '../../content/types'

export type Shell = CommandExercise['shell']

export const MAX_INPUT = 500

/** Split on whitespace outside quotes. Quotes stay attached to their token. */
export function tokenize(input: string): string[] {
  const out: string[] = []
  let cur = ''
  let quote: string | null = null
  for (const ch of input) {
    if (quote) {
      cur += ch
      if (ch === quote) quote = null
    } else if (ch === '"' || ch === "'") {
      quote = ch
      cur += ch
    } else if (/\s/.test(ch)) {
      if (cur) out.push(cur)
      cur = ''
    } else {
      cur += ch
    }
  }
  if (cur) out.push(cur)
  return out
}

/** Insert spaces around the given punctuation when it is outside quotes. */
function spaceOut(input: string, chars: string): string {
  let out = ''
  let quote: string | null = null
  for (let i = 0; i < input.length; i++) {
    const ch = input[i]!
    if (quote) {
      out += ch
      if (ch === quote) quote = null
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      out += ch
      continue
    }
    if (chars.includes(ch)) {
      // Keep || and && as single operators.
      const pair = input.slice(i, i + 2)
      if (pair === '||' || pair === '&&') {
        out += ` ${pair} `
        i++
        continue
      }
      out += ` ${ch} `
    } else out += ch
  }
  return out
}

function normalizeQuotes(tok: string): string {
  const m = /^(["'])(.*)\1$/.exec(tok)
  if (!m) return tok
  const inner = m[2]!
  if (inner.includes('$') || inner.includes('\\') || inner.includes("'")) return tok
  return `'${inner}'`
}

function sortFlagBundle(tok: string): string {
  return /^-[A-Za-z]{2,}$/.test(tok) ? '-' + tok.slice(1).split('').sort().join('') : tok
}

/** Within each pipeline segment, sort "-Name value" groups so parameter order does not matter. */
function sortPowerShellParams(tokens: string[]): string[] {
  const out: string[] = []
  let seg: string[] = []
  const flush = () => {
    if (seg.length === 0) return
    const head: string[] = []
    const groups: string[][] = []
    let i = 0
    while (i < seg.length && !seg[i]!.startsWith('-')) head.push(seg[i++]!)
    while (i < seg.length) {
      const t = seg[i]!
      if (t.startsWith('-') && /^-[a-z]/.test(t)) {
        const g = [t]
        if (i + 1 < seg.length && !seg[i + 1]!.startsWith('-')) g.push(seg[++i]!)
        groups.push(g)
      } else groups.push([t])
      i++
    }
    groups.sort((a, b) => a.join(' ').localeCompare(b.join(' ')))
    out.push(...head, ...groups.flat())
    seg = []
  }
  for (const t of tokens) {
    if (t === '|' || t === ';' || t === '{' || t === '}') {
      flush()
      out.push(t)
    } else seg.push(t)
  }
  flush()
  return out
}

export function normalize(input: string, shell: Shell): string {
  let s = input.slice(0, MAX_INPUT).trim().replace(/;+$/, '').trim()
  s = spaceOut(s, shell === 'powershell' ? '|;{}(),' : '|;')
  let tokens = tokenize(s).map(normalizeQuotes)
  if (shell !== 'bash') tokens = tokens.map((t) => t.toLowerCase())
  if (shell === 'bash') tokens = tokens.map(sortFlagBundle)
  if (shell === 'powershell') tokens = sortPowerShellParams(tokens)
  return tokens.join(' ')
}

function iosMatches(input: string, candidate: string): boolean {
  const a = normalize(input, 'ios').split(' ')
  const b = normalize(candidate, 'ios').split(' ')
  if (a.length !== b.length) return false
  return a.every((tok, i) => {
    const full = b[i]!
    if (tok === full) return true
    return tok.length >= Math.min(2, full.length) && full.startsWith(tok)
  })
}

export function matches(input: string, candidate: string, shell: Shell): boolean {
  if (!input.trim()) return false
  if (shell === 'ios') return iosMatches(input, candidate)
  return normalize(input, shell) === normalize(candidate, shell)
}

export function matchesAny(input: string, candidates: string[], shell: Shell): boolean {
  return candidates.some((c) => matches(input, c, shell))
}

/** All accepted forms of a command exercise. */
export function answersFor(cmd: CommandExercise): string[] {
  return [cmd.command, ...(cmd.accepted ?? [])]
}

/** Find which library command, if any, the input corresponds to. */
export function identify(input: string, library: CommandExercise[], shell: Shell): CommandExercise | undefined {
  return library.find((c) => c.shell === shell && matchesAny(input, answersFor(c), shell))
}

/** Commands that start with the same program or cmdlet, for "did you mean" hints. */
export function suggestions(input: string, library: CommandExercise[], shell: Shell, limit = 3): CommandExercise[] {
  const first = normalize(input, shell).split(' ')[0]
  if (!first) return []
  return library
    .filter((c) => c.shell === shell)
    .filter((c) => {
      const head = normalize(c.command, shell).split(' ')[0]!
      return shell === 'ios' ? head.startsWith(first) : head === first
    })
    .slice(0, limit)
}
