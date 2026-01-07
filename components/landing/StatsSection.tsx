'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Briefcase, Users, Calendar, Award } from 'lucide-react';

const stats = [
    {
        icon: Briefcase,
        value: 50,
        suffix: '+',
        label: 'Projects Completed',
        description: 'Successful deliveries',
    },
    {
        icon: Users,
        value: 30,
        suffix: '+',
        label: 'Happy Clients',
        description: 'Across industries',
    },
    {
        icon: Calendar,
        value: 5,
        suffix: '+',
        label: 'Years Experience',
        description: 'In digital solutions',
    },
    {
        icon: Award,
        value: 100,
        suffix: '%',
        label: 'Client Satisfaction',
        description: 'Quality guaranteed',
    },
];

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(value * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, value, duration]);

    return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-void to-surface/20 -z-10" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-glow-silver/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-glow-silver/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.05 }}
                                className="glass p-6 rounded-2xl text-center relative group"
                            >
                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-glow-silver/20 to-glow-silver/5 flex items-center justify-center"
                                >
                                    <Icon className="w-7 h-7 text-glow-silver" />
                                </motion.div>

                                {/* Number */}
                                <div className="text-4xl md:text-5xl font-heading font-bold glow-text mb-2">
                                    <Counter value={stat.value} />
                                    {stat.suffix}
                                </div>

                                {/* Label */}
                                <div className="text-white font-heading font-semibold text-sm mb-1">
                                    {stat.label}
                                </div>

                                {/* Description */}
                                <div className="text-silver/60 text-xs">
                                    {stat.description}
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glow-silver/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
