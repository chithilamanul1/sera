'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from './SplitText';

const words = [
    "Initializing Interface",
    "Loading Business Logic",
    "Optimizing Visuals",
    "Designing Your Experience",
    "Welcome to SeraNex"
];

export function Preloader() {
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cycle through messages
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === words.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 1000); // Slight delay after last message
                    return prev;
                }
                return prev + 1;
            });
        }, 1500); // 1.5s per message

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white"
                >
                    <div className="text-center">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl md:text-4xl font-light tracking-wider font-mono text-zinc-400"
                        >
                            {words[index]}
                        </motion.div>

                        {/* Custom Logo Spinner if needed */}
                        <div className="mt-8 flex justify-center">
                            <motion.div
                                className="w-2 h-2 bg-primary rounded-full mx-1"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            />
                            <motion.div
                                className="w-2 h-2 bg-primary rounded-full mx-1"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            />
                            <motion.div
                                className="w-2 h-2 bg-primary rounded-full mx-1"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
