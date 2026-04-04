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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  }

  const heroVisualVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
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
      className="min-h-screen w-full pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center px-4 pb-20 pt-6 sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 lg:pb-28">
        {/* Ambient depth — single layer, no animation */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        >
          <div className="absolute left-1/2 top-[12%] h-[min(42rem,85vh)] w-[min(56rem,100vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-blue/[0.12] via-neon-purple/[0.06] to-transparent blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-dark-bg sm:h-40" />
        </div>

        <div className="relative mx-auto w-full max-w-page">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_min(20rem,34%)] lg:gap-14 xl:gap-20">
            {/* Copy column */}
            <div className="text-center lg:max-w-none lg:text-left">
              <motion.p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neon-blue/90 sm:mb-5 sm:text-sm sm:tracking-[0.22em]"
                variants={itemVariants}
              >
                <span className="text-gradient">CodeRush</span>
              </motion.p>

              <motion.h1
                className="mx-auto max-w-[min(100%,20rem)] text-balance text-display font-bold tracking-tight text-ink sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-[28rem]"
                variants={itemVariants}
              >
                Practice typing real code, faster.
              </motion.h1>

              <motion.p
                className="body-prose mx-auto mt-6 max-w-md text-ink-subtle sm:mt-7 sm:max-w-lg lg:mx-0 lg:max-w-xl"
                variants={itemVariants}
              >
                Master the art of coding by practicing with real-world code snippets. Improve your typing
                speed, accuracy, and muscle memory for programming languages.
              </motion.p>

              <motion.div
                className="mt-9 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 lg:mx-0"
                variants={itemVariants}
              >
                <Link
                  to="/languages"
                  className="btn-primary order-1 w-full justify-center px-8 py-3.5 text-base sm:w-auto sm:min-w-[12.5rem] sm:py-4 sm:text-lg"
                >
                  Start Practicing
                  <ArrowRight className="ml-2 inline-block h-5 w-5 shrink-0" aria-hidden />
                </Link>
                <Link
                  to="/about"
                  className="btn-secondary order-2 w-full justify-center px-8 py-3.5 text-base sm:w-auto sm:py-4 sm:text-lg"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>

            {/* Supporting visual — static, desktop + large tablet */}
            <motion.div
              className="mx-auto hidden w-full max-w-sm md:block lg:max-w-none"
              variants={heroVisualVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative rounded-card border border-dark-border/90 bg-dark-surface/90 p-1 shadow-card backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-dark-border/80 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" aria-hidden />
                  <span className="ml-2 font-mono text-[10px] text-ink-faint sm:text-xs">
                    practice.py
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-left font-mono text-[11px] leading-relaxed text-ink-muted sm:text-xs">
                  <span className="text-neon-purple">def </span>
                  <span className="text-neon-blue">rush</span>
                  <span className="text-ink-muted">():</span>
                  {'\n    '}
                  <span className="text-neon-purple">return </span>
                  <span className="text-emerald-400/90">&quot;wpm ↑&quot;</span>
                </pre>
                <div className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-gradient-to-br from-neon-blue/15 via-transparent to-neon-purple/10 opacity-80" aria-hidden />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-block section-flow px-4 sm:px-6 lg:px-8">
        <div className="page-inner">
          <motion.div
            className="section-head max-w-3xl md:mx-auto"
            variants={itemVariants}
          >
            <h2 className="heading-section mb-0 px-2">
              Why Choose <span className="text-gradient">CodeRush</span>?
            </h2>
            <div className="section-rule" aria-hidden />
            <p className="body-lead mx-auto mt-5 max-w-2xl text-ink-subtle md:mt-6">
              Built for developers who want to improve their coding efficiency and typing skills.
            </p>
          </motion.div>

          <div className="grid auto-rows-fr gap-6 sm:gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="group feature-card h-full">
                  <div className="feature-card__icon [&_svg]:h-7 [&_svg]:w-7">
                    {feature.icon}
                  </div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__body">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-block section-flow-soft px-4 pb-20 sm:px-6 lg:px-8">
        <div className="page-inner-narrow">
          <motion.div
            className="cta-panel cta-panel-accent"
            variants={itemVariants}
          >
            <h2 className="heading-section mb-4 px-2 pt-1">
              Ready to <span className="text-gradient">Level Up</span> Your Coding?
            </h2>
            <p className="body-prose mx-auto mb-8 max-w-xl text-ink-muted md:max-w-2xl">
              Join thousands of developers who are already improving their coding speed and accuracy.
            </p>
            <div className="cta-panel__actions">
              <Link
                to="/languages"
                className="btn-primary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg"
              >
                Choose Your Language
              </Link>
              <Link
                to="/stats"
                className="btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[11rem] sm:text-lg"
              >
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
