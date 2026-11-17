import { useState } from 'react';
import { Coffee } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function SmartImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  loading = 'lazy',
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F4F1EC] text-[#5C341E] p-6 text-center border border-[#E7E0D6] ${className}`}
        role="img"
        aria-label={alt}
      >
        <Coffee className="w-7 h-7 mb-2 opacity-70" strokeWidth={1.5} />
        <span className="font-serif text-sm font-medium text-stone-800">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
