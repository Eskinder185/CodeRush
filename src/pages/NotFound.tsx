import { useLocation } from 'react-router-dom'
import { ButtonLink } from '../components/ui'
import { usePageMeta } from '../app/context'
import { SearchPanel } from '../app/SearchPanel'

export default function NotFound() {
  const loc = useLocation()
  usePageMeta('Page not found')
  const guess = loc.pathname.split('/').filter(Boolean).pop()?.replace(/[-_.]/g, ' ') ?? ''
  return (
    <div className="page max-w-3xl">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-h1">This page does not exist</h1>
      <p className="lead mt-3">
        Nothing lives at <code className="code-inline">{loc.pathname}</code>. It may have moved in CodeRush 2. Search for what you were looking for, or start from a hub.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ButtonLink to="/">Home</ButtonLink>
        <ButtonLink to="/learn" variant="secondary">Learning paths</ButtonLink>
        <ButtonLink to="/lab" variant="secondary">Command Lab</ButtonLink>
        <ButtonLink to="/practice" variant="secondary">Typing practice</ButtonLink>
      </div>
      <div className="mt-10">
        <SearchPanel initial={guess} autoFocus={false} />
      </div>
    </div>
  )
}
