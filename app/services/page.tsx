import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { services } from '@/lib/data/services';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Seranex Digital',
    description: 'Explore our comprehensive digital services including Web Design, E-commerce, SEO, and Mobile App Development tailored for Sri Lankan businesses.',
};

export default function ServicesPage() {
    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">Our Services</h1>
                        <p className="text-xl text-silver/60 max-w-2xl mx-auto">
                            Comprehensive digital solutions tailored to your business needs.
                            From concept to launch, we are your partners in growth.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <Link
                                    href={`/services/${service.id}`}
                                    key={service.id}
                                    className="group relative p-8 bg-surface border border-white/5 hover:border-accent/50 rounded-3xl transition-all duration-300 hover:bg-white/5 overflow-hidden flex flex-col"
                                >
                                    <div className="mb-8 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-accent/10 transition-colors">
                                        <Icon className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                                    </div>

                                    <h2 className="text-2xl font-heading font-bold text-white mb-4">{service.title}</h2>

                                    <p className="text-silver/60 mb-8 flex-grow leading-relaxed">
                                        {service.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                        <span className="text-accent font-bold">{service.startingPrice}</span>
                                        <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
