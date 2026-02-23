
'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Landmark, Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const hubs = [
    {
        title: "Modern Retail",
        desc: "AI-driven inventory, personalized commerce, and 60FPS shopping experiences.",
        icon: ShoppingBag,
        href: "/solutions/retail",
        accent: "text-rose-400"
    },
    {
        title: "Fintech Sovereignty",
        desc: "Secure, high-load payment gateways and audited digital asset infrastructure.",
        icon: Landmark,
        href: "/solutions/fintech",
        accent: "text-amber-400"
    },
    {
        title: "Logistics Engine",
        desc: "Real-time fleet tracking, geofencing, and automated matching engines.",
        icon: Truck,
        href: "/solutions/logistics",
        accent: "text-emerald-400"
    }
];

export function IndustryHubs() {
    return (
        <section className="py-24 px-6 border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tighter italic mb-6">Expertise by <span className="text-zinc-500">Sector.</span></h2>
                    <p className="text-zinc-500 text-lg">Deep domain solutions for high-stakes industries.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {hubs.map((hub, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                        >
                            <Link href={hub.href} className="block">
                                <div className="mb-8 relative aspect-[4/3] rounded-[2.5rem] bg-zinc-900 overflow-hidden border border-white/5 group-hover:border-white/10 transition-all">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <hub.icon className={`w-16 h-16 ${hub.accent} opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700`} />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 font-syne">{hub.title}</h3>
                                <p className="text-zinc-800 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                                    {hub.desc}
                                </p>
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                                    Enter Hub <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
