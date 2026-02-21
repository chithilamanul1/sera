'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useCurrency } from '@/context/CurrencyContext';
import { Currency } from '@/lib/pricing';
import { ThemeToggle } from './ThemeToggle';
import { LiquidGlassButton } from './LiquidGlassButton';

const navLinks = [
    { name: 'Solutions', href: '/#features' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/60 dark:bg-black/20 backdrop-blur-2xl border-b border-white/20 dark:border-white/5 py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group relative z-50">
                        <Logo className="w-8 h-8 md:w-10 md:h-10 text-zinc-900 dark:text-white" animated />
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-mono">Seranex</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1 bg-white/20 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full px-2 py-1 shadow-2xl relative overflow-hidden group/nav">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-1000" />
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative z-10 text-[10px] xl:text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10 px-4 xl:px-5 py-2.5 rounded-full transition-all uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <CurrencySelector />
                        <Link href="/quote">
                            <LiquidGlassButton className="px-6 py-2.5 text-xs">
                                Start Project
                            </LiquidGlassButton>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden relative z-50 p-2 text-zinc-900 dark:text-white bg-white/10 dark:bg-white/10 rounded-full backdrop-blur-md border border-zinc-200 dark:border-white/10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Clean Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-24 px-8 pb-12 flex flex-col"
                    >
                        {/* Nav Links */}
                        <div className="flex-1 flex flex-col justify-center gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-4 text-3xl font-bold text-zinc-900 dark:text-white hover:text-blue-500 transition-colors tracking-tight font-syne border-b border-zinc-100 dark:border-white/[0.06]"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom Actions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4 pt-8"
                        >
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                <CurrencySelector mobile />
                            </div>
                            <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-base font-semibold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all font-mono">
                                    Start a Project
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function CurrencySelector({ mobile }: { mobile?: boolean }) {
    const { currency, setCurrency, isLoading } = useCurrency();
    const currencies: Currency[] = ['USD', 'LKR', 'GBP', 'AUD', 'AED', 'EUR'];
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    if (isLoading) return <div className="w-8 h-4 bg-zinc-800 animate-pulse rounded" />;

    return (
        <div ref={ref} className={`relative ${mobile ? 'w-full' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors uppercase border border-zinc-200 dark:border-white/10 rounded-full px-4 py-2 bg-white dark:bg-black/20 backdrop-blur-sm shadow-sm ${mobile ? 'w-full py-4 text-base bg-white dark:bg-white/5' : ''}`}
                aria-label={`Change currency from ${currency}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <Globe size={14} />
                <span>{currency}</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className={`
                    ${mobile ? 'relative mt-2' : 'absolute top-full right-0 mt-2 w-32'}
                    bg-white dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl z-50
                `}>
                    <div className="p-1 grid grid-cols-1 gap-0.5" role="listbox">
                        {currencies.map((c) => (
                            <button
                                key={c}
                                role="option"
                                aria-selected={currency === c}
                                onClick={() => {
                                    setCurrency(c);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-xs md:text-[10px] font-bold hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors rounded-lg flex items-center justify-between ${currency === c ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10' : 'text-zinc-600 dark:text-zinc-400'}`}
                            >
                                {c}
                                {currency === c && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
