import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Trash2, RefreshCw } from 'lucide-react'
import StatsDashboard from '../components/StatsDashboard'
import { clearStats, exportStats, importStats } from '../utils/stats'

const Stats = () => {
  const handleExportStats = () => {
    const statsData = exportStats()
    const blob = new Blob([statsData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'coderush-stats.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportStats = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const success = importStats(content)
        if (success) {
          alert('Stats imported successfully!')
          window.location.reload()
        } else {
          alert('Failed to import stats. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleClearStats = () => {
    if (confirm('Are you sure you want to clear all your stats? This action cannot be undone.')) {
      clearStats()
      alert('Stats cleared successfully!')
      window.location.reload()
    }
  }

  return (
    <motion.div
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/languages" 
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Languages
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Your <span className="text-gradient">Progress</span>
              </h1>
              <p className="text-gray-400">
                Track your coding practice journey
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportStats}
              className="btn-secondary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <label className="btn-secondary flex items-center cursor-pointer">
              <RefreshCw className="w-4 h-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImportStats}
                className="hidden"
              />
            </label>
            <button
              onClick={handleClearStats}
              className="btn-secondary flex items-center text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <StatsDashboard />
      </div>
    </motion.div>
  )
}

export default Stats
