import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-4xl font-bold text-gradient mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CodeRush
        </motion.div>
        <motion.div
          className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  )
}

export default Loading
