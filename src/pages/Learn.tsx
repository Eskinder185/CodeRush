import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { PageHeader, ProgressBar, DifficultyBadge } from '../components/ui'
import { PathIcon } from '../components/graphics/Graphics'
import { usePageMeta } from '../app/context'
import { learningPaths } from '../content/paths'
import { useAppData } from '../lib/storage/store'
import { pathProgress } from '../lib/mastery'

export default function Learn() {
  usePageMeta('Learning paths', 'Structured learning paths for programming syntax, Linux, PowerShell, networking, Cisco IOS, and defensive cybersecurity.')
  const data = useAppData()
  return (
    <div className="page">
      <PageHeader
        eyebrow="Learn"
        title="Learning paths"
        lead="Each path runs from beginner to advanced. Modules explain a concept, then you type, recall, and apply it. Every module is open, so experienced learners can jump ahead."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {learningPaths.map((p) => {
          const prog = pathProgress(p, data)
          const commands = new Set(p.modules.flatMap((m) => m.commandIds)).size
          const lessons = p.modules.reduce((n, m) => n + (m.lessonRefs?.length ?? 0), 0)
          const quizzes = p.modules.reduce((n, m) => n + m.quiz.length, 0)
          return (
            <Link key={p.id} to={`/learn/${p.id}`} className="panel group flex flex-col p-6 interactive">
              <div className="flex items-start gap-4">
                <PathIcon icon={p.icon} accent={p.accent} size="lg" />
                <div className="min-w-0">
                  <h2 className="text-h3">{p.title}</h2>
                  <p className="mt-0.5 text-sm text-fg-muted">{p.tagline}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
                    <DifficultyBadge level={p.difficulty} />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> about {p.estimatedHours} h
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-fg-subtle">{p.description}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  ['Modules', p.modules.length],
                  [lessons ? 'Lessons' : 'Commands', lessons || commands],
                  ['Quiz questions', quizzes],
                ].map(([k, v]) => (
                  <div key={k as string} className="rounded-md border border-line bg-sunken py-2">
                    <dd className="text-lg font-semibold">{v}</dd>
                    <dt className="text-2xs text-fg-subtle">{k}</dt>
                  </div>
                ))}
              </dl>
              <div className="mt-5">
                <div className="mb-1 flex justify-between text-xs text-fg-subtle">
                  <span>
                    {prog.completed} of {prog.total} modules complete
                  </span>
                  <span>{prog.percent}%</span>
                </div>
                <ProgressBar value={prog.percent} label={`${p.title} progress`} />
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                {prog.completed + prog.inProgress > 0 ? 'Continue' : 'Start'} path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
