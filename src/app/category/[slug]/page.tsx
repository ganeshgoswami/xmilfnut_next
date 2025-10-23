  import { Metadata } from 'next';
  import Link from "next/link";
  import { Video } from "@/types/video";
  import { API_ENDPOINTS } from "@/config/api";

  // Generate metadata dynamically based on category
  export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    // Convert URL slug to display name (title case)
    const displayName = params.slug
      .replace(/-/g, ' ')
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
     
    const title = `${displayName} Porn Videos | XMilfNut - HD ${displayName} Sex Clips`;
    const description = `Watch the best ${displayName} porn videos in HD quality. Enjoy a huge collection of ${displayName} sex clips, updated daily with new content.`;
    
    return {
      title: title,
      description: description,
      keywords: `${displayName} porn, ${displayName} xxxnx, ${displayName} videos, free ${displayName} porn, xxxvide ${displayName}, ${displayName} clips, ${displayName} fucking, ${displayName} www xxx`,
      authors: [{ name: 'xmilfnut' }],
      alternates: {
        canonical: `https://xmilfnut.com/category/${params.slug}`,
      },
      openGraph: {
        title: title,
        description: description,
        url: `https://xmilfnut.com/category/${params.slug}`,
        siteName: 'xmilfnut',
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
      },
    
    };
  }

  async function getVideosByCategory(
    slug: string, 
    page: number = 1,
    originalCategory?: string
  ): Promise<{
    videos: Video[];
    categoryName: string;
    displayName: string;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      // Format the slug for display (title case)
      const displayName = slug
        .replace(/-/g, ' ')
        .replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      
      // Use the provided original category or the display name for the API
      const apiCategory = originalCategory || displayName;
    
      const apiUrl = API_ENDPOINTS.CATEGORY_VIDEOS(apiCategory, page);

      const response = await fetch(apiUrl, {
        next: { revalidate: 3600 },
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      });

      // Read text to safely handle non-JSON responses
      const text = await response.text();
      let data: {
        data?: Video[];
        total?: number;
        currentPage?: number;
        totalPages?: number;
        category?: string;
        displayName?: string;
      };

      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Invalid JSON from API:", text.slice(0, 200));
        throw new Error("API returned invalid JSON/HTML");
      }

     if (!response.ok || response.status !== 202) {
  console.error("API Error:", {
    status: response.status,
    statusText: response.statusText,
    data,
  });
  return {
    videos: [],
    categoryName: displayName,
    displayName,
    currentPage: 1,
    totalPages: 1,
  };
}

      return {
        videos: Array.isArray(data.data) ? data.data : [],
        categoryName: apiCategory, // Use the original case for the API
        displayName, // Use the formatted name for display
        currentPage: data.currentPage || page,
        totalPages: data.totalPages || 1,
      };
    } catch (error) {
      console.error("Error in getVideosByCategory:", error);
      return {
        videos: [],
        categoryName: originalCategory || slug,
        displayName: slug.replace(/-/g, ' '),
        currentPage: 1,
        totalPages: 1,
      };
    }
  }

  export default async function CategoryPage({
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
    const originalCategory = searchParams.original as string;
    const { videos, categoryName, displayName, currentPage, totalPages } = await getVideosByCategory(
      params.slug, 
      page,
      originalCategory
    );

    if (videos.length === 0) {
      return (
        <div className="container py-4 text-center">
          <h1 className="h4 text-white mb-3">
            No videos found in {categoryName}
          </h1>
          <Link href="/categories" className="btn btn-primary">
            Back to Categories
          </Link>
        </div>
      );
    }

    return (
      <div className="container-fluid py-3 px-2 px-sm-3 px-md-4 text-center">
        <h1 className="h4 text-white mb-4">{categoryName} Porn Videos</h1>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-sm-3">
          {videos.map((video) => (
            <div key={video._id} className="col">
              <Link
                href={`/video/${video._id}/${video.Titel?.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/--+/g, '-')}`}
                className="text-decoration-none"
              >
                <div className="card h-100 bg-dark text-white rounded-3 overflow-hidden hover-shadow">
                  <div className="position-relative" style={{ paddingBottom: "56.25%" }}>
                    <div
                      className="position-absolute w-100 h-100"
                      style={{
                        backgroundImage: `url(${video.ImgUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "transform 0.3s ease",
                      }}
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
                    <div
                      className="text-truncate small text-white"
                      title={video.Titel}
                    >
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${page === currentPage ? "active" : ""}`}
                >
                  <Link
                    href={`/category/${params.slug}?page=${page}`}
                    className="page-link"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }
