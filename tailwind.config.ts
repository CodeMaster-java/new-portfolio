import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0b0d',
          900: '#111316',
          800: '#17191d',
          700: '#24262b',
          600: '#34363c',
        },
        paper: {
          50: '#f3f1ea',
          200: '#c7c9ce',
          400: '#8b8e96',
        },
        amber: {
          400: '#ffc65c',
          500: '#ffb020',
          600: '#c77e00',
        },
        petrol: {
          400: '#59cfc6',
          500: '#1fa9a0',
          600: '#12665f',
        },
      },
      fontFamily: {
        display: ['"Archivo"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
      },
      boxShadow: {
        edge: '0 1px 0 0 rgba(255, 255, 255, 0.04)',
      },
    },
  },
  plugins: [],
}

export default config
