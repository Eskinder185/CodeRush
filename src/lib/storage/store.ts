/**
 * Browser-local progress store. One in-memory copy, persisted to localStorage on every change,
 * exposed to React through useSyncExternalStore. Nothing leaves the device.
 */
import { useSyncExternalStore } from 'react'
import { LEGACY_KEY, LIMITS, PREVIOUS_KEY, SCHEMA_VERSION, STORAGE_KEY, emptyData, type AppData, type PracticeSession } from './schema'
import { loadFromStrings, mergeData, parseImport, type ImportResult } from './migrate'

type Listener = () => void
const listeners = new Set<Listener>()
let current: AppData | null = null
let lastError: string | null = null

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function load(): AppData {
  const { data, migrated } = loadFromStrings(read(STORAGE_KEY), read(PREVIOUS_KEY), read(LEGACY_KEY))
  if (migrated) persist(data)
  return data
}

function persist(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    lastError = null
  } catch {
    // Quota exceeded or storage disabled: keep working in memory and surface the problem.
    lastError = 'Progress could not be saved in this browser. Export your data to keep it.'
  }
}

export function getData(): AppData {
  if (!current) current = load()
  return current
}

export function getStorageError(): string | null {
  return lastError
}

function update(fn: (draft: AppData) => void) {
  const next: AppData = JSON.parse(JSON.stringify(getData()))
  fn(next)
  current = next
  persist(next)
  listeners.forEach((l) => l())
}

function subscribe(l: Listener) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useAppData(): AppData {
  return useSyncExternalStore(subscribe, getData, getData)
}

/** For tests: drop the cached copy so the next read reloads from localStorage. */
export function resetStoreCache() {
  current = null
}

export function localDateKey(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

let seq = 0
export function newId(prefix: string): string {
  seq = (seq + 1) % 1e6
  return `${prefix}:${Date.now().toString(36)}:${seq.toString(36)}:${Math.random().toString(36).slice(2, 7)}`
}

export function recordSession(s: Omit<PracticeSession, 'id' | 'completedAt'> & { completedAt?: string }): PracticeSession {
  const session: PracticeSession = {
    ...s,
    id: newId(s.kind),
    completedAt: s.completedAt ?? new Date().toISOString(),
    wpmSeries: s.wpmSeries?.slice(0, LIMITS.wpmSeries),
  }
  update((d) => {
    d.sessions.push(session)
    if (d.sessions.length > LIMITS.sessions) d.sessions.splice(0, d.sessions.length - LIMITS.sessions)
  })
  return session
}

function touchCommand(d: AppData, id: string, now: Date) {
  const p = d.commands[id] ?? {
    typedBestAccuracy: 0,
    typedPerfect: 0,
    recallAttempts: 0,
    recallSuccess: 0,
    successDays: [],
    lastPracticed: now.toISOString(),
  }
  p.lastPracticed = now.toISOString()
  d.commands[id] = p
  d.recent = [id, ...d.recent.filter((r) => r !== id)].slice(0, LIMITS.recent)
  return p
}

function addSuccessDay(days: string[], now: Date): string[] {
  const key = localDateKey(now)
  return days.includes(key) ? days : [...days, key].sort().slice(-LIMITS.successDays)
}

/** A typed command attempt. Only perfect attempts count toward mastery. */
export function recordCommandTyped(id: string, accuracy: number, perfect: boolean, now = new Date()) {
  update((d) => {
    const p = touchCommand(d, id, now)
    if (perfect) {
      p.typedPerfect += 1
      p.typedBestAccuracy = Math.max(p.typedBestAccuracy, accuracy)
      p.successDays = addSuccessDay(p.successDays, now)
    }
  })
}

export function recordRecall(id: string, success: boolean, confusedWith?: string, now = new Date()) {
  update((d) => {
    const p = touchCommand(d, id, now)
    p.recallAttempts += 1
    p.lastRecallCorrect = success
    if (success) {
      p.recallSuccess += 1
      p.successDays = addSuccessDay(p.successDays, now)
    }
    if (!success && confusedWith && confusedWith !== id) {
      d.confusions.push({ expected: id, got: confusedWith, at: now.toISOString() })
      if (d.confusions.length > LIMITS.confusions) d.confusions.splice(0, d.confusions.length - LIMITS.confusions)
    }
  })
}

export function recordQuiz(moduleId: string, score: number) {
  update((d) => {
    const cur = d.quizzes[moduleId]
    d.quizzes[moduleId] = {
      best: Math.max(cur?.best ?? 0, score),
      last: score,
      attempts: (cur?.attempts ?? 0) + 1,
      lastAt: new Date().toISOString(),
    }
  })
}

export function recordScenario(id: string, firstTryRatio: number) {
  update((d) => {
    const cur = d.scenarios[id]
    d.scenarios[id] = {
      completed: true,
      attempts: (cur?.attempts ?? 0) + 1,
      bestFirstTry: Math.max(cur?.bestFirstTry ?? 0, firstTryRatio),
      completedAt: new Date().toISOString(),
    }
  })
}

export function recordMission(id: string, score: number) {
  update((d) => {
    const cur = d.missions[id]
    d.missions[id] = {
      attempts: (cur?.attempts ?? 0) + 1,
      bestScore: Math.max(cur?.bestScore ?? 0, Math.min(100, Math.max(0, Math.round(score)))),
      completedAt: new Date().toISOString(),
    }
  })
}

export function recordDaily(date: string, result: { score: number; wpm: number; accuracy: number }) {
  update((d) => {
    const cur = d.daily[date]
    if (!cur || result.score > cur.score) d.daily[date] = { ...result, completedAt: new Date().toISOString() }
  })
}

export function recordSubnet(correct: boolean) {
  update((d) => {
    d.subnet.attempts += 1
    if (correct) d.subnet.correct += 1
  })
}

export function toggleFavorite(id: string) {
  update((d) => {
    d.favorites = d.favorites.includes(id) ? d.favorites.filter((f) => f !== id) : [...d.favorites, id]
  })
}

export function setLastVisited(path: string, title: string) {
  const cur = getData().lastVisited
  if (cur?.path === path) return
  update((d) => {
    d.lastVisited = { path, title, at: new Date().toISOString() }
  })
}

export function clearAllData() {
  update((d) => {
    Object.assign(d, emptyData())
  })
}

export function exportDocument(): string {
  return JSON.stringify(
    { app: 'CodeRush', schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(), data: getData() },
    null,
    2
  )
}

export function downloadExport() {
  const blob = new Blob([exportDocument()], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `coderush-progress-${localDateKey()}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function importText(text: string, mode: 'merge' | 'replace'): ImportResult {
  const r = parseImport(text)
  if (!r.ok || !r.data) return r
  const incoming = r.data
  update((d) => {
    const next = mode === 'merge' ? mergeData(d, incoming) : incoming
    Object.assign(d, next)
  })
  return r
}
