import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Languages from './pages/Languages'
import LanguageLessons from './pages/LanguageLessons'
import LessonPractice from './pages/LessonPractice'
import PracticeMode from './pages/PracticeMode'
import Stats from './pages/Stats'
import About from './pages/About'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'
import ParticleBackground from './components/ParticleBackground'
import SiteFooter from './components/SiteFooter'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  // Handle GitHub Pages redirect
  useEffect(() => {
    const pathSegmentsToKeep = 0;
    const l = window.location;
    if (l.pathname.includes('/CodeRush/') && l.search.includes('?/')) {
      const p = l.search.slice(l.search.indexOf('?/') + 2);
      l.replace(l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + 
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/' + 
        p.replace(/~and~/g, '&') + l.hash);
    }
  }, []);
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.PROD ? '/CodeRush' : '/'} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="flex min-h-screen flex-col bg-dark-bg text-ink">
          <ParticleBackground />
          <Navbar />
          <div className="flex min-h-0 flex-1 flex-col">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="" element={<Home />} />
                <Route path="/languages" element={<Languages />} />
                <Route path="/languages/:language/lessons" element={<LanguageLessons />} />
                <Route path="/languages/:language/lesson/:lessonId" element={<LessonPractice />} />
                <Route path="/languages/:language/practice" element={<PracticeMode />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </div>
          <SiteFooter />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
