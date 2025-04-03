/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        unna: ['Unna', 'serif'],
      },
    },
  },
  plugins: [],
}
