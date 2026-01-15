'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

{
    id: '1',
        title: 'Roadhouse',
            category: 'Restaurant & Catering',
                image: '/projects/roadhouse.png',
                    description: 'Fine dining restaurant website with online reservations and menu showcase',
                        url: '#'
},
{
    id: '2',
        title: 'Mobile Hub',
            category: 'E-commerce',
                image: '/projects/mobile-hub.png',
                    description: 'Online mobile phone store with shopping cart and payment integration',
                        url: '#'
},
{
    id: '3',
        title: 'Jayantha Motors',
            category: 'Automotive',
                image: '/projects/jayantha-motors.png',
                    description: 'Automotive service center website with service booking system',
                        url: '#'
},

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
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <div className="bg-white/10 p-4 rounded-full backdrop-blur-md border border-white/20">
                                        <ExternalLink className="w-6 h-6 text-white" />
                                    </div>
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
