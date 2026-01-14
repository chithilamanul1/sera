'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, X, Eye, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { portfolioData as fallbackData, type PortfolioItem } from '@/lib/portfolioData';

function PortfolioPageInner() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>(fallbackData);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchProjects = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                const formattedProjects = data.map(project => ({
                    id: project.id,
                    title: project.title,
                    category: project.category || 'Project',
                    image: project.image_url || project.image || '',
                    description: project.description || '',
                    techStack: project.tech_stack || project.techStack || [],
                    link: project.link,
                    github: project.github_url || project.github,
                    featured: project.featured || false,
                    status: project.status || 'Live'
                })) as PortfolioItem[];
                setPortfolioData(formattedProjects);
            }
            setLoading(false);
        };
        fetchProjects();

        // Check for referral code and store in localStorage
        const refCode = searchParams.get('ref');
        if (refCode) {
            localStorage.setItem('referral_code', refCode);
        }
    }, [searchParams]);

    const filteredProjects = activeCategory === 'All'
        ? portfolioData
        : portfolioData.filter(p => p.category === activeCategory);

    const categories = ['All', ...new Set(portfolioData.map(p => p.category))];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Live': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'In Development': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Internal Tool': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-silver/20 text-silver border-silver/30';
        }
    };

    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Massive Header */}
                    <div className="text-center mb-20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] font-bold text-white/[0.02] pointer-events-none select-none">
                            WORK
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-6 relative z-10">
                            Our Portfolio
                        </h1>
                        <p className="text-xl text-silver/60 max-w-2xl mx-auto relative z-10">
                            A showcase of our finest work. We build digital experiences that drive results.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                    : 'bg-white/5 border border-white/10 text-silver hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="aspect-[4/3] bg-white/5 rounded-3xl animate-pulse" />
                            ))
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 bg-surface border border-white/5">
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                                    <ImageIcon className="w-12 h-12 text-white/20" />
                                                </div>
                                            )}

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                                <div className="bg-white/10 p-4 rounded-full backdrop-blur-md border border-white/20">
                                                    <Eye className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-accent text-xs font-bold uppercase tracking-wider">{project.category}</span>
                                                {project.featured && <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">Featured</span>}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                                            <p className="text-silver/60 text-sm line-clamp-2">{project.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-void/90 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <div
                            className="relative w-full max-w-5xl bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-accent transition-colors text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative h-64 lg:h-auto min-h-[400px]">
                                    {selectedProject.image ? (
                                        <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 bg-white/5" />
                                    )}
                                </div>

                                <div className="p-8 lg:p-12 flex flex-col h-full bg-surface">
                                    <div className="mb-auto">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(selectedProject.status)}`}>
                                                {selectedProject.status}
                                            </span>
                                            <span className="text-silver/60 text-sm font-mono">{selectedProject.category}</span>
                                        </div>

                                        <h2 className="text-4xl font-bold text-white mb-6">{selectedProject.title}</h2>
                                        <p className="text-silver/80 text-lg leading-relaxed mb-8">{selectedProject.description}</p>

                                        <div className="mb-8">
                                            <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map(tech => (
                                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 text-silver text-sm rounded-lg">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-8 pt-8 border-t border-white/5">
                                        {selectedProject.link && (
                                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-accent text-white rounded-xl font-bold text-center hover:bg-accent/90 transition-colors uppercase tracking-wide text-sm flex items-center justify-center gap-2">
                                                <ExternalLink className="w-4 h-4" /> Live Site
                                            </a>
                                        )}
                                        {selectedProject.github && (
                                            <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 bg-white/5 text-white rounded-xl font-bold text-center hover:bg-white/10 transition-colors uppercase tracking-wide text-sm flex items-center justify-center gap-2">
                                                <Github className="w-4 h-4" /> Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}

export default function PortfolioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-void flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <PortfolioPageInner />
        </Suspense>
    );
}
