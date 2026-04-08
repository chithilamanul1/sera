import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { Code2, Award, Users, Rocket, Trophy, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.softwareCompanySL.title,
    description: PAGE_SEO.softwareCompanySL.description,
    keywords: PAGE_SEO.softwareCompanySL.keywords,
};

export default function SoftwareCompanySLPage() {
    return (
        <SEOPageTemplate
            keyword="Software Company Sri Lanka"
            title="The Elite Software Engineering Brand of Sri Lanka"
            description="Seranex stands at the summit of Sri Lankan software engineering. We don't just write code—we architect digital transformation for the nation's most ambitious enterprises."
            subtitle="Setting the Benchmark for Technical Excellence"
            highlights={[
                {
                    title: "Innovation First",
                    desc: "Pioneering AI agents and Next-Gen architectures in the local market. We bring global tech standards to Sri Lanka.",
                    icon: <Rocket className="w-6 h-6" />
                },
                {
                    title: "Proven Reliability",
                    desc: "A track record of delivering complex, mission-critical systems for retail, logistics, and fintech sectors.",
                    icon: <Award className="w-6 h-6" />
                },
                {
                    title: "Top-Tier Talent",
                    desc: "Our team consists of the brightest engineering minds in Sri Lanka, focused on performance and scale.",
                    icon: <Users className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Strategic technology consulting for business growth",
                "Scalable software architectures built for global competition",
                "Rigorous security standards and data sovereignty",
                "Agile delivery with transparent project management",
                "Long-term partnership focus beyond project completion"
            ]}
            ctaTitle="Partner With the Best in the Industry"
            ctaDesc="Elevate your business with the engineering excellence that SeraNex is known for. Let's build something extraordinary."
        />
    );
}
