'use client';

import { motion } from 'framer-motion';
import { Home, Briefcase, FolderOpen, Star, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Services', href: '#services' },
    { icon: FolderOpen, label: 'Portfolio', href: '#portfolio' },
    { icon: Star, label: 'Reviews', href: '#reviews' },
    { icon: Mail, label: 'Contact', href: '#contact' },
    { icon: User, label: 'Login', href: '/login' },
];

export default function FloatingDock() {
    const pathname = usePathname();

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        >
            <div className="glass px-4 py-3 rounded-full flex items-center gap-2">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ scale: 1.2, y: -8 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    'relative p-3 rounded-full transition-colors cursor-pointer',
                                    isActive ? 'bg-glow-silver/10' : 'hover:bg-surface/50'
                                )}
                            >
                                <Icon
                                    className={cn(
                                        'w-5 h-5 transition-colors',
                                        isActive ? 'text-white' : 'text-silver/60'
                                    )}
                                />

                                {/* Tooltip */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: -10 }}
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface rounded-lg text-xs text-silver whitespace-nowrap pointer-events-none"
                                >
                                    {item.label}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-surface rotate-45" />
                                </motion.div>

                                {/* Active Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-glow-silver rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </motion.div>
    );
}
