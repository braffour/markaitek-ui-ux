/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0071e3',
          dark: '#050505',
          surface: '#121212',
          border: '#ffffff1a', // white/10
        }
      },
      boxShadow: {
        'glow-blue': '0 0 20px -5px rgba(0, 113, 227, 0.5)',
        'glow-white': '0 0 20px -5px rgba(255, 255, 255, 0.2)',
      },
      animation: {
        'in': 'in 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        in: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
