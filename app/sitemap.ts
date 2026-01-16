import { MetadataRoute } from 'next';
import { industries } from '@/lib/data/industries';

export default function sitemap(): MetadataRoute.Sitemap {
    const industryUrls = industries.map((industry) => ({
        url: `https://seranex.org/website-for-${industry.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: 'https://seranex.org',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://seranex.org/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://seranex.org/services',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://seranex.org/portfolio',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://seranex.org/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://seranex.org/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://seranex.org/careers',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://seranex.org/campaign/website-5000',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        }
    ];

    return [...staticUrls, ...industryUrls];
}
