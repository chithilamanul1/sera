'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, ArrowRight, CheckCircle, Send, MapPin } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { submitBooking } from '@/actions/submitBooking';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await submitBooking(formData);
        if (result.success) setIsSuccess(true);
        else alert('Error submitting form. Please try again.');
        setIsSubmitting(false);
    }

    return (
        <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-blue-500/30 relative overflow-hidden">
            <Navbar />
            <div className="bg-blue-glow" />

            {/* Page Content */}
            <div className="relative z-10">

                {/* Hero / Header */}
                <section className="pt-36 pb-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-8">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                Available for New Projects
                            </div>
                            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold font-syne tracking-[-0.04em] leading-[1.0] mb-6">
                                Let&apos;s Build<br />
                                <span className="text-cool">Something Great.</span>
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                                Tell us about your project. We&apos;ll get back to you within 24 hours.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Main Grid */}
                <section className="px-6 pb-32">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                        {/* Left — Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="lg:col-span-2 space-y-4"
                        >
                            {/* Info Cards */}
                            <a href="tel:+94728382638" className="group flex items-center gap-5 p-6 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">Phone</p>
                                    <p className="font-bold text-zinc-900 dark:text-white text-lg">+94 72 838 2638</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a href="mailto:architects@seranex.org" className="group flex items-center gap-5 p-6 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">Email</p>
                                    <p className="font-bold text-zinc-900 dark:text-white text-lg truncate">architects@seranex.org</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a href="https://wa.me/94728382638" target="_blank" rel="noreferrer" className="group flex items-center gap-5 p-6 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">WhatsApp</p>
                                    <p className="font-bold text-zinc-900 dark:text-white text-lg">+94 72 838 2638</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <div className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06]">
                                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-rose-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">Location</p>
                                    <p className="font-bold text-zinc-900 dark:text-white text-lg">Seeduwa, Sri Lanka</p>
                                </div>
                            </div>

                            {/* Response Time Promise */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Fast Response</span>
                                </div>
                                <p className="text-zinc-700 dark:text-zinc-300 font-medium text-sm leading-relaxed">
                                    We typically reply within <span className="font-bold text-zinc-900 dark:text-white">2–4 hours</span> during business hours. For urgent projects, WhatsApp is fastest.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right — Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="lg:col-span-3"
                        >
                            <div className="bg-white dark:bg-white/[0.02] backdrop-blur-xl border border-zinc-200 dark:border-white/[0.08] rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-none">

                                <AnimatePresence mode="wait">
                                    {isSuccess ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-16 flex flex-col items-center gap-5"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                <CheckCircle className="w-10 h-10 text-emerald-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold font-syne mb-2">Message Sent!</h3>
                                                <p className="text-zinc-500 dark:text-zinc-400">We&apos;ll get back to you within 2–4 business hours.</p>
                                            </div>
                                            <button
                                                onClick={() => setIsSuccess(false)}
                                                className="mt-4 px-6 py-3 rounded-full border border-zinc-200 dark:border-white/10 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                                            >
                                                Send Another Message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            action={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h2 className="text-2xl font-bold font-syne mb-1 text-zinc-900 dark:text-white">Send a Message</h2>
                                                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Fill out the form and our team will respond quickly.</p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <FormField
                                                    label="Your Name"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    focused={focused}
                                                    setFocused={setFocused}
                                                />
                                                <FormField
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    placeholder="john@company.com"
                                                    focused={focused}
                                                    setFocused={setFocused}
                                                />
                                            </div>

                                            <FormField
                                                label="Subject"
                                                name="subject"
                                                placeholder="e.g. New Website, Mobile App, AI Integration"
                                                focused={focused}
                                                setFocused={setFocused}
                                            />

                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                                                    Project Details
                                                </label>
                                                <textarea
                                                    name="message"
                                                    placeholder="Tell us about your project — what you need, timeline, budget..."
                                                    rows={5}
                                                    required
                                                    onFocus={() => setFocused('message')}
                                                    onBlur={() => setFocused(null)}
                                                    className={`w-full bg-zinc-50 dark:bg-white/[0.03] border rounded-xl p-4 focus:outline-none transition-all resize-none text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm
                                                        ${focused === 'message'
                                                            ? 'border-blue-500/50 bg-white dark:bg-white/[0.05] ring-4 ring-blue-500/10'
                                                            : 'border-zinc-200 dark:border-white/[0.08]'
                                                        }`}
                                                />
                                            </div>

                                            {/* Budget Row */}
                                            <div className="space-y-2">
                                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                                                    Estimated Budget
                                                </label>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {['Under $500', '$500–$2K', '$2K–$10K', '$10K+'].map((range) => (
                                                        <label key={range} className="cursor-pointer">
                                                            <input type="radio" name="budget" value={range} className="sr-only peer" />
                                                            <div className="text-center text-xs font-semibold py-3 rounded-xl border border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 peer-checked:border-blue-500 peer-checked:bg-blue-500/10 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 hover:border-zinc-300 dark:hover:border-white/20 transition-all">
                                                                {range}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-60 disabled:scale-100"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 dark:border-zinc-900/30 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message <Send size={16} />
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}

function FormField({
    label, name, type = 'text', placeholder, focused, setFocused
}: {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    focused: string | null;
    setFocused: (v: string | null) => void;
}) {
    return (
        <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                {label}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                required
                onFocus={() => setFocused(name)}
                onBlur={() => setFocused(null)}
                className={`w-full bg-zinc-50 dark:bg-white/[0.03] border rounded-xl p-4 focus:outline-none transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm
                    ${focused === name
                        ? 'border-blue-500/50 bg-white dark:bg-white/[0.05] ring-4 ring-blue-500/10'
                        : 'border-zinc-200 dark:border-white/[0.08]'
                    }`}
            />
        </div>
    );
}
