import { useState, useRef, useEffect } from 'react'
import {
  Send,
  X,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { Button } from '../ui'
import { askAITutor } from '../../lib/ai/client'
import type { AIProviderConfig, AITutorMessage, AIPractice } from '../../lib/ai/types'

interface Props {
  open: boolean
  onClose: () => void
  config: AIProviderConfig
  practice: AIPractice
}

const QUICK_PROMPTS = [
  'Explain how this code works step-by-step',
  'Why is this idiom used here instead of a traditional loop?',
  'Show me a simpler example of this concept',
  'What common bugs do beginners make with this syntax?',
]

export function AITutorDrawer({ open, onClose, config, practice }: Props) {
  const [messages, setMessages] = useState<AITutorMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  if (!open) return null

  // Build current exercise context string
  const exerciseContext = `Title: ${practice.title}
Language: ${practice.language}
Difficulty: ${practice.difficulty}
Topic: ${practice.topic}
Content Type: ${practice.type}
Details: ${JSON.stringify(practice.content.data).slice(0, 1500)}`

  const handleSend = async (messageText?: string) => {
    const text = (messageText || input).trim()
    if (!text || loading) return

    setInput('')
    setError(null)

    const userMsg: AITutorMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }

    const nextHistory = [...messages, userMsg]
    setMessages(nextHistory)
    setLoading(true)

    abortControllerRef.current = new AbortController()

    try {
      const response = await askAITutor(
        config,
        practice.language,
        practice.topic,
        exerciseContext,
        nextHistory,
        text,
        abortControllerRef.current.signal
      )

      const assistantMsg: AITutorMessage = {
        id: `msg_ai_${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        // user cancelled
        return
      }
      setError((err as Error).message || 'Failed to get answer from AI tutor.')
    } finally {
      setLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleCancel = () => {
    abortControllerRef.current?.abort()
    setLoading(false)
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface shadow-2xl transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent">
            <Bot className="h-4 w-4" aria-hidden />
          </div>
          <div>
            <h3 className="text-sm font-bold text-fg">AI Tutor</h3>
            <span className="text-[11px] text-fg-subtle">
              Context: {practice.language} • {practice.topic}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-fg-subtle hover:bg-surface-subtle hover:text-fg"
          aria-label="Close AI Tutor"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Context Notice */}
      <div className="border-b border-line bg-surface/50 px-4 py-2 text-[11px] text-fg-subtle flex items-center justify-between">
        <span>Shared context: Active exercise only ({config.model || 'Local Model'})</span>
        <HelpCircle className="h-3 w-3 text-fg-subtle" />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-4 pt-4 text-center">
            <div className="flex justify-center">
              <Sparkles className="h-8 w-8 text-accent/60" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-fg">Ask anything about this exercise</p>
              <p className="text-xs text-fg-subtle max-w-xs mx-auto">
                Get step-by-step explanations, syntax hints, alternative approaches, or simpler analogies.
              </p>
            </div>

            <div className="pt-2 text-left space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-fg-subtle block">
                Quick Questions
              </span>
              {QUICK_PROMPTS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="w-full text-left rounded-lg border border-line bg-surface/60 p-2.5 text-xs text-fg hover:border-accent hover:bg-accent/5 transition duration-fast"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-xs">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-accent text-white font-medium'
                    : 'border border-line bg-surface/80 text-fg whitespace-pre-wrap'
                }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-fg-subtle text-xs">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-accent">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>AI Tutor is thinking...</span>
            <Button size="sm" variant="ghost" onClick={handleCancel} className="text-xs ml-auto">
              Cancel
            </Button>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-warn/30 bg-warn/10 p-3 text-xs text-fg flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-warn shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div>{error}</div>
              <button
                type="button"
                onClick={() => handleSend(messages[messages.length - 1]?.content)}
                className="text-accent underline hover:text-accent-strong"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-line p-3 bg-surface">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask a question or request a hint..."
            className="flex-1 rounded-md border border-line-strong bg-sunken px-3 py-2 text-xs focus:border-accent focus:outline-none"
          />
          <Button type="submit" size="sm" variant="primary" disabled={!input.trim() || loading}>
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
