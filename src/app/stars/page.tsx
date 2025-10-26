import { API_ENDPOINTS } from '@/config/api';
import { Metadata } from 'next';
import Link from 'next/link';

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'Popular Pornstars | XMilfNut - HD Porn Star Videos & Profiles',
  description: 'Browse our collection of the hottest pornstars in the industry. Watch exclusive HD videos, view profiles, and discover new favorite adult performers. Daily updates with new content.',
  keywords: 'pornstars, adult performers, porn actresses, HD porn stars, xxx models, hottest pornstars, adult film stars, ' +
             'MILF pornstars, teen models, amateur girls, anal queens, blowjob experts, hardcore actresses',
  authors: [{ name: 'xmilfnut' }],
  alternates: {
    canonical: 'https://xmilfnut.com/stars',
  },
  publisher: 'xmilfnut',
  openGraph: {
    title: 'Popular Pornstars | XMilfNut - HD Porn Star Videos & Profiles',
    description: 'Discover the hottest pornstars in HD quality. Watch exclusive videos and explore detailed profiles of your favorite adult performers.',
    url: 'https://xmilfnut.com/stars',
    siteName: 'xmilfnut',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Popular Pornstars | XMilfNut',
    description: 'Discover the hottest pornstars in HD quality. Watch exclusive videos and explore detailed profiles.',
  },
};

export const revalidate = 3600;

type Pornstar = {
  _id: string;
  Name: string;
  Gender?: string;
  PImage?: string;
  TotalVideos: number;
};


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPornstars(): Promise<Pornstar[]> {
  try {
    const res = await fetch(API_BASE_URL + '/pornstars', {
      next: { revalidate: 3600 }, 
      
    });
    if (!res.ok) {
      console.error(`Failed to fetch pornstars: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error('Error fetching pornstars:', error);
    return [];
  }
}

export default async function StarsPage() {
  const items = await getPornstars();

  return (
    <div className="container-fluid py-3 px-2 px-sm-3 px-md-4 text-center">
      <h1 className="h4 text-white mb-3">Popular Pornstars hot Picture</h1>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-sm-3">
        {items.map((it) => (
          <div className="col" key={it._id}>
            <Link href={`/stars/${it.Name.replace(/\s+/g, '-').toLowerCase()}`} className="text-decoration-none">
              <div className="card h-100 bg-dark text-white rounded-3 overflow-hidden hover-shadow">
                <div
                  className="position-relative w-100 overflow-hidden rounded-top-3"
                  style={{ aspectRatio: "1/1.4" }}
                >
                  {it.PImage ? (
                    <img
                      src={it.PImage}
                      alt={it.Name}
                      className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                      style={{ transition: 'transform 0.3s ease' }}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-secondary bg-opacity-25">
                      <i className="bi bi-person fs-1"></i>
                    </div>
                  )}
                </div>
                <div className="card-body d-flex flex-column py-2">
                  <h6 className="card-title mb-0 text-truncate" title={it.Name}>
                    {it.Name}
                  </h6>
                  
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
