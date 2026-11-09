import type { TypingSession } from './useTypingSession'

function fmt(ms: number) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** Compact live statistics. Values use tabular numbers so the bar does not jitter while typing. */
export function StatsBar({ session, compact = false }: { session: TypingSession; compact?: boolean }) {
  const { metrics: m, remainingSec, elapsedMs, status } = session
  const items: [string, string, string?][] = [
    ['WPM', String(m.wpm)],
    ['Raw', String(m.rawWpm)],
    ['Accuracy', `${m.accuracy}%`],
    ['Correct', String(m.correctChars)],
    ['Errors', String(m.uncorrected), m.uncorrected > 0 ? 'text-err' : undefined],
    [remainingSec !== null ? 'Left' : 'Time', remainingSec !== null ? `${remainingSec}s` : fmt(elapsedMs), remainingSec !== null && remainingSec <= 5 && status === 'running' ? 'text-warn' : undefined],
  ]
  const shown = compact ? items.filter(([k]) => ['WPM', 'Accuracy', 'Errors', 'Time', 'Left'].includes(k)) : items
  return (
    <div className="w-full space-y-2">
      <dl className="flex flex-wrap items-end gap-x-6 gap-y-2" aria-label="Live typing statistics">
        {shown.map(([k, v, cls]) => (
          <div key={k} className="min-w-[3.5rem]">
            <dt className="text-2xs font-medium uppercase tracking-wider text-fg-subtle">{k}</dt>
            <dd className={`font-mono text-xl font-semibold tabular-nums ${cls ?? 'text-fg'}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label="Progress through the text"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(m.progress * 100)}
      >
        <div className="h-full rounded-full bg-accent transition-[width] duration-fast" style={{ width: `${m.progress * 100}%` }} />
      </div>
    </div>
  )
}
