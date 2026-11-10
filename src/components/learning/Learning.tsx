import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, Circle, CircleDot, ChevronRight, XCircle, CheckCircle2 } from 'lucide-react'
import type { LearningModule, LearningPath, QuizQuestion } from '../../content/types'
import type { ModuleStatus } from '../../lib/mastery'
import { Button, DifficultyBadge } from '../ui'

const STATUS: Record<ModuleStatus, { label: string; Icon: typeof Check; cls: string }> = {
  'not-started': { label: 'Not started', Icon: Circle, cls: 'border-line-strong bg-surface text-fg-subtle' },
  'in-progress': { label: 'In progress', Icon: CircleDot, cls: 'border-accent bg-accent/15 text-accent' },
  completed: { label: 'Completed', Icon: Check, cls: 'border-ok bg-ok/15 text-ok' },
  mastered: { label: 'Mastered', Icon: Star, cls: 'border-violet bg-violet/15 text-violet' },
}

export function StatusPill({ status }: { status: ModuleStatus }) {
  const s = STATUS[status]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-2xs font-semibold ${s.cls}`}>
      <s.Icon className="h-3 w-3" aria-hidden /> {s.label}
    </span>
  )
}

/**
 * The learning map: modules as connected nodes. The connector fills as modules complete.
 * Every module is open; recommended order is shown, never enforced.
 */
export function JourneyMap({ path, statuses, scores }: { path: LearningPath; statuses: ModuleStatus[]; scores: number[] }) {
  const levels: Record<string, string> = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
  let lastLevel = ''
  return (
    <ol className="relative">
      {path.modules.map((m, i) => {
        const st = statuses[i]!
        const S = STATUS[st]
        const done = st === 'completed' || st === 'mastered'
        const showLevel = m.level !== lastLevel
        lastLevel = m.level
        return (
          <li key={m.id} className="relative pl-14">
            {showLevel && <div className="mb-3 mt-2 text-2xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">{levels[m.level]}</div>}
            {i < path.modules.length - 1 && (
              <span className={`absolute left-[19px] top-10 h-[calc(100%-1rem)] w-0.5 rounded-full ${done ? 'bg-ok/60' : 'bg-line'}`} aria-hidden />
            )}
            <span className={`absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 ${S.cls}`} style={{ top: showLevel ? '2.25rem' : '0.25rem' }} aria-hidden>
              <S.Icon className="h-4 w-4" />
            </span>
            <Link to={`/learn/${path.id}/${m.id}`} className="panel group mb-4 flex items-center gap-4 p-4 interactive">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs tabular-nums text-fg-subtle">Module {i + 1}</span>
                  <StatusPill status={st} />
                  {m.optional && <span className="text-2xs text-fg-subtle">Optional challenge</span>}
                </div>
                <h3 className="mt-1 font-semibold text-fg">{m.title}</h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-fg-subtle">{m.outcome}</p>
              </div>
              <div className="hidden text-right sm:block">
                <div className="text-lg font-semibold tabular-nums text-fg">{scores[i]}</div>
                <div className="text-2xs text-fg-subtle">mastery</div>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        )
      })}
    </ol>
  )
}

export function ModuleCard({ m, index, pathId, status }: { m: LearningModule; index: number; pathId: string; status: ModuleStatus }) {
  return (
    <Link to={`/learn/${pathId}/${m.id}`} className="panel block p-4 interactive">
      <div className="flex items-center gap-2 text-xs text-fg-subtle">
        Module {index + 1} <DifficultyBadge level={m.level} />
      </div>
      <div className="mt-1 font-semibold">{m.title}</div>
      <div className="mt-2">
        <StatusPill status={status} />
      </div>
    </Link>
  )
}

/** One question at a time, immediate feedback with an explanation, then a score. */
export function QuizRunner({ questions, onFinish }: { questions: QuizQuestion[]; onFinish: (score: number) => void }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const q = questions[i]

  if (done || !q) {
    const pct = Math.round((correct / questions.length) * 100)
    return (
      <div className="panel panel-pad" role="status">
        <p className="text-sm text-fg-subtle">Quiz complete</p>
        <p className="mt-1 text-2xl font-semibold">
          {correct} of {questions.length} correct ({pct}%)
        </p>
        <p className="mt-1 text-sm text-fg-muted">{pct >= 80 ? 'Strong result. The quiz target for mastery is met.' : pct >= 50 ? 'Module completion is met. Reach 80% to qualify for mastery.' : 'The module needs at least 50%. Review the concept and try again.'}</p>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => {
            setI(0)
            setPicked(null)
            setCorrect(0)
            setDone(false)
          }}
        >
          Retake quiz
        </Button>
      </div>
    )
  }

  const answered = picked !== null
  return (
    <div className="panel panel-pad">
      <div className="flex items-center justify-between text-xs text-fg-subtle">
        <span>
          Question {i + 1} of {questions.length}
        </span>
        <span>{correct} correct so far</span>
      </div>
      <fieldset className="mt-3">
        <legend className="text-base font-semibold text-fg">{q.prompt}</legend>
        <div className="mt-4 grid gap-2">
          {q.choices.map((c, ci) => {
            const isRight = ci === q.answer
            const isPicked = ci === picked
            const state = !answered ? '' : isRight ? 'border-ok bg-ok/10' : isPicked ? 'border-err bg-err/10' : 'opacity-60'
            return (
              <button
                key={ci}
                type="button"
                disabled={answered}
                onClick={() => {
                  setPicked(ci)
                  if (isRight) setCorrect((n) => n + 1)
                }}
                className={`flex min-h-[48px] items-center gap-3 rounded-md border border-line px-4 py-2 text-left text-sm transition duration-fast ${answered ? '' : 'hover:border-line-strong hover:bg-elevated'} ${state}`}
              >
                {answered && isRight && <CheckCircle2 className="h-4 w-4 shrink-0 text-ok" aria-label="Correct answer" />}
                {answered && isPicked && !isRight && <XCircle className="h-4 w-4 shrink-0 text-err" aria-label="Your answer, incorrect" />}
                <span>{c}</span>
              </button>
            )
          })}
        </div>
      </fieldset>
      {answered && (
        <div className="mt-4 rounded-md border border-line bg-sunken p-3 text-sm" aria-live="polite">
          <p className={`font-semibold ${picked === q.answer ? 'text-ok' : 'text-err'}`}>{picked === q.answer ? 'Correct.' : 'Not quite.'}</p>
          <p className="mt-1 text-fg-muted">{q.explanation}</p>
          <Button
            className="mt-3"
            size="sm"
            onClick={() => {
              if (i + 1 >= questions.length) {
                const final = correct
                setDone(true)
                onFinish(final / questions.length)
              } else {
                setI(i + 1)
                setPicked(null)
              }
            }}
          >
            {i + 1 >= questions.length ? 'See score' : 'Next question'}
          </Button>
        </div>
      )}
    </div>
  )
}
