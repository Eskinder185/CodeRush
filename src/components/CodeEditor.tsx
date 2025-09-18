import { useRef, useEffect, useState, useCallback } from 'react'
import { Editor } from '@monaco-editor/react'
import { motion } from 'framer-motion'
import { Settings, Play, Pause, RotateCcw } from 'lucide-react'

interface CodeEditorProps {
  code: string
  language: string
  onTypingChange: (userInput: string, isComplete: boolean) => void
  onStatsUpdate: (stats: { wpm: number; accuracy: number; mistakes: number }) => void
  isPaused?: boolean
  onPauseToggle?: () => void
  onReset?: () => void
  readOnly?: boolean
  theme?: string
  showLineNumbers?: boolean
  showStatusBar?: boolean
}

const CodeEditor = ({
  code,
  language,
  onTypingChange,
  onStatsUpdate,
  isPaused = false,
  onPauseToggle,
  onReset,
  readOnly = false,
  theme = 'vs-dark',
  showLineNumbers = true,
  showStatusBar = true
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null)
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [currentLine, setCurrentLine] = useState(1)
  const [currentColumn, setCurrentColumn] = useState(1)
  const [mistakes, setMistakes] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor

    // Configure editor options
    editor.updateOptions({
      readOnly: readOnly,
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
        indentation: true
      }
    })

    // Add custom theme
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
        { token: 'error', foreground: 'F44747', background: 'F4474710' }
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
        'editorBracketMatch.border': '#888888'
      }
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
        { token: 'error', foreground: 'F44747', background: 'F4474710' }
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
        'editorBracketMatch.border': '#888888'
      }
    })

    // Set the theme
    monaco.editor.setTheme(theme === 'monokai' ? 'coderush-monokai' : 'coderush-dark')

    // Handle cursor position changes
    editor.onDidChangeCursorPosition((e: any) => {
      setCurrentLine(e.position.lineNumber)
      setCurrentColumn(e.position.column)
    })

    // Handle content changes for typing practice
    if (!readOnly) {
      editor.onDidChangeModelContent(() => {
        const content = editor.getValue()
        setUserInput(content)
        
        if (!isTyping && content.length > 0) {
          setIsTyping(true)
          setStartTime(Date.now())
        }
        
        // Calculate accuracy and mistakes
        const correctChars = code.slice(0, content.length).split('').filter((char, index) => 
          char === content[index]
        ).length
        
        const currentMistakes = content.length - correctChars
        const currentAccuracy = content.length > 0 ? (correctChars / content.length) * 100 : 100
        
        setMistakes(currentMistakes)
        setAccuracy(Math.round(currentAccuracy))
        
        // Calculate WPM
        if (startTime) {
          const timeElapsed = (Date.now() - startTime) / 1000 / 60 // minutes
          const words = content.split(' ').length
          const currentWpm = timeElapsed > 0 ? Math.round(words / timeElapsed) : 0
          setWpm(currentWpm)
          
          onStatsUpdate({ wpm: currentWpm, accuracy: currentAccuracy, mistakes: currentMistakes })
        }
        
        // Check if complete
        const isComplete = content.length === code.length && content === code
        onTypingChange(content, isComplete)
        
        // Highlight errors
        highlightErrors(editor, content, code)
      })
    }
  }, [code, language, readOnly, theme, showLineNumbers, isTyping, startTime, onTypingChange, onStatsUpdate])

  const highlightErrors = (editor: any, userInput: string, targetCode: string) => {
    const model = editor.getModel()
    if (!model) return

    // Clear existing markers
    editor.deltaDecorations([], [])

    const decorations: any[] = []
    
    // Find and highlight errors
    for (let i = 0; i < userInput.length && i < targetCode.length; i++) {
      if (userInput[i] !== targetCode[i]) {
        const position = model.getPositionAt(i)
        decorations.push({
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column + 1
          },
          options: {
            className: 'error-highlight',
            isWholeLine: false,
            glyphMarginClassName: 'error-glyph'
          }
        })
      }
    }

    editor.deltaDecorations([], decorations)
  }

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue('')
      setUserInput('')
      setIsTyping(false)
      setStartTime(null)
      setMistakes(0)
      setWpm(0)
      setAccuracy(100)
      setCurrentLine(1)
      setCurrentColumn(1)
    }
    onReset?.()
  }

  const getLanguageDisplayName = (lang: string) => {
    const languageMap: Record<string, string> = {
      'python': 'Python',
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'java': 'Java',
      'cpp': 'C++',
      'html': 'HTML',
      'css': 'CSS',
      'sql': 'SQL',
      'bash': 'Bash',
      'go': 'Go'
    }
    return languageMap[lang] || lang.toUpperCase()
  }

  return (
    <div className="relative">
      {/* Editor Container */}
      <div className="border border-dark-border rounded-lg overflow-hidden">
        {/* Editor Header */}
        <div className="bg-dark-card border-b border-dark-border px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-400 font-mono">
              {getLanguageDisplayName(language)} • {code.split('\n').length} lines
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {onPauseToggle && (
              <button
                onClick={onPauseToggle}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            )}
            {onReset && (
              <button
                onClick={handleReset}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="h-96">
          <Editor
            height="100%"
            language={language}
            value={readOnly ? code : userInput}
            onMount={handleEditorDidMount}
            theme={theme === 'monokai' ? 'coderush-monokai' : 'coderush-dark'}
            options={{
              readOnly: readOnly,
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
                indentation: true
              },
              automaticLayout: true
            }}
          />
        </div>

        {/* Status Bar */}
        {showStatusBar && (
          <div className="bg-dark-card border-t border-dark-border px-4 py-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Ln {currentLine}, Col {currentColumn}</span>
              <span>UTF-8</span>
              <span>{getLanguageDisplayName(language)}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{userInput.length}/{code.length} chars</span>
              <span>{wpm} WPM</span>
              <span>{accuracy}% acc</span>
              <span>{mistakes} errors</span>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for error highlighting */}
      <style>{`
        .error-highlight {
          background-color: rgba(244, 71, 71, 0.2) !important;
          border-bottom: 2px solid #f44747 !important;
        }
        .error-glyph {
          background-color: #f44747 !important;
        }
      `}</style>
    </div>
  )
}

export default CodeEditor
