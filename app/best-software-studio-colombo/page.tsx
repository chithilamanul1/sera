import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { Palette, Sparkles, Gem, Terminal, Layers, Monitor } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.softwareStudioColombo.title,
    description: PAGE_SEO.softwareStudioColombo.description,
    keywords: PAGE_SEO.softwareStudioColombo.keywords,
};

export default function SoftwareStudioColomboPage() {
    return (
        <SEOPageTemplate
            keyword="Best Software Studio Colombo"
            title="The Best Software Studio in Colombo for Elite Brands"
            description="Seranex is a boutique software studio offering premium engineering services. We focus on high-performance architectures, stunning aesthetics, and AI-native applications that put Colombo businesses on the global map."
            subtitle="Architecting Digital Perfection in the Heart of Sri Lanka"
            highlights={[
                {
                    title: "Boutique Craftsmanship",
                    desc: "We don't do mass-market. Every project is a bespoke masterpiece designed for high-impact results.",
                    icon: <Gem className="w-6 h-6" />
                },
                {
                    title: "Advanced Tech Stack",
                    desc: "Experts in Next.js, Rust, and Agentic AI. We use the tools that define the next decade of software.",
                    icon: <Terminal className="w-6 h-6" />
                },
                {
                    title: "Visual Excellence",
                    desc: "Where engineering meets art. Our products aren't just powerful—they are stunning to look at.",
                    icon: <Palette className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Tailored engineering for high-end retail and luxury brands",
                "Scalable Next.js web platforms with sub-second performance",
                "Advanced UI/UX with micro-animations and motion design",
                "Secure API-first development for modern ecosystems",
                "Strategic guidance on AI integration and data strategy"
            ]}
            ctaTitle="Elevate Your Digital Presence"
            ctaDesc="Join the cohort of elite brands that trust SeraNex for their most critical digital infrastructure."
        />
    );
}
