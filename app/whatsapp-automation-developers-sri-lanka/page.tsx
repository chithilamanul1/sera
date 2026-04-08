import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { MessageSquare, Bot, Share2, Zap, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.whatsappAutomation.title,
    description: PAGE_SEO.whatsappAutomation.description,
    keywords: PAGE_SEO.whatsappAutomation.keywords,
};

export default function WhatsappAutomationPage() {
    return (
        <SEOPageTemplate
            keyword="WhatsApp Automation Software Developers Sri Lanka"
            title="Elite WhatsApp Automation Developers in Sri Lanka"
            description="Scale your customer interactions with intelligent WhatsApp automation. We build AI-powered bots and business workflows that integrate directly with your systems to automate sales, support, and notifications."
            subtitle="The Intelligent Way to Reach Your Customers on Their Favorite App"
            highlights={[
                {
                    title: "AI-Powered Chatbots",
                    desc: "Intelligent bots that understand context and resolve customer inquiries in English and Sinhala/Tamil contexts.",
                    icon: <Bot className="w-6 h-6" />
                },
                {
                    title: "Automated Workflows",
                    desc: "Send automated order updates, appointment reminders, and promotional alerts through the WhatsApp Business API.",
                    icon: <Zap className="w-6 h-6" />
                },
                {
                    title: "System Integration",
                    desc: "Connect WhatsApp directly to your ERP, CRM, or POS system for a unified, automated business ecosystem.",
                    icon: <Share2 className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Official WhatsApp Business API integration and setup",
                "Advanced NLU/NLP for human-like conversational flows",
                "Multi-agent support dashboards for hybrid AI-human service",
                "Secure data handling and compliance with privacy standards",
                "Detailed interaction analytics and conversion tracking"
            ]}
            ctaTitle="Automate Your Customer Experience"
            ctaDesc="Stop wasting time on manual messaging. Let our WhatsApp automation experts build a system that works while you sleep."
        />
    );
}
