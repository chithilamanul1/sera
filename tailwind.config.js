/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#0f172a",
        primary: "#3b82f6",
        accent: "#06b6d4",
        text: "#f8fafc",
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-sinhala)', 'sans-serif'],
        display: ['var(--font-outfit)', 'var(--font-sinhala)', 'sans-serif'], // Sinhala added here
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};