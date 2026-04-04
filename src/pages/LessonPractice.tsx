import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Target,
  Zap,
  CheckCircle,
  Play,
  Pause,
  Keyboard,
  AlertCircle,
  BarChart3,
  RotateCcw,
  List,
  Hash,
  AlertTriangle,
} from 'lucide-react'
import { getLesson } from '../data/lessons'
import { saveStats } from '../utils/stats'
import TypingPracticeSurface, { type TypingPracticeSurfaceHandle } from '../components/TypingPracticeSurface'
import { useTypingSession } from '../hooks/useTypingSession'
import { computeTypingMetrics, hasReachedTypingEnd } from '../utils/typingMetrics'

function languageDisplayName(lang: string): string {
  const map: Record<string, string> = {
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    java: 'Java',
    cpp: 'C++',
    html: 'HTML',
    css: 'CSS',
    sql: 'SQL',
    bash: 'Bash',
    go: 'Go',
    text: 'Plain text',
  }
  return map[lang] ?? lang.charAt(0).toUpperCase() + lang.slice(1)
}

/** Snapshot at finish so the summary stays stable and matches saved stats. */
interface ExerciseSummary {
  wpm: number
  cpm: number
  accuracy: number
  mistakes: number
  correct: number
  totalTyped: number
  targetLength: number
  timeSeconds: number
  /** Exact match with the lesson code (no wrong characters in the final string). */
  perfectMatch: boolean
}

const LessonPractice = () => {
  const { language, lessonId } = useParams<{ language: string; lessonId: string }>()
  const [userInput, setUserInput] = useState('')
  const [sessionStarted, setSessionStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [exerciseSummary, setExerciseSummary] = useState<ExerciseSummary | null>(null)
  const [editorKey, setEditorKey] = useState(0)
  const surfaceRef = useRef<TypingPracticeSurfaceHandle>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const attemptFinalizedRef = useRef(false)

  const lesson = getLesson(language || '', lessonId || '')

  const hasInput = userInput.length > 0
  const { getActiveElapsedMs, reset: resetSession, tick } = useTypingSession(
    hasInput,
    isPaused || isCompleted
  )

  const prevRouteRef = useRef({ language, lessonId })
  useEffect(() => {
    const prev = prevRouteRef.current
    if (prev.language === language && prev.lessonId === lessonId) return
    prevRouteRef.current = { language, lessonId }
    resetSession()
    setUserInput('')
    setSessionStarted(false)
    setIsPaused(false)
    setIsCompleted(false)
    setExerciseSummary(null)
    attemptFinalizedRef.current = false
    setEditorKey((k) => k + 1)
  }, [language, lessonId, resetSession])

  const metrics = useMemo(
    () => computeTypingMetrics(lesson?.code ?? '', userInput, getActiveElapsedMs()),
    [lesson?.code, userInput, tick, getActiveElapsedMs]
  )

  const editorRemountKey = `${language}-${lessonId}-${editorKey}`

  const handleTypingChange = useCallback(
    (input: string) => {
      setUserInput(input)
      if (!lesson || attemptFinalizedRef.current) return
      if (!hasReachedTypingEnd(lesson.code, input)) return

      attemptFinalizedRef.current = true
      const ms = getActiveElapsedMs()
      const m = computeTypingMetrics(lesson.code, input, ms)
      const perfectMatch = input === lesson.code

      setExerciseSummary({
        wpm: m.wpm,
        cpm: m.cpm,
        accuracy: m.accuracy,
        mistakes: m.mistakes,
        correct: m.correct,
        totalTyped: m.totalTyped,
        targetLength: lesson.code.length,
        timeSeconds: Math.round(ms / 1000),
        perfectMatch,
      })
      setIsCompleted(true)
      saveStats({
        language: language || '',
        lessonId: lessonId || '',
        wpm: m.wpm,
        accuracy: m.accuracy,
        mistakes: m.mistakes,
        timeSpent: Math.round(ms / 1000),
        completedAt: new Date(),
        symbolsMissed: [],
        cpm: m.cpm,
        totalChars: m.totalTyped,
        correctChars: m.correct,
      })
    },
    [getActiveElapsedMs, lesson, language, lessonId]
  )

  const resetPractice = useCallback(() => {
    resetSession()
    setUserInput('')
    setEditorKey((k) => k + 1)
    setSessionStarted(false)
    setIsPaused(false)
    setIsCompleted(false)
    setExerciseSummary(null)
    attemptFinalizedRef.current = false
  }, [resetSession])

  const startPractice = useCallback(() => {
    setSessionStarted(true)
    setIsPaused(false)
  }, [])

  const prevSessionStarted = useRef(false)
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined
    if (sessionStarted && !prevSessionStarted.current) {
      t = setTimeout(() => surfaceRef.current?.focusInput(), 0)
    }
    prevSessionStarted.current = sessionStarted
    return () => {
      if (t !== undefined) clearTimeout(t)
    }
  }, [sessionStarted])

  const togglePause = () => {
    setIsPaused((p) => !p)
  }

  const typingLocked = !sessionStarted || isPaused || isCompleted

  useEffect(() => {
    if (!isCompleted) return
    const id = window.setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
    return () => clearTimeout(id)
  }, [isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const displaySeconds = Math.floor(getActiveElapsedMs() / 1000)

  const getProgressPercentage = () => {
    if (!lesson) return 0
    return Math.round((userInput.length / lesson.code.length) * 100)
  }

  if (!lesson) {
    return (
      <div className="page-shell flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
          <p className="text-ink-subtle mb-6">The lesson you're looking for doesn't exist.</p>
          <Link to="/languages" className="btn-primary">
            Back to Languages
          </Link>
        </div>
      </div>
    )
  }

  const statItems = [
    { icon: Clock, label: 'Time', value: formatTime(displaySeconds), accent: 'text-neon-blue' },
    { icon: Zap, label: 'WPM', value: String(metrics.wpm), accent: 'text-neon-blue' },
    { icon: Keyboard, label: 'CPM', value: String(metrics.cpm), accent: 'text-cyan-400' },
    { icon: Target, label: 'Accuracy', value: `${metrics.accuracy}%`, accent: 'text-neon-purple' },
    { icon: AlertCircle, label: 'Errors', value: String(metrics.mistakes), accent: 'text-red-400/90' },
  ] as const

  return (
    <motion.div
      className="page-shell"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-inner">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 min-w-0">
            <Link to={`/languages/${language}/lessons`} className="btn-secondary inline-flex w-fit items-center shrink-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lessons
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                <span className="text-gradient">{lesson.title}</span>
              </h1>
              <p className="text-sm text-ink-subtle sm:text-base line-clamp-2">{lesson.description}</p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {!isCompleted && (
              <>
                {!sessionStarted ? (
                  <button type="button" onClick={startPractice} className="btn-primary inline-flex items-center">
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </button>
                ) : (
                  <button type="button" onClick={togglePause} className="btn-secondary inline-flex items-center">
                    {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                )}
              </>
            )}
            <button type="button" onClick={resetPractice} className="btn-secondary inline-flex items-center">
              Reset
            </button>
          </div>
        </div>

        <div className="mb-4 sm:mb-5">
          <div className="mb-1.5 flex justify-between text-xs text-ink-subtle sm:text-sm">
            <span>Progress</span>
            <span>{getProgressPercentage()}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-dark-border sm:h-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>

        <div className="mb-4 rounded-lg border border-dark-border bg-dark-card/40 px-2 py-2 sm:px-3 sm:py-2.5">
          <div className="flex flex-wrap gap-2 sm:gap-1 sm:justify-between">
            {statItems.map(({ icon: Icon, label, value, accent }) => (
              <div
                key={label}
                className="flex min-w-[4.5rem] flex-1 items-center gap-2 rounded-md bg-dark-bg/60 px-2 py-1.5 sm:min-w-0 sm:flex-1 sm:flex-col sm:items-center sm:justify-center sm:gap-0.5 sm:px-1 sm:py-2"
              >
                <Icon className={`h-4 w-4 shrink-0 sm:mb-0.5 sm:h-5 sm:w-5 ${accent}`} aria-hidden />
                <div className="flex min-w-0 flex-1 flex-col sm:items-center">
                  <span className="truncate text-lg font-bold tabular-nums text-white leading-none sm:text-xl">
                    {value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-ink-subtle sm:text-xs">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-white sm:text-xl">Practice</h2>
                {!sessionStarted && !isCompleted && (
                  <p className="mt-0.5 text-xs text-ink-subtle">Press Start, then type in the panel below.</p>
                )}
                {sessionStarted && isPaused && !isCompleted && (
                  <p className="mt-0.5 text-xs text-amber-400/90">Paused — press Resume to continue.</p>
                )}
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  lesson.difficulty === 'beginner'
                    ? 'bg-green-600/20 text-green-400'
                    : lesson.difficulty === 'intermediate'
                      ? 'bg-yellow-600/20 text-yellow-400'
                      : 'bg-red-600/20 text-red-400'
                }`}
              >
                {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
              </span>
            </div>

            <TypingPracticeSurface
              ref={surfaceRef}
              key={editorRemountKey}
              targetCode={lesson.code}
              languageLabel={languageDisplayName(language || 'text')}
              value={userInput}
              onValueChange={handleTypingChange}
              disabled={typingLocked}
              showLineNumbers
            />
          </motion.div>

          {isCompleted && exerciseSummary && (
            <motion.div
              ref={summaryRef}
              id="exercise-summary"
              role="status"
              aria-live="polite"
              className={
                exerciseSummary.perfectMatch
                  ? 'overflow-hidden rounded-xl border border-green-500/35 bg-gradient-to-b from-green-600/15 via-dark-card/95 to-dark-card ring-1 ring-green-500/20'
                  : 'overflow-hidden rounded-xl border border-amber-500/35 bg-gradient-to-b from-amber-600/12 via-dark-card/95 to-dark-card ring-1 ring-amber-500/20'
              }
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div
                className={
                  exerciseSummary.perfectMatch
                    ? 'border-b border-green-500/20 bg-green-500/10 px-4 py-5 text-center sm:px-6 sm:py-6'
                    : 'border-b border-amber-500/20 bg-amber-500/10 px-4 py-5 text-center sm:px-6 sm:py-6'
                }
              >
                <div
                  className={
                    exerciseSummary.perfectMatch
                      ? 'mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 sm:h-16 sm:w-16'
                      : 'mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20 sm:h-16 sm:w-16'
                  }
                >
                  {exerciseSummary.perfectMatch ? (
                    <CheckCircle className="h-9 w-9 text-green-400 sm:h-10 sm:w-10" aria-hidden />
                  ) : (
                    <AlertTriangle className="h-9 w-9 text-amber-400 sm:h-10 sm:w-10" aria-hidden />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  {exerciseSummary.perfectMatch ? 'Exercise complete' : 'Exercise finished'}
                </h3>
                <p className="mt-1 text-sm text-ink-subtle sm:text-base">
                  {exerciseSummary.perfectMatch ? (
                    <>
                      Nice work on <span className="font-medium text-ink">{lesson.title}</span>
                    </>
                  ) : (
                    <>
                      You reached the end of <span className="font-medium text-ink">{lesson.title}</span> with
                      some mismatches — here’s your summary.
                    </>
                  )}
                </p>
                <p className="mt-2 text-xs text-ink-subtle">Here’s how you did:</p>
              </div>

              <div className="grid gap-2 p-3 sm:grid-cols-2 sm:gap-3 sm:p-4 lg:grid-cols-3">
                <div className="rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center">
                  <Zap className="mx-auto mb-1 h-5 w-5 text-neon-blue" aria-hidden />
                  <div className="text-2xl font-bold tabular-nums text-white">{exerciseSummary.wpm}</div>
                  <div className="text-xs uppercase tracking-wide text-ink-subtle">Words per minute</div>
                </div>
                <div className="rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center">
                  <Keyboard className="mx-auto mb-1 h-5 w-5 text-cyan-400" aria-hidden />
                  <div className="text-2xl font-bold tabular-nums text-white">{exerciseSummary.cpm}</div>
                  <div className="text-xs uppercase tracking-wide text-ink-subtle">Chars per minute</div>
                </div>
                <div className="rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center sm:col-span-2 lg:col-span-1">
                  <Target className="mx-auto mb-1 h-5 w-5 text-neon-purple" aria-hidden />
                  <div className="text-2xl font-bold tabular-nums text-white">{exerciseSummary.accuracy}%</div>
                  <div className="text-xs uppercase tracking-wide text-ink-subtle">Accuracy</div>
                </div>
                <div className="rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center">
                  <Clock className="mx-auto mb-1 h-5 w-5 text-neon-blue" aria-hidden />
                  <div className="text-2xl font-bold tabular-nums text-white">
                    {formatTime(exerciseSummary.timeSeconds)}
                  </div>
                  <div className="text-xs uppercase tracking-wide text-ink-subtle">Time</div>
                </div>
                <div className="rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center">
                  <AlertCircle className="mx-auto mb-1 h-5 w-5 text-red-400/90" aria-hidden />
                  <div className="text-2xl font-bold tabular-nums text-white">{exerciseSummary.mistakes}</div>
                  <div className="text-xs uppercase tracking-wide text-ink-subtle">Incorrect keystrokes</div>
                </div>
                <div className="rounded-lg border border-dark-border bg-dark-bg/70 px-3 py-3 text-center sm:col-span-2 lg:col-span-1">
                  <Hash className="mx-auto mb-1 h-5 w-5 text-emerald-400/90" aria-hidden />
                  <div className="text-2xl font-bold tabular-nums text-white">
                    {exerciseSummary.correct}
                    <span className="text-lg font-semibold text-ink-subtle"> / {exerciseSummary.targetLength}</span>
                  </div>
                  <div className="text-xs uppercase tracking-wide text-ink-subtle">Correct characters</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-dark-border bg-dark-bg/40 px-3 py-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 sm:px-4 sm:py-4">
                <button type="button" onClick={resetPractice} className="btn-primary inline-flex items-center justify-center gap-2">
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Try again
                </button>
                <Link
                  to={`/languages/${language}/lessons`}
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <List className="h-4 w-4" aria-hidden />
                  More lessons
                </Link>
                <Link to="/stats" className="btn-secondary inline-flex items-center justify-center gap-2">
                  <BarChart3 className="h-4 w-4" aria-hidden />
                  View stats
                </Link>
              </div>
            </motion.div>
          )}

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">Concepts in this lesson</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.concepts.map((concept, idx) => (
                <span key={idx} className="rounded-full bg-neon-blue/20 px-2.5 py-0.5 text-xs text-neon-blue sm:text-sm">
                  {concept}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default LessonPractice
