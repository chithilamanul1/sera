import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { Calculator, Package, Users2, LineChart, ShieldCheck, HeartPulse } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.smeSolutions.title,
    description: PAGE_SEO.smeSolutions.description,
    keywords: PAGE_SEO.smeSolutions.keywords,
};

export default function SMESolutionsPage() {
    return (
        <SEOPageTemplate
            keyword="SME Software Solutions Sri Lanka"
            title="Scalable Software Solutions for Sri Lankan SMEs"
            description="Enterprise-grade technology doesn't have to be expensive. We provide professional, scalable software built to help small and medium businesses in Sri Lanka thrive in a digital world."
            subtitle="The Tech Partner That Grows With Your Small Business"
            highlights={[
                {
                    title: "Inventory Mastery",
                    desc: "Take control of your stock. Our SME systems offer real-time tracking, low-stock alerts, and multi-location support.",
                    icon: <Package className="w-6 h-6" />
                },
                {
                    title: "Simplified Billing",
                    desc: "Generate professional invoices, manage credit, and stay compliant with local tax standards effortlessly.",
                    icon: <Calculator className="w-6 h-6" />
                },
                {
                    title: "Customer Insights",
                    desc: "Build better relationships with integrated CRM tools designed for the Sri Lankan retail and service landscape.",
                    icon: <Users2 className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Affordable monthly or one-time investment plans",
                "Built on modern tech for speed and reliability",
                "User-friendly interfaces with minimal training required",
                "Mobile-accessible dashboards for business owners",
                "Dedicated local support and regular system updates"
            ]}
            ctaTitle="Supercharge Your Small Business"
            ctaDesc="Get the tools you need to compete with the giants. Start your SME digital journey with SeraNex today."
        />
    );
}
