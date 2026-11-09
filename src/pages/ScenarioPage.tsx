import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Ticket, Lightbulb, RotateCcw, Flag } from 'lucide-react'
import { Button, ButtonLink, DifficultyBadge, Tag } from '../components/ui'
import { Terminal } from '../components/terminal/Terminal'
import { SimulatedOutput } from '../components/code/Highlight'
import { usePageMeta, useTrackVisit } from '../app/context'
import { getScenario, scenarios } from '../content/scenarios'
import { commands, getCommand } from '../content/commands'
import { findModule } from '../content/paths'
import { PLATFORM_LABEL, type ScenarioStep } from '../content/types'
import { answersFor, identify, matchesAny } from '../lib/terminal/match'
import { createTerm, push, runBuiltin, SHELL_OF, type TermState } from '../lib/terminal/simulator'
import { recordRecall, recordScenario, useAppData } from '../lib/storage/store'
import NotFound from './NotFound'

function stepAnswers(step: ScenarioStep): string[] {
  return [...(step.accepted ?? []), ...(step.commandIds ?? []).flatMap((id) => answersFor(getCommand(id)!))]
}

function stepOutput(step: ScenarioStep): string {
  if (step.output !== undefined) return step.output
  const c = step.commandIds?.[0] ? getCommand(step.commandIds[0]) : undefined
  return c?.sampleOutput ?? ''
}

export default function ScenarioPage() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const sc = getScenario(id)
  const data = useAppData()
  usePageMeta(sc ? `Scenario: ${sc.title}` : 'Scenario not found', sc?.summary)
  useTrackVisit(`/lab/scenario/${id}`, sc ? `Scenario: ${sc.title}` : undefined)
  const [stepIdx, setStepIdx] = useState(0)
  const [solved, setSolved] = useState<boolean[]>([])
  const [firstTry, setFirstTry] = useState<boolean[]>([])
  const [fails, setFails] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [term, setTerm] = useState<TermState>(() => createTerm())
  const [finished, setFinished] = useState(false)
  const library = useMemo(() => (sc ? commands.filter((c) => c.platform === sc.platform) : []), [sc])
  const mod = params.get('module') ? findModule(params.get('module')!) : undefined

  if (!sc) return <NotFound />
  const step = sc.steps[stepIdx]!
  const shell = SHELL_OF[sc.platform]
  const isSolved = !!solved[stepIdx]

  const markSolved = (first: boolean) => {
    setSolved((s) => {
      const n = s.slice()
      n[stepIdx] = true
      return n
    })
    setFirstTry((f) => {
      const n = f.slice()
      n[stepIdx] = first
      return n
    })
  }

  const reset = () => {
    setStepIdx(0)
    setSolved([])
    setFirstTry([])
    setFails(0)
    setPicked(null)
    setTerm(createTerm())
    setFinished(false)
  }

  const advance = () => {
    if (stepIdx + 1 >= sc.steps.length) {
      const ratio = firstTry.filter(Boolean).length / sc.steps.length
      recordScenario(sc.id, ratio)
      setFinished(true)
    } else {
      setStepIdx(stepIdx + 1)
      setFails(0)
      setPicked(null)
    }
  }

  const onSubmit = (input: string, s: TermState) => {
    const b = runBuiltin(s, input, sc.platform)
    if (b.handled) return setTerm(b.state)
    if (isSolved) return setTerm(push(s, { kind: 'info', text: 'This step is solved. Use "Next step" to continue.' }))
    if (!input.trim()) return setTerm(s)
    const answers = stepAnswers(step)
    if (matchesAny(input, answers, shell)) {
      const out = stepOutput(step)
      for (const cid of step.commandIds ?? []) if (matchesAny(input, answersFor(getCommand(cid)!), shell)) recordRecall(cid, true)
      setTerm(push(s, { kind: 'output', text: out.trim() ? out : '(no output)' }, { kind: 'success', text: 'That command fits this step.' }))
      markSolved(fails === 0)
    } else {
      const other = identify(input, library, shell)
      const n = fails + 1
      setFails(n)
      if (other && step.commandIds?.[0]) recordRecall(step.commandIds[0], false, other.id)
      const msg = other
        ? `"${other.command}" is a real command (${other.title.toLowerCase()}), but it does not answer this step.`
        : 'That does not match the expected approach for this step.'
      setTerm(push(s, { kind: 'error', text: `${msg}${n >= 2 && step.hint ? `\nHint: ${step.hint}` : n === 1 ? ' Try again, or use the hint.' : ''}` }))
    }
  }

  const idx = scenarios.findIndex((x) => x.id === sc.id)
  const nextScenario = scenarios.slice(idx + 1).find((x) => x.track === sc.track)

  return (
    <div className="page">
      <Link to={mod ? `/learn/${mod.path.id}/${mod.module.id}` : `/lab?platform=${sc.platform}`} className="mb-6 inline-flex items-center gap-1 text-sm text-fg-subtle hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden /> {mod ? mod.module.title : 'Command Lab'}
      </Link>
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="violet">Scenario</Tag>
          <Tag tone="accent">{PLATFORM_LABEL[sc.platform]}</Tag>
          <DifficultyBadge level={sc.difficulty} />
          {data.scenarios[sc.id]?.completed && <Tag tone="ok">Completed before</Tag>}
        </div>
        <h1 className="mt-3 text-h1">{sc.title}</h1>
        <p className="lead mt-2">{sc.summary}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="panel panel-pad">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              <Ticket className="h-4 w-4" aria-hidden /> The situation
            </p>
            <p className="mt-2 text-sm text-fg-muted">{sc.context}</p>
          </div>
          <ol className="space-y-2" aria-label="Steps">
            {sc.steps.map((s, i) => (
              <li key={i} className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${i === stepIdx && !finished ? 'border-accent bg-accent/5' : 'border-line'}`}>
                {solved[i] ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-label="Solved" /> : <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-line-strong text-[10px] text-fg-subtle">{i + 1}</span>}
                <span className={i === stepIdx ? 'text-fg' : 'text-fg-subtle'}>{s.kind === 'command' ? 'Run a command' : 'Interpret the evidence'}</span>
              </li>
            ))}
          </ol>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset scenario
          </Button>
        </aside>

        <div className="min-w-0 space-y-5">
          {finished ? (
            <div className="panel animate-fade-up overflow-hidden" role="status">
              <div className="flex items-start gap-3 border-b border-line bg-ok/10 px-5 py-4">
                <Flag className="mt-0.5 h-5 w-5 text-ok" aria-hidden />
                <div>
                  <h2 className="text-h3">Scenario complete</h2>
                  <p className="text-sm text-fg-muted">
                    {firstTry.filter(Boolean).length} of {sc.steps.length} steps solved on the first try.
                  </p>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <h3 className="font-semibold">What it means</h3>
                  <p className="mt-1 text-fg-muted">{sc.wrapUp.meaning}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Next troubleshooting step</h3>
                  <p className="mt-1 text-fg-muted">{sc.wrapUp.nextStep}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-line bg-sunken/50 px-5 py-4">
                <Button variant="secondary" onClick={reset}>
                  <RotateCcw className="h-4 w-4" aria-hidden /> Run it again
                </Button>
                {nextScenario && (
                  <ButtonLink to={`/lab/scenario/${nextScenario.id}`}>
                    Next scenario: {nextScenario.title} <ArrowRight className="h-4 w-4" aria-hidden />
                  </ButtonLink>
                )}
              </div>
            </div>
          ) : (
            <>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  Step {stepIdx + 1} of {sc.steps.length}
                </p>
                <h2 className="mt-1 text-h3">{step.prompt}</h2>
              </div>

              {step.kind === 'command' ? (
                <>
                  <Terminal key={stepIdx === 0 ? 'term' : 'term'} platform={sc.platform} state={term} setState={setTerm} onSubmit={onSubmit} heightClass="h-80" />
                  <div className="flex flex-wrap items-center gap-2">
                    {!isSolved && step.hint && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFails((f) => Math.max(f, 1))
                          setTerm(push(term, { kind: 'info', text: `Hint: ${step.hint}` }))
                        }}
                      >
                        <Lightbulb className="h-4 w-4" aria-hidden /> Hint
                      </Button>
                    )}
                    {!isSolved && fails >= 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const a = stepAnswers(step)[0]!
                          setTerm(push(term, { kind: 'info', text: `One correct answer: ${a}\nType it to see the output and continue.` }))
                        }}
                      >
                        Show an answer
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {step.output && <SimulatedOutput output={step.output} title="Evidence (simulated)" />}
                  <fieldset>
                    <legend className="sr-only">{step.prompt}</legend>
                    <div className="grid gap-2">
                      {step.choices!.map((c, ci) => {
                        const show = picked !== null
                        const isPicked = picked === ci
                        return (
                          <div key={ci}>
                            <button
                              type="button"
                              disabled={isSolved}
                              onClick={() => {
                                setPicked(ci)
                                if (c.correct) markSolved(fails === 0)
                                else setFails((f) => f + 1)
                              }}
                              className={`flex min-h-[48px] w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-sm transition duration-fast ${
                                isPicked ? (c.correct ? 'border-ok bg-ok/10' : 'border-err bg-err/10') : 'border-line hover:border-line-strong hover:bg-elevated'
                              } ${isSolved && !c.correct ? 'opacity-60' : ''}`}
                            >
                              {isPicked && (c.correct ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-label="Correct" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-err" aria-label="Incorrect" />)}
                              <span>{c.label}</span>
                            </button>
                            {show && isPicked && <p className="mt-1.5 px-1 text-sm text-fg-muted" aria-live="polite">{c.why}</p>}
                          </div>
                        )
                      })}
                    </div>
                  </fieldset>
                </div>
              )}

              {isSolved && (
                <div className="animate-fade-up rounded-lg border border-ok/30 bg-ok/5 p-4" role="status">
                  <p className="font-semibold text-ok">Why this works</p>
                  <p className="mt-1 text-sm text-fg-muted">{step.explanation}</p>
                  <Button className="mt-3" onClick={advance}>
                    {stepIdx + 1 >= sc.steps.length ? 'Finish scenario' : 'Next step'} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
