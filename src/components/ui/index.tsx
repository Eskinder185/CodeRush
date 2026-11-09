import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-react'
import type { Difficulty } from '../../content/types'

// ---------------- Button ----------------

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition duration-fast ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg shadow-e1 hover:brightness-110 active:brightness-95',
  secondary: 'border border-line-strong bg-surface text-fg hover:bg-elevated hover:border-fg-subtle/50',
  ghost: 'text-fg-muted hover:bg-elevated hover:text-fg',
  danger: 'border border-err/50 text-err hover:bg-err/10',
}
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean }>(
  function Button({ variant = 'primary', size = 'md', className = '', loading, children, disabled, type = 'button', ...rest }, ref) {
    return (
      <button ref={ref} type={type} className={buttonClass(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />}
        {children}
      </button>
    )
  }
)

export function ButtonLink({ variant = 'primary', size = 'md', className = '', ...rest }: LinkProps & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...rest} />
}

// ---------------- Badges ----------------

const DIFF: Record<Difficulty | 'mixed', { cls: string; label: string; bars: number }> = {
  beginner: { cls: 'text-ok border-ok/40 bg-ok/10', label: 'Beginner', bars: 1 },
  intermediate: { cls: 'text-warn border-warn/40 bg-warn/10', label: 'Intermediate', bars: 2 },
  advanced: { cls: 'text-err border-err/40 bg-err/10', label: 'Advanced', bars: 3 },
  mixed: { cls: 'text-accent border-accent/40 bg-accent/10', label: 'All levels', bars: 0 },
}

/** Difficulty is shown as text plus a bar count, never as color alone. */
export function DifficultyBadge({ level }: { level: Difficulty | 'mixed' }) {
  const d = DIFF[level]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-2xs font-semibold ${d.cls}`}>
      {d.bars > 0 && (
        <span className="flex items-end gap-px" aria-hidden>
          {[1, 2, 3].map((b) => (
            <span key={b} className={`w-[3px] rounded-sm bg-current ${b <= d.bars ? '' : 'opacity-25'}`} style={{ height: 3 + b * 2 }} />
          ))}
        </span>
      )}
      {d.label}
    </span>
  )
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'ok' | 'warn' | 'err' | 'violet' }) {
  const tones = {
    neutral: 'border-line bg-elevated text-fg-muted',
    accent: 'border-accent/35 bg-accent/10 text-accent',
    ok: 'border-ok/35 bg-ok/10 text-ok',
    warn: 'border-warn/35 bg-warn/10 text-warn',
    err: 'border-err/35 bg-err/10 text-err',
    violet: 'border-violet/35 bg-violet/10 text-violet',
  }
  return <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-2xs font-medium ${tones[tone]}`}>{children}</span>
}

// ---------------- Progress ----------------

export function ProgressBar({ value, label, tone = 'accent', size = 'md' }: { value: number; label: string; tone?: 'accent' | 'ok' | 'violet'; size?: 'sm' | 'md' }) {
  const pct = Math.max(0, Math.min(100, value))
  const tones = { accent: 'bg-accent', ok: 'bg-ok', violet: 'bg-violet' }
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-line ${size === 'sm' ? 'h-1' : 'h-1.5'}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      <div className={`h-full rounded-full ${tones[tone]} transition-[width] duration-slow ease-out`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function ProgressRing({ value, size = 44, label }: { value: number; size?: number; label: string }) {
  const r = (size - 6) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}: ${Math.round(pct)}%`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--line))" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-[stroke-dashoffset] duration-slow"
      />
      <text x="50%" y="50%" dy="0.35em" textAnchor="middle" className="fill-fg text-[11px] font-semibold tabular-nums">
        {Math.round(pct)}
      </text>
    </svg>
  )
}

// ---------------- Segmented control ----------------

export function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
  size = 'md',
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  size?: 'sm' | 'md'
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-md border border-line bg-sunken p-1">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`rounded px-3 ${size === 'sm' ? 'h-8 text-xs' : 'h-9 text-sm'} font-medium transition duration-fast ${
              active ? 'bg-surface text-fg shadow-e1 ring-1 ring-line-strong' : 'text-fg-subtle hover:text-fg'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

// ---------------- Select ----------------

export function Select<T extends string>({ label, value, options, onChange, id }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; id?: string }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-fg-subtle" htmlFor={id}>
      {label}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-10 rounded-md border border-line-strong bg-surface px-3 text-sm text-fg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

// ---------------- Dialog ----------------

/**
 * Accessible modal built on <dialog>. showModal() traps focus, makes the page inert, and closes on
 * Escape. Focus returns to the element that opened it.
 */
export function Dialog({ open, onClose, title, children, wide = false }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  const opener = useRef<Element | null>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      opener.current = document.activeElement
      if (typeof d.showModal === 'function') d.showModal()
      else d.setAttribute('open', '')
      // Move focus to the element the dialog marks as primary, such as the search box.
      window.setTimeout(() => d.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 0)
    } else if (!open && d.open) {
      if (typeof d.close === 'function') d.close()
      else d.removeAttribute('open')
      ;(opener.current as HTMLElement | null)?.focus?.()
    }
  }, [open])
  // Native listeners: React 18.2 does not reliably forward the dialog cancel event.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    const d = ref.current
    if (!d) return
    const cancel = (e: Event) => {
      e.preventDefault()
      onCloseRef.current()
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
      }
    }
    const closed = () => onCloseRef.current()
    d.addEventListener('cancel', cancel)
    d.addEventListener('keydown', key)
    d.addEventListener('close', closed)
    return () => {
      d.removeEventListener('cancel', cancel)
      d.removeEventListener('keydown', key)
      d.removeEventListener('close', closed)
    }
  }, [])
  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className={`m-auto w-[calc(100%-2rem)] ${wide ? 'max-w-2xl' : 'max-w-lg'} rounded-xl border border-line-strong bg-surface p-0 text-fg shadow-e3 backdrop:bg-black/60 backdrop:backdrop-blur-sm`}
    >
      {open && (
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-5 py-4">
            <h2 id="dialog-title" className="text-h3">
              {title}
            </h2>
            <button type="button" onClick={onClose} className="rounded-md p-2 text-fg-subtle interactive" aria-label="Close dialog">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      )}
    </dialog>
  )
}

// ---------------- Toasts ----------------

type ToastTone = 'info' | 'success' | 'warn'
interface ToastItem {
  id: number
  text: string
  tone: ToastTone
}
const ToastCtx = createContext<(text: string, tone?: ToastTone) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const push = useCallback((text: string, tone: ToastTone = 'info') => {
    const id = Date.now() + Math.random()
    setItems((xs) => [...xs.filter((x) => x.text !== text), { id, text, tone }].slice(-3))
    window.setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 4200)
  }, [])
  const Icon = { info: Info, success: CheckCircle2, warn: AlertTriangle }
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">
        {items.map((t) => {
          const I = Icon[t.tone]
          return (
            <div key={t.id} className="pointer-events-auto flex max-w-md animate-fade-up items-center gap-2.5 rounded-lg border border-line-strong bg-elevated px-4 py-3 text-sm shadow-e3">
              <I className={`h-4 w-4 shrink-0 ${t.tone === 'success' ? 'text-ok' : t.tone === 'warn' ? 'text-warn' : 'text-accent'}`} aria-hidden />
              <span>{t.text}</span>
            </div>
          )
        })}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  return useContext(ToastCtx)
}

// ---------------- Layout helpers ----------------

export function PageHeader({ eyebrow, title, lead, actions, children }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; actions?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-h1 text-fg">{title}</h1>
        {lead && <p className="lead mt-3">{lead}</p>}
        {children}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  )
}

export function EmptyState({ icon, title, children, action }: { icon?: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-line-strong bg-surface/40 px-6 py-10 text-center">
      {icon && <div className="mb-3 text-fg-subtle">{icon}</div>}
      <h3 className="text-h3">{title}</h3>
      {children && <div className="mt-2 max-w-md text-sm text-fg-subtle">{children}</div>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden />
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="kbd">{children}</kbd>
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="panel panel-pad">
      <div className="text-xs font-medium text-fg-subtle">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-fg">{value}</div>
      {hint && <div className="mt-1 text-xs text-fg-subtle">{hint}</div>}
    </div>
  )
}
