'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 50% of the page
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setIsVisible(scrollPercentage > 50 && !isDismissed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDismissed]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-accent to-red-600 shadow-2xl"
                >
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                        {/* Message */}
                        <div className="flex-1">
                            <p className="text-white font-bold text-lg md:text-xl">
                                🚀 Get Your Website for Only <span className="text-yellow-300">LKR 5,000!</span>
                            </p>
                            <p className="text-white/80 text-sm hidden md:block">
                                Refer 3 friends and unlock this exclusive offer
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-3">
                            <Link href="/campaign/website-5000">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-white text-accent font-bold rounded-full text-sm md:text-base flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow uppercase tracking-wide"
                                >
                                    Join Campaign
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>

                            {/* Dismiss Button */}
                            <button
                                onClick={() => setIsDismissed(true)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Dismiss"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="h-1 bg-white/20">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-yellow-300"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
