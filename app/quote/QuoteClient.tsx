'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Download,
    Cpu,
    Globe,
    Smartphone,
    MessageSquare,
    Calculator,
    Bot
} from 'lucide-react';

import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { AIChatAssistant } from '@/components/quote/AIChatAssistant';
import { useCurrency } from '@/context/CurrencyContext';
import { calculateQuote, formatPrice, PRICING_RULES, type Currency } from '@/lib/pricing-engine';

export function QuoteClient() {
    const { currency } = useCurrency();
    const [step, setStep] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [formData, setFormData] = useState({
        clientName: '',
        company: '',
        email: '',
        phone: '',
        projectTypes: [] as string[],
        features: [] as string[],
        multiplier: 'scale_startup' as string | null
    });

    const [quoteTotal, setQuoteTotal] = useState(0);
    const [quoteBreakdown, setQuoteBreakdown] = useState<{ name: string, price: string }[]>([]);

    const [isGenerating, setIsGenerating] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    useEffect(() => {
        const selectedIds = [...formData.projectTypes, ...formData.features];
        const result = calculateQuote(selectedIds, currency as Currency, formData.multiplier);
        setQuoteTotal(result.total);
        setQuoteBreakdown(result.breakdown);
    }, [formData, currency]);

    const handleUpdateFromAI = (updates: any) => {
        setFormData(prev => {
            const newFeatures = new Set(prev.features);
            if (updates.suggested_features) {
                updates.suggested_features.forEach((f: string) => {
                    if (PRICING_RULES.find(r => r.id === f)) {
                        newFeatures.add(f);
                    }
                });
            }
            if (updates.removed_features) {
                updates.removed_features.forEach((f: string) => newFeatures.delete(f));
            }

            let newProjectTypes = [...prev.projectTypes];
            if (updates.project_type) {
                const typeId = updates.project_type;
                if (PRICING_RULES.find(r => r.id === typeId && r.type === 'base')) {
                    newProjectTypes = [typeId];
                }
            }

            return {
                ...prev,
                features: Array.from(newFeatures),
                projectTypes: newProjectTypes
            };
        });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const black = "#050505";
        const blue = "#2563eb";
        const gray = "#71717a";

        doc.setFillColor(5, 5, 5);
        doc.rect(0, 0, 210, 60, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.text("SERANEX.", 20, 35);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Digital Architecture & AI Lead Systems", 20, 45);
        doc.setFontSize(7);
        doc.text("0728382638 | www.seranex.org", 130, 20);
        doc.text("customer@airporttaxis.lk | support@airporttaxis.lk", 130, 26);
        doc.text("support@srilankantaxi.lk | support@touris.lk", 130, 32);
        doc.text("support@tourtaxi.lk | support@airporttaxicab.lk", 130, 38);
        doc.setDrawColor(37, 99, 235);
        doc.setLineWidth(1);
        doc.line(20, 52, 190, 52);

        doc.setTextColor(20, 20, 20);
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("DISCOVERY REPORT", 20, 85);
        doc.setFillColor(248, 248, 250);
        doc.roundedRect(20, 95, 170, 50, 3, 3, 'F');
        doc.setFontSize(10);
        doc.setTextColor(gray);
        doc.text("CLIENT SUMMARY", 30, 110);
        doc.setTextColor(black);
        doc.setFontSize(12);
        doc.text(formData.clientName.toUpperCase(), 30, 120);
        doc.setFont("helvetica", "normal");
        doc.text(formData.company || "Private Entity", 30, 126);
        doc.text(`${formData.email} | ${formData.phone}`, 30, 132);
        doc.setFontSize(9);
        doc.setTextColor(gray);
        doc.text(`REF: SRX-AI-${Math.floor(Math.random() * 10000)}`, 140, 110);
        doc.text(`DATE: ${new Date().toLocaleDateString()}`, 140, 116);

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(black);
        doc.text("ARCHITECTURAL PROPOSAL", 20, 170);
        doc.setDrawColor(230, 230, 230);
        doc.line(20, 175, 190, 175);

        let yPos = 190;
        quoteBreakdown.forEach(item => {
            doc.setFont("helvetica", "bold");
            doc.text(item.name, 20, yPos);
            doc.setFont("helvetica", "normal");
            doc.text(item.price, 160, yPos);
            yPos += 10;
        });

        doc.setDrawColor(black);
        doc.setLineWidth(0.5);
        doc.line(140, yPos + 10, 190, yPos + 10);
        doc.setFontSize(14);
        doc.setTextColor(blue);
        doc.setFont("helvetica", "bold");
        doc.text(formatPrice(quoteTotal, currency as Currency), 160, yPos + 20);
        doc.setFontSize(10);
        doc.setTextColor(black);
        doc.text("ESTIMATED INVESTMENT", 100, yPos + 20);
        doc.save(`Seranex_Discovery_${formData.clientName.replace(/\s+/g, '_')}.pdf`);
    };

    const handleFeatureToggle = (featureId: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter(f => f !== featureId)
                : [...prev.features, featureId]
        }));
    };

    const handleProjectTypeToggle = (typeId: string) => {
        setFormData(prev => ({
            ...prev,
            projectTypes: prev.projectTypes.includes(typeId)
                ? prev.projectTypes.filter(t => t !== typeId)
                : [...prev.projectTypes, typeId]
        }));
    };

    const nextStep = () => {
        if (step === 2) handleComplete();
        else setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => Math.max(0, prev - 1));

    const handleComplete = async () => {
        setIsGenerating(true);
        setStep(3);

        setTimeout(async () => {
            setIsGenerating(false);
            setAnalysisResult({
                technicalAnalysis: "Based on your selections, we recommend a microservices architecture using Next.js for the frontend and Python (FastAPI) for AI services. This ensures scalability.",
                suggestions: ["AWS Lambda", "Vercel Edge", "Pinecone Vector DB"],
                strategicInsight: "Investing in AI early gives you a significant competitive advantage in automation and customer data analysis."
            });

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#ffffff', '#2563eb']
            });

            fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceType: "Discovery Quote",
                    price: quoteTotal,
                    currency: currency,
                    quoteData: { ...formData, total: quoteTotal, date: new Date().toLocaleDateString() }
                })
            }).catch(console.error);

        }, 2500);
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 font-sans relative">
            <Navbar />
            <AIChatAssistant
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                onUpdateQuote={handleUpdateFromAI}
                currentContext={formData}
            />

            {!isChatOpen && step < 3 && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-6 right-6 z-40 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:bg-blue-500 transition-colors"
                >
                    <MessageSquare size={24} className="text-white" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                </motion.button>
            )}

            <div className="pt-44 pb-32 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-6xl font-bold font-syne tracking-tight mb-4 text-zinc-900 dark:text-white">
                                Get a <span className="text-blue-500">Quote</span>
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg">
                                Tell us what you need and we&apos;ll give you a clear price. You can also chat with our AI assistant for help.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden min-h-[500px] shadow-sm dark:shadow-none">
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div
                                        key="step0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Your Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Full Name" value={formData.clientName} onChange={v => setFormData({ ...formData, clientName: v })} placeholder="John Doe" />
                                            <Input label="Company" value={formData.company} onChange={v => setFormData({ ...formData, company: v })} placeholder="Acme Corp" />
                                            <Input label="Email" value={formData.email} onChange={v => setFormData({ ...formData, email: v })} placeholder="john@acme.com" />
                                            <Input label="Phone" value={formData.phone} onChange={v => setFormData({ ...formData, phone: v })} placeholder="+94 77 ..." />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">What Do You Need?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {PRICING_RULES.filter(r => r.type === 'base').map(rule => (
                                                <SelectCard
                                                    key={rule.id}
                                                    title={rule.name}
                                                    price={`Start from $${rule.basePriceUSD}`}
                                                    selected={formData.projectTypes.includes(rule.id)}
                                                    onClick={() => handleProjectTypeToggle(rule.id)}
                                                    icon={rule.category === 'ai' ? <BotIcon /> : rule.category === 'mobile' ? <PhoneIcon /> : <WebIcon />}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Extra Features</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                            {PRICING_RULES.filter(r => r.type === 'additive').map(rule => (
                                                <FeatureCard
                                                    key={rule.id}
                                                    title={rule.name}
                                                    selected={formData.features.includes(rule.id)}
                                                    onClick={() => handleFeatureToggle(rule.id)}
                                                />
                                            ))}
                                        </div>

                                        <div className="pt-8 border-t border-zinc-200 dark:border-white/10">
                                            <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-4">Project Size</h4>
                                            <div className="flex gap-4">
                                                {PRICING_RULES.filter(r => r.type === 'multiplier').map(rule => (
                                                    <button
                                                        key={rule.id}
                                                        onClick={() => setFormData({ ...formData, multiplier: rule.id })}
                                                        className={`px-6 py-3 rounded-full text-sm font-semibold border transition-all ${formData.multiplier === rule.id ? 'bg-blue-600 border-blue-600 text-white' : 'border-zinc-300 dark:border-white/10 text-zinc-500 hover:border-zinc-400 dark:hover:border-white/30'}`}
                                                    >
                                                        {rule.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-10"
                                    >
                                        {isGenerating ? (
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                <p className="text-xl font-bold animate-pulse text-zinc-400">Building your quote...</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-8">
                                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20" />
                                                    <h3 className="relative text-3xl font-bold mb-2">Estimated Investment</h3>
                                                    <p className="relative text-6xl md:text-7xl font-black tracking-tight my-6">
                                                        {formatPrice(quoteTotal, currency as Currency)}
                                                    </p>
                                                    <p className="relative text-blue-200 text-sm max-w-md mx-auto">
                                                        Includes everything you selected, plus security and setup.
                                                    </p>
                                                </div>

                                                <div className="flex flex-col md:flex-row gap-4 justify-center py-6">
                                                    <button
                                                        onClick={downloadPDF}
                                                        className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl"
                                                    >
                                                        <Download size={18} /> Get PDF Report
                                                    </button>
                                                    <Link
                                                        href="/contact"
                                                        className="bg-blue-900/10 border border-blue-500/20 text-blue-400 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                                                    >
                                                        Start Development <ChevronRight size={18} />
                                                    </Link>
                                                </div>

                                                {analysisResult && (
                                                    <div className="text-left bg-zinc-100 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-white/5">
                                                        <div className="flex items-center gap-3 mb-4 text-blue-500 dark:text-blue-400">
                                                            <Cpu size={18} />
                                                            <span className="font-semibold text-xs tracking-wide">Our Recommendation</span>
                                                        </div>
                                                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                                                            {analysisResult.technicalAnalysis}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {analysisResult.suggestions?.map((tech: string) => (
                                                                <span key={tech} className="px-3 py-1 bg-zinc-100 dark:bg-white/5 rounded-md text-xs font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {step < 3 && (
                                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-white/5 flex justify-between items-center">
                                    <button
                                        onClick={prevStep}
                                        disabled={step === 0}
                                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-0 font-semibold text-sm transition-colors flex items-center gap-2"
                                    >
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={step === 0 && !formData.clientName}
                                        className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {step === 2 ? 'Finalize' : 'Continue'} <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="sticky top-32">
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-sm dark:shadow-none">
                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-zinc-100 dark:border-white/5">
                                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                                        <Calculator size={16} />
                                        <span className="text-sm font-semibold">Live Quote</span>
                                    </div>
                                    <span className="font-mono text-xs text-zinc-500">{currency}</span>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {quoteBreakdown.length === 0 ? (
                                        <p className="text-zinc-600 text-sm italic py-4 text-center">Select items to see breakdown</p>
                                    ) : (
                                        quoteBreakdown.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-zinc-400 dark:text-zinc-500">{item.name}</span>
                                                <span className="text-zinc-900 dark:text-white font-mono">{item.price}</span>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="pt-6 border-t border-zinc-100 dark:border-white/10 flex justify-between items-end">
                                    <span className="text-zinc-500 text-sm font-bold">Total</span>
                                    <span className="text-3xl font-black text-blue-500">
                                        {formatPrice(quoteTotal, currency as Currency)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}

function Input({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider ml-1">{label}</label>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
            />
        </div>
    );
}

function SelectCard({ title, price, selected, onClick, icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`p-6 rounded-2xl border text-left transition-all hover:-translate-y-1 ${selected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20'}`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${selected ? 'bg-white text-blue-600' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
                {icon}
            </div>
            <h4 className={`font-bold text-lg mb-1 ${selected ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{title}</h4>
            <p className={`text-xs ${selected ? 'text-blue-100' : 'text-zinc-500'}`}>{price}</p>
        </button>
    );
}

function FeatureCard({ title, selected, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`p-4 rounded-xl border flex justify-between items-center transition-all ${selected ? 'bg-blue-50 dark:bg-zinc-800 border-blue-500' : 'bg-transparent border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5'}`}
        >
            <span className="font-semibold text-sm w-full text-left text-zinc-900 dark:text-white">{title}</span>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'bg-blue-600 border-blue-600' : 'border-zinc-300 dark:border-zinc-700'}`}>
                {selected && <CheckCircle2 size={12} className="text-white" />}
            </div>
        </button>
    );
}

const WebIcon = () => <Globe size={20} />;
const PhoneIcon = () => <Smartphone size={20} />;
const BotIcon = () => <Bot size={20} />;
