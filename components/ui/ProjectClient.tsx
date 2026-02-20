'use client';

import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ProjectGallery } from '@/components/ui/ProjectGallery';
import { ArrowLeft, Cpu, Target, BarChart, Code } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Project {
    id: string;
    title: string;
    slug: string;
    role: string;
    vision?: string;
    businessImpact?: string;
    content: string;
    techStack: string[];
    features: string[];
    imageUrl: string;
    galleryImages?: string[];
    executiveSummary?: string;
    category: string;
}

export function ProjectClient({ project }: { project: Project }) {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans antialiased">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/portfolio" className="group inline-flex items-center gap-4 text-zinc-500 hover:text-white transition-all mb-16 text-xs font-black uppercase tracking-[0.4em]">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Work
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl">
                                    {project.category}
                                </div>
                                <h1 className="text-7xl md:text-[8rem] xl:text-[10rem] font-bold font-clash tracking-[-0.04em] italic leading-[0.85] uppercase">
                                    {project.title.split(' ').slice(0, 2).join(' ')} <br />
                                    <span className="text-zinc-700">{project.title.split(' ').slice(2).join(' ')}</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-zinc-500 text-2xl font-light leading-relaxed max-w-xl italic"
                            >
                                {project.role}
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-zinc-900"
                        >
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Impact Bento */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Vision */}
                        <div className="md:col-span-8 p-16 rounded-[4rem] bg-zinc-950 border border-white/5 flex flex-col justify-between group overflow-hidden relative transition-all duration-700 hover:border-white/10">
                            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <Target className="w-64 h-64 text-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 text-zinc-500 mb-12">
                                    <Target className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Strategic Vision</span>
                                </div>
                                <p className="text-4xl md:text-6xl font-clash font-bold leading-[1.1] text-white italic tracking-[-0.04em]">
                                    &ldquo;{project.vision}&rdquo;
                                </p>
                            </div>
                        </div>

                        {/* Impact */}
                        <div className="md:col-span-4 p-16 rounded-[4rem] bg-blue-600 text-white flex flex-col justify-between shadow-[0_40px_80px_-20px_rgba(37,99,235,0.4)] relative overflow-hidden group">
                            <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 transition-transform duration-700">
                                <BarChart className="w-48 h-48" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-12">
                                    <BarChart className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Impact Ratio</span>
                                </div>
                                <p className="text-2xl font-bold leading-tight uppercase tracking-tight">
                                    {project.businessImpact}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content & Gallery */}
            <section className="py-32 px-6 bg-zinc-950/30">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
                    <div className="space-y-20">
                        <div className="space-y-10">
                            <div className="flex items-center gap-4 text-zinc-500">
                                <Cpu className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Digital Engine Architecture</span>
                            </div>
                            <p className="text-zinc-400 text-xl leading-[1.6] font-light">
                                {project.content}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Engine Stack</h4>
                                <div className="flex flex-wrap gap-3">
                                    {project.techStack.map((tech: string) => (
                                        <span key={tech} className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Core Capabilities</h4>
                                <div className="space-y-4">
                                    {project.features.map((feature: string) => (
                                        <div key={feature} className="flex items-center gap-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-24">
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <div className="rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                                <ProjectGallery images={project.galleryImages} />
                            </div>
                        )}

                        {/* GEO Insight */}
                        <div className="p-16 rounded-[4rem] bg-zinc-900 border border-white/5 relative overflow-hidden group hover:border-blue-500/20 transition-colors">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Code className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 text-blue-500 mb-10">
                                    <Code className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">GEO Architecture Insight</span>
                                </div>
                                <p className="text-zinc-400 text-lg leading-[1.6] italic border-l-2 border-blue-500/30 pl-8">
                                    {project.executiveSummary}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Revolution CTA */}
            <section className="py-44 px-6">
                <div className="max-w-5xl mx-auto rounded-[5rem] bg-white p-24 text-black text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                    <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
                        <h2 className="text-5xl md:text-8xl font-bold font-clash tracking-[-0.04em] italic mb-12 uppercase leading-none">
                            Ready for your <br /> own revolution?
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-4 md:gap-6 px-8 py-5 md:px-16 md:py-8 rounded-full bg-black text-white font-black text-xs md:text-sm uppercase tracking-widest md:tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-2xl group-hover:bg-white group-hover:text-black w-full md:w-auto overflow-hidden text-center"
                        >
                            <span className="whitespace-nowrap">Initialize Discovery</span>
                            <ArrowLeft className="w-5 h-5 rotate-180 shrink-0" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
