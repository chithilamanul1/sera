'use client';

import { cn } from "@/lib/utils";
import Link from 'next/link';
import Silk from '@/components/Silk';
import { TrueFocus } from '@/components/ui/TrueFocus';
import { BentoGrid } from '@/components/ui/BentoGrid';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TiltedCard } from '@/components/ui/TiltedCard';
import { Preloader } from '@/components/ui/Preloader';
import { SplitText } from '@/components/ui/SplitText';
import { Footer } from '@/components/ui/Footer';
import { services, iconMap } from '@/lib/data';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white">
      {/* Preloader */}
      <Preloader />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <Silk color="#4d4c4c" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center space-y-8 mb-24">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/10 rounded-full border border-blue-500/20">
            Seranex Business Solutions
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
            Building the Future of
          </h1>

          <div className="py-4">
            <TrueFocus sentence="Business Solutions" borderColor="#00F2FF" glowColor="rgba(0, 242, 255, 0.4)" />
          </div>

          <p className="max-w-2xl mx-auto text-lg text-neutral-400">
            We bridge the gap between high-end design and technical architecture.
            Empowering your business with AI, Web, and Custom Software.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition">
              Get Started
            </button>
            <button className="px-8 py-3 bg-transparent border border-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-900 transition">
              View Projects
            </button>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section id="services" className="space-y-12">
          <div className="text-center mb-12">
            <SplitText
              text="OUR SERVICES"
              className="text-4xl md:text-5xl font-bold justify-center text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500"
            />
          </div>

          <BentoGrid className="md:auto-rows-[20rem]">
            {services.map((service) => {
              const Icon = iconMap[service.iconName];

              // Select Component based on Type
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              let CardComponent: any = ({ children }: { children: React.ReactNode }) => <div className="h-full w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">{children}</div>;

              if (service.componentType === 'SpotlightCard') {
                CardComponent = ({ children }: { children: React.ReactNode }) => (
                  <SpotlightCard className="h-full" spotlightColor={service.primaryColor}>
                    <div className="p-6 h-full flex flex-col">{children}</div>
                  </SpotlightCard>
                );
              } else if (service.componentType === 'TiltedCard') {
                CardComponent = ({ children }: { children: React.ReactNode }) => (
                  <div className="h-full w-full">
                    <TiltedCard className="bg-neutral-900/50 border border-neutral-800 rounded-xl h-full" containerClassName="h-full">
                      <div className="p-6 h-full flex flex-col">{children}</div>
                    </TiltedCard>
                  </div>
                );
              } else if (service.componentType === 'Silk') {
                // Special layout for AI
                CardComponent = ({ children }: { children: React.ReactNode }) => (
                  <div className="relative h-full w-full overflow-hidden border border-red-900/30 bg-red-950/10 rounded-xl">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <Silk color={service.primaryColor} speed={2} />
                    </div>
                    <div className="relative z-10 p-6 h-full flex flex-col bg-black/20 backdrop-blur-sm">
                      {children}
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={service.id}
                  className={cn(
                    service.priority === 1 ? "md:col-span-2" : "md:col-span-1",
                    "rounded-xl"
                  )}
                >
                  <Link href={`/services/${service.slug}`} className="block h-full">
                    <CardComponent>
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${service.primaryColor}20` }}>
                            <Icon className="w-6 h-6" style={{ color: service.primaryColor }} />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                          <p className="text-neutral-400 text-sm">{service.description}</p>
                        </div>
                        <div className="mt-4 flex items-center text-sm font-medium" style={{ color: service.primaryColor }}>
                          Learn More &rarr;
                        </div>
                      </div>
                    </CardComponent>
                  </Link>
                </div>
              );
            })}
          </BentoGrid>
        </section>

      </div>

      <Footer />
    </main>
  );
}
