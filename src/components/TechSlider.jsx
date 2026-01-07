'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const technologies = [
  { id: 'next', name: 'Next.js 15', color: '#ffffff', path: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.5 15.5L12 10L8.5 15.5H7L11.25 9L11.25 15.5H12.75V9L17 15.5H15.5Z", desc: 'The React Framework for the Web.' },
  { id: 'react', name: 'React', color: '#61DAFB', path: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM12 20C9.33 20 7 18.67 7 16.67C7 14.67 9.33 13.33 12 13.33C14.67 13.33 17 14.67 17 16.67C17 18.67 14.67 20 12 20Z", desc: 'User Interfaces.' },
  { id: 'firebase', name: 'Firebase', color: '#FFCA28', path: "M12 2L2 22H22L12 2ZM12 6L18 18H6L12 6Z", desc: 'Realtime Database.' },
  { id: 'python', name: 'Python', color: '#3776AB', path: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 18C10 18 8 16.66 8 15C8 13.34 10 12 12 12C14 12 16 13.34 16 15C16 16.66 14 18 12 18Z", desc: 'AI & Data.' },
  { id: 'tailwind', name: 'Tailwind', color: '#38B2AC', path: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8 12L11 9L14 12L11 15L8 12ZM16 12L19 9L22 12L19 15L16 12Z", desc: 'Styling.' },
  { id: 'vercel', name: 'Vercel', color: '#ffffff', path: "M12 2L2 22H22L12 2Z", desc: 'Deployment.' }
];

export default function TechSlider() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="py-12 w-full overflow-hidden relative group border-t border-b border-white/5 bg-black/20">
        {/* Clean Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
           {[...technologies, ...technologies, ...technologies].map((tech, i) => (
             <button 
                key={i} 
                onClick={() => setSelected(tech)}
                className="mx-8 flex flex-col items-center gap-3 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 group/icon"
             >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover/icon:border-primary/50 group-hover/icon:shadow-primary/20 transition-all">
                    <svg viewBox="0 0 24 24" fill={tech.color} className="w-8 h-8">
                        <path d={tech.path} />
                    </svg>
                </div>
                <span className="font-bold text-sm text-gray-400 group-hover/icon:text-white uppercase tracking-widest">{tech.name}</span>
             </button>
           ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-surface border border-gray-700 p-8 rounded-3xl max-w-md w-full shadow-2xl"
            >
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 rounded-full p-2"><X size={20} /></button>
                <h3 className="text-2xl font-bold text-white mb-2">{selected.name}</h3>
                <p className="text-gray-300 text-sm">{selected.desc}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}