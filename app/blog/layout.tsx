import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Web Design & Tech Blog Sri Lanka | Seranex Insights',
    description: 'Expert articles on web design trends, e-commerce growth, and digital marketing strategies for Sri Lankan businesses. Stay ahead with Seranex.',
    keywords: ['web design blog sri lanka', 'tech news colombo', 'e-commerce tips sri lanka', 'digital marketing trends 2026'],
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
