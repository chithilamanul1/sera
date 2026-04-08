import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { Rocket, Zap, Globe, Shield, Terminal, AppWindow } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.nextjsAgency.title,
    description: PAGE_SEO.nextjsAgency.description,
    keywords: PAGE_SEO.nextjsAgency.keywords,
};

export default function NextjsAgencyPage() {
    return (
        <SEOPageTemplate
            keyword="Best Next.js Development Agency in Sri Lanka"
            title="The #1 Next.js Development Agency in Sri Lanka"
            description="We engineer high-performance, enterprise-grade web applications using Next.js. From App Router migrations to Turbopack optimizations, we are the technical authority on React in Sri Lanka."
            subtitle="Performance-First Web Engineering for Modern Enterprises"
            highlights={[
                {
                    title: "Next.js 15+ Expertise",
                    desc: "Mastery of Server Components, Streaming, and PPR to deliver sub-second load times and flawless SEO.",
                    icon: <Zap className="w-6 h-6" />
                },
                {
                    title: "Turbopack Optimised",
                    desc: "Lightning-fast development and build cycles ensuring your project ships faster and more reliably.",
                    icon: <Rocket className="w-6 h-6" />
                },
                {
                    title: "Technical SEO Mastery",
                    desc: "Next.js is built for SEO, and we push it to the limit with advanced metadata and structured data strategies.",
                    icon: <Globe className="w-6 h-6" />
                }
            ]}
            benefits={[
                "End-to-end Next.js application architecture and scaling",
                "Advanced performance auditing and Vercel deployment strategy",
                "Custom API route design and database integration (Prisma/Drizzle)",
                "Migration services from legacy React or WordPress sites",
                "Long-term support and maintenance for enterprise platforms"
            ]}
            ctaTitle="Build Your Future on the Best Tech"
            ctaDesc="Don't settle for slow websites. Partner with Sri Lanka's leading Next.js experts to build a high-performance digital presence."
        />
    );
}
