'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing...');

    const loadingSteps = [
        'Initializing...',
        'Loading assets...',
        'Connecting to servers...',
        'Preparing experience...',
        'Almost there...',
        'Ready to grow!',
    ];

    useEffect(() => {
        const duration = 3000; // 3 seconds
        const interval = 50;
        const increment = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    useEffect(() => {
        const stepDuration = 500;
        let currentStep = 0;

        const stepTimer = setInterval(() => {
            if (currentStep < loadingSteps.length - 1) {
                currentStep++;
                setLoadingText(loadingSteps[currentStep]);
            }
        }, stepDuration);

        return () => clearInterval(stepTimer);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-void"
            >
                <div className="text-center space-y-8">
                    {/* ZX Logo with Fill Animation */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-80 h-80 mx-auto"
                    >
                        {/* Background logo (dim) */}
                        <div className="absolute inset-0 opacity-20">
                            <Image
                                src="/logos/zx-white.png"
                                alt="Seranex"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Filling logo (animated with clip-path) */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                clipPath: `inset(0 ${100 - progress}% 0 0)`,
                            }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src="/logos/zx-white.png"
                                    alt="Seranex"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Glow effect that follows the fill */}
                        <motion.div
                            className="absolute inset-0 blur-3xl opacity-30"
                            style={{
                                clipPath: `inset(0 ${100 - progress}% 0 0)`,
                                background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)',
                            }}
                        />

                        {/* Pulsing glow behind */}
                        <motion.div
                            className="absolute inset-0 blur-3xl opacity-10 -z-10"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)',
                            }}
                        />
                    </motion.div>

                    {/* Seranex Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-5xl font-heading font-bold glow-text">
                            SERANEX
                        </h1>
                        <p
                            className="text-platinum font-mono text-sm mt-2"
                            style={{ opacity: progress > 50 ? 1 : 0, transition: 'opacity 0.3s' }}
                        >
                            Ready to Grow?
                        </p>
                    </motion.div>

                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <p className="text-silver/60 font-mono text-xs">
                            {loadingText}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-64 h-1 mx-auto bg-surface rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-silver via-white to-platinum"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Percentage */}
                        <p className="text-silver/40 font-mono text-xs">
                            {Math.round(progress)}%
                        </p>
                    </motion.div>

                    {/* Animated Dots */}
                    <div className="flex items-center justify-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-glow-silver rounded-full"
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
