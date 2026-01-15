/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-void',
    'bg-surface',
    'text-silver',
    'text-white',
    'bg-accent',
    'text-accent',
    'border-silver',
    'glow-text',
    'glass',
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',        // Pure Black
        surface: '#111111',     // Almost Black
        silver: '#F5F5F5',      // White Smoke
        white: '#FFFFFF',       // Pure White
        platinum: '#E5E4E2',    // Platinum
        accent: '#E30613',      // WebLankan Red
        glow: {
          silver: '#FFFFFF',    // Starlight Silver (default)
          green: '#00FF41',     // Matrix Green
          gold: '#FFD700',      // Royal Gold
          red: '#E30613',       // Corporate Red
        },
      },
      fontFamily: {
        heading: ['Unbounded', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        autologo: ['var(--font-autologo)', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'subway-train': 'subwayTrain 3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px currentColor' },
          '50%': { opacity: '0.5', boxShadow: '0 0 40px currentColor' },
        },
        subwayTrain: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};