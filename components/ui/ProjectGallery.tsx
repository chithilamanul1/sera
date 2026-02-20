
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
    images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="space-y-6">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Gallery image ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-4 z-20">
                        <button
                            onClick={prev}
                            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/ object-cover10 hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold tabular-nums">
                            {currentIndex + 1} / {images.length}
                        </div>
                        <button
                            onClick={next}
                            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`relative w-32 aspect-video rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${currentIndex === i ? 'border-blue-500 scale-95' : 'border-transparent opacity-50 hover:opacity-100'
                                }`}
                        >
                            <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
