/**
 * Daily Challenge: the same exercise for everyone on a given local date.
 * The date string seeds a small deterministic random generator. No server is involved.
 */
import { commands } from '../content/commands'
import { languageTracks } from '../content/code'
import type { AppData } from './storage/schema'

export function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32: small, fast, deterministic. */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface DailyChallenge {
  date: string
  kind: 'commands' | 'code'
  title: string
  description: string
  text: string
  trackId: string
}

const PLATFORM_NAMES: Record<string, string> = { linux: 'Linux', powershell: 'PowerShell', 'windows-cmd': 'Windows networking', 'cisco-ios': 'Cisco IOS' }

export function dailyChallenge(date: string): DailyChallenge {
  const r = rng(hashString(`coderush:${date}`))
  if (r() < 0.5) {
    const platforms = ['linux', 'powershell', 'windows-cmd', 'cisco-ios'] as const
    const platform = platforms[Math.floor(r() * platforms.length)]!
    const pool = commands.filter((c) => c.platform === platform)
    const picked = new Set<number>()
    while (picked.size < Math.min(6, pool.length)) picked.add(Math.floor(r() * pool.length))
    const items = [...picked].map((i) => pool[i]!)
    return {
      date,
      kind: 'commands',
      title: `${PLATFORM_NAMES[platform]} command sprint`,
      description: `Six ${PLATFORM_NAMES[platform]} commands, one per line. Accuracy counts as much as speed.`,
      text: items.map((c) => c.command).join('\n'),
      trackId: platform,
    }
  }
  const track = languageTracks[Math.floor(r() * languageTracks.length)]!
  const lesson = track.lessons[Math.floor(r() * track.lessons.length)]!
  const lines = lesson.code.split('\n')
  const start = Math.floor(r() * Math.max(1, lines.length - 8))
  const text = lines.slice(start, start + 8).join('\n').replace(/\s+$/, '')
  return {
    date,
    kind: 'code',
    title: `${track.languageName} snippet`,
    description: `Eight lines from "${lesson.title}".`,
    text: text.trim().length > 0 ? text : lesson.code.split('\n').slice(0, 8).join('\n'),
    trackId: track.language,
  }
}

/** Score = net WPM x (accuracy as a fraction) squared x 10, so careless speed does not beat careful typing. */
export function dailyScore(wpm: number, accuracy: number): number {
  return Math.round(wpm * (accuracy / 100) ** 2 * 10)
}

function addDays(date: string, delta: number): string {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number]
  const dt = new Date(y, m - 1, d + delta)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
}

/**
 * A gentle streak: consecutive days ending today, or ending yesterday if today is not done yet.
 * Missing a day resets the streak but never removes past results.
 */
export function dailyStreak(data: AppData, today: string): number {
  let day = data.daily[today] ? today : addDays(today, -1)
  let n = 0
  while (data.daily[day]) {
    n++
    day = addDays(day, -1)
  }
  return n
}

export function daysCompletedInLast(data: AppData, today: string, days = 30): number {
  let n = 0
  for (let i = 0; i < days; i++) if (data.daily[addDays(today, -i)]) n++
  return n
}

export { addDays }
