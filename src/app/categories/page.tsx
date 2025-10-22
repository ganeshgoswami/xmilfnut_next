import { Metadata } from 'next';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/config/api';

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'Adult Video Categories | XMilfNut - Explore Porn Categories',
  description: 'Browse our extensive collection of adult video categories. Find your favorite porn categories including MILF, teen, amateur, anal, and more. HD quality videos updated daily.',
  keywords: 'porn categories, adult video categories, xxx categories, sex categories, porn genres, free porn categories, hd porn categories, ' +
             'MILF, teen, amateur, anal, blowjob, hardcore, lesbian, threesome, orgasm, fetish, BDSM, big tits, big ass, asian, ebony, latina',
  authors: [{ name: 'xmilfnut' }],
  alternates: {
    canonical: 'https://xmilfnut.com/categories',
  },
  openGraph: {
    title: 'Adult Video Categories | XMilfNut - Explore Porn Categories',
    description: 'Browse our extensive collection of adult video categories. Find your favorite porn categories in HD quality.',
    url: 'https://xmilfnut.com/categories',
    siteName: 'xmilfnut',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adult Video Categories | XMilfNut',
    description: 'Browse our extensive collection of adult video categories. Find your favorite porn categories in HD quality.',
  },
 
};
type Video = {
  _id: string;
  Titel: string;
  ImgUrl: string;
  Category: string;
  Videourl: string;
  Description: string;
  Duration: string;
  Models: string;
  Alt: string;
  Views: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

type CategoryItem = {
  category: string;
  firstItem: Video | null;
};

async function getCategoriesWithVideos(): Promise<CategoryItem[]> {
  try {
    const res = await fetch(API_ENDPOINTS.CATEGORIES, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    
    // The API returns an array of { category, firstItem } objects
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Error in getCategoriesWithVideos:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategoriesWithVideos();

  return (
    <div className="container-fluid py-3 px-2 px-sm-3 px-md-4">
     
      <h1 className="h4 mb-3 text-center fs-4 fs-md-4">18+ Adult Video Categories</h1>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-sm-3">
        {categories.map((category) => (
          <div key={category.category} className="col">
            <div className="card h-100 bg-dark text-white rounded-3 overflow-hidden">
              <Link 
                href={{
                  pathname: `/category/${category.category.toLowerCase().replace(/\s+/g, '-')}`,
                  query: { original: category.category }
                }}
                as={`/category/${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-decoration-none"
              >
                <div className="position-relative w-100 overflow-hidden rounded-top-3" style={{ aspectRatio: "16/9" }}>
                  {category.firstItem?.ImgUrl ? (
                    <div className="w-100 h-100" style={{ 
                      backgroundImage: `url(${category.firstItem.ImgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#000',
                      color: 'transparent' // Hide any text content
                    }}>
                      &nbsp;
                    </div>
                  ) : (
                    <div className="w-100 h-100 bg-black" style={{ color: 'transparent' }}>
                      .
                    </div>
                  )}
                </div>
                <div className="card-body p-2 text-center bg-dark">
                  <div className="text-truncate small text-white">{category.category}</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
