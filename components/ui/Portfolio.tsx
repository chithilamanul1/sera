'use client';

import { motion } from 'framer-motion';
import { LiveDevicePreview, DeviceType } from './LiveDevicePreview';
import { useState, useEffect } from 'react';

// Fallback projects if API fails
const fallbackProjects: {
    title: string;
    category: string;
    liveUrl: string;
    link: string;
    desc: string;
    tags: string[];
    device: DeviceType;
}[] = [
        {
            title: "Chithila Manul",
            category: "Portfolio",
            liveUrl: "https://chithilamanul.online/",
            link: "https://chithilamanul.online/",
            desc: "Personal portfolio and professional showcase with modern design and interactive elements.",
            tags: ["Next.js", "Portfolio", "Modern UI"],
            device: "laptop"
        },
        {
            title: "Jayantha Motors",
            category: "Automotive",
            liveUrl: "https://jayanthamotors.site/",
            link: "https://jayanthamotors.site/",
            desc: "Premium automotive dealership platform with inventory management and customer engagement.",
            tags: ["E-commerce", "Automotive", "CMS"],
            device: "desktop"
        },
        {
            title: "Sri Lankan Taxi",
            category: "Tourism",
            liveUrl: "https://srilankantaxi.lk/",
            link: "https://srilankantaxi.lk/",
            desc: "Luxury airport transfers and curated tour packages for travelers across Sri Lanka.",
            tags: ["Booking Engine", "Maps API", "Tourism"],
            device: "phone"
        },
        {
            title: "NovaLink",
            category: "SaaS",
            liveUrl: "https://novalink.lk/",
            link: "https://novalink.lk/",
            desc: "Enterprise connectivity platform enabling seamless business communications and integrations.",
            tags: ["SaaS", "Enterprise", "API"],
            device: "laptop"
        },
        {
            title: "NovaLink Dashboard",
            category: "Analytics",
            liveUrl: "https://dash.novalink.lk/auth/login",
            link: "https://dash.novalink.lk/auth/login",
            desc: "Real-time analytics and control center for NovaLink platform administrators.",
            tags: ["Dashboard", "Analytics", "Admin"],
            device: "desktop"
        },
        {
            title: "Sera AI",
            category: "AI Solutions",
            liveUrl: "https://chithilamanul.online/",
            link: "https://chithilamanul.online/",
            desc: "AI-powered business automation and intelligent assistant platform for enterprises.",
            tags: ["AI", "Automation", "LLM"],
            device: "phone"
        }
    ];

export function Portfolio() {
    const [projects, setProjects] = useState(fallbackProjects);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/admin/projects');
                if (res.ok) {
                    const data = await res.json();
                    if (data.projects && data.projects.length > 0) {
                        // Map database projects to portfolio format
                        const mappedProjects = data.projects.map((p: any) => ({
                            title: p.title,
                            category: p.category,
                            liveUrl: p.imageUrl || p.slug,
                            link: p.imageUrl || p.slug,
                            desc: p.content || '',
                            tags: p.techStack || [],
                            device: (p.role || 'laptop') as DeviceType,
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
        <section id="work" className="relative z-10 py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-bold tracking-tight mb-8 font-sans leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
                        >
                            Digital Engines <br />
                            <span className="text-zinc-600">Built for Growth.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg font-light leading-relaxed max-w-lg"
                        >
                            We don&apos;t just write code; we architect systems that turn visitors into customers and operations into automated powerhouses.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className={project.device === 'phone' ? 'md:col-span-1' : 'md:col-span-1'}
                        >
                            <LiveDevicePreview
                                title={project.title}
                                category={project.category}
                                desc={project.desc}
                                liveUrl={project.liveUrl}
                                link={project.link}
                                tags={project.tags}
                                device={project.device}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
