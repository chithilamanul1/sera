import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <FadeIn>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Our Services</h1>
        <p className="text-muted text-xl max-w-2xl mb-16">
          We don't just write code. We build digital assets that add value to your company.
        </p>
      </FadeIn>

      <div className="grid gap-12">
        {/* Service 1 */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-8 items-center bg-surface p-8 rounded-2xl border border-gray-800 hover:border-primary transition-all group">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">Web Application Development</h2>
              <p className="text-muted mb-6 text-lg">From simple landing pages to complex e-commerce platforms.</p>
              <ul className="space-y-2 mb-6 text-gray-400">
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> E-Commerce Stores</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Corporate Portfolios</li>
              </ul>
              <Link href="/contact" className="text-primary font-bold hover:underline">Get a Quote →</Link>
            </div>
            {/* GRADIENT BOX REPLACEMENT */}
            <div className="w-full md:w-1/3 h-64 rounded-xl border border-gray-700 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
               <div className="text-6xl">🌐</div>
            </div>
          </div>
        </FadeIn>

        {/* Service 2 */}
        <FadeIn delay={0.2}>
          <div className="flex flex-col md:flex-row gap-8 items-center bg-surface p-8 rounded-2xl border border-gray-800 hover:border-accent transition-all group">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors">Custom Software Solutions</h2>
              <p className="text-muted mb-6 text-lg">Stop using Excel sheets. We build custom software to automate your daily tasks.</p>
              <ul className="space-y-2 mb-6 text-gray-400">
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Inventory Management (POS)</li>
                <li className="flex items-center gap-2"><span className="text-accent">✓</span> Employee Management (HR)</li>
              </ul>
              <Link href="/contact" className="text-accent font-bold hover:underline">Discuss Requirements →</Link>
            </div>
            {/* GRADIENT BOX REPLACEMENT */}
            <div className="w-full md:w-1/3 h-64 rounded-xl border border-gray-700 bg-gradient-to-br from-cyan-900 to-slate-900 flex items-center justify-center">
               <div className="text-6xl">⚙️</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}