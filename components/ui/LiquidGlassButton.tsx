'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidGlassButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
}

export const LiquidGlassButton = ({
    children,
    className,
    variant = 'primary',
    onClick,
}: LiquidGlassButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "relative group px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300",
                "flex items-center justify-center gap-2",
                "backdrop-blur-xl",
                variant === 'primary'
                    ? "bg-zinc-900/80 dark:bg-white/10 text-white dark:text-white border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                    : "bg-transparent border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5",
                className
            )}
        >
            {/* Liquid Wave Effect - Only for Primary or high visibility */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <motion.div
                    animate={{
                        x: ['-50%', '50%'],
                        y: ['-20%', '20%'],
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className={cn(
                        "absolute -inset-4 opacity-30 blur-2xl rounded-full bg-gradient-to-r",
                        variant === 'primary'
                            ? "from-blue-500 via-purple-500 to-cyan-500"
                            : "from-zinc-400 via-zinc-200 to-zinc-400"
                    )}
                />
            </div>

            {/* Internal Glass Highlight */}
            <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-[1] opacity-50 dark:opacity-20" />

            {/* Text/Children */}
            <span className="relative z-10 font-bold tracking-tight">
                {children}
            </span>

            {/* Edge Reflection */}
            <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-[2]" />
        </motion.button>
    );
};
