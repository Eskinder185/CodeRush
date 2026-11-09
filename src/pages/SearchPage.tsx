import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { SearchPanel } from '../app/SearchPanel'
import { usePageMeta } from '../app/context'

export default function SearchPage() {
  const [params] = useSearchParams()
  usePageMeta('Search', 'Search CodeRush commands, lessons, learning paths, and scenarios.')
  return (
    <div className="page max-w-3xl">
      <PageHeader eyebrow="Search" title="Find anything" lead="Commands, lessons, learning paths, and scenarios. Synonyms work: try “find ip address” or “check open ports”." />
      <SearchPanel initial={params.get('q') ?? ''} />
    </div>
  )
}
