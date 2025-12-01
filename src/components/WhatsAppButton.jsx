'use client';
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/94771234567?text=Hi%20Seranex,%20I%20need%20a%20quote."
      target="_blank"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
      <div className="relative bg-[#25D366] hover:bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2 pr-6">
        <MessageCircle size={28} fill="white" className="text-white" />
        <span className="font-bold hidden md:block">Chat Now</span>
      </div>
    </motion.a>
  );
}