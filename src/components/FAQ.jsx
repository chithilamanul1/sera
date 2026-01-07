'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const questions = [
  {
    q: "How much does a website cost?",
    a: "We are disrupting the market. A professional business website starts at just LKR 15,000. Custom software and e-commerce platforms range from LKR 50,000 to 200,000+. Check our Pricing page for a calculator."
  },
  {
    q: "How long will it take?",
    a: "Standard websites are delivered in 3-5 days. Complex custom software takes 2-4 weeks. You can track our progress daily via your Client Portal."
  },
  {
    q: "Do you handle hosting & domains?",
    a: "Yes. We take care of everything: Domain registration (.lk/.com), high-speed cloud hosting (AWS/Vercel), and SSL security."
  },
  {
    q: "Can I update the site myself?",
    a: "Absolutely. We build a custom Admin Panel that lets you easily change text, upload photos, and manage products from your phone, with no coding needed."
  },
  {
    q: "How do I contact support?",
    a: "Call our direct engineering hotline at 072 4139621 or 072 838 2638. We are available 24/7 for critical issues."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Common Questions</h2>
            <p className="text-muted">Everything you need to know before we start.</p>
        </div>
        
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="border border-gray-800 rounded-2xl bg-black/40 overflow-hidden hover:border-primary/50 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <div className="flex items-center gap-4">
                    <HelpCircle size={20} className="text-gray-600 group-hover:text-primary transition-colors" />
                    <span className="font-bold text-white text-lg md:text-xl">{item.q}</span>
                </div>
                {openIndex === i ? <Minus className="text-primary" /> : <Plus className="text-gray-500" />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 pl-16 text-gray-400 leading-relaxed border-t border-gray-800/50">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}