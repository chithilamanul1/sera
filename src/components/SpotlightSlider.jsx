'use client';

export default function SpotlightSlider() {
  const cards = [
    { color: "from-blue-900 to-slate-900", label: "E-Commerce" },
    { color: "from-purple-900 to-slate-900", label: "POS Systems" },
    { color: "from-cyan-900 to-slate-900", label: "Hotel Booking" },
    { color: "from-green-900 to-slate-900", label: "Corporate" },
    { color: "from-pink-900 to-slate-900", label: "Medical App" },
  ];

  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden relative group">
      <div className="flex animate-scroll whitespace-nowrap min-w-full">
         {[...cards, ...cards, ...cards].map((card, i) => (
           <div key={i} className={`mx-4 w-64 h-40 rounded-xl border border-gray-700 bg-gradient-to-br ${card.color} flex items-center justify-center relative shadow-lg`}>
              <span className="font-display font-bold text-white/50 text-xl tracking-widest uppercase">{card.label}</span>
           </div>
         ))}
      </div>
    </div>
  );
}