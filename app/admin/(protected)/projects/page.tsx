'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, Edit, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../../layout';

interface Project {
    id: string;
    title: string;
    category: string;
    liveUrl: string;
    tags: string[];
    createdAt: string;
}

export default function ProjectsListPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/admin/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data.projects || []);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setProjects(projects.filter((p) => p.id !== id));
            }
        } catch (err) {
            console.error('Error deleting project:', err);
        }
    };

    const filteredProjects = projects.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-syne italic mb-2">Portfolio Projects</h1>
                    <p className="text-zinc-500">Manage your showcase projects</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors"
                >
                    <Plus size={18} />
                    New Project
                </Link>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-12 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-zinc-500 mb-4">No projects found</p>
                    <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center gap-2 text-blue-500 hover:underline"
                    >
                        <Plus size={16} />
                        Create your first project
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider">{project.category}</p>
                                </div>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 hover:text-blue-500 transition-colors"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.slice(0, 3).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-1 bg-zinc-800 rounded-lg text-zinc-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
                                <Link
                                    href={`/admin/projects/${project.id}/edit`}
                                    className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                                >
                                    <Edit size={14} />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteProject(project.id)}
                                    className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
