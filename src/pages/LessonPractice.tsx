import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { DifficultyBadge, Tag } from '../components/ui'
import { PracticeRunner, sessionFields } from '../components/typing/PracticeRunner'
import { usePageMeta, useTrackVisit, useAppUI } from '../app/context'
import { getLanguageTrack, getLesson } from '../content/code'
import { getData, recordSession } from '../lib/storage/store'
import NotFound from './NotFound'

export default function LessonPractice() {
  const { language = '', lessonId = '' } = useParams()
  const lesson = getLesson(language, lessonId)
  const track = getLanguageTrack(language)
  const nav = useNavigate()
  const { focusMode } = useAppUI()
  usePageMeta(lesson ? `${lesson.title} (${track?.languageName})` : 'Lesson not found', lesson?.description)
  useTrackVisit(`/languages/${language}/lesson/${lessonId}`, lesson ? `${track?.languageName}: ${lesson.title}` : undefined)
  if (!lesson || !track) return <NotFound />
  const idx = track.lessons.findIndex((l) => l.id === lessonId)
  const next = track.lessons[idx + 1]

  return (
    <div className="page">
      {!focusMode && (
        <>
          <Link to={`/languages/${language}/lessons`} className="mb-6 inline-flex items-center gap-1 text-sm text-fg-subtle hover:text-fg">
            <ArrowLeft className="h-4 w-4" aria-hidden /> {track.languageName} lessons
          </Link>
          <header className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="accent">{track.languageName}</Tag>
              <DifficultyBadge level={lesson.difficulty} />
              <span className="text-xs text-fg-subtle">
                Lesson {idx + 1} of {track.lessons.length}
              </span>
            </div>
            <h1 className="mt-3 text-h1">{lesson.title}</h1>
            <p className="lead mt-2">{lesson.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lesson.concepts.map((c) => (
                <span key={c} className="rounded border border-line bg-sunken px-2 py-0.5 text-xs text-fg-muted">
                  {c}
                </span>
              ))}
            </div>
          </header>
        </>
      )}
      <PracticeRunner
        key={lesson.id}
        target={lesson.code}
        label={`${track.languageName} lesson: ${lesson.title}`}
        languageLabel={`${lesson.id}.${language === 'html-css' ? 'html' : language === 'cpp' ? 'cpp' : language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'bash' ? 'sh' : language === 'sql' ? 'sql' : language === 'go' ? 'go' : 'java'}`}
        onComplete={(r) => {
          if (r.metrics.keystrokes === 0) return null
          const prior = getData().sessions.filter((s) => s.kind === 'lesson' && s.trackId === language && s.itemId === lesson.id)
          recordSession({ kind: 'lesson', trackId: language, itemId: lesson.id, title: lesson.title, passed: r.metrics.perfect, ...sessionFields(r) })
          if (prior.length === 0) return 'First attempt at this lesson.'
          const best = Math.max(...prior.map((s) => s.wpm))
          return r.metrics.wpm > best ? `New best for this lesson: ${r.metrics.wpm} WPM, up from ${best}.` : `Your best for this lesson is ${best} WPM.`
        }}
        onNext={next ? () => nav(`/languages/${language}/lesson/${next.id}`) : undefined}
        nextLabel={next ? `Next: ${next.title}` : undefined}
        resultTitle={(r) => (r.metrics.perfect ? 'Lesson passed' : undefined)}
        resultSub={(r) => (r.metrics.perfect ? 'Exact match. This lesson now counts as completed.' : `Not passed yet: ${r.metrics.uncorrected} character${r.metrics.uncorrected === 1 ? '' : 's'} did not match. A lesson passes only on an exact match.`)}
      />
    </div>
  )
}
