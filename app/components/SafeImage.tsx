'use client';

import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export default function SafeImage({ 
  src, 
  alt, 
  width = 500, 
  height = 500, 
  className = '',
  fill = false  
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    // Fallback image jika error
    setImgSrc('/placeholder.jpg');
  };
  
  // Jika fill=true, gunakan div dengan background image
  if (fill) {
    return (
      <div 
        className={className}
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: width,
          height: height,
        }}
        role="img"
        aria-label={alt}
      />
    );
  }
  
  // Gunakan regular img tag untuk external images
  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}