'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Command, Layout, Code, Phone, User } from 'lucide-react';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Toggle on Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const items = [
    { name: 'Home', icon: Layout, href: '/' },
    { name: 'Our Work', icon: Code, href: '/portfolio' },
    { name: 'Services', icon: ArrowRight, href: '/services' },
    { name: 'Contact', icon: Phone, href: '/contact' },
    { name: 'Client Login', icon: User, href: '/login' },
    { name: 'Audit Tool', icon: Search, href: '/' }, // Anchors to home
  ];

  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (href) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-surface border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center border-b border-gray-700 px-4 py-4">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input 
                autoFocus
                placeholder="Where do you want to go?"
                className="bg-transparent border-none outline-none text-white w-full text-lg placeholder-gray-500"
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="text-xs text-gray-500 border border-gray-700 rounded px-2 py-1">ESC</span>
            </div>
            
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-4 text-gray-500 text-center text-sm">No results found.</div>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelect(item.href)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/20 hover:text-primary text-gray-300 transition-colors text-left group"
                  >
                    <item.icon size={18} className="group-hover:text-primary transition-colors" />
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-xs">↵ Enter</span>
                  </button>
                ))
              )}
            </div>
            
            <div className="bg-black/50 p-2 text-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-gray-800">
              Seranex Command Center v2.0
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}