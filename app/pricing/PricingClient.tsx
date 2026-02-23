'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { motion } from 'framer-motion';
import { Check, Globe, Zap, Cpu } from 'lucide-react';
import Link from 'next/link';

export function PricingClient() {
    const [isInternational, setIsInternational] = useState(false);

    const tiers = [
        {
            name: "Web Development",
            id: "web",
            icon: <Globe className="text-blue-400" />,
            price: isInternational ? "$150" : "LKR 15,000",
            description: "High-performance websites built for speed and conversion.",
            features: [
                "Custom Next.js Architecture",
                "SEO Optimized Core",
                "Mobile Responsive",
                "CMS Integration",
                "1 Month Support"
            ],
            cta: "Start Web Project",
            popular: true
        },
        {
            name: "Mobile Apps",
            id: "mobile",
            icon: <Cpu className="text-purple-400" />,
            price: isInternational ? "$500" : "LKR 100,000",
            description: "Native-grade iOS & Android applications.",
            features: [
                "Cross-Platform (React Native)",
                "App Store Submission",
                "Push Notifications",
                "Offline Mode",
                "API Integration"
            ],
            cta: "Build App",
            popular: false
        },
        {
            name: "AI Solutions",
            id: "ai",
            icon: <Zap className="text-yellow-400" />,
            price: "Custom",
            description: "Tailored AI integration for enterprise automation.",
            features: [
                "Starter AI: Chatbots & Basic NLP",
                "Pro Intelligence: Data Analysis & Automations",
                "Enterprise Neural: Full Custom Models"
            ],
            cta: "Consult AI Team",
            popular: false
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase break-words">
                        Transparent <span className="text-blue-500">Value.</span>
                    </h1>
                    <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                        Elite engineering at competitive rates. Choose your region to see applicable pricing.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-4">
                        <span className={`text-sm font-bold tracking-wider ${!isInternational ? 'text-white' : 'text-zinc-600'}`}>LOCAL (LKR)</span>
                        <button
                            onClick={() => setIsInternational(!isInternational)}
                            className="w-16 h-8 bg-zinc-800 rounded-full p-1 relative transition-colors hover:bg-zinc-700"
                        >
                            <div className={`w-6 h-6 bg-blue-600 rounded-full shadow-lg transition-transform duration-300 ${isInternational ? 'translate-x-8' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-sm font-bold tracking-wider ${isInternational ? 'text-white' : 'text-zinc-600'}`}>INTERNATIONAL (USD)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 rounded-3xl border ${tier.popular ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 bg-white/5'} backdrop-blur-sm group hover:border-white/20 transition-all`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                                    {tier.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-zinc-500 font-medium">Starting from</span>
                                </div>
                                <div className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                                    {tier.price}
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {tier.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Check size={16} className="text-blue-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/quote" className="block">
                                <button className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all ${tier.popular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20'
                                    : 'bg-white text-black hover:bg-zinc-200'
                                    }`}>
                                    {tier.cta}
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 border-t border-white/10 pt-20">
                    <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-tight">AI Solution Tiers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Starter AI", price: isInternational ? "$1,000+" : "200,000 LKR+", feat: "Chatbots & NLP" },
                            { name: "Pro Intelligence", price: isInternational ? "$2,500+" : "450,000 LKR+", feat: "Automations & Analytics" },
                            { name: "Enterprise Neural", price: "Custom", feat: "Full Fine-Tuned Models" }
                        ].map((pkg) => (
                            <div key={pkg.name} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                                <h4 className="text-xl font-bold mb-2 text-zinc-300">{pkg.name}</h4>
                                <div className="text-2xl font-black text-white mb-2">{pkg.price}</div>
                                <span className="text-xs text-blue-400 uppercase tracking-wider">{pkg.feat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
