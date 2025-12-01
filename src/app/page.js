import Link from "next/link";
import { ArrowRight, Code, Cpu, Globe, Layers, Rocket, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-bold tracking-[0.2em] mb-8 uppercase">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Elite Digital Engineering
            </div>
            <h1 className="font-display text-5xl md:text-8xl font-bold text-white leading-tight mb-8">
              IDEAS, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ENGINEERED.</span>
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              We don't just build websites. We architect scalable digital ecosystems. 
              From high-performance web apps to custom software solutions, we turn complex problems into elegant code.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="group relative px-8 py-4 bg-primary text-white font-bold rounded overflow-hidden transition-all hover:scale-105">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="flex items-center gap-2">INITIATE PROJECT <ArrowRight className="w-4 h-4" /></span>
              </Link>
              <Link href="/portfolio" className="px-8 py-4 border border-white/20 text-white font-bold rounded hover:bg-white/5 transition-all hover:border-white/50">
                VIEW OUR WORK
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- TECH STACK MARQUEE --- */}
      <section className="border-y border-white/5 bg-white/[0.02] py-10 overflow-hidden">
        <div className="flex gap-20 items-center animate-scroll whitespace-nowrap min-w-full justify-center">
           {[1,2,3,4].map(i => (
             <div key={i} className="flex gap-16 opacity-50 font-display font-bold text-xl text-white/40">
                <span>NEXT.JS 15</span>
                <span>TAILWIND</span>
                <span>VERCEL</span>
                <span>REACT</span>
                <span>NODE.JS</span>
                <span>MONGODB</span>
                <span>FRAMER MOTION</span>
             </div>
           ))}
        </div>
      </section>

      {/* --- SERVICES (Detailed & Restored) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-20 text-center">CORE COMPETENCIES</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <FadeIn delay={0.1} className="group p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/50 transition-all hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
              <Globe className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Web Application Engineering</h3>
              <p className="text-muted leading-relaxed mb-6">
                We go beyond static sites. We build robust, high-performance web applications using Next.js. 
                Focusing on speed, security, and scalability.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2"><Code className="w-4 h-4 text-primary" /> Progressive Web Apps (PWA)</li>
                <li className="flex gap-2"><Code className="w-4 h-4 text-primary" /> E-Commerce Platforms</li>
                <li className="flex gap-2"><Code className="w-4 h-4 text-primary" /> SaaS Dashboards</li>
              </ul>
            </FadeIn>

            {/* Card 2 */}
            <FadeIn delay={0.2} className="group p-8 rounded-2xl bg-surface border border-white/5 hover:border-accent/50 transition-all hover:shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
              <Layers className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Strategic Branding & UI/UX</h3>
              <p className="text-muted leading-relaxed mb-6">
                A successful product is an experience. We craft compelling brand identities and intuitive 
                interfaces that connect with your audience and drive engagement.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2"><Code className="w-4 h-4 text-accent" /> Visual Identity Systems</li>
                <li className="flex gap-2"><Code className="w-4 h-4 text-accent" /> User Experience Design</li>
                <li className="flex gap-2"><Code className="w-4 h-4 text-accent" /> Interactive Prototypes</li>
              </ul>
            </FadeIn>

            {/* Card 3 */}
            <FadeIn delay={0.3} className="group p-8 rounded-2xl bg-surface border border-white/5 hover:border-purple-500/50 transition-all hover:shadow-[0_0_50px_rgba(168,85,247,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <Cpu className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Custom Software Solutions</h3>
              <p className="text-muted leading-relaxed mb-6">
                For unique business challenges, we provide bespoke software. We build custom tools 
                and internal systems that automate processes and boost productivity.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2"><Code className="w-4 h-4 text-purple-500" /> Inventory Management</li>
                <li className="flex gap-2"><Code className="w-4 h-4 text-purple-500" /> API Integration</li>
                <li className="flex gap-2"><Code className="w-4 h-4 text-purple-500" /> Automation Scripts</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION (Restored) --- */}
      <section id="process" className="py-32 bg-surface/50 border-y border-white/5 relative">
        <div className="container mx-auto px-6">
           <FadeIn>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-16 text-center">OUR FOUNDATION</h2>
           </FadeIn>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <FadeIn className="flex gap-6">
                 <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                    <Rocket className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Collaborative Partnership</h3>
                    <p className="text-muted text-lg">
                       We work with you, not just for you. A transparent process ensures you're always in the loop. 
                       We integrate with your team to understand your business inside and out.
                    </p>
                 </div>
              </FadeIn>

              <FadeIn delay={0.2} className="flex gap-6">
                 <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
                    <ShieldCheck className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quality & Reliability</h3>
                    <p className="text-muted text-lg">
                       Our commitment to clean code and best practices means your product is built to last 
                       and perform under pressure. No shortcuts, just solid engineering.
                    </p>
                 </div>
              </FadeIn>
           </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 pointer-events-none" />
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">READY TO SCALE?</h2>
          <p className="text-muted text-xl max-w-2xl mx-auto mb-10">
            Let's build something great together. Schedule a consultation today.
          </p>
          <Link href="/contact" className="inline-block px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            START CONVERSATION
          </Link>
        </FadeIn>
      </section>

    </div>
  );
}