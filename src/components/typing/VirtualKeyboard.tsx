/**
 * A stylized US keyboard. In heatmap mode each key is shaded by its error rate with a single-hue
 * sequential ramp, and the rate is also printed in the key's accessible label, so color is never
 * the only channel. In guide mode the next key is highlighted.
 */
const ROWS: [string, string?][][] = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+']],
  [['q'], ['w'], ['e'], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], ['[', '{'], [']', '}'], ['\\', '|']],
  [['a'], ['s'], ['d'], ['f'], ['g'], ['h'], ['j'], ['k'], ['l'], [';', ':'], ["'", '"']],
  [['z'], ['x'], ['c'], ['v'], ['b'], ['n'], ['m'], [',', '<'], ['.', '>'], ['/', '?']],
]
const OFFSETS = ['0', '1.25rem', '1.75rem', '2.5rem']

/** Sequential blue ramp from the data-viz reference palette (steps 150 to 650). */
const RAMP = ['#b7d3f6', '#86b6ef', '#5598e7', '#2a78d6', '#1c5cab', '#104281']

export interface KeyStat {
  attempts: number
  errors: number
}

interface Props {
  /** Map from character to stats; both shifted and unshifted characters are combined per key. */
  stats?: Map<string, KeyStat>
  next?: string
  caption?: string
}

function keyStat(stats: Map<string, KeyStat> | undefined, chars: string[]): KeyStat {
  let attempts = 0
  let errors = 0
  const variants = new Set(chars.flatMap((c) => [c, c.toUpperCase()]))
  for (const v of variants) {
    const s = stats?.get(v)
    if (s) {
      attempts += s.attempts
      errors += s.errors
    }
  }
  return { attempts, errors }
}

export function VirtualKeyboard({ stats, next, caption }: Props) {
  const heat = !!stats
  const rates = ROWS.flat().map((k) => {
    const s = keyStat(stats, k.filter(Boolean) as string[])
    return s.attempts > 0 ? s.errors / s.attempts : 0
  })
  const maxRate = Math.max(0.0001, ...rates)
  const nextLower = next?.toLowerCase()

  return (
    <figure className="w-full">
      <div className="scroll-x" tabIndex={0} aria-label="Keyboard, scrollable">
        <div className="mx-auto w-max space-y-1.5 rounded-lg border border-line bg-sunken p-3" role="img" aria-label={caption ?? 'Keyboard'}>
          {ROWS.map((row, r) => (
            <div key={r} className="flex gap-1.5" style={{ paddingLeft: OFFSETS[r] }}>
              {row.map((k) => {
                const chars = k.filter(Boolean) as string[]
                const s = keyStat(stats, chars)
                const rate = s.attempts > 0 ? s.errors / s.attempts : 0
                const step = heat && s.errors > 0 ? Math.min(RAMP.length - 1, Math.floor((rate / maxRate) * (RAMP.length - 1))) : -1
                const isNext = !heat && nextLower !== undefined && chars.includes(nextLower === '\n' ? '' : nextLower)
                const bg = step >= 0 ? RAMP[step] : undefined
                const dark = step >= 3
                return (
                  <span
                    key={chars[0]}
                    title={heat ? `${chars.join(' ')}: ${s.errors} errors in ${s.attempts} attempts` : undefined}
                    className={`relative flex h-9 w-9 flex-col items-center justify-center rounded-md border font-mono text-xs sm:h-10 sm:w-10 ${
                      isNext ? 'border-accent bg-accent/25 text-fg' : 'border-line-strong bg-elevated text-fg-muted'
                    }`}
                    style={bg ? { background: bg, borderColor: bg, color: dark ? '#fff' : '#0b0d12' } : undefined}
                  >
                    {k[1] && <span className="absolute left-1 top-0.5 text-[9px] opacity-70">{k[1]}</span>}
                    <span className="uppercase">{k[0]}</span>
                  </span>
                )
              })}
            </div>
          ))}
          <div className="flex justify-center">
            <span
              className={`flex h-9 w-56 items-center justify-center rounded-md border text-2xs ${
                !heat && next === ' ' ? 'border-accent bg-accent/25 text-fg' : 'border-line-strong bg-elevated text-fg-subtle'
              }`}
            >
              space
            </span>
          </div>
        </div>
      </div>
      {heat && (
        <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-fg-subtle">
          <span>Fewer errors</span>
          <span className="flex" aria-hidden>
            {RAMP.map((c) => (
              <span key={c} className="h-3 w-6 first:rounded-l last:rounded-r" style={{ background: c }} />
            ))}
          </span>
          <span>More errors</span>
          <span className="text-fg-subtle">Hover a key for exact counts. Keys you never mistyped stay plain.</span>
        </figcaption>
      )}
    </figure>
  )
}
