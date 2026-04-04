import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Play,
  Clock,
  Target,
  BookOpen,
  Trophy,
  TrendingUp,
  Filter,
  Library,
} from 'lucide-react'
import { getLanguageTrack, getLessonsByDifficulty } from '../data/lessons'
import { getLanguageProgress } from '../utils/stats'

const difficultyBadgeClass = (difficulty: string) => {
  if (difficulty === 'beginner') return 'badge-diff-beginner'
  if (difficulty === 'intermediate') return 'badge-diff-intermediate'
  return 'badge-diff-advanced'
}

const LanguageLessons = () => {
  const { language } = useParams<{ language: string }>()
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'beginner' | 'intermediate' | 'advanced' | 'all'
  >('all')

  const track = getLanguageTrack(language || '')
  const progress = getLanguageProgress(language || '')

  if (!track) {
    return (
      <div className="page-shell flex flex-col items-center justify-center px-4">
        <div className="empty-state-panel max-w-lg border-solid">
          <h1 className="heading-section text-ink">Language not found</h1>
          <p className="body-prose mt-3 text-ink-subtle">
            That language is not available. Return to the list and pick a supported track.
          </p>
          <Link to="/languages" className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto">
            Back to Languages
          </Link>
        </div>
      </div>
    )
  }

  const filteredLessons =
    selectedDifficulty === 'all'
      ? track.lessons
      : getLessonsByDifficulty(language || '', selectedDifficulty)

  const difficultyStats = {
    beginner: track.lessons.filter((l) => l.difficulty === 'beginner').length,
    intermediate: track.lessons.filter((l) => l.difficulty === 'intermediate').length,
    advanced: track.lessons.filter((l) => l.difficulty === 'advanced').length,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      },
    },
  }

  const filterTabs: {
    id: 'all' | 'beginner' | 'intermediate' | 'advanced'
    label: string
    count: number
    activeClass: string
  }[] = [
    {
      id: 'all',
      label: 'All',
      count: track.lessons.length,
      activeClass:
        'border-neon-blue/55 bg-neon-blue/15 text-ink ring-1 ring-neon-blue/35',
    },
    {
      id: 'beginner',
      label: 'Beginner',
      count: difficultyStats.beginner,
      activeClass:
        'border-emerald-500/50 bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-500/25',
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      count: difficultyStats.intermediate,
      activeClass:
        'border-amber-500/50 bg-amber-500/10 text-amber-50 ring-1 ring-amber-500/25',
    },
    {
      id: 'advanced',
      label: 'Advanced',
      count: difficultyStats.advanced,
      activeClass:
        'border-rose-500/50 bg-rose-500/10 text-rose-100 ring-1 ring-rose-500/25',
    },
  ]

  const inactiveTab =
    'border-dark-border bg-dark-surface/60 text-ink-muted hover:border-dark-border hover:bg-dark-card hover:text-ink'

  return (
    <motion.div
      className="page-shell"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="page-inner">
        {/* Header */}
        <motion.header className="mb-8 space-y-5 md:mb-10" variants={itemVariants}>
          <Link
            to="/languages"
            className="btn-secondary inline-flex w-fit max-w-full items-center text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4 shrink-0" aria-hidden />
            All languages
          </Link>
          <div className="max-w-3xl">
            <h1 className="heading-page text-balance text-ink">
              <span className="text-gradient">{track.languageName}</span>
              <span className="text-ink"> lessons</span>
            </h1>
            <div className="section-rule ml-0 mr-auto mt-5 w-16 md:mt-6" aria-hidden />
            <p className="body-lead mt-5 text-ink-subtle md:mt-6">
              Pick a lesson to practice typing real {track.languageName} code.{' '}
              <span className="text-ink-muted">
                New here? Start with a Beginner lesson, or use &ldquo;All&rdquo; to see everything.
              </span>
            </p>
          </div>
        </motion.header>

        {/* Progress overview */}
        <motion.div
          className="mb-8 md:mb-10"
          variants={itemVariants}
        >
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-subtle">
            <Library className="h-4 w-4 text-neon-blue" aria-hidden />
            Your progress
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <div className="stat-slab">
              <div className="stat-slab__icon">
                <BookOpen className="h-5 w-5" aria-hidden />
              </div>
              <div className="text-2xl font-bold tabular-nums text-ink">
                {progress.completedLessons}/{track.lessons.length}
              </div>
              <div className="caption mt-1 text-ink-subtle">Lessons completed</div>
            </div>
            <div className="stat-slab">
              <div className="stat-slab__icon stat-slab__icon--muted">
                <TrendingUp className="h-5 w-5" aria-hidden />
              </div>
              <div className="text-2xl font-bold tabular-nums text-ink">
                {progress.averageWpm}
              </div>
              <div className="caption mt-1 text-ink-subtle">Avg. WPM</div>
            </div>
            <div className="stat-slab">
              <div className="stat-slab__icon">
                <Target className="h-5 w-5" aria-hidden />
              </div>
              <div className="text-2xl font-bold tabular-nums text-ink">
                {progress.averageAccuracy}%
              </div>
              <div className="caption mt-1 text-ink-subtle">Avg. accuracy</div>
            </div>
            <div className="stat-slab">
              <div className="stat-slab__icon stat-slab__icon--muted">
                <Clock className="h-5 w-5" aria-hidden />
              </div>
              <div className="text-2xl font-bold tabular-nums text-ink">
                {Math.round(progress.totalTimeSpent / 60)}m
              </div>
              <div className="caption mt-1 text-ink-subtle">Time practiced</div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div className="mb-6 md:mb-8" variants={itemVariants}>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-subtle">
            <Filter className="h-4 w-4 text-neon-blue" aria-hidden />
            Filter by level
          </h2>
          <div
            className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
            role="tablist"
            aria-label="Lesson difficulty"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selectedDifficulty === tab.id}
                onClick={() => setSelectedDifficulty(tab.id)}
                className={`filter-tab focus-ring ${
                  selectedDifficulty === tab.id ? tab.activeClass : inactiveTab
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 tabular-nums opacity-80">({tab.count})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lessons list */}
        <motion.div className="space-y-4" variants={containerVariants}>
          {filteredLessons.length === 0 ? (
            <motion.div
              className="empty-state-panel max-w-lg border-solid py-12"
              variants={itemVariants}
            >
              <Filter className="mx-auto h-10 w-10 text-ink-faint" aria-hidden />
              <p className="body-prose mt-4 text-ink-muted">
                No lessons in this level yet.
              </p>
              <p className="caption mt-2 text-ink-subtle">
                Try &ldquo;All&rdquo; or another difficulty to see available lessons.
              </p>
              <button
                type="button"
                onClick={() => setSelectedDifficulty('all')}
                className="btn-secondary mt-6 w-full sm:mx-auto sm:w-auto"
              >
                Show all lessons
              </button>
            </motion.div>
          ) : (
            filteredLessons.map((lesson) => (
              <motion.article
                key={lesson.id}
                className="lesson-card"
                variants={itemVariants}
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className={difficultyBadgeClass(lesson.difficulty)}>
                        {lesson.difficulty.charAt(0).toUpperCase() +
                          lesson.difficulty.slice(1)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-ink-subtle">
                        <Clock className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                        <span className="tabular-nums">{lesson.expectedTime} min</span>
                        <span className="text-ink-faint">·</span>
                        <span>estimated</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-ink md:text-xl">
                      {lesson.title}
                    </h3>
                    <p className="body-prose mt-2 text-ink-subtle">{lesson.description}</p>
                    {lesson.concepts.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Concepts covered">
                        {lesson.concepts.map((concept, idx) => (
                          <li key={idx}>
                            <span className="concept-chip">{concept}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="shrink-0 md:pt-1">
                    <Link
                      to={`/languages/${language}/lesson/${lesson.id}`}
                      className="btn-primary flex w-full items-center justify-center gap-2 md:w-auto md:min-w-[10.5rem]"
                    >
                      <Play className="h-4 w-4 shrink-0" aria-hidden />
                      Start lesson
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>

        {/* Practice mode */}
        <motion.div className="section-divide" variants={itemVariants}>
          <div className="cta-panel cta-panel-accent">
            <h2 className="heading-section mb-3 px-2 pt-1 text-ink">
              Want more practice?
            </h2>
            <p className="body-prose mx-auto mb-8 max-w-2xl text-ink-muted">
              Use free practice mode for random snippets and open-ended sessions—same language, no lesson
              structure required.
            </p>
            <div className="cta-panel__actions justify-center">
              <Link
                to={`/languages/${language}/practice`}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base sm:min-w-[14rem] sm:text-lg"
              >
                <Trophy className="h-4 w-4 shrink-0" aria-hidden />
                Open practice mode
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LanguageLessons
