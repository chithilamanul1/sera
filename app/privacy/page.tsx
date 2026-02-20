'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function PrivacyPage() {
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
                        Privacy <span className="text-zinc-600">Policy.</span>
                    </motion.h1>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">1. Data Collection</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                We collect minimal personal information necessary to provide our services, specifically through our contact forms and the Sera-Quote interview system.
                                This may include your name, email, and project requirements.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">2. Data Usage</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Your data is strictly used for project estimation, service delivery, and business communication. We do not sell your data to third parties.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">3. Security</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                We implement enterprise-grade security protocols to protect your project information and personal identifiers stored in our MongoDB Atlas cluster.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">4. Your Rights</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                You have the right to request the deletion of your data from our systems at any time by contacting us at info@seranex.org.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
