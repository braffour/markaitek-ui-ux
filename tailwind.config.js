/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'var(--brand-bg)',
          surface: {
            1: 'var(--brand-surface-1)',
            2: 'var(--brand-surface-2)',
            3: 'var(--brand-surface-3)',
          },
          border: {
            low: 'var(--brand-border-low)',
            base: 'var(--brand-border-base)',
            high: 'var(--brand-border-high)',
          },
          text: {
            primary: 'var(--brand-text-primary)',
            secondary: 'var(--brand-text-secondary)',
            muted: 'var(--brand-text-muted)',
          },
          accent: {
            DEFAULT: 'var(--brand-accent)',
            hover: 'var(--brand-accent-hover)',
            light: 'var(--brand-accent-light)',
            soft: 'var(--brand-accent-soft)',
          },
          warning: {
            DEFAULT: 'var(--brand-warning)',
            soft: 'var(--brand-warning-soft)',
          }
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'in': 'in 0.2s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        in: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}

