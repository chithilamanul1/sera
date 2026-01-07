'use client';
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 12, stiffness: 200 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
    transition: { type: "spring", damping: 12, stiffness: 200 },
  },
};

export default function AnimatedLogo({ className = "", textSize = "text-3xl" }) {
  const text = "SERANEX";
  
  return (
    <motion.div
      className={`flex overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((letter, index) => (
        <motion.span
            key={index} 
            variants={child} 
            className={`font-display font-bold tracking-widest text-white ${textSize}`}
        >
          {letter}
        </motion.span>
      ))}
      <motion.span variants={child} className="text-primary font-bold">.</motion.span>
    </motion.div>
  );
}