'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, Rocket, Zap, Shield, ArrowRight } from 'lucide-react';
import { useThemeStore, glowColors } from '@/context/ThemeContext';
import Link from 'next/link';
import ServiceCard from './ServiceCard';

const services = [
    {
        icon: Code,
        title: 'Web Development',
        description: 'Custom websites and web applications built with cutting-edge technologies.',
        features: ['React/Next.js', 'Responsive Design', 'SEO Optimized', 'Fast Performance'],
        startingPrice: 'LKR 15,000',
    },
    {
        icon: Smartphone,
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        features: ['Flutter/React Native', 'Cloud Integration', 'Push Notifications', 'Offline Support'],
        startingPrice: 'LKR 45,000',
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that users love to interact with.',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        startingPrice: 'LKR 8,000',
    },
    {
        icon: Rocket,
        title: 'Digital Strategy',
        description: 'Comprehensive digital solutions to grow your business online.',
        features: ['Market Analysis', 'Brand Strategy', 'Growth Planning', 'Analytics'],
        startingPrice: 'LKR 10,000',
    },
    {
        icon: Zap,
        title: 'Performance',
        description: 'Lightning-fast applications optimized for speed and efficiency.',
        features: ['Code Optimization', 'CDN Setup', 'Caching', 'Load Balancing'],
        startingPrice: 'LKR 5,000',
    },
    {
        icon: Shield,
        title: 'Security',
        description: 'Enterprise-grade security to protect your data and users.',
        features: ['SSL/TLS', 'Authentication', 'Data Encryption', 'Regular Audits'],
        startingPrice: 'LKR 10,000',
    },
];

export default function ServicesSection() {
    const { glowTheme } = useThemeStore();
    const currentGlow = glowColors[glowTheme];

    return (
        <section id="services" className="min-h-screen py-20 px-4 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-void via-surface/20 to-void -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h3 className="text-xl md:text-2xl font-body text-silver/60 mb-2 font-light">
                        What We
                    </h3>
                    <h2 className="text-6xl md:text-8xl font-heading font-bold text-white mb-4 uppercase tracking-tighter">
                        OFFER
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Grid items will be rendered here by the mapping */}
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.title}
                            index={index}
                            title={service.title}
                            description={service.description}
                            price={service.startingPrice}
                            icon={service.icon}
                        />
                    ))}
                </div>

                {/* Request Quote CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-end mt-12"
                >
                    <Link href="#contact">
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
