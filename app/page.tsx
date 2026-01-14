'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { useState } from 'react';
import Preloader from '@/components/landing/Preloader';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import ProcessSection from '@/components/landing/ProcessSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import CampaignBanner from '@/components/campaign/CampaignBanner';
import TrustBadges from '@/components/landing/TrustBadges';
import PortfolioPreview from '@/components/landing/PortfolioPreview';
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp';
import StickyCTA from '@/components/shared/StickyCTA';
import ExitIntentPopup from '@/components/shared/ExitIntentPopup';
import FAQSection from '@/components/landing/FAQSection';
import LiveVisitorCounter from '@/components/shared/LiveVisitorCounter';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, ArrowRight } from 'lucide-react';

const featuredServices = [
    {
        icon: Code,
        title: 'Web Development',
        description: 'Custom websites and web applications',
        price: 'From LKR 15,000',
    },
    {
        icon: Smartphone,
        title: 'Mobile Apps',
        description: 'iOS and Android applications',
        price: 'From LKR 45,000',
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces',
        price: 'From LKR 8,000',
    },
];

function HomePageInner() {
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check for referral code and store in localStorage
        const refCode = searchParams.get('ref');
        if (refCode) {
            localStorage.setItem('referral_code', refCode);
        }
    }, [searchParams]);

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}

            {!loading && (
                <>
                    <Header />
                    <CampaignBanner />
                    <FloatingWhatsApp />
                    <main className="min-h-screen bg-void pt-20">
                        <HeroSection />

                        {/* Trust Badges */}
                        <TrustBadges />

                        {/* Featured Services */}
                        <section className="py-20 px-4">
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-heading font-bold glow-text mb-4">
                                        What We Do
                                    </h2>
                                    <p className="text-silver/80">
                                        Comprehensive digital solutions for your business
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                    {featuredServices.map((service, index) => {
                                        const Icon = service.icon;
                                        return (
                                            <motion.div
                                                key={service.title}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="glass p-6 rounded-2xl text-center"
                                            >
                                                <Icon className="w-12 h-12 mx-auto mb-4 text-glow-silver" />
                                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                                    {service.title}
                                                </h3>
                                                <p className="text-silver/70 text-sm mb-3">
                                                    {service.description}
                                                </p>
                                                <p className="text-glow-silver font-semibold">
                                                    {service.price}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="text-center">
                                    <Link href="/services">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 rounded-full glass border border-silver/20 hover:border-silver/40 font-heading font-semibold text-silver inline-flex items-center gap-2"
                                        >
                                            View All Services
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* Stats Section */}
                        <StatsSection />

                        {/* Portfolio Preview */}
                        <PortfolioPreview />

                        {/* Process Section */}
                        <ProcessSection />

                        {/* Testimonials Section */}
                        <TestimonialsSection />

                        {/* FAQ Section */}
                        <FAQSection />

                        {/* CTA Section */}
                        <section className="py-20 px-4">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-5xl font-heading font-bold glow-text mb-6">
                                    Ready to Grow Your Business?
                                </h2>
                                <p className="text-silver/80 text-lg mb-8">
                                    Get a custom quote for your project within 24 hours
                                </p>
                                <Link href="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 rounded-full bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold text-lg"
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>
                            </div>
                        </section>
                    </main>
                    <Footer />

                    {/* Conversion Boosting Components */}
                    <StickyCTA />
                    <ExitIntentPopup />
                    <LiveVisitorCounter />
                </>
            )}
        </>
    );
}

export default function HomePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-void flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            <HomePageInner />
        </Suspense>
    );
}
