import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, ExternalLink, Heart, ShieldAlert, ShieldCheck, Lock, Eye, CheckCircle2, XCircle, Lightbulb } from 'lucide-react'
import { Button, ButtonLink, DifficultyBadge, ProgressBar, Tag } from '../components/ui'
import { CommandBlock, SimulatedOutput } from '../components/code/Highlight'
import { PracticeRunner, sessionFields } from '../components/typing/PracticeRunner'
import { Terminal } from '../components/terminal/Terminal'
import { usePageMeta, useTrackVisit } from '../app/context'
import { commands, getCommand } from '../content/commands'
import { scenarios } from '../content/scenarios'
import { findModule } from '../content/paths'
import { CATEGORY_LABEL, PLATFORM_LABEL, type CommandExercise } from '../content/types'
import { recordCommandTyped, recordRecall, recordSession, toggleFavorite, useAppData } from '../lib/storage/store'
import { commandMastery } from '../lib/mastery'
import { answersFor, identify, matchesAny } from '../lib/terminal/match'
import { createTerm, push, runBuiltin, runFree, SHELL_OF } from '../lib/terminal/simulator'
import NotFound from './NotFound'

const STEPS = ['Learn', 'Understand', 'Observe', 'Type', 'Recall', 'Apply', 'Review'] as const

function SafetyNote({ c }: { c: CommandExercise }) {
  const map = {
    'read-only': { I: ShieldCheck, cls: 'border-ok/30 bg-ok/5 text-ok', text: 'Read-only: it only inspects the system.' },
    'changes-state': { I: ShieldAlert, cls: 'border-warn/30 bg-warn/5 text-warn', text: 'Changes files or settings. Practice on files you created yourself.' },
    'lab-only': { I: Lock, cls: 'border-err/30 bg-err/5 text-err', text: 'Lab only: run this for real only on systems you are authorized to manage.' },
  } as const
  const s = map[c.safety]
  return (
    <div className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${s.cls}`}>
      <s.I className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>
        {s.text}
        {c.permissions === 'elevated' && ' Requires administrator or sudo rights.'}
      </span>
    </div>
  )
}

function Recall({ c }: { c: CommandExercise }) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<null | { ok: boolean; confused?: CommandExercise }>(null)
  const [revealed, setRevealed] = useState(false)
  const library = useMemo(() => commands.filter((x) => x.platform === c.platform), [c.platform])
  const check = () => {
    if (!value.trim()) return
    const ok = matchesAny(value, answersFor(c), c.shell)
    const confused = ok ? undefined : identify(value, library, c.shell)
    recordRecall(c.id, ok, confused?.id)
    setResult({ ok, confused })
  }
  return (
    <div className="space-y-4">
      <div className="panel panel-pad">
        <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Task</p>
        <p className="mt-1 text-lg text-fg">{c.recallPrompt}</p>
        <p className="mt-1 text-sm text-fg-subtle">Type the {PLATFORM_LABEL[c.platform]} command from memory. Equivalent forms, such as reordered flags, count.</p>
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            check()
          }}
        >
          <label htmlFor="recall-input" className="sr-only">Your command</label>
          <input
            id="recall-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setResult(null)
            }}
            className="h-12 flex-1 rounded-md border border-line-strong bg-term px-3 font-mono text-term-fg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="type the command"
          />
          <Button type="submit" size="lg">Check</Button>
        </form>
      </div>
      {result && (
        <div className={`rounded-lg border p-4 text-sm ${result.ok ? 'border-ok/40 bg-ok/5' : 'border-err/40 bg-err/5'}`} role="status">
          <p className={`flex items-center gap-2 font-semibold ${result.ok ? 'text-ok' : 'text-err'}`}>
            {result.ok ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <XCircle className="h-4 w-4" aria-hidden />}
            {result.ok ? 'Correct, from memory. That counts toward mastery.' : 'Not this time.'}
          </p>
          {result.confused && (
            <p className="mt-2 text-fg-muted">
              You typed <code className="code-inline">{result.confused.command}</code>, which is “{result.confused.title.toLowerCase()}”: {result.confused.summary}
            </p>
          )}
          {!result.ok && !revealed && (
            <button type="button" className="mt-2 text-accent hover:underline" onClick={() => setRevealed(true)}>
              Show the answer
            </button>
          )}
        </div>
      )}
      {(revealed || result?.ok) && (
        <div>
          <p className="mb-2 text-sm text-fg-subtle">Accepted answer{(c.accepted?.length ?? 0) > 0 ? 's' : ''}:</p>
          <div className="space-y-2">
            {answersFor(c).slice(0, 4).map((a) => (
              <CommandBlock key={a} command={a} shell={c.shell} copy={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TryTerminal({ c }: { c: CommandExercise }) {
  const library = useMemo(() => commands.filter((x) => x.platform === c.platform), [c.platform])
  const [term, setTerm] = useState(() => createTerm())
  return (
    <Terminal
      platform={c.platform}
      state={term}
      setState={setTerm}
      heightClass="h-64"
      instructions={<>Try <code className="font-mono text-[#7dd3fc]">{c.command}</code> or any related command. Type <code className="font-mono">help</code> for tips.</>}
      onReset={() => setTerm(createTerm())}
      onSubmit={(input, s) => {
        const b = runBuiltin(s, input, c.platform)
        if (b.handled) return setTerm(b.state)
        const r = runFree(s, input, c.platform, library)
        setTerm(r.match && r.match.id !== c.id ? push(r.state, { kind: 'info', text: `That was: ${r.match.title}.` }) : r.state)
      }}
    />
  )
}

export default function CommandLesson() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const c = getCommand(decodeURIComponent(id))
  const data = useAppData()
  const [step, setStep] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  usePageMeta(c ? `${c.title} (${c.command})` : 'Command not found', c?.summary)
  useTrackVisit(`/lab/command/${id}`, c ? `${c.title}` : undefined)
  const moduleId = params.get('module')
  const mod = moduleId ? findModule(moduleId) : undefined

  if (!c) return <NotFound />
  const mastery = commandMastery(data.commands[c.id])
  const fav = data.favorites.includes(c.id)
  const linkedScenarios = scenarios.filter((s) => s.steps.some((st) => st.commandIds?.includes(c.id)))
  const siblings = mod?.module.commandIds ?? []
  const nextId = siblings[siblings.indexOf(c.id) + 1]
  const nextHref = nextId ? `/lab/command/${nextId}?module=${moduleId}` : mod ? `/learn/${mod.path.id}/${mod.module.id}` : undefined

  return (
    <div className="page">
      <Link to={mod ? `/learn/${mod.path.id}/${mod.module.id}` : '/lab'} className="mb-6 inline-flex items-center gap-1 text-sm text-fg-subtle hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden /> {mod ? mod.module.title : 'Command Lab'}
      </Link>

      <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="accent">{PLATFORM_LABEL[c.platform]}</Tag>
            <Tag>{CATEGORY_LABEL[c.category]}</Tag>
            <DifficultyBadge level={c.difficulty} />
            {c.review === 'needs-review' && <Tag tone="warn">Needs review</Tag>}
          </div>
          <h1 className="mt-3 text-h1">{c.title}</h1>
          <p className="lead mt-2">{c.objective}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-fg-subtle">Mastery</div>
            <div className="text-xl font-semibold">{mastery.score}</div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => toggleFavorite(c.id)} aria-pressed={fav}>
            <Heart className={`h-4 w-4 ${fav ? 'fill-err text-err' : ''}`} aria-hidden /> {fav ? 'Saved' : 'Save'}
          </Button>
        </div>
      </header>

      <div role="tablist" aria-label="Lesson steps" className="scroll-x mb-8 flex gap-1 border-b border-line">
        {STEPS.map((s, i) => (
          <button
            key={s}
            role="tab"
            type="button"
            id={`step-tab-${i}`}
            aria-selected={step === i}
            aria-controls="step-panel"
            onClick={() => setStep(i)}
            className={`relative shrink-0 px-3 py-2.5 text-sm font-medium ${step === i ? 'text-fg' : 'text-fg-subtle hover:text-fg'}`}
          >
            <span className="mr-1.5 tabular-nums text-fg-subtle">{i + 1}</span>
            {s}
            {step === i && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" aria-hidden />}
          </button>
        ))}
      </div>

      <section id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${step}`} className="min-h-[18rem]">
        {step === 0 && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <div className="space-y-5">
              <CommandBlock command={c.command} shell={c.shell} />
              <div>
                <h2 className="text-h3">What it does</h2>
                <p className="mt-1 text-fg-muted">{c.summary}</p>
              </div>
              <div>
                <h2 className="text-h3">When to use it</h2>
                <p className="mt-1 text-fg-muted">{c.whenToUse}</p>
              </div>
              {c.details && (
                <div>
                  <button type="button" onClick={() => setShowDetails((d) => !d)} aria-expanded={showDetails} className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                    <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} aria-hidden /> Technical details
                  </button>
                  {showDetails && <p className="mt-2 rounded-md border border-line bg-sunken p-3 text-sm text-fg-muted">{c.details}</p>}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <SafetyNote c={c} />
              {c.requirements && (
                <div className="rounded-md border border-line bg-surface p-3 text-sm">
                  <div className="text-xs font-semibold text-fg-subtle">Requirements</div>
                  <p className="mt-1 text-fg-muted">{c.requirements}</p>
                </div>
              )}
              <a href={c.source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-md border border-line bg-surface p-3 text-sm text-fg-muted interactive">
                <BookOpen className="h-4 w-4 text-accent" aria-hidden /> {c.source.label} <ExternalLink className="ml-auto h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-3xl">
            <h2 className="text-h3">Syntax breakdown</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-line">
              <table className="w-full text-sm">
                <thead className="bg-elevated text-left text-xs text-fg-subtle">
                  <tr>
                    <th className="px-4 py-2 font-medium">Part</th>
                    <th className="px-4 py-2 font-medium">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {c.syntax.map((s) => (
                    <tr key={s.token} className="border-t border-line">
                      <td className="whitespace-nowrap px-4 py-2.5 align-top font-mono text-accent">{s.token}</td>
                      <td className="px-4 py-2.5 text-fg-muted">{s.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-6 text-h3">Common mistakes</h3>
            <ul className="mt-2 space-y-2">
              {c.mistakes.map((x) => (
                <li key={x} className="flex gap-2 text-sm text-fg-muted">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-err" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <CommandBlock command={c.command} shell={c.shell} />
              <SimulatedOutput output={c.sampleOutput} />
            </div>
            <div>
              {c.notice && (
                <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                    <Eye className="h-4 w-4 text-accent" aria-hidden /> What to notice
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">{c.notice}</p>
                </div>
              )}
              <p className="mt-4 text-xs text-fg-subtle">This output is curated for learning and uses documentation addresses. Real output varies by system and version.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-3xl">
            <p className="mb-4 text-sm text-fg-subtle">Type the command exactly. A perfect attempt counts toward your typing mastery.</p>
            <PracticeRunner
              target={c.command}
              label={`Type the command ${c.command}`}
              languageLabel={PLATFORM_LABEL[c.platform]}
              compact
              autoFocus
              onComplete={(r) => {
                recordCommandTyped(c.id, r.metrics.accuracy, r.metrics.perfect)
                recordSession({ kind: 'guided', trackId: c.platform, itemId: c.id, title: c.title, passed: r.metrics.perfect, ...sessionFields(r) })
              }}
              onNext={() => setStep(4)}
              nextLabel="Go to Recall"
            />
          </div>
        )}

        {step === 4 && (
          <div className="max-w-3xl">
            <Recall key={c.id} c={c} />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            {linkedScenarios.length > 0 && (
              <div>
                <h2 className="text-h3">Use it in a scenario</h2>
                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                  {linkedScenarios.map((s) => (
                    <li key={s.id}>
                      <Link to={`/lab/scenario/${s.id}`} className="panel block p-4 interactive">
                        <div className="font-medium">{s.title}</div>
                        <div className="mt-1 text-sm text-fg-subtle">{s.summary}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="text-h3">Explore in the simulated terminal</h2>
              <p className="mb-3 mt-1 text-sm text-fg-subtle">Run it and its related commands to compare their sample output.</p>
              <TryTerminal c={c} />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="panel panel-pad">
              <div className="flex items-baseline justify-between">
                <h2 className="text-h3">Your mastery</h2>
                <span className="text-2xl font-semibold">{mastery.score}</span>
              </div>
              <ul className="mt-4 space-y-3">
                {mastery.parts.map((p) => (
                  <li key={p.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-fg-muted">
                        {p.label} ({Math.round(p.weight * 100)}%)
                      </span>
                      <span className="text-fg-subtle">{Math.round(p.value * 100)}%</span>
                    </div>
                    <ProgressBar value={p.value * 100} label={p.label} size="sm" />
                    <p className="mt-1 text-2xs text-fg-subtle">{p.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex gap-2 text-sm text-fg-muted">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden />
                {mastery.level === 'mastered'
                  ? 'Mastered. Come back in a few days to keep it fresh.'
                  : (data.commands[c.id]?.recallSuccess ?? 0) === 0
                    ? 'Next: recall it from memory. Recall is worth the most.'
                    : 'Next: practice it again on another day to build repetition.'}
              </p>
            </div>
            <div className="space-y-4">
              {c.related && c.related.length > 0 && (
                <div>
                  <h2 className="text-h3">Related commands</h2>
                  <ul className="mt-2 space-y-1.5">
                    {c.related.map((r) => {
                      const rc = getCommand(r)!
                      return (
                        <li key={r}>
                          <Link to={`/lab/command/${r}`} className="flex items-center justify-between gap-2 rounded-md border border-line px-3 py-2 text-sm interactive">
                            <span className="truncate">{rc.title}</span>
                            <code className="truncate font-mono text-xs text-fg-subtle">{rc.command}</code>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {nextHref && (
                <ButtonLink to={nextHref}>
                  {nextId ? `Next lesson: ${getCommand(nextId)!.title}` : 'Back to the module'} <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              )}
            </div>
          </div>
        )}
      </section>

      <div className="mt-10 flex justify-between border-t border-line pt-5">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back
        </Button>
        {step < STEPS.length - 1 && (
          <Button onClick={() => setStep((s) => s + 1)}>
            {STEPS[step + 1]} <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>
      <p className="sr-only" aria-live="polite">Step {step + 1} of 7: {STEPS[step]}. Shell: {SHELL_OF[c.platform]}.</p>
    </div>
  )
}
