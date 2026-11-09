/**
 * Local search over every learning item. No backend.
 * Each query word must match a word in the entry (prefix match), either directly or through a
 * synonym group. Field weights rank title and command matches above body text.
 */
import { commands } from '../content/commands'
import { languageTracks } from '../content/code'
import { learningPaths } from '../content/paths'
import { scenarios } from '../content/scenarios'
import { CATEGORY_LABEL, PLATFORM_LABEL, type Difficulty, type Platform, type PracticeType } from '../content/types'

export type ResultKind = 'command' | 'lesson' | 'path' | 'module' | 'scenario' | 'language'

export interface SearchEntry {
  id: string
  kind: ResultKind
  title: string
  subtitle: string
  href: string
  platform?: Platform
  category?: string
  difficulty?: Difficulty | 'mixed'
  practice?: PracticeType[]
  /** Weighted text fields. */
  fields: { title: string; primary: string; secondary: string; body: string }
}

/** Groups of interchangeable words. A query word matching any member also matches the others. */
export const SYNONYMS: string[][] = [
  ['ip', 'address', 'addr', 'ipconfig', 'ifconfig', 'ipaddress', 'netipaddress'],
  ['port', 'ports', 'listening', 'listen', 'socket', 'netstat', 'ss', 'tcpconnection'],
  ['open', 'listening', 'exposed'],
  ['dns', 'resolve', 'resolution', 'nslookup', 'dig', 'resolvedns', 'resolvectl', 'nameserver'],
  ['firewall', 'ufw', 'nft', 'nftables', 'firewalld', 'netfirewallrule', 'acl', 'acls'],
  ['permission', 'permissions', 'chmod', 'chown', 'acl', 'access', 'rights'],
  ['route', 'routes', 'routing', 'gateway', 'netroute'],
  ['process', 'processes', 'ps', 'task', 'tasklist', 'pid', 'getprocess'],
  ['service', 'services', 'systemctl', 'daemon', 'getservice'],
  ['log', 'logs', 'event', 'events', 'journal', 'journalctl', 'winevent', 'syslog'],
  ['find', 'search', 'locate', 'grep', 'selectstring'],
  ['file', 'files', 'directory', 'folder', 'childitem'],
  ['user', 'users', 'account', 'accounts', 'localuser', 'whoami'],
  ['hash', 'checksum', 'integrity', 'sha256', 'sha256sum', 'filehash'],
  ['ping', 'reachability', 'connectivity', 'connection', 'testconnection', 'netconnection'],
  ['troubleshoot', 'troubleshooting', 'diagnose', 'diagnostics', 'scenario'],
  ['function', 'functions', 'def', 'func'],
  ['mac', 'arp', 'neighbor', 'neighbour', 'getmac'],
  ['vlan', 'vlans', 'trunk', 'switch', 'switching'],
  ['disk', 'storage', 'space', 'df', 'du'],
  ['powershell', 'pwsh', 'ps'],
  ['linux', 'bash', 'shell'],
]

const synonymIndex = new Map<string, Set<string>>()
for (const group of SYNONYMS) for (const w of group) {
  const set = synonymIndex.get(w) ?? new Set<string>()
  group.forEach((g) => set.add(g))
  synonymIndex.set(w, set)
}

export function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/-(?=[a-z])/g, '') // Get-NetIPAddress -> getnetipaddress, also keep original pieces below
    .split(/[^a-z0-9.+#]+/)
    .filter(Boolean)
}

function tokenSet(s: string): string[] {
  const lower = s.toLowerCase()
  return [...new Set([...words(s), ...lower.split(/[^a-z0-9.+#]+/).filter(Boolean)])]
}

let index: SearchEntry[] | null = null

export function buildIndex(): SearchEntry[] {
  if (index) return index
  const out: SearchEntry[] = []
  for (const c of commands) {
    out.push({
      id: c.id,
      kind: 'command',
      title: c.title,
      subtitle: c.command,
      href: `/lab/command/${encodeURIComponent(c.id)}`,
      platform: c.platform,
      category: CATEGORY_LABEL[c.category],
      difficulty: c.difficulty,
      practice: c.practice,
      fields: {
        title: c.title,
        primary: `${c.command} ${(c.keywords ?? []).join(' ')}`,
        secondary: `${c.summary} ${c.subcategory} ${CATEGORY_LABEL[c.category]} ${PLATFORM_LABEL[c.platform]}`,
        body: `${c.whenToUse} ${c.details ?? ''}`,
      },
    })
  }
  for (const t of languageTracks) {
    out.push({
      id: `lang:${t.language}`,
      kind: 'language',
      title: t.languageName,
      subtitle: `${t.lessons.length} programming lessons`,
      href: `/languages/${t.language}/lessons`,
      category: 'Programming',
      difficulty: 'mixed',
      fields: { title: t.languageName, primary: t.language, secondary: t.description, body: '' },
    })
    for (const l of t.lessons) {
      out.push({
        id: `lesson:${t.language}/${l.id}`,
        kind: 'lesson',
        title: l.title,
        subtitle: `${t.languageName} lesson`,
        href: `/languages/${t.language}/lesson/${l.id}`,
        category: t.languageName,
        difficulty: l.difficulty,
        practice: ['type'],
        fields: { title: l.title, primary: `${t.languageName} ${l.concepts.join(' ')}`, secondary: l.description, body: '' },
      })
    }
  }
  for (const p of learningPaths) {
    out.push({
      id: `path:${p.id}`,
      kind: 'path',
      title: p.title,
      subtitle: `Learning path · ${p.modules.length} modules`,
      href: `/learn/${p.id}`,
      difficulty: p.difficulty,
      fields: { title: p.title, primary: p.tagline, secondary: p.description, body: p.objectives.join(' ') },
    })
    for (const m of p.modules) {
      out.push({
        id: `module:${m.id}`,
        kind: 'module',
        title: m.title,
        subtitle: `${p.title} module`,
        href: `/learn/${p.id}/${m.id}`,
        difficulty: m.level,
        fields: { title: m.title, primary: m.summary, secondary: m.outcome, body: m.concept.join(' ') },
      })
    }
  }
  for (const s of scenarios) {
    out.push({
      id: `scenario:${s.id}`,
      kind: 'scenario',
      title: s.title,
      subtitle: `Scenario · ${PLATFORM_LABEL[s.platform]}`,
      href: `/lab/scenario/${s.id}`,
      platform: s.platform,
      category: 'Troubleshooting',
      difficulty: s.difficulty,
      practice: ['scenario'],
      fields: { title: s.title, primary: `${s.summary} troubleshooting scenario`, secondary: s.context, body: s.wrapUp.meaning },
    })
  }
  index = out
  return out
}

const WEIGHT = { title: 6, primary: 4, secondary: 2, body: 1 } as const
const KIND_BONUS: Record<ResultKind, number> = { path: 3, language: 3, module: 1, command: 1, scenario: 1, lesson: 0 }

export interface SearchFilters {
  kind?: ResultKind
  platform?: Platform
  difficulty?: Difficulty
  practice?: PracticeType
}

export interface SearchResult {
  entry: SearchEntry
  score: number
}

function expand(word: string): string[] {
  return [...(synonymIndex.get(word) ?? new Set([word]))]
}

function fieldScore(tokens: string[], variants: string[]): boolean {
  return tokens.some((t) => variants.some((v) => t.startsWith(v) || (v.length >= 4 && t.includes(v))))
}

export function search(query: string, filters: SearchFilters = {}, limit = 40): SearchResult[] {
  const q = words(query).filter((w) => w.length > 0)
  if (q.length === 0) return []
  const results: SearchResult[] = []
  for (const e of buildIndex()) {
    if (filters.kind && e.kind !== filters.kind) continue
    if (filters.platform && e.platform !== filters.platform) continue
    if (filters.difficulty && e.difficulty !== filters.difficulty) continue
    if (filters.practice && !e.practice?.includes(filters.practice)) continue
    const tok = {
      title: tokenSet(e.fields.title),
      primary: tokenSet(e.fields.primary),
      secondary: tokenSet(e.fields.secondary),
      body: tokenSet(e.fields.body),
    }
    let score = 0
    let all = true
    for (const w of q) {
      const variants = expand(w)
      let best = 0
      for (const f of ['title', 'primary', 'secondary', 'body'] as const) {
        if (fieldScore(tok[f], variants)) best = Math.max(best, WEIGHT[f])
      }
      // Exact (non-synonym) word in the title is a strong signal.
      if (tok.title.includes(w)) best += 2
      if (best === 0) {
        all = false
        break
      }
      score += best
    }
    if (!all) continue
    results.push({ entry: e, score: score + KIND_BONUS[e.kind] })
  }
  return results.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title)).slice(0, limit)
}
