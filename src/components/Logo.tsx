import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'simple' | 'icon';
  light?: boolean;
}

export default function Logo({ className = '', variant = 'full', light = false }: LogoProps) {
  const terracotta = '#D66C3E'; 
  const softTeal = '#61C2D4';   

  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <img 
          src="/favicon.png" 
          alt="The Newlist Foundation Icon" 
          className="w-10 h-10 object-contain rounded-xl hover:scale-105 transition-transform duration-300 border border-[#FAF9F5]/10 shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  if (variant === 'simple') {
    return (
      <div className={`relative flex items-center shrink-0 gap-2.5 ${className}`}>
        <img 
          src="/favicon.png" 
          alt="The Newlist Foundation Logo" 
          className="h-8 w-auto object-contain rounded-lg shadow-sm"
          referrerPolicy="no-referrer"
        />
        <span className={`font-serif font-extrabold tracking-tight text-sm ${light ? 'text-[#FAF9F5]' : 'text-[#13222F]'}`}>
          Newlist
        </span>
      </div>
    );
  }

  // Full brand lockup showing the high fidelity uploaded logo image
  return (
    <div className={`flex items-center shrink-0 ${className}`}>
      <img 
        src="/logo.png" 
        alt="The Newlist Foundation" 
        className="h-10 md:h-12 w-auto object-contain rounded-xl shadow-sm border border-brand-slate-pale/25 bg-white/5 transition-transform duration-300 hover:scale-[1.01]"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

