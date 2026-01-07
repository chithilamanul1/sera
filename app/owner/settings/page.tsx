'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Settings, Save, Building2, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/lib/firestore-content';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        companyName: 'Seranex',
        tagline: 'Transform Your Business with Next-Gen Digital Solutions',
        email: 'info@seranex.org',
        phone: '072 838 2638',
        whatsapp: '+94728382638',
        location: 'Colombo, Sri Lanka',
        website: 'https://seranex.org',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        description: "Sri Lanka's premier web development agency specializing in bespoke websites, mobile apps, and digital experiences that drive real business results.",
    });

    useEffect(() => {
        async function loadSettings() {
            try {
                const data = await getSettings();
                if (data) {
                    setSettings(data as any);
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            } finally {
                setLoading(false);
            }
        }
        loadSettings();
    }, []);

    const handleSave = async () => {
        try {
            setSaving(true);
            await updateSettings(settings);
            toast.success('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <ProtectedRoute allowedRoles={['owner']}>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-glow-silver/20 border-t-glow-silver rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-silver/70">Loading settings...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['owner']}>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                                Settings
                            </h1>
                            <p className="text-silver/70">
                                Manage your company information and website settings
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

                    {/* Company Information */}
                    <div className="glass p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="w-6 h-6 text-glow-silver" />
                            <h2 className="text-2xl font-heading font-bold text-white">
                                Company Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.companyName}
                                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    value={settings.tagline}
                                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={settings.description}
                                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="glass p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Phone className="w-6 h-6 text-glow-silver" />
                            <h2 className="text-2xl font-heading font-bold text-white">
                                Contact Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    value={settings.whatsapp}
                                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="+94728382638"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={settings.location}
                                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-silver/80 text-sm mb-2">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={settings.website}
                                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="glass p-8 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="w-6 h-6 text-glow-silver" />
                            <h2 className="text-2xl font-heading font-bold text-white">
                                Social Media
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    value={settings.facebook}
                                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="https://facebook.com/seranex"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    value={settings.instagram}
                                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="https://instagram.com/seranex"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={settings.linkedin}
                                    onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="https://linkedin.com/company/seranex"
                                />
                            </div>

                            <div>
                                <label className="block text-silver/80 text-sm mb-2">
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    value={settings.twitter}
                                    onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="https://twitter.com/seranex"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
