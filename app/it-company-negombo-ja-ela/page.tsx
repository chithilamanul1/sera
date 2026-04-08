import { Metadata } from 'next';
import { SEOPageTemplate } from '@/components/ui/SEOPageTemplate';
import { PAGE_SEO } from '@/lib/seo';
import { MapPin, Coffee, Car, Shield, PhoneCall, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: PAGE_SEO.itCompanyNegomboJaEla.title,
    description: PAGE_SEO.itCompanyNegomboJaEla.description,
    keywords: PAGE_SEO.itCompanyNegomboJaEla.keywords,
};

export default function ITCompanyNegomboJaElaPage() {
    return (
        <SEOPageTemplate
            keyword="IT Company Negombo Ja-Ela"
            title="Leading IT Company in Negombo & Ja-Ela"
            description="Seranex is your local technology authority. Headquartered in Seeduwa, we provide elite software engineering and IT consultations for businesses along the Negombo-Colombo commercial corridor."
            subtitle="Local Presence, Global Standards"
            highlights={[
                {
                    title: "On-Site Consultations",
                    desc: "We are just a drive away. Face-to-face meetings in Negombo or Ja-Ela to understand your business challenges.",
                    icon: <Car className="w-6 h-6" />
                },
                {
                    title: "Regional Expertise",
                    desc: "Deep understanding of the logistics, tourism, and retail sectors dominant in the Gampaha district.",
                    icon: <MapPin className="w-6 h-6" />
                },
                {
                    title: "Fast Response Hub",
                    desc: "Proximity allows us to provide rapid on-site support and quick turnaround for regional enterprises.",
                    icon: <Zap className="w-6 h-6" />
                }
            ]}
            benefits={[
                "Bespoke software solutions for Negombo's tourism industry",
                "Logistics and transit tech for Seeduwa-Katunayake businesses",
                "Modern retail and POS systems for Ja-Ela commercial hubs",
                "Localized digital transformation strategy for SMEs",
                "24/7 technical support and regional infrastructure monitoring"
            ]}
            ctaTitle="Connect With Your Local Tech Hub"
            ctaDesc="Why settle for remote vendors? Work with a team that lives and breathes the same local market you do."
        />
    );
}
