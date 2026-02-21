// Structured Data Generators for SEO & GEO Optimization
import { SITE_METADATA } from './seo';

/**
 * Organization + ProfessionalService schema for the root layout
 */
export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "name": "Seranex",
        "legalName": "Seranex Business Solutions",
        "url": SITE_METADATA.siteUrl,
        "logo": `${SITE_METADATA.siteUrl}/favicon.svg`,
        "description": SITE_METADATA.description,
        "foundingDate": "2014",
        "areaServed": [
            { "@type": "Country", "name": "Sri Lanka" },
            { "@type": "Country", "name": "United States" },
            { "@type": "Country", "name": "United Kingdom" },
            { "@type": "Country", "name": "Australia" },
            { "@type": "Country", "name": "United Arab Emirates" },
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "url": `${SITE_METADATA.siteUrl}/contact`,
            "availableLanguage": ["English", "Sinhala"],
        },
        "sameAs": [
            "https://twitter.com/seranex_ai",
            "https://linkedin.com/company/seranex",
            "https://github.com/seranex",
        ],
        "priceRange": "$$$",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Development & Software Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Custom Web Development",
                        "description": "Full-stack custom web application development using Next.js, React, and Node.js. From landing pages to enterprise SaaS platforms.",
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Mobile App Development",
                        "description": "Cross-platform mobile app development using React Native. 60FPS performance on iOS and Android.",
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Ecommerce Web Development",
                        "description": "Custom ecommerce solutions with Shopify, Next.js Commerce, and headless CMS architectures.",
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI & Automation Solutions",
                        "description": "Custom AI agent development, business process automation, and intelligent workflow systems using Gemini and OpenAI.",
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "UI/UX Design",
                        "description": "Premium interface design that converts visitors into customers through research-driven UX and modern aesthetics.",
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "API Development",
                        "description": "RESTful and GraphQL API development with enterprise-grade security, documentation, and scalability.",
                    }
                },
            ]
        }
    };
}

/**
 * FAQ Schema for GEO optimization — AI engines heavily index FAQ structured data
 */
export function getFAQSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What web development services does Seranex offer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Seranex offers comprehensive web development services including custom web application development, responsive web design, ecommerce development (Shopify, Next.js Commerce), mobile app development (React Native), AI & automation solutions, UI/UX design, API development, and enterprise software. We use modern technologies like Next.js, React, Node.js, TypeScript, and Tailwind CSS."
                }
            },
            {
                "@type": "Question",
                "name": "How much does custom web development cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Custom web development pricing at Seranex varies based on project complexity. Simple websites start from $2,000, custom web applications from $5,000, and enterprise SaaS platforms from $15,000+. We offer transparent pricing with no hidden fees. Contact us for a free project consultation and detailed quote."
                }
            },
            {
                "@type": "Question",
                "name": "Can I hire dedicated web developers from Seranex?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Seranex offers dedicated developer hiring. You can hire full-stack web developers, frontend specialists (React, Next.js), backend developers (Node.js, Python), mobile developers (React Native), and AI engineers on a monthly or project basis. Our developers integrate seamlessly with your team."
                }
            },
            {
                "@type": "Question",
                "name": "What technologies does Seranex use for web development?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Seranex uses cutting-edge technologies including Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Prisma ORM, Supabase, React Native for mobile, and Gemini/OpenAI for AI features. We deploy on Vercel Edge, AWS, and Docker for global performance."
                }
            },
            {
                "@type": "Question",
                "name": "Does Seranex build ecommerce websites?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Seranex specializes in ecommerce web development. We build custom ecommerce solutions using Shopify, Next.js Commerce, and headless CMS architectures. Our ecommerce sites are optimized for conversion, mobile-first, and SEO-ready with features like payment gateway integration, inventory management, and analytics dashboards."
                }
            },
            {
                "@type": "Question",
                "name": "Where is Seranex located?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Seranex is headquartered in Sri Lanka and serves clients globally including the United States, United Kingdom, Australia, and the Middle East. We offer both on-site and remote development services with real-time collaboration and transparent communication."
                }
            },
        ]
    };
}

/**
 * BreadcrumbList schema generator for any page
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url,
        })),
    };
}

/**
 * WebSite schema with SearchAction for sitelinks search box
 */
export function getWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Seranex",
        "url": SITE_METADATA.siteUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_METADATA.siteUrl}/blog?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}
