import type {
  AIProviderConfig,
  AIConnectionTestResult,
  AIConnectionStatus,
} from './types'

/**
 * Normalizes endpoint URL, removing trailing slashes.
 */
export function normalizeEndpoint(url: string): string {
  return url.trim().replace(/\/+$/, '')
}

/**
 * Detects common network/CORS/mixed content error conditions in browser fetch.
 */
export function analyzeFetchError(err: unknown, endpoint: string, provider: string): {
  status: AIConnectionStatus
  error: string
  troubleshooting: string
} {
  const msg = (err as Error)?.message || String(err)
  const isTypeError = err instanceof TypeError
  const isLocalHttp = endpoint.startsWith('http://localhost') || endpoint.startsWith('http://127.0.0.1')

  if (msg.includes('aborted') || msg.includes('timeout')) {
    return {
      status: 'connection-failed',
      error: 'Request timed out after waiting for model response.',
      troubleshooting: 'Check if the model is currently loading or if your machine is running low on RAM/GPU memory. You can increase the timeout in AI settings.',
    }
  }

  // Local endpoint CORS or network restriction
  if (isTypeError && isLocalHttp) {
    return {
      status: 'cors-blocked',
      error: `Browser blocked connection to ${endpoint} (CORS or local network access).`,
      troubleshooting:
        provider === 'ollama'
          ? 'Ollama requires CORS origin authorization. On Windows, set environment variable OLLAMA_ORIGINS="*" (or restart Ollama with OLLAMA_ORIGINS="https://eskinder185.github.io,http://localhost:*"). On macOS/Linux, run: OLLAMA_ORIGINS="*" ollama serve.'
          : 'LM Studio requires CORS to be enabled. Open LM Studio -> Local Server -> toggle "Enable CORS" and allow all origins (*). Also check Chrome "Local Network Access" permissions.',
    }
  }

  if (isTypeError) {
    return {
      status: 'cors-blocked',
      error: `Could not reach ${endpoint}. The server may be offline or blocking Cross-Origin Resource Sharing (CORS).`,
      troubleshooting:
        'Verify that the service is running and listening on this port. Ensure CORS headers (Access-Control-Allow-Origin) are enabled on your server.',
    }
  }

  if (msg.includes('401') || msg.includes('403') || msg.includes('Unauthorized') || msg.includes('Forbidden')) {
    return {
      status: 'auth-required',
      error: 'Authentication failed: Invalid or missing API key.',
      troubleshooting: 'Please check your endpoint token / API key configuration in AI Settings.',
    }
  }

  if (msg.includes('404') || msg.includes('model not found')) {
    return {
      status: 'model-unavailable',
      error: 'Model or endpoint route not found (404).',
      troubleshooting: 'Ensure the selected model is downloaded and installed, and verify the API endpoint path.',
    }
  }

  return {
    status: 'connection-failed',
    error: msg || 'Failed to connect to AI provider.',
    troubleshooting: 'Check that your local or remote server is active and accessible from your network.',
  }
}

/**
 * Ollama Adapter
 */
export class OllamaAdapter {
  private endpoint: string
  private timeoutMs: number

  constructor(endpoint: string, timeoutMs = 30000) {
    this.endpoint = normalizeEndpoint(endpoint || 'http://localhost:11434')
    this.timeoutMs = timeoutMs
  }

  async testConnection(): Promise<AIConnectionTestResult> {
    const start = performance.now()
    try {
      const models = await this.listModels()
      const latencyMs = Math.round(performance.now() - start)
      if (models.length === 0) {
        return {
          ok: true,
          status: 'connected',
          models: [],
          latencyMs,
          error: 'Connected to Ollama, but no models were found.',
          troubleshooting: 'Run "ollama pull <model>" in your terminal (e.g. "ollama pull llama3" or "ollama pull mistral") to download a model.',
        }
      }
      return {
        ok: true,
        status: 'connected',
        models,
        latencyMs,
      }
    } catch (err) {
      const analysis = analyzeFetchError(err, this.endpoint, 'ollama')
      return {
        ok: false,
        status: analysis.status,
        models: [],
        error: analysis.error,
        troubleshooting: analysis.troubleshooting,
      }
    }
  }

  async listModels(signal?: AbortSignal): Promise<string[]> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeoutMs)
    if (signal) {
      signal.addEventListener('abort', () => controller.abort())
    }

    try {
      const res = await fetch(`${this.endpoint}/api/tags`, {
        method: 'GET',
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (!res.ok) {
        throw new Error(`Ollama returned status ${res.status}: ${res.statusText}`)
      }

      const data = await res.json()
      if (data && Array.isArray(data.models)) {
        return data.models.map((m: { name?: string; model?: string }) => m.name || m.model || '').filter(Boolean)
      }
      return []
    } finally {
      clearTimeout(timer)
    }
  }

  async generateChat(
    model: string,
    messages: { role: string; content: string }[],
    options?: { temperature?: number; formatJson?: boolean; signal?: AbortSignal }
  ): Promise<string> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeoutMs)
    if (options?.signal) {
      options.signal.addEventListener('abort', () => controller.abort())
    }

    try {
      const body: Record<string, unknown> = {
        model,
        messages,
        stream: false,
        options: {
          temperature: options?.temperature ?? 0.3,
        },
      }

      if (options?.formatJson) {
        body.format = 'json'
      }

      const res = await fetch(`${this.endpoint}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (!res.ok) {
        const errorText = await res.text().catch(() => '')
        throw new Error(`Ollama error (${res.status}): ${errorText || res.statusText}`)
      }

      const data = await res.json()
      if (data?.message?.content) {
        return data.message.content
      }
      throw new Error('Ollama returned empty or missing message content.')
    } finally {
      clearTimeout(timer)
    }
  }
}

/**
 * OpenAI-Compatible Adapter (for LM Studio, Custom endpoints, and Gateways)
 */
export class OpenAICompatibleAdapter {
  private endpoint: string
  private apiKey?: string
  private timeoutMs: number
  private providerName: string

  constructor(endpoint: string, apiKey?: string, timeoutMs = 30000, providerName = 'lmstudio') {
    this.endpoint = normalizeEndpoint(endpoint || 'http://localhost:1234/v1')
    this.apiKey = apiKey
    this.timeoutMs = timeoutMs
    this.providerName = providerName
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`
    }
    return headers
  }

  async testConnection(): Promise<AIConnectionTestResult> {
    const start = performance.now()
    try {
      const models = await this.listModels()
      const latencyMs = Math.round(performance.now() - start)
      return {
        ok: true,
        status: 'connected',
        models,
        latencyMs,
      }
    } catch (err) {
      const analysis = analyzeFetchError(err, this.endpoint, this.providerName)
      return {
        ok: false,
        status: analysis.status,
        models: [],
        error: analysis.error,
        troubleshooting: analysis.troubleshooting,
      }
    }
  }

  async listModels(signal?: AbortSignal): Promise<string[]> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeoutMs)
    if (signal) {
      signal.addEventListener('abort', () => controller.abort())
    }

    try {
      // Try /models first (standard for /v1/models or gateway /models)
      let url = `${this.endpoint}/models`
      if (!this.endpoint.endsWith('/v1') && !this.endpoint.includes('/v1/')) {
        // Also support endpoints without /v1
        url = `${this.endpoint}/v1/models`
      }

      const res = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        signal: controller.signal,
      }).catch(async (e) => {
        // Fallback: try direct /models if /v1/models failed
        if (url.includes('/v1/models')) {
          return fetch(`${this.endpoint}/models`, {
            method: 'GET',
            headers: this.getHeaders(),
            signal: controller.signal,
          })
        }
        throw e
      })

      clearTimeout(timer)

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}: ${res.statusText}`)
      }

      const data = await res.json()
      if (data && Array.isArray(data.data)) {
        return data.data.map((m: { id?: string }) => m.id || '').filter(Boolean)
      }
      return []
    } finally {
      clearTimeout(timer)
    }
  }

  async generateChat(
    model: string,
    messages: { role: string; content: string }[],
    options?: { temperature?: number; formatJson?: boolean; signal?: AbortSignal }
  ): Promise<string> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeoutMs)
    if (options?.signal) {
      options.signal.addEventListener('abort', () => controller.abort())
    }

    let url = `${this.endpoint}/chat/completions`
    if (!this.endpoint.endsWith('/v1') && !this.endpoint.includes('/v1/')) {
      url = `${this.endpoint}/v1/chat/completions`
    }

    const payload: Record<string, unknown> = {
      model,
      messages,
      temperature: options?.temperature ?? 0.3,
    }

    if (options?.formatJson) {
      payload.response_format = { type: 'json_object' }
    }

    try {
      let res = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      // Graceful fallback: If the model server rejected response_format: { type: 'json_object' } (HTTP 400),
      // retry once without response_format and rely on our strict system prompt JSON instruction
      if (res.status === 400 && options?.formatJson) {
        delete payload.response_format
        res = await fetch(url, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
      }

      clearTimeout(timer)

      if (!res.ok) {
        const errText = await res.text().catch(() => '')
        throw new Error(`OpenAI-compatible server error (${res.status}): ${errText || res.statusText}`)
      }

      const data = await res.json()
      const content = data?.choices?.[0]?.message?.content
      if (content) {
        return content
      }
      throw new Error('OpenAI-compatible server returned empty or missing completion content.')
    } finally {
      clearTimeout(timer)
    }
  }
}

/**
 * Creates the appropriate adapter based on config.
 */
export function createAdapter(config: AIProviderConfig) {
  switch (config.provider) {
    case 'ollama':
      return new OllamaAdapter(config.endpoint, config.timeoutMs)
    case 'lmstudio':
      return new OpenAICompatibleAdapter(config.endpoint, config.apiKey, config.timeoutMs, 'lmstudio')
    case 'custom-openai':
      return new OpenAICompatibleAdapter(config.endpoint, config.apiKey, config.timeoutMs, 'custom-openai')
    case 'gateway':
      return new OpenAICompatibleAdapter(config.endpoint, config.apiKey, config.timeoutMs, 'gateway')
    default:
      throw new Error(`Unsupported AI provider: ${(config as AIProviderConfig).provider}`)
  }
}
