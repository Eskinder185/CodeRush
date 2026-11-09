import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Circle, Clock, Zap } from 'lucide-react'
import { ButtonLink, DifficultyBadge, PageHeader, ProgressBar, Segmented, EmptyState } from '../components/ui'
import { usePageMeta } from '../app/context'
import { getLanguageTrack } from '../content/code'
import type { Difficulty } from '../content/types'
import { useAppData } from '../lib/storage/store'
import { languageProgress, passedLessonIds } from '../lib/progress'
import NotFound from './NotFound'

export default function LanguageLessons() {
  const { language = '' } = useParams()
  const track = getLanguageTrack(language)
  const data = useAppData()
  const [level, setLevel] = useState<Difficulty | 'all'>('all')
  usePageMeta(track ? `${track.languageName} lessons` : 'Language not found', track?.description)
  if (!track) return <NotFound />
  const prog = languageProgress(data, language)
  const passed = passedLessonIds(data, language)
  const lessons = track.lessons.filter((l) => level === 'all' || l.difficulty === level)
  const best = new Map<string, number>()
  for (const s of data.sessions) if (s.kind === 'lesson' && s.trackId === language) best.set(s.itemId, Math.max(best.get(s.itemId) ?? 0, s.wpm))

  return (
    <div className="page">
      <Link to="/languages" className="mb-6 inline-flex items-center gap-1 text-sm text-fg-subtle hover:text-fg">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All languages
      </Link>
      <PageHeader
        eyebrow="Programming syntax"
        title={`${track.languageName} lessons`}
        lead={track.description}
        actions={
          <ButtonLink to={`/practice?mode=speed&language=${language}`} variant="secondary">
            <Zap className="h-4 w-4" aria-hidden /> Free practice in {track.languageName}
          </ButtonLink>
        }
      >
        <div className="mt-5 max-w-md">
          <div className="mb-1 flex justify-between text-xs text-fg-subtle">
            <span>
              {prog.passed} of {prog.total} lessons passed with an exact match
            </span>
            <span>{prog.percent}%</span>
          </div>
          <ProgressBar value={prog.percent} label={`${track.languageName} progress`} tone="ok" />
        </div>
      </PageHeader>
      <div className="mb-5">
        <Segmented
          label="Difficulty filter"
          value={level}
          onChange={setLevel}
          options={[
            { value: 'all', label: 'All' },
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
          ]}
        />
      </div>
      {lessons.length === 0 ? (
        <EmptyState title="No lessons at this level">Try another difficulty.</EmptyState>
      ) : (
        <ol className="grid gap-3">
          {lessons.map((l) => {
            const ok = passed.has(l.id)
            return (
              <li key={l.id}>
                <Link to={`/languages/${language}/lesson/${l.id}`} className="panel flex flex-col gap-3 p-5 interactive sm:flex-row sm:items-center">
                  {ok ? <CheckCircle2 className="h-6 w-6 shrink-0 text-ok" aria-label="Passed" /> : <Circle className="h-6 w-6 shrink-0 text-fg-subtle" aria-label="Not passed yet" />}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{l.title}</h2>
                      <DifficultyBadge level={l.difficulty} />
                    </div>
                    <p className="mt-0.5 text-sm text-fg-subtle">{l.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {l.concepts.slice(0, 5).map((c) => (
                        <span key={c} className="rounded border border-line bg-sunken px-1.5 py-0.5 text-2xs text-fg-muted">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-xs text-fg-subtle">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> {l.expectedTime} min
                    </span>
                    {best.has(l.id) && <span>Best {best.get(l.id)} WPM</span>}
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
