import { getSiteData } from '@/lib/db';

export default async function Portfolio() {
  const data = await getSiteData();
  const projects = data.portfolio || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Our Work</h1>
      <p className="text-muted text-xl mb-16">
        Real projects built for real clients.
      </p>

      {projects.length === 0 ? (
        <div className="text-gray-500 text-center py-20">No projects loaded yet. Check Admin Panel.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-surface rounded-xl overflow-hidden border border-gray-800 hover:border-primary transition-all group">
              <div className="h-48 bg-slate-800 w-full relative">
                {project.image ? (
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">{project.category}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{project.title}</h3>
                <p className="text-muted text-sm mb-4">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}