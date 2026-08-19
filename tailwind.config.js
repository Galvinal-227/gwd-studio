/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        'offwhite': '#FAFAF9',
        'ink': '#0A0A0A',
        'gray-secondary': '#6B7280',
        'border-light': '#E5E7EB',
      },
    },
  },
  plugins: [],
}