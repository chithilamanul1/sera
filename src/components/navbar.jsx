'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/">
           <AnimatedLogo textSize="text-2xl" className="cursor-pointer" />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/services" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Services</Link>
          <Link href="/portfolio" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Work</Link>
          <Link href="/blog" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Blog</Link>
          <Link href="/contact" className="px-8 py-3 bg-white text-black font-bold rounded-full text-xs hover:bg-gray-200 transition-all tracking-widest shadow-lg shadow-white/10">
            START PROJECT
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-screen bg-black p-10 flex flex-col gap-8 z-40">
          <Link href="/services" onClick={() => setMobileOpen(false)} className="text-3xl font-bold text-white font-display">Services</Link>
          <Link href="/portfolio" onClick={() => setMobileOpen(false)} className="text-3xl font-bold text-white font-display">Work</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-3xl font-bold text-primary font-display">Get Started</Link>
        </div>
      )}
    </nav>
  );
}