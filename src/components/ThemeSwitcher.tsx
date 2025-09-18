import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Monitor, Moon, Sun } from 'lucide-react'

interface ThemeSwitcherProps {
  currentTheme: string
  onThemeChange: (theme: string) => void
}

const ThemeSwitcher = ({ currentTheme, onThemeChange }: ThemeSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    {
      id: 'vs-dark',
      name: 'VS Code Dark',
      description: 'Default VS Code dark theme',
      icon: <Moon className="w-4 h-4" />,
      preview: 'bg-gray-900'
    },
    {
      id: 'monokai',
      name: 'Monokai',
      description: 'Classic Monokai theme',
      icon: <Monitor className="w-4 h-4" />,
      preview: 'bg-yellow-900'
    },
    {
      id: 'solarized-dark',
      name: 'Solarized Dark',
      description: 'Solarized dark theme',
      icon: <Sun className="w-4 h-4" />,
      preview: 'bg-blue-900'
    }
  ]

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:text-white hover:border-neon-blue transition-all duration-300"
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm">{currentThemeData.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-64 bg-dark-card border border-dark-border rounded-lg shadow-lg z-50"
          >
            <div className="p-2">
              <div className="text-xs text-gray-400 px-3 py-2 border-b border-dark-border">
                Choose Editor Theme
              </div>
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    currentTheme === theme.id
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                      : 'text-gray-300 hover:text-white hover:bg-dark-bg'
                  }`}
                >
                  <div className={`w-6 h-6 rounded ${theme.preview} border border-gray-600`}></div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{theme.name}</div>
                    <div className="text-xs text-gray-400">{theme.description}</div>
                  </div>
                  {currentTheme === theme.id && (
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSwitcher
