import {
  useRef,
  useEffect,
  useCallback,
  useId,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { charStatusAt, isTypingComplete } from '../utils/typingMetrics'

export type TypingPracticeSurfaceHandle = {
  focusInput: () => void
}

export interface TypingPracticeSurfaceProps {
  targetCode: string
  languageLabel: string
  value: string
  /** Second arg is true only for a perfect match; parent may treat “end reached” separately. */
  onValueChange: (next: string, isPerfectComplete: boolean) => void
  /** Not started, paused, or completed — no keystrokes accepted. */
  disabled?: boolean
  showLineNumbers?: boolean
}

function statusClass(status: ReturnType<typeof charStatusAt>): string {
  switch (status) {
    case 'correct':
      return 'text-emerald-300/95'
    case 'incorrect':
      return 'bg-red-500/20 text-red-200 underline decoration-red-400/90 decoration-2 underline-offset-2'
    case 'current':
      return 'rounded-sm bg-cyan-500/25 text-white shadow-[inset_0_-2px_0_0_rgba(34,211,238,0.85)]'
    default:
      return 'text-ink-subtle/45'
  }
}

function normalizeInput(raw: string, maxLen: number): string {
  return raw.replace(/\r\n/g, '\n').slice(0, maxLen)
}

const TypingPracticeSurface = forwardRef<TypingPracticeSurfaceHandle, TypingPracticeSurfaceProps>(
  function TypingPracticeSurface(
    { targetCode, languageLabel, value, onValueChange, disabled = false, showLineNumbers = true },
    ref
  ) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<HTMLSpanElement>(null)
    const inputId = useId()

    useImperativeHandle(
      ref,
      () => ({
        /** Parent calls after Start so input accepts keys even if disabled flipped next frame. */
        focusInput: () => {
          textareaRef.current?.focus({ preventScroll: true })
        },
      }),
      []
    )

    const lineCount = targetCode.split('\n').length
    const lineNumWidthCh = Math.max(2, String(lineCount).length + 1)

    useEffect(() => {
      if (disabled || value.length >= targetCode.length) return
      cursorRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
    }, [value.length, disabled, targetCode.length])

    const focusInput = useCallback(() => {
      if (disabled) return
      textareaRef.current?.focus({ preventScroll: true })
    }, [disabled])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled) return
      const next = normalizeInput(e.target.value, targetCode.length)
      onValueChange(next, isTypingComplete(targetCode, next))
    }

    /** Textarea sits on top for clicks + keys; forward wheel to the code scroll area. */
    const handleWheel = (e: React.WheelEvent<HTMLTextAreaElement>) => {
      const el = scrollRef.current
      if (!el) return
      el.scrollTop += e.deltaY
      e.preventDefault()
    }

    const { lines, lineStarts } = useMemo(() => {
      const ls = targetCode.split('\n')
      const starts: number[] = []
      let o = 0
      for (let i = 0; i < ls.length; i++) {
        starts.push(o)
        o += ls[i].length
        if (i < ls.length - 1) o += 1
      }
      return { lines: ls, lineStarts: starts }
    }, [targetCode])

    return (
      <div className="overflow-hidden rounded-lg border border-dark-border bg-[#070708] shadow-inner">
        <div
          className="flex items-center justify-between border-b border-dark-border bg-dark-card/90 px-3 py-2 sm:px-4"
          onClick={focusInput}
          onKeyDown={(e) => e.key === 'Enter' && focusInput()}
          role="presentation"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
            </div>
            <span className="truncate font-mono text-xs text-ink-subtle sm:text-sm">
              {languageLabel} · {lineCount} {lineCount === 1 ? 'line' : 'lines'} · {targetCode.length}{' '}
              chars
            </span>
          </div>
          <span className="hidden text-[10px] uppercase tracking-wide text-ink-subtle/70 sm:inline">
            Click here to focus
          </span>
        </div>

        <div className="relative min-h-[12rem] max-h-[min(42vh,360px)] sm:max-h-[min(48vh,420px)]">
          <label htmlFor={inputId} className="sr-only">
            Type the code snippet. Use backspace to correct mistakes.
          </label>
          <textarea
            id={inputId}
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onWheel={handleWheel}
            readOnly={disabled}
            tabIndex={disabled ? -1 : 0}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Typing practice input"
            className="absolute inset-0 z-[3] h-full min-h-[12rem] w-full cursor-text resize-none border-0 bg-transparent p-0 text-base text-transparent caret-transparent outline-none selection:bg-transparent disabled:cursor-not-allowed"
            style={{ fontSize: '16px' }}
          />

          <div
            ref={scrollRef}
            className="relative z-[1] h-full select-none overflow-auto px-3 py-3 sm:px-4 sm:py-4"
            aria-hidden
          >
            <div
              className="font-mono text-sm leading-relaxed tracking-normal sm:text-[15px] sm:leading-relaxed"
              style={{ fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace' }}
            >
              {lines.map((line, lineIndex) => {
                const charOffset = lineStarts[lineIndex]!
                const row = (
                  <div key={lineIndex} className="flex gap-2 sm:gap-3">
                    {showLineNumbers && (
                      <div
                        className="shrink-0 select-none text-right text-ink-subtle/55 tabular-nums"
                        style={{ width: `${lineNumWidthCh}ch`, minWidth: `${lineNumWidthCh}ch` }}
                      >
                        {lineIndex + 1}
                      </div>
                    )}
                    <div className="min-w-0 flex-1 overflow-x-auto whitespace-pre">
                      {Array.from(line).map((ch, colInLine) => {
                        const index = charOffset + colInLine
                        const status = charStatusAt(targetCode, value, index)
                        const isCursor =
                          !disabled && value.length === index && value.length < targetCode.length
                        return (
                          <span
                            key={index}
                            ref={isCursor ? cursorRef : undefined}
                            className={`${statusClass(status)} transition-colors duration-75`}
                          >
                            {ch === ' ' ? '\u00a0' : ch}
                          </span>
                        )
                      })}
                      {lineIndex < lines.length - 1 &&
                        (() => {
                          const nlIndex = charOffset + line.length
                          const status = charStatusAt(targetCode, value, nlIndex)
                          const isCursor =
                            !disabled && value.length === nlIndex && value.length < targetCode.length
                          return (
                            <span
                              key={`nl-${nlIndex}`}
                              ref={isCursor ? cursorRef : undefined}
                              className={`${statusClass(status)} inline-flex min-w-[0.5ch] transition-colors duration-75`}
                            >
                              ↵
                            </span>
                          )
                        })()}
                    </div>
                  </div>
                )
                return row
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default TypingPracticeSurface
