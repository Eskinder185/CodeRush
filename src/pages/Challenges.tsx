import { CalendarDays, Flame, Trophy } from 'lucide-react'
import { PageHeader, Stat, Tag } from '../components/ui'
import { PracticeRunner, sessionFields } from '../components/typing/PracticeRunner'
import { usePageMeta, useAppUI } from '../app/context'
import { addDays, dailyChallenge, dailyScore, dailyStreak, daysCompletedInLast } from '../lib/daily'
import { localDateKey, recordDaily, recordSession, useAppData } from '../lib/storage/store'

export default function Challenges() {
  usePageMeta('Daily challenge', 'One short exercise per day, the same for everyone. Track your daily score, personal best, and history.')
  const data = useAppData()
  const { focusMode } = useAppUI()
  const today = localDateKey()
  const ch = dailyChallenge(today)
  const todays = data.daily[today]
  const best = Object.values(data.daily).reduce((m, r) => Math.max(m, r.score), 0)
  const history = Array.from({ length: 14 }, (_, i) => addDays(today, -i))

  return (
    <div className="page">
      {!focusMode && (
        <>
          <PageHeader eyebrow="Challenges" title="Daily challenge" lead="A new exercise every day, the same for everyone on that date. Score = net WPM weighted by accuracy squared, so careful typing wins. Missing a day only resets the streak; your history stays." />
          <div className="mb-8 grid gap-3 sm:grid-cols-4">
            <Stat label="Today" value={todays ? todays.score : '—'} hint={todays ? `${todays.wpm} WPM, ${todays.accuracy}%` : 'Not done yet'} />
            <Stat label="Personal best" value={best || '—'} />
            <Stat label="Current streak" value={<span className="inline-flex items-center gap-1.5"><Flame className="h-5 w-5 text-warn" aria-hidden />{dailyStreak(data, today)}</span>} hint="Consecutive days" />
            <Stat label="Last 30 days" value={daysCompletedInLast(data, today)} hint="Days completed" />
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <CalendarDays className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="text-h3">{ch.title}</h2>
            <Tag>{today}</Tag>
          </div>
          <p className="mb-4 text-sm text-fg-subtle">{ch.description} You can retry as often as you like; the best score counts.</p>
        </>
      )}
      <PracticeRunner
        target={ch.text}
        label={`Daily challenge: ${ch.title}`}
        languageLabel={ch.trackId}
        onComplete={(r) => {
          if (r.metrics.keystrokes === 0) return null
          const score = dailyScore(r.metrics.wpm, r.metrics.accuracy)
          recordSession({ kind: 'daily', trackId: ch.trackId, itemId: `daily:${today}`, title: ch.title, passed: r.metrics.perfect, ...sessionFields(r) })
          const prev = data.daily[today]?.score
          recordDaily(today, { score, wpm: r.metrics.wpm, accuracy: r.metrics.accuracy })
          return prev !== undefined && score <= prev ? `Score ${score}. Your best today is ${prev}.` : `Score ${score}.${score > best && best > 0 ? ' New all-time best.' : ''}`
        }}
      />
      {!focusMode && (
        <section className="mt-10" aria-labelledby="hist">
          <h2 id="hist" className="mb-3 flex items-center gap-2 text-h3">
            <Trophy className="h-5 w-5 text-warn" aria-hidden /> Last 14 days
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-7">
            {history.map((d) => {
              const r = data.daily[d]
              return (
                <li key={d} className={`rounded-md border p-2 text-center ${r ? 'border-ok/40 bg-ok/5' : 'border-line'}`}>
                  <div className="text-2xs text-fg-subtle">{d.slice(5)}</div>
                  <div className="text-sm font-semibold">{r ? r.score : '—'}</div>
                  <div className="truncate text-2xs text-fg-subtle">{dailyChallenge(d).title}</div>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
