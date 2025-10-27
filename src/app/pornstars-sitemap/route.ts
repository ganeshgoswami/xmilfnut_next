import { MetadataRoute } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = 'https://xmilfnut.com';

async function fetchPornstars(): Promise<Array<{ Name: string }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/pornstars`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching pornstars for sitemap:', error);
    return [];
  }
}

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];
  const pornstars = await fetchPornstars();

  // Static routes for pornstars sitemap
  const staticRoutes = [
    { url: BASE_URL, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${BASE_URL}/stars`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
  ];

  // Dynamic routes for pornstars
  const pornstarRoutes = pornstars.map((star) => ({
    url: `${BASE_URL}/stars/${encodeURIComponent(star.Name.replace(/\s+/g, '-').toLowerCase())}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...staticRoutes, ...pornstarRoutes].map(entry => `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${entry.lastModified}</lastmod>
      <changefreq>${entry.changeFrequency}</changefreq>
      <priority>${entry.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
