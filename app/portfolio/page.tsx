import { Metadata } from 'next';
import { PortfolioClient } from './PortfolioClient';
import { PAGE_SEO } from '@/lib/seo';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
    title: PAGE_SEO.portfolio.title,
    description: PAGE_SEO.portfolio.description,
    keywords: PAGE_SEO.portfolio.keywords,
    openGraph: {
        title: PAGE_SEO.portfolio.title,
        description: PAGE_SEO.portfolio.description,
        images: [{ url: PAGE_SEO.portfolio.image, width: 1200, height: 630, alt: "Seranex Portfolio" }],
    },
    twitter: {
        title: PAGE_SEO.portfolio.title,
        description: PAGE_SEO.portfolio.description,
        images: [PAGE_SEO.portfolio.image],
    }
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" }
    });

    return <PortfolioClient initialProjects={projects} />;
}
