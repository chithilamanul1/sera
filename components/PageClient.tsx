'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Scene3D } from '@/components/ui/Scene3D';
import { StarField3D } from '@/components/ui/StarField3D';
import { Navbar } from '@/components/ui/Navbar';
import { ImpactStrip } from '@/components/ui/ImpactStrip';
import { TrustBar } from '@/components/ui/TrustBar';
import { SystemTerminal } from '@/components/ui/SystemTerminal';
import { AIEngineSection } from '@/components/ui/AIEngineSection';
import { RoadmapSection } from '@/components/ui/RoadmapSection';
import { ScrollSwapHub } from '@/components/ui/ScrollSwapHub';
import { ClientReviews } from '@/components/ui/ClientReviews';
import { Footer } from '@/components/ui/Footer';

import BlurText from '@/components/ui/BlurText';
import MagicBento from '@/components/ui/MagicBento';
import { FloatingTechStack } from '@/components/ui/FloatingTechStack';

interface PageClientProps {
    config: any;
}

export default function PageClient({ config }: PageClientProps) {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-blue-500/30">
            {/* Navbar */}
            <Navbar />

            {/* Professional SaaS Hero with Aurora */}
            <div className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 min-h-screen flex flex-col justify-center items-center text-center">
                {/* Constellation Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Scene3D>
                        <StarField3D />
                    </Scene3D>
                </div>
                {/* Vignette Overlay for focus */}
                <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center">
                    {/* Orbiting Icons */}
                    <div className="absolute inset-0 z-[-1] opacity-60 md:opacity-100">
                        <FloatingTechStack />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-mono tracking-widest text-zinc-400 uppercase">
                                System Online
                            </span>
                        </div>
                    </motion.div>

                    {/* Main Headline - Dynamic via CMS */}
                    <h1 className="text-5xl md:text-8xl leading-[0.9] text-white font-black tracking-tighter mb-8 font-sans uppercase">
                        <BlurText
                            text={config?.heroTitle || "WE BUILD SCALABLE WEB & MOBILE APPS"}
                            delay={50}
                            animateBy="words"
                            direction="top"
                        />
                    </h1>

                    <p className="text-lg md:text-2xl text-zinc-400 font-normal max-w-2xl leading-relaxed mb-10">
                        {config?.heroSubtitle || "From next-gen SaaS platforms to enterprise mobile solutions."}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/quote">
                            <button className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] flex items-center gap-2">
                                Start Project <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <Link href="/pricing" className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white text-lg font-medium">
                            View Pricing
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-blue-500/50 to-transparent" />
                </motion.div>
            </div>

            <ImpactStrip />
            <TrustBar />

            {/* Magic Bento Grid - Dynamic via CMS */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-6xl font-black mb-6 uppercase tracking-tighter break-words">
                            The <br className="md:hidden" /> <span className="text-blue-500">{config?.aboutTitle?.split(' ')[1] || "Ecosystem"}</span>
                        </h2>
                        <p className="text-zinc-400 max-w-2xl text-lg">
                            {config?.aboutContent || "Everything you need to scale, secured by next-gen architecture."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                        {/* Large Item */}
                        <div className="md:col-span-2">
                            <MagicBento
                                title="Global Infrastructure"
                                subtitle="Deployed on edge networks worldwide."
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
                                title="AI Native"
                                subtitle="Built for the intelligence era."
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
                            title="Real-time Sync"
                            enableSpotlight
                            glowColor="236, 72, 153"
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                                <ArrowRight className="-rotate-45" size={100} />
                            </div>
                        </MagicBento>

                        <MagicBento
                            title="Bank-Grade Security"
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

            {/* Proof of Engineering (System Terminal) */}
            <SystemTerminal />

            {/* Global Engineering Standards */}
            <section className="relative z-10 py-24 px-6 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black font-sans mb-12 uppercase tracking-tighter">Global <br />Engineering Standards.</h2>
                        <p className="text-zinc-500 text-lg mb-12 leading-relaxed">
                            We operate at the intersection of rigorous engineering and avant-garde design.
                            Our systems are built for global scale, leveraging ISO-grade security protocols
                            and near-zero latency architectures.
                        </p>
                        <div className="space-y-6">
                            <StandardItem title="Mission-Critical Security" desc="Bank-grade encryption and audited infrastructure." />
                            <StandardItem title="Hyper-Scale Readiness" desc="Architectures designed to handle millions of requests." />
                            <StandardItem title="AI-Native Core" desc="Intelligence embedded into every line of code." />
                        </div>
                    </div>
                    <div className="relative aspect-square bg-zinc-900/20 border border-zinc-800/50 rounded-[3rem] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="p-12 h-full flex flex-col justify-center">
                            <div className="text-zinc-800 font-black text-[12rem] leading-none select-none tracking-tighter font-sans italic">SERA.</div>
                            <div className="mt-[-2rem] text-zinc-650 font-bold uppercase tracking-[1em] text-xs">Intelligence Defined</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Systems & Industry Details */}
            <AIEngineSection />
            <ScrollSwapHub config={config} />
            <RoadmapSection />
            <ClientReviews />

            {/* CTA Section */}
            <section className="relative z-10 py-32 px-6">
                <div className="max-w-5xl mx-auto bg-white rounded-[4rem] p-12 md:p-24 text-black text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-black font-sans italic tracking-tighter mb-8 leading-[0.9]">Start your digital <br />revolution today.</h2>
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
