import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'
import { Logo } from './Logo'

export const REPO_URL = 'https://github.com/Eskinder185/CodeRush'

export function Footer() {
  const cols = [
    { title: 'Learn', links: [['/learn', 'Learning paths'], ['/languages', 'Programming languages'], ['/tools/subnetting', 'Subnetting trainer'], ['/tools/topology', 'Network topology']] },
    { title: 'Practice', links: [['/practice', 'Typing practice'], ['/lab', 'Command Lab'], ['/practice/recall', 'Recall mode'], ['/challenges', 'Daily challenge']] },
    { title: 'CodeRush', links: [['/about', 'About'], ['/faq', 'FAQ'], ['/privacy', 'Privacy'], ['/progress', 'Your progress']] },
  ]
  return (
    <footer className="border-t border-line bg-sunken/60">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-fg-subtle">Type faster. Learn deeper. Master your tools. Free, open source, and private: your progress stays in this browser.</p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href={REPO_URL} className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg" rel="noopener noreferrer" target="_blank">
              <Github className="h-4 w-4" aria-hidden /> Source on GitHub
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">{c.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {c.links.map(([to, label]) => (
                <li key={to}>
                  <Link to={to!} className="text-fg-muted hover:text-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-col gap-2 px-4 py-5 text-xs text-fg-subtle sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>Command Lab output is simulated for learning. Practice real commands only on systems you are authorized to use.</span>
          <a href={`${REPO_URL}/issues/new`} className="hover:text-fg" rel="noopener noreferrer" target="_blank">
            Report an issue or request a feature
          </a>
        </div>
      </div>
    </footer>
  )
}
