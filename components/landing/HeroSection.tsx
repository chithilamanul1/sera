'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useThemeStore, glowColors } from '@/context/ThemeContext';

import ParticleBackground from './ParticleBackground';

export default function HeroSection() {

    return (
        <section className="relative min-h-screen flex items-center bg-void pt-20">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1a1a1a_0%,#000000_70%)] opacity-40 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <h2 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">
                        Best Web Design Company Sri Lanka
                    </h2>

                    <h1 className="text-6xl md:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tighter">
                        WEB <br />
                        <span className="text-white/20">DESIGN</span> & <br />
                        DEVELOPMENT
                    </h1>

                    <p className="text-silver/60 text-lg max-w-xl leading-relaxed py-6">
                        Start your website with the best web design company in Sri Lanka.
                        We transform insights into visually striking, conversion-centered designs
                        that drive measurable outcomes.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="#contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-accent text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all uppercase"
                            >
                                Talk To Us
                            </motion.button>
                        </Link>

                        <Link href="#portfolio">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full border border-white/20 text-white font-heading font-bold text-sm tracking-wide hover:bg-white/5 transition-all uppercase"
                            >
                                View Our Work
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[600px] hidden lg:block"
                >
                    <Image
                        src="/logos/hero-logo.png"
                        alt="Seranex Digital Universe"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10" />
                </motion.div>
            </div>

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
                    className="flex flex-col items-center gap-2 text-silver/20"
                >
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}
