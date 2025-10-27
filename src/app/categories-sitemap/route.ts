import { MetadataRoute } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = 'https://xmilfnut.com';

function formatCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
    .join('-');
}

async function fetchCategories(): Promise<Array<{ slug: string }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/allCategorys`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return Array.isArray(data?.data) 
      ? data.data.map((category: string) => ({
          slug: formatCategorySlug(category)
        })) 
      : [];
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];
  const categories = await fetchCategories();

  // Static routes for categories sitemap
  const staticRoutes = [
    { url: `${BASE_URL}`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  // Dynamic routes for categories
  const categoryRoutes = categories.map((category) => ({
    url: `${BASE_URL}/category/${encodeURIComponent(category.slug)}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...staticRoutes, ...categoryRoutes].map(entry => `
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
