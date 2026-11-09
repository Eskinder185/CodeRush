import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Info, Network, Calculator, Workflow, Star } from 'lucide-react'
import { ButtonLink, DifficultyBadge, ProgressBar, Tag } from '../components/ui'
import { QuizRunner, StatusPill } from '../components/learning/Learning'
import { usePageMeta, useTrackVisit } from '../app/context'
import { findModule } from '../content/paths'
import { getCommand } from '../content/commands'
import { getScenario } from '../content/scenarios'
import { getLesson, getLanguageTrack } from '../content/code'
import { PLATFORM_LABEL } from '../content/types'
import { recordQuiz, useAppData } from '../lib/storage/store'
import { commandMastery, moduleMastery, unmetPrerequisites, type CommandLevel } from '../lib/mastery'
import { passedLessonIds } from '../lib/progress'
import NotFound from './NotFound'

const LEVEL: Record<CommandLevel, { label: string; cls: string }> = {
  'not-started': { label: 'Not started', cls: 'text-fg-subtle' },
  learning: { label: 'Learning', cls: 'text-warn' },
  practiced: { label: 'Practiced', cls: 'text-accent' },
  mastered: { label: 'Mastered', cls: 'text-violet' },
}

export default function ModulePage() {
  const { pathId = '', moduleId = '' } = useParams()
  const found = findModule(moduleId)
  const data = useAppData()
  usePageMeta(found?.module.title ?? 'Module not found', found?.module.outcome)
  useTrackVisit(`/learn/${pathId}/${moduleId}`, found ? `${found.path.title}: ${found.module.title}` : undefined)
  if (!found || found.path.id !== pathId) return <NotFound />
  const { path, module: m, index } = found
  const mastery = moduleMastery(m, data)
  const prereq = unmetPrerequisites(path, index, data)
  const prev = path.modules[index - 1]
  const next = path.modules[index + 1]

  return (
    <div className="page">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-fg-subtle">
        <Link to="/learn" className="hover:text-fg">Learn</Link>
        <span aria-hidden>/</span>
        <Link to={`/learn/${path.id}`} className="hover:text-fg">{path.title}</Link>
        <span aria-hidden>/</span>
        <span className="text-fg-muted" aria-current="page">Module {index + 1}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-10">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge level={m.level} />
              <StatusPill status={mastery.status} />
            </div>
            <h1 className="mt-3 text-h1">{m.title}</h1>
            <p className="lead mt-3">
              <strong className="font-semibold text-fg">After this module you can:</strong> {m.outcome}
            </p>
          </header>

          {prereq.length > 0 && (
            <div className="flex gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <p className="text-fg-muted">
                Recommended first: {prereq.slice(0, 3).map((p, i) => (
                  <span key={p.id}>
                    {i > 0 && ', '}
                    <Link to={`/learn/${path.id}/${p.id}`} className="text-accent hover:underline">{p.title}</Link>
                  </span>
                ))}
                {prereq.length > 3 && ` and ${prereq.length - 3} more`}. You can continue here anyway.
              </p>
            </div>
          )}

          <section aria-labelledby="concept">
            <h2 id="concept" className="text-h2">Learn the concept</h2>
            <div className="prose-cr mt-4">
              {m.concept.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {m.commandIds.length > 0 && (
            <section aria-labelledby="commands">
              <h2 id="commands" className="text-h2">Command lessons</h2>
              <p className="mt-1 text-sm text-fg-subtle">Each lesson walks through Learn, Understand, Observe, Type, Recall, Apply, and Review.</p>
              <ul className="mt-4 grid gap-2">
                {m.commandIds.map((id, i) => {
                  const c = getCommand(id)!
                  const cm = commandMastery(data.commands[id])
                  return (
                    <li key={id}>
                      <Link to={`/lab/command/${id}?module=${m.id}`} className="panel flex items-center gap-4 p-3.5 interactive">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-xs tabular-nums text-fg-subtle">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-medium text-fg">{c.title}</div>
                          <code className="block truncate font-mono text-xs text-fg-subtle">{c.command}</code>
                        </div>
                        <div className="hidden flex-col items-end gap-1 sm:flex">
                          <Tag>{PLATFORM_LABEL[c.platform]}</Tag>
                          <span className={`text-2xs font-semibold ${LEVEL[cm.level].cls}`}>
                            {cm.level === 'mastered' && <Star className="mr-0.5 inline h-3 w-3" aria-hidden />}
                            {LEVEL[cm.level].label} · {cm.score}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-fg-subtle" aria-hidden />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {m.lessonRefs && m.lessonRefs.length > 0 && (
            <section aria-labelledby="lessons">
              <h2 id="lessons" className="text-h2">Typing lessons</h2>
              <p className="mt-1 text-sm text-fg-subtle">A lesson passes only when your final text matches exactly.</p>
              <ul className="mt-4 grid gap-2">
                {m.lessonRefs.map((ref) => {
                  const [lang, id] = ref.split('/') as [string, string]
                  const l = getLesson(lang, id)!
                  const passed = passedLessonIds(data, lang).has(id)
                  return (
                    <li key={ref}>
                      <Link to={`/languages/${lang}/lesson/${id}`} className="panel flex items-center gap-3 p-3.5 interactive">
                        {passed ? <CheckCircle2 className="h-5 w-5 text-ok" aria-label="Passed" /> : <Circle className="h-5 w-5 text-fg-subtle" aria-label="Not passed yet" />}
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{l.title}</div>
                          <div className="truncate text-xs text-fg-subtle">{l.description}</div>
                        </div>
                        <DifficultyBadge level={l.difficulty} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-3 text-sm">
                <Link to={`/languages/${m.lessonRefs[0]!.split('/')[0]}/lessons`} className="text-accent hover:underline">
                  Open the {getLanguageTrack(m.lessonRefs[0]!.split('/')[0]!)?.languageName} lesson list
                </Link>
              </p>
            </section>
          )}

          {m.tools && m.tools.length > 0 && (
            <section aria-labelledby="tools">
              <h2 id="tools" className="text-h2">Interactive tools</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {m.tools.includes('subnetting') && (
                  <Link to="/tools/subnetting" className="panel flex items-center gap-3 p-4 interactive">
                    <Calculator className="h-5 w-5 text-accent" aria-hidden /> <span className="font-medium">Subnetting trainer</span>
                  </Link>
                )}
                {m.tools.includes('topology') && (
                  <Link to="/tools/topology" className="panel flex items-center gap-3 p-4 interactive">
                    <Network className="h-5 w-5 text-accent" aria-hidden /> <span className="font-medium">Network topology explorer</span>
                  </Link>
                )}
              </div>
            </section>
          )}

          {m.scenarioIds.length > 0 && (
            <section aria-labelledby="scenarios">
              <h2 id="scenarios" className="text-h2">Apply it: scenarios</h2>
              <ul className="mt-4 grid gap-2">
                {m.scenarioIds.map((id) => {
                  const s = getScenario(id)!
                  const done = data.scenarios[id]?.completed
                  return (
                    <li key={id}>
                      <Link to={`/lab/scenario/${id}?module=${m.id}`} className="panel flex items-center gap-3 p-3.5 interactive">
                        <Workflow className="h-5 w-5 shrink-0 text-violet" aria-hidden />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium">{s.title}</div>
                          <div className="truncate text-xs text-fg-subtle">{s.summary}</div>
                        </div>
                        {done ? <Tag tone="ok">Completed</Tag> : <DifficultyBadge level={s.difficulty} />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {m.quiz.length > 0 && (
            <section aria-labelledby="quiz">
              <h2 id="quiz" className="text-h2">Check your understanding</h2>
              <p className="mt-1 mb-4 text-sm text-fg-subtle">
                {data.quizzes[m.id] ? `Best score so far: ${Math.round(data.quizzes[m.id]!.best * 100)}%.` : 'Score at least 50% to complete this part of the module.'}
              </p>
              <QuizRunner key={m.id} questions={m.quiz} onFinish={(score) => recordQuiz(m.id, score)} />
            </section>
          )}

          <nav className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between" aria-label="Module navigation">
            {prev ? (
              <ButtonLink to={`/learn/${path.id}/${prev.id}`} variant="secondary">
                <ArrowLeft className="h-4 w-4" aria-hidden /> {prev.title}
              </ButtonLink>
            ) : <span />}
            {next && (
              <ButtonLink to={`/learn/${path.id}/${next.id}`}>
                {next.title} <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
            )}
          </nav>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel panel-pad">
            <div className="flex items-baseline justify-between">
              <h2 className="font-semibold">Module mastery</h2>
              <span className="text-2xl font-semibold">{mastery.score}</span>
            </div>
            <ul className="mt-4 space-y-3">
              {mastery.parts.map((p) => (
                <li key={p.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-fg-muted">
                      {p.label} <span className="text-fg-subtle">({Math.round(p.weight * 100)}%)</span>
                    </span>
                    <span className="tabular-nums text-fg-subtle">{Math.round(p.value * 100)}%</span>
                  </div>
                  <ProgressBar value={p.value * 100} label={p.label} size="sm" />
                  <p className="mt-1 text-2xs text-fg-subtle">{p.detail}</p>
                </li>
              ))}
            </ul>
            {mastery.remaining.length > 0 ? (
              <>
                <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-fg-subtle">To complete</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-fg-muted">
                  {mastery.remaining.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-4 text-sm text-ok">Module complete. {mastery.status === 'mastered' ? 'Mastered.' : 'Reach 85 to master it.'}</p>
            )}
            <p className="mt-4 text-2xs text-fg-subtle">
              <Link to="/about#mastery" className="underline-offset-2 hover:underline">How mastery is calculated</Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
