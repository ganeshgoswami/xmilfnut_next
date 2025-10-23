import React from "react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import "bootstrap-icons/font/bootstrap-icons.css";

type Video = {
  _id: string;
  Titel?: string;
  Description?: string;
  ImgUrl?: string;
  Videourl?: string;
  Views?: number;
  Duration?: string;
  Models?: string;
  Category?: string;
};

async function getVideo(id: string): Promise<Video | null> {
  try {
    const envBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim();
    let base = envBase;
    if (!base) {
      if (process.env.VERCEL_URL) {
        base = `https://${process.env.VERCEL_URL}/api`;
      } else {
        base = "https://api.badwap.fun/api";
      }
    }

    const url = `${base.replace(/\/$/, "")}/bigvideofind/${id}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch video");
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

async function getRelatedVideos(category: string): Promise<Video[]> {
  try {
    const envBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim();
    let base = envBase;

    if (!base) {
      if (process.env.VERCEL_URL) {
        base = `https://${process.env.VERCEL_URL}/api`;
      } else {
        base = "https://api.badwap.fun/api";
      }
    }
    const url = `${base.replace(
      /\/$/,
      ""
    )}/findrelatedData/${encodeURIComponent(category)}`;
  
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch related videos");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: { id: string; title: string } }
): Promise<Metadata> {
  const video = await getVideo(params.id);

  if (!video) {
    return {
      title: "Video Not Found | XMilfNut",
      description: "The requested video could not be found."
    };
  }

  // Generate clean title slug
  const titleSlug = (video.Titel || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");

  // Redirect if the title in URL doesn't match the actual video title
  if (params.title !== titleSlug) {
    redirect(`/video/${params.id}/${titleSlug}`);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xmilfnut.com";
  const canonicalUrl = `${siteUrl}/video/${params.id}/${titleSlug}`;
  const title = video.Titel || "Adult Video";
  const description = video.Description || "Watch this adult video on XMilfNut";

  const keywords = [
    title,
    video.Category,
    video.Models,
    "HD Porn",
    "Sex Videos",
    "Porn HD",
    "Free Porn",
    "XXX Videos",
    "Adult Videos",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: "XMilfNut" }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      siteName: "XMilfNut",
      locale: "en_US",
      type: "video.other",
      videos: [
        {
          url: video.Videourl || canonicalUrl,
          type: "video/mp4",
          width: "1280",
          height: "720",
        },
      ],
      images: [
        {
          url: video.ImgUrl || `${siteUrl}/default-thumbnail.jpg`,
          width: 1280,
          height: 720,
          alt: video.Titel || "Adult Video Thumbnail",
        },
      ],
    },
    twitter: {
      card: "player",
      title: title,
      description: description,
      images: [video.ImgUrl || `${siteUrl}/default-thumbnail.jpg`],
      players: [
        {
          playerUrl: canonicalUrl,
          streamUrl: canonicalUrl, // Required for Twitter Player Cards
          width: 1280,
          height: 720,
        },
      ],
    },
    other: {
      "og:video:type": "text/html",
      "og:video:width": "1280",
      "og:video:height": "720",
      "og:video:secure_url": video.Videourl || canonicalUrl,
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: { id: string; title: string };
}) {
  const video = await getVideo(params.id);

  if (!video) {
    return (
      <div className="container py-5 text-center">
        <h2>Video not found</h2>
        <Link href="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  // Get related videos based on the current video's category
  const relatedVideos = video.Category
    ? await getRelatedVideos(video.Category)
    : [];

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="h5 mb-4">
            {video.Titel}
          </h1>

          {/* Video Player Component */}
          <VideoPlayer
            imageUrl={video.ImgUrl || ""}
            videoUrl={video.Videourl || ""}
            title={video.Titel || "Video"}
          />

          {/* Video Info */}
          <div className="mb-4">
            <div className="d-flex flex-wrap justify-content-around align-items-center gap-4 mb-3">
              {video.Category && (
                <Link
                  href={{
                    pathname: `/category/${video.Category?.toLowerCase().replace(
                      /\s+/g,
                      "-"
                    )}`,
                    query: { original: video.Category },
                  }}
                  as={`/category/${video.Category.toLowerCase().replace(
                    /\s+/g,
                    "-"
                  )}`}
                  className="text-decoration-none"
                >
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                    {" "}
                    <i className="bi bi-tag-fill text-primary"></i>
                    {video.Category}
                  </span>
                </Link>
              )}
              {video.Views && (
                <div className="d-flex align-items-center gap-2 text-mutedctext-white">
                  <i className="bi bi-eye-fill"></i>
                  <span>{video.Views.toLocaleString()}</span>
                </div>
              )}
              {video.Duration && (
                <div className="d-flex align-items-center gap-2 text-mutedctext-white">
                  <i className="bi bi-clock-fill"></i>
                  <span>{video.Duration}</span>
                </div>
              )}
            </div>
            {video.Description && (
              <div className=" mb-4">
                <div className="">
                  <p className="card-text">
                    {" "}
                    <b>Description</b> : {video.Description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Videos */}
      {relatedVideos.length > 0 && (
        <div className="mt-5">
          <h3 className="h4 mb-4">More Like This</h3>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {relatedVideos.map((relatedVideo) => (
              <div key={relatedVideo._id} className="col">
                <div className="card h-100 bg-dark border-secondary">
                  <Link
                    href={`/video/${relatedVideo._id}/${(
                      relatedVideo.Titel || ""
                    )
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .trim()
                      .replace(/\s+/g, "-")
                      .replace(/--+/g, "-")}`}
                  >
                    <img
                      src={relatedVideo.ImgUrl || "/placeholder.jpg"}
                      className="card-img-top"
                      alt={relatedVideo.Titel}
                      style={{ aspectRatio: "16/9", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body">
                    <h6
                      className="card-title small text-white m-0"
                      style={{
                        fontSize: "0.75rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.2",
                        maxHeight: "2.4em",
                        minHeight: "2.4em",
                      }}
                    >
                      <Link
                        href={`/video/${relatedVideo._id}/${(
                          relatedVideo.Titel || ""
                        )
                          .toLowerCase()
                          .replace(/[^\w\s-]/g, "")
                          .trim()
                          .replace(/\s+/g, "-")
                          .replace(/--+/g, "-")}`}
                        className="text-decoration-none text-white"
                        title={relatedVideo.Titel}
                      >
                        {relatedVideo.Titel}
                      </Link>
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      {relatedVideo.Views && (
                        <small className="text-white-50">
                          <i className="bi bi-eye-fill"></i>{" "}
                          {relatedVideo.Views.toLocaleString()}{" "}
                        </small>
                      )}
                      {relatedVideo.Duration && (
                        <small className="text-white-50">
                          <i className="bi bi-clock-fill"></i>{" "}
                          {relatedVideo.Duration}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
