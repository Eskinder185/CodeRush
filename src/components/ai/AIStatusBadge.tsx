import { Bot, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import type { AIProviderConfig, AIConnectionStatus } from '../../lib/ai/types'

interface Props {
  config: AIProviderConfig
  status?: AIConnectionStatus
  testing?: boolean
  onClick?: () => void
  onTest?: () => void
}

export function AIStatusBadge({ config, status = 'not-configured', testing, onClick, onTest }: Props) {
  const isConnected = status === 'connected' && Boolean(config.model)
  const isLocal = config.provider === 'ollama' || config.provider === 'lmstudio'

  const providerNames: Record<string, string> = {
    ollama: 'Ollama',
    lmstudio: 'LM Studio',
    'custom-openai': 'Custom AI',
    gateway: 'AI Gateway',
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs backdrop-blur-sm">
      <span className="flex items-center gap-1.5 font-medium">
        <Bot className="h-3.5 w-3.5 text-accent" aria-hidden />
        <span className="text-fg-subtle">Model:</span>
        {isConnected ? (
          <span className="text-fg font-mono">
            {config.model} ({providerNames[config.provider] || config.provider})
          </span>
        ) : (
          <span className="text-fg-subtle italic">None connected</span>
        )}
      </span>

      <span className="h-3 w-px bg-line" aria-hidden />

      {testing ? (
        <span className="inline-flex items-center gap-1 text-accent animate-pulse">
          <RefreshCw className="h-3 w-3 animate-spin" aria-hidden /> Testing...
        </span>
      ) : isConnected ? (
        <span className="inline-flex items-center gap-1 text-ok">
          <CheckCircle2 className="h-3 w-3" aria-hidden />
          <span>{isLocal ? 'Local' : 'Remote'}</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-warn">
          <AlertCircle className="h-3 w-3" aria-hidden />
          <span>{status === 'cors-blocked' ? 'CORS issue' : 'Setup needed'}</span>
        </span>
      )}

      {onClick && (
        <button
          type="button"
          onClick={onClick}
          className="ml-1 text-accent underline-offset-2 hover:underline focus:outline-none"
        >
          {isConnected ? 'Change' : 'Configure'}
        </button>
      )}

      {onTest && isConnected && (
        <button
          type="button"
          onClick={onTest}
          disabled={testing}
          className="text-fg-subtle hover:text-fg focus:outline-none"
          title="Re-test connection"
        >
          <RefreshCw className={`h-3 w-3 ${testing ? 'animate-spin' : ''}`} aria-hidden />
        </button>
      )}
    </div>
  )
}
