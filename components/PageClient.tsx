'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { Navbar } from '@/components/ui/Navbar';
import { TrustBar } from '@/components/ui/TrustBar';
import { SystemTerminal } from '@/components/ui/SystemTerminal';
import { AIEngineSection } from '@/components/ui/AIEngineSection';
import { RoadmapSection } from '@/components/ui/RoadmapSection';
import { EnterpriseShowcase } from '@/components/ui/EnterpriseShowcase';
import { ClientReviews } from '@/components/ui/ClientReviews';
import { Footer } from '@/components/ui/Footer';
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton';

import MagicBento from '@/components/ui/MagicBento';
import { AITransparencyCard } from '@/components/ui/AITransparencyCard';

import { ArrowRight, Lock, Cpu, Globe, Rocket } from 'lucide-react';

export default function PageClient() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-500 selection:bg-blue-500/30">
            {/* Navbar */}
            <Navbar />
            <WhatsAppCTA />

            {/* Blue Glow Background */}
            <div className="bg-blue-glow" />

            {/* Hexacore-Inspired Hero */}
            <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 z-[1] bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.06] pointer-events-none" />

                {/* All Hero Content — In Flow */}
                <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-28 pb-12">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/30 dark:border-white/[0.08] rounded-full px-5 py-2 flex items-center gap-3 mb-10 shadow-2xl relative overflow-hidden group/badge"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-700" />
                        <span className="relative flex h-2 w-2 z-10">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-600 dark:text-zinc-300 z-10">
                            Now accepting 2026 projects
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-syne tracking-[-0.04em] leading-[1.05] mb-8 text-zinc-900 dark:text-white"
                    >
                        <span className="text-cool">
                            We Build Websites <br />
                            That Grow Your Business
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-base sm:text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mb-12 font-medium"
                    >
                        Custom websites, mobile apps, and AI tools — designed to look great and work perfectly.
                    </motion.p>

                    {/* Dual CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6 mb-20"
                    >
                        <Link href="/quote">
                            <LiquidGlassButton variant="primary">
                                Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </LiquidGlassButton>
                        </Link>
                        <Link href="/contact">
                            <LiquidGlassButton variant="secondary">
                                Book a Call
                            </LiquidGlassButton>
                        </Link>
                    </motion.div>

                    {/* Trust Bar — In Flow, Below CTAs */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col items-center gap-5"
                    >
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500">
                            Trusted by businesses worldwide
                        </span>
                        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-50 dark:opacity-40">
                            {["LorryLink", "SN Ceylon", "Rush Photo", "Studio Vibez"].map((brand) => (
                                <span key={brand} className="text-xs md:text-sm font-semibold tracking-wider text-zinc-900 dark:text-white">
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Prompt */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                >
                    <div className="w-5 h-8 rounded-full border-2 border-zinc-400/30 dark:border-white/20 flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1 h-1.5 bg-zinc-400 dark:bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </div>


            <TrustBar />

            {/* Flagship: Xera AI */}
            <section className="py-24 px-6 bg-zinc-50 dark:bg-[#050505] overflow-hidden relative transition-colors duration-500">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="px-4 py-1.5 bg-blue-500/10 backdrop-blur-lg border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                Flagship Project
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-zinc-900 dark:text-white font-syne">
                            Meet <span className="text-blue-500">Xera AI.</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                            Xera is our own AI system — it handles WhatsApp messages, manages orders, and automates daily business tasks. We built it, we use it, and we can build something like it for you.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/about" className="group flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition-colors font-semibold text-sm">
                                Learn more about Xera <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-3xl bg-zinc-900 overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Rocket className="w-24 h-24 text-blue-500 animate-pulse" />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-white/5 transition-colors">
                            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">STATUS: ACTIVE</div>
                            <div className="text-sm font-bold text-zinc-900 dark:text-white">AI-Powered Business Automation</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Magic Bento Grid - Dynamic via CMS */}
            <section className="py-24 px-6 bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight break-words leading-tight text-zinc-900 dark:text-white font-syne">
                            What We <br className="md:hidden" /> <span className="text-blue-500">Offer</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg font-medium">
                            Everything your business needs — from websites to AI, all in one place.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                        {/* Large Item */}
                        <div className="md:col-span-2">
                            <MagicBento
                                title="Works Everywhere"
                                subtitle="Your app loads fast, no matter where your users are."
                                enableStars
                                enableSpotlight
                                enableBorderGlow
                                spotlightRadius={600}
                                glowColor="59, 130, 246"
                            >
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                    <div className="text-5xl md:text-9xl text-blue-500/20 font-black uppercase">GLOBAL</div>
                                </div>
                            </MagicBento>
                        </div>

                        {/* Tall Item */}
                        <div className="md:row-span-2">
                            <MagicBento
                                title="Smart by Default"
                                subtitle="AI features built right into your product."
                                enableTilt
                                enableMagnetism
                                clickEffect
                                glowColor="168, 85, 247"
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
                                    <div className="w-24 h-24 rounded-full bg-purple-500/20 animate-pulse" />
                                    <div className="w-16 h-16 rounded-full bg-purple-500/40 animate-bounce delay-100" />
                                    <div className="w-8 h-8 rounded-full bg-purple-500/60 animate-ping" />
                                </div>
                            </MagicBento>
                        </div>

                        {/* Standard Items */}
                        <MagicBento
                            title="Instant Updates"
                            enableSpotlight
                            glowColor="236, 72, 153"
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                                <ArrowRight className="-rotate-45" size={100} />
                            </div>
                        </MagicBento>

                        <MagicBento
                            title="Secure & Protected"
                            enableBorderGlow
                            glowColor="34, 197, 94"
                        >
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-4xl md:text-6xl font-mono text-green-500/30">
                                    010110
                                </div>
                            </div>
                        </MagicBento>
                    </div>
                </div>
            </section>

            {/* AI Trust & Transparency (The Nutrition Label Model) */}
            <section className="py-24 px-6 border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-black transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                            Trust Built on Evidence
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tight mb-6 leading-tight text-zinc-900 dark:text-white">
                            Built on <br /> <span className="text-zinc-400 dark:text-zinc-500">Trust.</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
                            No secrets. We show you exactly how our AI works, what data it uses, and how we keep your information safe.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                        <AITransparencyCard
                            title="Predictive Analytics"
                            model="Gemini Ultra 1.5 PRO"
                            usage="Real-time localized inference"
                            protection="End-to-end PII Masking"
                            icon={Lock}
                        />
                        <AITransparencyCard
                            title="Autonomous Sales"
                            model="Xera Proprietary Core"
                            usage="Conversation-only training"
                            protection="SOC 2 Type II Audited"
                            icon={Cpu}
                        />
                        <AITransparencyCard
                            title="Global Deployment"
                            model="Multi-Cloud Orchestration"
                            usage="Zero-knowledge architecture"
                            protection="EU AI Act Standard"
                            icon={Globe}
                        />
                    </div>

                    {/* Compliance Strip */}
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <ComplianceBadge title="ISO 42001" desc="AI Management" />
                        <ComplianceBadge title="SOC 2 TYPE II" desc="Security Audited" />
                        <ComplianceBadge title="EU AI ACT" desc="Full Compliance" />
                        <ComplianceBadge title="GDPR" desc="Data Sovereign" />
                    </div>
                </div>
            </section>

            {/* Proof of Engineering (System Terminal) */}
            <SystemTerminal />

            {/* Global Engineering Standards */}
            <section className="relative z-10 py-24 px-6 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black transition-colors duration-500">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold font-syne mb-12 tracking-tight text-zinc-900 dark:text-white">How We <br />Build Things.</h2>
                        <p className="text-zinc-500 text-lg mb-12 leading-relaxed">
                            We follow the same standards used by top tech companies.
                            Your project gets enterprise-level security, fast load times,
                            and code that&apos;s clean enough for any audit.
                        </p>
                        <div className="space-y-6">
                            <StandardItem title="Top-Level Security" desc="Your data is encrypted and protected at every step." />
                            <StandardItem title="Built to Scale" desc="Handles 10 users or 10 million — same performance." />
                            <StandardItem title="AI Built In" desc="Smart features that save you time and money, from day one." />
                        </div>
                    </div>
                    <div className="relative aspect-square bg-zinc-900/20 border border-zinc-800/50 rounded-[3rem] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="p-12 h-full flex flex-col justify-center">
                            <div className="text-zinc-800 font-bold text-[12rem] leading-none select-none tracking-tight font-syne">SERA.</div>
                            <div className="mt-[-2rem] text-zinc-650 font-bold uppercase tracking-[1em] text-xs">Intelligence Defined</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Systems & Industry Details */}
            <AIEngineSection />
            {/* Replacement for ScrollSwapHub */}
            <EnterpriseShowcase />
            <RoadmapSection />
            <ClientReviews />

            {/* CTA Section */}
            <section className="relative z-10 py-32 px-6">
                <div className="max-w-5xl mx-auto bg-white rounded-[4rem] p-12 md:p-24 text-black text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tight mb-8 leading-tight">Ready to build<br />something great?</h2>
                        <Link href="/quote" className="inline-flex items-center justify-center gap-4 bg-black text-white px-8 py-5 md:px-12 md:py-6 rounded-full font-bold hover:scale-105 active:scale-95 transition-all w-full md:w-auto text-center">
                            Start Now <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-100 rounded-full translate-x-1/2 -translate-y-1/2" />
                </div>
            </section>

            <Footer />
        </main >
    );
}

function StandardItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-6">
            <div className="w-6 h-6 rounded-full border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
            <div>
                <h4 className="font-bold mb-1">{title}</h4>
                <p className="text-sm text-zinc-600 font-medium">{desc}</p>
            </div>
        </div>
    );
}

function ComplianceBadge({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm font-black text-white tracking-widest uppercase mb-1">{title}</span>
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{desc}</span>
        </div>
    );
}
