import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://seranex.org';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/', '/login/'],
            },
            // Explicitly allow AI search engine bots for GEO
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/admin/', '/api/', '/dashboard/'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: 'Bytespider',
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
