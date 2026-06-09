import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Edit3, Settings, Palette, Download, Sparkles, Layers, Type, Save, 
  RotateCcw, Eye, Play, Check, X, ChevronRight, HelpCircle, Copy, Info,
  Laptop, ExternalLink, Moon, Sun, Monitor
} from 'lucide-react';

interface ColorPreset {
  name: string;
  id: string;
  orange: string;
  indigo: string;
  teal: string;
  midnight: string;
  cream: string;
}

const PALETTES: ColorPreset[] = [
  {
    name: "Classic Slate-Blue (High Contrast)",
    id: "classic",
    orange: "#DF5726",
    indigo: "#0F1D33",
    teal: "#106075",
    midnight: "#F3F6F9",
    cream: "#FCFAF7"
  },
  {
    name: "Regenerative Forest",
    id: "forest",
    orange: "#C96D46",
    indigo: "#1E2F23",
    teal: "#2A6F54",
    midnight: "#A6B7A5",
    cream: "#FCFAF6"
  },
  {
    name: "Warm Ochre clay",
    id: "ochre",
    orange: "#D66B33",
    indigo: "#2E241E",
    teal: "#6B5A40",
    midnight: "#C4B297",
    cream: "#FFFDF9"
  },
  {
    name: "Tuscan Vineyard",
    id: "tuscan",
    orange: "#A33835",
    indigo: "#2D1D23",
    teal: "#5A445E",
    midnight: "#B3A2AC",
    cream: "#FDFBF7"
  },
  {
    name: "Ebony & Amber",
    id: "ebony",
    orange: "#E58E26",
    indigo: "#1F2022",
    teal: "#60A5FA",
    midnight: "#111827",
    cream: "#F9FAFB"
  }
];

export default function VisualEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'editor' | 'wp' | 'help'>('theme');
  
  // Interactive Live States
  const [isInspectorActive, setIsInspectorActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('classic');
  const [isSaving, setIsSaving] = useState(false);
  
  // Custom Color States (defaults match classic theme CSS variables)
  const [colorOrange, setColorOrange] = useState(localStorage.getItem('theme_color_orange') || '#DF5726');
  const [colorTeal, setColorTeal] = useState(localStorage.getItem('theme_color_teal') || '#106075');
  const [colorIndigo, setColorIndigo] = useState(localStorage.getItem('theme_color_indigo') || '#0F1D33');
  const [colorMidnight, setColorMidnight] = useState(localStorage.getItem('theme_color_midnight') || '#F3F6F9');
  
  // Inspector editing popup states
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(null);
  const [tempTextValue, setTempTextValue] = useState("");
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({ display: 'none' });
  
  // Saved Texts State count
  const [savedCount, setSavedCount] = useState(0);

  // WordPress form configuration
  const [wpThemeName, setWpThemeName] = useState("Newlist Custom Theme");
  const [wpAuthor, setWpAuthor] = useState("Victor Squiss-Banigo");
  const [wpVersion, setWpVersion] = useState("1.0.0");
  const [wpDesc, setWpDesc] = useState("A custom WordPress Block Theme with fully integrated regenerative Tailwind aesthetic components.");
  const [copyFeedback, setCopyFeedback] = useState("");

  // Update counts on load
  useEffect(() => {
    const dictionary = JSON.parse(localStorage.getItem('theme_edited_texts') || '{}');
    setSavedCount(Object.keys(dictionary).length);
    applyColorTheme();
  }, []);

  // Sync color adjustments with root element variables
  const applyColorTheme = () => {
    document.documentElement.style.setProperty('--color-brand-orange', colorOrange);
    document.documentElement.style.setProperty('--color-brand-teal', colorTeal);
    document.documentElement.style.setProperty('--color-brand-indigo', colorIndigo);
    document.documentElement.style.setProperty('--color-brand-midnight', colorMidnight);
    
    // Save to localStorage
    localStorage.setItem('theme_color_orange', colorOrange);
    localStorage.setItem('theme_color_teal', colorTeal);
    localStorage.setItem('theme_color_indigo', colorIndigo);
    localStorage.setItem('theme_color_midnight', colorMidnight);
  };

  useEffect(() => {
    applyColorTheme();
  }, [colorOrange, colorTeal, colorIndigo, colorMidnight]);

  // Apply a dynamic color preset
  const handleSelectPreset = (preset: ColorPreset) => {
    setSelectedPreset(preset.id);
    setColorOrange(preset.orange);
    setColorTeal(preset.teal);
    setColorIndigo(preset.indigo);
    setColorMidnight(preset.midnight);
  };

  // Reset all edits and colors
  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to reset all visual customizations and text edits back to direct defaults? This cannot be undone.")) {
      localStorage.removeItem('theme_edited_texts');
      localStorage.removeItem('theme_color_orange');
      localStorage.removeItem('theme_color_teal');
      localStorage.removeItem('theme_color_indigo');
      localStorage.removeItem('theme_color_midnight');
      
      // Reload defaults
      setColorOrange('#DF5726');
      setColorTeal('#106075');
      setColorIndigo('#0F1D33');
      setColorMidnight('#F3F6F9');
      setSelectedPreset('classic');
      setSavedCount(0);
      
      // Clean inline overrides on page
      window.location.reload();
    }
  };

  // Keep re-applying text replacements dynamically whenever the DOM modifies
  useEffect(() => {
    const applyTextEdits = () => {
      const dictionary = JSON.parse(localStorage.getItem('theme_edited_texts') || '{}');
      if (Object.keys(dictionary).length === 0) return;

      // Select common readable elements
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, a, li');
      elements.forEach((el) => {
        // Skip editor interface elements
        if (el.closest('#visual-editor-container') || el.closest('#visual-editor-overlay')) {
          return;
        }

        // 1. TextContent matching
        const text = el.textContent?.trim();
        if (text && dictionary[text]) {
          el.textContent = dictionary[text];
        }

        // 2. Extra robust InnerText fallback matching (avoids HTML markup complications)
        const innerTxt = (el as HTMLElement).innerText?.trim();
        if (innerTxt && dictionary[innerTxt]) {
          (el as HTMLElement).innerText = dictionary[innerTxt];
        }
      });
    };

    // Apply immediately
    applyTextEdits();

    // Create observer to listen for navigation tree updates
    const observer = new MutationObserver(() => {
      applyTextEdits();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Short-lived periodic updates to catch any late rendering
    const interval = setInterval(applyTextEdits, 400);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [savedCount]);

  // INSPECTOR MOUSE OVER EVENT: Highlight standard textual HTML blocks
  useEffect(() => {
    if (!isInspectorActive) {
      setHoveredElement(null);
      setOverlayStyle({ display: 'none' });
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Filter tags that represent site copies (avoid body, html, script, divs without actual text, and editor widgets)
      const allowedTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'BUTTON', 'A', 'LI'];
      const isInsideEditor = target.closest('#visual-editor-container') || target.closest('#visual-editor-overlay');
      
      const textVal = target.innerText?.trim() || "";
      if (allowedTags.includes(target.tagName) && !isInsideEditor && textVal.length > 0) {
        setHoveredElement(target);
        
        // Compute coordinates
        const rect = target.getBoundingClientRect();
        setOverlayStyle({
          display: 'block',
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          border: '2px dashed var(--color-brand-orange, #DF5726)',
          backgroundColor: 'rgba(223, 87, 38, 0.08)',
          boxShadow: '0 0 12px rgba(223, 87, 38, 0.2)',
          pointerEvents: 'none',
          borderRadius: '6px',
          zIndex: 999998,
          transition: 'all 0.15s ease'
        });
      } else {
        setHoveredElement(null);
        setOverlayStyle({ display: 'none' });
      }
    };

    // INSPECTOR CLICK EVENT: Intercept user click to open custom editor modal
    const handleMouseClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInsideEditor = target.closest('#visual-editor-container') || target.closest('#visual-editor-overlay');
      if (isInsideEditor) return;

      // intercept click completely in inspector mode to allow safe visual edits
      e.preventDefault();
      e.stopPropagation();

      const allowedTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'BUTTON', 'A', 'LI'];
      const textVal = target.innerText?.trim() || "";
      if (allowedTags.includes(target.tagName) && textVal.length > 0) {
        setEditingElement(target);
        setTempTextValue(target.innerText.trim());
        setIsInspectorActive(false); // turn off inspector after picking
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleMouseClick, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleMouseClick, true);
    };
  }, [isInspectorActive]);

  // Save the custom inline text value to dictionary in localStorage
  const handleSaveTextEdit = () => {
    if (!editingElement) return;

    const originalText = editingElement.dataset.originalText || editingElement.innerText.trim();
    const newText = tempTextValue.trim();

    if (newText && originalText) {
      // Affix a marker to allow retrieval even after modifications
      if (!editingElement.dataset.originalText) {
        editingElement.dataset.originalText = originalText;
      }

      const dictionary = JSON.parse(localStorage.getItem('theme_edited_texts') || '{}');
      dictionary[originalText] = newText;
      
      // Also map the current edited text value so chained changes aren't lost
      dictionary[editingElement.innerText.trim()] = newText;
      
      localStorage.setItem('theme_edited_texts', JSON.stringify(dictionary));
      
      // Instant DOM feedback
      editingElement.innerText = newText;
      
      setSavedCount(Object.keys(dictionary).length);
      setEditingElement(null);
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  // Clipboard copiers
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(""), 2000);
  };

  // Custom WordPress theme file structures
  const themeJsonString = JSON.stringify({
    "version": 2,
    "settings": {
      "appearanceTools": true,
      "color": {
        "palette": [
          { "slug": "brand-orange", "color": colorOrange, "name": "Brand Terracotta Orange" },
          { "slug": "brand-teal", "color": colorTeal, "name": "Brand Deep Teal" },
          { "slug": "brand-indigo", "color": colorIndigo, "name": "Primary Indigo" },
          { "slug": "brand-midnight", "color": colorMidnight, "name": "Slate Midnight Blue" },
          { "slug": "brand-cream", "color": "#FFFDF9", "name": "Clean Cream" }
        ],
        "custom": true,
        "defaultPalette": false
      },
      "typography": {
        "fontFamilies": [
          {
            "fontFamily": "\"Inter\", sans-serif",
            "name": "Inter Core Sans",
            "slug": "sans-font"
          },
          {
            "fontFamily": "\"Playfair Display\", serif",
            "name": "Playfair Editorial Serif",
            "slug": "serif-font"
          }
        ]
      },
      "layout": {
        "contentSize": "800px",
        "wideSize": "1200px"
      }
    },
    "styles": {
      "color": {
        "background": colorMidnight,
        "text": "#121F28"
      },
      "elements": {
        "link": {
          "color": {
            "text": colorTeal
          }
        }
      }
    }
  }, null, 2);

  const styleCssString = `/*
Theme Name: ${wpThemeName}
Theme URI: https://newlistfoundation.org
Author: ${wpAuthor}
Description: ${wpDesc}
Version: ${wpVersion}
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: newlist-theme
Tags: custom-colors, full-site-editing, custom-palette, responsive-layout, clean-typography
*/

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

:root {
  /* Dynamic custom branding properties applied live in frontend customizer */
  --wp--preset--color--brand-orange: ${colorOrange};
  --wp--preset--color--brand-teal: ${colorTeal};
  --wp--preset--color--brand-indigo: ${colorIndigo};
  --wp--preset--color--brand-midnight: ${colorMidnight};
  --wp--preset--color--brand-cream: #FFFDF9;
  
  --font-sans: "Inter", sans-serif;
  --font-serif: "Playfair Display", serif;
}

body {
  font-family: var(--font-sans);
  background-color: var(--wp--preset--color--brand-midnight);
  color: #121F28;
}

h1, h2, h3, h4, .wp-block-post-title {
  font-family: var(--font-serif);
  color: var(--wp--preset--color--brand-indigo);
}`;

  return (
    <div id="visual-editor-container" className="font-sans">
      
      {/* 1. FLOATING BRANDED LAUNCHER BADGE (ALWAYS VISIBLE IN BOTTOM CORNER) */}
      <div className="fixed bottom-6 right-6 z-[999990] flex flex-col items-end gap-2 drop-shadow-xl select-none">
        
        {/* Short feedback flag */}
        <AnimatePresence>
          {isSaving && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-brand-orange border border-white/20 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg"
            >
              <Check className="w-3.5 h-3.5" /> Text Edit Saved!
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-sm shadow-2xl transition-all duration-300 border backdrop-blur-md active:scale-95 ${
            isOpen 
            ? 'bg-brand-indigo/95 text-white border-white/20 scale-95 hover:bg-brand-indigo' 
            : 'bg-brand-orange text-white border-brand-orange/20 hover:bg-brand-orange/90 hover:shadow-[0_0_20px_rgba(223,87,38,0.45)]'
          }`}
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close Customizer</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 animate-spin-slow text-yellow-300" />
              <span>Visual Editor & Customizer</span>
              {savedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-brand-orange text-[10px] flex items-center justify-center font-extrabold shadow-sm animate-bounce">
                  {savedCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* 2. INSPECTOR SELECTION HUD LAYER */}
      <AnimatePresence>
        {isInspectorActive && (
          <div id="visual-editor-overlay" className="fixed inset-0 z-[999997] pointer-events-none select-none">
            <div style={overlayStyle} />
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[999999] bg-brand-indigo/90 border border-white/10 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md pointer-events-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping"></div>
              <span className="text-xs font-bold tracking-wide">Inspector Active: Hover and Click Any Text Block to Edit!</span>
              <button 
                onClick={() => setIsInspectorActive(false)}
                className="bg-white/10 hover:bg-white/20 p-1 rounded-lg text-white transition-colors"
                title="Exit inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. INLINE TEXT EDITOR MODAL */}
      <AnimatePresence>
        {editingElement && (
          <div className="fixed inset-0 z-[999999] bg-brand-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-brand-slate-pale/60 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-brand-slate-pale/30 pb-4">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-brand-orange" />
                  <div>
                    <h3 className="text-lg font-bold text-brand-indigo font-serif">Edit Element Text</h3>
                    <p className="text-[10px] text-brand-slate font-mono font-bold uppercase">Tag: {editingElement.tagName}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setEditingElement(null)}
                  className="p-1.5 rounded-lg text-brand-slate hover:bg-brand-slate-pale/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-brand-indigo block">Element Content Copy</label>
                <textarea 
                  rows={4}
                  value={tempTextValue}
                  onChange={(e) => setTempTextValue(e.target.value)}
                  className="w-full text-brand-charcoal p-3 border border-brand-slate-pale rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent font-sans"
                  placeholder="Enter custom replacement copy here..."
                />
              </div>

              <div className="bg-[#FAF9F5] p-3.5 rounded-2xl border border-brand-slate-pale/30 space-y-1">
                <p className="text-[10px] font-bold text-brand-slate font-mono uppercase">Original reference copy:</p>
                <p className="text-xs text-brand-slate-dark italic">"{editingElement.dataset.originalText || editingElement.innerText.trim()}"</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-slate-pale/30">
                <button 
                  onClick={() => setEditingElement(null)}
                  className="px-4 py-2 bg-brand-slate-pale/40 hover:bg-brand-slate-pale/60 text-brand-slate-dark font-bold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveTextEdit}
                  className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MAIN SIDEBAR PANELS */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999980] flex justify-end bg-brand-charcoal/20 pointer-events-none select-none">
            
            {/* Click-away overlay backing */}
            <div 
              className="absolute inset-0 pointer-events-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <motion.div 
              initial={{ x: 450, opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 450, opacity: 0.9 }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="w-full max-w-[440px] h-full bg-white shadow-2xl relative z-10 flex flex-col border-l border-brand-slate-pale/50 pointer-events-auto select-text"
            >
              
              {/* HEADER WITH SPARKS */}
              <div className="p-6 bg-brand-indigo text-white flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/10 text-brand-orange">
                    <Sparkles className="w-5 h-5 animate-pulse text-brand-orange" />
                  </div>
                  <div>
                    <h2 className="text-md font-bold text-white font-serif tracking-tight">Vibe Live Customizer</h2>
                    <p className="text-[10px] text-white/60 font-mono">Dynamic Theme Customization & Export</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* TABS SELECTOR */}
              <div className="flex bg-[#FAF9F5] border-b border-brand-slate-pale/30 text-xs text-brand-slate font-extrabold shrink-0">
                <button 
                  onClick={() => setActiveTab('theme')}
                  className={`flex-1 py-3 border-b-2 text-center transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'theme' 
                    ? 'border-brand-orange text-brand-orange bg-white' 
                    : 'border-transparent hover:text-brand-indigo hover:bg-brand-slate-pale/15'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  Palette
                </button>
                <button 
                  onClick={() => setActiveTab('editor')}
                  className={`flex-1 py-3 border-b-2 text-center transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'editor' 
                    ? 'border-brand-orange text-brand-orange bg-white' 
                    : 'border-transparent hover:text-brand-indigo hover:bg-brand-slate-pale/15'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Inspector
                </button>
                <button 
                  onClick={() => setActiveTab('wp')}
                  className={`flex-1 py-3 border-b-2 text-center transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'wp' 
                    ? 'border-brand-orange text-brand-orange bg-white' 
                    : 'border-transparent hover:text-brand-indigo hover:bg-brand-slate-pale/15'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  WP Studio
                </button>
                <button 
                  onClick={() => setActiveTab('help')}
                  className={`flex-1 py-3 border-b-2 text-center transition-all flex items-center justify-center gap-1 ${
                    activeTab === 'help' 
                    ? 'border-brand-orange text-brand-orange bg-white' 
                    : 'border-transparent hover:text-brand-indigo hover:bg-brand-slate-pale/15'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Guide
                </button>
              </div>

              {/* SCROLLABLE INTERACTION WINDOW */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {/* A. PALETTES TAB */}
                {activeTab === 'theme' && (
                  <div className="space-y-6">
                    <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-brand-slate-pale/20 space-y-1">
                      <h3 className="text-xs font-extrabold text-brand-indigo flex items-center gap-1.5">
                        <Palette className="w-4 h-4 text-brand-teal" /> Instant Brand Themes
                      </h3>
                      <p className="text-[11px] text-brand-slate leading-relaxed">Select high-contrast curated presets styled to perfectly overlay these UI components.</p>
                    </div>

                    {/* Pre-designed presets list */}
                    <div className="grid grid-cols-1 gap-3">
                      {PALETTES.map((preset) => (
                        <button 
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                            selectedPreset === preset.id 
                            ? 'border-brand-orange bg-brand-orange/5 ring-1 ring-brand-orange' 
                            : 'border-brand-slate-pale/40 bg-white hover:bg-brand-slate-pale/10 hover:border-brand-slate-pale/70'
                          }`}
                        >
                          <div className="space-y-1">
                            <p className="text-xs font-extrabold text-brand-indigo">{preset.name}</p>
                            <div className="flex gap-1.5 items-center">
                              <span className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: preset.orange }} title="Orange Accent" />
                              <span className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: preset.teal }} title="Teal Accent" />
                              <span className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: preset.indigo }} title="Indigo Headers" />
                              <span className="w-3 h-3 rounded-full shadow-inner border border-brand-slate-pale/30" style={{ backgroundColor: preset.midnight }} title="Soft Slate Bg" />
                              <span className="w-3 h-3 rounded-full shadow-inner border border-brand-slate-pale/30" style={{ backgroundColor: preset.cream }} title="Cream Paper" />
                            </div>
                          </div>
                          {selectedPreset === preset.id && (
                            <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-[10px]">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Custom sliders */}
                    <div className="border-t border-brand-slate-pale/30 pt-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-extrabold text-brand-indigo font-motif uppercase tracking-wider">Dial-in Specific Slate Colors</h4>
                        <span className="text-[10px] font-mono text-brand-slate bg-brand-slate-pale/25 px-2 py-0.5 rounded-full">Hex Mode</span>
                      </div>

                      {/* Accent Orange */}
                      <div className="flex items-center justify-between gap-4 p-2 bg-brand-slate-pale/10 rounded-xl">
                        <div className="space-y-0.5">
                          <span className="text-xs font-extrabold text-brand-indigo block">Terracotta Accent</span>
                          <span className="text-[10px] font-mono text-brand-slate font-bold uppercase">{colorOrange}</span>
                        </div>
                        <input 
                          type="color" 
                          value={colorOrange}
                          onChange={(e) => {
                            setColorOrange(e.target.value);
                            setSelectedPreset('custom');
                          }}
                          className="w-10 h-10 rounded-lg cursor-pointer overflow-hidden border-0 bg-transparent ring-2 ring-brand-slate-pale/50"
                        />
                      </div>

                      {/* Brand Indigo */}
                      <div className="flex items-center justify-between gap-4 p-2 bg-brand-slate-pale/10 rounded-xl">
                        <div className="space-y-0.5">
                          <span className="text-xs font-extrabold text-brand-indigo block">Headers Navy/Indigo</span>
                          <span className="text-[10px] font-mono text-brand-slate font-bold uppercase">{colorIndigo}</span>
                        </div>
                        <input 
                          type="color" 
                          value={colorIndigo}
                          onChange={(e) => {
                            setColorIndigo(e.target.value);
                            setSelectedPreset('custom');
                          }}
                          className="w-10 h-10 rounded-lg cursor-pointer overflow-hidden border-0 bg-transparent ring-2 ring-brand-slate-pale/50"
                        />
                      </div>

                      {/* Brand Teal */}
                      <div className="flex items-center justify-between gap-4 p-2 bg-brand-slate-pale/10 rounded-xl">
                        <div className="space-y-0.5">
                          <span className="text-xs font-extrabold text-brand-indigo block">Teal Details</span>
                          <span className="text-[10px] font-mono text-brand-slate font-bold uppercase">{colorTeal}</span>
                        </div>
                        <input 
                          type="color" 
                          value={colorTeal}
                          onChange={(e) => {
                            setColorTeal(e.target.value);
                            setSelectedPreset('custom');
                          }}
                          className="w-10 h-10 rounded-lg cursor-pointer overflow-hidden border-0 bg-transparent ring-2 ring-brand-slate-pale/50"
                        />
                      </div>

                      {/* Soft Midnight Blue Canvas */}
                      <div className="flex items-center justify-between gap-4 p-2 bg-brand-slate-pale/10 rounded-xl">
                        <div className="space-y-0.5">
                          <span className="text-xs font-extrabold text-brand-indigo block">Soft Slate Midnight Blue Cover</span>
                          <span className="text-[10px] font-mono text-brand-slate font-bold uppercase">{colorMidnight}</span>
                        </div>
                        <input 
                          type="color" 
                          value={colorMidnight}
                          onChange={(e) => {
                            setColorMidnight(e.target.value);
                            setSelectedPreset('custom');
                          }}
                          className="w-10 h-10 rounded-lg cursor-pointer overflow-hidden border-0 bg-transparent ring-2 ring-brand-slate-pale/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* B. INSPECTOR WORKFLOW */}
                {activeTab === 'editor' && (
                  <div className="space-y-6">
                    <div className="bg-[#FAF9F5] p-4 rounded-xl border border-brand-slate-pale/20 space-y-2">
                      <h3 className="text-xs font-extrabold text-brand-indigo flex items-center gap-1.5 leading-none">
                        <Edit3 className="w-4 h-4 text-brand-orange animate-bounce" /> Click-to-Edit HUD Mode
                      </h3>
                      <p className="text-[11px] text-brand-slate leading-relaxed">
                        Toggle Inspector mode, then move your cursor over the website elements. 
                        Every heading, paragraph, button, list item, or tag gets highlighted. Clicking any element stops navigation, grabs the text content and launches the editing box safely. All edits save to your browser cache!
                      </p>
                    </div>

                    {/* Toggle Selector */}
                    <div className="p-1 rounded-2xl bg-brand-slate-pale/20 border border-brand-slate-pale/30 grid grid-cols-2">
                      <button 
                        onClick={() => setIsInspectorActive(false)}
                        className={`text-xs font-bold py-2.5 rounded-xl transition-all ${
                          !isInspectorActive 
                          ? 'bg-white shadow text-brand-indigo font-extrabold' 
                          : 'text-brand-slate hover:text-brand-indigo'
                        }`}
                      >
                        Passive View Mode
                      </button>
                      <button 
                        onClick={() => {
                          setIsInspectorActive(true);
                          setIsOpen(false); // Collapsed customizer sidebar for element picking
                        }}
                        className={`text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                          isInspectorActive 
                          ? 'bg-brand-orange shadow text-white font-extrabold' 
                          : 'text-brand-slate hover:text-brand-orange'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Active Inspector
                      </button>
                    </div>

                    <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-4 space-y-2 text-xs">
                      <p className="font-extrabold text-brand-orange uppercase font-mono text-[10px]">Browser Cache Statistics</p>
                      <div className="flex justify-between items-center text-brand-slate-dark text-xs">
                        <span>Total Text Blocks Edited:</span>
                        <span className="font-bold font-mono text-brand-indigo bg-brand-slate-pale/30 px-2 py-0.5 rounded-full">{savedCount} items</span>
                      </div>
                    </div>

                    {/* Quick reset */}
                    {savedCount > 0 && (
                      <button 
                        onClick={handleResetAll}
                        className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Flush Text Edits & Recustomize
                      </button>
                    )}
                  </div>
                )}

                {/* C. WORDPRESS EXPORTER */}
                {activeTab === 'wp' && (
                  <div className="space-y-6">
                    <div className="bg-brand-orange/5 p-4 rounded-xl border border-brand-orange/20 space-y-1.5">
                      <h3 className="text-xs font-extrabold text-brand-indigo flex items-center gap-1.5">
                        <Laptop className="w-4 h-4 text-brand-orange" /> WordPress Custom Blocks Theme Configuration
                      </h3>
                      <p className="text-[11px] text-brand-slate leading-relaxed">
                        Export your customized color hex, system layout variables and theme headers as standard WordPress core files. Loaded automatically into block presets for full site Gutenberg layouts!
                      </p>
                    </div>

                    {/* WordPress theme adjustments form */}
                    <div className="space-y-3.5 border-t border-brand-slate-pale/20 pt-4">
                      <h4 className="text-[11px] font-extrabold text-brand-slate font-mono uppercase">Configure Theme Headers</h4>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-indigo block">Theme Name</label>
                        <input 
                          type="text"
                          value={wpThemeName}
                          onChange={(e) => setWpThemeName(e.target.value)}
                          className="w-full text-xs p-2.5 border border-brand-slate-pale/50 rounded-lg text-brand-charcoal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-indigo block">Theme Author</label>
                        <input 
                          type="text"
                          value={wpAuthor}
                          onChange={(e) => setWpAuthor(e.target.value)}
                          className="w-full text-xs p-2.5 border border-brand-slate-pale/50 rounded-lg text-brand-charcoal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-indigo block">Version</label>
                        <input 
                          type="text"
                          value={wpVersion}
                          onChange={(e) => setWpVersion(e.target.value)}
                          className="w-full text-xs p-2.5 border border-brand-slate-pale/50 rounded-lg text-brand-charcoal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-brand-indigo block">Theme Description</label>
                        <textarea 
                          rows={2}
                          value={wpDesc}
                          onChange={(e) => setWpDesc(e.target.value)}
                          className="w-full text-xs p-2.5 border border-brand-slate-pale/50 rounded-lg text-brand-charcoal"
                        />
                      </div>
                    </div>

                    {/* Output files tabs */}
                    <div className="space-y-4 pt-4 border-t border-brand-slate-pale/20">
                      <h4 className="text-[11px] font-extrabold text-brand-slate font-mono uppercase flex items-center justify-between">
                        <span>WordPress Block Files</span>
                        {copyFeedback && <span className="text-[10px] text-green-600 font-sans font-bold normal-case animate-fade-in">Copied {copyFeedback}!</span>}
                      </h4>

                      {/* style.css block */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center bg-[#FAF9F5] p-2 border-t border-x border-brand-slate-pale/40 rounded-t-lg">
                          <span className="text-xs font-extrabold text-brand-indigo font-mono">style.css</span>
                          <button 
                            onClick={() => handleCopyText(styleCssString, 'style.css')}
                            className="text-[10px] bg-brand-orange text-white hover:bg-brand-orange/90 px-2 py-1 rounded font-bold transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy Core CSS
                          </button>
                        </div>
                        <pre className="p-3 bg-brand-charcoal text-green-400 text-[10px] font-mono rounded-b-lg overflow-x-auto h-32 select-text">
                          {styleCssString}
                        </pre>
                      </div>

                      {/* theme.json block */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center bg-[#FAF9F5] p-2 border-t border-x border-brand-slate-pale/40 rounded-t-lg">
                          <span className="text-xs font-extrabold text-brand-indigo font-mono">theme.json</span>
                          <button 
                            onClick={() => handleCopyText(themeJsonString, 'theme.json')}
                            className="text-[10px] bg-brand-orange text-white hover:bg-brand-orange/90 px-2 py-1 rounded font-bold transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy theme.json
                          </button>
                        </div>
                        <pre className="p-3 bg-brand-charcoal text-green-400 text-[10px] font-mono rounded-b-lg overflow-x-auto h-32 select-text font-bold">
                          {themeJsonString}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* D. HELP & USER MANUAL */}
                {activeTab === 'help' && (
                  <div className="space-y-6">
                    <div className="bg-[#FAF9F5] p-4 rounded-xl border border-brand-slate-pale/20 space-y-2">
                      <h3 className="text-xs font-extrabold text-brand-indigo flex items-center gap-1.5 leading-none">
                        <Info className="w-4 h-4 text-brand-orange" /> How to Setup on Local WP Studio (100% Free)
                      </h3>
                      <p className="text-[11px] text-brand-slate leading-relaxed">
                        WordPress Studio by Automattic is a fully featured local development platform for WordPress. Learn how to load your custom designs directly and cheaply without any complex servers!
                      </p>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-brand-slate-dark">
                      
                      <div className="space-y-1.5">
                        <p className="font-extrabold text-brand-indigo">Step 1: Download & Install WP Studio</p>
                        <p className="text-[11px] text-brand-slate">
                          Download <strong className="text-brand-indigo">WordPress Studio</strong> for free at <span className="underline select-all text-brand-teal">developer.wordpress.com/studio/</span>. It supports Mac and Windows natively instantly. No database or MAMP required.
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <p className="font-extrabold text-brand-indigo">Step 2: Add New Site & Locate Theme Folder</p>
                        <p className="text-[11px] text-brand-slate">
                          Open WP Studio, click <strong className="text-brand-indigo">"Add site"</strong>, and let WordPress run. Once launched, click <strong className="text-brand-indigo font-bold">"Open folder"</strong> inside WP Studio. Navigate inside your project tree to:
                          <br />
                          <code className="bg-brand-orange/10 font-mono text-[10px] px-1.5 py-0.5 rounded text-brand-orange font-bold">wp-content/themes/</code>
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <p className="font-extrabold text-brand-indigo">Step 3: Create Theme Bundle Directory</p>
                        <p className="text-[11px] text-brand-slate">
                          Create a directory in there named <code className="bg-brand-indigo/10 font-mono text-[10px] px-1.5 py-0.5 rounded text-brand-indigo font-bold">newlist-custom-theme</code>. Inside it, create two standard empty files:
                          <br />
                          1. <strong className="text-brand-indigo font-mono">style.css</strong>
                          <br />
                          2. <strong className="text-brand-indigo font-mono">theme.json</strong>
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <p className="font-extrabold text-brand-indigo">Step 4: Copy & Paste Config Files</p>
                        <p className="text-[11px] text-brand-slate">
                          Go back to the <strong className="text-brand-orange">WP Studio tab</strong> in this Customizer, click **Copy** for both core output blocks, and paste them into those files. 
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <p className="font-extrabold text-brand-indigo">Step 5: Activate & Design in Block Editor</p>
                        <p className="text-[11px] text-brand-slate">
                          Go to your WordPress Admin dashboard, navigate to <strong className="text-brand-indigo">Appearance &gt; Themes</strong>, search for your style name and click <strong className="text-brand-indigo">"Activate"</strong>. Launch the new Editor to get full, drag-and-drop Block control with your custom customizer settings matched!
                        </p>
                      </div>
                    </div>

                    <div className="bg-brand-indigo text-[#FAF9F5] p-3.5 rounded-xl border border-white/10 space-y-1 text-center">
                      <p className="text-[11px] font-bold">Need help with exporting static assets?</p>
                      <p className="text-[10px] text-white/70">Right-click any illustration on this site to download the customized design diagram and upload it into your WordPress library!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* RESET FOOTER */}
              <div className="p-4 bg-[#FAF9F5] border-t border-brand-slate-pale/30 shrink-0 flex items-center justify-between text-xs">
                <span className="text-brand-slate font-mono font-bold uppercase tracking-wider">Editor Settings</span>
                <button 
                  onClick={handleResetAll}
                  className="px-3 py-1.5 bg-brand-slate-pale/25 hover:bg-brand-slate-pale/40 text-brand-charcoal text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restore System Default
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
