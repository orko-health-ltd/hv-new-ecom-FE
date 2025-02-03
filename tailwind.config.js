/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
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
