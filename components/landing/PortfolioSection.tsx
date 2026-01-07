'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

// Placeholder portfolio items - will be replaced with Firebase data
const portfolioItems = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        image: '/placeholder-project.jpg',
        techStack: ['Next.js', 'Firebase', 'Stripe'],
        liveUrl: '#',
        githubUrl: '#',
        category: 'Web Development',
    },
    {
        id: 2,
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric auth',
        image: '/placeholder-project.jpg',
        techStack: ['Flutter', 'Firebase', 'REST API'],
        liveUrl: '#',
        githubUrl: '#',
        category: 'Mobile App',
    },
    {
        id: 3,
        title: 'Dashboard Analytics',
        description: 'Real-time analytics dashboard with data visualization',
        image: '/placeholder-project.jpg',
        techStack: ['React', 'D3.js', 'Node.js'],
        liveUrl: '#',
        githubUrl: '#',
        category: 'Web Development',
    },
];

export default function PortfolioSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="portfolio" className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-heading font-bold glow-text mb-4">
                        Our Work
                    </h2>
                    <p className="text-silver/80 text-lg max-w-2xl mx-auto">
                        Showcasing our latest projects and success stories
                    </p>
                </motion.div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioItems.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onHoverStart={() => setHoveredId(project.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="group relative"
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                            }}
                        >
                            <motion.div
                                whileHover={{ rotateY: 5, rotateX: 5 }}
                                transition={{ duration: 0.3 }}
                                className="glass rounded-2xl overflow-hidden"
                            >
                                {/* Project Image */}
                                <div className="relative h-64 bg-surface overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-silver/40 font-mono text-sm">Project Image</p>
                                    </div>

                                    {/* Overlay */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                        className="absolute inset-0 bg-void/90 flex items-center justify-center gap-4"
                                    >
                                        <motion.a
                                            href={project.liveUrl}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-12 h-12 rounded-full bg-glow-silver/20 flex items-center justify-center hover:bg-glow-silver/30 transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </motion.a>
                                        <motion.a
                                            href={project.githubUrl}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-12 h-12 rounded-full bg-glow-silver/20 flex items-center justify-center hover:bg-glow-silver/30 transition-colors"
                                        >
                                            <Github className="w-5 h-5 text-white" />
                                        </motion.a>
                                    </motion.div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <span className="text-xs text-silver/60 font-mono">{project.category}</span>
                                    <h3 className="text-xl font-heading font-bold text-white mt-2 mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-silver/70 text-sm mb-4">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-surface text-silver/80 text-xs font-mono"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* View More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full glass border border-silver/20 hover:border-silver/40 transition-all font-heading font-semibold text-silver"
                    >
                        View All Projects
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
