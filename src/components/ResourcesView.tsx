import React, { useState } from 'react';
import { Filter, Library, Bell, CheckCircle2 } from 'lucide-react';

export default function ResourcesView() {
  const [filter, setFilter] = useState<'All' | 'Report' | 'Guide' | 'Research'>('All');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Future Resource Publications List
  const resources = [
    {
      id: 'res-1',
      title: 'Structural Systems Analysis of Urban Inequity',
      type: 'Research',
      desc: 'An analytical paper detailing structural drivers behind high-leverage household expenses including housing and localized mobility.',
      status: 'In Peer Review',
      date: 'Est. Q3 2026'
    },
    {
      id: 'res-2',
      title: 'The Blueprint Guide to Community-Owned Networks',
      type: 'Guide',
      desc: 'An operations handbook detailing the modular steps, data schemas, and training pipelines to host a localized micro-node.',
      status: 'Drafting Phase',
      date: 'Est. Q4 2026'
    },
    {
      id: 'res-3',
      title: 'Feasibility Trial Diagnostic Audit: Pilot Site Alpha',
      type: 'Report',
      desc: 'First site trial monitoring report with data regarding cost-to-impact ratios, variance metrics, and community feedback surveys.',
      status: 'Initial Diagnostic Study',
      date: 'Est. Q2 2027'
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const filteredResources = filter === 'All' ? resources : resources.filter(r => r.type === filter);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      
      {/* 1. HERO RE-ANCHOR */}
      <section className="relative overflow-hidden bg-mesh-grid bg-mesh-soft py-24 lg:py-32 text-center border-b border-brand-slate-pale/60">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block mb-4 font-ui">
            Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-indigo font-black tracking-tight leading-[1.1] mb-6">
            Resources & Publications
          </h1>
          <p className="text-base md:text-lg text-brand-indigo/80 max-w-[750px] mx-auto leading-relaxed font-sans">
            The Newlist Foundation is committed to becoming a trusted knowledge hub for distributed wealth systems and environmental regeneration.
          </p>
        </div>
      </section>

      {/* 2. THE MAIN HOLDING STATEMENT DISPLAY CARD */}
      <section className="bg-white py-24 border-b border-brand-slate-pale/30 relative">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="border-modular bg-[#FAF9F5] rounded-[2.5rem] p-8 md:p-16 text-center space-y-8 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh-grid opacity-15 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-6 node-pulse">
                <Library className="w-8 h-8" />
              </div>

              <h2 className="text-2.5xl md:text-4xl font-serif text-brand-indigo font-black tracking-tight leading-tight max-w-[620px] mx-auto">
                “All research outputs will be published here as they are completed.”
              </h2>

              <p className="text-xs md:text-sm text-brand-indigo/80 max-w-[500px] mx-auto leading-relaxed font-sans">
                We are currently in active field trials and diagnostic testing. In alignment with our principles of accountability and integrity, we will upload all playbooks, schemas, and audits here as they pass peer review.
              </p>

              <div className="pt-4 flex justify-center">
                <span className="h-[2px] w-20 bg-brand-teal block rounded-full"></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FUTURE PUBLICATIONS FILTER PREVIEW */}
      <section className="bg-white py-24 lg:py-32 border-b border-brand-slate-pale/30">
        <div className="max-w-[1400px] mx-auto px-6">
          
          <div className="text-center max-w-[650px] mx-auto mb-16 text-left">
            <h3 className="text-2.5xl font-serif text-brand-indigo font-black rounded-lg">
              Planned Publications Pipeline
            </h3>
            <p className="text-sm text-brand-indigo/70 mt-3 font-sans">
              A catalog of upcoming documents currently being synthesized by our multidisciplinary research panel.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-2">
            {(['All', 'Report', 'Guide', 'Research'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  filter === t
                    ? 'bg-brand-indigo text-[#FAF9F5] shadow-sm'
                    : 'bg-[#FAF9F5] hover:bg-[#FAF9F5]/70 border border-brand-slate-pale text-brand-indigo'
                }`}
              >
                <Filter className="w-3.5 h-3.5 opacity-60" />
                {t}
              </button>
            ))}
          </div>

          {/* Planned Pipeline Cards list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="border-modular bg-white p-8 md:p-10 rounded-3xl flex flex-col justify-between hover:border-brand-teal transition-all duration-300 relative overflow-hidden text-left"
              >
                {/* Visual Status Rib */}
                <div className="absolute top-0 right-0 bg-brand-teal/8 text-brand-teal text-[9px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-bl-xl font-ui border-l border-b border-brand-slate-pale/40">
                  {res.status}
                </div>

                <div className="space-y-4 font-sans">
                  <span className="text-[9px] font-extrabold uppercase text-brand-orange tracking-widest font-ui bg-brand-orange/5 border border-brand-orange/10 px-2.5 py-1 rounded inline-block">
                    {res.type}
                  </span>
                  <h4 className="text-lg font-bold font-serif text-brand-indigo tracking-tight leading-snug">
                    {res.title}
                  </h4>
                  <p className="text-xs text-brand-indigo/80 leading-relaxed mt-3">
                    {res.desc}
                  </p>
                </div>

                <div className="mt-10 pt-5 border-t border-brand-slate-pale/50 flex justify-between items-center text-xs">
                  <span className="text-brand-indigo/60 font-bold uppercase tracking-wider font-ui text-[10px]">
                    {res.date}
                  </span>
                  <span className="text-[10px] text-brand-indigo/50 font-extrabold uppercase tracking-widest font-ui bg-brand-indigo/5 border border-brand-slate-pale px-3 py-1.5 rounded cursor-not-allowed">
                    Lock State
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SUBSCRIPTION PANEL FOR KNOWLEDGE UPDATES */}
      <section className="bg-gradient-to-tr from-brand-slate-pale/20 via-[#FAF9F5] to-brand-orange/5 py-24 border-t border-b border-brand-slate-pale/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="border-modular bg-white rounded-[2.5rem] p-10 md:p-16 shadow-sm text-center space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh-grid opacity-10 pointer-events-none"></div>
            
            <div className="relative z-10 font-sans">
              <div className="w-12 h-12 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-4 node-pulse">
                <Bell className="w-5 h-5 text-brand-teal" />
              </div>

              <h3 className="text-2xl md:text-3.5xl font-serif font-black text-brand-indigo">
                Notify Me of Document Releases
              </h3>

              <p className="text-xs md:text-sm text-brand-indigo/80 max-w-[500px] mx-auto leading-relaxed font-sans">
                Sign up below to receive direct, clean email notifications with downloadable PDF blueprints once systems trials are certified. We promise zero spam, strictly analytical research data.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full bg-white border border-brand-slate-pale/85 rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="submit"
                    className="bg-brand-indigo hover:bg-brand-orange text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    Join Alerts List
                  </button>
                </form>
              ) : (
                <div className="text-brand-teal font-serif font-bold text-xs bg-brand-teal/5 p-4 rounded-xl border border-brand-teal/20 max-w-sm mx-auto animate-in zoom-in duration-300 flex items-center gap-2 justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Success! <strong>{email}</strong> added to notify queue.</span>
                </div>
              )}

              <p className="text-[9px] text-brand-indigo/60 italic pt-6 font-ui uppercase tracking-wider">
                All published outputs are licensed under Apache 2.0 / open commons sharing.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
