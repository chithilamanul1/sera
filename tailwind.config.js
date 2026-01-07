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
        // HERE IS THE MAGIC: We use the CSS Variable instead of a fixed color
        primary: "var(--primary-hex)",
        accent: "var(--accent-hex)",
        text: "#f8fafc",
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-sinhala)', 'sans-serif'],
        display: ['var(--font-outfit)', 'var(--font-sinhala)', 'sans-serif'],
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