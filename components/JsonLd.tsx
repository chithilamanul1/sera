export function JsonLd({ data }: { data: any }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Seranex",
        "url": "https://seranex.org",
        "logo": "https://seranex.org/favicon.svg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+94-XXX-XXXXXXX",
            "contactType": "customer service",
            "areaServed": "LK",
            "availableLanguage": ["en", "si"]
        },
        "sameAs": [
            "https://www.facebook.com/seranex",
            "https://www.linkedin.com/company/seranex"
        ]
    };
}

export function getServiceSchema(service: any) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.title,
        "provider": {
            "@type": "Organization",
            "name": "Seranex Business Solutions"
        },
        "description": service.description,
        "areaServed": {
            "@type": "Country",
            "name": "Sri Lanka"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Transformation Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": service.title
                    }
                }
            ]
        }
    };
}
