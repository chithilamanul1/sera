import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Simple Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center z-10">
          <FadeIn>
            <h1 className="font-display text-5xl md:text-8xl font-bold text-white leading-tight mb-8">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">WEBSITES & APPS.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light">
              We make professional websites and software for businesses in Sri Lanka. 
              Simple, fast, and built to help you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-600 transition-all text-lg shadow-lg shadow-blue-500/30">
                Start Your Project
              </Link>
              <Link href="/portfolio" className="px-10 py-4 border border-gray-700 text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg">
                See Our Work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- SERVICES (Crystal Clear) --- */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-display font-bold text-white mb-16 text-center tracking-widest">WHAT WE DO</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
            <div className="p-10 bg-background rounded-3xl border border-gray-800 hover:border-primary transition-colors group h-full">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🌐</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Modern Websites</h3>
              <p className="text-gray-400 leading-relaxed">
                We build fast, secure websites that look great on mobile phones. Perfect for shops, hotels, and companies.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={0.2}>
            <div className="p-10 bg-background rounded-3xl border border-gray-800 hover:border-accent transition-colors group h-full">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">⚙️</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Custom Software</h3>
              <p className="text-gray-400 leading-relaxed">
                Need to manage stock or sales? We build custom systems to replace Excel and paper books. Automate your work.
              </p>
            </div>
            </FadeIn>

            <FadeIn delay={0.3}>
            <div className="p-10 bg-background rounded-3xl border border-gray-800 hover:border-purple-500 transition-colors group h-full">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Logo & Branding</h3>
              <p className="text-gray-400 leading-relaxed">
                We design professional logos and social media graphics. Make your business look trustworthy and expensive.
              </p>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}