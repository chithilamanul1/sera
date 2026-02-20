export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    slug: string;
    imageUrl: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 'future-of-ai-automation',
        title: 'The Future of AI Automation in 2026',
        excerpt: 'How large language models are reshaping the landscape of enterprise software and business logic.',
        content: 'AI is no longer just a buzzword. In 2026, we see a fundamental shift in how businesses handle data...',
        date: 'Oct 12, 2025',
        author: 'Seranex Core',
        category: 'AI & Machine Learning',
        slug: 'future-of-ai-automation',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'modern-web-architecture',
        title: 'Modern Web Architecture with Next.js 16',
        excerpt: 'Deep dive into server components, streaming, and high-performance design patterns.',
        content: 'Building for speed is non-negotiable. Next.js 16 introduces several primitives that allow us to...',
        date: 'Sep 28, 2025',
        author: 'Seranex Engineering',
        category: 'Web Development',
        slug: 'modern-web-architecture',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
    }
];
