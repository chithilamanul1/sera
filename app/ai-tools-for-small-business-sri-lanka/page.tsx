import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { Bot, MessageSquare, BrainCircuit, Sparkles, LineChart, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.aiToolsSmallBusiness.title,
    description: PAGE_SEO.aiToolsSmallBusiness.description,
    keywords: PAGE_SEO.aiToolsSmallBusiness.keywords,
};

export default function AIToolsSmallBusinessPage() {
    return (
        <SEOPageTemplate
            keyword="AI Tools for Small Business Sri Lanka"
            title="Empower Your Small Business with AI Tools in Sri Lanka"
            description="Level the playing field with intelligent automation. We provide Sri Lankan small businesses with accessible, powerful AI tools—from automated customer support to intelligent bookkeeping—designed to accelerate growth."
            subtitle="The Intelligent Advantage for Sri Lankan Startups and SMEs"
            highlights={[
                {
                    title: "Automated Customer Support",
                    desc: "Deploy WhatsApp and web-based AI chatbots that handle inquiries 24/7 in English and Sinhala/Tamil contexts.",
                    icon: <MessageSquare className="w-6 h-6" />
                },
                {
                    title: "Smart Bookkeeping AI",
                    desc: "Automate your expense tracking and financial reporting using intelligent scanning and categorization tools.",
                    icon: <BrainCircuit className="w-6 h-6" />
                },
                {
                    title: "AI Marketing Assistants",
                    desc: "Generate high-converting social media content and email campaigns tailored for the local Sri Lankan market.",
                    icon: <Sparkles className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Affordable AI integration plans for growing businesses",
                "Custom LLM training on your specific business data",
                "Seamless integration with popular local messaging apps",
                "Data privacy compliance and secure local hosting",
                "Strategic consulting on AI ROI and implementation roadmap"
            ]}
            ctaTitle="Lead the AI Revolution in Your Industry"
            ctaDesc="Don't let world-class technology be a barrier to your success. Partner with SeraNex to bring AI into your daily operations."
        />
    );
}
