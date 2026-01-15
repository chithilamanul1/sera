'use client';

import { motion } from 'framer-motion';
import { Chrome, Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            await signInWithGoogle();
            // Redirect is handled by OAuth provider and callback
        } catch (error: any) {
            toast.error(error.message || 'Failed to sign in');
            setLoading(false);
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signInWithEmail(email, password);

            // Fetch user role if needed, or just redirect to dashboard/home
            // For now, redirect to dashboard as per previous logic (or home if configured)
            // Ideally Check role from session/context if available immediately

            router.push('https://dash.seranex.org'); // Redirect to dashboard app
            toast.success('Welcome back!');
        } catch (error: any) {
            toast.error(error.message || 'Failed to sign in');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-void flex items-center justify-center px-4 py-12">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-silver/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-silver/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <Link href="/">
                        <h1 className="text-4xl font-heading font-bold glow-text mb-2">
                            Seranex
                        </h1>
                    </Link>
                    <p className="text-silver/70">Sign in to your account</p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass p-8 rounded-2xl"
                >
                    {/* Google Sign In */}
                    <motion.button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 rounded-xl bg-white text-void font-heading font-semibold flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                    >
                        <Chrome className="w-5 h-5" />
                        Continue with Google
                    </motion.button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-silver/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-surface text-silver/60">Or continue with email</span>
                        </div>
                    </div>

                    {/* Email Sign In Form */}
                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-silver/80 text-sm mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/40" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-silver/80 text-sm mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver/40" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface border border-silver/10 text-white placeholder-silver/40 focus:border-glow-silver/40 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-silver/20 bg-surface text-glow-silver focus:ring-glow-silver/20"
                                />
                                <span className="text-silver/70">Remember me</span>
                            </label>
                            <Link href="/contact" className="text-glow-silver hover:underline">
                                Need help?
                            </Link>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-silver via-white to-platinum text-void font-heading font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-silver/60 text-sm mt-6">
                        Don't have an account?{' '}
                        <Link href="/contact" className="text-glow-silver hover:underline">
                            Request Access
                        </Link>
                    </p>
                </motion.div>

                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-6"
                >
                    <Link href="/" className="text-silver/60 hover:text-silver text-sm inline-flex items-center gap-2">
                        ← Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
