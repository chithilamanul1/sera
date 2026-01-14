'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

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
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-8 h-full flex flex-col items-start bg-surface border border-white/5 hover:border-accent/50 transition-all duration-300 hover:bg-white/5 overflow-hidden"
        >
            {/* Hover Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            <div className="mb-6 p-4 rounded-lg bg-white/5 group-hover:bg-accent/10 transition-colors">
                <Icon className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
            </div>

            <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide">
                {title}
            </h3>

            <p className="text-silver/60 text-sm mb-8 leading-relaxed flex-grow">
                {description}
            </p>

            <div className="w-full pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-silver/40 font-mono uppercase">Starting from</span>
                <span className="font-heading font-bold text-accent">
                    {price}
                </span>
            </div>
        </motion.div>
    );
}
