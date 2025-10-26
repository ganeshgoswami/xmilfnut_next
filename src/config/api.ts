// Use a default API base URL if environment variable is not set
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

export const API_ENDPOINTS = {
  CATEGORIES: `${API_BASE_URL}/categoryFirstData`,
  
 CATEGORY_VIDEOS: (slug: string, page: number = 1) => {
  // Remove accidental "&page=1" or similar from the slug
  const cleanSlug = slug.split('&')[0];

  // Convert slug to Title Case (e.g., "big-ass" → "Big-Ass")
  const category = cleanSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('-');

  // Build URL
  const url = new URL(`${API_BASE_URL}/seprateCate`);
  url.searchParams.append('category', category);
  url.searchParams.append('page', page.toString());

  return url.toString();
},

  MODEL_VIDEOS: (model: string, page: number = 1) => {
    const url = new URL(`${API_BASE_URL}/findOneModelStar`);
    url.searchParams.append('model', model);
    url.searchParams.append('page', page.toString());
    return url.toString();
  },
  
};
