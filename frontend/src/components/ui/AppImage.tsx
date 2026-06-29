import React, { useState, useCallback, useMemo, memo } from 'react';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  unoptimized?: boolean;
  [key: string]: any;
}

const AppImage = memo(function AppImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  onClick,
  fallbackSrc = '/assets/images/no_image.png',
  loading = 'lazy',
  ...props
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    setIsLoading(false);
  }, [hasError, imageSrc, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const imageClassName = useMemo(() => {
    const classes = [className];
    if (isLoading) classes.push('bg-gray-200');
    if (onClick) classes.push('cursor-pointer hover:opacity-90 transition-opacity duration-200');
    if (fill) classes.push('w-full h-full object-cover');
    return classes.filter(Boolean).join(' ');
  }, [className, isLoading, onClick, fill]);

  if (fill) {
    return (
      <div className="relative w-full h-full">
        <img
          src={imageSrc}
          alt={alt}
          className={imageClassName}
          onError={handleError}
          onLoad={handleLoad}
          onClick={onClick}
          loading={priority ? 'eager' : loading}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={imageClassName}
      onError={handleError}
      onLoad={handleLoad}
      onClick={onClick}
      loading={priority ? 'eager' : loading}
      {...props}
    />
  );
});

AppImage.displayName = 'AppImage';

export default AppImage;