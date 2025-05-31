/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4fa',
          100: '#d9e2f2',
          200: '#b3c6e6',
          300: '#8ca9d9',
          400: '#668dcc',
          500: '#4071bf',
          600: '#335c99',
          700: '#264673',
          800: '#1a304d',
          900: '#0d1826',
          950: '#050c13',
        },
        secondary: {
          50: '#fcf8ed',
          100: '#f8f1db',
          200: '#f1e3b7',
          300: '#ebd693',
          400: '#e4c86f',
          500: '#e4b04a',
          600: '#cd973a',
          700: '#b6832a',
          800: '#8a621f',
          900: '#5d4115',
          950: '#2f210a',
        },
        accent: {
          50: '#f0fbfa',
          100: '#d0f3f0',
          200: '#a0e7e0',
          300: '#71dbd0',
          400: '#41cfc0',
          500: '#26b3a6',
          600: '#1e8f85',
          700: '#166b64',
          800: '#0f4742',
          900: '#072421',
          950: '#031211',
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};