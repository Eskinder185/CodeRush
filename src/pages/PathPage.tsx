import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Target } from 'lucide-react'
import { ButtonLink, PageHeader, ProgressBar, DifficultyBadge } from '../components/ui'
import { PathIcon } from '../components/graphics/Graphics'
import { JourneyMap } from '../components/learning/Learning'
import { usePageMeta } from '../app/context'
import { getPath } from '../content/paths'
import { useAppData } from '../lib/storage/store'
import { moduleMastery, pathProgress } from '../lib/mastery'
import NotFound from './NotFound'

export default function PathPage() {
  const { pathId = '' } = useParams()
  const path = getPath(pathId)
  const data = useAppData()
  usePageMeta(path?.title ?? 'Path not found', path?.description)
  if (!path) return <NotFound />
  const ms = path.modules.map((m) => moduleMastery(m, data))
  const prog = pathProgress(path, data)
  const next = prog.nextModuleId ?? path.modules[0]!.id

  return (
    <div className="page">
      <Link to="/learn" className="mb-6 inline-flex items-center gap-1 text-sm text-fg-subtle hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All paths
      </Link>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <PageHeader
            eyebrow="Learning path"
            title={
              <span className="flex items-center gap-4">
                <PathIcon icon={path.icon} accent={path.accent} size="lg" /> {path.title}
              </span>
            }
            lead={path.description}
          />
          <h2 className="mb-4 text-h3">Learning map</h2>
          <JourneyMap path={path} statuses={ms.map((m) => m.status)} scores={ms.map((m) => m.score)} />
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel panel-pad">
            <div className="flex items-center justify-between text-sm">
              <span className="text-fg-subtle">Progress</span>
              <span className="font-semibold">{prog.percent}%</span>
            </div>
            <div className="mt-2">
              <ProgressBar value={prog.percent} label="Path progress" tone="ok" />
            </div>
            <p className="mt-2 text-xs text-fg-subtle">
              {prog.completed} of {prog.total} modules complete
            </p>
            <ButtonLink to={`/learn/${path.id}/${next}`} className="mt-4 w-full">
              {prog.completed + prog.inProgress > 0 ? 'Continue' : 'Start'} <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="panel panel-pad text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge level={path.difficulty} />
              <span className="text-fg-subtle">About {path.estimatedHours} hours</span>
            </div>
            <h3 className="mt-4 font-semibold">You will be able to</h3>
            <ul className="mt-2 space-y-2 text-fg-muted">
              {path.objectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden /> {o}
                </li>
              ))}
            </ul>
            <h3 className="mt-4 font-semibold">Recommended first</h3>
            <ul className="mt-1 list-disc pl-5 text-fg-muted">
              {path.prerequisites.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <h3 className="mt-4 flex items-center gap-1.5 font-semibold">
              <Target className="h-4 w-4 text-accent" aria-hidden /> Completion
            </h3>
            <p className="mt-1 text-fg-muted">{path.completion}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
