'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User } from 'lucide-react';

const events = [
  { text: "Someone from Colombo requested a quote", time: "2 mins ago" },
  { text: "New Project Started: Hotel Website", time: "1 hour ago" },
  { text: "Someone from Kandy viewed Pricing", time: "5 mins ago" },
  { text: "New Review: 5 Stars from Dinidu Hall", time: "Just now" },
  { text: "Visitor from Gampaha is online", time: "Now" }
];

export default function LiveActivity() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show popup every 10 seconds, hide after 5 seconds
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
      setTimeout(() => setCurrent((prev) => (prev + 1) % events.length), 5500);
    }, 12000); // Loop cycle time

    // Initial delay
    setTimeout(() => setVisible(true), 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-24 left-6 z-40 bg-surface/90 backdrop-blur border border-gray-700 p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-xs hidden md:flex"
        >
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">{events[current].text}</p>
            <p className="text-[10px] text-gray-400">{events[current].time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}