import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Upload, Trash2, Sparkles, Award, Flag, Target, Zap, Code2, Terminal, TerminalSquare, Network, ShieldCheck, CalendarDays, Braces, Trophy, Lock, Info } from 'lucide-react'
import { Button, ButtonLink, Dialog, EmptyState, PageHeader, ProgressBar, Segmented, Stat, useToast } from '../components/ui'
import { LineChart, BarChart, type Point } from '../components/charts/Charts'
import { VirtualKeyboard } from '../components/typing/VirtualKeyboard'
import { usePageMeta } from '../app/context'
import { clearAllData, downloadExport, importText, useAppData } from '../lib/storage/store'
import { parseImport, type ImportResult } from '../lib/storage/migrate'
import { formatDuration, languageProgress, overallStats, typingSessions, weekKey } from '../lib/progress'
import { findConfusions, findWeaknesses, keyErrorRates } from '../lib/recommend'
import { achievements } from '../lib/achievements'
import { commandMastery } from '../lib/mastery'
import { languageTracks } from '../content/code'
import { commands, getCommand } from '../content/commands'
import { CATEGORY_LABEL, PLATFORM_LABEL, type CommandCategory } from '../content/types'
import type { PracticeSession } from '../lib/storage/schema'

const ICONS = { flag: Flag, target: Target, zap: Zap, code: Code2, terminal: Terminal, powershell: TerminalSquare, network: Network, shield: ShieldCheck, calendar: CalendarDays, brackets: Braces, trophy: Trophy }
const KIND_LABEL: Record<PracticeSession['kind'], string> = { lesson: 'Lesson', guided: 'Command lesson', speed: 'Speed test', accuracy: 'Accuracy', command: 'Commands', syntax: 'Syntax', timed: 'Timed', custom: 'Custom', daily: 'Daily', weakness: 'Drill' }

function shortDate(iso: string) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function DataManagement() {
  const toast = useToast()
  const data = useAppData()
  const fileRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<'merge' | 'replace'>('merge')
  const [confirm, setConfirm] = useState(false)
  const [preview, setPreview] = useState<{ text: string; result: ImportResult } | null>(null)
  const duplicates = preview?.result.data?.sessions.filter((s) => data.sessions.some((cur) => cur.id === s.id)).length ?? 0
  return (
    <section className="panel panel-pad" aria-labelledby="data-h">
      <h2 id="data-h" className="text-h3">Your data</h2>
      <p className="mt-1 flex gap-2 text-sm text-fg-muted">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /> Progress is stored only in this browser. It does not sync between devices or browsers. Export a file to back it up or move it.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <Button onClick={downloadExport}>
          <Download className="h-4 w-4" aria-hidden /> Export progress
        </Button>
        <div>
          <div className="mb-1 text-xs text-fg-subtle">When importing</div>
          <Segmented label="Import mode" value={mode} onChange={setMode} size="sm" options={[{ value: 'merge', label: 'Merge with current' }, { value: 'replace', label: 'Replace current' }]} />
        </div>
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          <Upload className="h-4 w-4" aria-hidden /> Import file
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label="Choose a CodeRush export file"
          onChange={async (e) => {
            const f = e.target.files?.[0]
            e.target.value = ''
            if (!f) return
            if (f.size > 5_000_000) return toast('That file is larger than 5 MB, which is too big for a CodeRush export.', 'warn')
            const text = await f.text()
            const result = parseImport(text)
            if (!result.ok) toast(result.error ?? 'Import failed.', 'warn')
            else setPreview({ text, result })
          }}
        />
        <Button variant="danger" onClick={() => setConfirm(true)}>
          <Trash2 className="h-4 w-4" aria-hidden /> Clear all progress
        </Button>
      </div>
      <p className="mt-3 text-xs text-fg-subtle">Accepts CodeRush 3 and 2 exports and files exported by CodeRush 1.x.</p>
      <Dialog open={!!preview} onClose={() => setPreview(null)} title="Review import">
        {preview && <><p className="text-sm text-fg-muted">Format: {preview.result.format}. {preview.result.accepted} valid session{preview.result.accepted === 1 ? '' : 's'}; {preview.result.rejected} invalid record{preview.result.rejected === 1 ? '' : 's'} skipped. {duplicates} session{duplicates === 1 ? '' : 's'} already in this browser.</p><p className="mt-3 text-sm text-fg-muted">{mode === 'merge' ? 'Merge keeps current progress and deduplicates sessions by ID.' : 'Replace removes current progress and uses only the imported data.'}</p><div className="mt-5 flex flex-wrap justify-end gap-2"><Button variant="secondary" onClick={() => setPreview(null)}>Cancel</Button><Button onClick={() => { const r = importText(preview.text, mode); setPreview(null); if (r.ok) toast(`Imported ${r.accepted} valid sessions.`, 'success'); else toast(r.error ?? 'Import failed.', 'warn') }}>Confirm {mode}</Button></div></>}
      </Dialog>
      <Dialog open={confirm} onClose={() => setConfirm(false)} title="Clear all progress?">
        <p className="text-sm text-fg-muted">This deletes every session, mastery score, quiz result, and daily challenge in this browser. It cannot be undone. Export first if you might want it back.</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirm(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              clearAllData()
              setConfirm(false)
              toast('All progress cleared.', 'info')
            }}
          >
            Delete everything
          </Button>
        </div>
      </Dialog>
    </section>
  )
}

export default function Progress() {
  usePageMeta('Your progress', 'Typing speed, accuracy, mastery, mistake patterns, and history, stored privately in your browser.')
  const data = useAppData()
  const stats = overallStats(data)
  const typed = typingSessions(data)
  const [kindFilter, setKindFilter] = useState<'all' | PracticeSession['kind']>('all')
  const [page, setPage] = useState(0)

  const wpmSeries: Point[] = useMemo(() => typed.slice(-30).map((s) => ({ label: shortDate(s.completedAt), value: s.wpm })), [typed])
  const accSeries: Point[] = useMemo(() => typed.slice(-30).map((s) => ({ label: shortDate(s.completedAt), value: Math.round(s.accuracy) })), [typed])
  const weekly: Point[] = useMemo(() => {
    const m = new Map<string, number>()
    for (const s of data.sessions) m.set(weekKey(s.completedAt), (m.get(weekKey(s.completedAt)) ?? 0) + s.durationSec)
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-12).map(([k, v]) => ({ label: k.slice(5), value: Math.round(v / 60) }))
  }, [data.sessions])
  const keyStats = useMemo(() => keyErrorRates(data), [data])
  const weaknesses = findWeaknesses(data)
  const confusions = findConfusions(data)
  const categoryMastery = useMemo(() => {
    const cats = [...new Set(commands.map((c) => c.category))] as CommandCategory[]
    return cats
      .map((cat) => {
        const cs = commands.filter((c) => c.category === cat)
        const avg = cs.reduce((s, c) => s + commandMastery(data.commands[c.id]).score, 0) / cs.length
        const touched = cs.filter((c) => data.commands[c.id]).length
        return { cat, avg: Math.round(avg), touched, total: cs.length }
      })
      .sort((a, b) => b.avg - a.avg)
  }, [data.commands])
  const topMissed = [...keyStats.entries()].filter(([, s]) => s.attempts >= 5 && s.errors > 0).sort((a, b) => b[1].rate - a[1].rate).slice(0, 5)

  const history = [...data.sessions].reverse().filter((s) => kindFilter === 'all' || s.kind === kindFilter)
  const PAGE = 15
  const pageRows = history.slice(page * PAGE, page * PAGE + PAGE)
  const empty = data.sessions.length === 0 && Object.keys(data.missions).length === 0

  return (
    <div className="page">
      <PageHeader eyebrow="Progress" title="Your progress" lead="Everything here comes from practice recorded in this browser. Charts appear as you practice; nothing is estimated or invented." />

      {data.migratedFromV1 && (
        <p className="mb-6 flex gap-2 rounded-md border border-accent/30 bg-accent/5 p-3 text-sm text-fg-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /> {data.migratedFromV1.sessions} sessions were carried over from CodeRush 1.x. Older sessions did not record keystroke detail, so they appear in totals but not in mistake analysis.
        </p>
      )}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Overview">
        <Stat label="Lessons passed" value={stats.lessonsPassed} hint="Exact matches only" />
        <Stat label="Average WPM" value={stats.averageWpm} hint={`${typed.length} typing sessions`} />
        <Stat label="Best WPM" value={stats.bestWpm} />
        <Stat label="Average accuracy" value={`${stats.averageAccuracy}%`} />
        <Stat label="Practice time" value={formatDuration(stats.timeSec)} />
        <Stat label="Commands practiced" value={Object.keys(data.commands).length} hint={`${Object.values(data.commands).filter((p) => commandMastery(p).level === 'mastered').length} mastered`} />
        <Stat label="Missions completed" value={Object.keys(data.missions).length} />
        <Stat label="Best mission score" value={Math.max(0, ...Object.values(data.missions).map((m) => m.bestScore))} hint="Out of 100" />
      </section>

      {empty && (
        <div className="mt-8">
          <EmptyState icon={<Sparkles className="h-8 w-8" />} title="No practice recorded yet" action={<ButtonLink to="/practice">Start practicing</ButtonLink>}>
            Finish a lesson, a typing test, or a command lesson and your charts, mastery, and mistake patterns will appear here.
          </EmptyState>
        </div>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <LineChart title="Net WPM" subtitle="Last 30 typing sessions" data={wpmSeries} empty="Complete a typing session to start this chart." />
        <LineChart title="Accuracy" subtitle="Last 30 typing sessions" data={accSeries} unit="%" yMax={100} empty="Complete a typing session to start this chart." />
        <BarChart title="Practice time" subtitle="Minutes per week, last 12 weeks" data={weekly} unit=" min" empty="Practice time appears after your first session." />
        <section className="panel panel-pad" aria-labelledby="lang-h">
          <h2 id="lang-h" className="text-h3">Language progress</h2>
          <p className="mt-0.5 text-sm text-fg-subtle">Lessons passed out of the lessons available</p>
          <ul className="mt-4 space-y-3">
            {languageTracks.map((t) => {
              const p = languageProgress(data, t.language)
              return (
                <li key={t.language}>
                  <Link to={`/languages/${t.language}/lessons`} className="group block">
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-fg-muted group-hover:text-fg">{t.languageName}</span>
                      <span className="tabular-nums text-fg-subtle">
                        {p.passed} / {p.total}
                      </span>
                    </div>
                    <ProgressBar value={p.percent} label={`${t.languageName} lessons passed`} size="sm" tone="ok" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <section id="mistakes" className="mt-10 scroll-mt-24" aria-labelledby="mist-h">
        <h2 id="mist-h" className="text-h2">Smart mistake training</h2>
        <p className="mt-1 text-sm text-fg-subtle">Recommendations follow fixed rules: a character group needs at least 15 recent attempts and a 6% error rate before it is suggested.</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="space-y-3">
            {weaknesses.length === 0 && confusions.length === 0 ? (
              <EmptyState title="No weak spots detected yet">Practice a few sessions with symbols and commands. Patterns appear once there is enough evidence.</EmptyState>
            ) : (
              <>
                {weaknesses.map((w) => (
                  <div key={w.category} className="panel panel-pad">
                    <h3 className="font-semibold">{w.label}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{w.reason}</p>
                    <ButtonLink to={`/practice?drill=${w.category}`} size="sm" className="mt-3">
                      Practice this drill
                    </ButtonLink>
                  </div>
                ))}
                {confusions.map((c) => (
                  <div key={c.expected + c.got} className="panel panel-pad">
                    <h3 className="font-semibold">Commands you mix up</h3>
                    <p className="mt-1 text-sm text-fg-muted">{c.reason}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <ButtonLink to={`/lab/command/${c.expected}`} size="sm" variant="secondary">
                        Review {getCommand(c.expected)?.command}
                      </ButtonLink>
                      <ButtonLink to={`/lab/command/${c.got}`} size="sm" variant="secondary">
                        Review {getCommand(c.got)?.command}
                      </ButtonLink>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="panel panel-pad">
            <h3 className="text-h3">Difficult-character heatmap</h3>
            <p className="mb-4 mt-0.5 text-sm text-fg-subtle">Error rate per key across all recorded sessions</p>
            <VirtualKeyboard
              stats={keyStats}
              caption={topMissed.length ? `Most missed keys: ${topMissed.map(([ch, s]) => `${ch === ' ' ? 'space' : ch} ${Math.round(s.rate * 100)}%`).join(', ')}` : 'No mistakes recorded yet'}
            />
            {topMissed.length > 0 && (
              <table className="mt-4 w-full text-sm">
                <caption className="sr-only">Most missed keys</caption>
                <thead>
                  <tr className="text-left text-xs text-fg-subtle">
                    <th className="py-1 font-medium">Key</th>
                    <th className="py-1 text-right font-medium">Errors</th>
                    <th className="py-1 text-right font-medium">Attempts</th>
                    <th className="py-1 text-right font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {topMissed.map(([ch, s]) => (
                    <tr key={ch} className="border-t border-line">
                      <td className="py-1 font-mono">{ch === ' ' ? 'space' : ch === '\n' ? 'Enter' : ch}</td>
                      <td className="py-1 text-right">{s.errors}</td>
                      <td className="py-1 text-right">{s.attempts}</td>
                      <td className="py-1 text-right">{Math.round(s.rate * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="cat-h">
        <h2 id="cat-h" className="text-h2">Command mastery by category</h2>
        <p className="mt-1 text-sm text-fg-subtle">Average mastery across every command in the category. Mastery weighs typing 30%, recall 40%, and repetition across days 30%.</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categoryMastery.map((c) => (
            <li key={c.cat} className="panel p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium">{CATEGORY_LABEL[c.cat]}</span>
                <span className="text-lg font-semibold tabular-nums">{c.avg}</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={c.avg} label={`${CATEGORY_LABEL[c.cat]} mastery`} size="sm" tone="violet" />
              </div>
              <p className="mt-1.5 text-2xs text-fg-subtle">
                {c.touched} of {c.total} commands practiced
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="ach-h">
        <h2 id="ach-h" className="flex items-center gap-2 text-h2">
          <Award className="h-6 w-6 text-warn" aria-hidden /> Achievements
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => {
            const p = a.progress(data)
            const done = p >= 1
            const I = ICONS[a.icon]
            return (
              <li key={a.id} className={`panel p-4 ${done ? 'border-warn/40 bg-warn/5' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${done ? 'border-warn/50 bg-warn/15 text-warn' : 'border-line bg-sunken text-fg-subtle'}`}>
                    <I className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-xs text-fg-subtle">{done ? 'Earned' : `${Math.round(p * 100)}%`}</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-fg-muted">{a.description}</p>
                {!done && (
                  <div className="mt-2">
                    <ProgressBar value={p * 100} label={`${a.title} progress`} size="sm" />
                  </div>
                )}
                <p className="mt-1.5 text-2xs text-fg-subtle">{a.detail(data)}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="hist-h">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="hist-h" className="text-h2">Learning history</h2>
          <label className="text-xs text-fg-subtle">
            Filter
            <select value={kindFilter} onChange={(e) => { setKindFilter(e.target.value as typeof kindFilter); setPage(0) }} className="ml-2 h-9 rounded-md border border-line-strong bg-surface px-2 text-sm text-fg">
              <option value="all">All activity</option>
              {Object.entries(KIND_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </label>
        </div>
        {history.length === 0 ? (
          <p className="mt-4 text-sm text-fg-subtle">No attempts recorded.</p>
        ) : (
          <>
          <ul className="mt-4 space-y-2 md:hidden" aria-label="Learning history">
            {pageRows.map((s) => <li key={s.id} className="panel p-3 text-sm"><div className="flex justify-between gap-2"><span className="font-medium">{KIND_LABEL[s.kind]}</span><span className="text-xs text-fg-subtle">{new Date(s.completedAt).toLocaleDateString()}</span></div><p className="mt-1 break-words text-fg-muted">{s.title ?? getCommand(s.itemId)?.title ?? s.itemId}</p><p className="mt-2 text-xs text-fg-subtle">{s.wpm} WPM · {s.accuracy}% accuracy · {formatDuration(s.durationSec)}</p></li>)}
          </ul>
          <div className="mt-4 hidden overflow-x-auto rounded-lg border border-line md:block" tabIndex={0} aria-label="Learning history table">
            <table className="w-full min-w-[44rem] text-sm">
              <thead className="bg-elevated text-left text-xs text-fg-subtle">
                <tr>
                  {['Date', 'Activity', 'Item', 'Duration', 'WPM', 'Accuracy', 'Mistakes', 'Result'].map((h) => (
                    <th key={h} className="px-3 py-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {pageRows.map((s) => {
                  const item = s.title ?? (s.kind === 'lesson' ? s.itemId : getCommand(s.itemId)?.title ?? s.itemId)
                  const track = PLATFORM_LABEL[s.trackId as keyof typeof PLATFORM_LABEL] ?? languageTracks.find((t) => t.language === s.trackId)?.languageName ?? s.trackId
                  return (
                    <tr key={s.id} className="border-t border-line">
                      <td className="whitespace-nowrap px-3 py-2 text-fg-subtle">{new Date(s.completedAt).toLocaleDateString()}</td>
                      <td className="px-3 py-2">{KIND_LABEL[s.kind]}</td>
                      <td className="max-w-[16rem] truncate px-3 py-2 text-fg-muted" title={`${track}: ${item}`}>
                        {track} · {item}
                      </td>
                      <td className="px-3 py-2">{formatDuration(s.durationSec)}</td>
                      <td className="px-3 py-2">{s.wpm}</td>
                      <td className="px-3 py-2">{s.accuracy}%</td>
                      <td className="px-3 py-2">{s.uncorrected + s.corrected}</td>
                      <td className="px-3 py-2">{s.passed ? <span className="text-ok">Exact match</span> : s.kind === 'timed' ? 'Timed' : <span className="text-warn">Mismatches</span>}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          </>
        )}
        {history.length > PAGE && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Button size="sm" variant="secondary" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Newer</Button>
            <span className="text-fg-subtle">Page {page + 1} of {Math.ceil(history.length / PAGE)}</span>
            <Button size="sm" variant="secondary" disabled={(page + 1) * PAGE >= history.length} onClick={() => setPage((p) => p + 1)}>Older</Button>
          </div>
        )}
      </section>

      <div className="mt-10">
        <DataManagement />
      </div>
    </div>
  )
}
