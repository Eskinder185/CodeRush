import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Terminal as TerminalIcon, BookOpen, Route, Layers, Workflow, Code2 } from 'lucide-react'
import { Dialog, DifficultyBadge, Select, Tag, Kbd } from '../components/ui'
import { search, type ResultKind, type SearchFilters } from '../lib/search'
import { PLATFORM_LABEL, type Difficulty, type Platform } from '../content/types'

const KIND_META: Record<ResultKind, { label: string; Icon: typeof Search }> = {
  command: { label: 'Command', Icon: TerminalIcon },
  lesson: { label: 'Lesson', Icon: Code2 },
  path: { label: 'Learning path', Icon: Route },
  module: { label: 'Module', Icon: Layers },
  scenario: { label: 'Scenario', Icon: Workflow },
  language: { label: 'Language', Icon: BookOpen },
}

/** Search with keyboard navigation. Used in the dialog and on the /search page. */
export function SearchPanel({ initial = '', onNavigate, autoFocus = true }: { initial?: string; onNavigate?: () => void; autoFocus?: boolean }) {
  const [q, setQ] = useState(initial)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [active, setActive] = useState(0)
  const nav = useNavigate()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => search(q, filters, 40), [q, filters])

  useEffect(() => setActive(0), [q, filters])
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const go = (href: string) => {
    onNavigate?.()
    nav(href)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(results.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active]!.entry.href)
    }
  }

  const examples = ['DNS', 'Find IP address', 'Check open ports', 'PowerShell firewall', 'Linux permissions', 'Routing table', 'Python functions']

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
          placeholder="Search commands, lessons, paths, and scenarios"
          className="h-12 w-full rounded-md border border-line-strong bg-sunken pl-10 pr-3 text-base text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          data-autofocus
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
          aria-label="Search"
        />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <Select
          label="Type"
          value={(filters.kind ?? 'all') as string}
          onChange={(v) => setFilters((f) => ({ ...f, kind: v === 'all' ? undefined : (v as ResultKind) }))}
          options={[{ value: 'all', label: 'Everything' }, ...Object.entries(KIND_META).map(([k, m]) => ({ value: k, label: m.label }))]}
        />
        <Select
          label="Platform"
          value={(filters.platform ?? 'all') as string}
          onChange={(v) => setFilters((f) => ({ ...f, platform: v === 'all' ? undefined : (v as Platform) }))}
          options={[{ value: 'all', label: 'Any platform' }, ...Object.entries(PLATFORM_LABEL).map(([k, l]) => ({ value: k, label: l }))]}
        />
        <Select
          label="Difficulty"
          value={(filters.difficulty ?? 'all') as string}
          onChange={(v) => setFilters((f) => ({ ...f, difficulty: v === 'all' ? undefined : (v as Difficulty) }))}
          options={[
            { value: 'all', label: 'Any level' },
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
          ]}
        />
      </div>
      {q.trim() === '' ? (
        <div className="mt-5">
          <p className="text-xs font-medium text-fg-subtle">Try</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {examples.map((x) => (
              <button key={x} type="button" className="rounded-full border border-line px-3 py-1.5 text-sm text-fg-muted interactive" onClick={() => setQ(x)}>
                {x}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <p className="mt-6 text-center text-sm text-fg-subtle">No matches for “{q}”. Try a broader word, such as “dns” or “ports”.</p>
      ) : (
        <ul id={listId} role="listbox" aria-label={`${results.length} results`} className="mt-4 max-h-[50vh] space-y-1 overflow-y-auto">
          {results.map((r, i) => {
            const { Icon, label } = KIND_META[r.entry.kind]
            return (
              <li key={r.entry.id} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.entry.href)}
                  className={`flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-fast ${i === active ? 'bg-elevated' : ''}`}
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-fg">{r.entry.title}</span>
                    <span className="block truncate font-mono text-xs text-fg-subtle">{r.entry.subtitle}</span>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      <Tag>{label}</Tag>
                      {r.entry.platform && <Tag tone="accent">{PLATFORM_LABEL[r.entry.platform]}</Tag>}
                      {r.entry.category && r.entry.kind === 'command' && <Tag>{r.entry.category}</Tag>}
                      {r.entry.difficulty && <DifficultyBadge level={r.entry.difficulty} />}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function SearchDialog({ open, onClose, initial }: { open: boolean; onClose: () => void; initial?: string }) {
  return (
    <Dialog open={open} onClose={onClose} title="Search CodeRush" wide>
      <SearchPanel initial={initial} onNavigate={onClose} />
      <p className="mt-4 text-xs text-fg-subtle">
        <Kbd>↑</Kbd> <Kbd>↓</Kbd> to move, <Kbd>Enter</Kbd> to open, <Kbd>Esc</Kbd> to close. Search runs entirely in your browser.
      </p>
    </Dialog>
  )
}


export default SearchDialog
