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
        startingPrice: 'LKR 50,000',
    },
    {
        icon: Smartphone,
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        features: ['Flutter/React Native', 'Cloud Integration', 'Push Notifications', 'Offline Support'],
        startingPrice: 'LKR 150,000',
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that users love to interact with.',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        startingPrice: 'LKR 30,000',
    },
    {
        icon: Rocket,
        title: 'Digital Strategy',
        description: 'Comprehensive digital solutions to grow your business online.',
        features: ['Market Analysis', 'Brand Strategy', 'Growth Planning', 'Analytics'],
        startingPrice: 'LKR 40,000',
    },
    {
        icon: Zap,
        title: 'Performance',
        description: 'Lightning-fast applications optimized for speed and efficiency.',
        features: ['Code Optimization', 'CDN Setup', 'Caching', 'Load Balancing'],
        startingPrice: 'LKR 25,000',
    },
    {
        icon: Shield,
        title: 'Security',
        description: 'Enterprise-grade security to protect your data and users.',
        features: ['SSL/TLS', 'Authentication', 'Data Encryption', 'Regular Audits'],
        startingPrice: 'LKR 35,000',
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
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-heading font-bold glow-text mb-4">
                        Our Services
                    </h2>
                    <p className="text-silver/80 text-lg max-w-2xl mx-auto mb-2">
                        Comprehensive digital solutions tailored to your business needs
                    </p>
                    <p className="text-silver/60 text-sm">
                        Prices shown are starting estimates. Final quote based on your requirements.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="text-center mt-16"
                >
                    <Link href="#contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full font-heading font-semibold text-void transition-all inline-flex items-center gap-2"
                            style={{
                                background: `linear-gradient(135deg, ${currentGlow}, #FFFFFF)`,
                                boxShadow: `0 0 30px ${currentGlow}40`,
                            }}
                        >
                            Get a Custom Quote
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                    <p className="text-silver/60 text-sm mt-4">
                        Tell us about your project and get a personalized quote within 24 hours
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
