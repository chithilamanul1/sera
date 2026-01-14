import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { services } from '@/lib/data/services';
import { Metadata } from 'next';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all services
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.id,
    }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const service = services.find((s) => s.id === resolvedParams.slug);
    if (!service) return { title: 'Service Not Found | Seranex' };

    return {
        title: `${service.title} | Seranex Services`,
        description: service.shortDescription,
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const service = services.find((s) => s.id === resolvedParams.slug);

    if (!service) {
        notFound();
    }

    const { icon: Icon } = service;

    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#2a0a0a_0%,#000000_70%)] opacity-40 pointer-events-none" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-6">
                        <Link href="/services" className="inline-flex items-center text-silver/60 hover:text-accent transition-colors gap-2 text-sm uppercase tracking-widest font-mono mb-4">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Services
                        </Link>

                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                            <Icon className="w-8 h-8 text-accent" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight">
                            {service.title}
                        </h1>

                        <p className="text-xl text-silver/80 leading-relaxed max-w-xl">
                            {service.fullDescription}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="#pricing">
                                <button className="px-8 py-4 rounded-full bg-accent text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all uppercase">
                                    View Pricing
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="px-8 py-4 rounded-full border border-white/20 text-white font-heading font-bold text-sm tracking-wide hover:bg-white/5 transition-all uppercase">
                                    Talk to an Expert
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="bg-surface border border-white/5 rounded-3xl p-8 lg:p-12">
                        <h3 className="text-2xl font-heading font-bold text-white mb-8">What's Included</h3>
                        <div className="grid gap-6">
                            {service.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-lg text-silver group-hover:text-white transition-colors">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5">
                            <h4 className="text-sm font-mono text-silver/40 uppercase tracking-widest mb-4">Technologies We Use</h4>
                            <div className="flex flex-wrap gap-2">
                                {service.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-silver text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-6 bg-surface/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-silver/60 text-lg">Choose the package that fits your needs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {service.pricingPackages.map((pkg, i) => (
                            <div key={pkg.name} className={`relative p-8 rounded-3xl border ${i === 1 ? 'bg-white/5 border-accent shadow-2xl shadow-accent/10' : 'bg-surface border-white/5'} flex flex-col`}>
                                {i === 1 && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-heading font-bold text-white mb-2">{pkg.name}</h3>
                                <div className="text-4xl font-bold text-accent mb-6">{pkg.price}</div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {pkg.features.map((feat) => (
                                        <li key={feat} className="flex items-center gap-3 text-silver/80 text-sm">
                                            <Zap className="w-4 h-4 text-accent" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="w-full">
                                    <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${i === 1 ? 'bg-accent text-white hover:bg-accent/90' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
