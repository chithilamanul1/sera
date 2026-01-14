'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Code, Rocket, CheckCircle } from 'lucide-react';
import { useThemeStore, glowColors } from '@/context/ThemeContext';

const steps = [
    {
        icon: MessageSquare,
        number: '01',
        title: 'Consultation',
        description: 'We discuss your vision, goals, and requirements to understand your business needs.',
    },
    {
        icon: Lightbulb,
        number: '02',
        title: 'Planning & Design',
        description: 'Our team creates detailed wireframes and designs tailored to your brand identity.',
    },
    {
        icon: Code,
        number: '03',
        title: 'Development',
        description: 'We build your solution using cutting-edge technologies and best practices.',
    },
    {
        icon: Rocket,
        number: '04',
        title: 'Testing & Launch',
        description: 'Rigorous testing ensures everything works perfectly before going live.',
    },
    {
        icon: CheckCircle,
        number: '05',
        title: 'Support & Maintenance',
        description: 'Ongoing support and updates to keep your digital presence running smoothly.',
    },
];

export default function ProcessSection() {
    const { glowTheme } = useThemeStore();
    const currentGlow = glowColors[glowTheme];

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Background */}
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
                        How We Work
                    </h2>
                    <p className="text-silver/80 text-lg max-w-2xl mx-auto">
                        Our proven process ensures successful delivery every time
                    </p>
                </motion.div>

                {/* Process Timeline */}
                <div className="relative">
                    {/* Animated Connection Line */}
                    <div className="hidden md:block absolute top-[28%] left-0 right-0 h-24 overflow-visible -z-10">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <motion.path
                                d="M0,12 L5000,12"  // Simple horizontal line that spans indefinitely
                                stroke={currentGlow}
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="10 10"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.3 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }} // Increased delay for sequential feel
                                    className="relative flex flex-col h-full"
                                >
                                    {/* Connection Dot (Desktop) */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: index * 0.2, duration: 0.4 }}
                                        className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
                                        style={{ background: currentGlow, boxShadow: `0 0 10px ${currentGlow}` }}
                                    />

                                    {/* Card */}
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="glass p-6 rounded-2xl text-center relative group hover:border-glow-silver/30 transition-all flex-1"
                                    >
                                        {/* Number Badge */}
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-glow-silver to-white flex items-center justify-center text-void font-heading font-bold text-xs shadow-lg">
                                            {step.number}
                                        </div>

                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="w-14 h-14 mx-auto mb-4 mt-2 rounded-xl bg-gradient-to-br from-glow-silver/20 to-glow-silver/5 flex items-center justify-center"
                                        >
                                            <Icon className="w-7 h-7 text-glow-silver" />
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-lg font-heading font-bold text-white mb-2">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-silver/70 text-sm leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Hover Glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glow-silver/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <p className="text-silver/70 text-sm">
                        Ready to start your project? Let's discuss your requirements
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
