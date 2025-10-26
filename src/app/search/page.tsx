"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Video = {
  _id: string;
  Titel: string;
  ImgUrl: string;
  Category: string;
  Duration: string;
  Views: number;
  Models: string;
};

function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  useEffect(() => {
    async function fetchSearchResults() {
      if (!searchQuery) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/searchData?search=${encodeURIComponent(searchQuery)}`);
        
        const data = await response.json();
        setVideos(data.data || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '2.5rem', height: '2.5rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0 small">Searching for &quot;{searchQuery}&quot;</p>
        </div>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="container py-5 text-center">
        <p>Please enter a search term</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 px-2 px-sm-3 px-md-4 text-center">
      <h1 className="h4 text-white mb-4">Search Results for: {searchQuery}</h1>
      
      {videos.length === 0 ? (
        <p>No videos found matching your search.</p>
      ) : (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-sm-3">
          {videos.map((video) => (
            <div key={video._id} className="col">
              <Link
                href={`/video/${video._id}/${video.Titel?.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/--+/g, '-')}`}
                className="text-decoration-none"
              >
                <div className="card h-100 bg-dark text-white rounded-3 overflow-hidden hover-shadow">
                  <div className="position-relative" style={{ paddingBottom: "56.25%" }}>
                    <img
                      src={video.ImgUrl}
                      alt={video.Titel}
                      className="position-absolute w-100 h-100 object-cover"
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
                      {video.Views ? `${video.Views.toLocaleString()} views` : "No views"}
                      {video.Category && ` • ${video.Category}`}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading search results...</span>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}