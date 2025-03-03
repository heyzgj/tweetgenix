/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xBlue: '#1d9bf0',
        xBackground: '#ffffff',
        xText: '#0f1419',
        xSecondary: '#536471',
        xBorder: '#eff3f4',
        xGreen: '#00ba7c',
        xRed: '#f91880',
      },
      fontFamily: {
        sans: ['Chirp', 'sans-serif'],
      },
    },
  },
  plugins: [],
}