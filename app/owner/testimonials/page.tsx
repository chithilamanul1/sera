'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllTestimonials, saveTestimonials } from '@/lib/firestore-content';
import toast from 'react-hot-toast';

interface Testimonial {
    id: string;
    name: string;
    title: string;
    company: string;
    rating: number;
    text: string;
    image?: string;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Testimonial | null>(null);

    useEffect(() => {
        loadTestimonials();
    }, []);

    async function loadTestimonials() {
        try {
            const data = await getAllTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error('Error loading testimonials:', error);
            toast.error('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    }

    const handleAdd = () => {
        const newTestimonial: Testimonial = {
            id: Date.now().toString(),
            name: '',
            title: '',
            company: '',
            rating: 5,
            text: '',
        };
        setEditForm(newTestimonial);
        setEditing('new');
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditForm({ ...testimonial });
        setEditing(testimonial.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const updated = testimonials.filter(t => t.id !== id);
            await saveTestimonials(updated);
            setTestimonials(updated);
            toast.success('Testimonial deleted');
        } catch (error) {
            toast.error('Failed to delete testimonial');
        }
    };

    const handleSave = async () => {
        if (!editForm) return;

        try {
            let updated;
            if (editing === 'new') {
                updated = [...testimonials, editForm];
            } else {
                updated = testimonials.map(t => t.id === editForm.id ? editForm : t);
            }

            await saveTestimonials(updated);
            setTestimonials(updated);
            setEditing(null);
            setEditForm(null);
            toast.success('Testimonial saved');
        } catch (error) {
            toast.error('Failed to save testimonial');
        }
    };

    const handleCancel = () => {
        setEditing(null);
        setEditForm(null);
    };

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['admin', 'owner']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading testimonials...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['admin', 'owner']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                Testimonials
                            </h1>
                            <p className="text-silver/70">
                                Manage client testimonials displayed on your website
                            </p>
                        </div>

                        <motion.button
                            onClick={handleAdd}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add Testimonial
                        </motion.button>
                    </div>

                    {/* Edit Form */}
                    {editing && editForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass p-8 rounded-2xl border-2 border-glow-silver/20"
                        >
                            <h3 className="text-xl font-heading font-bold text-white mb-6">
                                {editing === 'new' ? 'Add New Testimonial' : 'Edit Testimonial'}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-silver/80 text-sm mb-2">
                                        Client Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-silver/80 text-sm mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="CEO"
                                    />
                                </div>

                                <div>
                                    <label className="block text-silver/80 text-sm mb-2">
                                        Company *
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.company}
                                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="Company Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-silver/80 text-sm mb-2">
                                        Rating *
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setEditForm({ ...editForm, rating: star })}
                                                className="transition-colors"
                                            >
                                                <Star
                                                    className={`w-8 h-8 ${star <= editForm.rating
                                                            ? 'fill-yellow-500 text-yellow-500'
                                                            : 'text-silver/30'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-silver/80 text-sm mb-2">
                                        Testimonial Text *
                                    </label>
                                    <textarea
                                        value={editForm.text}
                                        onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                        placeholder="Write the testimonial here..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <motion.button
                                    onClick={handleSave}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    Save
                                </motion.button>

                                <motion.button
                                    onClick={handleCancel}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 rounded-lg bg-surface hover:bg-surface/80 text-silver/90 font-semibold flex items-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* Testimonials List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-6 rounded-2xl relative group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-heading font-bold text-white">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-silver/70 text-sm">
                                            {testimonial.title} at {testimonial.company}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(testimonial)}
                                            className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-blue-500 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(testimonial.id)}
                                            className="p-2 rounded-lg bg-surface hover:bg-surface/80 text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating
                                                    ? 'fill-yellow-500 text-yellow-500'
                                                    : 'text-silver/30'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-silver/90 text-sm leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {testimonials.length === 0 && !editing && (
                        <div className="glass p-12 rounded-2xl text-center">
                            <Star className="w-16 h-16 mx-auto mb-4 text-silver/30" />
                            <h3 className="text-xl font-heading font-bold text-white mb-2">
                                No Testimonials Yet
                            </h3>
                            <p className="text-silver/70 mb-6">
                                Add your first client testimonial to build trust
                            </p>
                            <motion.button
                                onClick={handleAdd}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold"
                            >
                                Add First Testimonial
                            </motion.button>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
