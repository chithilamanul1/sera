import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { industries, IndustryData } from '@/lib/data/industries';
import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface Props {
    params: Promise<{
        industry: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { industry: industryId } = await params;
    const industry = industries.find((i) => i.id === industryId);
    if (!industry) return {};

    return {
        title: `${industry.title} | Seranex Digital`,
        description: industry.description,
        openGraph: {
            title: industry.title,
            description: industry.description,
        },
    };
}

// Generate Static Params for SSG (optional, but good for SEO)
export async function generateStaticParams() {
    return industries.map((industry) => ({
        industry: industry.id,
    }));
}

export default async function IndustryPage({ params }: Props) {
    const { industry: industryId } = await params;
    const industry = industries.find((i) => i.id === industryId);

    if (!industry) {
        notFound();
    }

    const Icon = industry.icon;

    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                {/* HERO SECTION */}
                <section className="px-6 mb-20">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-8">
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Specialized Solution</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight">
                            {industry.title}
                        </h1>
                        <p className="text-xl text-silver/80 max-w-3xl mx-auto mb-10 leading-relaxed">
                            {industry.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all flex items-center gap-2"
                            >
                                Get Started <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/portfolio"
                                className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 border border-white/10 transition-all"
                            >
                                View Portfolio
                            </Link>
                        </div>
                    </div>
                </section>

                {/* PROBLEM / SOLUTION */}
                <section className="px-6 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-surface border border-white/5 rounded-3xl p-8 md:p-12">
                            <div>
                                <h2 className="text-3xl font-heading font-bold text-white mb-6">
                                    The Problem
                                </h2>
                                <p className="text-xl text-red-400 font-medium mb-8 border-l-4 border-red-500 pl-4">
                                    "{industry.problem}"
                                </p>

                                <h2 className="text-3xl font-heading font-bold text-white mb-6">
                                    The Solution
                                </h2>
                                <p className="text-lg text-silver/80 mb-8">
                                    {industry.solution}
                                </p>

                                <div className="space-y-4">
                                    {industry.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                            <span className="text-white font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] bg-void/50 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
                                {/* Placeholder for Industry Image */}
                                <div className="text-center p-8">
                                    <Icon className="w-24 h-24 text-white/10 mx-auto mb-4" />
                                    <p className="text-silver/40">Visual representation of {industry.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING CTA */}
                <section className="px-6">
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-accent to-red-700 rounded-3xl p-12 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                                Ready to scale your business?
                            </h2>
                            <p className="text-2xl text-white/90 font-bold mb-8">
                                Packages {industry.price}
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex px-8 py-4 bg-white text-accent font-bold rounded-xl hover:bg-gray-100 transition-all items-center gap-2"
                            >
                                Get Your Free Quote Now
                            </Link>
                        </div>

                        {/* decorative circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
