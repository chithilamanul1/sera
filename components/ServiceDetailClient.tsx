'use client';

import { motion } from 'framer-motion';
import { JsonLd } from '@/components/JsonLd';
import { iconMap } from '@/lib/data';
import { ArrowRight, CheckCircle2, ExternalLink, Zap, Shield, Globe, Headphones } from 'lucide-react';
import Link from 'next/link';

interface ServiceDetailClientProps {
    service: {
        title: string;
        description: string;
        primaryColor: string;
        iconName: string;
        slug?: string;
    };
    iconName: string;
    schema: Record<string, any>;
}

const serviceFeatures: Record<string, string[]> = {
    'web-development': ['Fully Responsive Design', 'SEO Optimized', 'Lightning Fast Performance', 'CMS Integration', 'Custom Animations', 'Google Analytics Setup'],
    'mobile-applications': ['iOS & Android Builds', 'Offline Support', 'Push Notifications', 'App Store Publishing', 'Real-Time Sync', 'Smooth Animations'],
    'ai-solutions': ['WhatsApp AI Automation', 'Natural Language Processing', 'Custom AI Models', 'Business Intelligence', 'Automated Reporting', 'API Integration'],
    'custom-software': ['Custom Architecture', 'API Development', 'Database Design', 'Admin Dashboards', 'Role-Based Access', 'Scalable Codebase'],
    'crm-systems': ['Lead Management', 'Sales Pipeline', 'Customer Profiles', 'Automated Follow-ups', 'Analytics & Reports', 'Team Collaboration'],
    'pos-systems': ['Inventory Management', 'Sales Reports', 'Receipt Printing', 'Multi-Location', 'Barcode Scanning', 'Cloud Sync'],
};

const serviceProcess = [
    { step: '01', title: 'Discovery Call', desc: 'We start by understanding your goals, your users, and your business model.' },
    { step: '02', title: 'Planning & Design', desc: 'We design the architecture and UI — you see exactly what you\'re getting before we build.' },
    { step: '03', title: 'Development', desc: 'Our engineers build with clean code, proper testing, and regular updates to you.' },
    { step: '04', title: 'Launch & Support', desc: 'We deploy, monitor, and remain available for ongoing support and improvements.' },
];

const whySeranex = [
    { icon: <Zap className="w-5 h-5" />, title: 'Fast Delivery', desc: 'Most projects ready in 2–4 weeks.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Quality Code', desc: 'Enterprise standards, fully tested.' },
    { icon: <Globe className="w-5 h-5" />, title: 'Sri Lanka Based', desc: 'Local team, global-quality output.' },
    { icon: <Headphones className="w-5 h-5" />, title: '24/7 Support', desc: 'Always here when you need us.' },
];

export default function ServiceDetailClient({ service, iconName, schema }: ServiceDetailClientProps) {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    const features = serviceFeatures[service.slug ?? ''] ?? ['Premium Architecture', 'Scalable Performance', 'Local SEO Ready', '24/7 Support', 'Clean Code', 'Fast Delivery'];

    return (
        <>
            <JsonLd data={schema} />

            {/* Hero */}
            <div className="relative pt-36 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_50%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                            style={{ background: `${service.primaryColor}15`, borderColor: `${service.primaryColor}30` }}
                        >
                            <Icon className="w-6 h-6" style={{ color: service.primaryColor }} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Seranex Service</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 font-syne leading-[1.0]"
                    >
                        {service.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 dark:text-zinc-400 text-xl md:text-2xl max-w-2xl leading-relaxed mb-10"
                    >
                        {service.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="/quote">
                            <button className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                Get a Free Quote <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
                                Book a Call
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Grid */}
            <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">What's Included</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight">
                            Everything You Need,<br />
                            <span className="text-blue-500">Nothing You Don't.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 p-5 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-blue-500/30 transition-all"
                            >
                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Seranex */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Why Us</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight mb-6">
                                We Build It Right,<br />
                                <span className="text-blue-500">The First Time.</span>
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                                We're a Sri Lanka-based studio that delivers world-class digital products. No outsourcing, no shortcuts — just clean, fast, and scalable solutions backed by real results.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {whySeranex.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-zinc-900 dark:text-white mb-1 text-sm">{item.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-white/[0.06]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight">
                            Our <span className="text-blue-500">Process</span>
                        </h2>
                    </div>
                    <div className="space-y-0">
                        {serviceProcess.map((phase, i) => (
                            <motion.div
                                key={phase.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row gap-6 md:items-center p-7 md:p-8 border-b border-zinc-200 dark:border-white/[0.06] hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-colors group"
                            >
                                <span className="text-4xl md:text-5xl font-bold text-zinc-200 dark:text-zinc-800 group-hover:text-blue-500 transition-colors font-syne min-w-[4rem]">{phase.step}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 font-syne">{phase.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl">{phase.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center py-20 px-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/[0.08]"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight mb-6">
                        Ready to Build Your <span className="text-blue-500">{service.title}</span> Solution?
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                        Get a free quote in minutes. No commitment, no BS.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/quote">
                            <button className="px-8 py-3.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                                Get a Free Quote <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-8 py-3.5 rounded-full border border-zinc-300 dark:border-white/20 text-zinc-700 dark:text-white text-sm font-bold hover:bg-zinc-100 dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                Talk to Us <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
