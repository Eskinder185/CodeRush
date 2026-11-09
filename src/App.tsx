import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Navbar } from './app/Navbar'
import { Footer } from './app/Footer'
import { AppUIProvider, isTypingTarget } from './app/context'
import { SettingsDialog, ShortcutsDialog } from './app/Dialogs'
import { ErrorBoundary } from './app/ErrorBoundary'
import { ToastProvider, Skeleton } from './components/ui'
import { applySettings, prefersReducedMotion, useSettings } from './lib/settings'
import { getStorageError } from './lib/storage/store'

const SearchDialog = lazy(() => import('./app/SearchPanel'))
const Home = lazy(() => import('./pages/Home'))
const Learn = lazy(() => import('./pages/Learn'))
const PathPage = lazy(() => import('./pages/PathPage'))
const ModulePage = lazy(() => import('./pages/ModulePage'))
const CommandLab = lazy(() => import('./pages/CommandLab'))
const CommandLesson = lazy(() => import('./pages/CommandLesson'))
const ScenarioPage = lazy(() => import('./pages/ScenarioPage'))
const Practice = lazy(() => import('./pages/Practice'))
const Recall = lazy(() => import('./pages/Recall'))
const Languages = lazy(() => import('./pages/Languages'))
const LanguageLessons = lazy(() => import('./pages/LanguageLessons'))
const LessonPractice = lazy(() => import('./pages/LessonPractice'))
const Subnetting = lazy(() => import('./pages/Subnetting'))
const Topology = lazy(() => import('./pages/Topology'))
const Challenges = lazy(() => import('./pages/Challenges'))
const Progress = lazy(() => import('./pages/Progress'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="page space-y-4" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <div className="grid gap-4 pt-6 md:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** CodeRush 1.x URL for free practice; it now opens Typing Practice preset to that language. */
function LegacyPracticeRedirect() {
  const { language } = useParams()
  return <Navigate to={`/practice?mode=speed&language=${encodeURIComponent(language ?? 'all')}`} replace />
}

function Shell() {
  const settings = useSettings()
  const [focusMode, setFocusMode] = useState(false)
  const [search, setSearch] = useState<{ open: boolean; q?: string }>({ open: false })
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => applySettings(settings), [settings])
  useEffect(() => {
    if (settings.theme !== 'system') return
    const mq = window.matchMedia?.('(prefers-color-scheme: light)')
    const on = () => applySettings(settings)
    mq?.addEventListener?.('change', on)
    return () => mq?.removeEventListener?.('change', on)
  }, [settings])

  // Leaving a page always exits Focus Mode.
  useEffect(() => setFocusMode(false), [loc.pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target)) return
      if (document.querySelector('dialog[open]')) return
      if (e.key === '/') {
        e.preventDefault()
        setSearch({ open: true })
      } else if (e.key === ',') {
        setSettingsOpen(true)
      } else if (e.key === '?') {
        setShortcutsOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const ui = useMemo(
    () => ({
      focusMode,
      setFocusMode,
      openSearch: (q?: string) => setSearch({ open: true, q }),
      openSettings: () => setSettingsOpen(true),
      openShortcuts: () => setShortcutsOpen(true),
    }),
    [focusMode]
  )

  const storageError = getStorageError()

  return (
    <AppUIProvider value={ui}>
      <MotionConfig reducedMotion={prefersReducedMotion(settings) ? 'always' : 'never'}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          {storageError && !focusMode && (
            <div role="alert" className="fixed inset-x-0 top-16 z-40 bg-warn/15 px-4 py-2 text-center text-sm text-warn">
              {storageError}
            </div>
          )}
          <main id="main" className="flex-1" tabIndex={-1}>
            <ErrorBoundary key={loc.pathname}>
              <Suspense fallback={<PageFallback />}>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/learn/:pathId" element={<PathPage />} />
                  <Route path="/learn/:pathId/:moduleId" element={<ModulePage />} />
                  <Route path="/lab" element={<CommandLab />} />
                  <Route path="/lab/command/:id" element={<CommandLesson />} />
                  <Route path="/lab/scenario/:id" element={<ScenarioPage />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/practice/recall" element={<Recall />} />
                  <Route path="/languages" element={<Languages />} />
                  <Route path="/languages/:language/lessons" element={<LanguageLessons />} />
                  <Route path="/languages/:language/lesson/:lessonId" element={<LessonPractice />} />
                  <Route path="/languages/:language/practice" element={<LegacyPracticeRedirect />} />
                  <Route path="/tools/subnetting" element={<Subnetting />} />
                  <Route path="/tools/topology" element={<Topology />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/stats" element={<Navigate to="/progress" replace />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          {!focusMode && <Footer />}
        </div>
        {search.open && (
          <Suspense fallback={null}>
            <SearchDialog open initial={search.q} onClose={() => setSearch({ open: false })} />
          </Suspense>
        )}
        <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        <ShortcutsDialog open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      </MotionConfig>
    </AppUIProvider>
  )
}

/** Router basename comes from Vite's base, "/CodeRush/" in production and "/" in development. */
export const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={BASENAME} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </BrowserRouter>
  )
}
