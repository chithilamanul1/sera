'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
    {
        name: 'TechFlow',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
                <path d="M10,15 L20,5 L30,15 L20,25 Z M35,10 H90 V20 H35 Z" />
                <text x="35" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">TECHFLOW</text>
            </svg>
        )
    },
    {
        name: 'Nexus',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
                <circle cx="15" cy="15" r="10" />
                <text x="35" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">NEXUS</text>
            </svg>
        )
    },
    {
        name: 'GlobalSphere',
        logo: (
            <svg viewBox="0 0 120 30" fill="currentColor" className="w-full h-full">
                <path d="M15,15 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 M5,15 h20 M15,5 v20" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="35" y="22" fontFamily="sans-serif" fontSize="14" fontWeight="bold">GLOBALSPHERE</text>
            </svg>
        )
    },
    {
        name: 'Strikepay',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
                <path d="M10,5 L20,25 L30,5" fill="none" stroke="currentColor" strokeWidth="3" />
                <text x="35" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">STRIKE</text>
            </svg>
        )
    },
    {
        name: 'CloudScale',
        logo: (
            <svg viewBox="0 0 110 30" fill="currentColor" className="w-full h-full">
                <path d="M10,20 Q15,10 25,15 T40,20" fill="none" stroke="currentColor" strokeWidth="3" />
                <text x="45" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">CLOUD</text>
            </svg>
        )
    },
    {
        name: 'Astrom',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
                <path d="M15,5 L25,25 L5,25 Z" />
                <text x="35" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">ASTROM</text>
            </svg>
        )
    },
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-8 w-32 relative grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer text-white/80 hover:text-white"
                            >
                                {client.logo}
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
