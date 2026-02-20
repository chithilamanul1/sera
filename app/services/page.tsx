'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { services, iconMap } from '@/lib/data';

export default function AllServicesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
            <Navbar />

            <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
                <div className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 font-syne"
                    >
                        Our <br />
                        <span className="text-zinc-500">Service Suite.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-xl md:text-2xl max-w-3xl mx-auto"
                    >
                        Enterprise-grade solutions engineered for the next generation of business.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => {
                        const Icon = iconMap[service.iconName];
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-12 bg-zinc-900/30 border border-zinc-800/50 rounded-[3rem] hover:bg-zinc-900/50 transition-all"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                                    <Icon className="w-8 h-8" style={{ color: service.primaryColor }} />
                                </div>
                                <h3 className="text-3xl font-bold mb-6 font-syne">{service.title}</h3>
                                <p className="text-zinc-500 text-lg leading-relaxed mb-12">
                                    {service.description}
                                </p>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors"
                                >
                                    Explore Service <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </main>
    );
}
