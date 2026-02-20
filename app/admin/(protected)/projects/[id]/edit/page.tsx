'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../../../../layout';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        liveUrl: '',
        desc: '',
        tags: '',
        device: 'laptop',
    });

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/admin/projects/${params.id}`);
                if (res.ok) {
                    const { project } = await res.json();
                    setFormData({
                        title: project.title,
                        category: project.category,
                        liveUrl: project.imageUrl || '',
                        desc: project.content || '',
                        tags: (project.techStack || []).join(', '),
                        device: project.role || 'laptop',
                    });
                }
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/projects/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.category,
                    imageUrl: formData.liveUrl,
                    content: formData.desc,
                    techStack: formData.tags.split(',').map((t) => t.trim()),
                    role: formData.device,
                }),
            });

            if (res.ok) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                alert('Failed to update project');
            }
        } catch (err) {
            console.error('Error updating project:', err);
            alert('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-3xl">
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft size={16} />
                    Back to Projects
                </Link>

                <h1 className="text-3xl font-bold font-syne italic mb-2">Edit Project</h1>
                <p className="text-zinc-500 mb-8">Modify project details</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Category *
                                </label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Device Type *
                                </label>
                                <select
                                    value={formData.device}
                                    onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="laptop">Laptop</option>
                                    <option value="desktop">Desktop</option>
                                    <option value="phone">Phone</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Live URL *
                            </label>
                            <input
                                type="url"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={formData.desc}
                                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                rows={4}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Tags (comma-separated) *
                            </label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Changes
                                </>
                            )}
                        </button>
                        <Link
                            href="/admin/projects"
                            className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
