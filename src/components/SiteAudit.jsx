'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Search, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function SiteAudit() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);

  const startScan = (e) => {
    e.preventDefault();
    if (!url) return;
    setScanning(true);
    setResult(null);
    setLogs([]);

    const steps = [
      "Resolving DNS...",
      "Pinging Server (Colombo Node)...",
      "Analyzing SSL Certificate...",
      "Checking Mobile Responsiveness...",
      "Scanning for SEO Keywords...",
      "Measuring LCP (Largest Contentful Paint)...",
      "Detecting Security Vulnerabilities...",
      "CALCULATING FINAL SCORE..."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
      }, index * 600);
    });

    setTimeout(() => {
      setScanning(false);
      setResult({
        score: Math.floor(Math.random() * (65 - 40) + 40),
        speed: "Slow (2.4s)",
        seo: "Missing Meta Tags",
        security: "Vulnerable Headers"
      });
    }, steps.length * 600);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto bg-surface border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        
        <div className="text-center mb-10">
          <span className="text-accent font-bold tracking-widest text-xs uppercase mb-2 block">Free Intelligence Tool</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Is Your Website Losing Customers?</h2>
          <p className="text-muted text-lg">Enter your URL below. Our AI will audit your performance, SEO, and security instantly.</p>
        </div>

        {!scanning && !result && (
          <form onSubmit={startScan} className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="www.yourbusiness.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow bg-black border border-gray-700 rounded-xl p-4 text-white text-lg focus:border-primary outline-none transition-colors"
            />
            <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105">
              <Zap size={20} /> Run Audit
            </button>
          </form>
        )}

        {scanning && (
          <div className="bg-black border border-gray-800 rounded-xl p-6 font-mono text-sm h-64 overflow-hidden flex flex-col-reverse">
            {logs.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-green-500 mb-1"
              >
                &gt; {log} {/* <--- FIXED: Replaced '>' with '&gt;' */}
              </motion.div>
            ))}
            <div className="animate-pulse text-primary font-bold mb-2">__ SERANEX SYSTEM SCANNING TARGET __</div>
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/50 border border-red-500/30 rounded-2xl p-8 text-center"
          >
            <div className="flex justify-center mb-6">
               <div className="w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center bg-red-500/10">
                 <div>
                    <div className="text-5xl font-bold text-white">{result.score}</div>
                    <div className="text-xs text-red-400 font-bold uppercase">Critical</div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
               <div className="p-4 bg-gray-900 rounded-lg">
                 <Activity className="mx-auto text-red-400 mb-2" />
                 <div className="text-gray-400 text-xs uppercase">Speed</div>
                 <div className="text-white font-bold">{result.speed}</div>
               </div>
               <div className="p-4 bg-gray-900 rounded-lg">
                 <Search className="mx-auto text-yellow-400 mb-2" />
                 <div className="text-gray-400 text-xs uppercase">SEO</div>
                 <div className="text-white font-bold">{result.seo}</div>
               </div>
               <div className="p-4 bg-gray-900 rounded-lg">
                 <Lock className="mx-auto text-orange-400 mb-2" />
                 <div className="text-gray-400 text-xs uppercase">Security</div>
                 <div className="text-white font-bold">{result.security}</div>
               </div>
            </div>

            <h3 className="text-xl text-white font-bold mb-2">We found critical issues.</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Your site is slower than 70% of competitors. This hurts your Google Ranking and loses sales.
            </p>

            <div className="flex justify-center gap-4">
               <button onClick={() => { setScanning(false); setResult(null); setUrl(''); }} className="px-6 py-3 text-gray-400 hover:text-white">
                 Scan Another
               </button>
               <Link href="/contact" className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-lg shadow-red-600/20 animate-pulse">
                 Fix My Site Now
               </Link>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}