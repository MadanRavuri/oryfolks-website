import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  preload?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
  preload = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src,
    alt,
    className: `${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    width,
    height,
    loading,
    decoding: 'async',
    onLoad: () => setIsLoaded(true),
    style: {
      contentVisibility: 'auto',
      containIntrinsicSize: width && height ? `${width}px ${height}px` : 'auto'
    }
  };

  // Add fetchpriority as a custom attribute
  if (fetchPriority !== 'auto') {
    (imageProps as any).fetchpriority = fetchPriority;
  }

  return (
    <>
      {preload && (
        <link
          rel="preload"
          as="image"
          href={src}
          type={src.endsWith('.webp') ? 'image/webp' : 'image/jpeg'}
        />
      )}
      <img {...imageProps} />
    </>
  );
};

export default OptimizedImage;
