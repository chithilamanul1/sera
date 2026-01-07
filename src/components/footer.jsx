'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import BrandIcon from "./BrandIcon";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-surface border-t border-gray-800 pt-16 pb-8 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
               <BrandIcon className="w-8 h-8" />
               <span className="font-display font-bold text-2xl text-white tracking-widest">SERANEX</span>
            </Link>
            <p className="text-muted max-w-sm mb-6 leading-relaxed">
              We engineer digital dominance. Custom software, high-performance websites, and strategic branding for Sri Lanka's future leaders.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary">Case Studies</Link></li>
              <li><Link href="/pricing" className="hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="tel:0724139621" className="hover:text-primary font-bold">072 413 9621</a></li>
              <li><a href="tel:0728382638" className="hover:text-primary font-bold">072 838 2638</a></li>
              <li><Link href="/login" className="hover:text-primary">Client Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-gray-600 gap-4">
          <div>&copy; {new Date().getFullYear()} SERANEX ENGINEERING.</div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div><span>ONLINE</span></div>
             <div>SEEDUWA: <span className="text-primary">{time}</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
}