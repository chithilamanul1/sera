import { services, iconMap } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Silk from '@/components/Silk';

interface PageProps {
    params: { slug: string };
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
        return {
            title: 'Service Not Found | Seranex',
        };
    }

    return {
        title: `${service.title} | Seranex Business Solutions`,
        description: service.description,
        openGraph: {
            title: `${service.title} | Seranex`,
            description: service.description,
            type: 'website',
        },
    };
}

// Generate Static Params for SSG (optional but good for SEO)
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export default function ServicePage({ params }: PageProps) {
    const service = services.find((s) => s.slug === params.slug);

    if (!service) {
        notFound();
    }

    const Icon = iconMap[service.iconName];

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <Silk color={service.primaryColor} speed={1} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-24">
                <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Link>

                <div className="flex items-center gap-6 mb-8">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${service.primaryColor}10`, borderColor: `${service.primaryColor}40` }}
                    >
                        <Icon className="w-8 h-8" style={{ color: service.primaryColor }} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
                </div>

                <p className="text-xl text-neutral-300 leading-relaxed mb-12">
                    {service.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-4 text-white">Feature Highlights</h3>
                        <ul className="space-y-3 text-neutral-400">
                            <li>• Premium Architecture</li>
                            <li>• Scalable Performance</li>
                            <li>• Seamless Integration</li>
                            <li>• 24/7 Support</li>
                        </ul>
                    </div>

                    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl backdrop-blur-sm flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-4 text-white">Get Started</h3>
                        <p className="text-neutral-400 mb-6">Ready to transform your business with {service.title}?</p>
                        <button
                            className="w-full py-3 font-semibold rounded-lg transition"
                            style={{ backgroundColor: service.primaryColor, color: '#000' }}
                        >
                            Request Consultation
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
