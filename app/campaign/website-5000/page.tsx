'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import {
    getCampaign,
    getOrCreateSignup,
    getSignupWithReferrals,
    type Campaign,
    type CampaignSignup
} from '@/lib/campaign';
import { Users, Check, Copy, Share2, Globe, Zap } from 'lucide-react';
import Link from 'next/link';
import CountdownTimer from '@/components/shared/CountdownTimer';

const DOMAIN_TIERS = {
    free: [
        { ext: '.online', price: 0 },
        { ext: '.site', price: 0 },
        { ext: '.tech', price: 0 },
    ],
    premium: [
        { ext: '.com', price: 2500 },
        { ext: '.lk', price: 4500 },
        { ext: '.net', price: 2000 },
    ],
};

export default function CampaignPage() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [signup, setSignup] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        loadCampaign();
    }, [user]);

    const loadCampaign = async () => {
        const data = await getCampaign('website-5000');
        setCampaign(data);

        if (user && data) {
            const signupData = await getSignupWithReferrals(user.id, data.id);
            setSignup(signupData);
        }

        setLoading(false);
    };

    const handleSignup = async () => {
        if (!user) {
            router.push('/login?redirect=/campaign/website-5000');
            return;
        }

        if (campaign) {
            const newSignup = await getOrCreateSignup(user.id, campaign.id);
            if (newSignup) {
                loadCampaign();
            }
        }
    };

    const copyReferralLink = () => {
        if (signup) {
            const link = `${window.location.origin}?ref=${signup.referral_code}`;
            navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareWhatsApp = () => {
        if (signup) {
            const link = `${window.location.origin}?ref=${signup.referral_code}`;
            const message = encodeURIComponent(`🚀 Get your website for only LKR 5,000! Join using my link: ${link}`);
            window.open(`https://wa.me/?text=${message}`, '_blank');
        }
    };

    if (loading) {
        return (
            <div className="bg-void min-h-screen flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="bg-void min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center text-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Campaign Not Found</h1>
                        <Link href="/" className="text-accent hover:underline">Go Home</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const progress = signup ? Math.min((signup.referrals_completed / campaign.referral_required) * 100, 100) : 0;
    const verifiedReferrals = signup?.referrals?.filter((r: any) => r.status === 'verified') || [];

    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-bold mb-6 uppercase tracking-wide">
                            Limited Time Offer
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                            Website for <span className="text-accent">LKR 5,000</span>
                        </h1>
                        <p className="text-xl text-silver/70 max-w-2xl mx-auto mb-8">
                            Refer 3 friends and get a professional website at an unbeatable price.
                            Includes free domain for 1 year!
                        </p>

                        {/* Countdown Timer */}
                        <div className="mb-8 flex justify-center">
                            <CountdownTimer targetDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} />
                        </div>

                        {!signup ? (
                            <button
                                onClick={handleSignup}
                                className="px-12 py-5 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-all text-lg shadow-lg shadow-accent/25 uppercase tracking-wide"
                            >
                                {user ? 'Join Campaign' : 'Sign Up to Join'}
                            </button>
                        ) : null}
                    </div>

                    {/* Campaign Details */}
                    {signup ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                            {/* Referral Progress */}
                            <div className="bg-surface p-8 rounded-3xl border border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">Your Progress</h2>
                                    <span className="text-accent font-bold text-3xl">
                                        {signup.referrals_completed}/{campaign.referral_required}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-8">
                                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-accent to-red-400 transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-silver/60 text-sm mt-2">
                                        {signup.is_qualified ? '✨ Qualified!' : `${campaign.referral_required - signup.referrals_completed} more referrals needed`}
                                    </p>
                                </div>

                                {/* Verified Referrals List */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-silver/40 uppercase tracking-wider">Verified Referrals</h3>
                                    {verifiedReferrals.length === 0 ? (
                                        <p className="text-silver/50 text-sm">No verified referrals yet. Share your link!</p>
                                    ) : (
                                        verifiedReferrals.map((ref: any) => (
                                            <div key={ref.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                                <Check className="w-5 h-5 text-green-500" />
                                                <div className="flex-grow">
                                                    <div className="text-white font-medium">{ref.profiles?.full_name || ref.profiles?.email || 'Friend'}</div>
                                                    <div className="text-silver/40 text-xs">Verified</div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Share Section */}
                            <div className="bg-surface p-8 rounded-3xl border border-white/5">
                                <h2 className="text-2xl font-bold text-white mb-6">Share Your Link</h2>

                                <div className="mb-6">
                                    <label className="block text-silver/60 text-sm mb-2">Your Referral Code</label>
                                    <div className="flex gap-2">
                                        <input
                                            readOnly
                                            value={signup.referral_code}
                                            className="flex-grow bg-void/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono"
                                        />
                                        <button
                                            onClick={copyReferralLink}
                                            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white"
                                        >
                                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={shareWhatsApp}
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#25D366]/90 transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        Share on WhatsApp
                                    </button>

                                    <button
                                        onClick={copyReferralLink}
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
                                    >
                                        <Copy className="w-5 h-5" />
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {/* What's Included */}
                    <div className="bg-surface/30 p-12 rounded-3xl border border-white/5 mb-16">
                        <h2 className="text-3xl font-bold text-white text-center mb-12">What's Included</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-8 h-8 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Professional Website</h3>
                                <p className="text-silver/60">Modern, responsive design built with latest tech</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Free Domain (1 Year)</h3>
                                <p className="text-silver/60">.online, .site, or .tech domain included</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">1 Month Support</h3>
                                <p className="text-silver/60">Technical support and minor updates</p>
                            </div>
                        </div>
                    </div>

                    {/* Domain Tiers */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Choose Your Domain</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            <div className="bg-surface p-6 rounded-2xl border border-white/5">
                                <div className="text-accent font-bold mb-3">FREE (1 Year)</div>
                                <div className="space-y-2 text-sm">
                                    {DOMAIN_TIERS.free.map(d => (
                                        <div key={d.ext} className="text-silver">{d.ext}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-surface p-6 rounded-2xl border border-accent/20">
                                <div className="text-accent font-bold mb-3">PREMIUM UPGRADE</div>
                                <div className="space-y-2 text-sm">
                                    {DOMAIN_TIERS.premium.map(d => (
                                        <div key={d.ext} className="text-silver flex justify-between">
                                            <span>{d.ext}</span>
                                            <span className="text-white">+LKR {d.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
