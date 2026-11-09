import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader, ProgressBar } from '../components/ui'
import { usePageMeta } from '../app/context'
import { languageTracks, codeLessonCount } from '../content/code'
import { useAppData } from '../lib/storage/store'
import { languageProgress } from '../lib/progress'

export default function Languages() {
  usePageMeta('Programming languages', `${codeLessonCount} typing lessons across ${languageTracks.length} programming languages.`)
  const data = useAppData()
  return (
    <div className="page">
      <PageHeader
        eyebrow="Programming syntax"
        title="Choose a language"
        lead={`${codeLessonCount} lessons across ${languageTracks.length} languages: Python, JavaScript, TypeScript, Java, C++, Go, SQL, HTML and CSS, and Bash.`}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {languageTracks.map((t) => {
          const p = languageProgress(data, t.language)
          return (
            <li key={t.language}>
              <Link to={`/languages/${t.language}/lessons`} className="panel group flex h-full flex-col p-5 interactive">
                <div className="flex items-center justify-between">
                  <h2 className="text-h3">{t.languageName}</h2>
                  <span className="font-mono text-xs text-fg-subtle">{t.lessons.length} lessons</span>
                </div>
                <p className="mt-1 text-sm text-fg-subtle">{t.description}</p>
                <div className="mt-auto pt-5">
                  <div className="mb-1 flex justify-between text-xs text-fg-subtle">
                    <span>
                      {p.passed} of {p.total} passed
                    </span>
                    <span>{p.percent}%</span>
                  </div>
                  <ProgressBar value={p.percent} label={`${t.languageName} lessons passed`} tone="ok" />
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  View lessons <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
