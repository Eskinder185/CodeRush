import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Search, Settings2, Sun, Moon, ArrowRight, Minimize2 } from 'lucide-react'
import { useAppUI } from './context'
import { useAppData } from '../lib/storage/store'
import { resolvedTheme, updateSettings, useSettings } from '../lib/settings'
import { buttonClass } from '../components/ui'
import { Logo } from './Logo'

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/learn', label: 'Learn' },
  { to: '/practice', label: 'Typing Practice' },
  { to: '/lab', label: 'Command Lab' },
  { to: '/challenges', label: 'Challenges' },
  { to: '/progress', label: 'Progress' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const { openSearch, openSettings, focusMode, setFocusMode } = useAppUI()
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const data = useAppData()
  const settings = useSettings()
  const theme = resolvedTheme(settings)
  const cont = data.lastVisited

  useEffect(() => setOpen(false), [loc.pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (focusMode) {
    return (
      <div className="fixed right-4 top-4 z-50">
        <button type="button" onClick={() => setFocusMode(false)} className={buttonClass('secondary', 'sm', 'shadow-e2')}>
          <Minimize2 className="h-4 w-4" aria-hidden /> Exit Focus Mode
        </button>
      </div>
    )
  }

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-fast ${isActive ? 'text-fg' : 'text-fg-subtle hover:text-fg'}`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-xl backdrop-saturate-150">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-page items-center gap-3 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Link to="/" className="mr-2 flex items-center gap-2 rounded-md" aria-label="CodeRush home">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <NavLink to={n.to} end={n.end} className={linkCls}>
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && <span className="absolute inset-x-2.5 -bottom-[13px] h-0.5 rounded-full bg-accent" aria-hidden />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => openSearch()}
            className="hidden h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-fg-subtle interactive 2xl:flex"
            aria-label="Search lessons and commands"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span>Search</span>
            <kbd className="kbd ml-3">/</kbd>
          </button>
          <button type="button" onClick={() => openSearch()} className="rounded-md p-2.5 text-fg-subtle interactive 2xl:hidden" aria-label="Search (press /)">
            <Search className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => updateSettings({ theme: theme === 'dark' ? 'light' : 'dark' })}
            className="hidden rounded-md p-2.5 text-fg-subtle interactive min-[400px]:inline-flex"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
          </button>
          <button type="button" onClick={openSettings} className="rounded-md p-2.5 text-fg-subtle interactive" aria-label="Open settings">
            <Settings2 className="h-5 w-5" aria-hidden />
          </button>
          <Link to={cont ? cont.path : '/practice'} className={buttonClass('primary', 'sm', 'ml-1 hidden sm:inline-flex')}>
            {cont ? 'Continue learning' : 'Start practicing'} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2.5 text-fg-muted interactive xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-nav" className="max-h-[calc(100dvh-4rem)] animate-fade-up overflow-y-auto border-t border-line bg-bg/95 backdrop-blur-xl xl:hidden">
          <ul className="mx-auto max-w-page space-y-1 px-4 py-4 sm:px-6">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) => `flex min-h-[48px] items-center rounded-md px-3 text-base font-medium ${isActive ? 'bg-elevated text-fg' : 'text-fg-muted hover:bg-elevated'}`}
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Link to={cont ? cont.path : '/practice'} className={buttonClass('primary', 'lg', 'w-full')}>
                {cont ? `Continue: ${cont.title}` : 'Start practicing'}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
