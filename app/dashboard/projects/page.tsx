'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { motion } from 'framer-motion';
import { FolderKanban, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getClientProjects } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function ProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'on-hold'>('all');

    useEffect(() => {
        async function loadProjects() {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                const data = await getClientProjects(user.uid).catch(() => []);
                setProjects(data || []);
            } catch (error) {
                console.error('Error loading projects:', error);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [user]);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.status === filter);

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['client']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading projects...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['client']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                Projects
                            </h1>
                            <p className="text-silver/70">
                                View and track all your projects
                            </p>
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-silver/70" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as any)}
                                className="px-4 py-2 rounded-lg bg-surface border border-silver/10 text-white focus:border-glow-silver/40 focus:outline-none"
                            >
                                <option value="all">All Projects</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="on-hold">On Hold</option>
                            </select>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass p-12 rounded-2xl text-center">
                            <FolderKanban className="w-16 h-16 mx-auto mb-4 text-silver/30" />
                            <h3 className="text-xl font-heading font-bold text-white mb-2">
                                {filter === 'all' ? 'No Projects Yet' : `No ${filter.replace('-', ' ')} Projects`}
                            </h3>
                            <p className="text-silver/70">
                                {filter === 'all'
                                    ? "You don't have any projects yet. Request a quote to get started!"
                                    : `You don't have any ${filter.replace('-', ' ')} projects at the moment.`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
