'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleDrag = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-16 text-center">SEE THE DIFFERENCE</h2>
        
        <div 
          ref={containerRef}
          onMouseMove={handleDrag}
          onTouchMove={(e) => handleDrag(e.touches[0])}
          className="relative w-full h-[500px] rounded-3xl overflow-hidden cursor-col-resize border border-gray-700 shadow-2xl group"
        >
          {/* IMAGE 2: THE "AFTER" (Seranex Version) - Full Width */}
          <div className="absolute inset-0 bg-blue-900 flex items-center justify-center">
             {/* Replace with real image later */}
             <div className="text-center">
                <h3 className="text-6xl font-bold text-white mb-4 font-display">THE NEW SITE</h3>
                <p className="text-blue-200">Fast. Secure. 100/100 SEO Score.</p>
                <div className="mt-8 inline-block px-6 py-2 bg-green-500 text-black font-bold rounded-full">
                  SALES UP 300%
                </div>
             </div>
             {/* Background Pattern for "New" */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
          </div>

          {/* IMAGE 1: THE "BEFORE" (Old Version) - Clipped */}
          <div 
            className="absolute inset-0 bg-gray-800 flex items-center justify-center border-r-4 border-white z-10"
            style={{ width: `${sliderPosition}%`, overflow: 'hidden' }}
          >
             {/* Since this is clipped, we need a fixed width container inside so content doesn't squish */}
             <div className="w-[1200px] h-full flex items-center justify-center bg-gray-900 relative">
                <div className="text-center opacity-50 grayscale">
                    <h3 className="text-6xl font-bold text-gray-400 mb-4 font-serif">Old Website</h3>
                    <p className="text-gray-500">Slow. Unsecured. No Mobile View.</p>
                     <div className="mt-8 inline-block px-6 py-2 bg-red-900 text-red-300 font-bold rounded-full">
                      0 LEADS
                    </div>
                </div>
                {/* Overlay for "Old" */}
                <div className="absolute inset-0 bg-black/60" />
             </div>
          </div>

          {/* THE DRAG HANDLE */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-transparent z-20 flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
             <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center justify-center text-black -ml-1.5">
                <ChevronsLeftRight size={20} />
             </div>
          </div>
          
          {/* LABELS */}
          <div className="absolute top-8 left-8 bg-black/80 px-4 py-2 rounded text-gray-400 font-bold text-xs pointer-events-none z-30">BEFORE</div>
          <div className="absolute top-8 right-8 bg-primary px-4 py-2 rounded text-white font-bold text-xs pointer-events-none z-30">AFTER (SERANEX)</div>

        </div>
      </div>
    </section>
  );
}