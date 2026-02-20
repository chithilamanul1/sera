import { services } from '@/lib/data';
import { Metadata } from 'next';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { getServiceSchema } from '@/components/JsonLd';
import ServiceDetailClient from '@/components/ServiceDetailClient';

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);
    if (!service) return { title: 'Service Not Found' };

    return {
        title: `${service.title} in Sri Lanka | Seranex Business Solutions`,
        description: `Seranex provides high-end ${service.title} in Sri Lanka (Seeduwa, Colombo). Enterprise-grade digital architecture specifically engineered for local business growth.`,
        keywords: [`${service.title} Sri Lanka`, `${service.title} Colombo`, 'Business Solutions', 'Enterprise Software', 'Seranex'],
    };
}

// Generate Static Params for SSG
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <h1 className="text-4xl font-syne">Service Not Found</h1>
            </div>
        );
    }

    const schema = getServiceSchema(service);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
            <Navbar />
            <ServiceDetailClient service={service} iconName={service.iconName} schema={schema} />
            <Footer />
        </main>
    );
}
