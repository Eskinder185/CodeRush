import { PageHeader } from '../components/ui'
import { usePageMeta } from '../app/context'

export default function Privacy() {
  usePageMeta('Privacy', 'CodeRush stores progress only in your browser and sends no personal data anywhere.')
  return (
    <div className="page max-w-3xl">
      <PageHeader eyebrow="Privacy" title="Your data stays with you" />
      <div className="prose-cr">
        <p><strong>No accounts, no tracking.</strong> CodeRush has no sign-up, no analytics, no advertising, and no server that receives your activity. It is a static site hosted on GitHub Pages.</p>
        <p><strong>What is stored.</strong> Practice results, mastery, quiz scores, daily challenge scores, saved commands, and settings are stored in your browser&rsquo;s local storage under keys that start with &ldquo;coderush&rdquo;. Custom Practice text is kept only in memory for the current tab.</p>
        <p><strong>What leaves your device.</strong> Nothing, unless you export a file yourself. Fonts and code are served from the same site. GitHub Pages, like any web host, may keep standard server logs; see GitHub&rsquo;s privacy statement.</p>
        <p><strong>Removing your data.</strong> Use &ldquo;Clear all progress&rdquo; on the Progress page, or clear this site&rsquo;s data in your browser settings.</p>
      </div>
    </div>
  )
}
