'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function TermsPage() {
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
                        Terms & <span className="text-zinc-600">Conditions.</span>
                    </motion.h1>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">1. Acceptance of Terms</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                By accessing and using the Seranex Business Solutions website, you agree to comply with and be bound by these Terms and Conditions.
                                If you do not agree, please refrain from using our services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">2. Service Provision</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Seranex provides digital architecture, AI integration, and web development services. All quotes generated via the Sera-Quote system
                                are estimates and are subject to final contract approval.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">3. Intellectual Property</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                All content, design elements, and interactive components on this site are the intellectual property of Seranex Business Solutions unless otherwise stated.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">4. Limitation of Liability</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Seranex is not liable for any indirect or consequential loss resulting from the use of our digital solutions or AI prototypes.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
