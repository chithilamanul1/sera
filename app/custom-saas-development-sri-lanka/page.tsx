import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { Layers, ShieldCheck, Zap, Globe, Cpu, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.customSaas.title,
    description: PAGE_SEO.customSaas.description,
    keywords: PAGE_SEO.customSaas.keywords,
};

export default function CustomSaasPage() {
    return (
        <SEOPageTemplate
            keyword="Custom SaaS Development Company Sri Lanka"
            title="The Elite Custom SaaS Development Hub in Sri Lanka"
            description="Turn your software ideas into a scalable cloud powerhouse. We architect multi-tenant, secure, and high-performance SaaS platforms designed for global startups and enterprises."
            subtitle="Software as a Service, Engineered for Scale and Profit"
            highlights={[
                {
                    title: "Multi-Tenant Architecture",
                    desc: "Secure, isolated data environments for every customer, ensuring maximum reliability and privacy at scale.",
                    icon: <Layers className="w-6 h-6" />
                },
                {
                    title: "Global Scalability",
                    desc: "Built on serverless or containerized infrastructure that expands automatically as your user base grows.",
                    icon: <Zap className="w-6 h-6" />
                },
                {
                    title: "Advanced Security",
                    desc: "Zero-trust security models, RBAC, and data encryption to protect your intellectual property and user data.",
                    icon: <ShieldCheck className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Strategic SaaS product roadmapping and MVP development",
                "Custom subscription management and billing integration",
                "Advanced data analytics and usage monitoring dashboards",
                "Secure API design for third-party integrations",
                "Continuous deployment and maintenance with DevOps focus"
            ]}
            ctaTitle="Build Your Recurring Revenue Engine"
            ctaDesc="From initial concept to global deployment, SeraNex is your long-term engineering partner for SaaS success."
        />
    );
}
