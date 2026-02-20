'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ClientReviews } from '@/components/ui/ClientReviews';
import { Cpu, Globe, Shield, Zap, Code, Layout, Database, Server, ArrowRight, CheckCircle2 } from 'lucide-react';

import { About3DVisuals } from '@/components/ui/About3DVisuals';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-48 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-[8rem] font-black tracking-tighter mb-12 leading-[0.85] uppercase"
                    >
                        We Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-white">
                            The Future.
                        </span>
                    </motion.h1>
                    <p className="text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed border-l-4 border-blue-600 pl-8">
                        Seranex isn't just a dev shop. We are a digital arsenal for brands that want to dominate their market through speed, precision, and aesthetics.
                    </p>
                </div>
            </div>

            {/* 3D Visuals Section */}
            <About3DVisuals />

            {/* The Vision */}
            <section className="py-24 px-6 bg-zinc-950/50 border-y border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 uppercase text-white">
                            Our <span className="text-blue-500">Vision</span>
                        </h2>
                        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                            <p>
                                In a world of templates and drag-and-drop mediocrity, we choose to engineer bespoke solutions. We believe that your digital presence is the single most important asset you own.
                            </p>
                            <p>
                                Our mission is to strip away the unnecessary and double down on what matters: <strong className="text-white">Performance, Conversion, and Security.</strong>
                            </p>
                            <p>
                                From local Sri Lankan startups to global enterprises, we provide the same level of elite craftsmanship.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Stats with animation */}
                        {[
                            { label: "Global Clients", value: "25+" },
                            { label: "Projects Shipped", value: "100+" },
                            { label: "Lines of Code", value: "1M+" },
                            { label: "Uptime", value: "99.9%" }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-black border border-white/10 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors group"
                            >
                                <span className="text-4xl font-black text-white mb-2 group-hover:scale-110 transition-transform">{stat.value}</span>
                                <span className="text-xs uppercase tracking-widest text-zinc-500">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Stack */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-20 text-center uppercase">
                        The <span className="text-purple-500">Arsenal</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: <Layout />, title: "Frontend", desc: "Next.js 15, React, Tailwind, Framer Motion" },
                            { icon: <Database />, title: "Backend", desc: "Node.js, Postgres, Prisma, Supabase" },
                            { icon: <Zap />, title: "AI Core", desc: "Gemini Pro, OpenAI, Python Neural Nets" },
                            { icon: <Shield />, title: "Infra", desc: "Vercel Edge, AWS, Docker, Linux" }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900 transition-all hover:-translate-y-2 hover:border-blue-500/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-blue-400">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Process */}
            <section className="py-32 px-6 bg-gradient-to-b from-zinc-900 to-black">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase">
                            How We <span className="text-green-400">Execute</span>
                        </h2>
                        <p className="text-zinc-400 max-w-2xl">A military-grade approach to software delivery.</p>
                    </div>

                    <div className="space-y-8">
                        {[
                            { step: "01", title: "Reconnaissance", desc: "We analyze your business, your competitors, and your bottlenecks." },
                            { step: "02", title: "Architecture", desc: "We design a scalable system blueprint before writing a single line of code." },
                            { step: "03", title: "Development", desc: "We build using atomic design principles and strict type safety." },
                            { step: "04", title: "Deployment", desc: "We launch on edge networks for global speed and reliability." }
                        ].map((phase, i) => (
                            <motion.div
                                key={phase.step}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row gap-8 md:items-center p-8 border-b border-white/5 hover:border-blue-500/50 transition-colors group"
                            >
                                <span className="text-5xl font-black text-zinc-800 group-hover:text-blue-500 transition-colors">{phase.step}</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                                    <p className="text-zinc-500 max-w-xl">{phase.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ClientReviews />

            <Footer />
        </main>
    );
}
