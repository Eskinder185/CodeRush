import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Maximize2, Minimize2, Pause, Play, RotateCcw, SkipForward } from 'lucide-react'
import { useTypingSession, type SessionResult } from './useTypingSession'
import { TypingSurface, type TypingSurfaceHandle } from './TypingSurface'
import { StatsBar } from './StatsBar'
import { Results } from './Results'
import { VirtualKeyboard } from './VirtualKeyboard'
import { Button, Kbd, useToast } from '../ui'
import { isTypingTarget, useAppUI } from '../../app/context'
import { useSettings } from '../../lib/settings'

interface Props {
  target: string
  label: string
  languageLabel?: string
  timeLimitSec?: number
  blockOnError?: boolean
  /** Called once when the session ends. Return text for the comparison line, if any. */
  onComplete: (r: SessionResult) => ReactNode | void
  onNext?: () => void
  nextLabel?: string
  resultTitle?: (r: SessionResult) => string | undefined
  resultSub?: (r: SessionResult) => string | undefined
  resultExtra?: (r: SessionResult) => ReactNode
  header?: ReactNode
  compact?: boolean
  autoFocus?: boolean
}

/**
 * The full typing experience: live stats, the surface, pause and restart controls, Focus Mode,
 * shortcuts, and the results panel. Pages supply the text and decide what to record.
 */
export function PracticeRunner({ target, label, languageLabel, timeLimitSec = 0, blockOnError, onComplete, onNext, nextLabel = 'Next exercise', resultTitle, resultSub, resultExtra, header, compact, autoFocus }: Props) {
  const toast = useToast()
  const { focusMode, setFocusMode } = useAppUI()
  const settings = useSettings()
  const [result, setResult] = useState<SessionResult | null>(null)
  const [comparison, setComparison] = useState<ReactNode>(null)
  const surfaceRef = useRef<TypingSurfaceHandle>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const session = useTypingSession({
    target,
    timeLimitSec,
    blockOnError,
    onFinish: (r) => {
      setResult(r)
      setComparison(onCompleteRef.current(r) ?? null)
    },
    onPasteBlocked: () => toast('Pasting is turned off in scored practice. Type the text to build muscle memory.', 'warn'),
  })

  useEffect(() => {
    setResult(null)
    setComparison(null)
  }, [target])

  useEffect(() => {
    if (result) window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }, [result])

  const restart = useCallback(() => {
    session.reset()
    setResult(null)
    setComparison(null)
    window.setTimeout(() => surfaceRef.current?.focus(), 0)
  }, [session])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target) || document.querySelector('dialog[open]')) return
      const k = e.key.toLowerCase()
      if (k === 'r') {
        e.preventDefault()
        restart()
      } else if (k === 'n' && onNext) {
        e.preventDefault()
        onNext()
      } else if (k === 'f') {
        e.preventDefault()
        setFocusMode(!focusMode)
        window.setTimeout(() => surfaceRef.current?.focus(), 0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [restart, onNext, focusMode, setFocusMode])

  const nextChar = session.engine.target[session.engine.input.length]

  return (
    <div className={focusMode ? 'mx-auto max-w-4xl' : ''}>
      {!focusMode && header}
      <div className="mb-3">
        <StatsBar session={session} compact={focusMode} />
      </div>
      <TypingSurface ref={surfaceRef} session={session} label={label} languageLabel={languageLabel} compact={compact} autoFocus={autoFocus} maxHeightClass={focusMode ? 'max-h-[60vh]' : undefined} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {session.status === 'running' && (
          <Button variant="secondary" size="sm" onClick={session.pause}>
            <Pause className="h-4 w-4" aria-hidden /> Pause
          </Button>
        )}
        {session.status === 'paused' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              session.resume()
              surfaceRef.current?.focus()
            }}
          >
            <Play className="h-4 w-4" aria-hidden /> Resume
          </Button>
        )}
        <Button variant="secondary" size="sm" onClick={restart}>
          <RotateCcw className="h-4 w-4" aria-hidden /> Restart
        </Button>
        {onNext && (
          <Button variant="ghost" size="sm" onClick={onNext}>
            <SkipForward className="h-4 w-4" aria-hidden /> {nextLabel}
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setFocusMode(!focusMode)
            window.setTimeout(() => surfaceRef.current?.focus(), 0)
          }}
          aria-pressed={focusMode}
        >
          {focusMode ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />} {focusMode ? 'Exit Focus Mode' : 'Focus Mode'}
        </Button>
        <span className="ml-auto hidden text-xs text-fg-subtle md:inline">
          <Kbd>Esc</Kbd> pause · <Kbd>R</Kbd> restart{onNext ? <> · <Kbd>N</Kbd> next</> : null} · <Kbd>F</Kbd> focus
        </span>
      </div>
      {settings.showKeyboard && !result && (
        <div className="mt-5">
          <VirtualKeyboard next={nextChar} caption={nextChar ? `Next key: ${nextChar === ' ' ? 'space' : nextChar}` : 'Keyboard'} />
        </div>
      )}
      {result && (
        <div ref={resultsRef} className="mt-6">
          <Results
            result={result}
            title={resultTitle?.(result)}
            passLabel={resultSub?.(result)}
            comparison={comparison}
            actions={
              <>
                <Button onClick={restart}>
                  <RotateCcw className="h-4 w-4" aria-hidden /> Try again
                </Button>
                {onNext && (
                  <Button variant="secondary" onClick={onNext}>
                    <SkipForward className="h-4 w-4" aria-hidden /> {nextLabel}
                  </Button>
                )}
              </>
            }
          >
            {resultExtra?.(result)}
          </Results>
        </div>
      )}
    </div>
  )
}

/** Shape a finished session into the fields every recorded session shares. */
export function sessionFields(r: SessionResult) {
  const m = r.metrics
  return {
    durationSec: r.durationSec,
    wpm: m.wpm,
    rawWpm: m.rawWpm,
    accuracy: m.accuracy,
    correctChars: m.correctChars,
    keystrokes: m.keystrokes,
    uncorrected: m.uncorrected,
    corrected: m.corrected,
    missing: m.missing,
    excess: m.excess,
    charStats: r.engine.charStats,
    categoryStats: r.engine.categoryStats,
    wpmSeries: r.wpmSeries,
  }
}
