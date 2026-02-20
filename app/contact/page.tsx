'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { submitBooking } from '@/actions/submitBooking';

export default function SimpleContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const result = await submitBooking(formData);
        if (result.success) setIsSuccess(true);
        else alert('Error submitting form.');
        setIsSubmitting(false);
    }

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
            <Navbar />

            <div className="pt-44 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-6xl md:text-8xl font-bold font-clash italic tracking-tighter">
                            Get in <span className="text-zinc-700">Touch.</span>
                        </h1>
                        <p className="text-zinc-500 text-lg">Send us a signal and our architects will reach out immediately.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <ContactCard icon={<Phone className="text-blue-500" />} label="Hotline" value="0728382638" />
                        <ContactCard icon={<Mail className="text-blue-500" />} label="Secure Email" value="architects@seranex.org" />
                        <ContactCard icon={<MessageSquare className="text-blue-500" />} label="WhatsApp" value="+94 728 382 638" link="https://wa.me/94728382638" />
                    </div>

                    <div className="bg-zinc-950 border border-white/5 rounded-[3rem] p-8 md:p-16">
                        {isSuccess ? (
                            <div className="text-center py-20 space-y-6">
                                <CheckCircle size={64} className="text-emerald-500 mx-auto" />
                                <h3 className="text-4xl font-bold font-clash">Message Sent.</h3>
                                <p className="text-zinc-500">We will respond within 2-4 business hours.</p>
                            </div>
                        ) : (
                            <form action={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <InputGroup label="Your Name" name="name" placeholder="John Doe" />
                                    <InputGroup label="Email Address" name="email" type="email" placeholder="john@company.com" />
                                </div>
                                <InputGroup label="How can we help?" name="message" textarea placeholder="Briefly describe your project..." />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

function ContactCard({ icon, label, value, link }: any) {
    const Content = () => (
        <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl text-center hover:border-blue-500/30 transition-all group">
            <div className="mb-4 flex justify-center">{icon}</div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-xl font-bold font-clash italic">{value}</p>
        </div>
    );

    return link ? <a href={link} target="_blank" rel="noreferrer"><Content /></a> : <Content />;
}

function InputGroup({ label, name, type = 'text', placeholder, textarea }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-4">{label}</label>
            {textarea ? (
                <textarea name={name} placeholder={placeholder} rows={2} required className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-blue-500 transition-all resize-none" />
            ) : (
                <input name={name} type={type} placeholder={placeholder} required className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-blue-500 transition-all" />
            )}
        </div>
    );
}
