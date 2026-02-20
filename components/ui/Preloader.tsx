'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_PATH } from './Logo';


interface PreloaderProps {
    onFinish?: () => void;
}

export function Preloader({ onFinish }: PreloaderProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5s total duration

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode='wait' onExitComplete={onFinish}>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                >
                    <div className="relative w-32 h-32 md:w-64 md:h-64">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>

                            {/* Background Track */}
                            <motion.path
                                d={LOGO_PATH}
                                stroke="#1a1a1a"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="transparent"
                            />

                            {/* Colorful Path Animation */}
                            <motion.path
                                d={LOGO_PATH}
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="transparent"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, ease: "circInOut" }}
                            />

                            {/* Glow Effect */}
                            <motion.path
                                d={LOGO_PATH}
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                fill="transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="blur-md"
                            />
                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
