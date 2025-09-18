import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Code, Database, Terminal, Cpu, Hash, Brackets } from 'lucide-react'

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
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your <span className="text-gradient">Language</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select a programming language to start practicing your typing skills with real-world code snippets.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-12"
          variants={itemVariants}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none transition-colors duration-300"
            />
          </div>
        </motion.div>

        {/* Languages Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {filteredLanguages.map((language) => (
            <motion.div
              key={language.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/languages/${language.id}/lessons`}>
                <div className="card group cursor-pointer h-full">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${language.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {language.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-neon-blue transition-colors duration-300">
                      {language.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {language.description}
                  </p>
                  <div className="mt-4 flex items-center text-neon-blue text-sm font-medium group-hover:text-white transition-colors duration-300">
                    Start Practicing
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredLanguages.length === 0 && (
          <motion.div
            className="text-center py-12"
            variants={itemVariants}
          >
            <div className="text-gray-400 text-lg">
              No languages found matching "{searchTerm}"
            </div>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-neon-blue hover:text-white transition-colors duration-300"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div className="card bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Can't Find Your Language?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're constantly adding new programming languages. If you don't see your preferred language, 
              let us know and we'll consider adding it!
            </p>
            <button className="btn-secondary">
              Request a Language
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Languages
