'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth(); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/">
           <AnimatedLogo textSize="text-xl md:text-2xl" className="cursor-pointer" />
        </Link>

        {/* DESKTOP LINKS (ALL 6 ITEMS) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/services" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Services</Link>
          <Link href="/portfolio" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Work</Link>
          <Link href="/pricing" className="text-xs font-bold text-accent hover:text-white transition-colors uppercase tracking-widest">Pricing</Link>
          <Link href="/community" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Community</Link>
          <Link href="/blog" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Blog</Link>
          
          {/* LOGIN / PROFILE BUTTON */}
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 bg-surface border border-gray-700 rounded-full px-4 py-2 hover:border-primary transition-all">
              <img src={user.photoURL} className="w-6 h-6 rounded-full" alt="User" />
              <span className="text-xs font-bold text-white">Account</span>
            </Link>
          ) : (
             <Link href="/login" className="flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors uppercase tracking-widest">
               <User size={16} /> Login
             </Link>
          )}

          <Link href="/contact" className="px-5 py-2 bg-white text-black font-bold rounded-full text-xs hover:bg-gray-200 transition-all tracking-widest shadow-lg shadow-white/10">
            START
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full h-screen bg-black p-10 flex flex-col gap-8 z-40 border-t border-gray-800">
          <Link href="/services" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white font-display">Services</Link>
          <Link href="/portfolio" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white font-display">Work</Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-accent font-display">Pricing Calculator</Link>
          <Link href="/community" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white font-display">Community</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white font-display">Blog</Link>
          <Link href="/login" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-gray-400 font-display">Login / Join</Link>
        </div>
      )}
    </nav>
  );
}