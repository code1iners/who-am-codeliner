'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallback?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  fallback = '/images/placeholder.svg',
  ...props
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};
