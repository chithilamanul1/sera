'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RateUsProps {
    googleReviewUrl?: string;
    onClose?: () => void;
}

export function RateUs({
    googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83VY24", // Default to an example, user should provide real placeid
    onClose
}: RateUsProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 5) {
            // Redirect to Google Reviews for 5-star ratings
            // Note: We can't pre-fill the comment on Google Reviews easily, but we redirect the user directly to the review dialog.
            window.open(googleReviewUrl, '_blank');
            setSubmitted(true);
        } else {
            // For 1-4 stars, just show a "thank you" but don't save or redirect
            setSubmitted(true);
        }
    };

    return (
        <div className="p-6 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl max-w-md w-full shadow-2xl">
            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <h3 className="text-xl font-semibold mb-2 text-white text-center">How are we doing?</h3>
                        <p className="text-zinc-400 text-sm text-center mb-6">Your feedback helps us deliver a world-class experience.</p>

                        <div className="flex justify-center gap-2 mb-8">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(star)}
                                >
                                    <Star
                                        className={cn(
                                            "w-8 h-8 transition-colors duration-200",
                                            (hover || rating) >= star
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-zinc-600 fill-transparent"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell us more (optional)..."
                                className="w-full h-24 bg-zinc-800/50 border border-white/5 rounded-xl p-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all resize-none"
                            />
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2 border border-white/5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                                >
                                    Later
                                </button>
                                <button
                                    type="submit"
                                    disabled={rating === 0}
                                    className="flex-1 px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    {rating === 5 ? "Submit to Google" : "Send Feedback"}
                                    {rating === 5 && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="thanks"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-10 text-center"
                    >
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Thank You!</h3>
                        <p className="text-zinc-400 text-sm mb-6 px-4">
                            {rating === 5
                                ? "We've redirected you to Google to finalize your review. We appreciate your support!"
                                : "We value your honest feedback and will use it to improve our services."}
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-transparent border border-white/10 text-white hover:bg-white/5 rounded-xl transition-colors text-sm font-medium"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
