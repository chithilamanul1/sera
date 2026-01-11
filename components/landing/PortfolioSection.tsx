'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllPortfolioItems } from '@/lib/firestore-content';

interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: string;
}

// Fallback portfolio items when Firestore is not configured
const fallbackItems: PortfolioItem[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        image: '',
        techStack: ['Next.js', 'Firebase', 'Stripe'],
        liveUrl: '#',
        category: 'Web Development',
    },
    {
        id: '2',
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric auth',
        image: '',
        techStack: ['Flutter', 'Firebase', 'REST API'],
        liveUrl: '#',
        category: 'Mobile App',
    },
    {
        id: '3',
        title: 'Dashboard Analytics',
        description: 'Real-time analytics dashboard with data visualization',
        image: '',
        techStack: ['React', 'D3.js', 'Node.js'],
        liveUrl: '#',
        category: 'Web Development',
    },
];

export default function PortfolioSection() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(fallbackItems);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPortfolio() {
            try {
                const items = await getAllPortfolioItems();
                if (items && items.length > 0) {
                    // Map Firestore data to component format
                    const mappedItems = items.map((item: any, index: number) => ({
                        id: item.id || `item-${index}`,
                        title: item.title || 'Untitled Project',
                        description: item.description || '',
                        image: item.image || item.imageUrl || '',
                        techStack: item.techStack || item.technologies || [],
                        liveUrl: item.liveUrl || item.projectUrl || '#',
                        githubUrl: item.githubUrl || '',
                        category: item.category || 'Project',
                    }));
                    setPortfolioItems(mappedItems);
                }
            } catch (error) {
                console.log('Using fallback portfolio items');
            } finally {
                setLoading(false);
            }
        }
        loadPortfolio();
    }, []);

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
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-64 bg-surface" />
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-surface rounded w-1/3" />
                                    <div className="h-6 bg-surface rounded w-2/3" />
                                    <div className="h-4 bg-surface rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
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
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <ImageIcon className="w-16 h-16 text-silver/20" />
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                            className="absolute inset-0 bg-void/90 flex items-center justify-center gap-4"
                                        >
                                            {project.liveUrl && project.liveUrl !== '#' && (
                                                <motion.a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-12 h-12 rounded-full bg-glow-silver/20 flex items-center justify-center hover:bg-glow-silver/30 transition-colors"
                                                >
                                                    <ExternalLink className="w-5 h-5 text-white" />
                                                </motion.a>
                                            )}
                                            {project.githubUrl && project.githubUrl !== '#' && (
                                                <motion.a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-12 h-12 rounded-full bg-glow-silver/20 flex items-center justify-center hover:bg-glow-silver/30 transition-colors"
                                                >
                                                    <Github className="w-5 h-5 text-white" />
                                                </motion.a>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <span className="text-xs text-silver/60 font-mono">{project.category}</span>
                                        <h3 className="text-xl font-heading font-bold text-white mt-2 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-silver/70 text-sm mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full bg-surface text-silver/80 text-xs font-mono"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 4 && (
                                                <span className="px-3 py-1 rounded-full bg-surface text-silver/50 text-xs font-mono">
                                                    +{project.techStack.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                )}

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
