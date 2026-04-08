import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { Code2, Cpu, LineChart, ShieldCheck, Layers, GitBranch } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.customErp.title,
    description: PAGE_SEO.customErp.description,
    keywords: PAGE_SEO.customErp.keywords,
};

export default function CustomERPDevelopmentPage() {
    return (
        <SEOPageTemplate
            keyword="Custom ERP Development Sri Lanka"
            title="Bespoke ERP Development for Sri Lankan Innovation"
            description="Tired of rigid, off-the-shelf software? We build custom ERP solutions that map perfectly to your unique business processes, giving you a competitive edge in the local market."
            subtitle="Software That Grows With Your Enterprise"
            highlights={[
                {
                    title: "Bespoke Architecture",
                    desc: "Zero compromise. We build exactly what you need, ensuring every module adds direct value to your bottom line.",
                    icon: <Layers className="w-6 h-6" />
                },
                {
                    title: "Deep Integration",
                    desc: "Connect your existing tools—from legacy accounting to modern SaaS APIs—into one unified command center.",
                    icon: <GitBranch className="w-6 h-6" />
                },
                {
                    title: "Future-Proof Tech",
                    desc: "Built on high-performance stacks like Next.js and Go, ensuring your system remains fast and secure for years.",
                    icon: <Cpu className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Exhaustive business process auditing and optimization",
                "Phased deployment strategy for zero-downtime transition",
                "Advanced data migration from legacy systems",
                "Intensive staff training and technical documentation",
                "Lifetime maintenance and scalable cloud infrastructure"
            ]}
            ctaTitle="Develop Your Proprietary Edge"
            ctaDesc="Own your software, own your future. Let's design a system that works for you, not against you."
        />
    );
}
