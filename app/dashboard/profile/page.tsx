'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { User, Save, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        displayName: '',
        email: '',
        company: '',
        phone: '',
        location: '',
    });

    useEffect(() => {
        async function loadProfile() {
            if (!user?.uid) {
                setLoading(false);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setProfile({
                        displayName: data.displayName || user.displayName || '',
                        email: data.email || user.email || '',
                        company: data.company || '',
                        phone: data.phone || '',
                        location: data.location || '',
                    });
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user?.uid) return;

        try {
            setSaving(true);
            await updateDoc(doc(db, 'users', user.uid), {
                displayName: profile.displayName,
                company: profile.company,
                phone: profile.phone,
                location: profile.location,
            });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['client']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading profile...</p>
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
                                Profile
                            </h1>
                            <p className="text-silver/70">
                                Manage your account information
                            </p>
                        </div>

                        <motion.button
                            onClick={handleSave}
                            disabled={saving}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </motion.button>
                    </div>

                    {/* Profile Form */}
                    <div className="glass p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="w-6 h-6 text-glow-silver" />
                            <h2 className="text-2xl font-heading font-bold text-white">
                                Personal Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={profile.displayName}
                                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-silver/50 cursor-not-allowed"
                                />
                                <p className="text-silver/60 text-xs mt-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={profile.company}
                                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="+94 71 234 5678"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={profile.location}
                                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="glass p-8 rounded-2xl">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6">
                            Account Information
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-surface/50">
                                <div>
                                    <p className="text-white font-medium">Account Type</p>
                                    <p className="text-silver/70 text-sm">Client Account</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-semibold">
                                    Active
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg bg-surface/50">
                                <div>
                                    <p className="text-white font-medium">Member Since</p>
                                    <p className="text-silver/70 text-sm">
                                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
