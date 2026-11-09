import type { ReactNode } from 'react'
import { Dialog, Segmented, Kbd } from '../components/ui'
import { DEFAULT_SETTINGS, updateSettings, useSettings, type Settings } from '../lib/settings'

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-b border-line py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-medium text-fg">{label}</div>
        {hint && <div className="text-xs text-fg-subtle">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full border transition-colors duration-fast ${checked ? 'border-accent bg-accent' : 'border-line-strong bg-elevated'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-fast ${checked ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  )
}

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const s = useSettings()
  const set = (p: Partial<Settings>) => updateSettings(p)
  return (
    <Dialog open={open} onClose={onClose} title="Settings" wide>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Appearance</h3>
      <Row label="Theme">
        <Segmented label="Theme" value={s.theme} onChange={(v) => set({ theme: v })} options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }, { value: 'system', label: 'System' }]} size="sm" />
      </Row>
      <Row label="Motion" hint="System follows your operating system setting.">
        <Segmented label="Motion" value={s.motion} onChange={(v) => set({ motion: v })} options={[{ value: 'system', label: 'System' }, { value: 'reduce', label: 'Reduced' }, { value: 'full', label: 'Full' }]} size="sm" />
      </Row>
      <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-fg-subtle">Typing</h3>
      <Row label="Font size" hint={`${s.fontSize}px`}>
        <input type="range" min={14} max={26} value={s.fontSize} onChange={(e) => set({ fontSize: Number(e.target.value) })} aria-label="Font size" className="w-48 accent-[rgb(var(--accent))]" />
      </Row>
      <Row label="Line spacing" hint={s.lineHeight.toFixed(1)}>
        <input type="range" min={1.3} max={2.2} step={0.1} value={s.lineHeight} onChange={(e) => set({ lineHeight: Number(e.target.value) })} aria-label="Line spacing" className="w-48 accent-[rgb(var(--accent))]" />
      </Row>
      <Row label="Cursor style">
        <Segmented label="Cursor style" value={s.caret} onChange={(v) => set({ caret: v })} options={[{ value: 'bar', label: 'Bar' }, { value: 'block', label: 'Block' }, { value: 'underline', label: 'Underline' }]} size="sm" />
      </Row>
      <Row label="Indentation rule" hint="Forgiving fills indentation after Enter. Strict makes you type every space.">
        <Segmented label="Indentation rule" value={s.strict ? 'strict' : 'forgiving'} onChange={(v) => set({ strict: v === 'strict' })} options={[{ value: 'forgiving', label: 'Forgiving' }, { value: 'strict', label: 'Strict' }]} size="sm" />
      </Row>
      <Row label="Line numbers">
        <Toggle label="Line numbers" checked={s.lineNumbers} onChange={(v) => set({ lineNumbers: v })} />
      </Row>
      <Row label="Pause when focus leaves the text">
        <Toggle label="Auto pause" checked={s.autoPause} onChange={(v) => set({ autoPause: v })} />
      </Row>
      <Row label="Show on-screen keyboard guide">
        <Toggle label="Keyboard guide" checked={s.showKeyboard} onChange={(v) => set({ showKeyboard: v })} />
      </Row>
      <Row label="Key sounds" hint="A quiet click, and a low tone on mistakes.">
        <Toggle label="Key sounds" checked={s.sound} onChange={(v) => set({ sound: v })} />
      </Row>
      <div className="mt-5 flex justify-end">
        <button type="button" className="text-sm text-fg-subtle underline-offset-2 hover:text-fg hover:underline" onClick={() => updateSettings(DEFAULT_SETTINGS)}>
          Reset to defaults
        </button>
      </div>
    </Dialog>
  )
}

export function ShortcutsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const rows: [string, string][] = [
    ['/', 'Open search'],
    [',', 'Open settings'],
    ['?', 'Show these shortcuts'],
    ['Esc', 'Pause typing and release focus'],
    ['R', 'Restart the exercise (while not typing)'],
    ['N', 'Next exercise (while not typing)'],
    ['F', 'Toggle Focus Mode (while not typing)'],
    ['Tab', 'Inside the text: fill expected indentation. Otherwise: move focus as usual.'],
  ]
  return (
    <Dialog open={open} onClose={onClose} title="Keyboard shortcuts">
      <p className="mb-4 text-sm text-fg-subtle">Single-key shortcuts only work when you are not typing in a field, so they never interfere with practice or browser shortcuts.</p>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 py-2.5">
            <dt>
              <Kbd>{k}</Kbd>
            </dt>
            <dd className="text-right text-sm text-fg-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </Dialog>
  )
}
