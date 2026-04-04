import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { TrendingUp, Target, Clock, Trophy, BarChart3, Award, Sparkles } from 'lucide-react'
import { getOverallStats, getLanguageProgress, type LanguageProgress } from '../utils/stats'
import { languageTracks } from '../data/lessons'

const StatsDashboard = () => {
  const prefersReducedMotion = useReducedMotion()
  const [overallStats, setOverallStats] = useState(getOverallStats())
  const [languageProgress, setLanguageProgress] = useState<LanguageProgress[]>([])

  useEffect(() => {
    const progress = languageTracks.map((track) => getLanguageProgress(track.language))
    setLanguageProgress(progress)
    setOverallStats(getOverallStats())
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.4,
        ease: 'easeOut',
      },
    },
  }

  const getProgressGradient = (percentage: number) => {
    if (percentage >= 80) return 'from-emerald-500 to-emerald-600'
    if (percentage >= 60) return 'from-cyan-500 to-cyan-600'
    if (percentage >= 40) return 'from-amber-500 to-amber-600'
    return 'from-rose-500 to-rose-600'
  }

  const getLanguageName = (language: string) => {
    const track = languageTracks.find((t) => t.language === language)
    return track?.languageName || language
  }

  const coldStart = overallStats.totalLessonsCompleted === 0

  const hasAnyAchievement =
    overallStats.totalLessonsCompleted >= 1 ||
    overallStats.totalLessonsCompleted >= 5 ||
    overallStats.totalWpm >= 30 ||
    overallStats.totalAccuracy >= 95 ||
    overallStats.languagesPracticed.length >= 3 ||
    overallStats.totalTimeSpent >= 3600

  return (
    <motion.div
      className="space-y-8 md:space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {coldStart && (
        <motion.div
          className="empty-state-panel flex flex-col items-center border-solid text-center"
          variants={itemVariants}
        >
          <Sparkles className="h-10 w-10 text-neon-blue" aria-hidden />
          <h2 className="heading-section mt-4 text-ink">Start your first lesson</h2>
          <p className="body-prose mt-2 max-w-lg text-ink-subtle">
            When you complete lessons, your WPM, accuracy, and time practiced will show up here. Pick a
            language to begin.
          </p>
          <Link
            to="/languages"
            className="btn-primary mx-auto mt-6 inline-flex min-h-[44px] w-full max-w-xs justify-center sm:w-auto"
          >
            Choose a language
          </Link>
        </motion.div>
      )}

      {/* Overall stats */}
      <motion.section variants={itemVariants} aria-labelledby="stats-overview-heading">
        <h2 id="stats-overview-heading" className="sr-only">
          Overview
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="stat-slab">
            <div className="stat-slab__icon">
              <TrendingUp className="h-5 w-5" aria-hidden />
            </div>
            <div className="text-2xl font-bold tabular-nums text-ink sm:text-3xl">
              {overallStats.totalWpm}
            </div>
            <div className="caption mt-1 text-ink-subtle">Avg. WPM</div>
          </div>
          <div className="stat-slab">
            <div className="stat-slab__icon stat-slab__icon--muted">
              <Target className="h-5 w-5" aria-hidden />
            </div>
            <div className="text-2xl font-bold tabular-nums text-ink sm:text-3xl">
              {overallStats.totalAccuracy}%
            </div>
            <div className="caption mt-1 text-ink-subtle">Avg. accuracy</div>
          </div>
          <div className="stat-slab">
            <div className="stat-slab__icon">
              <Clock className="h-5 w-5" aria-hidden />
            </div>
            <div className="text-2xl font-bold tabular-nums text-ink sm:text-3xl">
              {Math.round(overallStats.totalTimeSpent / 60)}m
            </div>
            <div className="caption mt-1 text-ink-subtle">Total time</div>
          </div>
          <div className="stat-slab">
            <div className="stat-slab__icon stat-slab__icon--muted">
              <Trophy className="h-5 w-5" aria-hidden />
            </div>
            <div className="text-2xl font-bold tabular-nums text-ink sm:text-3xl">
              {overallStats.totalLessonsCompleted}
            </div>
            <div className="caption mt-1 text-ink-subtle">Lessons completed</div>
          </div>
        </div>
      </motion.section>

      {/* Per-language progress */}
      <motion.section
        className="rounded-card border border-dark-border/90 bg-gradient-to-b from-dark-surface/40 to-dark-card p-5 shadow-card sm:p-6 md:p-8"
        variants={itemVariants}
        aria-labelledby="stats-languages-heading"
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-dark-border/60 pb-5">
          <BarChart3 className="h-6 w-6 shrink-0 text-neon-blue" aria-hidden />
          <h2 id="stats-languages-heading" className="text-xl font-bold tracking-tight text-ink md:text-2xl">
            Language progress
          </h2>
        </div>

        <ul className="divide-y divide-dark-border/50">
          {languageProgress.map((progress, index) => {
            const completionPercentage =
              progress.totalLessons > 0
                ? Math.round((progress.completedLessons / progress.totalLessons) * 100)
                : 0
            const name = getLanguageName(progress.language)

            return (
              <motion.li
                key={progress.language}
                className="py-6 first:pt-0 last:pb-0"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                      <h3 className="text-lg font-semibold text-ink">{name}</h3>
                      <span className="text-sm tabular-nums text-ink-subtle">
                        {progress.completedLessons}/{progress.totalLessons} lessons
                      </span>
                    </div>
                    {progress.lastPracticed && (
                      <p className="caption mt-2 text-ink-subtle">
                        Last practiced {progress.lastPracticed.toLocaleDateString(undefined, {
                          dateStyle: 'medium',
                        })}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <p className="text-lg font-bold tabular-nums text-ink">{completionPercentage}%</p>
                    <p className="caption text-ink-subtle">
                      {progress.averageWpm} WPM · {progress.averageAccuracy}% acc.
                    </p>
                  </div>
                </div>

                <div
                  className="mt-4 h-3 w-full overflow-hidden rounded-full bg-dark-surface ring-1 ring-dark-border/80"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={completionPercentage}
                  aria-label={`${name}: ${completionPercentage}% of lessons completed`}
                >
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getProgressGradient(completionPercentage)}`}
                    initial={prefersReducedMotion ? false : { width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{
                      duration: prefersReducedMotion ? 0.2 : 0.85,
                      delay: prefersReducedMotion ? 0 : index * 0.04,
                      ease: 'easeOut',
                    }}
                  />
                </div>

                <div className="mt-3">
                  <Link
                    to={`/languages/${progress.language}/lessons`}
                    className="inline-flex min-h-[44px] items-center text-sm font-medium text-neon-blue transition-colors hover:text-cyan-200"
                  >
                    Open {name} lessons →
                  </Link>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </motion.section>

      {/* Achievements */}
      <motion.section
        className="rounded-card border border-dark-border/90 bg-gradient-to-b from-dark-surface/40 to-dark-card p-5 shadow-card sm:p-6 md:p-8"
        variants={itemVariants}
        aria-labelledby="stats-achievements-heading"
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-dark-border/60 pb-5">
          <Award className="h-6 w-6 shrink-0 text-neon-purple" aria-hidden />
          <h2 id="stats-achievements-heading" className="text-xl font-bold tracking-tight text-ink md:text-2xl">
            Achievements
          </h2>
        </div>

        {!hasAnyAchievement ? (
          <div className="empty-state-panel border-solid py-10">
            <Award className="mx-auto h-9 w-9 text-ink-faint" strokeWidth={1.25} aria-hidden />
            <p className="body-prose mx-auto mt-4 max-w-md text-ink-muted">
              Complete lessons and hit milestones to unlock achievements. Your first one appears after you
              finish a lesson.
            </p>
            <Link
              to="/languages"
              className="btn-secondary mx-auto mt-6 inline-flex min-h-[44px] justify-center px-6"
            >
              Go to languages
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {overallStats.totalLessonsCompleted >= 1 && (
              <li className="flex items-start gap-3 rounded-btn border border-emerald-500/35 bg-emerald-500/10 p-4">
                <Trophy className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" aria-hidden />
                <div>
                  <div className="text-sm font-semibold text-ink">First steps</div>
                  <div className="caption mt-0.5 text-ink-subtle">Complete your first lesson</div>
                </div>
              </li>
            )}
            {overallStats.totalLessonsCompleted >= 5 && (
              <li className="flex items-start gap-3 rounded-btn border border-neon-blue/35 bg-neon-blue/10 p-4">
                <Award className="mt-0.5 h-6 w-6 shrink-0 text-neon-blue" aria-hidden />
                <div>
                  <div className="text-sm font-semibold text-ink">Getting started</div>
                  <div className="caption mt-0.5 text-ink-subtle">Complete 5 lessons</div>
                </div>
              </li>
            )}
            {overallStats.totalWpm >= 30 && (
              <li className="flex items-start gap-3 rounded-btn border border-amber-500/35 bg-amber-500/10 p-4">
                <TrendingUp className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" aria-hidden />
                <div>
                  <div className="text-sm font-semibold text-ink">Speed demon</div>
                  <div className="caption mt-0.5 text-ink-subtle">Reach 30+ WPM average</div>
                </div>
              </li>
            )}
            {overallStats.totalAccuracy >= 95 && (
              <li className="flex items-start gap-3 rounded-btn border border-neon-purple/35 bg-neon-purple/10 p-4">
                <Target className="mt-0.5 h-6 w-6 shrink-0 text-neon-purple" aria-hidden />
                <div>
                  <div className="text-sm font-semibold text-ink">Precision master</div>
                  <div className="caption mt-0.5 text-ink-subtle">Reach 95%+ accuracy</div>
                </div>
              </li>
            )}
            {overallStats.languagesPracticed.length >= 3 && (
              <li className="flex items-start gap-3 rounded-btn border border-rose-500/35 bg-rose-500/10 p-4">
                <BarChart3 className="mt-0.5 h-6 w-6 shrink-0 text-rose-300" aria-hidden />
                <div>
                  <div className="text-sm font-semibold text-ink">Polyglot</div>
                  <div className="caption mt-0.5 text-ink-subtle">Practice 3+ languages</div>
                </div>
              </li>
            )}
            {overallStats.totalTimeSpent >= 3600 && (
              <li className="flex items-start gap-3 rounded-btn border border-indigo-500/35 bg-indigo-500/10 p-4">
                <Clock className="mt-0.5 h-6 w-6 shrink-0 text-indigo-300" aria-hidden />
                <div>
                  <div className="text-sm font-semibold text-ink">Dedicated learner</div>
                  <div className="caption mt-0.5 text-ink-subtle">Practice 1+ hours total</div>
                </div>
              </li>
            )}
          </ul>
        )}
      </motion.section>
    </motion.div>
  )
}

export default StatsDashboard
