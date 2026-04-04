'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ProjectEditor from '../../components/ProjectEditor';

export default function EditProjectPage() {
    const params = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/admin/projects/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProject(data.project);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            </div>
        );
    }

    if (!project) return <div>Asset not found.</div>;

    return (
        <div className="py-10">
            <ProjectEditor mode="edit" initialData={project} />
        </div>
    );
}
