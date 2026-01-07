'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PriceCalculator() {
  const [features, setFeatures] = useState([]);
  const [budget, setBudget] = useState(0);

  const items = [
    { id: 'cms', name: 'Admin Panel', price: 10000 },
    { id: 'seo', name: 'SEO Optimization', price: 5000 },
    { id: 'pay', name: 'Payment Gateway', price: 15000 },
    { id: 'anim', name: 'Super Animations', price: 5000 },
    { id: 'chat', name: 'WhatsApp Bot', price: 8000 },
  ];

  const toggle = (item) => {
    if (features.includes(item.id)) {
      setFeatures(features.filter(i => i !== item.id));
      setBudget(budget - item.price);
    } else {
      setFeatures([...features, item.id]);
      setBudget(budget + item.price);
    }
  };

  const basePrice = 15000;
  const total = basePrice + budget;

  return (
    <div className="bg-surface border border-gray-800 p-8 rounded-2xl w-full max-w-2xl mx-auto shadow-2xl">
      <h3 className="text-2xl font-display font-bold text-white mb-6">Build Your Package</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item)}
            className={`p-4 rounded-xl border text-left transition-all ${features.includes(item.id) ? 'border-primary bg-primary/10 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
          >
            <div className="font-bold">{item.name}</div>
            <div className="text-sm opacity-70">+ LKR {item.price.toLocaleString()}</div>
          </button>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-gray-400 text-sm">Estimated Total</span>
          <div className="text-4xl font-bold text-white text-glow">
            LKR {total.toLocaleString()} <span className="text-lg text-gray-500">+</span>
          </div>
          <span className="text-xs text-accent font-bold">*Starter Package: LKR 15,000</span>
        </div>
        <a href={`https://wa.me/94724139621?text=I am interested in a website. Budget: LKR ${total.toLocaleString()}`} className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20">
          Get This Deal
        </a>
      </div>
    </div>
  );
}