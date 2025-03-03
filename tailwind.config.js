/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgb(47, 51, 54)",
        input: "rgb(47, 51, 54)",
        ring: "rgb(29, 155, 240)",
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "rgb(29, 155, 240)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "rgb(244, 33, 46)",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "rgb(47, 51, 54)",
          foreground: "rgb(113, 118, 123)",
        },
        accent: {
          DEFAULT: "rgb(47, 51, 54)",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['Chirp', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}