'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Process", href: "/#process" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative w-48 h-12">
            <Image 
                src="https://i.ibb.co/s9XYwhc0/New-Project-3.png"
                alt="Seranex Logo"
                fill
                className="object-contain mix-blend-screen"
                priority
            />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-white hover:text-glow transition-all tracking-widest uppercase"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="px-6 py-2 bg-primary hover:bg-blue-600 text-white font-bold rounded text-sm tracking-wider transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]">
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
        <div className="md:hidden absolute top-24 left-0 w-full bg-black/95 border-b border-gray-800 p-6 flex flex-col gap-6 backdrop-blur-xl">
           {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white">
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-xl font-bold text-primary">
            Start Project →
          </Link>
        </div>
      )}
    </nav>
  );
}