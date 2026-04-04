import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="page-shell flex items-center justify-center"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.4, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-md px-2 text-center">
        <motion.div
          className="mb-6 text-8xl font-bold text-gradient"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.06, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          404
        </motion.div>
        
        <h1 className="heading-section mb-4">
          Page Not Found
        </h1>
        
        <p className="body-prose mb-8 text-ink-subtle">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex min-h-[44px] items-center justify-center">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn-secondary flex min-h-[44px] items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFound
