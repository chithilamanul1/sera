'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import AdminLayout from '../../layout';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        siteName: 'Seranex',
        siteDescription: 'Enterprise AI & Agentic Software Architecture',
        contactEmail: 'contact@seranex.com',
        contactPhone: '+94 XX XXX XXXX',
        socialLinks: {
            twitter: '',
            linkedin: '',
            github: '',
        },
        serviceDemoUrls: {
            'web-development': 'https://chithilamanul.online/',
            'mobile-applications': 'https://srilankantaxi.lk/',
            'ai-solutions': 'https://chithilamanul.online/',
            'custom-software': 'https://novalink.lk/',
            'crm-systems': 'https://dash.novalink.lk/auth/login',
            'pos-systems': 'https://jayanthamotors.site/',
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                alert('Settings saved successfully!');
            } else {
                alert('Failed to save settings');
            }
        } catch (err) {
            console.error('Error saving settings:', err);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-syne italic mb-2">Site Settings</h1>
                    <p className="text-zinc-500">Configure your website settings</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Settings */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
                        <h2 className="text-xl font-bold font-syne italic mb-4">General</h2>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Site Description
                            </label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                rows={2}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    value={settings.contactPhone}
                                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service Demo URLs */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
                        <h2 className="text-xl font-bold font-syne italic mb-4">Service Demo URLs</h2>

                        {Object.entries(settings.serviceDemoUrls).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-zinc-400 mb-2 capitalize">
                                    {key.replace(/-/g, ' ')}
                                </label>
                                <input
                                    type="url"
                                    value={value}
                                    onChange={(e) =>
                                        setSettings({
                                            ...settings,
                                            serviceDemoUrls: { ...settings.serviceDemoUrls, [key]: e.target.value },
                                        })
                                    }
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Settings
                            </>
                        )}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
