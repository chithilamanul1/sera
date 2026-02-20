'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useCurrency } from '@/context/CurrencyContext';
import { Currency } from '@/lib/pricing';
import { ThemeToggle } from './ThemeToggle';

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/40 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group relative z-50">
                        <Logo className="w-8 h-8 md:w-10 md:h-10 text-white" animated />
                        <span className="text-xl md:text-2xl font-bold tracking-tighter text-white font-syne italic">Seranex.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1 shadow-lg">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[10px] xl:text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/10 px-3 xl:px-4 py-2 rounded-full transition-all uppercase tracking-wider"
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
                            <button className="relative group px-5 md:px-6 py-2 overflow-hidden rounded-full bg-white text-black text-xs md:text-sm font-bold transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-blue-500/20 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                                <span className="relative z-10 transition-colors group-hover:text-white uppercase tracking-wider">Start Project</span>
                                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden relative z-50 p-2 text-white bg-white/10 rounded-full backdrop-blur-md border border-white/10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Liquid Glass Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 z-40 bg-black/40 flex flex-col items-center justify-start pt-32 pb-40 overflow-y-auto h-screen scrollbar-hide"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-black/80 to-purple-600/20 pointer-events-none fixed" />

                        <div className="relative z-10 flex flex-col items-center space-y-4 md:space-y-6 w-full max-w-sm px-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                                    className="w-full"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-center py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-xl font-bold text-white hover:bg-white/20 transition-all font-sans tracking-tight shadow-lg"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-full pt-4"
                            >
                                <CurrencySelector mobile />
                                <Link href="/quote" onClick={() => setMobileMenuOpen(false)} className="block mt-8">
                                    <button className="w-full py-5 bg-blue-600 text-white text-lg font-bold rounded-2xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                                        Get A Quote
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
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

    if (isLoading) return <div className="w-8 h-4 bg-zinc-800 animate-pulse rounded" />;

    return (
        <div className={`relative ${mobile ? 'w-full' : 'group'}`}>
            <button
                onClick={() => mobile && setIsOpen(!isOpen)}
                className={`flex items-center justify-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase border border-white/10 rounded-full px-4 py-2 bg-black/20 backdrop-blur-sm ${mobile ? 'w-full py-4 text-base bg-white/5' : ''}`}
            >
                <Globe size={14} />
                <span>{currency}</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen && mobile ? 'rotate-180' : ''}`} />
            </button>

            <div className={`
                ${mobile ? (isOpen ? 'block mt-2 relative' : 'hidden') : 'absolute top-full right-0 mt-2 w-32 hidden group-hover:block'}
                bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50
            `}>
                <div className="p-1 grid grid-cols-1 gap-0.5">
                    {currencies.map((c) => (
                        <button
                            key={c}
                            onClick={() => {
                                setCurrency(c);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-xs md:text-[10px] font-bold hover:bg-white/10 transition-colors rounded-lg flex items-center justify-between ${currency === c ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-400'}`}
                        >
                            {c}
                            {currency === c && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
