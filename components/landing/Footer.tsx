'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-silver/10 bg-surface/30 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 relative">
                                <Image
                                    src="/logos/zx-white.png"
                                    alt="Seranex"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-heading font-bold glow-text">SERANEX</span>
                        </div>
                        <p className="text-silver/70 text-sm max-w-sm mb-4">
                            Next-generation digital agency building exceptional web and mobile experiences.
                        </p>
                        <p className="text-silver/60 text-xs">Ready to Grow?</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-silver/70 hover:text-white transition-colors text-sm">About</Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-silver/70 hover:text-white transition-colors text-sm">Services</Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="text-silver/70 hover:text-white transition-colors text-sm">Portfolio</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-silver/70 hover:text-white transition-colors text-sm">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-white font-heading font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-3">
                            {[
                                { icon: Github, href: 'https://github.com/seranexdigital', label: 'GitHub' },
                                { icon: Twitter, href: 'https://twitter.com/seranexdigital', label: 'Twitter' },
                                { icon: Linkedin, href: 'https://linkedin.com/company/seranex', label: 'LinkedIn' },
                                { icon: Instagram, href: 'https://www.instagram.com/seranexlk/', label: 'Instagram' },
                            ].map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-full bg-surface border border-silver/10 hover:border-silver/30 flex items-center justify-center transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-4 h-4 text-silver/70" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-silver/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-silver/60 text-sm">
                        © {currentYear} Seranex. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/legal/privacy" className="text-silver/60 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/legal/terms" className="text-silver/60 hover:text-white transition-colors text-sm">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
