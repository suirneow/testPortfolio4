import { useState } from 'react';
import { convertDropboxUrl } from '../data/loader';

interface Props {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function LazyImage({ src, alt, className = '', aspectRatio = '4/3' }: Props) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`bg-[var(--color-border-light)] flex items-center justify-center ${className}`}
        style={{ aspectRatio }}
      >
        <span className="font-outfit text-[9px] font-light tracking-wider text-[var(--color-text-lighter)] uppercase">
          no image
        </span>
      </div>
    );
  }

  const imageUrl = convertDropboxUrl(src);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-[var(--color-border-light)] animate-pulse" />
      )}
    </div>
  );
}
