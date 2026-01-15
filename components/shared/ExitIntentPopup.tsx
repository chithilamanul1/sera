'use client';

import { useEffect, useState } from 'react';
import { X, Mail, Phone, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        let hasShown = false;

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger when mouse leaves from top of viewport
            if (e.clientY <= 0 && !hasShown && !submitted) {
                setIsVisible(true);
                hasShown = true;
            }
        };

        // Add delay to avoid showing immediately
        const timer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
        }, 5000); // Wait 5 seconds before activating

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [submitted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/capture-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, phone }),
            });

            if (!response.ok) {
                throw new Error('Failed to capture lead');
            }

            setSubmitted(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        } catch (error) {
            console.error('Error capturing lead:', error);
            alert('Something went wrong. Please try again or contact us directly.');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={() => setIsVisible(false)}
                    />

                    {/* Popup */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-gradient-to-br from-accent to-red-600 p-[1px] rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto"
                        >
                            <div className="bg-void rounded-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                                >
                                    <X className="w-5 h-5 text-white/70 hover:text-white" />
                                </button>

                                {submitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Gift className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">You're All Set!</h3>
                                        <p className="text-silver/80">We'll contact you within 24 hours with your free consultation details.</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Icon */}
                                        <div className="w-16 h-16 bg-gradient-to-br from-accent to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Gift className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Headline */}
                                        <h2 className="text-3xl font-heading font-bold text-white text-center mb-3">
                                            Wait! Don't Miss Out! 🎁
                                        </h2>
                                        <p className="text-xl text-center text-white/90 mb-2">
                                            Get a <span className="text-yellow-300 font-bold">FREE 15-Minute Consultation</span>
                                        </p>
                                        <p className="text-center text-silver/80 mb-6">
                                            Worth LKR 2,500 - Limited to first 20 signups!
                                        </p>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/50" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Your email address"
                                                    className="w-full pl-12 pr-4 py-4 bg-surface border border-white/10 rounded-xl text-white placeholder-silver/50 focus:border-accent focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/50" />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="Your phone number"
                                                    className="w-full pl-12 pr-4 py-4 bg-surface border border-white/10 rounded-xl text-white placeholder-silver/50 focus:border-accent focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-accent to-red-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-wide"
                                            >
                                                Claim My Free Consultation
                                            </motion.button>
                                        </form>

                                        <p className="text-center text-silver/60 text-xs mt-4">
                                            🔒 Your information is safe with us. No spam, ever.
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
