import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      
      {/* HERO SECTION */}
      <section className="w-full max-w-5xl px-6 py-24 md:py-32 text-center">
        <div className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
          🚀 Next-Gen Software Engineering
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
          IDEAS, <span className="text-primary">ENGINEERED.</span>
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10">
          We build fast websites, mobile apps, and custom software. 
          Simple solutions for complex business problems.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-blue-500/20">
            Start Your Project
          </Link>
          <Link href="/portfolio" className="bg-surface border border-gray-700 hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-all">
            View Our Work
          </Link>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="w-full max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-10 text-center font-display">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface p-8 rounded-2xl border border-gray-800 hover:border-primary transition-all">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary text-2xl">🌐</div>
            <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
            <p className="text-muted">High-performance websites using Next.js. Fast, secure, and SEO optimized.</p>
          </div>
          <div className="bg-surface p-8 rounded-2xl border border-gray-800 hover:border-primary transition-all">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6 text-accent text-2xl">📱</div>
            <h3 className="text-xl font-bold text-white mb-3">Custom Software</h3>
            <p className="text-muted">Inventory systems, POS integration, and business tools built just for you.</p>
          </div>
          <div className="bg-surface p-8 rounded-2xl border border-gray-800 hover:border-primary transition-all">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 text-purple-400 text-2xl">🎨</div>
            <h3 className="text-xl font-bold text-white mb-3">Branding</h3>
            <p className="text-muted">Logo design, social media kits, and brand identity to make you stand out.</p>
          </div>
        </div>
      </section>

    </div>
  );
}