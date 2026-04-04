import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Languages', path: '/languages' },
    { name: 'Stats', path: '/stats' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-dark-border bg-dark-bg/88 shadow-nav backdrop-blur-md backdrop-saturate-150"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 rounded-md focus-visible:outline-none"
          >
            <motion.div
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CodeRush
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex min-h-[44px] items-center px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-ink ${
                  location.pathname === item.path
                    ? 'text-neon-blue'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              type="button"
              id="mobile-menu-button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="site-mobile-nav"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMobileMenu}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
              whileTap={{ scale: 0.98 }}
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            id="site-mobile-nav"
            role="region"
            aria-label="Mobile navigation"
            className="fixed left-0 right-0 top-16 border-b border-dark-border bg-dark-card shadow-card md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block min-h-[44px] rounded-md px-3 py-3 text-base font-medium transition-colors duration-200 hover:text-neon-blue ${
                      location.pathname === item.path
                        ? 'text-neon-blue'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
