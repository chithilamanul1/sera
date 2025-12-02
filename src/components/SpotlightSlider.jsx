'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=600&auto=format&fit=crop",
];

export default function SpotlightSlider() {
  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden relative group">
      {/* Gradient Masks to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex animate-scroll whitespace-nowrap min-w-full">
         {[...images, ...images, ...images].map((src, i) => (
           <div key={i} className="mx-4 relative w-64 h-40 rounded-xl overflow-hidden border border-gray-800 opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-500 grayscale hover:grayscale-0">
              <Image 
                src={src} 
                alt="Project Preview" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
           </div>
         ))}
      </div>
    </div>
  );
}