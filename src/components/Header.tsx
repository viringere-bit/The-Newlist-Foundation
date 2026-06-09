import React, { useState } from 'react';
import { Menu, X, ArrowRight, Eye } from 'lucide-react';
import Logo from './Logo';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  accessibilityMode?: boolean;
  toggleAccessibility?: () => void;
}

export default function Header({ 
  activePage, 
  setActivePage,
  accessibilityMode = false,
  toggleAccessibility
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Nav Links defined in Sitemap
  const navItems = [
    { label: 'About', value: 'about' },
    { label: 'Our Work', value: 'work' },
    { label: 'Get Involved', value: 'involved' },
    { label: 'Resources', value: 'resources' },
    { label: 'News & Updates', value: 'news' },
    { label: 'Contact', value: 'contact' },
  ] as const;

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-midnight/90 backdrop-blur-md border-b border-brand-slate-pale/30 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Placement: Top left of the page, full colour version */}
        <button 
          onClick={() => handleNavClick('home')}
          className="hover:opacity-90 transition-opacity focus:outline-none"
          id="hdr-logo-btn"
        >
          <Logo variant="full" light={false} />
        </button>

        {/* Desktop Navigation Bar: Deep slate text with terracotta/teal interactions */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              id={`nav-btn-${item.value}`}
              className={`relative py-2 font-ui text-xs font-bold tracking-wider uppercase transition-all duration-300 focus:outline-none ${
                activePage === item.value
                  ? 'text-brand-indigo font-extrabold'
                  : 'text-brand-slate-dark hover:text-brand-orange'
              }`}
            >
              {item.label}
              {activePage === item.value && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-brand-orange rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop CTA: Terracotta Orange with hover Teal */}
        <div className="hidden lg:flex items-center gap-3">
          {toggleAccessibility && (
            <button
              onClick={toggleAccessibility}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 shadow-sm border cursor-pointer select-none ${
                accessibilityMode
                  ? 'bg-neutral-900 border-neutral-900 text-white hover:bg-black'
                  : 'bg-brand-indigo/5 hover:bg-brand-indigo/10 text-brand-indigo border-brand-indigo/15'
              }`}
              title="Toggle Large Fonts & High Contrast Readability Mode"
              id="accessibility-toggle-desktop"
            >
              <Eye className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              {accessibilityMode ? 'Readable Mode: ON' : 'Enhance Contrast'}
            </button>
          )}

          <button
            onClick={() => handleNavClick('involved')}
            id="hdr-cta-btn"
            className="flex items-center gap-2 bg-brand-orange hover:bg-brand-teal text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-350 hover:scale-[1.03] active:scale-[0.97] cursor-pointer origin-center"
          >
            Connect to Network
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          {toggleAccessibility && (
            <button
              onClick={toggleAccessibility}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                accessibilityMode
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-brand-indigo/5 text-brand-indigo border-brand-indigo/15'
              }`}
              title="Toggle Large Fonts & High Contrast Mode"
              id="accessibility-toggle-mobile"
            >
              <Eye className="w-3 h-3 text-brand-orange" />
              {accessibilityMode ? 'A++' : 'Contrast'}
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-charcoal p-2 hover:bg-white/30 rounded-lg transition-colors focus:outline-none"
            aria-label="Toggle Menu"
            id="hdr-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-brand-midnight/95 backdrop-blur-lg border-b border-brand-slate-pale/25 animate-in fade-in slide-in-from-top duration-300">
          <div className="px-6 py-8 flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                id={`mobile-nav-btn-${item.value}`}
                className={`text-left py-2 font-ui text-sm font-bold tracking-wider uppercase border-b border-brand-slate-pale/15 pb-3 ${
                  activePage === item.value
                    ? 'text-brand-orange font-extrabold'
                    : 'text-brand-indigo/80 hover:text-brand-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => handleNavClick('involved')}
              id="mobile-hdr-cta-btn"
              className="mt-4 flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-teal text-white py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
            >
              Connect to Network
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
