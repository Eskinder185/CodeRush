import { describe, expect, it, beforeEach } from 'vitest'
import {
  saveAIConfig,
  loadAIConfig,
  saveAIPractice,
  getSavedAIPractices,
  getAIPracticeById,
  updateAIPractice,
  deleteAIPractice,
  duplicateAIPractice,
  exportAIPracticeJSON,
  importAIPracticeJSON,
} from './storage'
import type { AIPractice } from './types'

describe('AI Storage & Library', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('saves non-sensitive config to localStorage and API key to sessionStorage', () => {
    saveAIConfig({
      provider: 'custom-openai',
      endpoint: 'https://gateway.example.com/v1',
      model: 'deepseek-v3',
      apiKey: 'super-secret-token',
      temperature: 0.25,
      timeoutMs: 45000,
    })

    const rawLocal = localStorage.getItem('coderush:ai:config') || ''
    expect(rawLocal).toContain('deepseek-v3')
    expect(rawLocal).not.toContain('super-secret-token') // SECRET NOT IN LOCALSTORAGE

    const rawSession = sessionStorage.getItem('coderush:ai:session_key')
    expect(rawSession).toBe('super-secret-token')

    const loaded = loadAIConfig()
    expect(loaded.provider).toBe('custom-openai')
    expect(loaded.model).toBe('deepseek-v3')
    expect(loaded.apiKey).toBe('super-secret-token')
  })

  it('saves, retrieves, updates, and deletes AI practices in library', () => {
    const practice: AIPractice = {
      id: 'test_p1',
      type: 'typing',
      title: 'Rust Structs',
      language: 'Rust',
      difficulty: 'beginner',
      topic: 'Structs',
      content: {
        kind: 'typing',
        data: {
          type: 'typing',
          instructions: 'Type struct',
          targetText: 'struct User { name: String }',
          explanation: 'Named fields',
          hints: [],
        },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    saveAIPractice(practice)
    expect(getSavedAIPractices()).toHaveLength(1)
    expect(getAIPracticeById('test_p1')?.title).toBe('Rust Structs')

    // Update
    updateAIPractice('test_p1', { title: 'Rust Structs & Enums' })
    expect(getAIPracticeById('test_p1')?.title).toBe('Rust Structs & Enums')

    // Duplicate
    const copy = duplicateAIPractice('test_p1')
    expect(copy).not.toBeNull()
    expect(copy?.id).not.toBe('test_p1')
    expect(copy?.title).toBe('Rust Structs & Enums (Copy)')
    expect(getSavedAIPractices()).toHaveLength(2)

    // Delete
    deleteAIPractice('test_p1')
    expect(getSavedAIPractices()).toHaveLength(1)
    expect(getAIPracticeById('test_p1')).toBeUndefined()
  })

  it('exports clean JSON without any secrets or sensitive connection credentials', () => {
    const practice: AIPractice = {
      id: 'test_export_p',
      type: 'typing',
      title: 'Go Goroutines',
      language: 'Go',
      difficulty: 'intermediate',
      topic: 'Concurrency',
      content: {
        kind: 'typing',
        data: {
          type: 'typing',
          instructions: 'Type concurrency',
          targetText: 'go doWork()',
          explanation: 'spawn goroutine',
          hints: [],
        },
      },
      createdAt: '2026-11-10T12:00:00.000Z',
      updatedAt: '2026-11-10T12:00:00.000Z',
    }

    const exported = exportAIPracticeJSON(practice)
    expect(exported).toContain('Go Goroutines')
    expect(exported).toContain('CodeRush')
    expect(exported).not.toContain('apiKey')
    expect(exported).not.toContain('endpoint')

    // Import exported practice
    const imported = importAIPracticeJSON(exported)
    expect(imported.title).toBe('Go Goroutines')
    expect(imported.language).toBe('Go')
    expect(imported.content.kind).toBe('typing')
  })
})
