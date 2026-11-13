import { getData } from '../storage/store'
import { LIMITS } from '../storage/schema'
import type { AIProviderConfig, AIPractice } from './types'

const AI_CONFIG_KEY = 'coderush:ai:config'
const AI_SESSION_KEY_KEY = 'coderush:ai:session_key'

export const DEFAULT_AI_CONFIG: AIProviderConfig = {
  provider: 'ollama',
  endpoint: 'http://localhost:11434',
  model: '',
  temperature: 0.3,
  timeoutMs: 30000,
}

/**
 * Loads the active AI configuration.
 * Non-sensitive fields come from localStorage; any transient API key comes from sessionStorage.
 */
export function loadAIConfig(): AIProviderConfig {
  let config: AIProviderConfig = { ...DEFAULT_AI_CONFIG }

  try {
    const saved = localStorage.getItem(AI_CONFIG_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      config = {
        ...config,
        provider: parsed.provider || config.provider,
        endpoint: parsed.endpoint || config.endpoint,
        model: parsed.model || '',
        displayName: parsed.displayName,
        temperature: typeof parsed.temperature === 'number' ? parsed.temperature : config.temperature,
        timeoutMs: typeof parsed.timeoutMs === 'number' ? parsed.timeoutMs : config.timeoutMs,
      }
    }
  } catch {
    // fallback to defaults
  }

  // Restore transient API key for custom/gateway from sessionStorage if present
  try {
    const sessionKey = sessionStorage.getItem(AI_SESSION_KEY_KEY)
    if (sessionKey) {
      config.apiKey = sessionKey
    }
  } catch {
    // sessionStorage disabled or unavailable
  }

  return config
}

/**
 * Saves non-sensitive configuration to localStorage.
 * If an apiKey is provided, it is stored strictly in sessionStorage (never localStorage, never in exports).
 */
export function saveAIConfig(config: AIProviderConfig): void {
  const nonSensitive = {
    provider: config.provider,
    endpoint: config.endpoint,
    model: config.model,
    displayName: config.displayName,
    temperature: config.temperature,
    timeoutMs: config.timeoutMs,
  }

  try {
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(nonSensitive))
  } catch {
    // localStorage full or disabled
  }

  try {
    if (config.apiKey) {
      sessionStorage.setItem(AI_SESSION_KEY_KEY, config.apiKey)
    } else {
      sessionStorage.removeItem(AI_SESSION_KEY_KEY)
    }
  } catch {
    // sessionStorage disabled
  }
}

/**
 * Retrieves all saved AI practices from the local store.
 */
export function getSavedAIPractices(): AIPractice[] {
  const data = getData()
  return data.aiPractices || []
}

/**
 * Retrieves a single saved AI practice by ID.
 */
export function getAIPracticeById(id: string): AIPractice | undefined {
  const list = getSavedAIPractices()
  return list.find((p) => p.id === id)
}

/**
 * Updates AppData in localStorage with an updated list of AI practices.
 */
function updateStoredAIPractices(practices: AIPractice[]): void {
  const data = getData()
  data.aiPractices = practices.slice(0, LIMITS.aiPractices)
  try {
    localStorage.setItem('coderush:data:v3', JSON.stringify(data))
  } catch (err) {
    console.error('Failed to save AI practice to storage:', err)
  }
}

/**
 * Saves or updates an AI practice in the library.
 */
export function saveAIPractice(practice: AIPractice): void {
  const current = getSavedAIPractices()
  const idx = current.findIndex((p) => p.id === practice.id)
  const now = new Date().toISOString()

  let next: AIPractice[]
  if (idx >= 0) {
    next = [...current]
    next[idx] = { ...practice, updatedAt: now }
  } else {
    next = [{ ...practice, createdAt: practice.createdAt || now, updatedAt: now }, ...current]
  }

  updateStoredAIPractices(next)
}

/**
 * Updates fields of an existing AI practice.
 */
export function updateAIPractice(id: string, updates: Partial<AIPractice>): void {
  const current = getSavedAIPractices()
  const idx = current.findIndex((p) => p.id === id)
  if (idx < 0) return

  const next = [...current]
  next[idx] = {
    ...next[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  updateStoredAIPractices(next)
}

/**
 * Deletes a practice by ID.
 */
export function deleteAIPractice(id: string): void {
  const current = getSavedAIPractices()
  const next = current.filter((p) => p.id !== id)
  updateStoredAIPractices(next)
}

/**
 * Duplicates a practice, creating a new record with a new ID.
 */
export function duplicateAIPractice(id: string): AIPractice | null {
  const current = getSavedAIPractices()
  const item = current.find((p) => p.id === id)
  if (!item) return null

  const now = new Date().toISOString()
  const copy: AIPractice = {
    ...JSON.parse(JSON.stringify(item)),
    id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: `${item.title} (Copy)`,
    createdAt: now,
    updatedAt: now,
  }

  saveAIPractice(copy)
  return copy
}

/**
 * Exports a single practice as a clean, secret-free JSON string.
 */
export function exportAIPracticeJSON(practice: AIPractice): string {
  const safeExport = {
    app: 'CodeRush',
    exportKind: 'ai-practice',
    version: 1,
    exportedAt: new Date().toISOString(),
    practice: {
      id: practice.id,
      type: practice.type,
      title: practice.title,
      language: practice.language,
      difficulty: practice.difficulty,
      topic: practice.topic,
      content: practice.content,
      userPrompt: practice.userPrompt,
      createdAt: practice.createdAt,
      updatedAt: practice.updatedAt,
    },
  }
  return JSON.stringify(safeExport, null, 2)
}

/**
 * Imports a practice from a JSON string, validating structure.
 */
export function importAIPracticeJSON(jsonStr: string): AIPractice {
  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(jsonStr)
  } catch {
    throw new Error('Invalid JSON file format.')
  }

  const p = (parsed.practice || parsed) as Record<string, unknown>
  if (!p || typeof p !== 'object' || !p.title || !p.language || !p.content) {
    throw new Error('The imported file is missing required CodeRush practice fields.')
  }

  const now = new Date().toISOString()
  const pType = typeof p.type === 'string' ? p.type : 'typing'
  const pDiff = typeof p.difficulty === 'string' && ['beginner', 'intermediate', 'advanced'].includes(p.difficulty) ? p.difficulty : 'intermediate'

  const imported: AIPractice = {
    id: `ai_import_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: pType as AIPractice['type'],
    title: String(p.title).slice(0, 150),
    language: String(p.language).slice(0, 50),
    difficulty: pDiff as AIPractice['difficulty'],
    topic: String(p.topic || 'Imported Practice').slice(0, 150),
    content: p.content as AIPractice['content'],
    userPrompt: typeof p.userPrompt === 'string' ? p.userPrompt : undefined,
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : now,
    updatedAt: now,
  }

  saveAIPractice(imported)
  return imported
}
