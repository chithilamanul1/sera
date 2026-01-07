'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., 2.5 seconds for the animation to play out)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617]"
        >
            {/* Container for glitch effect */}
            <div className="relative">
                {/* Glitch Layer Red */}
                <motion.div 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: [0, 1, 0, 1, 0], x: [-5, 5, -5, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1], delay: 0.2 }}
                    className="absolute inset-0 mix-blend-screen opacity-50"
                >
                     <Image 
                        src="https://i.ibb.co/s9XYwhc0/New-Project-3.png" 
                        alt="Seranex Logo Glitch" 
                        width={300} 
                        height={300}
                        className="object-contain filter invert sepia saturate-200 hue-rotate-[320deg]" // Red tint
                     />
                </motion.div>

                 {/* Glitch Layer Blue */}
                 <motion.div 
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: [0, 1, 0, 1, 0], x: [5, -5, 5, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1], delay: 0.3 }}
                    className="absolute inset-0 mix-blend-screen opacity-50"
                >
                     <Image 
                        src="https://i.ibb.co/s9XYwhc0/New-Project-3.png" 
                        alt="Seranex Logo Glitch" 
                        width={300} 
                        height={300}
                        className="object-contain filter invert sepia saturate-200 hue-rotate-[190deg]" // Blue tint
                     />
                </motion.div>

                {/* Main Logo Entry */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className="relative z-10"
                >
                  {/* CSS Trick: mix-blend-mode: screen makes the black background transparent */}
                  <Image 
                    src="https://i.ibb.co/s9XYwhc0/New-Project-3.png" 
                    alt="Seranex" 
                    width={300} 
                    height={300}
                    className="object-contain mix-blend-screen" 
                    priority
                  />
                </motion.div>
                
                {/* Loading Bar beneath */}
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                    className="h-0.5 bg-primary mt-4 mx-auto max-w-[300px]"
                />
            </div>
        </motion.div>
      ) : (
        // Main site content reveals underneath
        <motion.div 
            key="content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}