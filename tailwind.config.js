/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        'neon-blue': '#22d3ee',
        'neon-purple': '#a78bfa',
        'dark-bg': '#07080c',
        'dark-surface': '#0f1016',
        'dark-card': '#14151c',
        'dark-border': '#2a2e3a',
        ink: {
          DEFAULT: '#f1f3f7',
          muted: '#cfd6e2',
          subtle: '#9aa8bc',
          faint: '#6b7588',
        },
      },
      maxWidth: {
        page: '80rem',
      },
      spacing: {
        nav: '4rem',
      },
      fontSize: {
        display: [
          'clamp(2.5rem, 5vw + 1.25rem, 4.5rem)',
          { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' },
        ],
        'page-title': [
          'clamp(2rem, 3vw + 1.25rem, 3.5rem)',
          { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '700' },
        ],
        'section-title': [
          'clamp(1.375rem, 1.5vw + 1rem, 2rem)',
          { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
      },
      boxShadow: {
        card: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 4px 24px -6px rgba(0,0,0,0.55)',
        'card-hover':
          'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 8px 36px -8px rgba(34,211,238,0.14)',
        nav: '0 1px 0 0 rgba(255,255,255,0.06)',
        'btn-primary': '0 4px 20px -4px rgba(34,211,238,0.35)',
      },
      borderRadius: {
        card: '0.875rem',
        btn: '0.625rem',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-neon': 'pulseNeon 2s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseNeon: {
          '0%, 100%': {
            boxShadow: '0 0 6px rgba(34,211,238,0.45), 0 0 14px rgba(34,211,238,0.25)',
          },
          '50%': {
            boxShadow: '0 0 12px rgba(34,211,238,0.55), 0 0 28px rgba(34,211,238,0.2)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
