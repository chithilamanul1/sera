'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { CheckCircle2, XCircle, Activity, Database, Mail, Globe } from 'lucide-react';

interface HealthItem {
    loading: boolean;
    success: boolean;
    message: string;
}

interface HealthStatus {
    supabase: HealthItem;
    tables: HealthItem;
    campaign: HealthItem;
    env: HealthItem;
}

export default function HealthCheckPage() {
    const [status, setStatus] = useState<HealthStatus>({
        supabase: { loading: true, success: false, message: '' },
        tables: { loading: true, success: false, message: '' },
        campaign: { loading: true, success: false, message: '' },
        env: { loading: true, success: false, message: '' }
    });

    useEffect(() => {
        runCheck();
    }, []);

    const runCheck = async () => {
        const supabase = createClient();

        // 1. Supabase Connection
        try {
            const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
            setStatus(prev => ({
                ...prev,
                supabase: { loading: false, success: !error, message: error ? error.message : 'Connected successfully' }
            }));
        } catch (e: any) {
            setStatus(prev => ({
                ...prev,
                supabase: { loading: false, success: false, message: e.message }
            }));
        }

        // 2. Tables Check
        try {
            const tables = ['messages', 'campaigns', 'campaign_signups', 'testimonials', 'referrals'];
            const results = [];
            for (const table of tables) {
                const { error } = await supabase.from(table).select('*').limit(1);
                if (error && error.code !== 'PGRST116') { // PGRST116 is single row expected but none found, which is fine
                    results.push(table);
                }
            }
            setStatus(prev => ({
                ...prev,
                tables: {
                    loading: false,
                    success: results.length === 0,
                    message: results.length === 0 ? 'All core tables accessible' : `Issues with: ${results.join(', ')}`
                }
            }));
        } catch (e: any) {
            setStatus(prev => ({
                ...prev,
                tables: { loading: false, success: false, message: e.message }
            }));
        }

        // 3. Campaign Check
        try {
            const { data, error } = await supabase.from('campaigns').select('id').eq('slug', 'website-5000').single();
            setStatus(prev => ({
                ...prev,
                campaign: {
                    loading: false,
                    success: !!data,
                    message: data ? 'Website-5000 campaign found in DB' : 'Website-5000 campaign MISSING from DB'
                }
            }));
        } catch (e: any) {
            setStatus(prev => ({
                ...prev,
                campaign: { loading: false, success: false, message: e.message }
            }));
        }

        // 4. Env Check (Client Side)
        const envs = {
            URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        };
        setStatus(prev => ({
            ...prev,
            env: {
                loading: false,
                success: envs.URL && envs.KEY,
                message: (envs.URL && envs.KEY) ? 'Public Env Variables Set' : `Missing: ${!envs.URL ? 'URL' : ''} ${!envs.KEY ? 'KEY' : ''}`
            }
        }));
    };

    const StatusCard = ({ title, data, icon: Icon }: any) => (
        <div className="bg-surface p-6 rounded-2xl border border-white/5 flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-opacity-10 ${data.loading ? 'bg-silver text-silver' : data.success ? 'bg-green-500 text-green-500' : 'bg-red-500 text-red-500'}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <h3 className="text-white font-bold mb-1">{title}</h3>
                {data.loading ? (
                    <div className="text-silver/40 text-sm animate-pulse">Checking...</div>
                ) : (
                    <div className={`text-sm ${data.success ? 'text-green-500/80' : 'text-red-500/80'}`}>
                        {data.success ? (
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {data.message}</span>
                        ) : (
                            <span className="flex items-center gap-1"><XCircle className="w-3 h-3" /> {data.message}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <Activity className="w-10 h-10 text-accent" />
                        <div>
                            <h1 className="text-4xl font-heading font-bold text-white">System Diagnostics</h1>
                            <p className="text-silver/60">Verifying live backend connectivity and data integrity</p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <StatusCard title="Supabase Connection" data={status.supabase} icon={Globe} />
                        <StatusCard title="Database Tables" data={status.tables} icon={Database} />
                        <StatusCard title="Campaign Integrity" data={status.campaign} icon={Globe} />
                        <StatusCard title="Environment Variables" data={status.env} icon={Activity} />
                    </div>

                    {!status.campaign.success && !status.campaign.loading && (
                        <div className="mt-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-sm">
                            <strong className="block mb-2">Critical Issue Detected:</strong>
                            The campaign data is missing from your database. This happens if the SQL migration script wasn't fully executed or failed.
                            Please re-run the `fixes_2024_01_16.sql` script in your Supabase SQL Editor.
                        </div>
                    )}

                    <div className="mt-20 p-8 border border-white/5 rounded-3xl bg-surface/30">
                        <h2 className="text-2xl font-bold text-white mb-6">Troubleshooting Leads</h2>
                        <p className="text-silver/70 mb-6">
                            If the contact form fails specifically, it's likely the <strong>RESEND_API_KEY</strong> environment variable in Vercel.
                            The UI will now show a detailed toast notification with the exact error.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors font-bold"
                            >
                                Re-run All Checks
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
