'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { services, iconMap } from '@/lib/data';

export default function AllServicesPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-500">
            <Navbar />

            <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[11px] font-semibold tracking-wide text-blue-600 dark:text-blue-400">Services & Solutions</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-syne leading-tight"
                    >
                        We Create Products<span className="text-blue-500">_</span>
                        <br />
                        <span className="text-zinc-400 dark:text-zinc-500">Design Development</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed"
                    >
                        We&apos;re a web and mobile design & development agency, making websites & apps, creating brands.
                    </motion.p>
                </div>

                {/* What We Do Section */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold font-syne tracking-tight mb-4 text-zinc-900 dark:text-white">
                        What We Create <span className="text-blue-500">What You Can Enjoy</span>
                    </h2>
                    <p className="text-zinc-500 text-base max-w-xl">
                        Exploring our services, we provide enterprise-grade solutions for the next generation.
                    </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => {
                        const Icon = iconMap[service.iconName];
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="group relative p-8 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.08] rounded-2xl hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-4 font-syne tracking-tight text-zinc-900 dark:text-white">
                                    {service.title}
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                {/* Link */}
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors"
                                >
                                    Learn More <ArrowUpRight size={16} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center py-20 px-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/[0.08]"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight mb-6 text-zinc-900 dark:text-white">
                        Ready to <span className="text-blue-500">Get Started?</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                        Let&apos;s discuss how we can transform your business with future-ready technology.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/quote">
                            <button className="px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg font-mono">
                                Start a Project
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-8 py-3.5 rounded-full bg-transparent border border-zinc-300 dark:border-white/20 text-zinc-700 dark:text-white text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all font-mono">
                                Book a Call
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
