'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, Chrome } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

import dynamic from 'next/dynamic';
const LoginForm = dynamic(() => Promise.resolve(LoginFormContent), { ssr: false });

function LoginFormContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid credentials. Access denied.');
            } else {
                router.push(callbackUrl);
            }
        } catch (err) {
            setError('An error occurred during authentication.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
        >
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold font-syne italic tracking-tighter mb-2">Login.</h1>
                <p className="text-zinc-500">Access your Seranex projects & architecture.</p>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="w-full py-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all font-bold"
                >
                    <Chrome className="w-5 h-5 text-blue-400" />
                    Continue with Google
                </button>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-4 text-zinc-600 font-bold tracking-widest">Or Secure Login</span></div>
                </div>

                <form onSubmit={handleCredentialsLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                placeholder="you@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Dashboard'}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
            <Navbar />

            <div className="pt-48 pb-24 px-6 flex items-center justify-center">
                <Suspense fallback={<div className="text-zinc-500 font-bold animate-pulse tracking-widest text-xs uppercase">Initializing Authentication...</div>}>
                    <LoginForm />
                </Suspense>
            </div>

            <Footer />
        </main>
    );
}
