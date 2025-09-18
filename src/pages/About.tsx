import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code, Users, Heart, Github, Star } from 'lucide-react'

const About = () => {
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
      title: "Real-World Code",
      description: "Practice with actual code snippets from popular open-source projects and common programming patterns."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by developers, for developers. Contribute your own code snippets to help others learn."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Open Source",
      description: "Completely free and open source. Help us improve CodeRush by contributing to the project."
    }
  ]

  const stats = [
    { number: "1000+", label: "Code Snippets" },
    { number: "15+", label: "Languages" },
    { number: "50+", label: "Contributors" },
    { number: "10K+", label: "Practice Sessions" }
  ]

  return (
    <motion.div
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient">CodeRush</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            CodeRush is an open-source typing practice platform designed specifically for developers 
            who want to improve their coding speed and accuracy. We believe that typing code efficiently 
            is a crucial skill that can significantly boost your productivity as a developer.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="card mb-16 text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            To help developers master the art of coding by providing a platform where they can practice 
            typing real-world code snippets. We focus on building muscle memory for common programming 
            patterns, syntax, and structures across multiple programming languages.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={itemVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card text-center group hover:scale-105"
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
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="card mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why CodeRush Section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 mb-16"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Why CodeRush?</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-neon-blue mb-2">Real Code Practice</h3>
                <p className="text-gray-400">
                  Unlike traditional typing tests, CodeRush uses actual code snippets from real projects, 
                  helping you build muscle memory for programming syntax and patterns.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neon-purple mb-2">Multiple Languages</h3>
                <p className="text-gray-400">
                  Practice with Python, JavaScript, TypeScript, Go, Rust, and many more languages. 
                  Each language has its own unique syntax and patterns to master.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neon-blue mb-2">Progress Tracking</h3>
                <p className="text-gray-400">
                  Monitor your improvement with detailed statistics including typing speed, accuracy, 
                  and progress over time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="card bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border-neon-blue/30">
            <h3 className="text-2xl font-bold mb-4 text-white">Get Involved</h3>
            <p className="text-gray-300 mb-6">
              CodeRush is an open-source project that thrives on community contributions. 
              Whether you're a beginner or an experienced developer, there are many ways to contribute.
            </p>
            <div className="space-y-4">
              <button className="btn-primary w-full flex items-center justify-center">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </button>
              <button className="btn-secondary w-full flex items-center justify-center">
                <Star className="w-5 h-5 mr-2" />
                Star the Project
              </button>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <div className="card bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Start Your <span className="text-gradient">Coding Journey</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already improving their coding skills with CodeRush. 
              Start practicing today and see the difference in your productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/languages" className="btn-primary text-lg px-8 py-4">
                Choose Your Language
              </Link>
              <Link to="/faq" className="btn-secondary text-lg px-8 py-4">
                View FAQ
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About
