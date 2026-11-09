/**
 * Original CodeRush graphics. Pure SVG and CSS, no external assets.
 * Animations are CSS-only and switch off under reduced motion (see styles/tokens.css).
 */
import { Code2, Terminal, Network, ShieldCheck, Router, Lock, TerminalSquare, BookOpen, Keyboard, TrendingUp, Award } from 'lucide-react'
import type { LearningPath } from '../../content/types'

export const ACCENTS: Record<LearningPath['accent'], { text: string; bg: string; ring: string; hex: string }> = {
  sky: { text: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/10', ring: 'ring-[#38BDF8]/30', hex: '#38BDF8' },
  violet: { text: 'text-[#A78BFA]', bg: 'bg-[#A78BFA]/10', ring: 'ring-[#A78BFA]/30', hex: '#A78BFA' },
  emerald: { text: 'text-[#34D399]', bg: 'bg-[#34D399]/10', ring: 'ring-[#34D399]/30', hex: '#34D399' },
  amber: { text: 'text-[#FBBF24]', bg: 'bg-[#FBBF24]/10', ring: 'ring-[#FBBF24]/30', hex: '#FBBF24' },
  rose: { text: 'text-[#FB7185]', bg: 'bg-[#FB7185]/10', ring: 'ring-[#FB7185]/30', hex: '#FB7185' },
  cyan: { text: 'text-[#22D3EE]', bg: 'bg-[#22D3EE]/10', ring: 'ring-[#22D3EE]/30', hex: '#22D3EE' },
}

const ICONS = { code: Code2, terminal: Terminal, network: Network, shield: ShieldCheck, powershell: TerminalSquare, router: Router, lock: Lock }

export function PathIcon({ icon, accent, size = 'md' }: { icon: LearningPath['icon']; accent: LearningPath['accent']; size?: 'md' | 'lg' }) {
  const I = ICONS[icon]
  const a = ACCENTS[accent]
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-lg ring-1 ${a.bg} ${a.ring} ${size === 'lg' ? 'h-14 w-14' : 'h-11 w-11'}`}>
      <I className={`${a.text} ${size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'}`} aria-hidden />
    </span>
  )
}

/** Learn, Practice, Improve, Master. */
export function FlowSteps() {
  const steps = [
    { I: BookOpen, title: 'Learn', body: 'Plain-English explanations, syntax breakdowns, and real examples.' },
    { I: Keyboard, title: 'Practice', body: 'Type the code or command with live feedback on every character.' },
    { I: TrendingUp, title: 'Improve', body: 'See the characters and commands you miss, with drills built for them.' },
    { I: Award, title: 'Master', body: 'Recall it from memory and apply it in troubleshooting scenarios.' },
  ]
  return (
    <ol className="relative grid gap-4 md:grid-cols-4 md:gap-0">
      <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 md:block" aria-hidden />
      {steps.map(({ I, title, body }, i) => (
        <li key={title} className="relative flex gap-4 md:flex-col md:items-center md:px-4 md:text-center">
          <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface shadow-e2">
            <I className="h-6 w-6 text-accent" aria-hidden />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-2xs font-bold text-accent-fg">{i + 1}</span>
          </span>
          <div>
            <h3 className="text-h3">{title}</h3>
            <p className="mt-1 text-sm text-fg-subtle">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/** A styled, clearly safe terminal transcript for the Command Lab preview. */
export function TerminalVisual({ variant = 'linux' }: { variant?: 'linux' | 'powershell' }) {
  const linux = [
    ['student@coderush:~$', 'ip -br addr'],
    ['', 'enp0s3           UP             192.0.2.25/24'],
    ['student@coderush:~$', 'ss -tuln | grep :22'],
    ['', 'tcp   LISTEN 0  128   0.0.0.0:22   0.0.0.0:*'],
    ['student@coderush:~$', 'journalctl -p err -b'],
  ]
  const ps = [
    ['PS C:\\Labs>', 'Test-NetConnection app.lab.example -Port 443'],
    ['', 'TcpTestSucceeded : True'],
    ['PS C:\\Labs>', 'Get-NetIPConfiguration | Select IPv4Address'],
    ['', '192.0.2.57'],
    ['PS C:\\Labs>', 'Resolve-DnsName example.com'],
  ]
  const lines = variant === 'linux' ? linux : ps
  return (
    <div className="terminal overflow-hidden rounded-xl border border-line bg-term shadow-e3" aria-hidden>
      <div className={`flex items-center gap-2 border-b border-white/5 px-4 py-2.5 ${variant === 'powershell' ? 'bg-[#0b1530]' : 'bg-[#11141b]'}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-[#9aa4b6]">{variant === 'linux' ? 'bash · simulated' : 'PowerShell · simulated'}</span>
      </div>
      <pre className="px-4 py-4 font-mono text-[12.5px] leading-6 text-term-fg">
        {lines.map(([p, t], i) => (
          <div key={i} className="truncate">
            {p ? (
              <>
                <span className="text-[#7ee787]">{p}</span> <span className="text-[#7dd3fc]">{t.split(' ')[0]}</span> <span>{t.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              <span className="text-[#9aa4b6]">{t}</span>
            )}
          </div>
        ))}
        <div>
          <span className="text-[#7ee787]">{lines[0]![0]}</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#7ee787]" />
        </div>
      </pre>
    </div>
  )
}

/** Layered defense: perimeter, network, host, data, with log events streaming in. */
export function SecurityVisual() {
  const events = [
    { t: '02:11:10', msg: 'Failed password for root from 203.0.113.77', tone: '#FB7185' },
    { t: '02:11:14', msg: 'Failed password for admin from 203.0.113.77', tone: '#FB7185' },
    { t: '08:58:02', msg: 'Accepted publickey for student', tone: '#34D399' },
    { t: '09:15:12', msg: 'Firewall: deny tcp 203.0.113.77 → :3389', tone: '#FBBF24' },
  ]
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-e2" aria-hidden>
      <svg viewBox="0 0 320 200" className="h-44 w-full">
        <defs>
          <radialGradient id="secglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="100" r="96" fill="url(#secglow)" />
        {[88, 66, 44].map((r, i) => (
          <circle key={r} cx="160" cy="100" r={r} fill="none" stroke={['#FB7185', '#FBBF24', '#38BDF8'][i]} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray={i === 0 ? '3 5' : undefined} />
        ))}
        <path d="M160 70 l22 9 v18 c0 15 -10 25 -22 31 c-12 -6 -22 -16 -22 -31 v-18 z" fill="#38BDF8" fillOpacity="0.15" stroke="#38BDF8" strokeWidth="2" />
        <path d="M151 100 l6 6 l12 -13" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {[
          [44, 40],
          [276, 52],
          [292, 150],
          [30, 160],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#FB7185" fillOpacity="0.85" />
            <line x1={x} y1={y} x2={160 + ((x! - 160) * 88) / Math.hypot(x! - 160, y! - 100)} y2={100 + ((y! - 100) * 88) / Math.hypot(x! - 160, y! - 100)} stroke="#FB7185" strokeOpacity="0.4" strokeDasharray="2 4" />
          </g>
        ))}
        <text x="160" y="16" textAnchor="middle" className="fill-fg-subtle text-[9px] uppercase tracking-widest">perimeter · network · host · data</text>
      </svg>
      <ul className="mt-3 space-y-1.5 font-mono text-[11px]">
        {events.map((e) => (
          <li key={e.t} className="flex items-center gap-2 truncate text-fg-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: e.tone }} />
            <span className="text-fg-subtle">{e.t}</span>
            <span className="truncate">{e.msg}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-2xs uppercase tracking-wider text-fg-subtle">Synthetic events, documentation addresses</p>
    </div>
  )
}

/** Animated typing highlight floating behind the hero demo. Decorative. */
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.16),transparent)]" />
      <div className="absolute right-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--violet)/0.12),transparent)]" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="rgb(var(--line))" strokeWidth="1" />
          </pattern>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.9" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="gridmask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#gridmask)" />
      </svg>
    </div>
  )
}

/** Floating editor panel with real syntax, layered behind the hero typing demo. */
export function CodePanel({ className = '' }: { className?: string }) {
  return (
    <div className={`terminal rounded-xl border border-line bg-term/95 p-4 font-mono text-[12px] leading-6 shadow-e3 ${className}`} aria-hidden>
      <div className="mb-2 flex items-center gap-2 text-[11px] text-[#9aa4b6]">
        <span className="h-2 w-2 rounded-full bg-[#38BDF8]" /> audit.ps1
      </div>
      <div><span className="text-[#c4b5fd]">$admins</span> = <span className="text-[#7dd3fc]">Get-LocalGroupMember</span> <span className="text-[#c4b5fd]">-Group</span> <span className="text-[#86efac]">'Administrators'</span></div>
      <div><span className="text-[#c4b5fd]">$admins</span> | <span className="text-[#7dd3fc]">Where-Object</span> {'{'} <span className="text-[#fcd34d]">$_</span>.PrincipalSource <span className="text-[#f472b6]">-eq</span> <span className="text-[#86efac]">'Local'</span> {'}'}</div>
      <div className="text-[#828ea4]"># review each account, then document</div>
    </div>
  )
}
