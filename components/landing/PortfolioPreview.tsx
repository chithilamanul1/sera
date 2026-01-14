'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

const featuredProjects = [
    {
        id: '1',
        title: 'Jayantha Motors',
        category: 'Automotive',
        image: '/portfolio/jayantha.jpg', // Add actual images to public/portfolio/
        description: 'Modern car dealership website with inventory management',
    },
    {
        id: '2',
        title: 'Road House Restro',
        category: 'Restaurant',
        image: '/portfolio/roadhouse.jpg',
        description: 'Restaurant website with online menu and reservations',
    },
    {
        id: '3',
        title: 'Mobile Hub',
        category: 'E-commerce',
        image: '/portfolio/mobilehub.jpg',
        description: 'E-commerce platform for mobile accessories',
    },
];

export default function PortfolioPreview() {
    return (
        <section className="py-20 px-4 bg-void">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                        Our Recent Work
                    </h2>
                    <p className="text-silver/70 text-lg">
                        See how we've helped businesses like yours succeed
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-surface border border-white/5">
                                {/* Placeholder - replace with actual images */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-surface flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-white/20" />
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ExternalLink className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <div className="px-2">
                                <div className="text-accent text-xs font-bold uppercase tracking-wider mb-2">
                                    {project.category}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-silver/60 text-sm line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/portfolio">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all inline-flex items-center gap-2"
                        >
                            View Full Portfolio
                            <ExternalLink className="w-4 h-4" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
