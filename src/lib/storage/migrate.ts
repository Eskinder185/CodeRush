/**
 * Validation and migration for stored and imported progress.
 * Every record is checked field by field. Invalid records are dropped and counted, never guessed.
 */
import { emptyData, LIMITS, SCHEMA_VERSION, type AppData, type PracticeSession, type SessionKind } from './schema'

const KINDS: SessionKind[] = ['lesson', 'guided', 'speed', 'accuracy', 'command', 'syntax', 'timed', 'custom', 'daily', 'weakness']

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v)
const str = (v: unknown): v is string => typeof v === 'string' && v.length > 0
const validDate = (v: unknown): v is string => typeof v === 'string' && !Number.isNaN(Date.parse(v))
const clampPct = (n: number) => Math.min(100, Math.max(0, n))

/** Deterministic id so the same legacy record imported twice is not duplicated. */
export function legacyId(lessonId: string, completedAt: string): string {
  return `v1:${lessonId}:${Date.parse(completedAt)}`
}

/**
 * Convert one CodeRush 1.x row. Version 1 saved a row only when the learner reached the end,
 * and "mistakes" counted wrong characters left in the final text, so mistakes === 0 means
 * the attempt was an exact match. That is the only case migrated as passed.
 */
export function migrateLegacyRow(row: unknown): PracticeSession | null {
  if (!isObj(row)) return null
  const { language, lessonId, wpm, accuracy, timeSpent } = row
  const completedAt = row.completedAt
  if (!str(language) || !str(lessonId) || !num(wpm) || !num(accuracy) || !num(timeSpent)) return null
  if (!validDate(completedAt)) return null
  const iso = new Date(completedAt).toISOString()
  const mistakes = num(row.mistakes) ? row.mistakes : 0
  const totalChars = num(row.totalChars) ? row.totalChars : 0
  const correctChars = num(row.correctChars) ? row.correctChars : 0
  return {
    id: legacyId(lessonId, iso),
    kind: 'lesson',
    trackId: language,
    itemId: lessonId,
    completedAt: iso,
    durationSec: Math.max(0, Math.round(timeSpent)),
    wpm: Math.max(0, Math.round(wpm)),
    rawWpm: num(row.cpm) ? Math.round(row.cpm / 5) : Math.max(0, Math.round(wpm)),
    accuracy: clampPct(accuracy),
    correctChars,
    keystrokes: totalChars,
    uncorrected: Math.max(0, Math.round(mistakes)),
    corrected: 0,
    missing: 0,
    excess: 0,
    passed: mistakes === 0,
    legacy: true,
  }
}

export function validateSession(row: unknown): PracticeSession | null {
  if (!isObj(row)) return null
  const r = row
  if (!str(r.id) || !KINDS.includes(r.kind as SessionKind) || !str(r.trackId) || !str(r.itemId)) return null
  if (!validDate(r.completedAt)) return null
  for (const k of ['durationSec', 'wpm', 'rawWpm', 'accuracy', 'correctChars', 'keystrokes', 'uncorrected', 'corrected', 'missing', 'excess']) {
    if (!num(r[k]) || (r[k] as number) < 0) return null
  }
  if (typeof r.passed !== 'boolean') return null
  const s: PracticeSession = {
    id: r.id,
    kind: r.kind as SessionKind,
    trackId: r.trackId,
    itemId: r.itemId,
    completedAt: new Date(r.completedAt).toISOString(),
    durationSec: r.durationSec as number,
    wpm: r.wpm as number,
    rawWpm: r.rawWpm as number,
    accuracy: clampPct(r.accuracy as number),
    correctChars: r.correctChars as number,
    keystrokes: r.keystrokes as number,
    uncorrected: r.uncorrected as number,
    corrected: r.corrected as number,
    missing: r.missing as number,
    excess: r.excess as number,
    passed: r.passed,
  }
  if (typeof r.title === 'string') s.title = r.title.slice(0, 200)
  if (r.legacy === true) s.legacy = true
  if (Array.isArray(r.wpmSeries) && r.wpmSeries.every(num)) s.wpmSeries = (r.wpmSeries as number[]).slice(0, LIMITS.wpmSeries)
  if (isObj(r.charStats)) s.charStats = validPairs(r.charStats)
  if (isObj(r.categoryStats)) s.categoryStats = validPairs(r.categoryStats)
  return s
}

function validPairs(o: Record<string, unknown>): Record<string, [number, number]> {
  const out: Record<string, [number, number]> = {}
  for (const [k, v] of Object.entries(o)) {
    if (Array.isArray(v) && v.length === 2 && num(v[0]) && num(v[1]) && v[1] <= v[0] && k.length <= 4) out[k] = [v[0], v[1]]
  }
  return out
}

function filterRecord<T>(o: unknown, check: (v: Record<string, unknown>) => T | null): Record<string, T> {
  const out: Record<string, T> = {}
  if (!isObj(o)) return out
  for (const [k, v] of Object.entries(o)) {
    if (k.length > 120 || !isObj(v)) continue
    const c = check(v)
    if (c) out[k] = c
  }
  return out
}

const strArray = (v: unknown, max: number): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.length < 120).slice(0, max) : []

export interface ValidationReport {
  data: AppData
  accepted: number
  rejected: number
}

/** Validate a version 2 or 3 AppData object, dropping anything malformed. */
export function validateAppData(raw: unknown): ValidationReport {
  const data = emptyData()
  let rejected = 0
  if (!isObj(raw)) return { data, accepted: 0, rejected: 1 }
  const sessions = Array.isArray(raw.sessions) ? raw.sessions : []
  for (const row of sessions) {
    const s = validateSession(row)
    if (s) data.sessions.push(s)
    else rejected++
  }
  data.commands = filterRecord(raw.commands, (v) =>
    num(v.typedBestAccuracy) && num(v.typedPerfect) && num(v.recallAttempts) && num(v.recallSuccess) && validDate(v.lastPracticed)
      ? {
          typedBestAccuracy: clampPct(v.typedBestAccuracy),
          typedPerfect: v.typedPerfect,
          recallAttempts: v.recallAttempts,
          recallSuccess: Math.min(v.recallSuccess, v.recallAttempts),
          successDays: strArray(v.successDays, LIMITS.successDays),
          lastPracticed: v.lastPracticed,
        }
      : null
  )
  data.quizzes = filterRecord(raw.quizzes, (v) =>
    num(v.best) && num(v.last) && num(v.attempts) && validDate(v.lastAt)
      ? { best: Math.min(1, Math.max(0, v.best)), last: Math.min(1, Math.max(0, v.last)), attempts: v.attempts, lastAt: v.lastAt }
      : null
  )
  data.scenarios = filterRecord(raw.scenarios, (v) =>
    typeof v.completed === 'boolean' && num(v.attempts) && num(v.bestFirstTry)
      ? {
          completed: v.completed,
          attempts: v.attempts,
          bestFirstTry: Math.min(1, Math.max(0, v.bestFirstTry)),
          ...(validDate(v.completedAt) ? { completedAt: v.completedAt } : {}),
        }
      : null
  )
  data.missions = filterRecord(raw.missions, (v) =>
    num(v.attempts) && v.attempts >= 0 && num(v.bestScore) && validDate(v.completedAt)
      ? { attempts: v.attempts, bestScore: clampPct(v.bestScore), completedAt: v.completedAt }
      : null
  )
  data.daily = filterRecord(raw.daily, (v) =>
    num(v.score) && num(v.wpm) && num(v.accuracy) && validDate(v.completedAt)
      ? { score: v.score, wpm: v.wpm, accuracy: clampPct(v.accuracy), completedAt: v.completedAt }
      : null
  )
  for (const k of Object.keys(data.daily)) if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) delete data.daily[k]
  if (Array.isArray(raw.confusions)) {
    data.confusions = raw.confusions
      .filter((c): c is { expected: string; got: string; at: string } => isObj(c) && str(c.expected) && str(c.got) && validDate(c.at))
      .slice(-LIMITS.confusions)
  }
  data.favorites = strArray(raw.favorites, 500)
  data.recent = strArray(raw.recent, LIMITS.recent)
  if (isObj(raw.subnet) && num(raw.subnet.attempts) && num(raw.subnet.correct)) {
    data.subnet = { attempts: raw.subnet.attempts, correct: Math.min(raw.subnet.correct, raw.subnet.attempts) }
  }
  if (isObj(raw.lastVisited) && str(raw.lastVisited.path) && typeof raw.lastVisited.title === 'string' && validDate(raw.lastVisited.at)) {
    const p = raw.lastVisited.path
    if (p.startsWith('/')) data.lastVisited = { path: p, title: raw.lastVisited.title.slice(0, 200), at: raw.lastVisited.at }
  }
  if (isObj(raw.migratedFromV1) && validDate(raw.migratedFromV1.at) && num(raw.migratedFromV1.sessions)) {
    data.migratedFromV1 = { at: raw.migratedFromV1.at, sessions: raw.migratedFromV1.sessions }
  }
  data.sessions = dedupe(data.sessions).slice(-LIMITS.sessions)
  return { data, accepted: data.sessions.length, rejected }
}

export function dedupe(sessions: PracticeSession[]): PracticeSession[] {
  const seen = new Set<string>()
  const out: PracticeSession[] = []
  for (const s of sessions) {
    if (seen.has(s.id)) continue
    seen.add(s.id)
    out.push(s)
  }
  return out.sort((a, b) => a.completedAt.localeCompare(b.completedAt))
}

export type ImportFormat = 'v3' | 'v2' | 'v1-export' | 'v1-array'

export interface ImportResult {
  ok: boolean
  format?: ImportFormat
  data?: AppData
  accepted: number
  rejected: number
  error?: string
}

/**
 * Parse an import file. Accepts:
 * - CodeRush 3 and 2 exports: { app: "CodeRush", schemaVersion: 3 or 2, data: AppData }
 * - CodeRush 1 exports: { exportVersion: 1, sessions: [...] }
 * - CodeRush 1 raw localStorage arrays: [ { language, lessonId, ... } ]
 */
export function parseImport(text: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return { ok: false, accepted: 0, rejected: 0, error: 'The file is not valid JSON.' }
  }
  if (Array.isArray(parsed)) return fromLegacyRows(parsed, 'v1-array')
  if (!isObj(parsed)) return { ok: false, accepted: 0, rejected: 0, error: 'The file does not contain CodeRush data.' }
  if (parsed.app === 'CodeRush' && (parsed.schemaVersion === SCHEMA_VERSION || parsed.schemaVersion === 2) && isObj(parsed.data)) {
    const r = validateAppData(parsed.data)
    return { ok: true, format: parsed.schemaVersion === 2 ? 'v2' : 'v3', data: r.data, accepted: r.accepted, rejected: r.rejected }
  }
  if (num(parsed.schemaVersion) && parsed.schemaVersion > SCHEMA_VERSION) {
    return { ok: false, accepted: 0, rejected: 0, error: 'This file was exported by a newer version of CodeRush.' }
  }
  if (Array.isArray(parsed.sessions)) return fromLegacyRows(parsed.sessions, 'v1-export')
  return { ok: false, accepted: 0, rejected: 0, error: 'The file does not contain CodeRush data.' }
}

function fromLegacyRows(rows: unknown[], format: ImportFormat): ImportResult {
  const data = emptyData()
  let rejected = 0
  for (const row of rows) {
    const s = migrateLegacyRow(row)
    if (s) data.sessions.push(s)
    else rejected++
  }
  data.sessions = dedupe(data.sessions)
  if (data.sessions.length === 0) {
    return { ok: false, accepted: 0, rejected, error: 'No valid practice records were found in the file.' }
  }
  return { ok: true, format, data, accepted: data.sessions.length, rejected }
}

/** Merge imported data into existing data. Sessions are unioned by id; best scores are kept. */
export function mergeData(base: AppData, add: AppData): AppData {
  const out: AppData = structuredCloneSafe(base)
  out.sessions = dedupe([...base.sessions, ...add.sessions]).slice(-LIMITS.sessions)
  for (const [id, p] of Object.entries(add.commands)) {
    const cur = out.commands[id]
    out.commands[id] = cur
      ? {
          typedBestAccuracy: Math.max(cur.typedBestAccuracy, p.typedBestAccuracy),
          typedPerfect: Math.max(cur.typedPerfect, p.typedPerfect),
          recallAttempts: Math.max(cur.recallAttempts, p.recallAttempts),
          recallSuccess: Math.max(cur.recallSuccess, p.recallSuccess),
          successDays: [...new Set([...cur.successDays, ...p.successDays])].sort().slice(-LIMITS.successDays),
          lastPracticed: cur.lastPracticed > p.lastPracticed ? cur.lastPracticed : p.lastPracticed,
        }
      : p
  }
  for (const [id, q] of Object.entries(add.quizzes)) {
    const cur = out.quizzes[id]
    out.quizzes[id] = cur ? { ...cur, best: Math.max(cur.best, q.best), attempts: Math.max(cur.attempts, q.attempts) } : q
  }
  for (const [id, s] of Object.entries(add.scenarios)) {
    const cur = out.scenarios[id]
    out.scenarios[id] = cur
      ? { ...cur, completed: cur.completed || s.completed, bestFirstTry: Math.max(cur.bestFirstTry, s.bestFirstTry) }
      : s
  }
  for (const [id, m] of Object.entries(add.missions)) {
    const cur = out.missions[id]
    out.missions[id] = cur ? { attempts: Math.max(cur.attempts, m.attempts), bestScore: Math.max(cur.bestScore, m.bestScore), completedAt: cur.completedAt > m.completedAt ? cur.completedAt : m.completedAt } : m
  }
  for (const [d, r] of Object.entries(add.daily)) {
    const cur = out.daily[d]
    if (!cur || r.score > cur.score) out.daily[d] = r
  }
  out.favorites = [...new Set([...base.favorites, ...add.favorites])]
  out.confusions = [...base.confusions, ...add.confusions].slice(-LIMITS.confusions)
  out.subnet = {
    attempts: Math.max(base.subnet.attempts, add.subnet.attempts),
    correct: Math.max(base.subnet.correct, add.subnet.correct),
  }
  return out
}

function structuredCloneSafe<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T
}

/**
 * Load from raw localStorage strings. Version 3 wins; v2 and v1 remain readable backups.
 */
export function loadFromStrings(v3: string | null, v2: string | null, v1: string | null, now = new Date()): { data: AppData; migrated: boolean } {
  if (v3) {
    try {
      return { data: validateAppData(JSON.parse(v3)).data, migrated: false }
    } catch {
      // Fall through to preserved older data.
    }
  }
  if (v2) {
    try { return { data: validateAppData(JSON.parse(v2)).data, migrated: true } } catch { /* fall through */ }
  }
  if (v1) {
    try {
      const rows = JSON.parse(v1)
      if (Array.isArray(rows)) {
        const r = fromLegacyRows(rows, 'v1-array')
        if (r.ok && r.data) {
          r.data.migratedFromV1 = { at: now.toISOString(), sessions: r.accepted }
          return { data: r.data, migrated: true }
        }
      }
    } catch {
      // ignore
    }
  }
  return { data: emptyData(), migrated: false }
}
