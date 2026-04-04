import { useState, useMemo } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { charStatusAt, isTypingComplete, type TypingStatsDisplay } from '../utils/typingMetrics'

interface SimpleCodeEditorProps {
  code: string
  language: string
  onTypingChange: (userInput: string, isComplete: boolean) => void
  typingStats?: TypingStatsDisplay
  isPaused?: boolean
  onPauseToggle?: () => void
  onReset?: () => void
  readOnly?: boolean
  /** Ignored in fallback UI; accepted for parity with CodeEditor. */
  theme?: string
  showLineNumbers?: boolean
  showStatusBar?: boolean
}

function statusClass(status: ReturnType<typeof charStatusAt>): string {
  switch (status) {
    case 'correct':
      return 'bg-green-500/15 text-green-100'
    case 'incorrect':
      return 'bg-red-500/25 text-red-200 underline decoration-red-400 decoration-2 underline-offset-2'
    case 'current':
      return 'bg-cyan-500/20 text-white ring-1 ring-cyan-400/60 ring-inset'
    default:
      return 'text-ink-subtle/90'
  }
}

const SimpleCodeEditor = ({
  code,
  language,
  onTypingChange,
  typingStats,
  isPaused = false,
  onPauseToggle,
  onReset,
  readOnly = false,
  theme: _theme,
  showLineNumbers = true,
  showStatusBar = true,
}: SimpleCodeEditorProps) => {
  const [userInput, setUserInput] = useState('')

  const stats = typingStats ?? { wpm: 0, accuracy: 100, mistakes: 0, cpm: 0 }

  const { currentLine, currentColumn } = useMemo(() => {
    const lines = userInput.split('\n')
    const line = lines.length
    const col = (lines[lines.length - 1]?.length ?? 0) + 1
    return { currentLine: line, currentColumn: col }
  }, [userInput])

  const lineNumberPrefix = useMemo(() => {
    if (!showLineNumbers) return null
    const lines = code.split('\n')
    const pad = String(lines.length).length
    return lines.map((_, i) => (
      <div
        key={i}
        className="select-none pr-3 text-right text-ink-subtle/70 tabular-nums"
        style={{ minWidth: `${pad + 1}ch` }}
      >
        {i + 1}
      </div>
    ))
  }, [code, showLineNumbers])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (readOnly || isPaused) return
    const v = e.target.value
    setUserInput(v)
    onTypingChange(v, isTypingComplete(code, v))
  }

  const handleReset = () => {
    setUserInput('')
    onTypingChange('', false)
    onReset?.()
  }

  const getLanguageDisplayName = (lang: string) => {
    const languageMap: Record<string, string> = {
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
    }
    return languageMap[lang] || lang.toUpperCase()
  }

  const disabled = readOnly || isPaused

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg border border-dark-border">
        <div className="flex items-center justify-between border-b border-dark-border bg-dark-card px-4 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span className="font-mono text-sm text-ink-subtle">
              {getLanguageDisplayName(language)} • {code.split('\n').length} lines
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {onPauseToggle && (
              <button
                type="button"
                onClick={onPauseToggle}
                className="rounded p-1 text-ink-subtle transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
              </button>
            )}
            {onReset && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded p-1 text-ink-subtle transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue"
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        </div>

        <div className="flex bg-[#0a0a0a]">
          {showLineNumbers && (
            <div className="flex shrink-0 flex-col border-r border-dark-border py-3 pl-2 font-mono text-xs leading-[1.6]">
              {lineNumberPrefix}
            </div>
          )}
          <pre
            className="max-h-64 min-h-[8rem] flex-1 overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-sm leading-[1.6] text-white"
            style={{
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
            }}
            aria-hidden
          >
            {Array.from(code).map((ch, i) => (
              <span key={i} className={`rounded-sm px-px ${statusClass(charStatusAt(code, userInput, i))}`}>
                {ch}
              </span>
            ))}
          </pre>
        </div>

        <div className="border-t border-dark-border">
          <textarea
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type the code above to start practicing..."
            className="h-40 w-full resize-none border-0 bg-dark-bg p-4 font-mono text-sm text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neon-blue/40 disabled:cursor-not-allowed disabled:opacity-60"
            spellCheck={false}
            disabled={disabled}
            style={{
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          />
        </div>

        {showStatusBar && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dark-border bg-dark-card px-4 py-2 text-xs text-ink-subtle">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                Ln {currentLine}, Col {currentColumn}
              </span>
              <span>UTF-8</span>
              <span>{getLanguageDisplayName(language)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 tabular-nums">
              <span>
                {userInput.length}/{code.length} chars
              </span>
              <span>{stats.cpm} CPM</span>
              <span>{stats.wpm} WPM</span>
              <span>{stats.accuracy}% acc</span>
              <span>{stats.mistakes} err</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleCodeEditor
