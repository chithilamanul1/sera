'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

interface AddTestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTestimonialModal({ isOpen, onClose }: AddTestimonialModalProps) {
    const { user, signInWithGoogle } = useAuth();
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return; // session check handled by auth context

        if (text.length < 10) {
            toast.error('Please write a detailed review (min 10 characters)');
            return;
        }

        setIsSubmitting(true);
        try {
            const supabase = createClient();
            const { error } = await supabase.from('testimonials').insert({
                user_id: user.id || user.uid, // Handle both auth types during migration
                user_name: user.user_metadata?.name || user.email?.split('@')[0] || 'Anonymous',
                user_photo: user.user_metadata?.avatar_url || user.photoURL,
                rating,
                text,
                company,
                role,
                approved: false // Default to unapproved
            });

            if (error) throw error;

            toast.success('Review submitted successfully!');
            setText('');
            setCompany('');
            setRole('');
            onClose();
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-surface border border-silver/10 rounded-2xl w-full max-w-md pointer-events-auto overflow-hidden shadow-2xl shadow-glow-silver/10"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-silver/10 bg-void/50">
                                <h3 className="text-xl font-heading font-semibold text-silver">
                                    Write a Review
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-silver/10 rounded-full transition-colors text-silver/60 hover:text-silver"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {!user ? (
                                    <div className="text-center py-8 space-y-6">
                                        <p className="text-silver/80">
                                            Please sign in with Google to verification purposes before submitting a review.
                                        </p>
                                        <button
                                            onClick={signInWithGoogle}
                                            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-silver transition-colors flex items-center gap-2 mx-auto"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    fill="#EA4335"
                                                />
                                            </svg>
                                            Sign in with Google
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* User Info */}
                                        <div className="flex items-center gap-3 mb-6 p-3 bg-silver/5 rounded-lg">
                                            {user.user_metadata?.avatar_url && (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={user.user_metadata.avatar_url}
                                                    alt={user.user_metadata?.full_name || 'User'}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-silver truncate">
                                                    Posting as {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                                </p>
                                                <p className="text-xs text-silver/60 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-silver/80">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="text-2xl focus:outline-none transition-transform hover:scale-110"
                                                    >
                                                        {star <= rating ? '⭐' : '☆'}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Review Text */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-silver/80">
                                                Review *
                                            </label>
                                            <textarea
                                                required
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                className="w-full h-32 px-4 py-3 rounded-xl bg-void border border-silver/10 text-silver placeholder:text-silver/30 focus:border-glow-silver/50 focus:ring-1 focus:ring-glow-silver/50 transition-all resize-none"
                                                placeholder="Share your experience working with Seranex..."
                                            />
                                        </div>

                                        {/* Company & Role */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-silver/80">
                                                    Company
                                                </label>
                                                <input
                                                    type="text"
                                                    value={company}
                                                    onChange={(e) => setCompany(e.target.value)}
                                                    className="w-full px-4 py-2 rounded-xl bg-void border border-silver/10 text-silver placeholder:text-silver/30 focus:border-glow-silver/50 focus:ring-1 focus:ring-glow-silver/50 transition-all"
                                                    placeholder="e.g. Acme Corp"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-silver/80">
                                                    Role
                                                </label>
                                                <input
                                                    type="text"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    className="w-full px-4 py-2 rounded-xl bg-void border border-silver/10 text-silver placeholder:text-silver/30 focus:border-glow-silver/50 focus:ring-1 focus:ring-glow-silver/50 transition-all"
                                                    placeholder="e.g. CEO"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl font-heading font-semibold text-void transition-all relative overflow-hidden group mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                            style={{
                                                background: `linear-gradient(135deg, #FFFFFF, #EAEAEA)`,
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                            ) : (
                                                'Submit Review'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
