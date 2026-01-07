'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted/declined
        const consent = localStorage.getItem('seranex-cookie-consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('seranex-cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('seranex-cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto">
                        <div className="glass border-t border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl bg-surface/80">

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/5 rounded-xl hidden md:block">
                                    <Cookie className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-white font-heading font-bold mb-2 text-lg">
                                        We value your privacy
                                    </h3>
                                    <p className="text-silver/70 text-sm leading-relaxed max-w-xl">
                                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-white/10 text-silver hover:bg-white/5 transition-colors font-semibold text-sm"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 md:flex-none px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="md:hidden p-2 text-silver/50 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
