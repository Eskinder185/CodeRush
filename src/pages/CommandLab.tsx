import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Heart, History, Brain, Calculator, Network, Workflow, FlaskConical, Star } from 'lucide-react'
import { Button, ButtonLink, DifficultyBadge, PageHeader, Segmented, Select, Tag, EmptyState } from '../components/ui'
import { Terminal } from '../components/terminal/Terminal'
import { usePageMeta } from '../app/context'
import { commands, getCommand } from '../content/commands'
import { scenarios } from '../content/scenarios'
import { CATEGORY_LABEL, PLATFORM_LABEL, type CommandCategory, type Difficulty, type Platform } from '../content/types'
import { useAppData } from '../lib/storage/store'
import { commandMastery } from '../lib/mastery'
import { createTerm, runBuiltin, runFree } from '../lib/terminal/simulator'
import { search } from '../lib/search'

const PLATFORMS: Platform[] = ['linux', 'powershell', 'windows-cmd', 'cisco-ios']
const SHORT: Record<Platform, string> = { linux: 'Linux', powershell: 'PowerShell', 'windows-cmd': 'Windows CMD', 'cisco-ios': 'Cisco IOS' }

export default function CommandLab() {
  usePageMeta('Command Lab', 'Learn Linux, PowerShell, Windows networking, and Cisco IOS commands in a safe simulated terminal with recall practice and troubleshooting scenarios.')
  const [params, setParams] = useSearchParams()
  const platform = (PLATFORMS.includes(params.get('platform') as Platform) ? params.get('platform') : 'linux') as Platform
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<CommandCategory | 'all'>('all')
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [term, setTerm] = useState(() => createTerm())
  const [limit, setLimit] = useState(24)
  const data = useAppData()

  const library = useMemo(() => commands.filter((c) => c.platform === platform), [platform])
  const categories = useMemo(() => [...new Set(library.map((c) => c.category))], [library])
  const list = useMemo(() => {
    let xs = library
    if (q.trim()) {
      const ids = new Set(search(q, { platform, kind: 'command' }, 200).map((r) => r.entry.id))
      xs = xs.filter((c) => ids.has(c.id))
    }
    return xs.filter((c) => (category === 'all' || c.category === category) && (difficulty === 'all' || c.difficulty === difficulty))
  }, [library, q, category, difficulty, platform])

  const favs = data.favorites.map(getCommand).filter((c) => c && c.platform === platform)
  const recent = data.recent.map(getCommand).filter((c) => c && c.platform === platform).slice(0, 6)
  const scen = scenarios.filter((s) => s.platform === platform)

  return (
    <div className="page">
      <PageHeader
        eyebrow="CodeRush Command Lab"
        title="Learn the commands. Build the muscle memory. Understand the systems."
        lead={`${commands.length} command exercises and ${scenarios.length} troubleshooting scenarios. The terminal is a simulation: commands are matched against lessons and never executed.`}
        actions={
          <>
            <ButtonLink to={`/practice/recall?platform=${platform}`} variant="secondary">
              <Brain className="h-4 w-4" aria-hidden /> Recall mode
            </ButtonLink>
            <ButtonLink to={`/practice?mode=command&platform=${platform}`}>Command typing</ButtonLink>
            <ButtonLink to="/missions" variant="secondary">Troubleshooting missions</ButtonLink>
          </>
        }
      />

      <div className="mb-6">
        <Segmented
          label="Platform"
          value={platform}
          onChange={(v) => {
            setParams({ platform: v }, { replace: true })
            setCategory('all')
            setLimit(24)
            setTerm(createTerm())
          }}
          options={PLATFORMS.map((p) => ({ value: p, label: `${SHORT[p]} (${commands.filter((c) => c.platform === p).length})` }))}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0">
          <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <label className="relative block">
              <span className="sr-only">Search {PLATFORM_LABEL[platform]} commands</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search ${SHORT[platform]} commands, e.g. "dns" or "open ports"`}
                className="h-10 w-full rounded-md border border-line-strong bg-surface pl-9 pr-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <Select label="Category" value={category} onChange={setCategory} options={[{ value: 'all', label: 'All categories' }, ...categories.map((c) => ({ value: c, label: CATEGORY_LABEL[c] }))]} />
            <Select
              label="Difficulty"
              value={difficulty}
              onChange={setDifficulty}
              options={[
                { value: 'all', label: 'All levels' },
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
              ]}
            />
          </div>
          <p className="mb-3 text-sm text-fg-subtle" aria-live="polite">
            {list.length} of {library.length} commands
          </p>
          {list.length === 0 ? (
            <EmptyState icon={<Search className="h-8 w-8" />} title="No matching commands">
              Try a different word or clear the filters.
            </EmptyState>
          ) : (
            <ul className="grid gap-2 md:grid-cols-2">
              {list.slice(0, limit).map((c) => {
                const m = commandMastery(data.commands[c.id])
                return (
                  <li key={c.id}>
                    <Link to={`/lab/command/${c.id}`} className="panel flex h-full flex-col gap-2 p-4 interactive">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-fg">{c.title}</span>
                        {data.favorites.includes(c.id) && <Heart className="h-4 w-4 shrink-0 fill-err text-err" aria-label="Saved" />}
                      </div>
                      <code className="block truncate rounded bg-term px-2 py-1 font-mono text-xs text-term-fg">{c.command}</code>
                      <div className="mt-auto flex flex-wrap items-center gap-1.5">
                        <Tag>{CATEGORY_LABEL[c.category]}</Tag>
                        <DifficultyBadge level={c.difficulty} />
                        {c.safety !== 'read-only' && <Tag tone="warn">{c.safety === 'lab-only' ? 'Lab only' : 'Changes state'}</Tag>}
                        {m.level !== 'not-started' && (
                          <span className="ml-auto text-2xs font-semibold text-fg-subtle">
                            {m.level === 'mastered' && <Star className="mr-0.5 inline h-3 w-3 text-violet" aria-hidden />}
                            {m.score}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
          {list.length > limit && (
            <div className="mt-4 text-center">
              <Button variant="secondary" onClick={() => setLimit((l) => l + 48)}>
                Show more ({list.length - limit} remaining)
              </Button>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <FlaskConical className="h-4 w-4 text-accent" aria-hidden /> Free exploration
            </h2>
            <Terminal
              platform={platform}
              state={term}
              setState={setTerm}
              heightClass="h-72"
              onReset={() => setTerm(createTerm())}
              instructions={<>Type any command from the {SHORT[platform]} library to see its curated output. Try <code className="font-mono text-[#7dd3fc]">{library[0]?.command}</code>.</>}
              onSubmit={(input, s) => {
                const b = runBuiltin(s, input, platform)
                setTerm(b.handled ? b.state : runFree(s, input, platform, library).state)
              }}
            />
          </div>
          <div className="panel panel-pad">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Heart className="h-4 w-4 text-err" aria-hidden /> Saved commands
            </h2>
            {favs.length === 0 ? (
              <p className="mt-2 text-sm text-fg-subtle">Use Save on any command lesson to keep it here.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {favs.map((c) => (
                  <li key={c!.id}>
                    <Link to={`/lab/command/${c!.id}`} className="block truncate rounded px-2 py-1.5 font-mono text-sm text-fg-muted hover:bg-elevated">
                      {c!.command}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <h2 className="mt-5 flex items-center gap-2 text-sm font-semibold">
              <History className="h-4 w-4 text-accent" aria-hidden /> Recently practiced
            </h2>
            {recent.length === 0 ? (
              <p className="mt-2 text-sm text-fg-subtle">Nothing yet.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {recent.map((c) => (
                  <li key={c!.id}>
                    <Link to={`/lab/command/${c!.id}`} className="block truncate rounded px-2 py-1.5 font-mono text-sm text-fg-muted hover:bg-elevated">
                      {c!.command}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="panel panel-pad">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Workflow className="h-4 w-4 text-violet" aria-hidden /> {SHORT[platform]} scenarios
            </h2>
            <ul className="mt-2 space-y-1">
              {scen.map((s) => (
                <li key={s.id}>
                  <Link to={`/lab/scenario/${s.id}`} className="flex items-center justify-between gap-2 rounded px-2 py-1.5 text-sm text-fg-muted hover:bg-elevated">
                    <span className="truncate">{s.title}</span>
                    {data.scenarios[s.id]?.completed && <Tag tone="ok">Done</Tag>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/tools/subnetting" className="panel flex flex-col items-start gap-2 p-4 text-sm interactive">
              <Calculator className="h-5 w-5 text-accent" aria-hidden /> Subnetting trainer
            </Link>
            <Link to="/tools/topology" className="panel flex flex-col items-start gap-2 p-4 text-sm interactive">
              <Network className="h-5 w-5 text-accent" aria-hidden /> Topology explorer
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
