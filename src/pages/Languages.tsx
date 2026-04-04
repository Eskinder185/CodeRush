import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Code, Database, Terminal, Cpu, Hash, Brackets, BookOpen } from 'lucide-react'

interface Language {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

const Languages = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const languages: Language[] = [
    {
      id: 'python',
      name: 'Python',
      icon: <Code className="w-8 h-8" />,
      description: 'High-level programming language for web development, data science, and automation',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: <Code className="w-8 h-8" />,
      description: 'Dynamic programming language for web development and server-side applications',
      color: 'from-yellow-300 to-yellow-500'
    },
    {
      id: 'java',
      name: 'Java',
      icon: <Cpu className="w-8 h-8" />,
      description: 'Object-oriented programming language for enterprise applications and Android development',
      color: 'from-red-500 to-red-700'
    },
    {
      id: 'cpp',
      name: 'C++',
      icon: <Cpu className="w-8 h-8" />,
      description: 'High-performance programming language for system programming and game development',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'html-css',
      name: 'HTML/CSS',
      icon: <Brackets className="w-8 h-8" />,
      description: 'Markup and styling languages for creating beautiful web pages and user interfaces',
      color: 'from-orange-500 to-pink-500'
    },
    {
      id: 'sql',
      name: 'SQL',
      icon: <Database className="w-8 h-8" />,
      description: 'Structured Query Language for managing and manipulating relational databases',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'bash',
      name: 'Bash',
      icon: <Terminal className="w-8 h-8" />,
      description: 'Command-line shell and scripting language for system administration and automation',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      icon: <Hash className="w-8 h-8" />,
      description: 'Strongly typed superset of JavaScript for large-scale application development',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'go',
      name: 'Go',
      icon: <Cpu className="w-8 h-8" />,
      description: 'Modern programming language for building efficient and scalable software',
      color: 'from-cyan-400 to-blue-500'
    }
  ]

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className="page-shell"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="page-inner">
        {/* Header */}
        <motion.div
          className="mb-12 text-center md:mb-14 md:mx-auto md:max-w-3xl"
          variants={itemVariants}
        >
          <h1 className="heading-page mb-0 px-2">
            Choose Your <span className="text-gradient">Language</span>
          </h1>
          <div className="section-rule" aria-hidden />
          <p className="body-lead mx-auto mt-5 max-w-3xl text-ink-subtle md:mt-6">
            Select a programming language to start practicing your typing skills with real-world code snippets.
          </p>
          <p className="mx-auto mt-6 flex max-w-lg items-start justify-center gap-2.5 text-left text-sm leading-relaxed text-ink-muted sm:mt-7 sm:max-w-xl sm:text-center md:items-center">
            <BookOpen
              className="mt-0.5 h-4 w-4 shrink-0 text-neon-blue sm:mt-0"
              aria-hidden
            />
            <span>
              <span className="font-medium text-ink-subtle">Next step:</span> pick a language below, then
              choose a lesson on the following page to begin typing.
            </span>
          </p>
        </motion.div>

        {/* Search */}
        <motion.div className="mx-auto mb-3 max-w-lg sm:mb-4" variants={itemVariants}>
          <label
            htmlFor="language-search"
            className="mb-2 block text-center text-sm font-medium text-ink-muted"
          >
            Find a language
          </label>
          <div className="search-shell">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-subtle"
              aria-hidden
            />
            <input
              id="language-search"
              type="search"
              name="language-search"
              autoComplete="off"
              placeholder="Try Python, JavaScript, SQL…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus-ring w-full border-0 bg-transparent py-3.5 pl-11 pr-4 text-ink placeholder:text-ink-faint focus:ring-0 focus:ring-offset-0"
            />
          </div>
          <p className="caption mt-2 text-center text-ink-faint" aria-live="polite">
            {filteredLanguages.length === languages.length
              ? `${languages.length} languages available`
              : `${filteredLanguages.length} match${filteredLanguages.length === 1 ? '' : 'es'}`}
          </p>
        </motion.div>

        {/* Languages Grid */}
        <motion.div
          className="mb-4 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3"
          variants={containerVariants}
          aria-label="Programming languages"
        >
          {filteredLanguages.map((language) => (
            <motion.div key={language.id} variants={itemVariants}>
              <Link
                to={`/languages/${language.id}/lessons`}
                className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg rounded-card"
              >
                <div className="content-card h-full">
                  <div className="mb-5 flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-2.5 shadow-inner ${language.color} text-white transition duration-200 group-hover:brightness-110`}
                    >
                      <span className="[&_svg]:h-6 [&_svg]:w-6">{language.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-neon-blue md:text-xl">
                        {language.name}
                      </h3>
                    </div>
                  </div>
                  <p className="caption mb-5 flex-1 text-ink-subtle md:text-[0.9375rem] md:leading-relaxed">
                    {language.description}
                  </p>
                  <div className="mt-auto flex items-center text-sm font-medium text-neon-blue transition-colors duration-200 group-hover:text-cyan-200">
                    <span>Start Practicing</span>
                    <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No results */}
        {filteredLanguages.length === 0 && (
          <motion.div className="py-8 sm:py-10" variants={itemVariants}>
            <div className="empty-state-panel border-solid py-12 sm:py-14">
              <Search className="mx-auto h-11 w-11 text-ink-faint" strokeWidth={1.25} aria-hidden />
              <p className="body-prose mt-5 text-ink-muted">
                No languages match{' '}
                <span className="font-medium text-ink">&ldquo;{searchTerm}&rdquo;</span>
              </p>
              <p className="caption mt-2 max-w-xs mx-auto text-ink-subtle">
                Try another keyword or clear the search to see all languages again.
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="btn-secondary mt-8 w-full max-w-xs justify-center sm:w-auto"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="section-divide text-center"
          variants={itemVariants}
        >
          <div className="cta-panel cta-panel-accent">
            <h2 className="heading-section mb-4 px-2 pt-1">
              Can't Find Your Language?
            </h2>
            <p className="body-prose mx-auto mb-8 max-w-2xl text-ink-muted">
              We're constantly adding new programming languages. If you don't see your preferred language, 
              let us know and we'll consider adding it!
            </p>
            <div className="cta-panel__actions justify-center">
              <button type="button" className="btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[12rem] sm:text-lg">
                Request a Language
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Languages
