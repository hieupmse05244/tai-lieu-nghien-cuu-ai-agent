'use client';

import React from 'react';

interface MediaViewerProps {
  uri: string;
  type: 'image' | 'video';
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ uri, type }) => {
  // uri here is S3 URI, in production we'd use a temporary signed URL from BE
  const displayUrl = `/api/v1/resources/view/${uri}`; // Backend proxy or redirect

  if (type === 'image') {
    return (
      <div className="flex justify-center items-center w-full h-full p-4 bg-gray-950/50 rounded-xl">
        <img 
          src={displayUrl} 
          alt="Resource preview" 
          className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border border-gray-800"
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-full p-4 bg-gray-950/50 rounded-xl">
      <video 
        controls 
        className="max-w-full max-h-full rounded-lg shadow-2xl border border-gray-800"
      >
        <source src={displayUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
