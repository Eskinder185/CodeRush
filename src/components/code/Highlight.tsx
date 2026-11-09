import { useState } from 'react'
import { Check, Copy, FlaskConical } from 'lucide-react'
import type { CommandExercise } from '../../content/types'

type Tok = { t: string; c?: string }

/** Tiny shell-aware tokenizer for display only. It never evaluates anything. */
export function tokenizeCommand(src: string, shell: CommandExercise['shell']): Tok[] {
  const out: Tok[] = []
  const re = /(#.*$)|("(?:[^"\\]|\\.)*"|'[^']*')|(\$[A-Za-z_?][\w:]*|\$\{[^}]*\}|\$_|\$\?)|(\s--?[A-Za-z][\w-]*|\s\/[A-Za-z]+\b)|(\|\||&&|[|;>]{1,2}|2>)|(\b\d+(?:\.\d+)*\b)|(\S+)|(\s+)/gm
  let m: RegExpExecArray | null
  let first = true
  while ((m = re.exec(src))) {
    const [all, com, str, v, flag, op, num, word] = m
    if (com && shell !== 'ios') out.push({ t: all, c: 'tok-com' })
    else if (str) out.push({ t: all, c: 'tok-str' })
    else if (v) out.push({ t: all, c: 'tok-var' })
    else if (flag && !(shell === 'bash' && /^\s\//.test(flag))) {
      out.push({ t: flag.slice(0, 1) })
      out.push({ t: flag.slice(1), c: 'tok-flag' })
    } else if (op) {
      out.push({ t: all, c: 'tok-op' })
      if (op.includes('|') || op === ';' || op === '&&') first = true
      continue
    } else if (num) out.push({ t: all, c: 'tok-num' })
    else if (word) {
      out.push({ t: all, c: first ? 'tok-cmd' : undefined })
      first = false
      continue
    } else out.push({ t: all })
    if (!/^\s+$/.test(all)) first = false
  }
  return out
}

export function Highlighted({ code, shell }: { code: string; shell: CommandExercise['shell'] }) {
  return (
    <>
      {code.split('\n').map((line, i) => (
        <span key={i} className="block">
          {tokenizeCommand(line, shell).map((tok, j) => (
            <span key={j} className={tok.c}>
              {tok.t}
            </span>
          ))}
          {line === '' ? '\u00a0' : null}
        </span>
      ))}
    </>
  )
}

const PROMPT: Record<CommandExercise['shell'], string> = { bash: '$', powershell: 'PS>', cmd: 'C:\\>', ios: 'Router#' }

export function CommandBlock({ command, shell, copy = true }: { command: string; shell: CommandExercise['shell']; copy?: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="terminal group relative rounded-lg border border-line bg-term text-term-fg">
      <pre className="scroll-x px-4 py-3 pr-12 font-mono text-[0.95rem] leading-relaxed" tabIndex={0} aria-label={`Command: ${command}`}>
        <span className="mr-2 select-none text-fg-subtle">{PROMPT[shell]}</span>
        <span className="inline-block align-top">
          <Highlighted code={command} shell={shell} />
        </span>
      </pre>
      {copy && (
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(command)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1500)
            } catch {
              // Clipboard can be unavailable; the command is still visible and selectable.
            }
          }}
          className="absolute right-2 top-2 rounded-md p-2 text-fg-subtle hover:bg-white/5 hover:text-term-fg"
          aria-label={copied ? 'Copied' : 'Copy command'}
        >
          {copied ? <Check className="h-4 w-4 text-ok" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        </button>
      )}
    </div>
  )
}

/** Curated sample output, always labelled as simulated. */
export function SimulatedOutput({ output, title = 'Simulated sample output' }: { output: string; title?: string }) {
  return (
    <figure className="terminal overflow-hidden rounded-lg border border-line bg-term">
      <figcaption className="flex items-center gap-2 border-b border-white/5 px-4 py-2 text-2xs font-medium uppercase tracking-wider text-fg-subtle">
        <FlaskConical className="h-3.5 w-3.5" aria-hidden /> {title}
      </figcaption>
      <pre className="scroll-x max-h-80 overflow-y-auto px-4 py-3 font-mono text-[0.82rem] leading-relaxed text-term-fg" tabIndex={0} aria-label={title}>{output.trim() ? output : '(no output: this command prints nothing when it succeeds)'}</pre>
    </figure>
  )
}
