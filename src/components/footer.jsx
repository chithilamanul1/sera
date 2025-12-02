'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import BrandIcon from "./BrandIcon";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Colombo', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-surface border-t border-gray-800 pt-16 pb-8 mt-20 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
               <BrandIcon className="w-8 h-8" />
               <span className="font-display font-bold text-2xl text-white tracking-widest">SERANEX</span>
            </Link>
            <p className="text-muted max-w-sm mb-6 leading-relaxed">
              We engineer digital dominance. Custom software, high-performance websites, and strategic branding for Sri Lanka's future leaders.
            </p>
            <div className="flex gap-4">
               {/* Fake Status Indicators */}
               <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  SYSTEMS ONLINE
               </div>
               <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-500 text-xs font-bold">
                  V2.0 STABLE
               </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Connect</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Client Portal</Link></li>
              <li className="pt-4 text-xs opacity-50">Seeduwa, Sri Lanka</li>
              <li className="text-xs opacity-50">+94 77 123 4567</li>
            </ul>
          </div>
        </div>

        {/* SYSTEM BAR */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600 gap-4">
          <div>
             &copy; {new Date().getFullYear()} SERANEX ENGINEERING.
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>LATENCY: 24ms</span>
             </div>
             <div className="hidden md:block w-px h-4 bg-gray-800"></div>
             <div>
                SEEDUWA TIME: <span className="text-primary">{time}</span>
             </div>
             <div className="hidden md:block w-px h-4 bg-gray-800"></div>
             <div className="flex items-center gap-2">
                <span className="border border-gray-700 px-1 rounded text-[10px]">CTRL+K</span>
                <span>TO NAVIGATE</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}