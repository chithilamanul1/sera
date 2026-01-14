'use client';

import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Users, Target, Zap, Globe, Award, Briefcase } from 'lucide-react';
import Image from 'next/image';

const stats = [
    { label: 'Projects Completed', value: '50+', icon: Briefcase },
    { label: 'Happy Clients', value: '100%', icon: Users },
    { label: 'Team Members', value: '12', icon: Globe },
    { label: 'Years Experience', value: '5+', icon: Award },
];

const values = [
    {
        title: 'Innovation First',
        description: 'We constantly explore new technologies to deliver cutting-edge solutions.',
        icon: Zap
    },
    {
        title: 'Client Success',
        description: 'Your growth is our priority. We treat every project as if it were our own.',
        icon: Target
    },
    {
        title: 'Global Standards',
        description: 'We adhere to international coding and design standards.',
        icon: Globe
    }
];

export default function AboutPage() {
    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="pt-40 pb-20 px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-4xl">
                            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight">
                                We Are <span className="text-accent">Seranex.</span>
                            </h1>
                            <p className="text-2xl text-silver/80 leading-relaxed">
                                A premium digital agency based in Sri Lanka, dedicated to crafting world-class web and mobile experiences. We blend creativity with technical excellence to build brands that matter.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-surface border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <div className="mb-4 inline-flex p-4 rounded-2xl bg-white/5 group-hover:bg-accent/10 transition-colors">
                                        <stat.icon className="w-8 h-8 text-silver group-hover:text-accent transition-colors" />
                                    </div>
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-silver/60 uppercase tracking-widest text-xs">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-32 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden relative z-10 border border-white/10">
                                {/* Placeholder for Team/Office Image - can use a generic abstract tech image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-surface to-void flex items-center justify-center">
                                    <span className="text-white/20 font-bold text-2xl">Create. Build. Scale.</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 bg-accent/10 rounded-3xl -z-10" />
                        </div>

                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                                Redefining Digital Excellence in Sri Lanka
                            </h2>
                            <div className="space-y-6 text-lg text-silver/70">
                                <p>
                                    Founded with a vision to bridge the gap between local pricing and global quality, Seranex has rapidly evolved into a powerhouse of digital innovation.
                                </p>
                                <p>
                                    We don't just build websites; we build digital ecosystems. Our approach is rooted in a deep understanding of user behavior, modern aesthetics, and robust engineering.
                                </p>
                                <p>
                                    Whether you are a startup looking to make a splash or an established enterprise seeking digital transformation, we have the expertise to take you there.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-32 px-6 bg-surface/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-heading font-bold text-white mb-4">Our Core Values</h2>
                            <p className="text-silver/60">The principles that drive every pixel and line of code.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((val, i) => (
                                <div key={i} className="p-10 rounded-3xl bg-void border border-white/5 hover:border-accent/40 transition-colors group">
                                    <val.icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-2xl font-bold text-white mb-4">{val.title}</h3>
                                    <p className="text-silver/60 leading-relaxed">
                                        {val.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8">
                            Ready to make an impact?
                        </h2>
                        <a href="/contact" className="inline-block px-12 py-5 rounded-full bg-accent text-white font-heading font-bold text-lg shadow-lg shadow-accent/25 hover:shadow-accent/50 hover:scale-105 transition-all">
                            Start Your Project
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
