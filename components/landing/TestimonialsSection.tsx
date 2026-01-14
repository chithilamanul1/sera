'use client';

import { motion } from 'framer-motion';
import { Quote, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import AddTestimonialModal from './AddTestimonialModal';
import { useAuth } from '@/context/AuthContext';

interface Testimonial {
    id: string;
    userName: string;
    userPhoto: string | null;
    title?: string;
    company?: string;
    role?: string;
    text: string;
    rating: number;
    createdAt: any;
}

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTestimonials = async () => {
            const supabase = createClient();

            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .eq('approved', true) // Assuming there's an approval flag
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) {
                console.error("Error fetching testimonials:", error);
                return;
            }

            if (data) {
                const formattedTestimonials = data.map(t => ({
                    id: t.id,
                    userName: t.user_name || t.userName,
                    userPhoto: t.user_photo || t.userPhoto,
                    title: t.title,
                    company: t.company,
                    role: t.role,
                    text: t.text,
                    rating: t.rating,
                    createdAt: t.created_at
                })) as Testimonial[];
                setTestimonials(formattedTestimonials);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            <AddTestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-void via-surface/10 to-void -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-5xl md:text-6xl font-heading font-bold glow-text mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-silver/80 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it - hear from businesses we've helped grow
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-silver/10 hover:border-glow-silver/50 transition-all group"
                    >
                        <Plus className="w-5 h-5 text-glow-silver group-hover:rotate-90 transition-transform" />
                        <span className="text-silver font-medium">Write a Review</span>
                    </motion.button>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {testimonials.length === 0 ? (
                        <div className="md:col-span-2 text-center py-12 text-silver/40">
                            No reviews yet. Be the first to share your experience!
                        </div>
                    ) : (
                        testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="glass p-8 rounded-2xl relative"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 opacity-10">
                                    <Quote className="w-16 h-16 text-glow-silver" />
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">⭐</span>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-silver/90 text-base mb-6 leading-relaxed relative z-10 min-h-[5rem]">
                                    "{testimonial.text}"
                                </p>

                                {/* Client Info */}
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    {testimonial.userPhoto ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={testimonial.userPhoto}
                                            alt={testimonial.userName}
                                            className="w-14 h-14 rounded-full border-2 border-surface"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-glow-silver/20 to-glow-silver/5 flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl font-heading font-bold text-glow-silver">
                                                {testimonial.userName ? testimonial.userName.charAt(0) : 'U'}
                                            </span>
                                        </div>
                                    )}

                                    {/* Details */}
                                    <div>
                                        <div className="text-white font-heading font-semibold flex items-center gap-2">
                                            {testimonial.userName}
                                            {/* We could add a verified badge here if we want */}
                                        </div>
                                        <div className="text-silver/70 text-sm">
                                            {testimonial.role || 'Client'}
                                            {testimonial.company && ` at ${testimonial.company}`}
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glow-silver/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-silver/60 text-sm">
                        Real feedback from our verified clients
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
