import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, RotateCcw, Timer, Sparkles, CalendarDays, PlayCircle } from 'lucide-react'
import { ButtonLink, ProgressBar, Button } from '../components/ui'
import { usePageMeta } from '../app/context'
import { useAppData, localDateKey } from '../lib/storage/store'
import { learningPaths } from '../content/paths'
import { commands } from '../content/commands'
import { scenarios } from '../content/scenarios'
import { codeLessonCount, languageTracks } from '../content/code'
import { pathProgress } from '../lib/mastery'
import { overallStats } from '../lib/progress'
import { dailyChallenge, dailyStreak } from '../lib/daily'
import { useTypingSession } from '../components/typing/useTypingSession'
import { TypingSurface, type TypingSurfaceHandle } from '../components/typing/TypingSurface'
import { FlowSteps, PathIcon, TerminalVisual, SecurityVisual, HeroBackdrop, CodePanel, ACCENTS } from '../components/graphics/Graphics'
import { NetworkTopology } from '../components/graphics/NetworkTopology'
import { Onboarding } from '../components/learning/Onboarding'
import { readPreferences, recommendedPath } from '../lib/onboarding'
import { findWeaknesses } from '../lib/recommend'

const DEMO = `def greet(name):
    return f"Hello, {name}!"`

function HeroDemo() {
  const ref = useRef<TypingSurfaceHandle>(null)
  const [done, setDone] = useState(false)
  const s = useTypingSession({ target: DEMO, onFinish: () => setDone(true) })
  return (
    <div className="relative">
      <CodePanel className="absolute -right-6 -top-10 hidden w-[24rem] rotate-[2deg] opacity-60 lg:block [[data-theme=light]_&]:opacity-25" />
      <div className="relative rounded-xl border border-line-strong bg-surface/90 p-4 shadow-e3 backdrop-blur sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-fg">Try it now</p>
            <p className="text-xs text-fg-subtle">Type the Python below. Enter moves to the next line.</p>
          </div>
          <dl className="flex gap-4 text-right">
            <div>
              <dt className="text-2xs uppercase tracking-wider text-fg-subtle">WPM</dt>
              <dd className="font-mono text-lg font-semibold tabular-nums">{s.metrics.wpm}</dd>
            </div>
            <div>
              <dt className="text-2xs uppercase tracking-wider text-fg-subtle">Accuracy</dt>
              <dd className="font-mono text-lg font-semibold tabular-nums">{s.metrics.accuracy}%</dd>
            </div>
          </dl>
        </div>
        <TypingSurface ref={ref} session={s} label="Homepage typing demo" languageLabel="greet.py" maxHeightClass="max-h-40" />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {done ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-ok">
              <Check className="h-4 w-4" aria-hidden /> {s.metrics.perfect ? 'Perfect.' : 'Done.'} {s.metrics.wpm} WPM at {s.metrics.accuracy}% accuracy.
            </span>
          ) : (
            <Button size="sm" onClick={() => ref.current?.focus()}>
              <PlayCircle className="h-4 w-4" aria-hidden /> Start
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              s.reset()
              setDone(false)
              ref.current?.focus()
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset
          </Button>
          <Link to="/practice" className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            Full practice <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}

function Personal() {
  const data = useAppData()
  const stats = overallStats(data)
  const today = localDateKey()
  const streak = dailyStreak(data, today)
  const active = learningPaths
    .map((p) => ({ p, prog: pathProgress(p, data) }))
    .filter((x) => x.prog.inProgress > 0 || x.prog.completed > 0)
    .sort((a, b) => b.prog.percent - a.prog.percent)[0]
  const last = data.sessions.at(-1)
  const hasActivity = data.sessions.length > 0 || !!data.lastVisited

  if (!hasActivity) return null
  const preferences = readPreferences()
  const suggested = preferences ? recommendedPath(preferences.goal) : null
  const weakness = findWeaknesses(data, 1)[0]
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="panel panel-pad md:col-span-3">
        <p className="eyebrow">Welcome back · Today&rsquo;s plan</p>
        <h2 className="mt-1 text-h3">{suggested ? `Continue ${suggested.title}` : 'Keep your learning moving'}</h2>
        <p className="mt-1 text-sm text-fg-subtle">{preferences ? `Your ${preferences.dailyMinutes}-minute daily goal. ` : ''}{weakness ? weakness.reason : 'Choose a lesson, review a command, or take today’s challenge.'}</p>
        <div className="mt-3 flex flex-wrap gap-2"><ButtonLink to="/today" size="sm">Open today&rsquo;s plan</ButtonLink><ButtonLink to={suggested ? `/learn/${suggested.id}` : '/learn'} size="sm" variant="secondary">Recommended path</ButtonLink><ButtonLink to="/challenges" size="sm" variant="secondary">Daily challenge</ButtonLink>{weakness && <ButtonLink to={`/practice?drill=${weakness.category}`} size="sm" variant="secondary">Review {weakness.label}</ButtonLink>}</div>
      </div>
      {data.lastVisited && (
        <Link to={data.lastVisited.path} className="panel panel-pad interactive group">
          <p className="text-xs font-medium text-fg-subtle">Continue where you left off</p>
          <p className="mt-1 truncate font-semibold text-fg">{data.lastVisited.title}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
            Resume <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      )}
      <div className="panel panel-pad">
        <p className="text-xs font-medium text-fg-subtle">Recent typing</p>
        {last ? (
          <p className="mt-1 text-fg">
            <span className="text-2xl font-semibold">{last.wpm}</span> WPM at {last.accuracy}% accuracy
          </p>
        ) : (
          <p className="mt-1 text-fg-muted">No typing sessions yet.</p>
        )}
        <p className="mt-2 text-sm text-fg-subtle">
          {stats.lessonsPassed} lesson{stats.lessonsPassed === 1 ? '' : 's'} passed · Daily streak {streak}
        </p>
      </div>
      {active ? (
        <Link to={`/learn/${active.p.id}${active.prog.nextModuleId ? `/${active.prog.nextModuleId}` : ''}`} className="panel panel-pad interactive">
          <p className="text-xs font-medium text-fg-subtle">Current path</p>
          <p className="mt-1 font-semibold text-fg">{active.p.title}</p>
          <div className="mt-3">
            <ProgressBar value={active.prog.percent} label={`${active.p.title} progress`} />
          </div>
          <p className="mt-2 text-sm text-fg-subtle">
            {active.prog.completed} of {active.prog.total} modules complete. Next milestone: {active.prog.completed + 1} modules.
          </p>
        </Link>
      ) : (
        <Link to="/learn" className="panel panel-pad interactive">
          <p className="text-xs font-medium text-fg-subtle">Pick a learning path</p>
          <p className="mt-1 font-semibold text-fg">Eight structured paths, from Python to incident triage.</p>
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  usePageMeta('', 'Build typing speed, learn programming syntax, and practice the commands used by developers, network engineers, and cybersecurity professionals.')
  const counts = useMemo(() => {
    const by = (p: string) => commands.filter((c) => c.platform === p).length
    return { linux: by('linux'), ps: by('powershell'), win: by('windows-cmd'), ios: by('cisco-ios') }
  }, [])
  const daily = dailyChallenge(localDateKey())
  const path = (id: string) => learningPaths.find((p) => p.id === id)!

  const cards = [
    { p: path('programming'), stat: `${codeLessonCount} lessons in ${languageTracks.length} languages`, to: '/learn/programming' },
    { p: path('linux'), stat: `${path('linux').modules.length} modules · ${counts.linux} Linux commands overall`, to: '/learn/linux' },
    { p: path('powershell'), stat: `${path('powershell').modules.length} modules · ${counts.ps} PowerShell commands`, to: '/learn/powershell' },
    { p: path('networking'), stat: `${path('networking').modules.length} modules · ${counts.win} Windows and ${counts.ios} Cisco IOS commands`, to: '/learn/networking' },
    { p: path('cybersecurity'), stat: `${path('cybersecurity').modules.length} modules · ${scenarios.filter((s) => s.track === 'security').length} security scenarios`, to: '/learn/cybersecurity' },
    {
      p: { ...path('linux-networking'), title: 'Command Line Mastery', tagline: 'The Command Lab: search, type, recall, troubleshoot.', accent: 'amber' as const, icon: 'terminal' as const },
      stat: `${commands.length} command exercises · ${scenarios.length} scenarios`,
      to: '/lab',
    },
  ]

  return (
    <div>
      <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
        <HeroBackdrop />
        <div className="mx-auto grid max-w-page items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:px-8 lg:pb-24">
          <div>
            <p className="eyebrow">Typing · Learning · Command Lab</p>
            <h1 className="mt-4 text-display text-fg">
              Master the keyboard.
              <br />
              <span className="bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">Understand the commands. Solve real problems.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              Learn programming and technical typing, Linux, PowerShell, networking, and defensive cybersecurity through hands-on practice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/learn" size="lg">
                Start My Learning Journey <ArrowRight className="h-5 w-5" aria-hidden />
              </ButtonLink>
              <ButtonLink to="/practice?mode=timed&duration=30" size="lg" variant="secondary">
                <Timer className="h-5 w-5" aria-hidden /> Try a 30-Second Typing Test
              </ButtonLink>
            </div>
            <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2 text-sm text-fg-muted">
              {['Free to start', 'No account required for local practice', 'Multiple learning paths', 'Live typing feedback'].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-ok" aria-hidden /> {x}
                </li>
              ))}
            </ul>
          </div>
          <HeroDemo />
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 pb-16 sm:px-6 lg:px-8">
        <div id="journey" className="mb-4 scroll-mt-24"><Onboarding /></div>
        <Personal />
      </section>

      <section className="border-y border-line bg-elevated/40 py-16 sm:py-20">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Learning paths</p>
            <h2 className="mt-2 text-h1">One platform, six ways in.</h2>
            <p className="lead mt-3">Every path pairs plain-English concepts with typing practice, recall checks, and real troubleshooting.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ p, stat, to }) => (
              <Link key={p.title} to={to} className="panel group relative flex flex-col overflow-hidden p-6 transition duration-fast hover:-translate-y-0.5 hover:border-line-strong hover:shadow-e2">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl" style={{ background: ACCENTS[p.accent].hex }} aria-hidden />
                <PathIcon icon={p.icon} accent={p.accent} />
                <h3 className="mt-4 text-h3">{p.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{p.tagline}</p>
                <p className="mt-4 text-xs font-medium text-fg-subtle">{stat}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How CodeRush works</p>
            <h2 className="mt-2 text-h1">Learn → Practice → Improve → Master</h2>
            <p className="lead mt-3">Typing a command correctly is not the same as understanding it. CodeRush measures both.</p>
          </div>
          <div className="mt-12">
            <FlowSteps />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-elevated/40 py-16 sm:py-20">
        <div className="mx-auto grid max-w-page items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="eyebrow">CodeRush Command Lab</p>
            <h2 className="mt-2 text-h1">Learn the commands. Build the muscle memory. Understand the systems.</h2>
            <p className="lead mt-4">
              Linux, PowerShell, Windows networking, and Cisco IOS in a safe, clearly labelled simulated terminal. Every command comes with a syntax breakdown, sample output, recall practice, and troubleshooting scenarios.
            </p>
            <ul className="mt-6 space-y-2 text-fg-muted">
              <li className="flex gap-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ok" aria-hidden /> {commands.length} command exercises, each with documentation links
              </li>
              <li className="flex gap-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ok" aria-hidden /> {scenarios.length} applied scenarios, from DNS failures to suspicious processes
              </li>
              <li className="flex gap-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-ok" aria-hidden /> Nothing you type is ever executed
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/lab">Open the Command Lab</ButtonLink>
              <ButtonLink to="/missions/internet-down" variant="secondary">
                Investigate a network mission
              </ButtonLink>
            </div>
          </div>
          <div className="relative pb-0 sm:pb-24">
            <div className="sm:mr-12">
              <TerminalVisual variant="linux" />
            </div>
            <div className="absolute bottom-0 right-0 hidden w-[80%] sm:block">
              <TerminalVisual variant="powershell" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div>
              <p className="eyebrow">Networking</p>
              <h2 className="mt-2 text-h2">See how a network fits together</h2>
              <p className="mt-2 max-w-2xl text-fg-muted">Select a device to see its simulated routing table, VLANs, or IP settings.</p>
              <div className="mt-6">
                <NetworkTopology compact />
              </div>
            </div>
            <div>
              <p className="eyebrow">Defensive security</p>
              <h2 className="mt-2 text-h2">Investigate with real workflows</h2>
              <p className="mt-2 text-fg-muted">Synthetic logs, reserved addresses, and evidence-first habits. Nothing attacks a real system.</p>
              <div className="mt-6">
                <SecurityVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-page overflow-hidden rounded-xl border border-line bg-gradient-to-br from-accent/10 via-surface to-violet/10 p-8 sm:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden /> Today&rsquo;s challenge
              </p>
              <h2 className="mt-2 text-h2">{daily.title}</h2>
              <p className="mt-2 text-fg-muted">{daily.description} The same challenge for everyone today.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/challenges" size="lg">
                <Sparkles className="h-5 w-5" aria-hidden /> Take the challenge
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
