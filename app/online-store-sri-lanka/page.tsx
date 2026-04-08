import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { ShoppingCart, Zap, Globe, Shield, Smartphone, BarChart } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.onlineStore.title,
    description: PAGE_SEO.onlineStore.description,
    keywords: PAGE_SEO.onlineStore.keywords,
};

export default function OnlineStorePage() {
    return (
        <SEOPageTemplate
            keyword="Online Store Sri Lanka"
            title="Elite Online Store Development in Sri Lanka"
            description="Transform your retail vision into a high-performance digital powerhouse. We engineer custom e-commerce platforms optimized for the Sri Lankan market and global scale."
            subtitle="Why Seranex is the Preferred Partner for Sri Lankan E-commerce"
            highlights={[
                {
                    title: "Lightning Fast Performance",
                    desc: "Sub-second load times ensuring your customers never wait. Built on Next.js for ultimate conversion rates.",
                    icon: <Zap className="w-6 h-6" />
                },
                {
                    title: "Local Gateway Integration",
                    desc: "Seamless integration with MintPay, PayHere, and direct bank transfers for local convenience.",
                    icon: <Globe className="w-6 h-6" />
                },
                {
                    title: "Mobile-First Design",
                    desc: "Since 80% of Sri Lankan shoppers are on mobile, we prioritize a flawless handheld experience.",
                    icon: <Smartphone className="w-6 h-6" />
                }
            ]}
            benefits={[
                "End-to-end e-commerce strategy and market positioning",
                "Advanced inventory management with real-time syncing",
                "SEO-optimized product architecture for Google ranking",
                "Secure multi-tenant infrastructure for global expansion",
                "Integrated analytics and conversion tracking dashboards"
            ]}
            ctaTitle="Launch Your Digital Flagship Today"
            ctaDesc="Don't just open a shop—build a brand. Join Sri Lanka's fastest-growing online stores with SeraNex engineering."
        />
    );
}
