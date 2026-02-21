'use client';

import { motion } from 'framer-motion';
import { Terminal, Cpu, Smartphone, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        title: "UX/UI & Graphics Design",
        desc: "Premium interfaces that convert visitors into customers through research-driven design.",
        icon: Globe,
        color: "text-blue-500",
    },
    {
        title: "Mobile & Web Application",
        desc: "60FPS universal apps engineered for performance at any scale.",
        icon: Smartphone,
        color: "text-emerald-500",
    },
    {
        title: "AI & Automation",
        desc: "Custom autonomous agents that handle operations logarithmically.",
        icon: Cpu,
        color: "text-purple-500",
    },
];

export function BentoFeatures() {
    return (
        <section id="features" className="py-24 px-6 bg-white dark:bg-zinc-950/80 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-[11px] font-semibold tracking-wide text-blue-600 dark:text-blue-400">Services</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-zinc-900 dark:text-white leading-tight">
                            Explore Our Services
                        </h2>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-md leading-relaxed">
                        We are a web and mobile design & development agency, making websites & apps, creating brands.
                    </p>
                </div>

                {/* Service Cards — Hexacore Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.08] p-8 hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all duration-500"
                        >
                            {/* Traffic Light Dots */}
                            <div className="flex items-center gap-1.5 mb-8">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>

                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 ${f.color} group-hover:scale-110 transition-transform`}>
                                <f.icon className="w-6 h-6" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold mb-3 tracking-tight text-zinc-900 dark:text-white font-syne">
                                {f.title}
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                                {f.desc}
                            </p>

                            {/* Learn More Link */}
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-blue-500 transition-colors tracking-wide"
                            >
                                Learn More <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Explore More CTA */}
                <div className="flex justify-end mt-8">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:scale-105 active:scale-95 transition-all"
                    >
                        Explore More <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
