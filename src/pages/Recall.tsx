import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, XCircle, SkipForward, Eye } from 'lucide-react'
import { Button, PageHeader, Segmented, Select, Tag, DifficultyBadge } from '../components/ui'
import { CommandBlock } from '../components/code/Highlight'
import { usePageMeta } from '../app/context'
import { commands } from '../content/commands'
import { PLATFORM_LABEL, type Difficulty, type Platform } from '../content/types'
import { answersFor, identify, matchesAny } from '../lib/terminal/match'
import { recordRecall, useAppData } from '../lib/storage/store'
import { commandMastery } from '../lib/mastery'
import { rng } from '../lib/daily'

const PLATFORMS: Platform[] = ['linux', 'powershell', 'windows-cmd', 'cisco-ios']

export default function Recall() {
  usePageMeta('Recall mode', 'Read a task and type the right command from memory. Builds the knowledge that typing alone does not.')
  const [params] = useSearchParams()
  const data = useAppData()
  const [platform, setPlatform] = useState<Platform>((PLATFORMS.includes(params.get('platform') as Platform) ? params.get('platform') : 'linux') as Platform)
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [order, setOrder] = useState<'weakest' | 'random'>('weakest')
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9))
  const [i, setI] = useState(0)
  const [value, setValue] = useState('')
  const [result, setResult] = useState<null | { ok: boolean; other?: string }>(null)
  const [reveal, setReveal] = useState(false)
  const [tally, setTally] = useState({ right: 0, total: 0 })

  const deck = useMemo(() => {
    const pool = commands.filter((c) => c.platform === platform && (difficulty === 'all' || c.difficulty === difficulty))
    if (order === 'weakest') return [...pool].sort((a, b) => commandMastery(data.commands[a.id]).score - commandMastery(data.commands[b.id]).score || a.id.localeCompare(b.id))
    const r = rng(seed)
    return [...pool].map((c) => ({ c, k: r() })).sort((a, b) => a.k - b.k).map((x) => x.c)
    // The deck is fixed for a session so answering does not reshuffle it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, difficulty, order, seed])
  const c = deck[i % Math.max(1, deck.length)]

  const nextCard = () => {
    setI((n) => n + 1)
    setValue('')
    setResult(null)
    setReveal(false)
  }

  if (!c) return <div className="page">No commands match.</div>

  const check = () => {
    if (!value.trim() || result) return
    const ok = matchesAny(value, answersFor(c), c.shell)
    const other = ok ? undefined : identify(value, commands.filter((x) => x.platform === platform), c.shell)
    recordRecall(c.id, ok, other?.id)
    setResult({ ok, other: other ? `${other.command}: ${other.title.toLowerCase()}` : undefined })
    setTally((t) => ({ right: t.right + (ok ? 1 : 0), total: t.total + 1 }))
  }

  return (
    <div className="page max-w-4xl">
      <PageHeader eyebrow="Recall mode" title="Type it from memory" lead="Recall is the strongest signal of mastery. Equivalent answers count, such as reordered flags or IOS abbreviations." />
      <div className="mb-6 flex flex-wrap items-end gap-3">
        <Select label="Platform" value={platform} onChange={(v) => { setPlatform(v); setI(0); setResult(null); setValue('') }} options={PLATFORMS.map((p) => ({ value: p, label: PLATFORM_LABEL[p] }))} />
        <Select label="Difficulty" value={difficulty} onChange={(v) => { setDifficulty(v); setI(0) }} options={[{ value: 'all', label: 'All levels' }, { value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }, { value: 'advanced', label: 'Advanced' }]} />
        <div>
          <div className="mb-1 text-xs font-medium text-fg-subtle">Order</div>
          <Segmented label="Order" value={order} onChange={(v) => { setOrder(v); setSeed(seed + 1); setI(0) }} options={[{ value: 'weakest', label: 'Weakest first' }, { value: 'random', label: 'Random' }]} size="sm" />
        </div>
        <p className="ml-auto text-sm text-fg-subtle" aria-live="polite">
          This session: {tally.right} of {tally.total} correct
        </p>
      </div>

      <div className="panel panel-pad">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="accent">{PLATFORM_LABEL[c.platform]}</Tag>
          <DifficultyBadge level={c.difficulty} />
          <span className="text-xs text-fg-subtle">Card {(i % deck.length) + 1} of {deck.length}</span>
        </div>
        <p className="mt-3 text-xl font-medium text-fg">{c.recallPrompt}</p>
        <form className="mt-5 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => { e.preventDefault(); if (result) nextCard(); else check() }}>
          <label htmlFor="recall" className="sr-only">Your command</label>
          <input
            id="recall"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={!!result}
            className="h-12 flex-1 rounded-md border border-line-strong bg-term px-3 font-mono text-term-fg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="type the command, then Enter"
          />
          <Button type="submit" size="lg">{result ? 'Next' : 'Check'}</Button>
        </form>
        {result && (
          <div className={`mt-4 rounded-md border p-3 text-sm ${result.ok ? 'border-ok/40 bg-ok/5' : 'border-err/40 bg-err/5'}`} role="status">
            <p className={`flex items-center gap-2 font-semibold ${result.ok ? 'text-ok' : 'text-err'}`}>
              {result.ok ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <XCircle className="h-4 w-4" aria-hidden />} {result.ok ? 'Correct.' : 'Not quite.'}
            </p>
            {result.other && <p className="mt-1 text-fg-muted">You answered with {result.other}.</p>}
          </div>
        )}
        {(reveal || result) && (
          <div className="mt-4">
            <CommandBlock command={c.command} shell={c.shell} copy={false} />
            <p className="mt-2 text-sm text-fg-muted">{c.summary}</p>
            <Link to={`/lab/command/${c.id}`} className="mt-2 inline-block text-sm text-accent hover:underline">Open the full lesson</Link>
          </div>
        )}
        <div className="mt-5 flex gap-2">
          {!result && !reveal && (
            <Button variant="ghost" size="sm" onClick={() => setReveal(true)}>
              <Eye className="h-4 w-4" aria-hidden /> Reveal
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={nextCard}>
            <SkipForward className="h-4 w-4" aria-hidden /> Skip
          </Button>
        </div>
      </div>
    </div>
  )
}
