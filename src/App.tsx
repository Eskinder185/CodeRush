import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-dark-bg">
          <ParticleBackground />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
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
      </Router>
    </ErrorBoundary>
  )
}

export default App
