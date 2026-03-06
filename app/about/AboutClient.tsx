'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ClientReviews } from '@/components/ui/ClientReviews';
import { Layout, Database, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function AboutClient() {
    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-500">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-48 pb-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[11px] font-semibold tracking-wide text-blue-600 dark:text-blue-400">About Seranex</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight font-syne"
                    >
                        We Build Digital Products
                        <br />
                        That <span className="text-blue-500">Actually Work.</span>
                    </motion.h1>
                    <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                        Seranex is a Seeduwa-based software studio specializing in high-performance digital products. We build websites, mobile apps, and AI systems for businesses in Negombo, Colombo, and across Sri Lanka.
                    </p>
                </div>
            </div>

            {/* Stats Strip */}
            <section className="py-16 px-6 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-white/[0.06] transition-colors">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Years Experience", value: "5+" },
                        { label: "Projects Shipped", value: "100+" },
                        { label: "Global Clients", value: "25+" },
                        { label: "Uptime", value: "99.9%" }
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2 font-syne">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-[10px] font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">Our Mission</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 font-syne">
                            Our <span className="text-blue-500">Mission</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-6">
                            To help Sri Lankan businesses compete at a global level through high-quality digital products — built fast, built right, and built to last. We believe that every enterprise, regardless of its geographic location, deserves access to world-class software engineering. Our mission goes beyond simply writing code; we architect comprehensive digital ecosystems, integrate cutting-edge artificial intelligence, and deploy scalable cloud infrastructure that empowers our clients to dominate their respective markets. By bridging the gap between legacy business processes and modern, autonomous AI execution, we ensure that your digital operations are not just functional, but genuinely transformative.
                        </p>
                        <ul className="space-y-3">
                            {["Performance", "Conversion", "Security"].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    {item}-First Engineering
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="text-[10px] font-semibold tracking-wide text-blue-600 dark:text-blue-400 uppercase">Our Vision</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 font-syne">
                            Our <span className="text-blue-500">Vision</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                            In a world of templates and drag-and-drop mediocrity, we choose to engineer bespoke solutions. We believe that your digital presence is the single most important asset you own. From local Sri Lankan startups to global enterprises, we provide the same level of elite craftsmanship. Our vision is to cultivate a software landscape where performance, security, and digital sovereignty are the default standards, not premium add-ons. We foresee a future where Sri Lanka is recognized globally not just as an IT outsourcing destination, but as a premier hub for elite AI engineering, autonomous systems design, and bleeding-edge enterprise software development.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Stack */}
            <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-white/[0.06] transition-colors">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center font-syne">
                        The <span className="text-blue-500">Arsenal</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: <Layout />, title: "Frontend", desc: "Next.js 15, React, Tailwind, Framer Motion" },
                            { icon: <Database />, title: "Backend", desc: "Node.js, Postgres, Prisma, Supabase" },
                            { icon: <Zap />, title: "AI Core", desc: "Gemini Pro, OpenAI, Python Neural Nets" },
                            { icon: <Shield />, title: "Infra", desc: "Vercel Edge, AWS, Docker, Linux" }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/[0.08] hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 tracking-tight font-syne">{item.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Process */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-syne">
                            How We <span className="text-blue-500">Execute</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-base">A structured approach to delivering premium digital solutions.</p>
                    </div>

                    <div className="space-y-0">
                        {[
                            { step: "01", title: "Reconnaissance", desc: "We analyze your business, your competitors, and your bottlenecks." },
                            { step: "02", title: "Architecture", desc: "We design a scalable system blueprint before writing a single line of code." },
                            { step: "03", title: "Development", desc: "We build using atomic design principles and strict type safety." },
                            { step: "04", title: "Deployment", desc: "We launch on edge networks for global speed and reliability." }
                        ].map((phase, i) => (
                            <motion.div
                                key={phase.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row gap-6 md:items-center p-6 md:p-8 border-b border-zinc-200 dark:border-white/[0.06] hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-colors group"
                            >
                                <span className="text-4xl md:text-5xl font-bold text-zinc-200 dark:text-zinc-800 group-hover:text-blue-500 transition-colors font-syne">{phase.step}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 font-syne">{phase.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl">{phase.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center py-20 px-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/[0.08]"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight mb-6">
                        Ready to <span className="text-blue-500">Get Started?</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                        Let&apos;s discuss how we can transform your business.
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
            </section>

            <ClientReviews />
            <Footer />
        </main>
    );
}
