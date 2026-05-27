'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { LiquidGlassCard } from './LiquidGlassCard';

interface ProjectItem {
    title: string;
    category: string;
    link: string;
    desc: string;
    details: string;
    built: string[];
    tags: string[];
    image: string;
    gallery: string[];
}

const fallbackProjects: ProjectItem[] = [
    {
        title: "Chithilamanul",
        category: "Web Portfolio",
        link: "https://chithilamanul.online/",
        desc: "A personal brand website with modern animations and clean design.",
        details: "Built a fully responsive portfolio website with dark mode, smooth scroll animations, and a contact system. Features include a custom CMS for blog posts, project showcase with live previews, and SEO optimization.",
        built: ["Next.js", "Tailwind CSS", "Framer Motion", "Custom CMS"],
        tags: ["Portfolio", "Web Design", "Responsive"],
        image: "/images/Screenshot 2026-02-21 171730.png",
        gallery: [
            "/images/Screenshot 2026-02-21 171730.png",
            "/images/Screenshot 2026-02-21 171748.png",
            "/images/Screenshot 2026-02-21 171759.png",
        ]
    },
    {
        title: "Jayantha Motors",
        category: "Business Website",
        link: "https://jayanthamortors.site/",
        desc: "A complete business website for a motorcycle service center in Seeduwa.",
        details: "Developed a professional business website for Jayantha Motors featuring service listings, inquiry forms, Google Maps integration, and a customer review section. The site is optimized for local SEO to capture nearby customers.",
        built: ["Next.js", "Responsive Design", "Google Maps API", "Local SEO"],
        tags: ["Automotive", "Business", "Local SEO"],
        image: "/images/Screenshot 2026-02-21 145946.png",
        gallery: [
            "/images/Screenshot 2026-02-21 145946.png",
            "/images/Screenshot 2026-02-21 171906.png",
            "/images/Screenshot 2026-02-21 171920.png",
        ]
    },
    {
        title: "NovaLink LK",
        category: "Infrastructure Platform",
        link: "https://novalink.lk/",
        desc: "A high-performance v2ray VPN infrastructure platform for Sri Lanka.",
        details: "Built a full-featured digital platform with user dashboards, real-time server monitoring, and a service marketplace. Includes payment integration, analytics tracking, and an admin panel for managing VPN nodes and users.",
        built: ["React", "Node.js", "MongoDB", "Payment Gateway"],
        tags: ["Platform", "SaaS", "Infrastructure"],
        image: "/images/Screenshot 2026-02-21 172818.png",
        gallery: [
            "/images/Screenshot 2026-02-21 172818.png",
            "/images/Screenshot 2026-02-21 172832.png",
            "/images/Screenshot 2026-02-21 172848.png",
        ]
    },
    {
        title: "Airport Taxis PVT LTD",
        category: "Transport & Tourism",
        link: "https://srilankantaxi.lk/",
        desc: "A premium airport taxi and tour booking platform for Sri Lanka.",
        details: "Built a complete taxi & tour booking system with real-time pricing, route-based fare calculation, driver management, and customer ratings. Features include tour package listings, automated notifications via SMS and WhatsApp, and Google Reviews integration.",
        built: ["React", "Maps API", "Booking System", "WhatsApp API"],
        tags: ["Logistics", "Tourism", "Booking"],
        image: "/images/Screenshot 2026-02-21 173131.png",
        gallery: [
            "/images/Screenshot 2026-02-21 173131.png",
            "/images/Screenshot 2026-02-21 173146.png",
            "/images/Screenshot 2026-02-21 173221.png",
            "/images/Screenshot 2026-02-21 173230.png",
        ]
    },
    {
        title: "Mobile Hub",
        category: "E-Commerce",
        link: "#",
        desc: "Sri Lanka's #1 premium mobile store with certified pre-owned devices.",
        details: "Developed a full-featured e-commerce platform for a premium mobile device retailer. Features include product collections, certified pre-owned listings, trade-in system, warranty management, and a seamless sign-in flow.",
        built: ["Next.js", "E-commerce", "Tailwind CSS", "Stripe"],
        tags: ["E-commerce", "Retail", "Mobile"],
        image: "/images/Screenshot 2026-02-21 172925.png",
        gallery: [
            "/images/Screenshot 2026-02-21 172925.png",
            "/images/Screenshot 2026-02-21 172948.png",
            "/images/Screenshot 2026-02-21 173000.png",
        ]
    },
    {
        title: "Road House",
        category: "Restaurant & Cafe",
        link: "https://roadhouse.lk/",
        desc: "A bold restaurant website for Road House Cafe & Restro in Seeduwa, The Food District.",
        details: "Built a full-featured restaurant platform for Road House Cafe & Restro featuring zone-based dining areas (Street Food, The Cafe, B.Y.O.B, Karaoke), a live table booking system, real-time capacity tracking, an interactive gallery, and RoadOS — a custom-built admin command center for managing menus, floor plans, reservations, and sales powered by Seranex AI.",
        built: ["Next.js", "Framer Motion", "Real-time DB", "Custom Admin CMS"],
        tags: ["Restaurant", "Hospitality", "Full-stack"],
        image: "/images/roadhouse-1.png",
        gallery: [
            "/images/roadhouse-1.png",
            "/images/roadhouse-2.png",
            "/images/roadhouse-3.png",
            "/images/roadhouse-4.png",
            "/images/roadhouse-5.png",
        ]
    }
];

export function Portfolio() {
    const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [galleryIndex, setGalleryIndex] = useState(0);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/admin/projects?public=true');
                if (res.ok) {
                    const data = await res.json();
                    if (data.projects && data.projects.length > 0) {
                        const mappedProjects = data.projects.map((p: any) => ({
                            title: p.title,
                            category: p.category,
                            link: p.imageUrl || p.slug,
                            desc: p.content || '',
                            details: p.caseStudy || p.content || '',
                            built: p.techStack || [],
                            tags: p.features || p.techStack || [],
                            image: p.imageUrl || '',
                            gallery: p.galleryImages || [],
                        }));
                        setProjects(mappedProjects);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch projects, using fallback:', err);
            }
        };

        fetchProjects();
    }, []);

    return (
        <>
            <section id="work" className="relative z-10 py-24 px-6 bg-white dark:bg-black transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="max-w-xl">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-syne leading-tight text-white"
                            >
                                Our Recent <br />
                                <span className="text-cool">Projects.</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-zinc-400 text-sm md:text-lg leading-relaxed max-w-lg"
                            >
                                Real projects we&apos;ve built for real businesses. Tap any project to explore.
                            </motion.p>
                        </div>
                    </div>

                    {/* Project Grid — Image Based */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {projects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="h-full"
                            >
                                <LiquidGlassCard
                                    containerClassName="cursor-pointer group h-full"
                                    className="p-0 h-full flex flex-col"
                                >
                                    <div onClick={() => { setSelectedProject(project); setGalleryIndex(0); }} className="h-full flex flex-col">
                                        {/* Image */}
                                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1.5 bg-white/20 dark:bg-black/40 backdrop-blur-xl text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white rounded-full border border-white/20 dark:border-white/10 shadow-2xl">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {/* Visit Button */}
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/20 dark:border-white/10 hover:bg-white dark:hover:bg-black transition-all shadow-2xl hover:scale-110"
                                            >
                                                <ExternalLink className="w-4 h-4 text-zinc-900 dark:text-white" />
                                            </a>
                                        </div>

                                        {/* Info */}
                                        <div className="p-6 md:p-8 flex-1 flex flex-col">
                                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight font-syne">
                                                {project.title}
                                            </h3>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-none font-medium">
                                                {project.desc}
                                            </p>

                                            {/* Tech Tags */}
                                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                                                {project.built.slice(0, 4).map((tech, j) => (
                                                    <span
                                                        key={j}
                                                        className="px-2.5 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-black/5 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 rounded-full border border-black/10 dark:border-white/[0.06]"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </LiquidGlassCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Portfolio CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link href="/portfolio">
                            <button className="group px-8 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-3">
                                View All Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox / Gallery Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-zinc-950/90 backdrop-blur-[32px] rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl relative"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                <X className="w-5 h-5 text-zinc-700 dark:text-white" />
                            </button>

                            {/* Main Image */}
                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-3xl">
                                <Image
                                    src={
                                        selectedProject.gallery.length > 0
                                            ? selectedProject.gallery[galleryIndex]
                                            : selectedProject.image
                                    }
                                    alt={`${selectedProject.title} - Image ${galleryIndex + 1}`}
                                    fill
                                    className="object-cover"
                                />

                                {/* Gallery Nav */}
                                {selectedProject.gallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setGalleryIndex(i => (i - 1 + selectedProject.gallery.length) % selectedProject.gallery.length)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setGalleryIndex(i => (i + 1) % selectedProject.gallery.length)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedProject.gallery.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setGalleryIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === galleryIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Gallery Thumbnails */}
                            {selectedProject.gallery.length > 1 && (
                                <div className="flex gap-2 px-6 pt-4 overflow-x-auto scrollbar-hide">
                                    {selectedProject.gallery.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setGalleryIndex(idx)}
                                            className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${idx === galleryIndex ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Details */}
                            <div className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 dark:border-blue-500/20">
                                        {selectedProject.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 font-syne">
                                    {selectedProject.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                                    {selectedProject.details}
                                </p>

                                {/* Tech Stack */}
                                <div className="mb-6">
                                    <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-3 block">
                                        Built with
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.built.map((tech, j) => (
                                            <span
                                                key={j}
                                                className="px-3 py-1.5 text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-500/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Visit Link */}
                                <a
                                    href={selectedProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
                                >
                                    Visit Live Site <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
