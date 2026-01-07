'use client';
import { motion } from "framer-motion";

export default function LogoFill() {
  const hexPath = "M16 4.5L26.5 10.5V21.5L16 27.5L5.5 21.5V10.5L16 4.5Z";
  const boltPath = "M15 23L18.5 13H13.5L17 5L10 15H14.5L13.5 23Z";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-32 h-32 md:w-48 md:h-48"
      >
        {/* 1. HEXAGON OUTLINE DRAWING */}
        <motion.path
          d={hexPath}
          fill="transparent"
          stroke="#3b82f6" // Primary Blue
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* 2. HEXAGON FILL (Fade In) */}
        <motion.path
          d={hexPath}
          fill="#3b82f6"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }} // Subtle background fill
          transition={{ delay: 1.2, duration: 0.5 }}
        />

        {/* 3. BOLT STRIKE (Scale & Flash) */}
        <motion.path
          d={boltPath}
          fill="#ffffff"
          stroke="none"
          initial={{ scale: 0, opacity: 0, pathLength: 0 }}
          animate={{ scale: 1, opacity: 1, pathLength: 1 }}
          transition={{ delay: 1.0, duration: 0.4, type: "spring", stiffness: 200 }}
          style={{ originX: "50%", originY: "50%" }}
        />
        
        {/* 4. FINAL GLOW PULSE */}
        <motion.path
          d={hexPath}
          fill="none"
          stroke="#06b6d4" // Cyan Accent
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1.2] }}
          transition={{ delay: 1.6, duration: 1, repeat: Infinity, repeatDelay: 1 }}
          style={{ originX: "50%", originY: "50%" }}
        />
      </svg>

      {/* TEXT REVEAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-6"
      >
        <span className="font-display font-bold text-3xl text-white tracking-[0.3em]">SERANEX</span>
      </motion.div>
      
      {/* LOADING BAR */}
      <motion.div 
        className="mt-4 h-1 bg-gray-800 rounded-full w-48 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}