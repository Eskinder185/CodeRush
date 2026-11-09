/** Preferences, stored locally and applied to <html> as data attributes. */
import { useSyncExternalStore } from 'react'
import { SETTINGS_KEY } from './storage/schema'

export interface Settings {
  theme: 'dark' | 'light' | 'system'
  motion: 'system' | 'reduce' | 'full'
  fontSize: number
  lineHeight: number
  lineNumbers: boolean
  caret: 'bar' | 'block' | 'underline'
  sound: boolean
  /** Strict: indentation must be typed. Forgiving: indentation after a newline is filled in. */
  strict: boolean
  /** Pause the timer when the typing surface loses focus. */
  autoPause: boolean
  showKeyboard: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  motion: 'system',
  fontSize: 18,
  lineHeight: 1.7,
  lineNumbers: true,
  caret: 'bar',
  sound: false,
  strict: false,
  autoPause: true,
  showKeyboard: false,
}

const listeners = new Set<() => void>()
let current: Settings | null = null

function clamp(n: unknown, lo: number, hi: number, d: number): number {
  return typeof n === 'number' && Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d
}

export function parseSettings(raw: unknown): Settings {
  const r = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>
  const pick = <T extends string>(v: unknown, opts: readonly T[], d: T): T => (opts.includes(v as T) ? (v as T) : d)
  const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d)
  return {
    theme: pick(r.theme, ['dark', 'light', 'system'] as const, DEFAULT_SETTINGS.theme),
    motion: pick(r.motion, ['system', 'reduce', 'full'] as const, DEFAULT_SETTINGS.motion),
    fontSize: clamp(r.fontSize, 14, 26, DEFAULT_SETTINGS.fontSize),
    lineHeight: clamp(r.lineHeight, 1.3, 2.2, DEFAULT_SETTINGS.lineHeight),
    lineNumbers: bool(r.lineNumbers, DEFAULT_SETTINGS.lineNumbers),
    caret: pick(r.caret, ['bar', 'block', 'underline'] as const, DEFAULT_SETTINGS.caret),
    sound: bool(r.sound, DEFAULT_SETTINGS.sound),
    strict: bool(r.strict, DEFAULT_SETTINGS.strict),
    autoPause: bool(r.autoPause, DEFAULT_SETTINGS.autoPause),
    showKeyboard: bool(r.showKeyboard, DEFAULT_SETTINGS.showKeyboard),
  }
}

export function getSettings(): Settings {
  if (!current) {
    try {
      current = parseSettings(JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}'))
    } catch {
      current = { ...DEFAULT_SETTINGS }
    }
  }
  return current
}

export function updateSettings(patch: Partial<Settings>) {
  current = parseSettings({ ...getSettings(), ...patch })
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(current))
  } catch {
    // Storage unavailable: settings still apply for this visit.
  }
  applySettings(current)
  listeners.forEach((l) => l())
}

export function resetSettingsCache() {
  current = null
}

export function useSettings(): Settings {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    getSettings,
    getSettings
  )
}

export function resolvedTheme(s: Settings): 'dark' | 'light' {
  if (s.theme !== 'system') return s.theme
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function prefersReducedMotion(s: Settings): boolean {
  if (s.motion === 'reduce') return true
  if (s.motion === 'full') return false
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export function applySettings(s: Settings) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.dataset.theme = resolvedTheme(s)
  if (s.motion === 'system') delete root.dataset.motion
  else root.dataset.motion = s.motion
  root.style.setProperty('--type-font-size', `${s.fontSize}px`)
  root.style.setProperty('--type-line-height', String(s.lineHeight))
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', resolvedTheme(s) === 'light' ? '#F8F9FC' : '#0B0D12')
}

/** Short, quiet key click and error tone with Web Audio. Off by default. */
let audio: AudioContext | null = null
export function playKeySound(kind: 'key' | 'error') {
  if (!getSettings().sound || typeof window === 'undefined') return
  try {
    audio ??= new AudioContext()
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = kind === 'key' ? 'triangle' : 'square'
    osc.frequency.value = kind === 'key' ? 1800 : 220
    gain.gain.setValueAtTime(kind === 'key' ? 0.025 : 0.035, audio.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + (kind === 'key' ? 0.03 : 0.09))
    osc.connect(gain).connect(audio.destination)
    osc.start()
    osc.stop(audio.currentTime + 0.1)
  } catch {
    // Audio is optional.
  }
}
