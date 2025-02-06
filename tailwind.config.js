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
          DEFAULT: '#01251a',
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
        secondary: '#b4a345',
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
        breathout: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.0)', opacity: '0.8' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        scaleUpDown: 'scaleUpDown 2s infinite ease-in-out',
        breath: 'breath 10s linear infinite',
        breathout: 'breath 10s linear infinite',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
