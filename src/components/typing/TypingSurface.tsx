import { memo, useEffect, useId, useImperativeHandle, useMemo, useRef, useState, forwardRef, type KeyboardEvent } from 'react'
import { Keyboard, Pause } from 'lucide-react'
import type { TypingSession } from './useTypingSession'
import { useSettings } from '../../lib/settings'
import { SymbolBar } from './SymbolBar'

export interface TypingSurfaceHandle {
  focus: () => void
}

interface Props {
  session: TypingSession
  label: string
  /** Shown in the window title bar, for example "python" or "PowerShell". */
  languageLabel?: string
  /** Compact single-line layout for commands. */
  compact?: boolean
  maxHeightClass?: string
  autoFocus?: boolean
  /** Extra keyboard shortcuts handled by the page while the surface is focused (Escape is handled here). */
  onEscape?: () => void
}

interface LineProps {
  text: string
  typed: string
  /** Column of the caret in this line, or -1. */
  cursor: number
  caret: 'bar' | 'block' | 'underline'
  number: number
  showNumber: boolean
  numberWidth: number
  isLast: boolean
  newlineTyped: boolean
  newlineError: boolean
  blink: boolean
}

const Line = memo(function Line({ text, typed, cursor, caret, number, showNumber, numberWidth, isLast, newlineTyped, newlineError, blink }: LineProps) {
  const chars = Array.from(text)
  let col = 0
  return (
    <div className="flex">
      {showNumber && (
        <span className="mr-4 shrink-0 select-none text-right tabular-nums text-fg-subtle/60" style={{ width: `${numberWidth}ch` }}>
          {number}
        </span>
      )}
      <span className="whitespace-pre">
        {chars.map((ch, i) => {
          const at = col
          col += ch.length
          const t = typed.slice(at, at + ch.length)
          const state = t.length === 0 ? 'pending' : t === ch ? 'correct' : 'error'
          const isCursor = cursor === at
          const isSpace = ch === ' '
          const cls =
            state === 'pending' ? 'ch-pending' : state === 'correct' ? 'ch-correct' : isSpace ? 'ch-ws-error' : 'ch-error'
          return (
            <span key={i} className={`${cls} ${isCursor ? `caret-${caret}${blink ? ' caret-blink' : ''}` : ''}`}>
              {ch}
            </span>
          )
        })}
        {!isLast && (
          <span
            className={`${newlineError ? 'ch-ws-error' : newlineTyped ? 'text-fg-subtle/50' : 'ch-ws'} ${cursor === col ? `caret-${caret}${blink ? ' caret-blink' : ''}` : ''}`}
            aria-hidden
          >
            ↵
          </span>
        )}
        {isLast && cursor === col && <span className={`caret-${caret}`}>&nbsp;</span>}
      </span>
    </div>
  )
})

export const TypingSurface = forwardRef<TypingSurfaceHandle, Props>(function TypingSurface(
  { session, label, languageLabel, compact = false, maxHeightClass = 'max-h-[min(52vh,26rem)]', autoFocus = false, onEscape },
  ref
) {
  const { engine, status } = session
  const settings = useSettings()
  const taRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const composing = useRef(false)
  const [focused, setFocused] = useState(false)
  const [announce, setAnnounce] = useState('')
  const inputId = useId()
  const descId = useId()

  useImperativeHandle(ref, () => ({ focus: () => taRef.current?.focus({ preventScroll: true }) }), [])

  useEffect(() => {
    if (autoFocus) taRef.current?.focus({ preventScroll: true })
  }, [autoFocus])

  const lines = useMemo(() => {
    const ls = engine.target.split('\n')
    let o = 0
    return ls.map((text, i) => {
      const start = o
      o += text.length + 1
      return { text, start, i }
    })
  }, [engine.target])

  const pos = engine.input.length
  const currentLine = useMemo(() => {
    for (let i = lines.length - 1; i >= 0; i--) if (pos >= lines[i]!.start) return i
    return 0
  }, [lines, pos])

  // Scroll so the current line stays in the middle third of the viewport.
  useEffect(() => {
    const box = scrollRef.current
    const el = box?.querySelector<HTMLElement>(`[data-line="${currentLine}"]`)
    if (!box || !el) return
    const top = el.offsetTop - box.clientHeight / 3
    box.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }, [currentLine])

  // Screen reader support: announce each new line to type.
  useEffect(() => {
    if (status === 'finished') return
    const l = lines[currentLine]
    if (l) setAnnounce(`Line ${currentLine + 1} of ${lines.length}: ${l.text.trim() ? l.text : 'blank line'}`)
  }, [currentLine, lines, status])

  const numberWidth = String(lines.length).length
  const blink = status !== 'running'
  const showNumbers = settings.lineNumbers && !compact && lines.length > 1

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      // Tab fills expected indentation. Otherwise it keeps its normal focus behavior.
      if (session.tab()) e.preventDefault()
      return
    }
    if (e.key === 'Escape') {
      session.pause()
      onEscape?.()
      taRef.current?.blur()
    }
  }

  return (
    <div className="relative">
      <div
        className={`panel relative overflow-hidden bg-sunken transition-shadow duration-fast ${focused ? 'ring-2 ring-accent/70' : ''}`}
        onMouseDown={(e) => {
          if (e.target !== taRef.current) {
            e.preventDefault()
            taRef.current?.focus({ preventScroll: true })
          }
        }}
      >
        {!compact && (
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface/60 px-4 py-2 text-xs text-fg-subtle">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-err/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
              </span>
              <span className="truncate font-mono">{languageLabel ?? 'practice'}</span>
            </div>
            <span className="hidden font-mono tabular-nums sm:inline">
              {lines.length} {lines.length === 1 ? 'line' : 'lines'} · {engine.target.length} chars
            </span>
          </div>
        )}

        <div
          ref={scrollRef}
          className={`scroll-x relative overflow-y-auto px-4 py-4 sm:px-5 ${compact ? '' : maxHeightClass}`}
          aria-hidden
          style={{ fontSize: 'var(--type-font-size)', lineHeight: 'var(--type-line-height)' }}
        >
          <div className="font-mono">
            {lines.map((l) => {
              const typed = engine.input.slice(l.start, l.start + l.text.length)
              const nlIndex = l.start + l.text.length
              const newlineTyped = engine.input.length > nlIndex
              const newlineError = newlineTyped && engine.input[nlIndex] !== '\n'
              const cursor = status !== 'finished' && currentLine === l.i ? pos - l.start : -1
              return (
                <div key={l.i} data-line={l.i}>
                  <Line
                    text={l.text}
                    typed={typed}
                    cursor={cursor}
                    caret={settings.caret}
                    number={l.i + 1}
                    showNumber={showNumbers}
                    numberWidth={numberWidth}
                    isLast={l.i === lines.length - 1}
                    newlineTyped={newlineTyped}
                    newlineError={newlineError}
                    blink={blink}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {status === 'idle' && !focused && (
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-bg/55 text-sm font-medium text-fg backdrop-blur-[2px]"
            onClick={() => taRef.current?.focus()}
          >
            <span className="flex items-center gap-2 rounded-md border border-line-strong bg-surface px-4 py-2 shadow-e2">
              <Keyboard className="h-4 w-4 text-accent" aria-hidden /> Click here, then start typing
            </span>
          </button>
        )}
        {status === 'paused' && (
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-bg/60 text-sm font-medium text-fg backdrop-blur-[2px]"
            onClick={() => {
              session.resume()
              taRef.current?.focus()
            }}
          >
            <span className="flex items-center gap-2 rounded-md border border-line-strong bg-surface px-4 py-2 shadow-e2">
              <Pause className="h-4 w-4 text-warn" aria-hidden /> Paused. Click or keep typing to resume.
            </span>
          </button>
        )}

        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <textarea
          id={inputId}
          ref={taRef}
          value={engine.input}
          aria-describedby={descId}
          className="absolute bottom-0 left-0 h-px w-px resize-none overflow-hidden border-0 p-0 opacity-0"
          style={{ fontSize: 16 }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="enter"
          readOnly={status === 'finished'}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false)
            if (settings.autoPause) session.pause()
          }}
          onKeyDown={onKeyDown}
          onPaste={(e) => {
            e.preventDefault()
            session.input(engine.input + e.clipboardData.getData('text'), { inputType: 'insertFromPaste' })
          }}
          onDrop={(e) => e.preventDefault()}
          onCompositionStart={() => (composing.current = true)}
          onCompositionEnd={(e) => {
            composing.current = false
            session.input(e.currentTarget.value, { composed: true })
          }}
          onChange={(e) => {
            if (composing.current) return
            const native = e.nativeEvent as InputEvent
            session.input(e.target.value, { inputType: native?.inputType })
          }}
        />
        <p id={descId} className="sr-only">
          Type the text exactly. Backspace corrects mistakes. Tab fills indentation when the next characters are spaces. Escape pauses. Pasting is disabled.
        </p>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </div>
      <SymbolBar onKey={(ch) => session.typeChar(ch)} onTab={() => session.tab()} visibleOnDesktop={false} />
    </div>
  )
})
