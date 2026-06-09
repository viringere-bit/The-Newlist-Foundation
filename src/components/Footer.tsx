import React from 'react';
import { Mail, Linkedin, Instagram, Youtube, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  
  const handleLinkClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/128484126' },
    { name: 'Email', icon: Mail, url: 'mailto:general@newlist.foundation' },
  ];

  const quickLinks = [
    { label: 'About the Foundation', value: 'about' as ActivePage },
    { label: 'Our Work', value: 'work' as ActivePage },
    { label: 'Get Involved', value: 'involved' as ActivePage },
    { label: 'News & Updates', value: 'news' as ActivePage },
    { label: 'Contact', value: 'contact' as ActivePage },
  ];

  return (
    <footer className="bg-brand-indigo text-[#FAF9F5] border-t border-brand-slate-pale/25 pt-20 pb-16 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Top Segment: Logo, Mission, and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* 1. Logo (Top-Left) with light property */}
          <div className="lg:col-span-4 pr-4">
            <button 
              onClick={() => handleLinkClick('home')}
              className="hover:opacity-90 transition-opacity focus:outline-none"
              id="ftr-logo-btn"
            >
              <Logo variant="full" light={true} />
            </button>
          </div>

          {/* 2. Mission Line (Centered or near-right) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <p className="text-xl font-serif text-[#FAF9F5]/91 tracking-tight leading-relaxed">
              Enabling prosperity for people and planet through unified life support systems.
            </p>
          </div>

          {/* 3. Join the Movement CTA */}
          <div className="lg:col-span-4 lg:text-right flex items-center lg:justify-end">
            <button
              onClick={() => handleLinkClick('involved')}
              id="ftr-cta-btn"
              className="flex items-center gap-2 bg-brand-orange hover:bg-brand-teal text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition-all duration-350 hover:scale-103 active:scale-97 cursor-pointer"
            >
              Connect to Network
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <hr className="border-[#FAF9F5]/10 mb-10" />

        {/* Middle Segment: Quick Links & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          
          {/* 4. Quick Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {quickLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => handleLinkClick(link.value)}
                id={`ftr-nav-${link.value}`}
                className="text-xs font-bold tracking-wider uppercase text-[#FAF9F5]/80 hover:text-brand-cream focus:outline-none transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* 5. Social Icons in light slate style */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComp = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-[#FAF9F5]/70 hover:text-brand-orange hover:bg-white/5 p-2.5 rounded-full border border-white/10 transition-all duration-300"
                  aria-label={social.name}
                  id={`ftr-soc-${social.name.toLowerCase()}`}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              );
            })}
          </div>

        </div>

        <hr className="border-[#FAF9F5]/10 mb-10" />

        {/* Bottom Segment: Legal line and Office Placeholder */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 text-xs text-[#FAF9F5]/65 leading-relaxed">
          
          {/* Legal line */}
          <div className="space-y-2">
            <p className="font-serif text-base text-[#FAF9F5] font-black">© 2026 The Newlist Foundation. All rights reserved.</p>
            <p className="font-ui text-xs font-bold uppercase tracking-widest text-brand-cream/80">
              Interventions Built On Transparency, Integrity, & Evidence
            </p>
          </div>

          {/* Registered Office: Placed at the very bottom beneath the legal line */}
          <div className="md:text-right font-ui shrink text-xs space-y-1">
            <p className="font-bold text-[#FAF9F5] uppercase tracking-wider text-[10px]">Registered UK Office</p>
            <p className="font-medium text-[#FAF9F5]/90">The Newlist Foundation Limited</p>
            <p className="text-[#FAF9F5]/75">85 Great Portland Street, First Floor, London, W1W 7LT</p>
            <div className="mt-2 block">
              <span className="text-[10px] text-[#FAF9F5] uppercase font-bold tracking-widest bg-white/10 px-3 py-1.5 rounded-md border border-white/5">
                ❖ UK Reg Charity pending • Audited Annual Accounts Publicly Released
              </span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
