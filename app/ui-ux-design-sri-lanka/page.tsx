import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { MousePointer2, Smartphone, Monitor, Layout, Component, Eye } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.uiuxDesign.title,
    description: PAGE_SEO.uiuxDesign.description,
    keywords: PAGE_SEO.uiuxDesign.keywords,
};

export default function UIUXDesignPage() {
    return (
        <SEOPageTemplate
            keyword="UI UX Design Sri Lanka"
            title="Premium UI UX Design in Sri Lanka for World-Class Brands"
            description="Good design is good business. We create stunning, intuitive, and conversion-focused digital experiences that bridge the gap between human desire and digital functionality."
            subtitle="Interfaces That Drive Interaction and Conversion"
            highlights={[
                {
                    title: "User-Centric Research",
                    desc: "We don't just guess. Our designs are backed by deep user research and psychological principles of interaction.",
                    icon: <Eye className="w-6 h-6" />
                },
                {
                    title: "Modern Aesthetics",
                    desc: "Clean, minimalist, and premium. We bring global design trends—from bento grids to glassmorphism—to Sri Lankan brands.",
                    icon: <Monitor className="w-6 h-6" />
                },
                {
                    title: "High-Fidelity Prototyping",
                    desc: "See and feel your product before a single line of code is written. Interactive prototypes for flawless stakeholder alignment.",
                    icon: <Layout className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Comprehensive user journey mapping and persona development",
                "Mobile-first responsive design for Sri Lanka's mobile-first market",
                "Advanced micro-animations to enhance user engagement",
                "Accessibility-first design (WCAG) for inclusive experiences",
                "Direct handoff to our engineering team for pixel-perfect implementation"
            ]}
            ctaTitle="Design Your Competitive Advantage"
            ctaDesc="Don't settle for generic layouts. Give your brand the premium digital home it deserves with SeraNex design."
        />
    );
}
