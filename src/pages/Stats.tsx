import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Trash2, RefreshCw } from 'lucide-react'
import StatsDashboard from '../components/StatsDashboard'
import { clearStats, downloadStatsExport, getStoredStats, importStats } from '../utils/stats'

const Stats = () => {
  const importInputRef = useRef<HTMLInputElement>(null)
  const [hasStatsToExport, setHasStatsToExport] = useState(() => getStoredStats().length > 0)

  useEffect(() => {
    setHasStatsToExport(getStoredStats().length > 0)
  }, [])

  const handleExportStats = () => {
    if (getStoredStats().length === 0) return
    downloadStatsExport()
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
    event.target.value = ''
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
      className="page-shell"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="page-inner">
        <header className="mb-8 space-y-6 lg:mb-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="min-w-0 space-y-4">
              <Link
                to="/languages"
                className="btn-secondary inline-flex w-fit max-w-full items-center text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                Back to languages
              </Link>
              <div>
                <h1 className="heading-page text-balance text-ink">
                  Your <span className="text-gradient">Progress</span>
                </h1>
                <div className="section-rule ml-0 mr-auto mt-4 w-16 sm:mt-5" aria-hidden />
                <p className="body-lead mt-4 max-w-2xl text-ink-subtle sm:mt-5">
                  Track lessons completed, speed, and accuracy. Data stays in your browser unless you export
                  it.
                </p>
              </div>
            </div>

            <div
              className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:max-w-md lg:flex-col xl:max-w-none xl:flex-row xl:flex-wrap xl:justify-end"
              role="toolbar"
              aria-label="Stats actions"
            >
              <div className="flex w-full flex-col gap-1 sm:w-auto sm:min-w-[8.5rem]">
                <button
                  type="button"
                  onClick={handleExportStats}
                  disabled={!hasStatsToExport}
                  title={
                    hasStatsToExport
                      ? 'Download a JSON file with your summary and session history'
                      : 'Complete a lesson first to export stats'
                  }
                  className="btn-secondary inline-flex min-h-[44px] w-full items-center justify-center disabled:pointer-events-none disabled:opacity-45"
                >
                  <Download className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                  Export stats
                </button>
                {!hasStatsToExport && (
                  <p className="text-center text-xs text-ink-subtle sm:text-left">
                    No saved sessions yet — finish a lesson to enable export.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => importInputRef.current?.click()}
                className="btn-secondary inline-flex min-h-[44px] w-full items-center justify-center sm:w-auto sm:min-w-[8.5rem]"
              >
                <RefreshCw className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                Import
              </button>
              <input
                ref={importInputRef}
                type="file"
                accept=".json,application/json"
                className="sr-only"
                aria-label="Choose a CodeRush stats JSON file to import"
                onChange={handleImportStats}
              />
              <button
                type="button"
                onClick={handleClearStats}
                className="btn-danger inline-flex min-h-[44px] w-full items-center justify-center sm:w-auto sm:min-w-[8.5rem]"
              >
                <Trash2 className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                Clear all
              </button>
            </div>
          </div>
        </header>

        <StatsDashboard />
      </div>
    </motion.div>
  )
}

export default Stats
