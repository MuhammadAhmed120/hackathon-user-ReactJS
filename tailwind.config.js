/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lato', 'sans-serif'], // Add your desired sans-serif font
      serif: ['Open Sans', 'serif'], // Add your desired serif font (optional)
    },
  },
  plugins: [],
}