'use client';
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SpotlightSlider from "@/components/SpotlightSlider";
import FAQ from "@/components/FAQ";
import SiteAudit from "@/components/SiteAudit";
import ComparisonSlider from "@/components/ComparisonSlider";
import LangSwitch from "@/components/LangSwitch";
import Typewriter from "@/components/Typewriter";
import ParallaxImage from "@/components/ParallaxImage";
import { useLang } from "@/context/LanguageContext";

export default function Home() {
  const { t, lang } = useLang();

  // Words for typewriter
  const typeWords = lang === 'si' 
    ? ["වෙබ් අඩවි", "සොෆ්ට්වෙයාර්", "බ්‍රෑන්ඩ්ස්"] 
    : ["WEBSITES", "SOFTWARE", "BRANDS"];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <LangSwitch />
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
        <div className="container mx-auto px-6 text-center z-10">
          <FadeIn>
            
            <h1 className="font-display text-5xl md:text-8xl font-bold text-white leading-tight mb-8">
              {t('hero.subtitle')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                <Typewriter words={typeWords} className="inline-block" />
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              {t('hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-blue-600 transition-all text-lg shadow-lg shadow-blue-500/30 hover:scale-105">
                {t('cta.start')}
              </Link>
              <Link href="/portfolio" className="px-10 py-4 border border-gray-700 text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg hover:scale-105">
                {t('cta.work')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VISUALS */}
    
      <SiteAudit /> 
      
      {/* SERVICES (Standard Layout without TiltCard) */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-display font-bold text-white mb-16 text-center tracking-widest">{t('services.title')}</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <FadeIn delay={0.1}>
              <div className="p-10 bg-background rounded-3xl border border-gray-800 hover:border-primary transition-colors h-full flex flex-col items-center text-center shadow-2xl group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6">🌐</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display">{t('services.web.title')}</h3>
                <p className="text-gray-400 leading-relaxed">{t('services.web.desc')}</p>
              </div>
            </FadeIn>

            {/* Service 2 */}
            <FadeIn delay={0.2}>
              <div className="p-10 bg-background rounded-3xl border border-gray-800 hover:border-accent transition-colors h-full flex flex-col items-center text-center shadow-2xl group">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-3xl mb-6">⚙️</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display">{t('services.soft.title')}</h3>
                <p className="text-gray-400 leading-relaxed">{t('services.soft.desc')}</p>
              </div>
            </FadeIn>

            {/* Service 3 */}
            <FadeIn delay={0.3}>
              <div className="p-10 bg-background rounded-3xl border border-gray-800 hover:border-purple-500 transition-colors h-full flex flex-col items-center text-center shadow-2xl group">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6">🎨</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display">{t('services.brand.title')}</h3>
                <p className="text-gray-400 leading-relaxed">{t('services.brand.desc')}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <FAQ />

    </div>
  );
}
