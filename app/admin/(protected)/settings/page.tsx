'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Globe, Cog } from 'lucide-react';

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        siteName: 'SeraNex',
        siteDescription: 'Web Design, AI Solutions & Custom Software',
        contactEmail: 'info@seranex.org',
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
                alert('Failed to save settings.');
            }
        } catch (err) {
            console.error('Error saving settings:', err);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl relative">
            <div className="mb-10">
                <h1 className="text-3xl font-bold font-syne mb-2 tracking-tight text-white">Settings</h1>
                <p className="text-zinc-500 text-sm">Manage your site name, contact info, and service demo URLs.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Settings */}
                <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8 space-y-6">
                    <h2 className="text-lg font-bold font-syne flex items-center gap-2 text-white">
                        <Cog className="text-blue-500" size={18} />
                        General
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs text-zinc-500 mb-2">Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-zinc-500 mb-2">Contact Email</label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-zinc-500 mb-2">Site Description</label>
                        <textarea
                            value={settings.siteDescription}
                            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                            rows={2}
                            className="w-full bg-black border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500/50 transition-all resize-none text-sm h-20"
                        />
                    </div>
                </div>

                {/* Service Demo URLs */}
                <div className="bg-zinc-950 border border-white/5 rounded-2xl p-8 space-y-6">
                    <h2 className="text-lg font-bold font-syne flex items-center gap-2 text-white">
                        <Globe className="text-purple-500" size={18} />
                        Service Demo URLs
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Object.entries(settings.serviceDemoUrls).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-xs text-zinc-500 mb-2 capitalize">
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
                                    className="w-full bg-black border border-white/5 rounded-xl px-5 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-all text-xs font-mono"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={16} />
                        ) : (
                            <Save size={16} />
                        )}
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
