import { useState, useEffect } from 'react'
import {
  Cpu,
  Server,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Sliders,
} from 'lucide-react'
import { Dialog, Button, useToast } from '../ui'
import { testAIConnection } from '../../lib/ai/client'
import { loadAIConfig, saveAIConfig } from '../../lib/ai/storage'
import type {
  AIProviderType,
  AIProviderConfig,
  AIConnectionTestResult,
} from '../../lib/ai/types'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess?: (config: AIProviderConfig) => void
}

const PROVIDERS: {
  id: AIProviderType
  name: string
  blurb: string
  defaultEndpoint: string
  icon: typeof Cpu
  isLocal: boolean
}[] = [
  {
    id: 'ollama',
    name: 'Ollama',
    blurb: 'Local open-source models (Llama 3, Mistral, Qwen, DeepSeek). Native Ollama adapter.',
    defaultEndpoint: 'http://localhost:11434',
    icon: Cpu,
    isLocal: true,
  },
  {
    id: 'lmstudio',
    name: 'LM Studio',
    blurb: 'Local OpenAI-compatible inference with full GUI. Run GGUF models easily on your PC.',
    defaultEndpoint: 'http://localhost:1234/v1',
    icon: Server,
    isLocal: true,
  },
  {
    id: 'custom-openai',
    name: 'Custom OpenAI-Compatible',
    blurb: 'Connect to vLLM, LocalAI, text-generation-webui, or self-hosted API servers.',
    defaultEndpoint: 'http://localhost:8000/v1',
    icon: Sliders,
    isLocal: false,
  },
  {
    id: 'gateway',
    name: 'User-Owned Secure Gateway',
    blurb: 'Your private HTTPS reverse proxy/gateway for cloud models with rate limiting and auth.',
    defaultEndpoint: 'https://my-ai-gateway.internal/v1',
    icon: Cloud,
    isLocal: false,
  },
]

export function AIConnectionWizard({ open, onClose, onSuccess }: Props) {
  const toast = useToast()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [config, setConfig] = useState<AIProviderConfig>(loadAIConfig)
  const [testing, setTesting] = useState(false)
  const [discoveredModels, setDiscoveredModels] = useState<string[]>([])
  const [testResult, setTestResult] = useState<AIConnectionTestResult | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    if (open) {
      const current = loadAIConfig()
      setConfig(current)
      if (current.model) {
        setStep(2)
      } else {
        setStep(1)
      }
    }
  }, [open])

  const selectProvider = (providerId: AIProviderType) => {
    const prov = PROVIDERS.find((p) => p.id === providerId)!
    setConfig((c) => ({
      ...c,
      provider: providerId,
      endpoint: prov.defaultEndpoint,
      model: '',
    }))
    setTestResult(null)
    setDiscoveredModels([])
    setStep(2)
  }

  const handleTestConnection = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const res = await testAIConnection(config)
      setTestResult(res)
      if (res.ok) {
        setDiscoveredModels(res.models)
        if (res.models.length > 0 && !config.model) {
          setConfig((c) => ({ ...c, model: res.models[0] }))
        }
        toast(`Connected! Found ${res.models.length} available models.`, 'success')
      } else {
        toast(res.error || 'Connection failed', 'warn')
      }
    } catch (err) {
      setTestResult({
        ok: false,
        status: 'connection-failed',
        models: [],
        error: (err as Error).message,
      })
    } finally {
      setTesting(false)
    }
  }

  const handleSave = () => {
    if (!config.model.trim()) {
      toast('Please enter or select a model identifier.', 'warn')
      return
    }
    saveAIConfig(config)
    toast(`AI settings saved. Model: ${config.model}`, 'success')
    onSuccess?.(config)
    onClose()
  }

  const currentProvider = PROVIDERS.find((p) => p.id === config.provider) || PROVIDERS[0]

  return (
    <Dialog open={open} onClose={onClose} title="Bring Your Own AI (BYOAI) Setup" wide>
      {/* Wizard Step Indicator */}
      <div className="mb-6 flex items-center justify-between border-b border-line pb-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`font-medium ${step === 1 ? 'text-accent' : 'text-fg-subtle hover:text-fg'}`}
          >
            1. Select Provider
          </button>
          <span className="text-fg-muted">/</span>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`font-medium ${step === 2 ? 'text-accent' : 'text-fg-subtle hover:text-fg'}`}
          >
            2. Configure & Test
          </button>
          <span className="text-fg-muted">/</span>
          <button
            type="button"
            onClick={() => setStep(3)}
            disabled={!config.model}
            className={`font-medium ${step === 3 ? 'text-accent' : 'text-fg-subtle hover:text-fg disabled:opacity-50'}`}
          >
            3. Finalize
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-fg-subtle">
          <ShieldCheck className="h-3.5 w-3.5 text-ok" aria-hidden />
          <span>Local-first & Private</span>
        </div>
      </div>

      {/* Step 1: Choose Provider */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-fg-muted">
            Connect an AI model running locally on your hardware or through a self-hosted API gateway. CodeRush sends requests directly from your browser with zero intermediate servers.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {PROVIDERS.map((p) => {
              const Icon = p.icon
              const isSelected = config.provider === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectProvider(p.id)}
                  className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition duration-fast interactive ${
                    isSelected ? 'border-accent bg-accent/10 shadow-e1' : 'border-line bg-surface hover:border-line-strong hover:bg-elevated'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent">
                        <Icon className="h-4 w-4" aria-hidden />
                      </div>
                      <span className="font-semibold text-fg">{p.name}</span>
                    </div>
                    {p.isLocal && (
                      <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-medium text-accent uppercase tracking-wide">
                        Local
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-fg-muted leading-relaxed">{p.blurb}</p>
                </button>
              )
            })}
          </div>

          <div className="mt-4 rounded-lg border border-line bg-surface/50 p-3 text-xs text-fg-subtle">
            <span className="font-medium text-fg">Privacy Guarantee:</span> Your models and practice prompts stay completely under your control. API keys (if used) are stored strictly in browser session memory and never included in backups or exports.
          </div>
        </div>
      )}

      {/* Step 2: Configure & Test */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <currentProvider.icon className="h-5 w-5 text-accent" aria-hidden />
              <h3 className="font-semibold text-fg">{currentProvider.name} Configuration</h3>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-accent hover:underline"
            >
              Switch provider
            </button>
          </div>

          {/* Endpoint URL Input */}
          <div className="space-y-1.5">
            <label htmlFor="ai-endpoint" className="text-xs font-semibold text-fg">
              API Endpoint URL
            </label>
            <div className="flex gap-2">
              <input
                id="ai-endpoint"
                type="text"
                value={config.endpoint}
                onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
                className="flex-1 rounded-md border border-line-strong bg-sunken px-3 py-2 font-mono text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder={currentProvider.defaultEndpoint}
              />
              <Button
                onClick={handleTestConnection}
                disabled={testing || !config.endpoint.trim()}
                variant="primary"
                className="shrink-0"
              >
                {testing ? (
                  <>
                    <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" aria-hidden /> Testing...
                  </>
                ) : (
                  'Test & Discover'
                )}
              </Button>
            </div>
            <p className="text-xs text-fg-subtle">Default: {currentProvider.defaultEndpoint}</p>
          </div>

          {/* Test Result / Status Display */}
          {testResult && (
            <div
              className={`rounded-lg border p-4 text-xs transition duration-fast ${
                testResult.ok ? 'border-ok/40 bg-ok/10 text-fg' : 'border-warn/40 bg-warn/10 text-fg'
              }`}
            >
              <div className="flex items-start gap-2">
                {testResult.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden />
                )}
                <div className="flex-1 space-y-1">
                  <div className="font-semibold">
                    {testResult.ok
                      ? `Connected successfully! (${testResult.latencyMs}ms)`
                      : testResult.error || 'Connection failed'}
                  </div>
                  {testResult.troubleshooting && (
                    <p className="text-fg-muted leading-relaxed whitespace-pre-line">
                      {testResult.troubleshooting}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Model Selection */}
          <div className="space-y-1.5">
            <label htmlFor="ai-model" className="text-xs font-semibold text-fg">
              Model Identifier
            </label>
            {discoveredModels.length > 0 ? (
              <div className="space-y-2">
                <select
                  id="ai-model"
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  className="w-full rounded-md border border-line-strong bg-sunken px-3 py-2 text-sm focus:border-accent focus:outline-none"
                >
                  <option value="">Select a discovered model...</option>
                  {discoveredModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-xs text-fg-subtle">
                  <span>Found {discoveredModels.length} models from your local service.</span>
                  <button
                    type="button"
                    onClick={() => setDiscoveredModels([])}
                    className="text-accent hover:underline"
                  >
                    Enter custom name
                  </button>
                </div>
              </div>
            ) : (
              <input
                id="ai-model"
                type="text"
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full rounded-md border border-line-strong bg-sunken px-3 py-2 font-mono text-sm focus:border-accent focus:outline-none"
                placeholder={
                  config.provider === 'ollama'
                    ? 'e.g. llama3:latest, mistral, codellama, qwen2.5-coder'
                    : 'e.g. local-model, meta-llama-3-8b-instruct'
                }
              />
            )}
          </div>

          {/* Optional Auth Header / Token for Custom or Gateway */}
          {!currentProvider.isLocal && (
            <div className="space-y-1.5">
              <label htmlFor="ai-token" className="text-xs font-semibold text-fg">
                API Key or Gateway Bearer Token (Optional)
              </label>
              <input
                id="ai-token"
                type="password"
                value={config.apiKey || ''}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="w-full rounded-md border border-line-strong bg-sunken px-3 py-2 font-mono text-sm focus:border-accent focus:outline-none"
                placeholder="sk-... or gateway token (kept in session memory only)"
              />
              <p className="text-[11px] text-fg-subtle">
                Stored in temporary browser session memory only. Never written to permanent storage or exported.
              </p>
            </div>
          )}

          {/* Advanced Settings Toggle */}
          <div className="border-t border-line pt-3">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-xs text-fg-subtle hover:text-fg"
            >
              <Sliders className="h-3 w-3" aria-hidden />
              <span>{showAdvanced ? 'Hide advanced generation settings' : 'Show advanced generation settings'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 rounded-lg bg-surface/50 p-3 text-xs">
                <div>
                  <label htmlFor="ai-temp" className="font-medium text-fg">Temperature: {config.temperature ?? 0.3}</label>
                  <input
                    id="ai-temp"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={config.temperature ?? 0.3}
                    onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                    className="w-full mt-1 accent-[rgb(var(--accent))]"
                  />
                  <p className="text-[10px] text-fg-subtle">Lower values (0.2 - 0.4) produce more deterministic, precise code syntax.</p>
                </div>
                <div>
                  <label htmlFor="ai-timeout" className="font-medium text-fg">Request Timeout</label>
                  <select
                    id="ai-timeout"
                    value={config.timeoutMs ?? 30000}
                    onChange={(e) => setConfig({ ...config, timeoutMs: parseInt(e.target.value, 10) })}
                    className="w-full mt-1 rounded border border-line bg-surface p-1 text-xs"
                  >
                    <option value="15000">15 seconds</option>
                    <option value="30000">30 seconds (Default)</option>
                    <option value="60000">60 seconds (Large models)</option>
                    <option value="120000">2 minutes</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-3">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep(3)}
              disabled={!config.model.trim()}
            >
              Next: Review & Save <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Finalize & Open Studio */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-ok/40 bg-ok/10 p-4 text-fg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-ok" aria-hidden />
              <h3 className="font-semibold text-fg">Model Ready to Connect</h3>
            </div>
            <p className="mt-1 text-xs text-fg-muted">
              CodeRush is ready to communicate with your AI model.
            </p>
          </div>

          <div className="rounded-lg border border-line bg-surface p-4 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-line">
              <span className="text-fg-subtle">Provider</span>
              <span className="font-medium text-fg capitalize">{config.provider}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-line">
              <span className="text-fg-subtle">Endpoint</span>
              <span className="font-mono text-fg">{config.endpoint}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-line">
              <span className="text-fg-subtle">Model</span>
              <span className="font-mono font-medium text-fg">{config.model}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-fg-subtle">Execution Mode</span>
              <span className="font-medium text-fg">
                {currentProvider.isLocal ? 'Local Machine (Browser Fetch)' : 'Remote Gateway'}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-surface/50 p-3 text-xs text-fg-subtle space-y-1">
            <div className="font-medium text-fg">What happens next?</div>
            <p>
              You can now open the <strong>AI Practice Studio</strong>, pick any programming language, and generate personalized lessons, typing challenges, debugging drills, and quizzes.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={() => setStep(2)}>
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save & Open Studio
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
