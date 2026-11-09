import { useEffect, useState } from 'react'

const KEYS = ['|', '-', '/', '\\', '_', '$', '{', '}', '[', ']', '(', ')', "'", '"', '<', '>', '=', ';', ':', '.', '~', '*', '&', '@', '#', '%', '`']

function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia?.('(pointer: coarse)')
    if (!mq) return
    setCoarse(mq.matches)
    const on = () => setCoarse(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return coarse
}

/**
 * On-screen keys for symbols that are hard to reach on phone keyboards.
 * Buttons keep focus in the typing input (mousedown is prevented), and each press counts as a keystroke.
 */
export function SymbolBar({ onKey, onTab, visibleOnDesktop }: { onKey: (ch: string) => void; onTab: () => void; visibleOnDesktop: boolean }) {
  const coarse = useCoarsePointer()
  const [open, setOpen] = useState(false)
  const show = coarse || visibleOnDesktop || open
  return (
    <div className="mt-2">
      {!coarse && !visibleOnDesktop && (
        <button type="button" className="text-xs text-fg-subtle underline-offset-2 hover:text-fg hover:underline" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Hide symbol keys' : 'Show symbol keys'}
        </button>
      )}
      {show && (
        <div className="scroll-x -mx-1 mt-1 flex gap-1.5 px-1 pb-1" role="toolbar" aria-label="Symbol keys">
          <button
            type="button"
            className="kbd h-11 min-w-[3.25rem] shrink-0 text-xs"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onTab}
            aria-label="Tab: fill indentation"
          >
            Tab
          </button>
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              className="kbd h-11 min-w-[2.75rem] shrink-0 text-sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onKey(k)}
              aria-label={`Type ${k}`}
            >
              {k}
            </button>
          ))}
        </div>
      )}
      {coarse && (
        <p className="mt-1 text-xs text-fg-subtle">
          On-screen keyboards work, but a physical keyboard gives the most accurate speed results.
        </p>
      )}
    </div>
  )
}
