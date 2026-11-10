import { useState, useEffect, useMemo, useRef } from 'react'
import {
  Sparkles,
  Bot,
  Play,
  RotateCcw,
  Save,
  Trash2,
  Copy,
  Download,
  Upload,
  Search,
  MessageSquare,
  Edit3,
  Sliders,
  ArrowRight,
  BookOpen,
  Keyboard,
  HelpCircle,
  Bug,
  Code2,
} from 'lucide-react'
import { Button, PageHeader, useToast } from '../components/ui'
import { PracticeRunner, sessionFields } from '../components/typing/PracticeRunner'
import type { SessionResult } from '../components/typing/useTypingSession'
import { usePageMeta, useAppUI } from '../app/context'
import { recordSession } from '../lib/storage/store'
import { AIStatusBadge } from '../components/ai/AIStatusBadge'
import { AIConnectionWizard } from '../components/ai/AIConnectionWizard'
import { AIQuizRunner } from '../components/ai/AIQuizRunner'
import { AIDebugRunner } from '../components/ai/AIDebugRunner'
import { AITutorDrawer } from '../components/ai/AITutorDrawer'
import {
  generateAIPractice,
  reviseAIPractice,
  getTypingTargetText,
  testAIConnection,
} from '../../src/lib/ai/client'
import {
  loadAIConfig,
  saveAIPractice,
  getSavedAIPractices,
  deleteAIPractice,
  duplicateAIPractice,
  exportAIPracticeJSON,
  importAIPracticeJSON,
} from '../../src/lib/ai/storage'
import { getNextRecommendations, type AIRecommendation } from '../../src/lib/ai/recommendations'
import type {
  AIPractice,
  AIPracticeType,
  AIDifficulty,
  AIExerciseLength,
  AIProviderConfig,
  AIConnectionStatus,
} from '../../src/lib/ai/types'

const LANGUAGE_SUGGESTIONS = [
  'Python',
  'Rust',
  'TypeScript',
  'JavaScript',
  'Go',
  'C++',
  'C#',
  'Java',
  'Kotlin',
  'Swift',
  'SQL',
  'Bash',
  'PowerShell',
  'Zig',
  'Elixir',
  'Haskell',
]

const PRACTICE_TYPES: {
  id: AIPracticeType
  label: string
  icon: typeof Keyboard
  blurb: string
}[] = [
  { id: 'typing', label: 'Code Typing', icon: Keyboard, blurb: 'Realistic, idiomatic code snippets optimized for typing rhythm and muscle memory.' },
  { id: 'lesson', label: 'Guided Lesson', icon: BookOpen, blurb: 'An overview, key learning objectives, and code steps explained conceptually.' },
  { id: 'quiz', label: 'Multiple-Choice Quiz', icon: HelpCircle, blurb: 'Test your understanding of syntax, output prediction, and common edge cases.' },
  { id: 'debugging', label: 'Debugging Challenge', icon: Bug, blurb: 'Inspect broken code, examine hints, find the bug, and practice the verified fix.' },
  { id: 'completion', label: 'Code Completion', icon: Code2, blurb: 'Fill in the missing critical logic or construct to make the code functional.' },
  { id: 'syntax', label: 'Syntax Drill', icon: Sliders, blurb: 'Densely packed with symbols, brackets, pipes, and language-specific operators.' },
]

export default function AIPracticeStudio() {
  const toast = useToast()
  const { focusMode } = useAppUI()
  usePageMeta('AI Practice Studio', 'Generate custom programming exercises, lessons, and typing drills in any language using your own AI models.')

  // Active mode: 'generate' | 'preview' | 'practice' | 'library'
  const [tab, setTab] = useState<'generate' | 'preview' | 'practice' | 'library'>('generate')

  // AI Configuration & Wizard
  const [config, setConfig] = useState<AIProviderConfig>(loadAIConfig)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<AIConnectionStatus>('not-configured')
  const [isTestingConn, setIsTestingConn] = useState(false)

  // Generator form state
  const [language, setLanguage] = useState('Rust')
  const [difficulty, setDifficulty] = useState<AIDifficulty>('beginner')
  const [practiceType, setPracticeType] = useState<AIPracticeType>('typing')
  const [topic, setTopic] = useState('Ownership and borrowing')
  const [userPrompt, setUserPrompt] = useState('')
  const [length, setLength] = useState<AIExerciseLength>('medium')

  // Active generated practice
  const [activePractice, setActivePractice] = useState<AIPractice | null>(null)
  const [editedTargetText, setEditedTargetText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [revisionPrompt, setRevisionPrompt] = useState('')
  const [isRevising, setIsRevising] = useState(false)
  const [tutorOpen, setTutorOpen] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Library & Search State
  const [library, setLibrary] = useState<AIPractice[]>(getSavedAIPractices)
  const [searchQuery, setSearchQuery] = useState('')
  const [langFilter, setLangFilter] = useState('all')

  // Session results & recommendations
  const [, setLastResult] = useState<SessionResult | null>(null)
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])

  // File import input
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check connection on mount if model is configured
  useEffect(() => {
    if (config.model && config.endpoint) {
      setIsTestingConn(true)
      testAIConnection(config)
        .then((res) => {
          setConnectionStatus(res.status)
        })
        .catch(() => {
          setConnectionStatus('connection-failed')
        })
        .finally(() => setIsTestingConn(false))
    }
  }, [config])

  // Reload library when switching to library tab
  useEffect(() => {
    if (tab === 'library') {
      setLibrary(getSavedAIPractices())
    }
  }, [tab])

  // Handle Generate Request
  const handleGenerate = async () => {
    if (!config.model) {
      setWizardOpen(true)
      toast('Please connect an AI model first before generating practice.', 'warn')
      return
    }

    setIsGenerating(true)
    abortControllerRef.current = new AbortController()

    try {
      const generated = await generateAIPractice(
        config,
        {
          language,
          difficulty,
          practiceType,
          topic,
          userPrompt,
          length,
        },
        abortControllerRef.current.signal
      )

      setActivePractice(generated)
      setEditedTargetText(getTypingTargetText(generated.content))
      setTab('preview')
      toast(`Generated ${generated.type} exercise for ${generated.language}!`, 'success')
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      toast((err as Error).message || 'Generation failed', 'warn')
    } finally {
      setIsGenerating(false)
      abortControllerRef.current = null
    }
  }

  // Handle Conversational Revision
  const handleRevise = async () => {
    if (!activePractice || !revisionPrompt.trim() || isRevising) return

    setIsRevising(true)
    abortControllerRef.current = new AbortController()

    try {
      const revised = await reviseAIPractice(
        config,
        activePractice,
        revisionPrompt.trim(),
        abortControllerRef.current.signal
      )

      setActivePractice(revised)
      setEditedTargetText(getTypingTargetText(revised.content))
      setRevisionPrompt('')
      toast('Lesson revised successfully!', 'success')
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      toast((err as Error).message || 'Revision failed', 'warn')
    } finally {
      setIsRevising(false)
      abortControllerRef.current = null
    }
  }

  // Save current active practice to library
  const handleSaveActive = () => {
    if (!activePractice) return
    // Save with any manual edits applied to typing content
    const toSave: AIPractice = { ...activePractice }
    if (toSave.content.kind === 'typing') {
      toSave.content.data.targetText = editedTargetText
    }
    saveAIPractice(toSave)
    setLibrary(getSavedAIPractices())
    toast('Practice saved to My AI Practices library!', 'success')
  }

  // Handle Practice Session Completion
  const onTypingComplete = (r: SessionResult) => {
    if (!activePractice || r.metrics.keystrokes === 0) return null
    setLastResult(r)

    // Record session into existing CodeRush storage
    recordSession({
      kind: 'ai',
      trackId: activePractice.language.toLowerCase(),
      itemId: `ai:${activePractice.id}`,
      title: `AI: ${activePractice.title}`,
      passed: r.metrics.perfect,
      ...sessionFields(r),
    })

    // Compute tailored recommendations
    const recs = getNextRecommendations(activePractice, r)
    setRecommendations(recs)

    return `Completed ${activePractice.language} practice. WPM: ${r.metrics.wpm}, Accuracy: ${r.metrics.accuracy}%.`
  }

  // Filtered Library Items
  const filteredLibrary = useMemo(() => {
    return library.filter((item) => {
      const matchSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.language.toLowerCase().includes(searchQuery.toLowerCase())

      const matchLang = langFilter === 'all' || item.language.toLowerCase() === langFilter.toLowerCase()
      return matchSearch && matchLang
    })
  }, [library, searchQuery, langFilter])

  // Export JSON
  const handleExport = (practice: AIPractice) => {
    const jsonStr = exportAIPracticeJSON(practice)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `coderush-ai-${practice.language}-${practice.id}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast('Exported practice JSON file.', 'success')
  }

  // Import JSON File
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = String(event.target?.result || '')
        const imported = importAIPracticeJSON(text)
        setLibrary(getSavedAIPractices())
        setActivePractice(imported)
        setEditedTargetText(getTypingTargetText(imported.content))
        setTab('preview')
        toast(`Imported: ${imported.title}`, 'success')
      } catch (err) {
        toast((err as Error).message || 'Import failed', 'warn')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="page space-y-6">
      {/* Page Header */}
      {!focusMode && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            eyebrow="Bring Your Own AI"
            title="AI Practice Studio"
            lead="Connect a local or self-hosted AI model to generate personalized code typing challenges, interactive quizzes, and guided lessons in any language."
          />
          <div className="mt-1 shrink-0">
            <AIStatusBadge
              config={config}
              status={connectionStatus}
              testing={isTestingConn}
              onClick={() => setWizardOpen(true)}
              onTest={() => {
                setIsTestingConn(true)
                testAIConnection(config)
                  .then((res) => {
                    setConnectionStatus(res.status)
                    toast(res.ok ? 'Connection verified!' : res.error || 'Connection failed', res.ok ? 'success' : 'warn')
                  })
                  .finally(() => setIsTestingConn(false))
              }}
            />
          </div>
        </div>
      )}

      {/* Studio Navigation Tabs */}
      {!focusMode && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('generate')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                tab === 'generate'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-fg-subtle hover:bg-surface-subtle hover:text-fg'
              }`}
            >
              <Sparkles className="mr-1.5 inline-block h-3.5 w-3.5" />
              Create Exercise
            </button>
            {activePractice && (
              <>
                <button
                  type="button"
                  onClick={() => setTab('preview')}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    tab === 'preview'
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-fg-subtle hover:bg-surface-subtle hover:text-fg'
                  }`}
                >
                  <Edit3 className="mr-1.5 inline-block h-3.5 w-3.5" />
                  Preview & Edit
                </button>
                <button
                  type="button"
                  onClick={() => setTab('practice')}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    tab === 'practice'
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-fg-subtle hover:bg-surface-subtle hover:text-fg'
                  }`}
                >
                  <Play className="mr-1.5 inline-block h-3.5 w-3.5" />
                  Practice Mode
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setTab('library')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                tab === 'library'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-fg-subtle hover:bg-surface-subtle hover:text-fg'
              }`}
            >
              <BookOpen className="mr-1.5 inline-block h-3.5 w-3.5" />
              My Library ({library.length})
            </button>
          </div>

          {activePractice && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => setTutorOpen(true)}>
                <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-accent" /> AI Tutor
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: GENERATE / COMPOSE */}
      {tab === 'generate' && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Configuration Form */}
          <div className="lg:col-span-2 panel panel-pad space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="text-sm font-bold text-fg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" /> Exercise Composer
              </h2>
              <span className="text-xs text-fg-subtle">Choose any language & topic</span>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label htmlFor="ai-lang" className="text-xs font-semibold text-fg">
                Programming Language
              </label>
              <input
                id="ai-lang"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-md border border-line-strong bg-sunken px-3 py-2 text-sm focus:border-accent focus:outline-none"
                placeholder="e.g. Rust, Go, Python, Zig, Elixir, SQL..."
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {LANGUAGE_SUGGESTIONS.slice(0, 8).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLanguage(l)}
                    className={`rounded border px-2 py-0.5 text-[11px] transition ${
                      language.toLowerCase() === l.toLowerCase()
                        ? 'border-accent bg-accent/15 text-accent font-medium'
                        : 'border-line bg-surface text-fg-subtle hover:text-fg'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Practice Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-fg">Practice Type</label>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {PRACTICE_TYPES.map((pt) => {
                  const Icon = pt.icon
                  const isSelected = practiceType === pt.id
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setPracticeType(pt.id)}
                      className={`flex flex-col items-start gap-1 rounded-lg border p-3 text-left text-xs transition duration-fast ${
                        isSelected
                          ? 'border-accent bg-accent/10 shadow-sm'
                          : 'border-line bg-surface hover:border-line-strong hover:bg-elevated'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-fg">
                        <Icon className="h-3.5 w-3.5 text-accent" />
                        <span>{pt.label}</span>
                      </div>
                      <p className="text-[11px] text-fg-subtle leading-tight">{pt.blurb}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Topic & Specific Request */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="ai-topic" className="text-xs font-semibold text-fg">
                  Topic or Skill
                </label>
                <input
                  id="ai-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-md border border-line-strong bg-sunken px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  placeholder="e.g. Pattern matching, Closures, Goroutines"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label htmlFor="ai-diff" className="text-xs font-semibold text-fg">
                    Difficulty
                  </label>
                  <select
                    id="ai-diff"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as AIDifficulty)}
                    className="w-full rounded-md border border-line-strong bg-sunken px-2 py-2 text-xs focus:border-accent focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="ai-len" className="text-xs font-semibold text-fg">
                    Exercise Length
                  </label>
                  <select
                    id="ai-len"
                    value={length}
                    onChange={(e) => setLength(e.target.value as AIExerciseLength)}
                    className="w-full rounded-md border border-line-strong bg-sunken px-2 py-2 text-xs focus:border-accent focus:outline-none"
                  >
                    <option value="short">Short (5-10 lines)</option>
                    <option value="medium">Medium (12-25 lines)</option>
                    <option value="long">Long (25-40 lines)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Conversational Prompt Box */}
            <div className="space-y-1.5">
              <label htmlFor="ai-prompt" className="text-xs font-semibold text-fg">
                Specific Learning Request (Optional)
              </label>
              <textarea
                id="ai-prompt"
                rows={3}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="w-full rounded-md border border-line-strong bg-sunken p-2.5 text-xs text-fg focus:border-accent focus:outline-none"
                placeholder='e.g. "Focus on error propagation with the ? operator and include a custom struct with comments."'
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-line">
              <div className="text-xs text-fg-subtle">
                Model: <span className="font-mono text-fg">{config.model || 'None connected'}</span>
              </div>
              <Button
                variant="primary"
                onClick={() => handleGenerate()}
                disabled={isGenerating || !language.trim() || !topic.trim()}
              >
                {isGenerating ? (
                  <>
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Generate Practice
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar: Presets & Setup Info */}
          <div className="space-y-4">
            <div className="panel panel-pad space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                Quick Starters
              </h3>
              <div className="space-y-2">
                {[
                  { lang: 'Rust', top: 'Ownership & Borrowing', type: 'typing' as const, diff: 'beginner' as const },
                  { lang: 'Go', top: 'Channels & Goroutines', type: 'typing' as const, diff: 'intermediate' as const },
                  { lang: 'Python', top: 'Decorators and Generators', type: 'lesson' as const, diff: 'intermediate' as const },
                  { lang: 'TypeScript', top: 'Discriminated Unions', type: 'quiz' as const, diff: 'intermediate' as const },
                  { lang: 'C++', top: 'Memory Leaks & Pointers', type: 'debugging' as const, diff: 'advanced' as const },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setLanguage(preset.lang)
                      setTopic(preset.top)
                      setPracticeType(preset.type)
                      setDifficulty(preset.diff)
                    }}
                    className="w-full text-left rounded-lg border border-line bg-surface p-2.5 text-xs hover:border-accent hover:bg-accent/5 transition duration-fast"
                  >
                    <div className="font-semibold text-fg">{preset.lang}: {preset.top}</div>
                    <div className="text-[11px] text-fg-subtle capitalize">
                      {preset.type} • {preset.diff}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel panel-pad space-y-2 text-xs text-fg-subtle">
              <div className="flex items-center gap-1.5 font-semibold text-fg">
                <Bot className="h-4 w-4 text-accent" />
                <span>Local AI Integration</span>
              </div>
              <p className="leading-relaxed">
                CodeRush connects directly from your browser to your local Ollama or LM Studio instance. Your code and prompts never pass through any cloud intermediary.
              </p>
              <button
                type="button"
                onClick={() => setWizardOpen(true)}
                className="text-xs text-accent hover:underline font-medium block pt-1"
              >
                Configure or switch models →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PREVIEW & EDIT */}
      {tab === 'preview' && activePractice && (
        <div className="space-y-6">
          <div className="panel panel-pad space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {activePractice.language} • {activePractice.difficulty} • {activePractice.type}
                </span>
                <h2 className="text-lg font-bold text-fg">{activePractice.title}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="secondary" onClick={handleSaveActive}>
                  <Save className="mr-1.5 h-3.5 w-3.5" /> Save to Library
                </Button>
                <Button size="sm" variant="primary" onClick={() => setTab('practice')}>
                  <Play className="mr-1.5 h-3.5 w-3.5" /> Start Practice
                </Button>
              </div>
            </div>

            {/* Content Preview & Editable Target */}
            {activePractice.content.kind === 'lesson' && (
              <div className="space-y-4">
                <div className="rounded-lg bg-surface/60 p-4 border border-line text-sm text-fg leading-relaxed">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-fg-subtle mb-1">Overview</h3>
                  <p>{activePractice.content.data.overview}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-fg-subtle">Learning Objectives</h3>
                  <ul className="list-disc list-inside text-xs text-fg space-y-1">
                    {activePractice.content.data.learningObjectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Editable Code Box (for typing exercises) */}
            {activePractice.content.kind !== 'quiz' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="edit-target" className="text-xs font-semibold text-fg">
                    Exercise Code (Editable before practice)
                  </label>
                  <span className="text-xs text-fg-subtle">
                    {editedTargetText.split('\n').length} lines • {editedTargetText.length} characters
                  </span>
                </div>
                <textarea
                  id="edit-target"
                  rows={Math.min(18, Math.max(8, editedTargetText.split('\n').length + 2))}
                  value={editedTargetText}
                  onChange={(e) => setEditedTargetText(e.target.value)}
                  className="w-full rounded-lg border border-line bg-sunken p-3 font-mono text-xs text-fg focus:border-accent focus:outline-none"
                  spellCheck={false}
                />
              </div>
            )}

            {/* Conversational Revision Prompt */}
            <div className="rounded-xl border border-line bg-surface/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-fg flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> Request AI Revision
                </span>
                <span className="text-[11px] text-fg-subtle">
                  Ask to make it simpler, add comments, or provide more examples
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={revisionPrompt}
                  onChange={(e) => setRevisionPrompt(e.target.value)}
                  disabled={isRevising}
                  placeholder='e.g. "Add inline explanatory comments" or "Make this shorter"'
                  className="flex-1 rounded-md border border-line-strong bg-sunken px-3 py-1.5 text-xs text-fg focus:border-accent focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRevise()
                  }}
                />
                <Button size="sm" variant="secondary" onClick={handleRevise} disabled={isRevising || !revisionPrompt.trim()}>
                  {isRevising ? <RotateCcw className="h-3.5 w-3.5 animate-spin" /> : 'Revise'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRACTICE MODE */}
      {tab === 'practice' && activePractice && (
        <div className="space-y-6">
          {activePractice.content.kind === 'quiz' ? (
            <AIQuizRunner
              quiz={activePractice.content.data}
              onComplete={(score, total) => {
                toast(`Quiz completed! Score: ${score}/${total}`, 'success')
              }}
            />
          ) : activePractice.content.kind === 'debugging' ? (
            <AIDebugRunner
              exercise={activePractice.content.data}
              onPracticeSolution={() => {
                if (activePractice.content.kind === 'debugging') {
                  setEditedTargetText(activePractice.content.data.solutionCode)
                  setTab('preview')
                }
              }}
            />
          ) : (
            <PracticeRunner
              key={activePractice.id}
              target={editedTargetText}
              label={activePractice.title}
              languageLabel={activePractice.language}
              onComplete={onTypingComplete}
              onNext={() => setTab('generate')}
              nextLabel="New AI Exercise"
            />
          )}

          {/* Post-practice recommendations */}
          {recommendations.length > 0 && (
            <div className="panel panel-pad space-y-4 max-w-3xl mx-auto">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Recommended Next Activities
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex flex-col justify-between rounded-lg border border-line bg-surface p-3 space-y-2 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-fg">{rec.title}</div>
                      <p className="text-[11px] text-fg-subtle mt-1 leading-relaxed">{rec.reason}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setLanguage(rec.request.language)
                        setTopic(rec.request.topic)
                        setPracticeType(rec.request.practiceType)
                        setDifficulty(rec.request.difficulty)
                        setUserPrompt(rec.request.userPrompt || '')
                        setTab('generate')
                        handleGenerate()
                      }}
                    >
                      Try this activity <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MY AI PRACTICES LIBRARY */}
      {tab === 'library' && (
        <div className="space-y-6">
          {/* Controls & Search */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-2 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-fg-subtle" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved practices..."
                  className="w-full rounded-md border border-line bg-sunken pl-9 pr-3 py-1.5 text-xs text-fg focus:border-accent focus:outline-none"
                />
              </div>
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="rounded-md border border-line bg-sunken px-2 py-1.5 text-xs text-fg focus:border-accent focus:outline-none"
              >
                <option value="all">All Languages</option>
                {[...new Set(library.map((item) => item.language))].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileImport}
              />
              <Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-1.5 h-3.5 w-3.5" /> Import JSON
              </Button>
            </div>
          </div>

          {/* Library Cards */}
          {filteredLibrary.length === 0 ? (
            <div className="panel panel-pad text-center py-12 space-y-3">
              <BookOpen className="h-8 w-8 text-fg-subtle mx-auto" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-fg">No practices in library</p>
                <p className="text-xs text-fg-subtle">
                  Generate exercises in the studio and save them to build your personal library.
                </p>
              </div>
              <Button size="sm" variant="primary" onClick={() => setTab('generate')}>
                <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Create Your First Exercise
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLibrary.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-line bg-surface p-4 transition duration-fast hover:border-line-strong hover:shadow-e1 space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-accent uppercase tracking-wider text-[10px]">
                        {item.language} • {item.difficulty}
                      </span>
                      <span className="text-fg-subtle text-[11px] capitalize">{item.type}</span>
                    </div>
                    <h3 className="text-sm font-bold text-fg leading-snug">{item.title}</h3>
                    <p className="text-xs text-fg-subtle line-clamp-2">{item.topic}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-line pt-3">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        setActivePractice(item)
                        setEditedTargetText(getTypingTargetText(item.content))
                        setTab('practice')
                      }}
                    >
                      <Play className="mr-1 h-3 w-3" /> Practice
                    </Button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          const copy = duplicateAIPractice(item.id)
                          if (copy) {
                            setLibrary(getSavedAIPractices())
                            toast('Duplicated practice', 'success')
                          }
                        }}
                        className="rounded p-1.5 text-fg-subtle hover:text-fg hover:bg-surface-subtle"
                        title="Duplicate"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExport(item)}
                        className="rounded p-1.5 text-fg-subtle hover:text-fg hover:bg-surface-subtle"
                        title="Export JSON"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteAIPractice(item.id)
                          setLibrary(getSavedAIPractices())
                          toast('Deleted from library', 'success')
                        }}
                        className="rounded p-1.5 text-fg-subtle hover:text-warn hover:bg-surface-subtle"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Connection Wizard Modal */}
      <AIConnectionWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onSuccess={(newConfig) => {
          setConfig(newConfig)
          setConnectionStatus('connected')
        }}
      />

      {/* Contextual AI Tutor Drawer */}
      {activePractice && (
        <AITutorDrawer
          open={tutorOpen}
          onClose={() => setTutorOpen(false)}
          config={config}
          practice={activePractice}
        />
      )}
    </div>
  )
}
