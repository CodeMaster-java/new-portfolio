import { fontFamily } from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2edff',
          100: '#ded2ff',
          200: '#c1a8ff',
          300: '#a178ff',
          400: '#8a51ff',
          500: '#6d3dfa',
          600: '#512add',
          700: '#3a1cb0',
          800: '#271281',
          900: '#120b4f',
        },
        surface: {
          50: '#f6f6f8',
          100: '#e5e6eb',
          200: '#c9cad3',
          300: '#9ea0ac',
          400: '#747584',
          500: '#5d5e6b',
          600: '#4c4d58',
          700: '#3f4049',
          800: '#2a2b33',
          900: '#16171d',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', ...fontFamily.sans],
        mono: ['"JetBrains Mono"', ...fontFamily.mono],
      },
      boxShadow: {
        glow: '0 0 40px rgba(109, 61, 250, 0.35)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 1px 1px, rgba(141, 121, 255, 0.18) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}

export default config
