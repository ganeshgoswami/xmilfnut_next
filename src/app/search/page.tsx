// src/app/searchData/page.tsx
"use client";

import { useEffect, useState } from 'react';
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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('Search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const [results, setResults] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) return;
      
      setIsLoading(true);
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.badwap.fun/api'}/searchData?Search=${encodeURIComponent(searchQuery)}&page=${page}`;
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setResults(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, page]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Searching for &quot;{searchQuery}&quot;...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-2 px-sm-3 py-3">
      <h1 className="h5 mb-3 mb-md-4 text-center text-md-start">
        Search: <span className="text-primary">&quot;{searchQuery}&quot;</span>
      </h1>
      
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" style={{ width: '2.5rem', height: '2.5rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0 small">Searching for &quot;{searchQuery}&quot;</p>
          </div>
        </div>
      ) : results.length > 0 ? (
            <div className="container-fluid py-3 px-2 px-sm-3 px-md-4 text-center">
      <h1 className="h4 text-white mb-4">{searchQuery} Videos</h1>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-2 g-sm-3">
        {results.map((video) => (
          <div key={video._id} className="col">
            <Link
              href={`/video/${video._id}?${video.Titel.replace(/\s+/g, '-').toLowerCase()}`}
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
                   
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
      ) : (
        <div className="text-center py-5">
          <div className="mb-3 text-muted">
            <i className="bi bi-search" style={{ fontSize: '2.5rem' }}></i>
          </div>
          <p className="mb-2">No results found for</p>
          <p className="text-muted mb-4">"{searchQuery}"</p>
          <Link href="/" className="btn btn-sm btn-primary px-3">
            <i className="bi bi-house-door me-1"></i>Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}