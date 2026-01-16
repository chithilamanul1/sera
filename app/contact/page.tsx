'use client';

import Header from '@/components/shared/Header';
import Footer from '@/components/landing/Footer';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as fbq from '@/lib/fbpixel';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Seranex Digital',
    description: 'Get in touch with Seranex Digital for your web design and development needs. Call us at +94 728382638 or visit us in Seeduwa, Sri Lanka.',
    openGraph: {
        title: 'Contact Seranex Digital - Web Design & Development in Sri Lanka',
        description: 'Start your project with Seranex Digital today.',
    }
};

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            // Safely read response body
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                // Treat empty text as success if ok, or generic error
                data = { error: text || (response.ok ? null : 'Server Error (No Details)') };
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Track Facebook Lead conversion
            fbq.trackLead();

            setSent(true);
            toast.success('Message sent! We\'ll get back to you soon.');
            setFormState({ name: '', email: '', message: '' });
        } catch (error: any) {
            console.error('Error sending message:', error);
            toast.error(error.message || 'Failed to send message. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="bg-void min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Info */}
                        <div>
                            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-8">
                                Let's Talk.
                            </h1>
                            <p className="text-xl text-silver/80 mb-12 leading-relaxed">
                                Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6 relative group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/50 transition-colors">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                                        <p className="text-silver/60">Info@seranex.org</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 relative group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/50 transition-colors">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                                        <p className="text-silver/60">+94 728382638</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 relative group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/50 transition-colors">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                                        <p className="text-silver/60">Seeduwa, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-surface p-8 md:p-12 rounded-3xl border border-white/5">
                            <h2 className="text-3xl font-heading font-bold text-white mb-8">Send a Message</h2>

                            {sent ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-silver/60">We'll be in touch soon.</p>
                                    <button
                                        onClick={() => setSent(false)}
                                        className="mt-8 text-accent font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-silver/60 mb-2 uppercase tracking-wide">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full bg-void/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-accent focus:outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-silver/60 mb-2 uppercase tracking-wide">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            className="w-full bg-void/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-accent focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-silver/60 mb-2 uppercase tracking-wide">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full bg-void/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-accent focus:outline-none transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full bg-accent text-white font-bold py-5 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                                    >
                                        {sending ? 'Sending...' : (
                                            <>
                                                Send Message <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
