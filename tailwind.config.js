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
        void: '#050505',        // Deep Black
        surface: '#121212',     // Matte Dark Gray
        silver: '#EAEAEA',      // Silver
        white: '#FFFFFF',       // White
        platinum: '#E5E4E2',    // Platinum
        glow: {
          silver: '#FFFFFF',    // Starlight Silver (default)
          green: '#00FF41',     // Matrix Green
          gold: '#FFD700',      // Royal Gold
          red: '#FF0040',       // Cyber Red
        },
      },
      fontFamily: {
        heading: ['Unbounded', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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