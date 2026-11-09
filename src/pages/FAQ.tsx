import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PageHeader } from '../components/ui'
import { usePageMeta } from '../app/context'
import { REPO_URL } from '../app/Footer'
import { languageTracks } from '../content/code'
import { commands } from '../content/commands'

export default function FAQ() {
  usePageMeta('FAQ', 'Answers about CodeRush: accounts, data, supported languages, the Command Lab, scoring, and mobile use.')
  const [open, setOpen] = useState<number | null>(0)
  const items: [string, string][] = [
    ['Do I need an account?', 'No. Everything works without signing up. Your progress is saved in this browser.'],
    ['Where is my progress stored? Will it sync?', 'Only in this browser’s local storage. It does not sync between devices or browsers. Use Export on the Progress page to back it up, and Import to restore it elsewhere.'],
    ['Which programming languages are included?', `${languageTracks.map((t) => t.languageName).join(', ')}.`],
    ['Which command platforms are included?', `Linux (Bash), Windows PowerShell, Windows Command Prompt networking tools, and Cisco IOS show commands: ${commands.length} exercises in total.`],
    ['Does the Command Lab run real commands?', 'No. It is a simulation. Your input is compared with the expected answers and curated sample output is shown. Nothing is executed. Practice real commands only on systems you are authorized to use, such as your own virtual machine.'],
    ['How is WPM calculated?', 'Net WPM is correct characters divided by five, per minute of active typing. Raw WPM counts all keystrokes, including corrected ones. Paused time is excluded.'],
    ['Why can I not paste into the typing area?', 'Pasting would inflate scores and skip the practice itself. Custom Practice lets you paste text into a separate source box, and you then type it.'],
    ['Why did my lesson not count as completed?', 'A lesson passes only when your final text matches exactly. If characters were still wrong when you reached the end, it is recorded as an attempt so you can see your speed, but it does not count as passed.'],
    ['How does Tab work while typing?', 'When the next characters are indentation, Tab fills them. Otherwise Tab moves focus as usual, so keyboard navigation keeps working. In Forgiving mode, indentation after Enter is filled automatically and not counted as typed.'],
    ['Can I use CodeRush on my phone?', 'Yes. Lessons, quizzes, scenarios, and the terminal work on phones, with on-screen symbol keys for characters like | and {. A physical keyboard gives the most accurate speed results.'],
    ['Is my 1.x progress kept?', 'Yes. CodeRush 2 reads your saved 1.x sessions and migrates them automatically. The original data is left in place as a backup.'],
    ['How do I report a mistake or request a feature?', `Open an issue on GitHub: ${REPO_URL}/issues.`],
  ]
  return (
    <div className="page max-w-3xl">
      <PageHeader eyebrow="Help" title="Frequently asked questions" />
      <div className="divide-y divide-line rounded-lg border border-line bg-surface">
        {items.map(([q, a], i) => (
          <div key={q}>
            <h2>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium hover:bg-elevated"
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {q}
                <ChevronDown className={`h-4 w-4 shrink-0 text-fg-subtle transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden />
              </button>
            </h2>
            <div id={`faq-${i}`} hidden={open !== i} className="px-5 pb-4 text-sm leading-relaxed text-fg-muted">
              {a}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
