'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Prevent execution on server
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 w-full z-[9999] bg-red-600/90 backdrop-blur text-white px-6 py-3 flex items-center justify-center gap-3 shadow-2xl shadow-red-600/20"
        >
          <WifiOff className="animate-pulse" size={20} />
          <span className="font-mono text-sm font-bold tracking-widest uppercase">
            CONNECTION LOST // RECONNECTING TO SATELLITE...
          </span>
          <RefreshCw size={16} className="animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}