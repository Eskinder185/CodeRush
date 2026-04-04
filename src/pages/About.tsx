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
      className="page-shell"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="page-inner">
        {/* Hero Section */}
        <motion.div
          className="section-head max-w-4xl md:mx-auto"
          variants={itemVariants}
        >
          <h1 className="heading-page mb-0 px-2">
            About <span className="text-gradient">CodeRush</span>
          </h1>
          <div className="section-rule" aria-hidden />
          <p className="body-lead mx-auto mt-5 max-w-3xl text-ink-subtle md:mt-6">
            CodeRush is an open-source typing practice platform designed specifically for developers 
            who want to improve their coding speed and accuracy. We believe that typing code efficiently 
            is a crucial skill that can significantly boost your productivity as a developer.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="card mb-16 p-8 text-center md:p-10"
          variants={itemVariants}
        >
          <h2 className="heading-section mb-6">Our Mission</h2>
          <p className="body-prose mx-auto max-w-4xl text-ink-muted md:text-lg">
            To help developers master the art of coding by providing a platform where they can practice 
            typing real-world code snippets. We focus on building muscle memory for common programming 
            patterns, syntax, and structures across multiple programming languages.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="section-divide mb-16 grid auto-rows-fr gap-6 sm:gap-8 md:grid-cols-3"
          variants={itemVariants}
        >
          {features.map((feature, index) => (
            <div key={index} className="group feature-card h-full">
              <div className="feature-card__icon [&_svg]:h-7 [&_svg]:w-7">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__body">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="card mb-16 p-8 md:p-10"
          variants={itemVariants}
        >
          <h2 className="heading-section mb-2 text-center">By the Numbers</h2>
          <div className="section-rule mx-auto mb-10" aria-hidden />
          <div className="grid grid-cols-2 gap-8 gap-y-10 md:grid-cols-4 md:gap-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-gradient">
                  {stat.number}
                </div>
                <div className="caption">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why CodeRush Section */}
        <motion.div
          className="section-divide mb-16 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14"
          variants={itemVariants}
        >
          <div>
            <h2 className="heading-section mb-2">Why CodeRush?</h2>
            <div className="section-rule ml-0 mr-auto mb-8 w-14" aria-hidden />
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-neon-blue">Real Code Practice</h3>
                <p className="body-prose text-ink-subtle">
                  Unlike traditional typing tests, CodeRush uses actual code snippets from real projects, 
                  helping you build muscle memory for programming syntax and patterns.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-neon-purple">Multiple Languages</h3>
                <p className="body-prose text-ink-subtle">
                  Practice with Python, JavaScript, TypeScript, Go, Rust, and many more languages. 
                  Each language has its own unique syntax and patterns to master.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-neon-blue">Progress Tracking</h3>
                <p className="body-prose text-ink-subtle">
                  Monitor your improvement with detailed statistics including typing speed, accuracy, 
                  and progress over time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="highlight-panel lg:sticky lg:top-24">
            <h3 className="mb-4 text-xl font-bold tracking-tight text-ink md:text-2xl">Get Involved</h3>
            <p className="body-prose mb-6 text-ink-muted">
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
          className="section-divide text-center"
          variants={itemVariants}
        >
          <div className="cta-panel cta-panel-accent">
            <h2 className="heading-section mb-4 px-2 pt-1">
              Ready to Start Your <span className="text-gradient">Coding Journey</span>?
            </h2>
            <p className="body-prose mx-auto mb-8 max-w-2xl text-ink-muted md:text-lg">
              Join thousands of developers who are already improving their coding skills with CodeRush. 
              Start practicing today and see the difference in your productivity.
            </p>
            <div className="cta-panel__actions">
              <Link
                to="/languages"
                className="btn-primary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg"
              >
                Choose Your Language
              </Link>
              <Link
                to="/faq"
                className="btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg"
              >
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
