import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Code, Zap, Users } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
  icon: React.ReactNode
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default

  const faqData: FAQItem[] = [
    {
      id: 0,
      question: "What is CodeRush?",
      answer: "CodeRush is a typing practice platform specifically designed for developers. Unlike traditional typing tests that use random text, CodeRush uses real code snippets from popular programming languages. This helps developers build muscle memory for programming syntax, improve their coding speed, and enhance their overall productivity when writing code.",
      icon: <HelpCircle className="w-6 h-6" />
    },
    {
      id: 1,
      question: "How does it work?",
      answer: "CodeRush presents you with real code snippets from various programming languages. You type the code exactly as shown, and the platform tracks your typing speed, accuracy, and progress over time. The system provides immediate feedback on your performance and helps you identify areas for improvement. You can practice with different difficulty levels and various programming languages to build comprehensive coding skills.",
      icon: <Code className="w-6 h-6" />
    },
    {
      id: 2,
      question: "Can I contribute code snippets?",
      answer: "Absolutely! CodeRush is an open-source project that welcomes contributions from the developer community. You can contribute code snippets by submitting pull requests to our GitHub repository. We're always looking for high-quality, real-world code examples that can help other developers improve their typing skills. Check out our contribution guidelines on GitHub to get started.",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 3,
      question: "Which programming languages are supported?",
      answer: "CodeRush currently supports Python, JavaScript, TypeScript, Go, Rust, Java, C++, and many more popular programming languages. We're constantly adding new languages based on community demand. Each language includes various difficulty levels and real-world code patterns to help you master the syntax and common programming structures.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 4,
      question: "Is CodeRush free to use?",
      answer: "Yes, CodeRush is completely free and open-source! We believe that learning and improving coding skills should be accessible to everyone. The platform is funded by community donations and sponsorships. All features are available at no cost, and we're committed to keeping it that way.",
      icon: <HelpCircle className="w-6 h-6" />
    },
    {
      id: 5,
      question: "How can I track my progress?",
      answer: "CodeRush provides detailed statistics including your typing speed (WPM), accuracy percentage, time spent practicing, and progress over time. You can view your performance history, identify your strengths and weaknesses, and set personal goals. The platform also offers achievements and milestones to keep you motivated on your coding journey.",
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

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
      className="page-shell"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="page-inner-narrow">
        {/* Header */}
        <motion.div
          className="section-head max-w-3xl md:mx-auto"
          variants={itemVariants}
        >
          <h1 className="heading-page mb-0 px-2">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <div className="section-rule" aria-hidden />
          <p className="body-lead mx-auto mt-5 max-w-2xl text-ink-subtle md:mt-6">
            Everything you need to know about CodeRush and how to get the most out of your coding practice.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-3 sm:space-y-4"
          variants={itemVariants}
        >
          {faqData.map((item) => (
            <motion.div
              key={item.id}
              className="accordion-card"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="focus-ring w-full px-5 py-5 text-left sm:px-6 sm:py-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-neon-blue/25 bg-neon-blue/[0.08] text-neon-blue [&_svg]:h-5 [&_svg]:w-5">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
                      {item.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 shrink-0 text-ink-subtle"
                  >
                    <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-dark-border/80 px-5 pb-5 sm:px-6 sm:pb-6">
                      <div className="pt-4">
                        <p className="body-prose pl-[3.75rem] text-ink-muted sm:pl-16">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="section-divide text-center"
          variants={itemVariants}
        >
          <div className="cta-panel cta-panel-accent">
            <h2 className="heading-section mb-4 px-2 pt-1">
              Still Have Questions?
            </h2>
            <p className="body-prose mx-auto mb-8 max-w-2xl text-ink-muted">
              Can't find the answer you're looking for? We'd love to hear from you! 
              Reach out to us through our GitHub repository or join our community discussions.
            </p>
            <div className="cta-panel__actions">
              <button type="button" className="btn-primary justify-center px-8 py-3.5 text-base sm:min-w-[10rem] sm:text-lg">
                Visit GitHub
              </button>
              <button type="button" className="btn-secondary justify-center px-8 py-3.5 text-base sm:min-w-[10rem] sm:text-lg">
                Join Community
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FAQ
