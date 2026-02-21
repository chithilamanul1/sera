'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Trash2, Edit, ExternalLink, Loader2, FolderKanban } from 'lucide-react';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    techStack: string[];
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

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight text-white">Projects</h1>
                    <p className="text-zinc-500 text-sm">Manage your portfolio projects here.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all text-sm"
                >
                    <Plus size={18} />
                    Add Project
                </Link>
            </div>

            {/* Search */}
            <div className="mb-8">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or category..."
                        className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-12 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                    />
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 border border-white/5 rounded-3xl">
                    <FolderKanban className="mx-auto mb-4 text-zinc-700" size={40} />
                    <p className="text-zinc-500 text-sm mb-4">No projects found.</p>
                    <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors text-sm font-medium"
                    >
                        <Plus size={16} />
                        Create your first project
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all group"
                        >
                            {/* Image Preview */}
                            {project.imageUrl && (
                                <div className="w-full h-36 bg-zinc-900 overflow-hidden">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                        <p className="text-xs text-zinc-500">{project.category}</p>
                                    </div>
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {project.techStack?.slice(0, 3).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] font-medium px-2.5 py-1 bg-zinc-900 border border-white/5 rounded-full text-zinc-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-semibold py-2.5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-xs"
                                    >
                                        <Edit size={14} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        className="p-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
