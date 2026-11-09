import type { ReactNode } from 'react'
import { CheckCircle2, AlertTriangle, Timer } from 'lucide-react'
import type { SessionResult } from './useTypingSession'
import { Sparkline } from '../charts/Charts'

export function missedChars(r: SessionResult, limit = 6): { ch: string; n: number }[] {
  const counts = new Map<string, number>()
  for (const e of r.engine.errors) counts.set(e.expected, (counts.get(e.expected) ?? 0) + 1)
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([ch, n]) => ({ ch, n }))
}

export const showChar = (ch: string) => (ch === ' ' ? 'space' : ch === '\n' ? 'Enter' : ch === '\t' ? 'Tab' : ch)

export function Results({ result, title, passLabel, actions, children, comparison }: { result: SessionResult; title?: string; passLabel?: string; actions: ReactNode; children?: ReactNode; comparison?: ReactNode }) {
  const m = result.metrics
  const perfect = m.perfect
  const timed = result.timedOut
  const tone = perfect ? 'ok' : timed ? 'accent' : 'warn'
  const Icon = perfect ? CheckCircle2 : timed ? Timer : AlertTriangle
  const missed = missedChars(result)
  const heading = title ?? (perfect ? 'Perfect match' : timed ? 'Time is up' : 'Finished with mistakes')
  const sub = passLabel ?? (perfect ? 'Every character matched the target.' : timed ? `You typed ${Math.round(m.progress * 100)}% of the text.` : `${m.uncorrected} character${m.uncorrected === 1 ? '' : 's'} did not match. Fix them next time to pass.`)
  return (
    <section className="panel animate-fade-up overflow-hidden" aria-labelledby="results-title" role="status">
      <div className={`flex items-start gap-3 border-b border-line px-5 py-4 ${tone === 'ok' ? 'bg-ok/10' : tone === 'warn' ? 'bg-warn/10' : 'bg-accent/10'}`}>
        <Icon className={`mt-0.5 h-6 w-6 shrink-0 ${tone === 'ok' ? 'text-ok' : tone === 'warn' ? 'text-warn' : 'text-accent'}`} aria-hidden />
        <div>
          <h2 id="results-title" className="text-h3">
            {heading}
          </h2>
          <p className="text-sm text-fg-muted">{sub}</p>
        </div>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-[1fr_minmax(0,16rem)]">
        <div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            {[
              ['Net WPM', m.wpm, 'Correct characters ÷ 5 per minute'],
              ['Raw WPM', m.rawWpm, 'All keystrokes ÷ 5 per minute'],
              ['Accuracy', `${m.accuracy}%`, 'Correct keystrokes ÷ all keystrokes, including corrected ones'],
              ['Time', `${result.durationSec}s`, 'Active time, pauses excluded'],
              ['Correct chars', m.correctChars, 'Typed by you, excluding auto-filled indentation'],
              ['Uncorrected', m.uncorrected, 'Wrong characters left in the text'],
              ['Corrected', m.corrected, 'Mistakes you fixed with Backspace'],
              [timed ? 'Not reached' : 'Excess keys', timed ? m.missing : m.excess, timed ? 'Characters you did not reach' : 'Keys pressed after the end'],
            ].map(([k, v, hint]) => (
              <div key={k as string} title={hint as string}>
                <dt className="text-xs text-fg-subtle">{k}</dt>
                <dd className="text-2xl font-semibold text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          {comparison && <div className="mt-4 text-sm text-fg-muted">{comparison}</div>}
          {children}
        </div>
        <div className="space-y-4">
          {result.wpmSeries.length >= 2 && (
            <div>
              <div className="text-xs text-fg-subtle">Net WPM over time</div>
              <Sparkline values={result.wpmSeries} />
            </div>
          )}
          <div>
            <div className="text-xs text-fg-subtle">Most missed characters</div>
            {missed.length === 0 ? (
              <p className="mt-1 text-sm text-ok">None. Clean run.</p>
            ) : (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {missed.map((x) => (
                  <li key={x.ch} className="flex items-center gap-1.5 rounded border border-line bg-sunken px-2 py-1 font-mono text-sm">
                    <span className="text-fg">{showChar(x.ch)}</span>
                    <span className="text-xs text-fg-subtle">×{x.n}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-line bg-sunken/50 px-5 py-4">{actions}</div>
    </section>
  )
}
