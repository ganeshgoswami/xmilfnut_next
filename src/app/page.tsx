import { Metadata } from 'next';
import Link from 'next/link';

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'XMilfNut - HD Adult Videos & Premium Porn Content',
  description: 'Watch the best HD adult videos and premium porn content. Enjoy a vast collection of high-quality porn videos, including categories like MILF, teen, amateur, and more. Daily updates with the latest content.',
  keywords: 'sex video, vipwank, hqporner, xnxx, porn, adult videos',
  authors: [{ name: 'xmilfnut' }],
  // publisher: 'xmilfnut',
  alternates: {
    canonical: 'https://xmilfnut.com/',
  },
  publisher: 'xmilfnut',
  openGraph: {
    title: 'XMilfNut - HD Adult Videos & Premium Porn Content',
    description: 'Watch the best HD adult videos and premium porn content. Daily updates with the latest content.',
    url: 'https://xmilfnut.com/',
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XMilfNut - HD Adult Videos & Premium Porn Content',
    description: 'Watch the best HD adult videos and premium porn content. Daily updates with the latest content.',
  },
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  //   yandex: 'YANDEX_VERIFICATION_CODE',
  // },
};

type Item = {
  _id: string;
  ImgUrl?: string;
  Titel?: string;
  Category?: string;
  Videourl?: string;
  Duration?: string;
  Models?: string;
  Views?: number;
};

const ITEMS_PER_PAGE = 16;

async function getData(page: number = 1) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    let base = API_BASE_URL;

  const url = `${base?.replace(/\/$/, "")}/alldata?page=${page}&limit=${ITEMS_PER_PAGE}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    
    return { data: [], total: 0 };
  }
  
  const json = await res.json();
 
  return {
    data: Array.isArray(json?.data) ? json.data : [],
    total: json?.TotalCount || 0
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
   const resolvedParams = await searchParams; // ✅ Await before use
  const currentPage =
    typeof resolvedParams?.page === 'string'
      ? parseInt(resolvedParams.page)
      : 1;

  const { data: items, total } = await getData(currentPage);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="container-fluid py-3 px-2 px-sm-3 px-md-4 text-center">
      <h1 className='h4 mb-3 text-center fs-4 fs-md-4'>Free Porn or sex Videos</h1>
      <div className="row g-2 g-sm-3">
        {items.length > 0 ? (
          items.map((it: Item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={it._id}>
              <div className="card h-100 bg-dark text-white rounded-3 overflow-hidden">
                {it.ImgUrl ? (
                  <Link href={`/video/${it._id}/${it.Titel?.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/--+/g, '-')}`} className="text-decoration-none">
                    <div className="position-relative w-100 overflow-hidden rounded-3" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={it.ImgUrl}
                        alt={it.Titel || "Video"}
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                      />
                      <span className="position-absolute bottom-0 start-0 m-2 badge bg-dark bg-opacity-75 d-flex align-items-center gap-1">
                        <i className="bi bi-eye"></i>
                        {typeof it.Views === "number" ? it.Views : 0}
                      </span>
                      {it.Duration ? (
                        <span className="position-absolute bottom-0 end-0 m-2 badge bg-dark bg-opacity-75 d-flex align-items-center gap-1">
                          <i className="bi bi-clock"></i>
                          {it.Duration}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ) : null}
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title mb-2 text-truncate" title={it.Titel}>{it.Titel || "Untitled"}</h6>
                  <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                    <Link href={`/stars/${it.Models?.toLowerCase().replace(/\s+/g, '-')}`} className="d-flex align-items-center gap-2 small text-secondary">
                      <i className="bi bi-person-fill"></i>
                      <span className="text-truncate" title={it.Models}>{it.Models || "Unknown"}</span>
                    </Link>
                    <Link   href={{
                  pathname: `/category/${it.Category?.toLowerCase().replace(/\s+/g, '-')}`,
                  query: { original: it.Category }
                }}
                as={`/category/${it.Category?.toLowerCase().replace(/\s+/g, '-')}`}>
                    {it.Category ? <span className="badge bg-secondary">{it.Category}</span> : null}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No videos found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                <Link 
                  href={`/?page=${currentPage - 1}`}
                  className="page-link bg-dark text-white border-light"
                  style={{
                    minWidth: '80px',
                    textAlign: 'center',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    opacity: currentPage <= 1 ? '0.6' : '1',
                    pointerEvents: currentPage <= 1 ? 'none' : 'auto'
                  }}
                  aria-disabled={currentPage <= 1}
                >
                  Previous
                </Link>
              </li>
              
              <div className="d-flex align-items-center mx-2">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }
                  
                  return (
                    <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                      <Link 
                        href={`/?page=${pageNum}`}
                        className="page-link bg-dark text-white border-dark mx-1"
                        style={{
                          minWidth: '36px',
                          textAlign: 'center',
                          border: '1px solid #444',
                          borderRadius: '4px',
                        }}
                      >
                        {pageNum}
                      </Link>
                    </li>
                  );
                })}
              </div>
              
              <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                <Link 
                  href={`/?page=${currentPage + 1}`}
                  className="page-link bg-dark text-white border-light"
                  style={{
                    minWidth: '80px',
                    textAlign: 'center',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    opacity: currentPage >= totalPages ? '0.6' : '1',
                    pointerEvents: currentPage >= totalPages ? 'none' : 'auto'
                  }}
                  aria-disabled={currentPage >= totalPages}
                >
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
