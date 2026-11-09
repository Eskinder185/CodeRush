/** Builds practice text for each typing mode from the content library. Deterministic for a given seed. */
import { commands } from '../content/commands'
import { languageTracks } from '../content/code'
import type { CommandCategory, Difficulty, Platform } from '../content/types'
import { categoryDensity } from './typing/categories'
import { rng } from './daily'

export type PracticeMode = 'speed' | 'timed' | 'accuracy' | 'command' | 'syntax' | 'custom'

export interface PracticeOptions {
  mode: PracticeMode
  /** Seconds for timed mode; 0 means untimed. */
  duration: number
  difficulty: Difficulty | 'all'
  /** Programming language id, or "all". */
  language: string
  platform: Platform | 'all'
  category: CommandCategory | 'all'
  customText: string
  seed: number
}

export const DEFAULT_OPTIONS: PracticeOptions = {
  mode: 'speed',
  duration: 30,
  difficulty: 'all',
  language: 'all',
  platform: 'all',
  category: 'all',
  customText: '',
  seed: 1,
}

function shuffle<T>(arr: T[], r: () => number): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

function codeLines(language: string, difficulty: Difficulty | 'all'): string[] {
  const tracks = language === 'all' ? languageTracks : languageTracks.filter((t) => t.language === language)
  return tracks.flatMap((t) =>
    t.lessons
      .filter((l) => difficulty === 'all' || l.difficulty === difficulty)
      .flatMap((l) => l.code.split('\n'))
      .map((l) => l.replace(/\s+$/, ''))
      .filter((l) => l.trim().length >= 8 && l.length <= 80 && !/^\s*(#|\/\/|--)/.test(l))
  )
}

function commandLines(platform: Platform | 'all', category: CommandCategory | 'all', difficulty: Difficulty | 'all'): string[] {
  return commands
    .filter((c) => platform === 'all' || c.platform === platform)
    .filter((c) => category === 'all' || c.category === category)
    .filter((c) => difficulty === 'all' || c.difficulty === difficulty)
    .filter((c) => c.command.length <= 90)
    .map((c) => c.command)
}

function symbolScore(line: string): number {
  const d = categoryDensity(line)
  const n = Object.entries(d).reduce((s, [k, v]) => (k === 'capitalization' || k === 'digits' ? s : s + (v ?? 0)), 0)
  return n / Math.max(1, line.trim().length)
}

/** Take lines until the text reaches roughly `chars` characters. */
function fill(lines: string[], chars: number): string {
  const out: string[] = []
  let n = 0
  for (const l of lines) {
    if (n >= chars) break
    out.push(l.trim())
    n += l.trim().length + 1
  }
  return out.join('\n')
}

export function buildPracticeText(o: PracticeOptions): string {
  const r = rng(o.seed)
  switch (o.mode) {
    case 'custom':
      return o.customText.replace(/\r\n?/g, '\n').replace(/\t/g, '    ').replace(/[ \t]+$/gm, '').trim().slice(0, 4000)
    case 'command': {
      const lines = shuffle(commandLines(o.platform, o.category, o.difficulty), r)
      return fill(lines.length ? lines : shuffle(commandLines('all', 'all', 'all'), r), 360)
    }
    case 'syntax': {
      const lines = codeLines(o.language, o.difficulty)
        .concat(o.language === 'all' ? commandLines('all', 'all', o.difficulty) : [])
        .map((l) => ({ l, s: symbolScore(l) }))
        .filter((x) => x.s >= 0.18)
        .map((x) => x.l)
      return fill(shuffle(lines, r), 420)
    }
    case 'timed': {
      // Long enough that 150 WPM cannot run out during a 120-second test.
      const pool = o.language !== 'all' ? codeLines(o.language, o.difficulty) : [...codeLines('all', o.difficulty), ...commandLines('all', 'all', o.difficulty)]
      const target = Math.max(400, Math.round((o.duration || 60) * 15 * 1.2))
      let text = fill(shuffle(pool, r), target)
      while (text.length < target && pool.length > 0) text += '\n' + fill(shuffle(pool, r), target - text.length)
      return text
    }
    case 'accuracy': {
      const pool = o.language !== 'all' ? codeLines(o.language, o.difficulty) : codeLines('all', o.difficulty)
      return fill(shuffle(pool, r), 280)
    }
    case 'speed':
    default: {
      const pool = o.language !== 'all' ? codeLines(o.language, o.difficulty) : codeLines('all', o.difficulty)
      return fill(shuffle(pool, r), 320)
    }
  }
}
