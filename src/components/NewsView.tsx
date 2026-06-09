import React, { useState, useEffect } from 'react';
import { Calendar, Tag, ChevronRight, Search, X, Mail, Sparkles, Filter, FileText, CheckCircle2 } from 'lucide-react';
import { NewsPost } from '../types';

interface NewsViewProps {
  selectedPost?: NewsPost | null;
  setSelectedPost?: (post: NewsPost | null) => void;
}

export default function NewsView({ selectedPost = null, setSelectedPost }: NewsViewProps) {
  const [filter, setFilter] = useState<'All' | NewsPost['category']>('All');
  const [search, setSearch] = useState('');
  const [readingPost, setReadingPost] = useState<NewsPost | null>(null);
  const [subbed, setSubbed] = useState(false);
  const [email, setEmail] = useState('');

  // Synchronize externally selected post if redirected from home view previews
  useEffect(() => {
    if (selectedPost) {
      setReadingPost(selectedPost);
      if (setSelectedPost) setSelectedPost(null); // consume/reset
    }
  }, [selectedPost, setSelectedPost]);

  // Mandatory Items from Sitemap Page 15/16 + Categories
  const newsItems: NewsPost[] = [
    {
      id: 'post-1',
      title: "Launching the Newlist Foundation’s feasibility study to explore integrated pathways to prosperity.",
      summary: "Launching the Newlist Foundation’s feasibility study to explore integrated pathways to prosperity. This marks the beginning of our systematic field investigations.",
      content: `### Objective & Structural Mandate
Our team is initiating a comprehensive, multidisciplinary field trial across a series of selected community nodes to test the modular validity of unified life support systems (housing, finance, transport, employment pathways).

### Investigative Group Composition
The Newlist Foundation will begin with a small, multidisciplinary team — experts in law, finance, social support, systems engineering, and economics — to investigate the structural forces that drive economic inequality at its roots. Alongside this technical work, we will partner directly with communities to understand their lived experiences, needs, and aspirations. 

### Implementation Pathway
Together, we will design, build, and test holistic, regenerative solutions in real time and in real places, creating the first working version of the model and the foundations of The Newlist Network.

### Reporting Transparency
To ensure transparency and replicability, we will publish our findings in accessible formats and media so other communities can learn from, adapt, and improve the approach. Audit reports will be progressively cataloged within our academic Resources compartment as metrics stabilize.`,
      date: 'June 4, 2026',
      category: 'Announcements',
      iconName: 'gateway',
      author: 'Victor Squiss-Banigo',
      readTime: '4 min read'
    },
    {
      id: 'post-2',
      title: "Why community-driven design is at the heart of our approach.",
      summary: "Explore the philosophy underpinning the Newlist Network: why lived-experience is not a secondary metric, but a primary structural driver for durable systems engineering.",
      content: `### Human-Centered Co-Creation
Traditional, top-down bureaucratic systems replace care with rules and reduce unique, vulnerable humans to file numbers. We believe that justice is not an aspiration — it is an architecture, and that system architectures cannot be built in a vacuum.

### Multidisciplinary Synergy
Our work is carried out by a multidisciplinary team with experience across governance, social impact, engineering, community engagement, and organisational leadership. We also bring a wealth of lived experience of the problems that we are trying to solve. 

### Grounding Systems in Lived Facts
Together, we bring the skills needed to design systems that are fair, resilient, and grounded in the realities of the people they serve. By integrating residents, builders, and specialists into a singular design node, we eliminate typical institutional failure modes. 

### Scalable Autonomy
When communities co-design their own systems, they own the outcomes. This avoids institutional codependency and cements local sovereignty over collective assets.`,
      date: 'May 18, 2026',
      category: 'Stories from the Network',
      iconName: 'node',
      author: 'Community Team',
      readTime: '3 min read'
    },
    {
      id: 'post-3',
      title: "Early insights from our research partners and pilot conversations.",
      summary: "Initial field data and participant interviews suggest structural friction in transportation and housing are the primary catalysts of capital depletion.",
      content: `### Field Diagnostics Summary
Our first-round localized diagnostic surveys reveal that high-expenditure silos (especially high-interest structural debts, unstable rentals, and unreliable green-mobility networks) work in tandem to keep households under terminal financial load.

### Preliminary Analytical Trends:
1. **Physical Congestion:** Unreliable local transport limits employment options to low-agency roles within immediate walking distances.
2. **Capital Leakage:** Up to 55% of net monthly earnings are leaked outwards to remote landlords, preventing the creation of localized wealth caches.
3. **Information Friction:** Practical literacy about legal tenancy codes and sovereign financial interfaces remains unevenly distributed.

### Responsive Prototype Iterations
In response to these diagnostic nodes, our upcoming MVP Microsystem Build will integrate micro-housing stability bonds in conjunction with low-overhead electric mobility shares. This unifies physical support systems to protect families in moments of critical vulnerability.`,
      date: 'May 02, 2026',
      category: 'Progress Updates',
      iconName: 'arc',
      author: 'Research Unit',
      readTime: '5 min read'
    }
  ];

  const handleSubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubbed(true);
  };

  // Filter and search logic
  const filteredPosts = newsItems.filter(post => {
    const matchesFilter = filter === 'All' || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.summary.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      
      {/* 1. HERO RE-ANCHOR */}
      <section className="relative overflow-hidden bg-mesh-grid bg-mesh-soft py-24 lg:py-32 text-center border-b border-brand-slate-pale/60">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-orange block mb-4 font-ui">
            Ecosystem Timeline
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-indigo font-black tracking-tight leading-[1.1] mb-6">
            News & Updates
          </h1>
          <p className="text-base md:text-lg text-brand-indigo/80 max-w-[750px] mx-auto leading-relaxed font-sans">
            The living record of the Foundation’s work, research breakthroughs, progress updates, and stories from our distributed network.
          </p>
        </div>
      </section>

      {/* 2. MAIN HUB SEGMENT */}
      <section className="bg-white py-24 border-b border-brand-slate-pale/30">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COMPARTMENT: Search, Category Filters, Posts Grid (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8 flex flex-col">
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#FAF9F5]/40 p-5 rounded-2xl border border-brand-slate-pale/70">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {(['All', 'Announcements', 'Stories from the Network', 'Progress Updates'] as const).map((catName) => (
                  <button
                    key={catName}
                    onClick={() => setFilter(catName)}
                    className={`px-3 py-2 rounded-lg text-[10px] font-bold font-ui uppercase tracking-wide transition-all cursor-pointer ${
                      filter === catName
                        ? 'bg-brand-indigo text-[#FAF9F5] shadow-sm'
                        : 'bg-white hover:bg-white/80 text-brand-indigo border border-brand-slate-pale'
                    }`}
                  >
                    {catName === 'All' ? 'All updates' : catName}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:w-64 font-sans">
                <input
                  type="text"
                  placeholder="Search updates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-brand-slate-pale rounded-xl pl-9 pr-4 py-2 text-xs text-brand-indigo/90 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-brand-indigo/40" />
              </div>
            </div>

            {/* Posts Grid Container */}
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setReadingPost(post)}
                    className="group border-modular bg-white hover:border-brand-teal rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-sm flex flex-col md:flex-row gap-6 cursor-pointer items-start text-left"
                  >
                    {/* Placeholder custom vector thumbnail for high-grade visual personality */}
                    <div className="w-full md:w-44 aspect-video md:aspect-square bg-[#FAF9F5] rounded-2xl border border-brand-slate-pale/50 flex-shrink-0 flex items-center justify-center relative overflow-hidden transition-transform duration-300">
                      <div className="absolute inset-0 bg-mesh-grid opacity-10 pointer-events-none"></div>
                      <span className="text-[10px] font-extrabold uppercase text-brand-indigo/60 tracking-wider font-ui relative z-10 text-center px-4">
                        {post.category} Node
                      </span>
                      {/* Motif display */}
                      <div className="absolute opacity-[0.06] text-brand-orange text-8xl font-serif font-black select-none pointer-events-none">
                        n
                      </div>
                    </div>

                    <div className="flex-grow flex flex-col justify-between h-full font-sans">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-brand-indigo/60 font-ui whitespace-nowrap">
                          <span className="bg-brand-teal/8 text-brand-teal px-2.5 py-0.5 rounded text-[9px] font-bold uppercase">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-[9px] uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-black font-serif text-brand-indigo group-hover:text-brand-orange transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-xs md:text-sm text-brand-indigo/80 leading-relaxed font-sans line-clamp-2">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-brand-slate-pale/50 mt-5 flex items-center justify-between text-xs font-ui">
                        <span className="text-brand-indigo/65 font-bold text-[10px]">By {post.author} • {post.readTime}</span>
                        <span className="text-brand-indigo font-black inline-flex items-center gap-1 group-hover:text-brand-orange text-[10px] tracking-wider uppercase">
                          Read More <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-modular bg-[#FAF9F5]/40 rounded-[2rem] p-12 text-center text-sans">
                <FileText className="w-10 h-10 text-brand-indigo/40 mx-auto mb-4" />
                <h4 className="text-base font-bold text-brand-indigo mb-1">No updates found</h4>
                <p className="text-xs text-brand-indigo/70 max-w-[320px] mx-auto font-sans">
                  No posts yet — updates will appear here as our work progresses and milestones are verified.
                </p>
              </div>
            )}

          </div>

          {/* RIGHT COMPARTMENT: Sidebar / SignUp Card (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-8 text-left">
            
            {/* 1. Email Sign up Box */}
            <div className="border-modular bg-[#FAF9F5]/50 rounded-3xl p-8 text-left space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-mesh-grid opacity-10 pointer-events-none"></div>
              
              <div className="relative z-10 font-sans">
                <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-2xl inline-block node-pulse">
                  <Mail className="w-5 h-5 text-brand-orange" />
                </div>
                <h4 className="text-lg font-serif font-black text-brand-indigo leading-tight mt-3">
                  Subscribe for Progress Letters
                </h4>
                <p className="text-xs text-brand-indigo/80 leading-relaxed font-sans">
                  Stay updated as our feasibility study finishes and our first experimental microsystem nodes enter operation.
                </p>

                {!subbed ? (
                  <form onSubmit={handleSubSubmit} className="space-y-2 mt-4 font-sans">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="practitioner@work.org"
                      className="w-full bg-white border border-brand-slate-pale rounded-xl px-3 py-2 text-xs text-brand-indigo/90 focus:outline-none focus:border-brand-teal font-sans"
                    />
                    <button
                      type="submit"
                      className="w-full bg-brand-indigo hover:bg-brand-orange text-[#FAF9F5] py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                ) : (
                  <div className="text-xs text-brand-teal font-bold bg-brand-teal/5 p-3 rounded-lg border border-brand-teal/20 text-center animate-in zoom-in duration-300 flex items-center gap-2 justify-center font-sans mt-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Categorization Explainer Box */}
            <div className="border-modular bg-white rounded-3xl p-8 text-left space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal font-ui">
                Structural Taxonomy
              </span>
              <h4 className="text-lg font-serif font-black text-brand-indigo leading-tight">
                Categories We Publish
              </h4>
              
              <ul className="space-y-4 text-xs leading-relaxed text-brand-indigo/95 font-sans">
                <li>
                  <strong className="text-brand-indigo block font-serif text-sm font-extrabold">Announcements:</strong>
                  Key operation updates, pilot site approvals, and structural appointments directly from administrative nodes.
                </li>
                <li>
                  <strong className="text-[#D66C3E] block font-serif text-sm font-extrabold">Stories from the Network:</strong>
                  Human-centred narratives, field reviews, village logs, and participatory design summaries.
                </li>
                <li>
                  <strong className="text-brand-teal block font-serif text-sm font-extrabold">Progress Updates:</strong>
                  Specific project milestones, operational trial telemetry checks, and design adaptations.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. MODAL FOR DETAILED ARTICLE READING */}
      {readingPost && (
        <div className="fixed inset-0 z-50 bg-brand-indigo/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200 font-sans">
          <div className="bg-white rounded-[2rem] border border-brand-slate-pale shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8 relative flex flex-col text-left">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-5 md:p-6 border-b border-brand-slate-pale/50 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="bg-brand-indigo/5 text-brand-indigo text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded">
                  {readingPost.category}
                </span>
                <span className="text-[10px] text-brand-indigo/60 font-bold uppercase tracking-wider">{readingPost.date}</span>
               </div>
              <button
                onClick={() => setReadingPost(null)}
                className="p-2 text-brand-indigo hover:bg-brand-indigo/5 rounded-full transition-colors focus:outline-none cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 space-y-6">
              
              <h2 className="text-2.5xl md:text-3.5xl font-serif text-brand-indigo font-black leading-tight mb-4">
                {readingPost.title}
              </h2>

              <div className="flex items-center gap-3 border-b border-brand-slate-pale/50 pb-6 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center font-serif font-black text-sm select-none">
                  {readingPost.author.substring(0, 2)}
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-brand-indigo font-ui uppercase tracking-wider">{readingPost.author}</p>
                  <p className="text-[10px] text-brand-indigo/60 font-medium">Published contributor node • {readingPost.readTime}</p>
                </div>
              </div>

              {/* Detailed Markdown-Like content compiled manually to look professional */}
              <div className="text-sm md:text-base text-brand-indigo/90 space-y-6 leading-relaxed font-sans">
                {readingPost.content.split('\n\n').map((para, idx) => {
                  if (para.startsWith('###')) {
                    return (
                      <h4 key={idx} className="text-lg md:text-xl font-serif font-black text-brand-indigo pt-6 border-b border-brand-slate-pale/30 pb-2 leading-none">
                        {para.replace('###', '').trim()}
                      </h4>
                    );
                  }
                  if (para.startsWith('1.') || para.startsWith('-')) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-3 mt-3 font-semibold text-xs md:text-sm">
                        {para.split('\n').map((li, lidx) => (
                          <li key={lidx}>{li.replace(/^[-\d\.\s*]+/, '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} className="text-xs md:text-sm leading-relaxed">{para}</p>;
                })}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 md:p-6 bg-[#FAF9F5] border-t border-brand-slate-pale/50 text-right sticky bottom-0">
              <button
                onClick={() => setReadingPost(null)}
                className="bg-brand-indigo text-[#FAF9F5] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
