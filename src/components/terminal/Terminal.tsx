import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { FlaskConical, Maximize2, Minimize2, RotateCcw } from 'lucide-react'
import type { Platform } from '../../content/types'
import { PROMPTS, historyStep, recordInput, type TermState } from '../../lib/terminal/simulator'
import { MAX_INPUT } from '../../lib/terminal/match'
import { Highlighted } from '../code/Highlight'
import { SHELL_OF } from '../../lib/terminal/simulator'

/**
 * A simulated terminal. The caller decides what each submitted line means (a free-exploration
 * lookup, a scenario answer, a recall check). Nothing is ever executed.
 */
export function Terminal({
  platform,
  state,
  setState,
  onSubmit,
  onReset,
  instructions,
  prompt,
  disabled = false,
  heightClass = 'h-80',
  title,
}: {
  platform: Platform
  state: TermState
  setState: (s: TermState) => void
  /** Receives the state with the input line already recorded. */
  onSubmit: (input: string, s: TermState) => void
  onReset?: () => void
  instructions?: ReactNode
  prompt?: string
  disabled?: boolean
  heightClass?: string
  title?: string
}) {
  const [value, setValue] = useState('')
  const [full, setFull] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const p = prompt ?? PROMPTS[platform]
  const shell = SHELL_OF[platform]
  const isPS = platform === 'powershell' || platform === 'windows-cmd'

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [state.lines.length])

  useEffect(() => {
    if (!full) return
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setFull(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [full])

  const submit = () => {
    if (disabled) return
    const input = value.slice(0, MAX_INPUT)
    const s = recordInput(state, input, p)
    setValue('')
    onSubmit(input, s)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const r = historyStep(state, e.key === 'ArrowUp' ? -1 : 1)
      setState(r.state)
      setValue(r.value)
    } else if (e.key === 'l' && e.ctrlKey && !isPS) {
      e.preventDefault()
      setState({ ...state, lines: [] })
    }
  }

  return (
    <section
      className={`terminal flex flex-col overflow-hidden rounded-lg border border-line bg-term text-term-fg shadow-e2 ${
        full ? 'fixed inset-2 z-[55] sm:inset-6' : ''
      }`}
      aria-label={title ?? 'Simulated terminal'}
    >
      <div className={`flex items-center justify-between gap-2 border-b border-white/5 px-3 py-2 ${isPS ? 'bg-[#0b1530]' : 'bg-[#11141b]'}`}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="truncate font-mono text-xs text-[#9aa4b6]">{title ?? (isPS ? 'Windows PowerShell' : platform === 'cisco-ios' ? 'Router console' : 'student@coderush')}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="mr-1 hidden items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#9aa4b6] sm:inline-flex">
            <FlaskConical className="h-3 w-3" aria-hidden /> Simulated
          </span>
          {onReset && (
            <button type="button" onClick={onReset} className="rounded p-1.5 text-[#9aa4b6] hover:bg-white/5 hover:text-white" aria-label="Reset terminal">
              <RotateCcw className="h-4 w-4" aria-hidden />
            </button>
          )}
          <button type="button" onClick={() => setFull((f) => !f)} className="rounded p-1.5 text-[#9aa4b6] hover:bg-white/5 hover:text-white" aria-label={full ? 'Exit full screen' : 'Full screen'}>
            {full ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>
      {instructions && <div className="border-b border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#c9d2e0]">{instructions}</div>}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-4 py-3 font-mono text-[0.85rem] leading-relaxed ${full ? '' : heightClass}`}
        onClick={() => inputRef.current?.focus()}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {state.lines.map((l) =>
          l.kind === 'input' ? (
            <div key={l.id} className="whitespace-pre-wrap break-words">
              <span className="select-none text-[#7ee787]">{l.prompt}</span> <Highlighted code={l.text} shell={shell} />
            </div>
          ) : (
            <pre
              key={l.id}
              className={`whitespace-pre-wrap break-words font-mono ${
                l.kind === 'error' ? 'text-[#ff9b9b]' : l.kind === 'success' ? 'text-[#7ee787]' : l.kind === 'info' ? 'text-[#8fb7ff]' : 'text-term-fg'
              }`}
            >
              {l.kind === 'error' ? '✗ ' : l.kind === 'success' ? '✓ ' : ''}
              {l.text}
            </pre>
          )
        )}
        <div className="flex items-center gap-2">
          <label htmlFor={id} className="select-none whitespace-nowrap text-[#7ee787]">
            {p}
          </label>
          <input
            id={id}
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_INPUT))}
            onKeyDown={onKeyDown}
            disabled={disabled}
            className="min-w-0 flex-1 bg-transparent font-mono text-term-fg caret-[#7ee787] outline-none placeholder:text-[#5d6779]"
            placeholder={disabled ? '' : 'type a command and press Enter'}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            aria-label="Command input. Press Enter to submit. Arrow keys browse history."
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/5 px-3 py-1.5 text-[11px] text-[#7d879a]">
        <span>Practice simulation. Commands are matched, never executed.</span>
        <button type="button" className="rounded px-2 py-1 font-medium text-[#c9d2e0] hover:bg-white/5 sm:hidden" onClick={submit}>
          Enter
        </button>
      </div>
    </section>
  )
}
