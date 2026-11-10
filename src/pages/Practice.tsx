import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Zap, Timer, Target, Terminal as TerminalIcon, Braces, ClipboardPaste, Brain, Sparkles, Info, Bot } from 'lucide-react'
import { Button, PageHeader, Segmented, Select } from '../components/ui'
import { PracticeRunner, sessionFields } from '../components/typing/PracticeRunner'
import type { SessionResult } from '../components/typing/useTypingSession'
import { usePageMeta, useAppUI } from '../app/context'
import { buildPracticeText, DEFAULT_OPTIONS, type PracticeMode, type PracticeOptions } from '../lib/practiceText'
import { buildDrill } from '../lib/recommend'
import { CATEGORY_LABELS, type MistakeCategory } from '../lib/typing/categories'
import { languageTracks } from '../content/code'
import { CATEGORY_LABEL, PLATFORM_LABEL, type CommandCategory, type Platform } from '../content/types'
import { recordSession, getData } from '../lib/storage/store'
import type { SessionKind } from '../lib/storage/schema'

const MODES: { id: PracticeMode | 'recall' | 'ai'; label: string; Icon: typeof Zap; blurb: string }[] = [
  { id: 'speed', label: 'Speed Test', Icon: Zap, blurb: 'A short block of real code. Type it as fast and cleanly as you can.' },
  { id: 'timed', label: 'Timed Challenge', Icon: Timer, blurb: 'A standard test for 15, 30, 60, or 120 seconds. Comparable across attempts.' },
  { id: 'accuracy', label: 'Accuracy Training', Icon: Target, blurb: 'A wrong key does not advance. Fix it before moving on. Careful beats fast.' },
  { id: 'command', label: 'Command Practice', Icon: TerminalIcon, blurb: 'Linux, PowerShell, Windows, and Cisco IOS commands, one per line.' },
  { id: 'syntax', label: 'Syntax Training', Icon: Braces, blurb: 'Lines dense with brackets, quotes, pipes, and operators.' },
  { id: 'custom', label: 'Custom Practice', Icon: ClipboardPaste, blurb: 'Paste your own code or text. It is never executed or sent anywhere.' },
  { id: 'recall', label: 'Recall Mode', Icon: Brain, blurb: 'Read a task and type the command from memory.' },
  { id: 'ai', label: 'AI Studio', Icon: Bot, blurb: 'Generate custom exercises in any language with Bring Your Own AI.' },
]

const ALL_MODES: PracticeMode[] = ['speed', 'timed', 'accuracy', 'command', 'syntax', 'custom']

export default function Practice() {
  const [params, setParams] = useSearchParams()
  const { focusMode } = useAppUI()
  const drill = params.get('drill') as MistakeCategory | null
  const initialMode = (ALL_MODES.includes(params.get('mode') as PracticeMode) ? params.get('mode') : 'speed') as PracticeMode
  const [opts, setOpts] = useState<PracticeOptions>(() => ({
    ...DEFAULT_OPTIONS,
    mode: initialMode,
    duration: [15, 30, 60, 120].includes(Number(params.get('duration'))) ? Number(params.get('duration')) : 30,
    language: languageTracks.some((t) => t.language === params.get('language')) ? params.get('language')! : 'all',
    platform: (['linux', 'powershell', 'windows-cmd', 'cisco-ios'].includes(params.get('platform') ?? '') ? params.get('platform') : 'all') as Platform | 'all',
    seed: Math.floor(Math.random() * 1e9),
  }))
  const [customDraft, setCustomDraft] = useState('')
  usePageMeta('Typing Practice', 'Speed tests, timed challenges, accuracy training, command practice, syntax drills, and custom practice with live WPM and accuracy.')

  const set = (p: Partial<PracticeOptions>) => setOpts((o) => ({ ...o, ...p, seed: p.seed ?? o.seed }))
  const isDrill = !!drill && drill in CATEGORY_LABELS
  const drillText = useMemo(() => (isDrill ? buildDrill(drill!) : null), [isDrill, drill])
  const target = useMemo(() => (isDrill ? drillText!.text : buildPracticeText(opts)), [opts, isDrill, drillText])
  const kind: SessionKind = isDrill ? 'weakness' : opts.mode
  const timeLimit = !isDrill && opts.mode === 'timed' ? opts.duration : 0
  const itemId = isDrill ? `drill:${drill}` : opts.mode === 'timed' ? `timed:${opts.duration}` : opts.mode === 'custom' ? 'custom' : 'mixed'

  const onComplete = (r: SessionResult) => {
    if (r.metrics.keystrokes === 0) return null
    const prior = getData().sessions.filter((s) => s.kind === kind && s.itemId === itemId)
    const best = prior.length ? Math.max(...prior.map((s) => s.wpm)) : null
    const trackId = opts.mode === 'command' ? (opts.platform === 'all' ? 'commands' : opts.platform) : opts.language === 'all' ? 'mixed' : opts.language
    recordSession({ kind, trackId, itemId, title: isDrill ? `Drill: ${CATEGORY_LABELS[drill!]}` : MODES.find((m) => m.id === opts.mode)?.label, passed: r.metrics.perfect, ...sessionFields(r) })
    if (best === null) return 'First attempt of this kind. Future attempts will be compared with it.'
    const diff = r.metrics.wpm - best
    return diff > 0 ? `New personal best for this test, ${diff} WPM above your previous best of ${best}.` : `Your best for this test is ${best} WPM. This run: ${r.metrics.wpm}.`
  }

  const next = () => set({ seed: opts.seed + 1 })
  const modeMeta = MODES.find((m) => m.id === (isDrill ? 'syntax' : opts.mode))!
  const needsCustom = !isDrill && opts.mode === 'custom' && !opts.customText

  return (
    <div className="page">
      {!focusMode && (
        <PageHeader
          eyebrow="Typing Practice"
          title={isDrill ? `Drill: ${CATEGORY_LABELS[drill!]}` : 'Typing practice'}
          lead={isDrill ? `Recommended from your recent mistakes. Lines come from ${drillText!.sources.slice(0, 3).join(', ')}.` : 'Choose a mode. Typing starts the timer, Esc pauses it, and results are saved in this browser.'}
        />
      )}

      {!focusMode && !isDrill && (
        <div className="mb-6 space-y-4">
          <div role="radiogroup" aria-label="Practice mode" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
            {MODES.map((m) =>
              m.id === 'recall' ? (
                <Link key={m.id} to="/practice/recall" className="flex flex-col items-start gap-1.5 rounded-lg border border-line bg-surface p-3 text-left text-sm interactive">
                  <m.Icon className="h-4 w-4 text-accent" aria-hidden />
                  <span className="font-medium">{m.label}</span>
                </Link>
              ) : m.id === 'ai' ? (
                <Link key={m.id} to="/practice/ai" className="flex flex-col items-start gap-1.5 rounded-lg border border-accent/40 bg-accent/5 p-3 text-left text-sm interactive">
                  <m.Icon className="h-4 w-4 text-accent" aria-hidden />
                  <span className="font-medium flex items-center gap-1">
                    {m.label} <Sparkles className="h-3 w-3 text-accent" />
                  </span>
                </Link>
              ) : (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={opts.mode === m.id}
                  onClick={() => {
                    set({ mode: m.id as PracticeMode })
                    setParams({ mode: m.id }, { replace: true })
                  }}
                  className={`flex flex-col items-start gap-1.5 rounded-lg border p-3 text-left text-sm transition duration-fast ${
                    opts.mode === m.id ? 'border-accent bg-accent/10 shadow-e1' : 'border-line bg-surface hover:border-line-strong hover:bg-elevated'
                  }`}
                >
                  <m.Icon className="h-4 w-4 text-accent" aria-hidden />
                  <span className="font-medium">{m.label}</span>
                </button>
              )
            )}
          </div>
          <p className="flex items-start gap-2 text-sm text-fg-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /> {modeMeta.blurb}
          </p>
          <div className="flex flex-wrap items-end gap-3">
            {opts.mode === 'timed' && (
              <div>
                <div className="mb-1 text-xs font-medium text-fg-subtle">Duration</div>
                <Segmented label="Duration" value={opts.duration} onChange={(v) => set({ duration: v })} options={[15, 30, 60, 120].map((d) => ({ value: d, label: `${d}s` }))} />
              </div>
            )}
            {opts.mode !== 'custom' && opts.mode !== 'command' && (
              <Select label="Language" value={opts.language} onChange={(v) => set({ language: v })} options={[{ value: 'all', label: 'All languages' }, ...languageTracks.map((t) => ({ value: t.language, label: t.languageName }))]} />
            )}
            {opts.mode === 'command' && (
              <>
                <Select label="Platform" value={opts.platform} onChange={(v) => set({ platform: v })} options={[{ value: 'all', label: 'All platforms' }, ...(Object.keys(PLATFORM_LABEL) as Platform[]).map((p) => ({ value: p, label: PLATFORM_LABEL[p] }))]} />
                <Select label="Category" value={opts.category} onChange={(v) => set({ category: v })} options={[{ value: 'all', label: 'All categories' }, ...(Object.keys(CATEGORY_LABEL) as CommandCategory[]).map((c) => ({ value: c, label: CATEGORY_LABEL[c] }))]} />
              </>
            )}
            {opts.mode !== 'custom' && (
              <Select
                label="Difficulty"
                value={opts.difficulty}
                onChange={(v) => set({ difficulty: v })}
                options={[
                  { value: 'all', label: 'All levels' },
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
              />
            )}
            <p className="text-xs text-fg-subtle">More options, such as strict indentation and cursor style, are in Settings.</p>
          </div>
          {opts.mode === 'custom' && (
            <div className="panel panel-pad">
              <label htmlFor="custom-src" className="text-sm font-medium">Paste or type the text to practice</label>
              <p className="mt-0.5 text-xs text-fg-subtle">Pasting is allowed here, in the source box only. The text stays in this browser tab and is never run as code.</p>
              <textarea
                id="custom-src"
                value={customDraft}
                onChange={(e) => setCustomDraft(e.target.value)}
                rows={6}
                maxLength={4000}
                spellCheck={false}
                className="mt-3 w-full rounded-md border border-line-strong bg-sunken p-3 font-mono text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="def hello():&#10;    print('hi')"
              />
              <div className="mt-2 flex items-center gap-3">
                <Button onClick={() => set({ customText: customDraft })} disabled={!customDraft.trim()}>Use this text</Button>
                <span className="text-xs text-fg-subtle">{customDraft.length} / 4000 characters</span>
              </div>
            </div>
          )}
        </div>
      )}

      {needsCustom ? (
        <p className="rounded-lg border border-dashed border-line-strong p-8 text-center text-sm text-fg-subtle">Add some text above to start Custom Practice.</p>
      ) : target.trim() ? (
        <PracticeRunner
          key={`${kind}-${itemId}-${opts.seed}-${opts.language}-${opts.platform}-${opts.category}-${opts.difficulty}`}
          target={target}
          label={`${modeMeta.label} text`}
          languageLabel={isDrill ? 'drill' : opts.mode === 'command' ? (opts.platform === 'all' ? 'commands' : PLATFORM_LABEL[opts.platform]) : opts.language === 'all' ? 'mixed' : opts.language}
          timeLimitSec={timeLimit}
          blockOnError={!isDrill && opts.mode === 'accuracy'}
          onComplete={onComplete}
          onNext={opts.mode === 'custom' ? undefined : next}
          nextLabel="New text"
          resultTitle={(r) => (opts.mode === 'accuracy' && r.metrics.accuracy >= 98 ? 'Precise work' : undefined)}
          resultSub={(r) => (opts.mode === 'accuracy' ? `Accuracy ${r.metrics.accuracy}%. Aim for 98% or better before speeding up.` : undefined)}
        />
      ) : (
        <p className="rounded-lg border border-dashed border-line-strong p-8 text-center text-sm text-fg-subtle">No content matches these filters. Try a different difficulty or category.</p>
      )}

      {!focusMode && (
        <div className="mt-10 flex flex-wrap items-center gap-2 text-sm text-fg-subtle">
          <Sparkles className="h-4 w-4 text-accent" aria-hidden /> Weak spots? <Link to="/progress#mistakes" className="text-accent hover:underline">See personalized drills</Link>
        </div>
      )}
    </div>
  )
}
