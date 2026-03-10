'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Users, Search, Bot, Calendar, ChartBar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ATSSolutionPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#020202] text-zinc-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-500">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-48 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent_50%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-8">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-[11px] font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase tracking-widest">Enterprise Solutions</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 font-syne leading-tight"
                    >
                        AI Applicant Tracking <br />
                        <span className="text-zinc-500">for Seeduwa & Negombo.</span>
                    </motion.h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                        Stop wasting hours on manual CV screening. SeraNex delivers the #1 AI-powered recruitment platform designed to help Sri Lankan businesses in the Gampaha district find elite talent faster.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/quote">
                            <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-full hover:scale-105 transition-all shadow-xl font-mono">
                                Request ATS Demo
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 px-6 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Bot className="w-6 h-6" />,
                                title: "AI CV Scoring",
                                desc: "Our neural engines automatically score and rank candidates based on your specific local and technical requirements."
                            },
                            {
                                icon: <Calendar className="w-6 h-6" />,
                                title: "Auto-Scheduling",
                                desc: "Sync your calendars and let the AI handle interview scheduling with candidates in Negombo and beyond."
                            },
                            {
                                icon: <ChartBar className="w-6 h-6" />,
                                title: "Recession-Proof Analytics",
                                desc: "Deep insights into your hiring pipeline with automated reporting for stakeholders and management."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 group hover:border-blue-500/20 transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 font-syne tracking-tight group-hover:text-blue-500 transition-colors uppercase">{item.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* localized content section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight">Built for the <span className="text-blue-500">Seeduwa Ecosystem.</span></h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        We understand the Negombo tech belt. Our ATS supports local recruitment workflows, integrating seamlessly with Sri Lankan communication standards and candidate expectations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Recruitment Seeduwa", "Hiring Software Negombo", "Gampaha Tech", "Sri Lanka HR Automation"].map((tag) => (
                            <span key={tag} className="px-5 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
