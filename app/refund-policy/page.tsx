'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export default function RefundPolicyPage() {
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
                        Refund & <span className="text-zinc-600">Cancellation.</span>
                    </motion.h1>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">1. Applicability</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                This Refund and Cancellation Policy applies to all payments made to Seranex
                                for digital services, including but not limited to discovery workshops,
                                product design, software development, AI integrations, retainers and support
                                agreements.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">2. Nature of Services</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Seranex provides bespoke, service-based and project-based digital solutions.
                                We do not sell physical goods. All work is planned, resourced and executed
                                based on your written approval (proposal, quotation or email confirmation).
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">3. Payment Channels</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Online card payments and local payment methods are processed securely through
                                our payment partner PayHere. Once a payment is authorised by your bank or
                                payment provider, we receive a confirmed transaction reference which is
                                recorded against your project.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">4. Cancellations Before Project Start</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                If you request a cancellation before we begin any project work
                                (no discovery sessions held, no deliverables produced and no environments
                                provisioned), we may process a refund of up to 100% of the amount paid,
                                less any unavoidable payment gateway or banking charges.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">5. Cancellations After Project Start</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Once work has commenced on your engagement, refunds are evaluated on a
                                case-by-case basis. In such cases, any refundable amount will be calculated
                                after deducting:
                            </p>
                            <ul className="list-disc pl-6 text-zinc-400 text-lg leading-relaxed space-y-2">
                                <li>Effort already spent by the team,</li>
                                <li>Third-party licenses, infrastructure or tooling costs provisioned for you, and</li>
                                <li>Any non-recoverable payment gateway or banking fees.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">6. Non-Refundable Payments</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                The following fees are generally non-refundable:
                            </p>
                            <ul className="list-disc pl-6 text-zinc-400 text-lg leading-relaxed space-y-2">
                                <li>Completed discovery and consulting sessions,</li>
                                <li>Design, source code or other deliverables already handed over,</li>
                                <li>Retainer fees for periods where services have been available, and</li>
                                <li>Any expressly marked non-refundable deposit in your proposal or invoice.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">7. How to Request a Refund</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                To request a refund or cancellation, please email us at{' '}
                                <span className="text-white font-semibold">info@seranex.org</span> within
                                seven (7) days of the original payment, including:
                            </p>
                            <ul className="list-disc pl-6 text-zinc-400 text-lg leading-relaxed space-y-2">
                                <li>Your full name and company name,</li>
                                <li>Invoice or transaction reference, and</li>
                                <li>A brief description of the reason for the cancellation or refund.</li>
                            </ul>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                We will acknowledge your request and respond with an outcome or a clarification
                                request within five (5) working days.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">8. Chargebacks</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                If a chargeback is initiated with your card issuer or bank without first
                                contacting Seranex to resolve the matter, we reserve the right to suspend
                                ongoing work, withhold deliverables and dispute the chargeback with
                                evidence of the services rendered.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold font-syne italic text-blue-500">9. Governing Law</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                This Refund and Cancellation Policy is governed by the laws of Sri Lanka.
                                Any disputes arising in connection with payments or refunds shall be
                                subject to the exclusive jurisdiction of the courts of Sri Lanka.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
