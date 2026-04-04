import { Mail, Linkedin, Github, Globe } from 'lucide-react'

const creatorLinks = [
  {
    href: 'https://eskinder.dev/',
    label: 'Portfolio website (opens in a new tab)',
    short: 'Portfolio',
    icon: Globe,
  },
  {
    href: 'mailto:eskinderkassahun25@gmail.com',
    label: 'Email eskinderkassahun25@gmail.com',
    short: 'Email',
    icon: Mail,
  },
  {
    href: 'https://www.linkedin.com/in/eskinder-kassahun/',
    label: 'LinkedIn profile (opens in a new tab)',
    short: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://github.com/Eskinder185',
    label: 'GitHub profile (opens in a new tab)',
    short: 'GitHub',
    icon: Github,
  },
] as const

const SiteFooter = () => {
  return (
    <footer
      className="mt-auto border-t border-dark-border/80 bg-dark-bg/85 backdrop-blur-md"
      role="contentinfo"
    >
      <div className="mx-auto max-w-page px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-subtle">Creator</p>
            <p className="mt-1 text-sm text-ink-muted">
              Built by Eskinder Kassahun — portfolio, email, and social links below.
            </p>
          </div>

          <nav aria-label="Creator contact and social links">
            <ul className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              {creatorLinks.map(({ href, label, short, icon: Icon }) => {
                const isExternal = href.startsWith('http')
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-dark-border/70 bg-dark-card/40 px-3 py-2 text-ink-muted transition-colors hover:border-neon-blue/40 hover:bg-neon-blue/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg sm:min-w-0 sm:px-4"
                      aria-label={label}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      <span className="hidden text-sm font-medium sm:inline">{short}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
