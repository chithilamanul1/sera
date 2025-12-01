/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Slate 950
        surface: "#0f172a",    // Slate 900
        primary: "#3b82f6",    // Blue 500
        accent: "#06b6d4",     // Cyan 500
        text: "#f8fafc",       // Slate 50
        muted: "#94a3b8",      // Slate 400
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};