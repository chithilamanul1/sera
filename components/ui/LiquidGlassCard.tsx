'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidGlassCardProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    variant?: 'primary' | 'secondary' | 'subtle';
}

export const LiquidGlassCard = ({
    children,
    className,
    containerClassName,
    variant = 'primary',
}: LiquidGlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={cn(
                "group relative rounded-[2.5rem] overflow-hidden transition-all duration-500",
                "backdrop-blur-2xl border",
                variant === 'primary'
                    ? "bg-zinc-50 dark:bg-white/[0.03] border-zinc-200 dark:border-white/[0.08]"
                    : variant === 'secondary'
                        ? "bg-blue-500/5 border-blue-500/10"
                        : "bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/10",
                containerClassName
            )}
        >
            {/* Liquid Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-50 transition-opacity duration-1000 overflow-hidden">
                <motion.div
                    animate={{
                        x: ['0%', '30%', '-20%', '0%'],
                        y: ['0%', '-20%', '30%', '0%'],
                        scale: [1, 1.2, 0.8, 1],
                        rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={cn(
                        "absolute -top-1/2 -left-1/2 w-full h-full blur-[100px] rounded-full",
                        variant === 'primary' ? "bg-blue-500/40" : "bg-purple-500/40"
                    )}
                />
                <motion.div
                    animate={{
                        x: ['0%', '-30%', '20%', '0%'],
                        y: ['0%', '20%', '-30%', '0%'],
                        scale: [1, 0.8, 1.2, 1],
                        rotate: [360, 270, 180, 90, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={cn(
                        "absolute -bottom-1/2 -right-1/2 w-full h-full blur-[100px] rounded-full",
                        variant === 'primary' ? "bg-cyan-500/40" : "bg-blue-500/40"
                    )}
                />
            </div>

            {/* Inner Border Glow */}
            <div className="absolute inset-px rounded-[2.5rem] border border-white/10 dark:border-white/5 pointer-events-none z-[1]" />

            {/* Content Container */}
            <div className={cn("relative z-10", className)}>
                {children}
            </div>

            {/* Subtle Reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-[2] opacity-30 dark:opacity-10" />

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
        </motion.div>
    );
};
