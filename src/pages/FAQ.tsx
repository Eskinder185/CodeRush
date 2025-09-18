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
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about CodeRush and how to get the most out of your coding practice.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          variants={itemVariants}
        >
          {faqData.map((item) => (
            <motion.div
              key={item.id}
              className="card overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-opacity-50 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-neon-blue">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    <ChevronDown className="w-6 h-6" />
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
                    <div className="px-6 pb-6">
                      <div className="border-t border-dark-border pt-4">
                        <p className="text-gray-300 leading-relaxed">
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
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div className="card bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border-neon-blue/30">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Still Have Questions?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? We'd love to hear from you! 
              Reach out to us through our GitHub repository or join our community discussions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Visit GitHub
              </button>
              <button className="btn-secondary">
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
