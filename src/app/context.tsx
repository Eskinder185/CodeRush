import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { setLastVisited } from '../lib/storage/store'

interface AppUI {
  focusMode: boolean
  setFocusMode: (v: boolean) => void
  openSearch: (q?: string) => void
  openSettings: () => void
  openShortcuts: () => void
}

export const AppUIContext = createContext<AppUI>({
  focusMode: false,
  setFocusMode: () => {},
  openSearch: () => {},
  openSettings: () => {},
  openShortcuts: () => {},
})

export function useAppUI() {
  return useContext(AppUIContext)
}

export function AppUIProvider({ value, children }: { value: AppUI; children: ReactNode }) {
  return <AppUIContext.Provider value={value}>{children}</AppUIContext.Provider>
}

const SITE = 'CodeRush'

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE}: Type faster. Learn deeper. Master your tools.`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
  }, [title, description])
}

/** Records the page as the "Continue learning" target on the home page. */
export function useTrackVisit(path: string, title: string | undefined) {
  useEffect(() => {
    if (title) setLastVisited(path, title)
  }, [path, title])
}

/** True when the user is typing in a field, so single-key shortcuts must not fire. */
export function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable
}

export function useMediaQuery(q: string): boolean {
  const [m, setM] = useState(() => (typeof window !== 'undefined' ? !!window.matchMedia?.(q).matches : false))
  useEffect(() => {
    const mq = window.matchMedia?.(q)
    if (!mq) return
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [q])
  return m
}
