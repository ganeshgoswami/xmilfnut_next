import { MetadataRoute } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = 'https://xmilfnut.com';

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}>

// Generate sitemap index
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return [
    {
      url: `${BASE_URL}/pornstars-sitemap.xml`,
      lastModified: currentDate,
    },
    {
      url: `${BASE_URL}/categories-sitemap.xml`,
      lastModified: currentDate,
    },
  ];
}

// Helper function to fetch data from API
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

async function fetchCategories(): Promise<Array<{ slug: string }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}

// Pornstars sitemap
export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];

  // Fetch data in parallel
  const [pornstars, categories] = await Promise.all([
    fetchPornstars(),
    fetchCategories()
  ]);

  // Static routes
  const staticRoutes = [
    { url: BASE_URL, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${BASE_URL}/stars`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Dynamic routes for pornstars
  const pornstarRoutes = pornstars.map((star) => ({
    url: `${BASE_URL}/stars/${encodeURIComponent(star.Name.replace(/\s+/g, '-').toLowerCase())}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic routes for categories
  const categoryRoutes = categories.map((category) => ({
    url: `${BASE_URL}/category/${encodeURIComponent(category.slug)}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.6,
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

// Categories sitemap
export async function GET2() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const categories = await fetchCategories();
  
  const categoryRoutes = categories.map((category) => ({
    url: `${BASE_URL}/category/${encodeURIComponent(category.slug)}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categoryRoutes.map(entry => `
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
