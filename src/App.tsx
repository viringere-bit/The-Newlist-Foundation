/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import OurWorkView from './components/OurWorkView';
import GetInvolvedView from './components/GetInvolvedView';
import ResourcesView from './components/ResourcesView';
import NewsView from './components/NewsView';
import ContactView from './components/ContactView';
import VisualEditor from './components/VisualEditor';
import { ActivePage, NewsPost } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedArticle, setSelectedArticle] = useState<NewsPost | null>(null);

  const [accessibilityMode, setAccessibilityMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('newlist_accessibility') === 'true';
    } catch {
      return false;
    }
  });

  const toggleAccessibility = () => {
    setAccessibilityMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('newlist_accessibility', String(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  useEffect(() => {
    if (accessibilityMode) {
      document.documentElement.classList.add('accessibility-active');
    } else {
      document.documentElement.classList.remove('accessibility-active');
    }
  }, [accessibilityMode]);

  // Scroll to top when changing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  const handleSetSelectedArticle = (post: NewsPost) => {
    setSelectedArticle(post);
    setActivePage('news');
  };

  return (
    <div className={`flex flex-col min-h-screen bg-brand-midnight text-brand-charcoal transition-all duration-300 ${accessibilityMode ? 'accessibility-mode' : ''}`}>
      
      {/* Navigation Header */}
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage} 
        accessibilityMode={accessibilityMode}
        toggleAccessibility={toggleAccessibility}
      />

      {/* Main Core View Area */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomeView 
            setActivePage={setActivePage} 
            setSelectedArticle={handleSetSelectedArticle}
          />
        )}
        
        {activePage === 'about' && (
          <AboutView setActivePage={setActivePage} />
        )}
        
        {activePage === 'work' && (
          <OurWorkView setActivePage={setActivePage} />
        )}
        
        {activePage === 'involved' && (
          <GetInvolvedView setActivePage={setActivePage} />
        )}
        
        {activePage === 'resources' && (
          <ResourcesView />
        )}
        
        {activePage === 'news' && (
          <NewsView 
            selectedPost={selectedArticle} 
            setSelectedPost={setSelectedArticle}
          />
        )}
        
        {activePage === 'contact' && (
          <ContactView />
        )}

      </main>

      {/* Persistent Page Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Visual Live Theme Customizer & Element Editor */}
      <VisualEditor />

    </div>
  );
}
