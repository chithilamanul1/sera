'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { ShoppingBag, Landmark, Truck, ArrowRight, CreditCard } from 'lucide-react';
import Link from 'next/link';

const solutions = [
    {
        id: 'retail',
        title: "Modern Retail",
        desc: "AI-driven inventory, personalized commerce, and 60FPS shopping experiences.",
        icon: ShoppingBag,
        href: "/solutions/retail",
        color: "rose",
        gradient: "from-rose-500/20 to-rose-900/5"
    },
    {
        id: 'fintech',
        title: "Fintech Sovereignty",
        desc: "Secure, high-load payment gateways and audited digital asset infrastructure.",
        icon: Landmark,
        href: "/solutions/fintech",
        color: "amber",
        gradient: "from-amber-500/20 to-amber-900/5"
    },
    {
        id: 'logistics',
        title: "Logistics Engine",
        desc: "Real-time fleet tracking, geofencing, and automated matching engines.",
        icon: Truck,
        href: "/solutions/logistics",
        color: "emerald",
        gradient: "from-emerald-500/20 to-emerald-900/5"
    }
];

/* ─── Device Frame Components ─── */

function LaptopFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-[700px]">
            {/* Lid */}
            <div className="bg-[#111] rounded-t-2xl border border-zinc-700 overflow-hidden aspect-[16/10] ring-1 ring-white/5 shadow-2xl">
                <div className="w-full h-full bg-black relative overflow-hidden">
                    {children}
                </div>
            </div>
            {/* Base */}
            <div className="relative mx-auto w-[105%] -ml-[2.5%] h-4 bg-[#1a1a1a] rounded-b-xl border-t border-zinc-800 flex justify-center">
                <div className="w-16 h-1 bg-zinc-700 rounded-b mt-0" />
            </div>
            {/* Shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-blue-500/5 blur-2xl rounded-full" />
        </div>
    );
}

function DesktopFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-[750px]">
            {/* Monitor */}
            <div className="bg-[#0a0a0a] rounded-xl border-2 border-zinc-700 overflow-hidden aspect-[16/9] ring-1 ring-white/5 shadow-2xl">
                <div className="w-full h-full bg-black relative overflow-hidden">
                    {children}
                </div>
            </div>
            {/* Stand Neck */}
            <div className="mx-auto w-16 h-10 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-sm" />
            {/* Stand Base */}
            <div className="mx-auto w-40 h-3 bg-zinc-800 rounded-full shadow-lg" />
        </div>
    );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-[220px]">
            <div className="bg-[#111] rounded-[2rem] border-2 border-zinc-700 p-2 ring-1 ring-white/5 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 border border-zinc-800" />
                {/* Screen */}
                <div className="rounded-[1.5rem] overflow-hidden aspect-[9/19] bg-black relative">
                    {children}
                </div>
            </div>
            {/* Bottom bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-600 rounded-full z-30" />
        </div>
    );
}

function TabletFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-[350px]">
            <div className="bg-[#111] rounded-2xl border-2 border-zinc-700 p-3 ring-1 ring-white/5 shadow-2xl">
                {/* Camera */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 rounded-full z-20" />
                {/* Screen */}
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-black relative">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ─── Screen Content for Each Device ─── */

function RetailScreen() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-rose-950 to-black p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <div className="h-2 w-20 bg-white/10 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-2 flex-1">
                {[1, 2, 3, 4, 5, 6].map(k => (
                    <div key={k} className="bg-white/5 rounded-lg animate-pulse" style={{ animationDelay: `${k * 150}ms` }} />
                ))}
            </div>
            <div className="h-8 bg-rose-500/30 rounded-lg flex items-center justify-center">
                <span className="text-[8px] font-bold text-rose-300 uppercase tracking-wider">Add to Cart</span>
            </div>
        </div>
    );
}

function FintechScreen() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-amber-950 to-black p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-amber-500/20 rounded border border-amber-500/50 flex items-center justify-center">
                    <CreditCard size={12} className="text-amber-400" />
                </div>
                <div className="flex-1 space-y-1">
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                </div>
            </div>
            <div className="flex-1 bg-white/5 rounded-lg flex items-end p-2 gap-1">
                {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                    <div key={i} className="flex-1 bg-amber-500/40 rounded-t-sm transition-all hover:bg-amber-400" style={{ height: `${h}%` }} />
                ))}
            </div>
            <div className="flex gap-2">
                <div className="flex-1 h-6 bg-amber-500/20 rounded" />
                <div className="flex-1 h-6 bg-white/5 rounded" />
            </div>
        </div>
    );
}

function LogisticsScreen() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950 to-black relative overflow-hidden">
            {/* Map Dots */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            {/* Routes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M20 80 Q 40 20, 80 30" stroke="rgba(16,185,129,0.4)" strokeWidth="0.5" fill="none" strokeDasharray="2 2">
                    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M10 40 Q 50 60, 90 20" stroke="rgba(52,211,153,0.3)" strokeWidth="0.5" fill="none" strokeDasharray="2 2">
                    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="4s" repeatCount="indefinite" />
                </path>
            </svg>
            {/* Ping Dots */}
            <div className="absolute top-[30%] left-[70%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_12px_#34d399] animate-ping" />
            <div className="absolute top-[60%] left-[25%] w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white] animate-pulse" />
            <div className="absolute top-[45%] left-[50%] w-2.5 h-2.5 bg-emerald-300 rounded-full shadow-[0_0_10px_#6ee7b7] animate-bounce" />
            {/* Status Bar */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2 border border-emerald-500/20">
                <Truck size={10} className="text-emerald-400" />
                <span className="text-[8px] text-emerald-300 font-mono">3 Active · 12 Delivered</span>
            </div>
        </div>
    );
}

/* ─── Main Component ─── */

interface ScrollSwapHubProps {
    config?: any;
}

export function ScrollSwapHub({ config }: ScrollSwapHubProps) {
    const retailTitle = config?.retailTitle || solutions[0].title;
    const retailDesc = config?.retailDesc || solutions[0].desc;
    const fintechTitle = config?.fintechTitle || solutions[1].title;
    const fintechDesc = config?.fintechDesc || solutions[1].desc;
    const logisticsTitle = config?.logisticsTitle || solutions[2].title;
    const logisticsDesc = config?.logisticsDesc || solutions[2].desc;

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Device reveal animations based on scroll - refined to prevent clashes
    const laptopOpacity = useTransform(scrollYProgress, [0, 0.1, 0.22, 0.28], [0, 1, 1, 0]);
    const laptopY = useTransform(scrollYProgress, [0, 0.1], [100, 0]);
    const laptopZindex = useTransform(scrollYProgress, [0, 0.28], [5, 1]);

    const desktopOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.58, 0.65], [0, 1, 1, 0]);
    const desktopY = useTransform(scrollYProgress, [0.3, 0.4], [100, 0]);
    const desktopZindex = useTransform(scrollYProgress, [0.3, 0.65], [10, 1]);

    const phoneOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.95], [0, 1, 1]);
    const phoneX = useTransform(scrollYProgress, [0.65, 0.75], [-100, 0]);
    const phoneZindex = useTransform(scrollYProgress, [0.65, 1], [15, 15]);

    const tabletOpacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95], [0, 1, 1]);
    const tabletX = useTransform(scrollYProgress, [0.7, 0.8], [100, 0]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden py-10 px-6">

                {/* Title */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0.3]) }}
                    className="text-center mb-8 z-10"
                >
                    <h2 className="text-2xl md:text-4xl font-black font-syne tracking-tighter uppercase">
                        Built for <span className="text-blue-500">Every Screen.</span>
                    </h2>
                    <p className="text-zinc-600 text-sm mt-2">Responsive. Performant. Real.</p>
                </motion.div>

                {/* Devices Container */}
                <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center">

                    {/* Row 1: Laptop (Retail) */}
                    <motion.div
                        style={{ opacity: laptopOpacity, y: laptopY, zIndex: laptopZindex }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 w-full pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <LaptopFrame>
                                <RetailScreen />
                            </LaptopFrame>
                        </div>
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.12, 0.22], [0, 1]) }}
                            className="text-center"
                        >
                            <h3 className="text-lg font-bold text-rose-400 uppercase tracking-wider">{retailTitle}</h3>
                            <p className="text-zinc-500 text-xs max-w-sm">{retailDesc}</p>
                        </motion.div>
                    </motion.div>

                    {/* Row 2: Desktop Monitor (Fintech) */}
                    <motion.div
                        style={{ opacity: desktopOpacity, y: desktopY, zIndex: desktopZindex }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 w-full pointer-events-none"
                    >
                        <div className="pointer-events-auto">
                            <DesktopFrame>
                                <FintechScreen />
                            </DesktopFrame>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-amber-400 uppercase tracking-wider">{fintechTitle}</h3>
                            <p className="text-zinc-500 text-xs max-w-sm">{fintechDesc}</p>
                        </div>
                    </motion.div>

                    {/* Row 3: Phone + Tablet Side by Side (Logistics) */}
                    <motion.div
                        style={{ opacity: phoneOpacity, zIndex: phoneZindex }}
                        className="absolute inset-0 flex items-center justify-center gap-8 md:gap-16 w-full px-4 pointer-events-none"
                    >
                        <motion.div
                            style={{ x: phoneX }}
                            className="flex flex-col items-center gap-4 pointer-events-auto"
                        >
                            <PhoneFrame>
                                <LogisticsScreen />
                            </PhoneFrame>
                            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Mobile</h3>
                        </motion.div>

                        <motion.div
                            style={{ opacity: tabletOpacity, x: tabletX }}
                            className="hidden md:flex flex-col items-center gap-4 pointer-events-auto"
                        >
                            <TabletFrame>
                                <LogisticsScreen />
                            </TabletFrame>
                            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">{logisticsTitle}</h3>
                        </motion.div>

                        {/* Logistics Description Overlay */}
                        <motion.div
                            style={{ opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 1]) }}
                            className="absolute bottom-10 text-center max-w-md"
                        >
                            <p className="text-zinc-500 text-xs">{logisticsDesc}</p>
                        </motion.div>
                    </motion.div>

                </div>

                {/* Bottom CTA */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.8, 0.95], [0, 1]) }}
                    className="mt-6 z-10"
                >
                    <Link href="/solutions" className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-white hover:bg-white/10 transition-all backdrop-blur-md">
                        Explore All Solutions <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
