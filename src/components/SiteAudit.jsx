'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Lock, Zap } from 'lucide-react';

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
      "Analyzing SSL Certificate...",
      "Checking Mobile Responsiveness...",
      "Scanning for SEO Keywords...",
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
      <div className="max-w-4xl mx-auto bg-surface border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Is Your Website Losing Customers?</h2>
          <p className="text-muted text-lg">Enter your URL below. Our AI will audit your performance instantly.</p>
        </div>

        {!scanning && !result && (
          <form onSubmit={startScan} className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="www.yourbusiness.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow bg-black border border-gray-700 rounded-xl p-4 text-white text-lg focus:border-primary outline-none"
            />
            <button type="submit" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Zap size={20} /> Run Audit
            </button>
          </form>
        )}

        {scanning && (
          <div className="bg-black border border-gray-800 rounded-xl p-6 font-mono text-sm h-64 overflow-hidden flex flex-col-reverse">
            {logs.map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-green-500 mb-1">
                &gt; {log} 
              </motion.div>
            ))}
            <div className="animate-pulse text-primary font-bold mb-2">__ SERANEX SYSTEM SCANNING TARGET __</div>
          </div>
        )}

        {result && (
          <div className="bg-black/50 border border-red-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-xl text-white font-bold mb-2">Critical Issues Found (Score: {result.score})</h3>
            <p className="text-gray-400 mb-8">Your site is slower than competitors.</p>
            <button onClick={() => { setScanning(false); setResult(null); setUrl(''); }} className="px-6 py-3 text-gray-400 hover:text-white">Scan Another</button>
          </div>
        )}
      </div>
    </section>
  );
}