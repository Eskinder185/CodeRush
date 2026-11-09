/** @type {import('tailwindcss').Config} */
// Every color resolves to a CSS variable defined in src/styles/tokens.css,
// so dark and light themes switch by changing data-theme on <html>.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      colors: {
        bg: v('bg'),
        elevated: v('elevated'),
        surface: v('surface'),
        sunken: v('sunken'),
        line: v('line'),
        'line-strong': v('line-strong'),
        fg: v('fg'),
        'fg-muted': v('fg-muted'),
        'fg-subtle': v('fg-subtle'),
        accent: v('accent'),
        'accent-fg': v('accent-fg'),
        violet: v('violet'),
        ok: v('ok'),
        warn: v('warn'),
        err: v('err'),
        term: v('term'),
        'term-fg': v('term-fg'),
      },
      maxWidth: { page: '76rem', prose: '42rem' },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        display: ['clamp(2.375rem, 4.2vw + 1rem, 4.25rem)', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '700' }],
        h1: ['clamp(1.875rem, 2.4vw + 1rem, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.028em', fontWeight: '700' }],
        h2: ['clamp(1.375rem, 1.2vw + 1rem, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '650' }],
        h3: ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: { sm: '0.375rem', DEFAULT: '0.5rem', md: '0.625rem', lg: '0.875rem', xl: '1.125rem' },
      boxShadow: {
        e1: 'var(--shadow-1)',
        e2: 'var(--shadow-2)',
        e3: 'var(--shadow-3)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      transitionDuration: { fast: '120ms', DEFAULT: '180ms', slow: '320ms' },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-up': 'fade-up 320ms cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
