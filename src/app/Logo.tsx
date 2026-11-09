/** CodeRush mark: a caret chevron racing ahead of a typed underline. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="cr-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="rgb(var(--surface))" stroke="url(#cr-g)" strokeWidth="1.5" />
      <path d="M9 11 l6 5 l-6 5" fill="none" stroke="url(#cr-g)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="17" y="19.5" width="7" height="2.6" rx="1.3" fill="#38BDF8" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark />
      <span className="text-[1.05rem] font-semibold tracking-tight text-fg">
        Code<span className="text-accent">Rush</span>
      </span>
    </span>
  )
}
