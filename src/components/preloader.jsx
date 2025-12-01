'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

export default function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617]"
        >
            {/* NO BOX - JUST TEXT */}
            <div className="scale-150 md:scale-100">
                <AnimatedLogo textSize="text-6xl md:text-9xl" />
            </div>
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