import { useState } from 'react'
import {
  Server,
  Terminal,
  GitBranch,
  Rocket,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Code2,
  Play,
  RotateCcw,
} from 'lucide-react'
import { Button, ButtonLink, PageHeader, DifficultyBadge, Tag } from '../components/ui'
import { usePageMeta } from '../app/context'
import {
  CAREER_TRACKS,
  type CareerDomainId,
  type CareerSkillExercise,
  type PracticeModeKind,
} from '../content/career'

const DOMAIN_ICONS = {
  backend: Server,
  systems: Terminal,
  vcs: GitBranch,
  devops: Rocket,
  cloud: Cloud,
  security: ShieldCheck,
}

const MODE_LABELS: Record<PracticeModeKind, string> = {
  type: 'Mode A: Guided Typing',
  recall: 'Mode B: Recall from Memory',
  fill: 'Mode C: Fill in Missing Code',
  debug: 'Mode D: Debug the Broken Example',
  troubleshoot: 'Mode E: Troubleshooting Simulation',
  capstone: 'Mode F: Project Capstone',
}

function ExerciseRunner({
  exercise,
  onComplete,
}: {
  exercise: CareerSkillExercise
  onComplete: () => void
}) {
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)

  const isCorrect = () => {
    const trimmed = input.trim()
    if (!trimmed) return false
    if (exercise.verificationPattern) {
      if (typeof exercise.verificationPattern === 'string') {
        return trimmed.toLowerCase() === exercise.verificationPattern.toLowerCase()
      }
      return exercise.verificationPattern.test(trimmed)
    }
    return trimmed.toLowerCase() === exercise.solution.trim().toLowerCase()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (isCorrect()) {
      onComplete()
    }
  }

  const handleReset = () => {
    setInput('')
    setSubmitted(false)
    setShowHint(false)
    setHintIndex(0)
  }

  const correct = submitted && isCorrect()
  const wrong = submitted && !isCorrect()

  return (
    <div className="panel panel-pad space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {MODE_LABELS[exercise.mode]}
            </span>
            <span className="text-xs text-fg-subtle">·</span>
            <span className="text-xs text-fg-muted">{exercise.targetRole}</span>
          </div>
          <h3 className="text-h3 mt-1">{exercise.title}</h3>
        </div>
        <DifficultyBadge level={exercise.difficulty} />
      </div>

      <p className="text-sm text-fg-muted">{exercise.summary}</p>

      <div className="rounded-md border border-line bg-sunken p-3 overflow-hidden">
        <p className="text-xs font-medium text-fg-subtle mb-1">Task Context & Code:</p>
        <pre className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre text-fg max-w-full">
          {exercise.codeSnippet}
        </pre>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor={`input-${exercise.id}`} className="block text-xs font-medium text-fg-muted mb-1">
            {exercise.instructions}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id={`input-${exercise.id}`}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setSubmitted(false)
              }}
              placeholder="Type your solution here..."
              className="min-w-0 flex-1 rounded-md border border-line bg-surface px-3 py-2 font-mono text-sm focus:border-accent focus:outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <div className="flex items-center gap-2 shrink-0">
              <Button type="submit" size="sm">
                <Play className="h-4 w-4" aria-hidden /> Submit
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" aria-hidden /> Reset
              </Button>
            </div>
          </div>
        </div>

        {wrong && (
          <div className="flex items-start gap-2 rounded-md bg-warn/10 p-3 text-sm text-warn">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="font-semibold">Not quite right.</p>
              <p className="mt-0.5 text-xs">Review the instructions and hint, or inspect the syntax pattern.</p>
            </div>
          </div>
        )}

        {correct && (
          <div className="flex items-start gap-2 rounded-md bg-ok/10 p-3 text-sm text-ok">
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="font-semibold">Verification passed!</p>
              <p className="mt-0.5 text-xs">{exercise.explanation}</p>
            </div>
          </div>
        )}

        {exercise.hints && exercise.hints.length > 0 && (
          <div className="pt-1">
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
              >
                <HelpCircle className="h-3.5 w-3.5" aria-hidden /> Show hint
              </button>
            ) : (
              <div className="rounded-md border border-line bg-surface p-2.5 text-xs text-fg-subtle">
                <span className="font-semibold text-fg">Hint:</span> {exercise.hints[hintIndex]}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}

export default function CareerSkillsLab() {
  usePageMeta(
    'Career Skills Lab',
    'Professional technical training organized by job roles and engineering domains: Java Backend, Linux Systems, Git, DevOps, Cloud, and Security.'
  )

  const [activeDomain, setActiveDomain] = useState<CareerDomainId>('backend')
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  const track = CAREER_TRACKS.find((t) => t.id === activeDomain)!
  const Icon = DOMAIN_ICONS[activeDomain]

  const handleExerciseComplete = (id: string) => {
    setCompletedIds((prev) => new Set(prev).add(id))
  }

  return (
    <div className="page space-y-6 max-w-full overflow-hidden">
      <PageHeader
        eyebrow="Career Skills Lab"
        title="Professional Technical Engineering Practice"
        lead="Practice real job-ready capabilities organized by role and engineering competency. Complete exercises across 6 practice modes: Guided Typing, Recall from Memory, Fill in the Blanks, Debugging, Troubleshooting, and Capstones."
      />

      {/* Domain Navigation Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {CAREER_TRACKS.map((t) => {
          const TabIcon = DOMAIN_ICONS[t.id]
          const isActive = t.id === activeDomain
          return (
            <button
              key={t.id}
              onClick={() => setActiveDomain(t.id)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-2 text-center transition-all ${
                isActive
                  ? 'border-accent bg-accent/10 shadow-sm text-fg font-medium'
                  : 'border-line bg-surface text-fg-muted hover:border-line-strong hover:text-fg'
              }`}
            >
              <TabIcon className={`h-4 w-4 shrink-0 ${isActive ? 'text-accent' : 'text-fg-subtle'}`} />
              <span className="text-2xs font-medium leading-tight truncate w-full">{t.title.split('&')[0]?.trim()}</span>
            </button>
          )
        })}
      </div>

      {/* Active Domain Header */}
      <section className="panel panel-pad">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Icon className="h-6 w-6 text-accent" />
              <h2 className="text-h2">{track.title}</h2>
            </div>
            <p className="text-sm font-medium text-accent">{track.tagline}</p>
            <p className="mt-2 text-sm text-fg-muted max-w-3xl">{track.description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {track.roles.map((r) => (
              <Tag key={r} tone="accent">
                {r}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-h3">
            Interactive Skill Drills ({track.exercises.length})
          </h3>
          <span className="text-xs text-fg-subtle">
            Completed in this session: {track.exercises.filter((e) => completedIds.has(e.id)).length} / {track.exercises.length}
          </span>
        </div>

        <div className="grid gap-5">
          {track.exercises.map((exercise) => (
            <ExerciseRunner
              key={exercise.id}
              exercise={exercise}
              onComplete={() => handleExerciseComplete(exercise.id)}
            />
          ))}
        </div>
      </section>

      {/* Next Step Links */}
      <div className="panel panel-pad flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-fg">Ready for full learning paths?</h4>
          <p className="text-xs text-fg-muted">
            Explore complete 127-module structured curriculums with guided typing and interactive simulated terminals.
          </p>
        </div>
        <div className="flex gap-2">
          <ButtonLink to="/journeys" variant="secondary" size="sm">
            Career Journeys <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </ButtonLink>
          <ButtonLink to="/learn" size="sm">
            Learning Paths <Code2 className="h-3.5 w-3.5 ml-1" />
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
