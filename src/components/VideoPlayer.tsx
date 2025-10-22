'use client';

import React from 'react';

interface VideoPlayerProps {
  imageUrl: string;
  videoUrl: string;
  title: string;
}

export default function VideoPlayer({ imageUrl, videoUrl, title }: VideoPlayerProps) {
  const handleClick = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="position-relative mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="ratio ratio-16x9">
        <img 
          src={imageUrl} 
          alt={title || 'Video Thumbnail'}
          className="w-100 h-100 object-fit-cover rounded"
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
        />
        <div 
          className="position-absolute top-50 start-50 translate-middle"
          style={{ cursor: 'pointer', zIndex: 2 }}
          onClick={handleClick}
        >
          <div 
            className="d-flex align-items-center justify-content-center" 
            style={{ 
              width: '80px', 
              height: '80px', 
              transition: 'transform 0.2s',
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}
          >
            <i className="bi bi-play-fill text-white" style={{ fontSize: '3rem' }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
