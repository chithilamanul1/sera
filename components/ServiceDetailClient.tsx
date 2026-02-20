'use client';

import { motion } from 'framer-motion';
import { JsonLd } from '@/components/JsonLd';
import { iconMap } from '@/lib/data';
import { MultiDeviceHero } from '@/components/ui/LiveDevicePreview';

interface ServiceDetailClientProps {
    service: {
        title: string;
        description: string;
        primaryColor: string;
        iconName: string;
        slug?: string;
    };
    iconName: string;
    schema: Record<string, any>;
}

/* Map service slugs to demo URLs */
const serviceDemoUrls: Record<string, string> = {
    'web-development': 'https://chithilamanul.online/',
    'mobile-applications': 'https://srilankantaxi.lk/',
    'ai-solutions': 'https://chithilamanul.online/',
    'custom-software': 'https://novalink.lk/',
    'crm-systems': 'https://dash.novalink.lk/auth/login',
    'pos-systems': 'https://jayanthamotors.site/',
};

export default function ServiceDetailClient({ service, iconName, schema }: ServiceDetailClientProps) {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    const demoUrl = serviceDemoUrls[service.slug ?? ''] ?? 'https://chithilatransport-one.vercel.app/';

    return (
        <>
            <JsonLd data={schema} />

            <div className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-12 shadow-2xl"
                    >
                        <Icon className="w-12 h-12" style={{ color: service.primaryColor }} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 font-clash italic"
                    >
                        {service.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        {service.description}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm font-bold uppercase tracking-[0.3em] text-blue-500 mb-16"
                    >
                        Premium {service.title} Solutions for Sri Lankan Enterprises.
                    </motion.p>
                </div>
            </div>

            {/* ══════ Live Multi-Device Showcase ══════ */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-10">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-500 mb-3"
                    >
                        Live Preview
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold font-clash italic tracking-tight"
                    >
                        See It In Action
                    </motion.h2>
                </div>
                <MultiDeviceHero liveUrl={demoUrl} title={service.title} />
            </section>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div className="space-y-12">
                        <h2 className="text-4xl md:text-5xl font-bold font-clash italic">Solutions Overview</h2>
                        <article className="prose prose-invert lg:prose-xl">
                            <p className="text-zinc-500 text-xl leading-relaxed">
                                We deploy state-of-the-art architectures specifically engineered for {service.title} in the Sri Lankan market.
                                Our methodology ensures seamless integration for Colombo-based businesses and global throughput.
                            </p>
                        </article>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 p-12 rounded-[3.5rem] backdrop-blur-md">
                        <h3 className="text-2xl font-bold mb-8 font-clash italic">Feature Highlights</h3>
                        <ul className="space-y-6">
                            {['Premium Architecture', 'Scalable Performance', 'Local SEO Ready', '24/7 Support'].map((feature) => (
                                <li key={feature} className="flex items-center gap-4 text-zinc-400 text-lg">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
