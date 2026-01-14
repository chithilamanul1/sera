'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveVisitorCounter() {
    const [visitorCount, setVisitorCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Generate initial realistic visitor count (3-8)
        const initialCount = Math.floor(Math.random() * 6) + 3;
        setVisitorCount(initialCount);

        // Update count every 10-30 seconds with realistic changes
        const interval = setInterval(() => {
            setVisitorCount(prev => {
                // Randomly increase by 0-2 or decrease by 0-1
                const change = Math.random() > 0.7 ? -1 : Math.floor(Math.random() * 3);
                const newCount = Math.max(2, Math.min(12, prev + change)); // Keep between 2-12
                return newCount;
            });
        }, Math.random() * 20000 + 10000); // 10-30 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="fixed top-24 right-6 z-40 bg-gradient-to-br from-accent to-red-600 rounded-full shadow-2xl overflow-hidden"
                >
                    <div className="bg-void/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                        {/* Pulsing Eye Icon */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Eye className="w-4 h-4 text-accent" />
                        </motion.div>

                        {/* Count */}
                        <div className="flex items-baseline gap-1">
                            <motion.span
                                key={visitorCount}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-white font-bold text-lg"
                            >
                                {visitorCount}
                            </motion.span>
                            <span className="text-silver/60 text-xs">viewing</span>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="ml-2 text-silver/40 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Animated border pulse */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            boxShadow: [
                                '0 0 0 0 rgba(239, 68, 68, 0.4)',
                                '0 0 0 8px rgba(239, 68, 68, 0)',
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
