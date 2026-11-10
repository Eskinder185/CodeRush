import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, FlaskConical, Lightbulb, RotateCcw } from 'lucide-react'
import { Button, ButtonLink, PageHeader, Tag } from '../components/ui'
import { Terminal } from '../components/terminal/Terminal'
import { usePageMeta, useTrackVisit } from '../app/context'
import { getMission, missions } from '../content/missions'
import { PLATFORM_LABEL } from '../content/types'
import { matches } from '../lib/terminal/match'
import { createTerm, PROMPTS, push, recordInput, runBuiltin, SHELL_OF, type TermState } from '../lib/terminal/simulator'
import { missionScore } from '../lib/missions'
import { recordMission, useAppData } from '../lib/storage/store'
import NotFound from './NotFound'

export default function Missions() {
  const { id } = useParams()
  const mission = id ? getMission(id) : undefined
  const data = useAppData()
  usePageMeta(mission?.title ?? 'Troubleshooting missions', mission?.summary ?? 'Investigate synthetic technical incidents in a safe simulation.')
  useTrackVisit(id ? `/missions/${id}` : '/missions', mission?.title)
  const [term, setTerm] = useState<TermState>(() => createTerm())
  const [viewed, setViewed] = useState<string[]>([])
  const [phase, setPhase] = useState<'investigate' | 'resolve' | 'verify' | 'done'>('investigate')
  const [wrong, setWrong] = useState(0)
  const [hints, setHints] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  if (id && !mission) return <NotFound />
  if (!mission) return <div className="page"><PageHeader eyebrow="Command Lab" title="Troubleshooting missions" lead="Investigate synthetic incidents. Choose evidence in any order, diagnose the root cause, select a resolution, and verify the outcome. Nothing runs on a real system." /><div className="grid gap-4 md:grid-cols-2">{missions.map((m) => <Link to={`/missions/${m.id}`} key={m.id} className="panel panel-pad interactive"><p className="eyebrow">{PLATFORM_LABEL[m.platform]} · Simulated</p><h2 className="mt-2 text-h3">{m.title}</h2><p className="mt-2 text-sm text-fg-muted">{m.summary}</p>{data.missions[m.id] && <p className="mt-3 text-xs text-ok">Best score: {data.missions[m.id]!.bestScore}/100</p>}<span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">Open mission <ArrowRight className="h-4 w-4" aria-hidden /></span></Link>)}</div></div>

  function reset() { setTerm(createTerm()); setViewed([]); setPhase('investigate'); setWrong(0); setHints(0); setFeedback(''); setScore(0) }
  function submit(input: string, state: TermState) {
    const built = runBuiltin(state, input, mission!.platform)
    if (built.handled) { setTerm(built.state); return }
    const tool = mission!.tools.find((t) => matches(input, t.command, SHELL_OF[mission!.platform]))
    if (!tool) { setTerm(push(state, { kind: 'error', text: 'This mission only supports the listed investigation tools. No command was executed.' })); return }
    setViewed((v) => v.includes(tool.id) ? v : [...v, tool.id])
    setTerm(push(state, { kind: 'output', text: tool.output }))
  }
  function choose(correct: boolean, explanation: string, next: 'resolve' | 'verify') {
    setFeedback(explanation)
    if (correct) setPhase(next)
    else setWrong((n) => n + 1)
  }
  function verify() {
    const result = missionScore(mission!, new Set(viewed), wrong, hints)
    setTerm((s) => push(recordInput(s, mission!.verification.command, PROMPTS[mission!.platform]), { kind: 'output', text: mission!.verification.output }))
    setScore(result)
    recordMission(mission!.id, result)
    setPhase('done')
  }
  return <div className="page"><Link to="/missions" className="mb-5 inline-block text-sm text-accent hover:underline">← All missions</Link><PageHeader eyebrow="Simulated investigation" title={mission.title} lead={mission.incident} /><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"><div className="space-y-4"><section className="panel panel-pad"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-h3">Investigation</h2><Tag tone="violet">{PLATFORM_LABEL[mission.platform]}</Tag></div><p className="mt-2 text-sm text-fg-muted">Select tools in any order or type their commands in the simulated terminal. Evidence remains available throughout the mission.</p><div className="mt-4 grid gap-2">{mission.tools.map((tool) => <Button key={tool.id} variant={viewed.includes(tool.id) ? 'secondary' : 'ghost'} className="min-w-0 w-full justify-start !whitespace-normal text-left" onClick={() => submit(tool.command, recordInput(term, tool.command, PROMPTS[mission.platform]))}>{tool.label}{viewed.includes(tool.id) ? ' · inspected' : ''}</Button>)}</div><div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="secondary" onClick={() => { setHints((n) => n + 1); setFeedback('Compare successful connectivity tests with failed services. Gather several pieces of evidence before deciding.') }}><Lightbulb className="h-4 w-4" aria-hidden /> Hint</Button><Button size="sm" variant="secondary" onClick={reset}><RotateCcw className="h-4 w-4" aria-hidden /> Reset</Button></div></section><section className="panel panel-pad"><h2 className="text-h3">Evidence collected</h2>{viewed.length ? <ul className="mt-3 space-y-3">{viewed.map((id) => { const tool = mission.tools.find((t) => t.id === id)!; return <li key={id}><p className="text-sm font-semibold">{tool.label}</p><pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-sunken p-2 font-mono text-xs text-fg-muted">{tool.output}</pre></li> })}</ul> : <p className="mt-2 text-sm text-fg-subtle">No tools used yet.</p>}</section></div><div className="min-w-0 space-y-4"><Terminal platform={mission.platform} state={term} setState={setTerm} onSubmit={submit} onReset={reset} instructions="Practice simulation. Only the listed commands return synthetic evidence." /><section className="panel panel-pad" aria-live="polite">{phase === 'investigate' && <><h2 className="text-h3">What is the root cause?</h2><p className="mt-1 text-sm text-fg-subtle">You may decide at any point. More relevant evidence improves the investigation score.</p><div className="mt-4 grid gap-2">{mission.diagnoses.map((choice) => <Button key={choice.label} variant="secondary" className="h-auto min-h-11 min-w-0 w-full justify-start !whitespace-normal py-2 text-left" onClick={() => choose(choice.correct, choice.explanation, 'resolve')}>{choice.label}</Button>)}</div></>}{phase === 'resolve' && <><h2 className="text-h3">Choose a resolution</h2><div className="mt-4 grid gap-2">{mission.resolutions.map((choice) => <Button key={choice.label} variant="secondary" className="h-auto min-h-11 min-w-0 w-full justify-start !whitespace-normal py-2 text-left" onClick={() => choose(choice.correct, choice.explanation, 'verify')}>{choice.label}</Button>)}</div></>}{phase === 'verify' && <><h2 className="text-h3">Verify the outcome</h2><p className="mt-2 text-sm text-fg-muted">Run the synthetic verification check and explain what it proves.</p><code className="mt-3 block overflow-x-auto rounded bg-sunken p-2 font-mono text-xs">{mission.verification.command}</code><Button className="mt-4" onClick={verify}><FlaskConical className="h-4 w-4" aria-hidden /> Run verification</Button></>}{phase === 'done' && <><h2 className="text-h3">Mission complete · {score}/100</h2><p className="mt-2 text-sm text-fg-muted">{mission.verification.explanation}</p><p className="mt-3 text-sm text-fg-muted">{mission.lesson}</p><p className="mt-2 text-xs text-fg-subtle">Score: diagnosis 40, relevant evidence 25, resolution 20, verification 15. Wrong choices and hints reduce the score. The order of evidence does not matter.</p><div className="mt-4 flex flex-wrap gap-2"><Button variant="secondary" onClick={reset}>Try again</Button><ButtonLink to="/missions">More missions</ButtonLink></div></>}{feedback && phase !== 'done' && <p className="mt-4 rounded border border-line bg-sunken p-3 text-sm text-fg-muted" role="status">{feedback}</p>}</section></div></div></div>
}
