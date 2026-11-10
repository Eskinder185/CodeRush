import { ArrowRight } from 'lucide-react'
import { ButtonLink, PageHeader } from '../components/ui'
import { usePageMeta } from '../app/context'
import { todayPlan } from '../lib/review'
import { useAppData } from '../lib/storage/store'
import { readPreferences } from '../lib/onboarding'

export default function Today() {
  usePageMeta('Today', 'A daily learning plan from your local CodeRush progress and goals.')
  const data = useAppData()
  const preferences = readPreferences()
  const plan = todayPlan(data, new Date(), preferences)
  return <div className="page"><PageHeader eyebrow="Today" title={`Your learning plan${preferences ? ` · ${preferences.dailyMinutes} minutes` : ''}`} lead="Suggestions use only your saved goals and activity in this browser. Pick any activity; the plan is flexible." /><ol className="space-y-3">{plan.map((item, index) => <li key={item.id} className="panel panel-pad flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">{index + 1} · About {item.minutes} minutes</p><h2 className="mt-1 text-h3">{item.title}</h2><p className="mt-1 max-w-2xl text-sm text-fg-muted">{item.reason}</p></div><ButtonLink to={item.to} size="sm">Start <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink></li>)}</ol></div>
}
