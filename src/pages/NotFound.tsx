import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-md mx-auto text-center">
        <motion.div
          className="text-8xl font-bold text-gradient mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center justify-center"
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
