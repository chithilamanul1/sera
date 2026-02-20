'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
            <Navbar />

            <div className="pt-48 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold font-syne italic tracking-tighter mb-12"
                    >
                        Cookie <span className="text-zinc-600">Policy.</span>
                    </motion.h1>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">1. What are Cookies?</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Cookies are small text files stored on your device that help us optimize your browsing experience and remember your preferences.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">2. How we use them</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                We use essential cookies to maintain session states and analytical cookies to understand how users interact with our AI Playground and Build Lab components.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">3. Managing Cookies</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Most browsers allow you to control cookies through their settings. Limiting cookies may impact the interactivity of our high-end UI components.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
