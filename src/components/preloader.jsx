'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoFill from './LogoFill'; // <--- NEW COMPONENT

export default function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the full animation cycle (approx 3 seconds)
    const timer = setTimeout(() => { setIsLoading(false); }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617]"
        >
            <LogoFill />
        </motion.div>
      ) : (
        <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}