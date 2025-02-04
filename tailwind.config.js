/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#01251a',
        primary: {
          DEFAULT: '#FF0000',
          50: '#F1F5FB',
          100: '#E3EBF7',
          200: '#C7D7F0',
          300: '#ABC2E8',
          400: '#8FAEE0',
          500: '#01251a',
          600: '#3061AF',
          700: '#285192',
          800: '#204075',
          900: '#183058',
          'accent-100': '#d9e4f3',
          'accent-200': '#cedbee',
        },
        secondary: '#9333EA',
      },
      fontFamily: {
        quattrocento: ['Quattrocento', 'sans-serif'],
      },
      keyframes: {
        scaleUpDown: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.9' },
        },
      },
      animation: {
        scaleUpDown: 'scaleUpDown 2s infinite ease-in-out',
        breath: 'breath 10s linear infinite',
      },
    },
  },
  plugins: [],
}
