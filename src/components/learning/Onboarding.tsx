import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button, ButtonLink } from '../ui'
import { DAILY_MINUTES, GOALS, LEVELS, readPreferences, recommendedPath, savePreferences, type GoalId, type Preferences } from '../../lib/onboarding'

const SKIP_KEY = 'coderush:onboarding:skipped:v1'

export function Onboarding() {
  const [saved, setSaved] = useState(() => readPreferences())
  const [skipped, setSkipped] = useState(() => { try { return localStorage.getItem(SKIP_KEY) === '1' } catch { return false } })
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<GoalId>(saved?.goal ?? 'software')
  const [level, setLevel] = useState<Preferences['level']>(saved?.level ?? 'Complete beginner')
  const [minutes, setMinutes] = useState<Preferences['dailyMinutes']>(saved?.dailyMinutes ?? 10)
  const [error, setError] = useState('')
  const path = saved ? recommendedPath(saved.goal) : null

  function finish() {
    const p: Preferences = { version: 1, goal, level, dailyMinutes: minutes }
    if (!savePreferences(p)) { setError('Preferences could not be saved in this browser.'); return }
    setSaved(p)
    setOpen(false)
    setError('')
  }

  if (!open && (saved || skipped)) return (
    <div className="panel panel-pad flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="eyebrow">Your learning journey</p>
        <h2 className="mt-1 text-h3">{path ? `Start with ${path.title}` : 'Find a starting point that fits you'}</h2>
        <p className="mt-1 text-sm text-fg-subtle">{saved ? `${saved.dailyMinutes} minutes a day · ${saved.level}. You can change this anytime.` : 'Three quick questions, or browse every path.'}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {path && <ButtonLink to={`/learn/${path.id}`}>Open recommended path <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>}
        <Button variant="secondary" onClick={() => { setStep(0); setOpen(true) }}>{saved ? 'Edit goals' : 'Choose a goal'}</Button>
      </div>
    </div>
  )

  if (!open) return (
    <div className="panel panel-pad flex flex-wrap items-center justify-between gap-4">
      <div><p className="eyebrow">New here?</p><h2 className="mt-1 text-h3">Start with a path that fits your goal.</h2><p className="mt-1 text-sm text-fg-subtle">Optional setup takes three questions. Your answers stay in this browser.</p></div>
      <div className="flex flex-wrap gap-2"><Button onClick={() => setOpen(true)}>Start my learning journey</Button><Button variant="secondary" onClick={() => { setSkipped(true); try { localStorage.setItem(SKIP_KEY, '1') } catch { /* browsing still works */ } }}>Skip for now</Button></div>
    </div>
  )

  return (
    <section className="panel panel-pad" aria-labelledby="onboarding-title">
      <div className="flex items-center justify-between gap-3"><p className="eyebrow">Step {step + 1} of 3</p><Button size="sm" variant="secondary" onClick={() => setOpen(false)}>Close</Button></div>
      <h2 id="onboarding-title" className="mt-2 text-h3">{['What do you want to learn?', 'What is your experience level?', 'What is your daily learning goal?'][step]}</h2>
      <div className="mt-5 grid gap-2 sm:grid-cols-2" role="group" aria-label="Choose one answer">
        {step === 0 && GOALS.map((x) => <button type="button" key={x.id} aria-pressed={goal === x.id} onClick={() => setGoal(x.id)} className={`rounded-lg border p-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${goal === x.id ? 'border-accent bg-accent/10 text-fg' : 'border-line text-fg-muted hover:border-line-strong'}`}>{x.label}</button>)}
        {step === 1 && LEVELS.map((x) => <button type="button" key={x} aria-pressed={level === x} onClick={() => setLevel(x)} className={`rounded-lg border p-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${level === x ? 'border-accent bg-accent/10 text-fg' : 'border-line text-fg-muted hover:border-line-strong'}`}>{x}</button>)}
        {step === 2 && DAILY_MINUTES.map((x) => <button type="button" key={x} aria-pressed={minutes === x} onClick={() => setMinutes(x)} className={`rounded-lg border p-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${minutes === x ? 'border-accent bg-accent/10 text-fg' : 'border-line text-fg-muted hover:border-line-strong'}`}>{x} minutes</button>)}
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-err">{error}</p>}
      <div className="mt-5 flex gap-2">{step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>}<Button onClick={() => step < 2 ? setStep(step + 1) : finish()}>{step < 2 ? 'Continue' : 'See my path'}</Button></div>
    </section>
  )
}
