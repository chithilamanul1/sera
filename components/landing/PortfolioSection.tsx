'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, X, Eye, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { portfolioData as fallbackData, projectCategories, type PortfolioItem } from '@/lib/portfolioData';

export default function PortfolioSection() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>(fallbackData);
    const [loading, setLoading] = useState(true);

    // Fetch portfolio from dashboard API
    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || '';
                if (!dashboardUrl) {
                    console.log('Dashboard URL not configured, using fallback data');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${dashboardUrl}/api/portfolio`);
                if (response.ok) {
                    const { data } = await response.json();
                    if (data && data.length > 0) {
                        // Map Supabase data to PortfolioItem format
                        const mappedData: PortfolioItem[] = data.map((item: any) => ({
                            id: item.id,
                            title: item.title,
                            category: item.category || 'Project',
                            image: item.image_url || '',
                            description: item.description || '',
                            techStack: item.technologies || [],
                            link: item.project_url,
                            github: null,
                            featured: item.featured,
                            status: 'Live' as const
                        }));
                        setPortfolioData(mappedData);
                    }
                }
            } catch (error) {
                console.log('Using fallback portfolio data');
            } finally {
                setLoading(false);
            }
        }
        fetchPortfolio();
    }, []);

    const filteredProjects = activeCategory === 'All'
        ? portfolioData
        : portfolioData.filter(p => p.category === activeCategory);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Live': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'In Development': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Internal Tool': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-silver/20 text-silver border-silver/30';
        }
    };

    // Get unique categories from data
    const categories = ['All', ...new Set(portfolioData.map(p => p.category))];

    return (
        <section id="portfolio" className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl md:text-6xl font-heading font-bold glow-text mb-4">
                        Our Work
                    </h2>
                    <p className="text-silver/80 text-lg max-w-2xl mx-auto">
                        Showcasing our latest projects and success stories
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                    ? 'bg-glow-silver text-void'
                                    : 'glass border border-silver/20 text-silver hover:border-silver/40'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-56 bg-surface" />
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-surface rounded w-1/3" />
                                    <div className="h-6 bg-surface rounded w-2/3" />
                                    <div className="h-4 bg-surface rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Portfolio Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    onHoverStart={() => setHoveredId(project.id)}
                                    onHoverEnd={() => setHoveredId(null)}
                                    className="group relative"
                                >
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass rounded-2xl overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {/* Project Image */}
                                        <div className="relative h-56 bg-surface overflow-hidden">
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-void">
                                                    <ImageIcon className="w-16 h-16 text-silver/20" />
                                                </div>
                                            )}

                                            {/* Status Badge */}
                                            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </div>

                                            {/* Featured Badge */}
                                            {project.featured && (
                                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-glow-gold/20 text-glow-gold text-xs font-semibold border border-glow-gold/30">
                                                    Featured
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                                className="absolute inset-0 bg-void/80 backdrop-blur-sm flex items-center justify-center gap-4"
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-14 h-14 rounded-full bg-glow-silver/20 border border-glow-silver/40 flex items-center justify-center"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedProject(project);
                                                    }}
                                                >
                                                    <Eye className="w-6 h-6 text-white" />
                                                </motion.button>
                                                {project.link && (
                                                    <motion.a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="w-14 h-14 rounded-full bg-glow-green/20 border border-glow-green/40 flex items-center justify-center"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink className="w-6 h-6 text-glow-green" />
                                                    </motion.a>
                                                )}
                                                {project.github && (
                                                    <motion.a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Github className="w-6 h-6 text-white" />
                                                    </motion.a>
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-6">
                                            <span className="text-xs text-glow-silver font-mono">{project.category}</span>
                                            <h3 className="text-xl font-heading font-bold text-white mt-2 mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-silver/70 text-sm mb-4 line-clamp-2">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.slice(0, 3).map((tech) => (
                                                    <span key={tech} className="px-3 py-1 rounded-full bg-surface text-silver/80 text-xs font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="px-3 py-1 rounded-full bg-surface text-silver/50 text-xs font-mono">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
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
                    <motion.a
                        href="/portfolio"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-silver/20 hover:border-silver/40 transition-all font-heading font-semibold text-silver"
                    >
                        View All Projects
                        <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-void/50 flex items-center justify-center hover:bg-void/80 transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Project Image */}
                            <div className="relative h-64 md:h-80 bg-surface">
                                {selectedProject.image ? (
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-void">
                                        <ImageIcon className="w-24 h-24 text-silver/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

                                {/* Status & Category */}
                                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedProject.status)}`}>
                                        {selectedProject.status}
                                    </span>
                                    <span className="px-4 py-1.5 rounded-full bg-surface/50 text-silver text-sm font-mono border border-silver/20">
                                        {selectedProject.category}
                                    </span>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="p-6 md:p-8">
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                                    {selectedProject.title}
                                </h2>

                                <p className="text-silver/80 text-lg leading-relaxed mb-6">
                                    {selectedProject.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="mb-8">
                                    <h4 className="text-sm font-semibold text-silver/60 uppercase tracking-wider mb-3">
                                        Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map((tech) => (
                                            <span key={tech} className="px-4 py-2 rounded-lg bg-surface text-silver text-sm font-mono border border-silver/10">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    {selectedProject.link && (
                                        <motion.a
                                            href={selectedProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-glow-silver to-white text-void font-heading font-semibold"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            Visit Live Site
                                        </motion.a>
                                    )}
                                    {selectedProject.github && (
                                        <motion.a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-2 px-6 py-3 rounded-lg glass border border-silver/20 text-silver hover:border-silver/40"
                                        >
                                            <Github className="w-5 h-5" />
                                            View Source
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
