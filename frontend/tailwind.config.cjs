/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Red Hat Display', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#1e293b',
        background: '#f1f5f9',
      },
    },
  },
  plugins: [],
}