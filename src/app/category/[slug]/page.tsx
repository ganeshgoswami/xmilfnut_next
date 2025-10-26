import { Metadata } from 'next';
import Link from "next/link";
import { Video } from "@/types/video";
import Image from 'next/image';




// Generate metadata dynamically based on category
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
 
   const resolvedParams = await params; // ✅ await params before using

  if (!resolvedParams?.slug) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  
  const displayName = resolvedParams.slug;
  const title = `${displayName} Porn Videos | XMilfNut - HD ${displayName} Sex Clips`;
  const description = `Watch the best ${displayName} porn videos in HD quality. Enjoy a huge collection of ${displayName} sex clips, updated daily with new content.`;

  return {
    title,
    description,
    keywords: `${displayName} porn, ${displayName} xxxnx, ${displayName} videos, free ${displayName} porn, xxxvide ${displayName}, ${displayName} clips, ${displayName} fucking, ${displayName} www xxx`,
    authors: [{ name: 'xmilfnut' }],
    alternates: {
      canonical: `https://xmilfnut.com/category/${resolvedParams.slug}`,
    },
    publisher: 'xmilfnut',
    openGraph: {
      title,
      description,
      url: `https://xmilfnut.com/category/${resolvedParams.slug}`,
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
        'max-video-preview': 'large',
      }
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Convert kebab-case to Title Case (e.g., 'big-ass' -> 'Big Ass')
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Convert Title Case to kebab-case (e.g., 'Big Ass' -> 'big-ass')
function titleToSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-');
}

async function getVideosByCategory(
  slug: string, 
  page: number = 1
): Promise<{
  videos: Video[];
  categoryName: string;
  currentPage: number;
  totalPages: number;
  displaySlug: string;
}> {
  try {
    // Clean the slug and convert to title case for display
    const cleanSlug = slug.split('&')[0];
    const displayName = slugToTitle(cleanSlug);
    
    // Use the API endpoint helper which handles the conversion
    const apiUrl = new URL(`${API_BASE_URL}/seprateCate`);
    apiUrl.searchParams.append('category', displayName);
    apiUrl.searchParams.append('page', page.toString());
    
    const response = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle different possible response structures
    const videos = Array.isArray(data) ? data : 
                 Array.isArray(data?.data) ? data.data : [];

    // Get category name from the first video or use the display name
    const firstVideo = videos[0];
    const categoryName = firstVideo?.category || displayName;

    // Calculate pagination
    const itemsPerPage = 20;
    const totalItems = data.total || data.totalItems || videos.length;
    const totalPages = data.totalPages || Math.ceil(totalItems / itemsPerPage);

    return {
      videos,
      categoryName,
      currentPage: data.currentPage || data.page || page,
      totalPages,
      displaySlug: cleanSlug, // Return the clean slug in kebab-case
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return {
      videos: [],
      categoryName:slug ,
      currentPage: 1,
      totalPages: 1,
      displaySlug: slug, // Use the original slug for display
    };
  }
}

// Add this type definition for the component props
interface CategoryPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params; // ✅ await params before using

   const resolvedSearchParams  = await searchParams;

   const slug = resolvedParams.slug;
  const page =
    typeof resolvedSearchParams?.page === "string"
      ? parseInt(resolvedSearchParams.page) || 1
      : 1;
  
  // Fetch the category data
  const { videos, categoryName, currentPage, totalPages, displaySlug } = 
    await getVideosByCategory(resolvedParams.slug, page);


  if (!videos || videos.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>No videos found in this category</h2>
        <Link href="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 px-2 px-sm-3 px-md-4 text-center">
      <h1 className="h4 text-white mb-4">{categoryName} Porn Videos</h1>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-sm-3">
        {videos.map((video, index) => (
          <div key={video._id} className="col">
            <Link
              href={`/video/${video._id}/${video.Titel?.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/--+/g, '-')}`}
              className="text-decoration-none"
            >
              <div className="card h-100 bg-dark text-white rounded-3 overflow-hidden hover-shadow">
                <div className="position-relative" style={{ paddingBottom: "56.25%" }}>
                  <Image
                    src={video.ImgUrl || '/placeholder.jpg'}
                    alt={video.Titel || 'Video thumbnail'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 4}
                  />
                  <div className="position-absolute bottom-0 w-100 d-flex justify-content-between px-2">
                    {video.Views && (
                      <div className="d-flex align-items-center gap-1 small bg-dark bg-opacity-75 px-1 rounded">
                        <i className="bi bi-eye"></i>
                        <span>{video.Views.toLocaleString()}</span>
                      </div>
                    )}
                    {video.Duration && (
                      <div className="small bg-dark bg-opacity-75 px-1 rounded">
                        {video.Duration}
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-body p-2">
                  <div className="text-truncate small text-white" title={video.Titel}>
                    {video.Titel}
                  </div>
                  <div className="text-truncate xsmall text-muted">
                    {video.Views
                      ? `${video.Views.toLocaleString()} views`
                      : "No views"}{" "}
                    •{" "}
                    {video.createdAt
                      ? new Date(video.createdAt).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <li
                key={pageNum}
                className={`page-item ${pageNum === currentPage ? "active" : ""}`}
              >
                <Link
                  href={`/category/${slug}?page=${pageNum}`} // ✅ use resolved slug
                  className="page-link"
                >
                  {pageNum}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}