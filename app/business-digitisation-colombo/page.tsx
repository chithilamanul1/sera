import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { RefreshCcw, FileText, Share2, Binary, Cpu, Workflow } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.businessDigitisation.title,
    description: PAGE_SEO.businessDigitisation.description,
    keywords: PAGE_SEO.businessDigitisation.keywords,
};

export default function BusinessDigitisationPage() {
    return (
        <SEOPageTemplate
            keyword="Business Digitisation Colombo"
            title="Accelerate Business Digitisation in Colombo"
            description="Bridge the gap between manual chaos and digital order. We help Colombo businesses modernise their operations through strategic digitisation, automation, and AI integration."
            subtitle="The Future of Work is Digital, Automated, and Sovereign"
            highlights={[
                {
                    title: "Legacy Modernisation",
                    desc: "We transform your paper-based or manual processes into streamlined digital workflows that save time and reduce error.",
                    icon: <RefreshCcw className="w-6 h-6" />
                },
                {
                    title: "Data Centralisation",
                    desc: "Get all your business information in one secure, accessible location. No more hunting through files and folders.",
                    icon: <Share2 className="w-6 h-6" />
                },
                {
                    title: "AI-Driven Automation",
                    desc: "Implement intelligent systems that handle repetitive tasks, allowing your team to focus on high-value strategy.",
                    icon: <Cpu className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Comprehensive audit of current manual business processes",
                "Custom digital platform development tailored to your culture",
                "Secure cloud storage and document management systems",
                "Real-time operational dashboards for management visibility",
                "Sustainable digital transformation roadmapping for 2026+"
            ]}
            ctaTitle="Begin Your Digital Evolution"
            ctaDesc="Don't get left behind in the manual past. Join the leaders of Colombo's digital economy today."
        />
    );
}
