import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  OllamaAdapter,
  OpenAICompatibleAdapter,
  analyzeFetchError,
  normalizeEndpoint,
  createAdapter,
} from './adapters'

describe('AI Adapters', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('normalizes endpoint URLs correctly', () => {
    expect(normalizeEndpoint('http://localhost:11434/')).toBe('http://localhost:11434')
    expect(normalizeEndpoint('http://localhost:1234/v1///')).toBe('http://localhost:1234/v1')
  })

  it('creates the right adapter type for provider configuration', () => {
    const ollama = createAdapter({ provider: 'ollama', endpoint: 'http://localhost:11434', model: 'llama3' })
    expect(ollama).toBeInstanceOf(OllamaAdapter)

    const lmstudio = createAdapter({ provider: 'lmstudio', endpoint: 'http://localhost:1234/v1', model: 'model' })
    expect(lmstudio).toBeInstanceOf(OpenAICompatibleAdapter)

    const custom = createAdapter({ provider: 'custom-openai', endpoint: 'http://localhost:8000/v1', model: 'm' })
    expect(custom).toBeInstanceOf(OpenAICompatibleAdapter)
  })

  describe('OllamaAdapter', () => {
    it('discovers models via /api/tags', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          models: [{ name: 'llama3:latest' }, { name: 'qwen2.5-coder:7b' }],
        }),
      } as Response)

      const adapter = new OllamaAdapter('http://localhost:11434')
      const models = await adapter.listModels()
      expect(models).toEqual(['llama3:latest', 'qwen2.5-coder:7b'])
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/tags',
        expect.objectContaining({ method: 'GET' })
      )
    })

    it('generates chat responses with format: json option', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          message: {
            role: 'assistant',
            content: '{"type":"typing","targetText":"let a = 1;"}',
          },
        }),
      } as Response)

      const adapter = new OllamaAdapter('http://localhost:11434')
      const result = await adapter.generateChat(
        'llama3',
        [{ role: 'user', content: 'hello' }],
        { formatJson: true, temperature: 0.2 }
      )

      expect(result).toBe('{"type":"typing","targetText":"let a = 1;"}')
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/chat',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            model: 'llama3',
            messages: [{ role: 'user', content: 'hello' }],
            stream: false,
            options: { temperature: 0.2 },
            format: 'json',
          }),
        })
      )
    })

    it('handles test connection returning latency and models', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ models: [{ name: 'mistral' }] }),
      } as Response)

      const adapter = new OllamaAdapter('http://localhost:11434')
      const test = await adapter.testConnection()
      expect(test.ok).toBe(true)
      expect(test.status).toBe('connected')
      expect(test.models).toEqual(['mistral'])
      expect(test.latencyMs).toBeTypeOf('number')
    })
  })

  describe('OpenAICompatibleAdapter', () => {
    it('sends Authorization header when apiKey is supplied', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'test response' } }],
        }),
      } as Response)

      const adapter = new OpenAICompatibleAdapter('http://localhost:1234/v1', 'secret-key-123')
      await adapter.generateChat('gpt-model', [{ role: 'user', content: 'hi' }])

      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:1234/v1/chat/completions',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer secret-key-123',
          }),
        })
      )
    })

    it('falls back if server returns HTTP 400 on response_format json_object', async () => {
      let callCount = 0
      globalThis.fetch = vi.fn().mockImplementation(async (_url, opts) => {
        callCount++
        const body = JSON.parse(opts.body)
        if (body.response_format) {
          // Reject JSON mode with 400
          return { status: 400, ok: false, text: async () => 'Unsupported response_format' }
        }
        // Second call without response_format succeeds
        return {
          status: 200,
          ok: true,
          json: async () => ({ choices: [{ message: { content: '{"answer":"ok"}' } }] }),
        }
      })

      const adapter = new OpenAICompatibleAdapter('http://localhost:1234/v1')
      const result = await adapter.generateChat('model', [{ role: 'user', content: 'hi' }], { formatJson: true })
      expect(result).toBe('{"answer":"ok"}')
      expect(callCount).toBe(2)
    })

    it('lists models from /v1/models', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [{ id: 'local-llama-3' }, { id: 'deepseek-coder' }],
        }),
      } as Response)

      const adapter = new OpenAICompatibleAdapter('http://localhost:1234/v1')
      const models = await adapter.listModels()
      expect(models).toEqual(['local-llama-3', 'deepseek-coder'])
    })
  })

  describe('analyzeFetchError', () => {
    it('detects timeout and cancellation errors', () => {
      const err = new Error('The operation was aborted due to timeout')
      const analysis = analyzeFetchError(err, 'http://localhost:11434', 'ollama')
      expect(analysis.status).toBe('connection-failed')
      expect(analysis.error).toContain('timed out')
    })

    it('identifies CORS / local network mixed content failures with clear instructions', () => {
      const typeErr = new TypeError('Failed to fetch')
      const analysis = analyzeFetchError(typeErr, 'http://localhost:11434', 'ollama')
      expect(analysis.status).toBe('cors-blocked')
      expect(analysis.troubleshooting).toContain('OLLAMA_ORIGINS')
    })

    it('identifies 401 unauthorized errors', () => {
      const err = new Error('Server returned 401 Unauthorized')
      const analysis = analyzeFetchError(err, 'https://gateway.com/v1', 'gateway')
      expect(analysis.status).toBe('auth-required')
      expect(analysis.error).toContain('Authentication failed')
    })

    it('identifies 404 model not found errors', () => {
      const err = new Error('model not found')
      const analysis = analyzeFetchError(err, 'http://localhost:11434', 'ollama')
      expect(analysis.status).toBe('model-unavailable')
    })
  })
})
