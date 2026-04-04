import { useRef, useState, useCallback, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import type { editor as MEditor } from 'monaco-editor'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { isTypingComplete, type TypingStatsDisplay } from '../utils/typingMetrics'

export type { TypingStatsDisplay }

interface CodeEditorProps {
  code: string
  language: string
  onTypingChange: (userInput: string, isComplete: boolean) => void
  /** Live metrics from parent (recommended). If omitted, status bar shows 0s until wired. */
  typingStats?: TypingStatsDisplay
  isPaused?: boolean
  onPauseToggle?: () => void
  onReset?: () => void
  readOnly?: boolean
  theme?: string
  showLineNumbers?: boolean
  showStatusBar?: boolean
}

function applyTypingDecorations(
  editor: MEditor.IStandaloneCodeEditor,
  monaco: typeof import('monaco-editor'),
  typed: string,
  target: string,
  previousIds: string[]
): string[] {
  const model = editor.getModel()
  if (!model) return previousIds

  const decorations: MEditor.IModelDeltaDecoration[] = []
  const n = Math.min(typed.length, target.length)

  for (let i = 0; i < n; i++) {
    if (typed[i] !== target[i]) {
      const start = model.getPositionAt(i)
      const end = model.getPositionAt(i + 1)
      decorations.push({
        range: new monaco.Range(
          start.lineNumber,
          start.column,
          end.lineNumber,
          end.column
        ),
        options: {
          className: 'typing-error-char',
          isWholeLine: false,
        },
      })
    }
  }

  if (typed.length < target.length) {
    const start = model.getPositionAt(typed.length)
    const end = model.getPositionAt(typed.length + 1)
    decorations.push({
      range: new monaco.Range(
        start.lineNumber,
        start.column,
        end.lineNumber,
        end.column
      ),
      options: {
        className: 'typing-current-char',
        isWholeLine: false,
      },
    })
  }

  return editor.deltaDecorations(previousIds, decorations)
}

const CodeEditor = ({
  code,
  language,
  onTypingChange,
  typingStats,
  isPaused = false,
  onPauseToggle,
  onReset,
  readOnly = false,
  theme = 'vs-dark',
  showLineNumbers = true,
  showStatusBar = true,
}: CodeEditorProps) => {
  const editorRef = useRef<MEditor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<typeof import('monaco-editor') | null>(null)
  const decorationIdsRef = useRef<string[]>([])
  const onTypingChangeRef = useRef(onTypingChange)
  const codeRef = useRef(code)

  const [userInput, setUserInput] = useState('')
  const [currentLine, setCurrentLine] = useState(1)
  const [currentColumn, setCurrentColumn] = useState(1)

  useEffect(() => {
    onTypingChangeRef.current = onTypingChange
  }, [onTypingChange])

  useEffect(() => {
    codeRef.current = code
  }, [code])

  const stats = typingStats ?? { wpm: 0, accuracy: 100, mistakes: 0, cpm: 0 }

  useEffect(() => {
    const ed = editorRef.current
    if (!ed) return
    ed.updateOptions({ readOnly: readOnly || isPaused })
  }, [isPaused, readOnly])

  useEffect(() => {
    const monaco = monacoRef.current
    if (!monaco) return
    monaco.editor.setTheme(theme === 'monokai' ? 'coderush-monokai' : 'coderush-dark')
  }, [theme])

  const handleEditorDidMount = useCallback(
    (editor: MEditor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
      editorRef.current = editor
      monacoRef.current = monaco

      editor.updateOptions({
        readOnly: readOnly || isPaused,
        lineNumbers: showLineNumbers ? 'on' : 'off',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        fontSize: 14,
        fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
        cursorBlinking: 'blink',
        cursorStyle: 'line',
        renderWhitespace: 'selection',
        renderControlCharacters: true,
        bracketPairColorization: { enabled: true },
        guides: {
          bracketPairs: true,
          indentation: true,
        },
      })

      monaco.editor.defineTheme('coderush-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
          { token: 'keyword', foreground: '569CD6' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'B5CEA8' },
          { token: 'regexp', foreground: 'D16969' },
          { token: 'operator', foreground: 'D4D4D4' },
          { token: 'namespace', foreground: '4EC9B0' },
          { token: 'type', foreground: '4EC9B0' },
          { token: 'struct', foreground: '4EC9B0' },
          { token: 'class', foreground: '4EC9B0' },
          { token: 'interface', foreground: '4EC9B0' },
          { token: 'parameter', foreground: '9CDCFE' },
          { token: 'variable', foreground: '9CDCFE' },
          { token: 'function', foreground: 'DCDCAA' },
          { token: 'method', foreground: 'DCDCAA' },
          { token: 'property', foreground: '9CDCFE' },
          { token: 'error', foreground: 'F44747', background: 'F4474710' },
        ],
        colors: {
          'editor.background': '#0a0a0a',
          'editor.foreground': '#ffffff',
          'editorLineNumber.foreground': '#858585',
          'editorLineNumber.activeForeground': '#c6c6c6',
          'editor.selectionBackground': '#264f78',
          'editor.selectionHighlightBackground': '#add6ff26',
          'editorCursor.foreground': '#00d4ff',
          'editorWhitespace.foreground': '#404040',
          'editorIndentGuide.background': '#404040',
          'editorIndentGuide.activeBackground': '#707070',
          'editorBracketMatch.background': '#0e639c50',
          'editorBracketMatch.border': '#888888',
        },
      })

      monaco.editor.defineTheme('coderush-monokai', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '75715E', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'F92672' },
          { token: 'string', foreground: 'E6DB74' },
          { token: 'number', foreground: 'AE81FF' },
          { token: 'regexp', foreground: 'E6DB74' },
          { token: 'operator', foreground: 'F8F8F2' },
          { token: 'namespace', foreground: '66D9EF' },
          { token: 'type', foreground: '66D9EF' },
          { token: 'struct', foreground: '66D9EF' },
          { token: 'class', foreground: 'A6E22E' },
          { token: 'interface', foreground: 'A6E22E' },
          { token: 'parameter', foreground: 'FD971F' },
          { token: 'variable', foreground: 'F8F8F2' },
          { token: 'function', foreground: 'A6E22E' },
          { token: 'method', foreground: 'A6E22E' },
          { token: 'property', foreground: 'F8F8F2' },
          { token: 'error', foreground: 'F44747', background: 'F4474710' },
        ],
        colors: {
          'editor.background': '#272822',
          'editor.foreground': '#F8F8F2',
          'editorLineNumber.foreground': '#75715E',
          'editorLineNumber.activeForeground': '#F8F8F2',
          'editor.selectionBackground': '#49483E',
          'editor.selectionHighlightBackground': '#49483E50',
          'editorCursor.foreground': '#F8F8F0',
          'editorWhitespace.foreground': '#3B3A32',
          'editorIndentGuide.background': '#3B3A32',
          'editorIndentGuide.activeBackground': '#75715E',
          'editorBracketMatch.background': '#0e639c50',
          'editorBracketMatch.border': '#888888',
        },
      })

      monaco.editor.setTheme(theme === 'monokai' ? 'coderush-monokai' : 'coderush-dark')

      editor.onDidChangeCursorPosition((e) => {
        setCurrentLine(e.position.lineNumber)
        setCurrentColumn(e.position.column)
      })

      if (!readOnly) {
        editor.onDidChangeModelContent(() => {
          const content = editor.getValue()
          const target = codeRef.current
          setUserInput(content)
          decorationIdsRef.current = applyTypingDecorations(
            editor,
            monaco,
            content,
            target,
            decorationIdsRef.current
          )
          const complete = isTypingComplete(target, content)
          onTypingChangeRef.current(content, complete)
        })
      }
    },
    [readOnly, isPaused, showLineNumbers, theme]
  )

  const handleReset = () => {
    if (editorRef.current) {
      const editor = editorRef.current
      const monaco = monacoRef.current
      editor.setValue('')
      setUserInput('')
      setCurrentLine(1)
      setCurrentColumn(1)
      if (monaco) {
        decorationIdsRef.current = applyTypingDecorations(
          editor,
          monaco,
          '',
          codeRef.current,
          decorationIdsRef.current
        )
      }
    }
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
                className="rounded p-1 text-ink-subtle transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
              </button>
            )}
            {onReset && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded p-1 text-ink-subtle transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>
        </div>

        <div className="h-96 min-h-[16rem]">
          <Editor
            height="100%"
            language={language}
            value={readOnly ? code : userInput}
            onMount={handleEditorDidMount}
            theme={theme === 'monokai' ? 'coderush-monokai' : 'coderush-dark'}
            options={{
              readOnly: readOnly || isPaused,
              lineNumbers: showLineNumbers ? 'on' : 'off',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              fontSize: 14,
              fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
              cursorBlinking: 'blink',
              cursorStyle: 'line',
              renderWhitespace: 'selection',
              renderControlCharacters: true,
              bracketPairColorization: { enabled: true },
              guides: {
                bracketPairs: true,
                indentation: true,
              },
              automaticLayout: true,
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

      <style>{`
        .typing-error-char {
          background-color: rgba(244, 71, 71, 0.22) !important;
          border-bottom: 2px solid #f44747 !important;
        }
        .typing-current-char {
          background-color: rgba(34, 211, 238, 0.18) !important;
          box-shadow: inset 0 -2px 0 0 #22d3ee !important;
        }
      `}</style>
    </div>
  )
}

export default CodeEditor
