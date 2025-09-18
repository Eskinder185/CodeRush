import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Zap, Target } from 'lucide-react'

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Structured Lessons",
      description: "Learn with beginner, intermediate, and advanced lessons for each programming language."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Free Practice Mode",
      description: "Customizable practice sessions with random code snippets and flexible settings."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed statistics, achievements, and performance metrics."
    }
  ]

  return (
    <motion.div
      className="min-h-screen pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="text-gradient">CodeRush</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Practice typing real code, faster.
          </motion.p>
          
          <motion.p
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Master the art of coding by practicing with real-world code snippets. 
            Improve your typing speed, accuracy, and muscle memory for programming languages.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Link to="/languages" className="btn-primary text-lg px-8 py-4">
              Start Practicing
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">CodeRush</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for developers who want to improve their coding efficiency and typing skills.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card text-center group hover:scale-105"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-neon-blue mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="card bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to <span className="text-gradient">Level Up</span> Your Coding?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of developers who are already improving their coding speed and accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/languages" className="btn-primary text-lg px-8 py-4">
                Choose Your Language
              </Link>
              <Link to="/stats" className="btn-secondary text-lg px-8 py-4">
                View Progress
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
