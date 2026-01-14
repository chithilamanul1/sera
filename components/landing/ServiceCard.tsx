'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Tilt } from 'react-tilt';
import { useThemeStore, glowColors } from '@/context/ThemeContext';

interface ServiceCardProps {
    title: string;
    description: string;
    price: string;
    icon: LucideIcon;
    index: number;
}

const defaultTiltOptions = {
    reverse: false,  // reverse the tilt direction
    max: 25,     // max tilt rotation (degrees)
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.05,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
};

export default function ServiceCard({ title, description, price, icon: Icon, index }: ServiceCardProps) {
    const { glowTheme } = useThemeStore();
    const currentGlow = glowColors[glowTheme];

    return (
        <Tilt options={defaultTiltOptions} className="h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl text-center h-full flex flex-col items-center justify-between border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Glow BG */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${currentGlow}, transparent 70%)` }}
                />

                <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white group-hover:text-glow-silver transition-colors" />
                    </div>

                    <h3 className="text-xl font-heading font-bold text-white mb-3" style={{ transform: 'translateZ(20px)' }}>
                        {title}
                    </h3>

                    <p className="text-silver/70 text-sm mb-6 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
                        {description}
                    </p>
                </div>

                <div className="relative z-10 w-full pt-4 border-t border-white/5">
                    <p className="font-mono font-semibold text-glow-silver" style={{ transform: 'translateZ(30px)' }}>
                        {price}
                    </p>
                </div>
            </motion.div>
        </Tilt>
    );
}
