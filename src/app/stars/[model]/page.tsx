import { Metadata } from 'next';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/config/api';

// Generate metadata dynamically based on model
export async function generateMetadata({ params }: { params: { model: string } }): Promise<Metadata> {
  const modelName = params.model.replace(/-/g, ' ');
  const title = `${modelName} - Porn Videos & HD Sex Clips | XMilfNut`;
  const description = `Watch the beauty ${modelName} porn videos in HD quality. Exclusive collection of ${modelName}'s best sex scenes . Best Porn Videos ${modelName} here  , updated daily.`;
  
  return {
    title: title,
    description: description,
    keywords: `${modelName} porn, ${modelName} sex, ${modelName} videos, ${modelName} hd, ${modelName} xxx, ${modelName} fuck, ${modelName} naked, ${modelName} hardcore, ${modelName} anal, ${modelName} blowjob`,
    authors: [{ name: 'xmilfnut' }],
    alternates: {
      canonical: `https://xmilfnut.com/stars/${params.model}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://xmilfnut.com/stars/${params.model}`,
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
  createdAt: string;
  updatedAt: string;
};

// Function to convert URL-friendly name to display name (e.g., 'lisa-ann' -> 'Lisa Ann')
function formatModelName(urlName: string): string {
  return urlName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

async function getModelVideos(urlModelName: string, page: number = 1): Promise<{
  videos: Video[];
  modelName: string;
  displayName: string;
  currentPage: number;
  totalPages: number;
}> {
  try {
    // Convert URL name to display name (e.g., 'lisa-ann' -> 'Lisa Ann')
    const displayName = formatModelName(urlModelName);
    
    // Use the display name for the API call
    const response = await fetch(API_ENDPOINTS.MODEL_VIDEOS(displayName, page), {
      next: { revalidate: 3600 },
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });

    if (!response.ok) {
      return {
        videos: [],
        modelName: urlModelName,
        displayName: displayName,
        currentPage: 1,
        totalPages: 1,
      };
    }

    const data = await response.json();
    
    return {
      videos: Array.isArray(data.data) ? data.data : [],
      modelName: urlModelName, // Keep the original URL-friendly name for links
      displayName: displayName, // Use the formatted name for display
      currentPage: data.currentPage || page,
      totalPages: data.totalPages || 1,
    };
  } catch (error) {
    console.error('Error fetching model videos:', error);
    return {
      videos: [],
      modelName: urlModelName,
      displayName: formatModelName(urlModelName),
      currentPage: 1,
      totalPages: 1,
    };
  }
}

export default async function ModelPage({
  params,
  searchParams,
}: {
  params: { model: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  const { videos, modelName, displayName, currentPage, totalPages } = await getModelVideos(
    params.model,
    page
  );

  // If no videos found, show a message
  if (videos.length === 0) {
    return (
      <div className="container py-4 text-center">
        <h1 className="h4 text-white mb-3">
          No videos found for {displayName}
        </h1>
        <Link href="/stars" className="btn btn-primary">
          Back to Pornstars
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 px-2 px-sm-3 px-md-4 text-center">
      <h1 className="h4 text-white mb-4">{displayName} Porn Videos</h1>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-sm-3">
        {videos.map((video) => (
          <div key={video._id} className="col">
            <Link 
              href={`/video/${video._id}/${video.Titel?.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/--+/g, '-')}`}
              className="text-decoration-none"
            >
              <div className="card h-100 bg-dark text-white rounded-3 overflow-hidden hover-shadow">
                <div className="position-relative" style={{ paddingBottom: '56.25%' }}>
                  <div
                    className="position-absolute w-100 h-100"
                    style={{
                      backgroundImage: `url(${video.ImgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  <div className="position-absolute bottom-0 w-100 d-flex justify-content-between px-2">
                    {video.Views > 0 && (
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
                      : 'No views'}{' '}
                    •{' '}
                    {video.createdAt
                      ? new Date(video.createdAt).toLocaleDateString()
                      : ''}
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
                className={`page-item ${page === currentPage ? 'active' : ''}`}
              >
                <Link
                  href={`/stars/${params.model}?page=${page}`}
                  className="page-link"
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
        {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": modelName,
            "url": `https://xmilfnut.com/stars/${params.model}`,
            "jobTitle": "Adult Performer",
            "description": `Watch ${modelName}'s exclusive adult videos in HD quality.`,
            "image": videos[0]?.ImgUrl,
            "performerIn": {
              "@type": "ItemList",
              "itemListElement": videos.map((video, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "VideoObject",
                  "name": video.Titel,
                  "description": `Watch ${modelName} in "${video.Titel}"`,
                  "thumbnailUrl": video.ImgUrl,
                  "uploadDate": video.createdAt,
                  "duration": video.Duration,
                  "contentUrl": `https://xmilfnut.com/video/${video._id}`,
                  "genre": video.Category
                }
              }))
            }
          })
        }}
      />
    </div>
  );
}
