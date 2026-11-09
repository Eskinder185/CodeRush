import { Github } from 'lucide-react'
import { ButtonLink, PageHeader } from '../components/ui'
import { usePageMeta } from '../app/context'
import { REPO_URL } from '../app/Footer'
import { commands } from '../content/commands'
import { scenarios } from '../content/scenarios'
import { learningPaths } from '../content/paths'
import { codeLessonCount, languageTracks } from '../content/code'

export default function About() {
  usePageMeta('About', 'What CodeRush is, how it measures progress, and how the Command Lab stays safe.')
  const modules = learningPaths.reduce((n, p) => n + p.modules.length, 0)
  const quiz = learningPaths.reduce((n, p) => n + p.modules.reduce((m, x) => m + x.quiz.length, 0), 0)
  return (
    <div className="page max-w-4xl">
      <PageHeader eyebrow="About" title="Type faster. Learn deeper. Master your tools." lead="CodeRush is a free, open-source practice platform for people who work with code and command lines: students, developers, IT and network technicians, administrators, and security analysts." />

      <section className="prose-cr">
        <h2 className="text-h2 text-fg">What is in it</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>{codeLessonCount} programming typing lessons in {languageTracks.length} languages.</li>
          <li>{commands.length} command exercises for Linux, PowerShell, Windows networking, and Cisco IOS.</li>
          <li>{scenarios.length} troubleshooting scenarios with simulated output.</li>
          <li>{learningPaths.length} learning paths with {modules} modules and {quiz} quiz questions.</li>
          <li>A subnetting trainer, a network topology explorer, a daily challenge, and a progress dashboard.</li>
        </ul>
        <p>These numbers are counted from the content files at build time, and automated tests check every record for completeness.</p>
      </section>

      <section id="mastery" className="prose-cr mt-10 scroll-mt-24">
        <h2 className="text-h2 text-fg">How progress is measured</h2>
        <p>
          <strong>Typing speed and knowledge are measured separately.</strong> Net WPM is correct characters divided by five, per minute. Raw WPM counts every keystroke. Accuracy is correct keystrokes divided by all keystrokes, so mistakes you fixed with Backspace still count.
        </p>
        <p>
          <strong>A programming lesson passes only on an exact match.</strong> Reaching the end with wrong characters is recorded as an attempt, not a completion.
        </p>
        <p>
          <strong>Command mastery</strong> runs from 0 to 100: typing 30% (best accuracy on a perfect attempt), recall 40% (up to two correct answers from memory), and repetition 30% (success on up to three different days). Typing speed never affects it. A command is <em>practiced</em> at 40 and <em>mastered</em> at 80 with at least one successful recall.
        </p>
        <p>
          <strong>Module mastery</strong> combines the module&rsquo;s commands or lessons (60%), its quiz (25%), and its scenarios (15%), reweighted when a module lacks a part. A module is complete when the quiz reaches 50%, every command is practiced, every lesson is passed, and every scenario is finished.
        </p>
        <p>
          <strong>Recommendations are rules, not AI.</strong> A character group is suggested for a drill after at least 15 recent attempts with an error rate of 6% or more, and the page shows the numbers behind each suggestion.
        </p>
      </section>

      <section className="prose-cr mt-10">
        <h2 className="text-h2 text-fg">How the Command Lab stays safe</h2>
        <p>The terminal is a simulation. What you type is compared with the answers stored for each lesson and is never executed: not in your browser, not on a server, not anywhere. Output is curated sample text that uses documentation-reserved addresses, and it is labelled as simulated.</p>
        <p>Security content is defensive and uses synthetic data. Commands that change a system are labelled, and the lessons tell you to practice them only on systems you are authorized to manage.</p>
      </section>

      <section className="prose-cr mt-10">
        <h2 className="text-h2 text-fg">Accuracy of the content</h2>
        <p>Each command links to its official documentation. Command syntax was written against those references by the content author and has not been independently reviewed; any entry that needs verification is marked in the lesson. If you find a mistake, please report it.</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-md border border-line-strong bg-surface px-4 text-sm font-medium interactive">
          <Github className="h-4 w-4" aria-hidden /> Source on GitHub
        </a>
        <ButtonLink to="/learn">Explore the learning paths</ButtonLink>
      </div>
    </div>
  )
}
