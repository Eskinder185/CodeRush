import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { ButtonLink, PageHeader, ProgressBar } from '../components/ui'
import { usePageMeta } from '../app/context'
import { getJourney, journeyPaths, journeys } from '../lib/journeys'
import { pathProgress } from '../lib/mastery'
import { useAppData } from '../lib/storage/store'
import NotFound from './NotFound'

export default function Journeys() {
  const { id } = useParams()
  const journey = id ? getJourney(id) : undefined
  const data = useAppData()
  usePageMeta(journey?.title ?? 'Career journeys', journey?.summary ?? 'Explore career learning journeys built from CodeRush lessons and labs.')
  if (id && !journey) return <NotFound />
  if (!journey) return <div className="page"><PageHeader eyebrow="Explore" title="Career journeys" lead="Choose a practical route through the existing lessons, commands, and scenarios. You can open any stage at any time." /><div className="grid gap-4 md:grid-cols-2">{journeys.map((j) => { const stages = journeyPaths(j); const total = stages.reduce((n, s) => n + pathProgress(s.path, data).total, 0); const done = stages.reduce((n, s) => n + pathProgress(s.path, data).completed, 0); return <Link key={j.id} to={`/journeys/${j.id}`} className="panel panel-pad interactive group"><h2 className="text-h3">{j.title}</h2><p className="mt-2 text-sm text-fg-muted">{j.summary}</p><p className="mt-3 text-xs text-fg-subtle">{stages.length} stages · {done} of {total} modules complete</p><div className="mt-2"><ProgressBar value={total ? done / total * 100 : 0} label={`${j.title} progress`} /></div><span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">Explore journey <ArrowRight className="h-4 w-4" aria-hidden /></span></Link> })}</div></div>
  const stages = journeyPaths(journey)
  const first = stages.find((s) => pathProgress(s.path, data).percent < 100) ?? stages[0]!
  return <div className="page"><Link to="/journeys" className="mb-5 inline-block text-sm text-accent hover:underline">← All journeys</Link><PageHeader eyebrow="Career journey" title={journey.title} lead={journey.summary} actions={<ButtonLink to={`/learn/${first.path.id}/${pathProgress(first.path, data).nextModuleId ?? first.path.modules[0]!.id}`}>Continue learning <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>} /><section className="panel panel-pad mb-6"><h2 className="text-h3">What you will practice</h2><ul className="mt-3 grid gap-2 sm:grid-cols-2">{journey.outcomes.map((o) => <li key={o} className="flex gap-2 text-sm text-fg-muted"><Check className="h-4 w-4 shrink-0 text-ok" aria-hidden />{o}</li>)}</ul><p className="mt-3 text-sm text-fg-subtle">Stages are open. Skipping a stage does not mark it complete.</p></section><h2 className="mb-4 text-h3">Learning stages</h2><ol className="space-y-3">{stages.map((s, i) => { const p = pathProgress(s.path, data); return <li key={s.path.id} className="panel panel-pad"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="eyebrow">Stage {i + 1} · {p.percent === 100 ? 'Completed' : p.inProgress || p.completed ? 'In progress' : 'Not started'}</p><h3 className="mt-1 text-h3">{s.path.title}</h3><p className="mt-1 text-sm text-fg-muted">{s.purpose}</p></div><ButtonLink to={`/learn/${s.path.id}`} size="sm" variant="secondary">Open stage <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink></div><p className="mt-3 text-xs text-fg-subtle">{p.completed} of {p.total} modules complete</p><div className="mt-1"><ProgressBar value={p.percent} label={`${s.path.title} progress`} /></div></li> })}</ol></div>
}
