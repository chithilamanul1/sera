'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-silver/10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 relative">
                        <Image
                            src="/logos/zx-white.png"
                            alt="Seranex"
                            fill
                            className="object-contain group-hover:scale-110 transition-transform"
                        />
                    </div>
                    <span className="text-xl font-heading font-bold glow-text hidden sm:block">
                        SERANEX
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'text-sm font-medium transition-colors relative',
                                    isActive ? 'text-white' : 'text-silver/70 hover:text-white'
                                )}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-glow-silver"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Login Button */}
                <Link href="/login">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold text-sm"
                    >
                        Login
                    </motion.button>
                </Link>

                {/* Mobile Menu Button - TODO */}
                <button className="md:hidden p-2 text-silver">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
