import { getSiteData } from '@/lib/db';

export default async function sitemap() {
  const data = await getSiteData();
  const baseUrl = 'https://seranex.org';

  // Static Routes
  const routes = [
    '',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));

  // Dynamic Blog Routes
  const blogRoutes = (data.blogs || []).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic Portfolio Routes
  const projectRoutes = (data.portfolio || []).map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...blogRoutes, ...projectRoutes];
}