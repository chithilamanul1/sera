'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { CheckCircle2, ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

interface SEOPageTemplateProps {
    title: string;
    subtitle: string;
    description: string;
    highlights: { title: string; desc: string; icon: React.ReactNode }[];
    benefits: string[];
    ctaTitle: string;
    ctaDesc: string;
    keyword: string;
}

export function SEOPageTemplate({
    title,
    subtitle,
    description,
    highlights,
    benefits,
    ctaTitle,
    ctaDesc,
    keyword
}: SEOPageTemplateProps) {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-48 pb-24 px-6 max-w-7xl mx-auto">
                <div className="absolute top-24 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-48 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-8">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-[11px] font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">{keyword} Authority</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 font-syne leading-[1.1]">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={i % 3 === 2 ? "text-blue-500" : ""}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-2xl max-w-3xl leading-relaxed mb-12">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/quote">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2"
                            >
                                Get Enterprise Quote <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link href="/portfolio">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-sm font-bold"
                            >
                                View Case Studies
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Features/Highlights Grid */}
            <div className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-100 dark:border-white/[0.05]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/[0.08] hover:border-blue-500/50 transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold font-syne mb-3">{item.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="py-24 px-6 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-900/20 rounded-[3rem] mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-syne mb-8 leading-tight">
                            {subtitle}
                        </h2>
                        <div className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-colors">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-300 font-medium">
                                        {benefit}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-64 h-64 border border-blue-500/30 rounded-full flex items-center justify-center"
                        >
                             <div className="w-48 h-48 border border-purple-500/30 rounded-full flex items-center justify-center">
                                <Globe className="w-24 h-24 text-blue-500/50" />
                             </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="px-6 pb-24 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="p-12 md:p-24 rounded-[3rem] bg-zinc-900 relative overflow-hidden text-center"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-6xl font-bold text-white mb-8 font-syne leading-tight">
                            {ctaTitle}
                        </h2>
                        <p className="text-zinc-400 text-lg md:text-xl mb-12">
                            {ctaDesc}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href="/quote">
                                <button className="px-10 py-5 rounded-full bg-white text-zinc-900 text-sm font-bold hover:scale-105 active:scale-95 transition-all">
                                    Book a Strategic Call
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 hover:scale-105 active:scale-95 transition-all">
                                    Contact Support
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
