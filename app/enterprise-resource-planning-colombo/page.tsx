import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { LayoutDashboard, Database, Settings, BarChart3, Users, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.erpColombo.title,
    description: PAGE_SEO.erpColombo.description,
    keywords: PAGE_SEO.erpColombo.keywords,
};

export default function ERPColomboPage() {
    return (
        <SEOPageTemplate
            keyword="Enterprise Resource Planning Colombo"
            title="Strategic ERP Solutions for Colombo Enterprises"
            description="Optimize your organizational flow with elite ERP engineering. We build the digital backbone for Colombo's leading businesses, integrating logistics, finance, and operations."
            subtitle="The Standard for Industrial Digitisation in the Western Province"
            highlights={[
                {
                    title: "Operational Clarity",
                    desc: "Real-time visibility into every department. Eliminate data silos and fragmented spreadsheets.",
                    icon: <LayoutDashboard className="w-6 h-6" />
                },
                {
                    title: "Financial Intelligence",
                    desc: "Automated accounting and tax compliance tailored for Sri Lankan regulatory standards.",
                    icon: <BarChart3 className="w-6 h-6" />
                },
                {
                    title: "Supply Chain Mastery",
                    desc: "Optimized inventory and procurement for Colombo's commercial and industrial hubs.",
                    icon: <Database className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Centralized data management for multi-branch operations",
                "Automated HR and payroll systems for Sri Lankan labor laws",
                "Advanced predictive analytics for demand forecasting",
                "Secure, role-based access control for enterprise safety",
                "Custom module development for niche business requirements"
            ]}
            ctaTitle="Architect Your Enterprise Future"
            ctaDesc="Join the ranks of Colombo's most efficient companies. Schedule a comprehensive diagnostic with our engineers today."
        />
    );
}
