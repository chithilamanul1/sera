'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useThemeStore, glowColors } from '@/context/ThemeContext';

export default function HeroSection() {
    const { glowTheme } = useThemeStore();
    const currentGlow = glowColors[glowTheme];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Particle Background - We'll add WebGL later */}
            <div className="absolute inset-0 bg-gradient-to-b from-void via-surface/20 to-void" />

            {/* Content */}
            <div className="relative z-10 text-center space-y-8 px-4">
                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <motion.h1
                        className="text-7xl md:text-9xl font-autologo font-bold"
                        style={{
                            background: `linear-gradient(135deg, ${currentGlow} 0%, #EAEAEA 50%, #E5E4E2 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Seranex
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-2xl md:text-4xl text-platinum font-mono"
                    >
                        Ready to Grow?
                    </motion.p>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-silver/80 text-lg md:text-xl max-w-2xl mx-auto"
                >
                    Next-generation digital solutions for businesses ready to scale.
                    We build experiences that matter.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <Link href="#contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full font-heading font-semibold text-void transition-all"
                            style={{
                                background: `linear-gradient(135deg, ${currentGlow}, #FFFFFF)`,
                                boxShadow: `0 0 30px ${currentGlow}40`,
                            }}
                        >
                            Start Your Project
                        </motion.button>
                    </Link>

                    <Link href="#portfolio">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full font-heading font-semibold text-silver border border-silver/20 hover:border-silver/40 transition-all glass"
                        >
                            View Our Work
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2 text-silver/40"
                    >
                        <span className="text-xs font-mono">Scroll to explore</span>
                        <ArrowDown className="w-4 h-4" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{ background: currentGlow }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{ background: currentGlow }} />
        </section>
    );
}
