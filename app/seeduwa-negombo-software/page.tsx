'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { MapPin, CheckCircle2, Globe, Laptop, Sparkles, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function SeeduwaNegomboSEOPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500">
            <Navbar />

            <div className="pt-48 pb-24 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-8">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-[11px] font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">Local Authority: Seeduwa & Negombo</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-syne leading-tight">
                        The Leading Software Company in <span className="text-blue-500">Seeduwa & Negombo</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                        SeraNex is the premier software engineering studio headquartered in Seeduwa. We provide elite digital solutions—from autonomous AI agents and custom ERPs to high-performance mobile apps—specifically tailored for businesses in the Gampaha district and the Negombo coastal belt.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                    <section>
                        <h2 className="text-3xl font-bold font-syne mb-6">Why Choose a Local <span className="text-blue-500">Tech Partner?</span></h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            For businesses in Seeduwa and Negombo, having a local software partner means faster communication, on-site consultations, and a team that understands the unique Sri Lankan market landscape. Whether you are a logistics firm in Seeduwa or a tourism enterprise in Negombo, we build technology that scales your operations.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "On-site Strategic Meetings",
                                "Local Market Expertise",
                                "24/7 Regional Support",
                                "Fast Project Turnaround"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/[0.08]">
                        <h3 className="text-xl font-bold font-syne mb-4">Our Local Expertise</h3>
                        <div className="space-y-6">
                            {[
                                { icon: <Laptop className="w-5 h-5" />, title: "Web Development Seeduwa", desc: "Enterprise-grade Next.js platforms optimized for LCP/TBT benchmarks." },
                                { icon: <Smartphone className="w-5 h-5" />, title: "Mobile Apps Negombo", desc: "Cross-platform React Native solutions for tourism & retail." },
                                { icon: <Sparkles className="w-5 h-5" />, title: "AI Automation Sri Lanka", desc: "Custom LLM integrations and WhatsApp AI bots for local business." }
                            ].map((service) => (
                                <div key={service.title} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1">{service.title}</h4>
                                        <p className="text-xs text-zinc-500 leading-relaxed">{service.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="py-20 border-t border-zinc-200 dark:border-white/[0.08]">
                    <h2 className="text-3xl font-bold font-syne mb-12 text-center text-zinc-900 dark:text-white">Areas We <span className="text-blue-500">Serve</span></h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {["Seeduwa Central", "Negombo Town", "Katunayake", "Kotugoda", "Ja-Ela", "Gampaha", "Ekala", "Raddolugama"].map((area) => (
                            <div key={area} className="px-6 py-3 rounded-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                                {area}
                            </div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="p-12 md:p-20 rounded-[3rem] bg-zinc-900 relative overflow-hidden text-center"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-syne relative z-10">
                        Ready to Build the Future in <span className="text-blue-400">Seeduwa?</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
                        Join the fastest-growing companies in Negombo and Seeduwa who trust SeraNex for their engineering needs.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                        <Link href="/quote">
                            <button className="px-8 py-4 rounded-full bg-white text-zinc-900 text-sm font-bold hover:scale-105 active:scale-95 transition-all">
                                Request Local Proposal
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 hover:scale-105 active:scale-95 transition-all">
                                Book a Meeting
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
