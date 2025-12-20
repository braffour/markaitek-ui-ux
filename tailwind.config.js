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
          bg: '#222E34',
          surface: {
            1: '#2A3A42',
            2: '#354852',
            3: '#3F5560',
          },
          border: {
            low: 'rgba(255, 255, 255, 0.06)',
            base: 'rgba(255, 255, 255, 0.1)',
            high: 'rgba(255, 255, 255, 0.2)',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#64748B',
          },
          accent: {
            DEFAULT: '#0D9488', // Teal 600
            hover: '#0F766E',   // Teal 700
            light: '#2DD4BF',   // Teal 400
            soft: 'rgba(13, 148, 136, 0.1)',
          },
          warning: {
            DEFAULT: '#F59E0B', // Amber 500
            soft: 'rgba(245, 158, 11, 0.1)',
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

