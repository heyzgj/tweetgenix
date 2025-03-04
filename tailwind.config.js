/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'oklch(100% 0 0)',
        foreground: 'oklch(15% 0 0)',
        border: 'oklch(95% 0 0)',
        muted: 'oklch(97% 0 0)',
        'muted-foreground': 'oklch(45% 0 0)',
        primary: 'oklch(15% 0 0)',
        'primary-foreground': 'oklch(100% 0 0)',
        success: 'oklch(60% 0.15 150)',
      },
      fontFamily: {
        sans: ['Chirp', 'sans-serif'],
      },
    },
  },
  plugins: [],
}