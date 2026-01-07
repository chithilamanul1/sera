'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
    {
        name: 'Rajesh Kumar',
        title: 'CEO',
        company: 'TechVista Solutions',
        image: null, // Add client photo path later
        rating: 5,
        text: 'Seranex delivered exactly what we needed - a modern, fast website that converted visitors into customers. Their attention to detail and commitment to deadlines was impressive. Highly recommended!',
    },
    {
        name: 'Amara Silva',
        title: 'Founder',
        company: 'EcoMart Lanka',
        image: null,
        rating: 5,
        text: 'Working with Seranex was a game-changer for our e-commerce business. They built a beautiful, user-friendly platform that increased our sales by 40%. The team was professional and responsive throughout.',
    },
    {
        name: 'Michael Fernando',
        title: 'Marketing Director',
        company: 'Ceylon Hospitality Group',
        image: null,
        rating: 5,
        text: 'The mobile app Seranex developed for us exceeded our expectations. Clean design, smooth performance, and great user experience. They truly understand what businesses need in the digital age.',
    },
    {
        name: 'Priya Jayawardena',
        title: 'Operations Manager',
        company: 'HealthFirst Clinic',
        image: null,
        rating: 5,
        text: 'Seranex transformed our online presence completely. From initial consultation to final delivery, they were professional, creative, and always available. Our patient bookings have tripled since the new website launch!',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-void via-surface/10 to-void -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-heading font-bold glow-text mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-silver/80 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it - hear from businesses we've helped grow
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
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
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                        className="text-yellow-400 text-xl"
                                    >
                                        ⭐
                                    </motion.span>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-silver/90 text-base mb-6 leading-relaxed relative z-10">
                                "{testimonial.text}"
                            </p>

                            {/* Client Info */}
                            <div className="flex items-center gap-4">
                                {/* Avatar Placeholder */}
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-glow-silver/20 to-glow-silver/5 flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl font-heading font-bold text-glow-silver">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>

                                {/* Details */}
                                <div>
                                    <div className="text-white font-heading font-semibold">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-silver/70 text-sm">
                                        {testimonial.title} at {testimonial.company}
                                    </div>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glow-silver/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                        </motion.div>
                    ))}
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
                        Trusted by 30+ businesses across Sri Lanka and beyond
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
