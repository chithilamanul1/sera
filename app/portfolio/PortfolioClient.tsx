"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PortfolioClient({ initialProjects }: { initialProjects: any[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase text-zinc-400"
          >
            Selected Works
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black font-syne tracking-tighter leading-none"
          >
            Digital <span className="text-zinc-600 italic">Craft</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mt-4"
          >
            We build digital experiences that drive growth, engagement, and innovation for ambitious brands worldwide.
          </motion.p>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="px-4 md:px-12 lg:px-24 pb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-12 md:gap-32">
          {initialProjects.length === 0 ? (
            <div className="text-center py-32 text-zinc-500 font-syne text-2xl">
              No projects found in the portfolio.
            </div>
          ) : (
            initialProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 group`}
    >
      {/* Image Side */}
      <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 relative">
         <motion.div style={{ y }} className="w-full h-[120%] absolute -top-[10%] left-0">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black" />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
         </motion.div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-2/5 flex flex-col gap-6">
        <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-zinc-500">
          <span>{project.category.replace('_', ' ')}</span>
          <span className="w-8 h-px bg-zinc-800" />
          <span>{new Date(project.createdAt).getFullYear()}</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne tracking-tight">
          {project.title}
        </h2>
        
        <p className="text-lg text-zinc-400 leading-relaxed">
          {project.role}
        </p>

        {project.techStack && project.techStack.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-2">
             {project.techStack.slice(0, 4).map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300">
                  {tech}
                </span>
             ))}
           </div>
        )}

        <div className="mt-4">
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all group/btn"
          >
            View Case Study 
            <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
