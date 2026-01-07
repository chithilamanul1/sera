'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxImage({ src, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Move image vertically as user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-3xl border border-gray-800 my-24 group">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover brightness-50 group-hover:brightness-75 transition-all duration-700" 
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h3 className="text-4xl md:text-7xl font-display font-bold text-white/20 uppercase tracking-widest group-hover:text-white/80 transition-colors">
          Engineering
        </h3>
      </div>
    </div>
  );
}