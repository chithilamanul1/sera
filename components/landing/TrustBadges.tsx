'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
    { name: 'Client 1', logo: '/logos/zx-white.png' }, // Replace with actual logos
    { name: 'Client 2', logo: '/logos/zx-white.png' },
    { name: 'Client 3', logo: '/logos/zx-white.png' },
    { name: 'Client 4', logo: '/logos/zx-white.png' },
    { name: 'Client 5', logo: '/logos/zx-white.png' },
    { name: 'Client 6', logo: '/logos/zx-white.png' },
];

export default function TrustBadges() {
    return (
        <section className="py-16 bg-surface/30 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-silver/40 text-sm font-bold uppercase tracking-widest mb-8">
                        Trusted By Leading Businesses
                    </h3>

                    {/* Client Logos Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative h-16 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all"
                            >
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-4xl font-bold text-white mb-2">100%</div>
                        <div className="text-silver/60 text-sm">Client Satisfaction</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-4xl font-bold text-white mb-2">15+</div>
                        <div className="text-silver/60 text-sm">Projects Delivered</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-4xl font-bold text-white mb-2">⭐️4.9</div>
                        <div className="text-silver/60 text-sm">Average Rating</div>
                    </div>
                </div>

                {/* Guarantee Badge */}
                <div className="flex justify-center mt-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        100% Money-Back Guarantee
                    </div>
                </div>
            </div>
        </section>
    );
}
