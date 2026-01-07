'use client';
import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import BrandIcon from "./BrandIcon";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth(); 

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
           <BrandIcon className="w-8 h-8 text-white group-hover:text-primary transition-colors" />
           <span className="font-display font-bold text-xl text-white tracking-widest">SERANEX</span>
        </Link>

        {/* DESKTOP LINKS - ALL 6 VISIBLE */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/services" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Services</Link>
          <Link href="/portfolio" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Work</Link>
          <Link href="/pricing" className="text-xs font-bold text-accent hover:text-white transition-colors uppercase tracking-widest">Pricing</Link>
          <Link href="/community" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Community</Link>
          <Link href="/blog" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">Blog</Link>
          
          {/* LOGIN */}
          <Link href={user ? "/profile" : "/login"} className="flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors uppercase tracking-widest border border-gray-700 rounded-full px-4 py-2">
             <User size={14} /> {user ? "Account" : "Login"}
          </Link>

          <Link href="/contact" className="px-5 py-2 bg-white text-black font-bold rounded-full text-xs hover:bg-gray-200 transition-all uppercase tracking-widest">
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
        <div className="md:hidden absolute top-16 left-0 w-full h-screen bg-black p-8 flex flex-col gap-6 z-40 border-t border-gray-800">
          <Link href="/services" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white">Services</Link>
          <Link href="/portfolio" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white">Work</Link>
          <Link href="/pricing" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-accent">Pricing</Link>
          <Link href="/community" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white">Community</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white">Blog</Link>
          <Link href="/login" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-gray-400">Login</Link>
        </div>
      )}
    </nav>
  );
}