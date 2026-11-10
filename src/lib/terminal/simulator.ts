/**
 * Simulated terminal session state. It holds only text lines and history.
 * Output comes from curated content. Nothing is executed.
 */
import type { CommandExercise, Platform } from '../../content/types'
import { identify, MAX_INPUT, suggestions, type Shell } from './match'

export type LineKind = 'input' | 'output' | 'info' | 'error' | 'success'

export interface TermLine {
  id: number
  kind: LineKind
  text: string
  prompt?: string
}

export interface TermState {
  lines: TermLine[]
  history: string[]
  /** Index into history while browsing with arrow keys; null when not browsing. */
  cursor: number | null
  nextId: number
  /** Virtual working directory. This is never an operating-system path. */
  cwd: string
}

export const PROMPTS: Record<Platform, string> = {
  linux: 'student@coderush:~$',
  powershell: 'PS C:\\Labs>',
  'windows-cmd': 'C:\\Labs>',
  'cisco-ios': 'Router#',
}

export const SHELL_OF: Record<Platform, Shell> = {
  linux: 'bash',
  powershell: 'powershell',
  'windows-cmd': 'cmd',
  'cisco-ios': 'ios',
}

export const SIM_BANNER = 'CodeRush simulated terminal. Commands are matched against lessons and never executed.'

export function createTerm(banner = SIM_BANNER): TermState {
  return { lines: [{ id: 0, kind: 'info', text: banner }], history: [], cursor: null, nextId: 1, cwd: '/home/student' }
}

/** A small, fixed learning environment. Learner input is never passed to a shell. */
const FILES: Record<string, Record<string, string | null>> = {
  '/': { home: null, var: null, etc: null },
  '/home': { student: null },
  '/home/student': { 'notes.txt': 'Welcome to the CodeRush practice host. Try cd /var/log and cat syslog.', projects: null },
  '/home/student/projects': { 'README.md': 'A sample project directory for navigation practice.' },
  '/var': { log: null },
  '/var/log': { syslog: 'Nov 09 09:14:02 lab-host systemd: Started SSH service.\nNov 09 09:16:44 lab-host dns: resolver timed out for example.test', 'auth.log': 'Nov 09 09:18:21 lab-host sshd: Failed password for invalid user guest from 192.0.2.45' },
  '/etc': { hosts: '127.0.0.1 localhost\n192.0.2.10 lab-host', resolv: null },
  '/etc/resolv': { 'resolv.conf': 'nameserver 192.0.2.53' },
}

function virtualPath(cwd: string, target: string): string {
  const parts = (target.startsWith('/') ? [] : cwd.split('/').filter(Boolean))
  for (const part of target.split('/')) {
    if (!part || part === '.') continue
    if (part === '..') parts.pop()
    else parts.push(part)
  }
  return '/' + parts.join('/')
}

function simulateFiles(state: TermState, input: string, platform: Platform): TermState | null {
  if (platform !== 'linux') return null
  const match = /^(pwd|cd|ls|cat)(?:\s+(.+))?$/.exec(input.trim())
  if (!match) return null
  const [, command, arg] = match
  if (command === 'pwd') return push(state, { kind: 'output', text: state.cwd })
  if (command === 'cd') {
    const next = virtualPath(state.cwd, arg?.trim() || '/home/student')
    if (!FILES[next]) return push(state, { kind: 'error', text: `cd: ${arg}: no such simulated directory` })
    return push({ ...state, cwd: next }, { kind: 'info', text: `Working directory: ${next}` })
  }
  if (command === 'ls') {
    const target = virtualPath(state.cwd, arg?.trim() || '.')
    const entries = FILES[target]
    if (!entries) return push(state, { kind: 'error', text: `ls: ${arg}: no such simulated directory` })
    return push(state, { kind: 'output', text: Object.keys(entries).join('  ') || '(empty directory)' })
  }
  if (command === 'cat') {
    if (!arg) return push(state, { kind: 'error', text: 'cat: choose a file in this simulated environment' })
    const target = virtualPath(state.cwd, arg.trim())
    const name = target.split('/').pop()!
    const parent = target.slice(0, -name.length).replace(/\/$/, '') || '/'
    const file = FILES[parent]?.[name]
    if (file === null) return push(state, { kind: 'error', text: `cat: ${arg}: is a directory` })
    if (file === undefined) return push(state, { kind: 'error', text: `cat: ${arg}: no such simulated file` })
    return push(state, { kind: 'output', text: file })
  }
  return null
}

export function push(state: TermState, ...lines: Omit<TermLine, 'id'>[]): TermState {
  let id = state.nextId
  const added = lines.map((l) => ({ ...l, id: id++ }))
  // Cap scrollback so long sessions stay fast.
  const all = [...state.lines, ...added].slice(-400)
  return { ...state, lines: all, nextId: id }
}

export function recordInput(state: TermState, input: string, prompt: string): TermState {
  const clean = input.slice(0, MAX_INPUT)
  const s = push(state, { kind: 'input', text: clean, prompt })
  const history = clean.trim() && state.history[state.history.length - 1] !== clean ? [...state.history, clean].slice(-100) : state.history
  return { ...s, history, cursor: null }
}

export function historyStep(state: TermState, dir: -1 | 1): { state: TermState; value: string } {
  const n = state.history.length
  if (n === 0) return { state, value: '' }
  let cursor = state.cursor ?? n
  cursor = Math.min(n, Math.max(0, cursor + dir))
  return { state: { ...state, cursor }, value: cursor === n ? '' : state.history[cursor]! }
}

export type BuiltinResult = { handled: true; state: TermState } | { handled: false }

export function runBuiltin(state: TermState, input: string, platform: Platform): BuiltinResult {
  const cmd = input.trim().toLowerCase()
  if (cmd === 'clear' || cmd === 'cls' || cmd === 'clear-host') {
    return { handled: true, state: { ...state, lines: [] } }
  }
  if (cmd === 'help' || cmd === '?') {
    return {
      handled: true,
      state: push(state, {
        kind: 'info',
        text: [
          'This is a practice simulation, not a real shell.',
          'Type a command from the lesson to see curated sample output.',
          platform === 'linux' ? 'Navigation is stateful: try pwd, ls, cd /var/log, then cat syslog.' : '',
          'Arrow Up and Arrow Down browse your history. "clear" empties the screen.',
          platform === 'cisco-ios' ? 'IOS abbreviations such as "sh ip int br" are accepted.' : '',
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    }
  }
  if (cmd === 'history') {
    return {
      handled: true,
      state: push(state, { kind: 'output', text: state.history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join('\n') || '(empty)' }),
    }
  }
  return { handled: false }
}

/** Free exploration: print stored output for any library command on this platform. */
export function runFree(state: TermState, input: string, platform: Platform, library: CommandExercise[]): { state: TermState; match?: CommandExercise } {
  if (!input.trim()) return { state }
  const simulated = simulateFiles(state, input, platform)
  if (simulated) return { state: simulated, match: identify(input, library, SHELL_OF[platform]) }
  const shell = SHELL_OF[platform]
  const match = identify(input, library, shell)
  if (match) {
    const out = match.sampleOutput.trim() ? match.sampleOutput : '(no output: this command prints nothing when it succeeds)'
    return { state: push(state, { kind: 'output', text: out }), match }
  }
  const sug = suggestions(input, library, shell)
  const hint = sug.length ? `\nTry one of: ${sug.map((s) => s.command).join('  |  ')}` : '\nType "help" for tips, or pick a command from the library.'
  return { state: push(state, { kind: 'error', text: `This simulation has no recorded output for that command.${hint}` }) }
}
