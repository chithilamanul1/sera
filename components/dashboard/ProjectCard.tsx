'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

interface Project {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'completed' | 'on-hold';
    progress: number;
    dueDate: string;
    totalAmount: number;
    paidAmount: number;
    milestones: {
        name: string;
        status: 'pending' | 'in-progress' | 'completed';
        amount: number;
    }[];
}

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const statusColors = {
        active: '#00FF41',
        completed: '#E5E4E2',
        'on-hold': '#FFD700',
    };

    const statusIcons = {
        active: Clock,
        completed: CheckCircle,
        'on-hold': AlertCircle,
    };

    const StatusIcon = statusIcons[project.status];
    const statusColor = statusColors[project.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="glass p-6 rounded-2xl relative group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-white mb-1">
                        {project.name}
                    </h3>
                    <p className="text-silver/70 text-sm">{project.type}</p>
                </div>

                <div
                    className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    style={{
                        backgroundColor: `${statusColor}20`,
                        color: statusColor,
                        border: `1px solid ${statusColor}40`,
                    }}
                >
                    <StatusIcon className="w-3 h-3" />
                    {project.status.replace('-', ' ').toUpperCase()}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-silver/70 text-sm">Progress</span>
                    <span className="text-white font-semibold text-sm">{project.progress}%</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: statusColor }}
                    />
                </div>
            </div>

            {/* Milestones */}
            <div className="mb-4">
                <p className="text-silver/70 text-sm mb-2">Milestones</p>
                <div className="space-y-2">
                    {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {milestone.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : milestone.status === 'in-progress' ? (
                                <Clock className="w-4 h-4 text-yellow-500" />
                            ) : (
                                <Circle className="w-4 h-4 text-silver/40" />
                            )}
                            <span className={`text-sm ${milestone.status === 'completed' ? 'text-silver/50 line-through' : 'text-silver/90'
                                }`}>
                                {milestone.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Info */}
            <div className="flex items-center justify-between pt-4 border-t border-silver/10">
                <div>
                    <p className="text-silver/60 text-xs">Payment</p>
                    <p className="text-white font-semibold">
                        LKR {project.paidAmount.toLocaleString()} / {project.totalAmount.toLocaleString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-silver/60 text-xs">Due Date</p>
                    <p className="text-white font-semibold text-sm">{project.dueDate}</p>
                </div>
            </div>

            {/* View Details Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 px-4 py-2 rounded-lg bg-surface hover:bg-surface/80 text-glow-silver font-medium text-sm transition-colors"
            >
                View Details →
            </motion.button>

            {/* Hover Glow */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${statusColor}15, transparent 70%)`,
                }}
            />
        </motion.div>
    );
}
