import React, { useState } from 'react';

interface AestheticImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export default function AestheticImage({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '', 
  imgClassName = '' 
}: AestheticImageProps) {
  const [hasError, setHasError] = useState(false);

  // Generates unique, elegant brand-colored fallback gradients dynamically
  const getGradientForSrc = (path: string) => {
    const p = path.toLowerCase();
    if (p.includes('hero')) {
      return 'from-[#DF5726]/15 via-[#1F6C80]/10 to-[#162C4E]/40';
    }
    if (p.includes('community') || p.includes('collaborat') || p.includes('co-work') || p.includes('work')) {
      return 'from-[#1F6C80]/25 via-[#839BA7]/20 to-[#162C4E]/35';
    }
    if (p.includes('infra') || p.includes('sustain') || p.includes('energy') || p.includes('trans')) {
      return 'from-[#DF5726]/12 via-[#1F6C80]/15 to-[#162C4E]/25';
    }
    return 'from-[#162C4E]/20 via-[#839BA7]/15 to-brand-orange/10';
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-tr ${getGradientForSrc(src)} ${className}`}>
      {/* Permanent visual blueprint grid structure */}
      <div className="absolute inset-0 bg-mesh-grid opacity-15 pointer-events-none"></div>
      
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover relative z-10 transition-all duration-700 hover:scale-[1.03] ${imgClassName}`}
          referrerPolicy="no-referrer"
        />
      ) : fallbackSrc ? (
        <img
          src={fallbackSrc}
          alt={alt}
          className={`w-full h-full object-cover relative z-10 transition-all duration-700 hover:scale-[1.03] ${imgClassName}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Fully engineered visual fallback card to ensure pristine layout */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 space-y-2">
          <span className="text-xl md:text-2xl text-brand-orange/40 font-serif font-black select-none">
            ❖
          </span>
          <p className="text-[9px] uppercase tracking-wider text-brand-indigo/50 font-ui font-extrabold max-w-[80%] leading-snug">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
}
