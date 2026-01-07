'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

const themes = [
  { name: 'Cyber Blue', primary: '#3b82f6', accent: '#06b6d4' },
  { name: 'Toxic Green', primary: '#22c55e', accent: '#84cc16' },
  { name: 'Neon Purple', primary: '#a855f7', accent: '#d946ef' },
  { name: 'Solar Orange', primary: '#f97316', accent: '#fbbf24' },
  { name: 'Crimson Red', primary: '#ef4444', accent: '#f87171' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(themes[0]);

  const changeTheme = (theme) => {
    setActiveTheme(theme);
    const root = document.documentElement;
    root.style.setProperty('--primary-hex', theme.primary);
    root.style.setProperty('--accent-hex', theme.accent);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-28 right-0 z-[60] bg-black/80 backdrop-blur border-y border-l border-gray-700 p-3 rounded-l-xl shadow-2xl hover:border-primary transition-colors group"
      >
        {isOpen ? <X className="text-white" /> : <Palette className="text-primary group-hover:rotate-180 transition-transform duration-500" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed top-28 right-16 z-[60] bg-black/90 backdrop-blur border border-gray-700 p-4 rounded-xl shadow-2xl w-48"
          >
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Select Theme</h4>
            <div className="grid grid-cols-1 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => changeTheme(theme)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors w-full group"
                >
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-600" 
                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }} 
                  />
                  <span className={`text-sm font-medium ${activeTheme.name === theme.name ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}