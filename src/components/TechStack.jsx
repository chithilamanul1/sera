'use client';

const techs = [
  "NEXT.JS 15", "REACT", "FIREBASE", "AWS CLOUD", "TAILWIND CSS", "NODE.JS", "FRAMER MOTION", "MONGODB", "VERCEL"
];

export default function TechStack() {
  return (
    <div className="py-8 border-y border-white/5 bg-white/[0.02] overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap min-w-full">
         {/* We duplicate the list 3 times to create a seamless infinite loop */}
         {[...techs, ...techs, ...techs].map((tech, i) => (
           <div key={i} className="mx-8 flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-default">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
              <span className="font-display font-bold text-lg md:text-xl text-white tracking-widest">{tech}</span>
           </div>
         ))}
      </div>
    </div>
  );
}