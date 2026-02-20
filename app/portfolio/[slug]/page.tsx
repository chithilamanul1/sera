import { getProjects } from '@/actions/getProjects';
import { notFound } from 'next/navigation';
import { ProjectClient } from '@/components/ui/ProjectClient';

interface Project {
    id: string;
    title: string;
    slug: string;
    role: string;
    vision?: string;
    businessImpact?: string;
    content: string;
    techStack: string[];
    features: string[];
    imageUrl: string;
    galleryImages?: string[];
    executiveSummary?: string;
    category: string;
}

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project: Project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const projects = await getProjects();
    const project = projects.find((p: Project) => p.slug === slug);

    if (!project) notFound();

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": `${project.title} | Seranex Case Study`,
                        "description": project.executiveSummary,
                        "image": project.imageUrl,
                        "author": {
                            "@type": "Organization",
                            "name": "Seranex"
                        }
                    })
                }}
            />
            <ProjectClient project={project} />
        </>
    );
}
