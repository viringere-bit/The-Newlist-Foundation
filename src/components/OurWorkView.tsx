import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Sparkles, Network, ArrowRight, CheckCircle2, ShieldCheck, Scale, Globe, Compass } from 'lucide-react';
import { ActivePage } from '../types';
import AestheticImage from './AestheticImage';

// Real high fidelity images imported safely
import heroIllustration from '../assets/images/hero_connection_diagram_1780786538847.png';
import communityCollaboration from '../assets/images/community_collaboration_1.png';
import sustainableInfrastructure from '../assets/images/sustainable_infrastructure_1780786576712.png';
import workingTogether from '../assets/images/working_together.jpg';
import workingTogether1 from '../assets/images/working_together_1.jpg';
import workshop from '../assets/images/workshop.jpg';
import workship1 from '../assets/images/workship_1.jpg';

interface OurWorkProps {
  setActivePage: (page: ActivePage) => void;
}

export default function OurWorkView({ setActivePage }: OurWorkProps) {
  const [activeTab, setActiveTab] = useState<'feasibility' | 'mvp' | 'network'>('feasibility');

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full bg-[#FAF9F5]">
      
      {/* ========================================== */}
      {/* SECTION 1: HERO VIEW                       */}
      {/* ========================================== */}
      <section className="relative py-24 lg:py-32 overflow-hidden px-6 text-center border-b border-brand-slate-pale/40">
        <div className="absolute inset-0 bg-mesh-grid opacity-[0.08] pointer-events-none"></div>
        <div className="max-w-[1000px] mx-auto relative z-10 space-y-8">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#D66C3E] block font-ui">
            Our Phased Pathway
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-indigo font-black tracking-tight leading-[1.08] max-w-[900px] mx-auto">
            Practical, regenerative systems built for community scale.
          </h1>
          <p className="text-base md:text-lg text-brand-slate-dark max-w-[720px] mx-auto leading-relaxed">
            The Newlist model is designed in phases. We begin with empirical evidence at local levels before developing physical microsystems and empowering decentralized co-ops.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: TABBED BLUEPRINT DETAILS        */}
      {/* ========================================== */}
      <section className="py-24 px-6 bg-white border-b border-brand-slate-pale/35">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="max-w-[760px] text-left mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block font-ui">
              The Blueprint Stages
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              A Phased Approach to Systemic Change.
            </h2>
          </div>

          {/* Navigation Tab Pills (Apple style) */}
          <div className="flex flex-wrap justify-start border-b border-brand-slate-pale/65 mb-12 gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab('feasibility')}
              className={`pb-4 px-4 font-ui text-xs md:text-sm font-bold uppercase tracking-wider relative transition-colors cursor-pointer ${
                activeTab === 'feasibility' ? 'text-brand-indigo' : 'text-brand-slate hover:text-brand-indigo'
              }`}
            >
              1. Feasibility Study
              {activeTab === 'feasibility' && (
                <motion.div layoutId="workTabsHighlight" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-orange rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('mvp')}
              className={`pb-4 px-4 font-ui text-xs md:text-sm font-bold uppercase tracking-wider relative transition-colors cursor-pointer ${
                activeTab === 'mvp' ? 'text-brand-indigo' : 'text-brand-slate hover:text-brand-indigo'
              }`}
            >
              2. MVP Build
              {activeTab === 'mvp' && (
                <motion.div layoutId="workTabsHighlight" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-teal rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`pb-4 px-4 font-ui text-xs md:text-sm font-bold uppercase tracking-wider relative transition-colors cursor-pointer ${
                activeTab === 'network' ? 'text-brand-indigo' : 'text-brand-slate hover:text-brand-indigo'
              }`}
            >
              3. The Newlist Network
              {activeTab === 'network' && (
                <motion.div layoutId="workTabsHighlight" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-indigo rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="mt-8 text-left">
            
            {/* Feasibility Stage */}
            {activeTab === 'feasibility' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-12 p-8 md:p-12 rounded-[2.5rem] bg-[#FAF9F5] border border-brand-slate-pale/50 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden shadow-sm">
                  <div className="p-4 bg-brand-orange text-white rounded-2xl shrink-0">
                    <ClipboardCheck className="w-8 h-8" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-indigo leading-tight">
                      Phase 1: Proof of Concept / Feasibility Study
                    </h3>
                    <p className="text-sm md:text-base text-brand-slate-dark max-w-[850px] leading-relaxed">
                      We’re conducting a rigorous feasibility study to understand how integrated systems can reduce economic inequity while supporting regenerative practices. This work helps us identify what communities need most, what barriers they face, and which interventions create the greatest long-term impact. It’s the foundation for everything that follows.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-slate-pale/40">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold font-serif text-brand-indigo">1. Diagnostic Field Mapping</h4>
                        <p className="text-xs text-brand-slate-dark leading-relaxed">
                          We map the localized cost loads in rent, transit fares, and micro-debt structures that trap family assets out of regional control.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold font-serif text-brand-indigo">2. Systems Viability Audit</h4>
                        <p className="text-xs text-brand-slate-dark leading-relaxed">
                          We design legal trust agreements and co-op models, validating safe investment terms to ensure absolute resilience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MVP Stage */}
            {activeTab === 'mvp' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-12 p-8 md:p-12 rounded-[2.5rem] bg-[#FAF9F5] border border-brand-slate-pale/50 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden shadow-sm">
                  <div className="p-4 bg-brand-teal text-white rounded-2xl shrink-0">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-indigo leading-tight">
                      Phase 2: MVP Build
                    </h3>
                    <p className="text-sm md:text-base text-brand-slate-dark max-w-[850px] leading-relaxed">
                      The MVP will be a small-scale, real-world demonstration of what a Newlist system could look like. This might include a microsystem that brings together housing, financial management, mobility support, and employment, entrepreneurship, or education support in a single pilot location. By testing these elements together, we learn how community-driven systems can enable prosperity for people and planet.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-slate-pale/40">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold font-serif text-brand-indigo">1. Integrated Microsystems</h4>
                        <p className="text-xs text-brand-slate-dark leading-relaxed">
                          Testing a modular community-owned grid bringing together eco-housing shelters, micro-mobility, and sovereign ledger management.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold font-serif text-brand-indigo">2. Continuous Feedback Loop</h4>
                        <p className="text-xs text-brand-slate-dark leading-relaxed">
                          Lived-experience feedback informs regular prototype adjustments, guaranteeing maximum usability and human dignity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Network Stage */}
            {activeTab === 'network' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-in fade-in duration-300">
                <div className="lg:col-span-12 p-8 md:p-12 rounded-[2.5rem] bg-[#FAF9F5] border border-brand-slate-pale/50 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden shadow-sm">
                  <div className="p-4 bg-brand-indigo text-white rounded-2xl shrink-0">
                    <Network className="w-8 h-8" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-indigo leading-tight">
                      Phase 3: The Newlist Network
                    </h3>
                    <p className="text-sm md:text-base text-brand-slate-dark max-w-[850px] leading-relaxed">
                      We’re building a network of people, partners, and communities who want to redesign the systems that shape how we live, work, and thrive. This network will grow as more people join, contribute, your experience, and help co-create solutions that are fair, regenerative, and built for everyone.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-slate-pale/40">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold font-serif text-brand-indigo">1. Joint Decentralized Scaling</h4>
                        <p className="text-xs text-brand-slate-dark leading-relaxed">
                          Rather than scaling centrally, we empower local node groups by supplying complete blueprints to deploy their own microsystem pilots.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold font-serif text-brand-indigo">2. Structural Interdependence</h4>
                        <p className="text-xs text-brand-slate-dark leading-relaxed">
                          Shared learnings and resource swaps between nodes create a decentralized, sustainable inter-node ecosystem safety net.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: PERFORMANCE & SCALABILITY      */}
      {/* ========================================== */}
      <section className="py-24 md:py-32 bg-[#FAF9F5] px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-center">
          
          {/* Column 1 - Left copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-orange block font-ui">
              System Alignment
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              Evaluation, Verification, and Scalability.
            </h2>
            <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed">
              Our movement is evaluation-driven: design choices are validated by measurable system performance. We track household asset retention, local resource production, and community autonomy indicators with absolute rigor, releasing findings under open creative commons.
            </p>
          </div>

          {/* Column 2 - Styled Key indicators grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="sm:col-span-2 rounded-[2rem] overflow-hidden shadow-md border border-brand-slate-pale/40 bg-white p-3 h-52 md:h-64">
              <AestheticImage
                src={sustainableInfrastructure}
                alt="Cooperative tracking systems for renewable community assets"
                className="w-full h-full rounded-2xl"
              />
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-brand-slate-pale/40 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/5 flex items-center justify-center text-brand-teal">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-black text-brand-indigo">
                Accountability Standards
              </h3>
              <p className="text-xs text-brand-slate-dark leading-relaxed font-sans">
                Rigorous peer reviews and periodic diagnostic trial updates guarantee every program conforms to ethical guidelines, legal safety, and open audit integrity.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-brand-slate-pale/40 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/5 flex items-center justify-center text-brand-orange">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-black text-brand-indigo">
                Ecological Alignment
              </h3>
              <p className="text-xs text-brand-slate-dark leading-relaxed font-sans">
                Sovereign community solar assets and low-overhead electric transit are evaluated regularly to optimize carbon offset and local wealth generation simultaneously.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: HOW COMMUNITIES JOIN            */}
      {/* ========================================== */}
      <section className="py-24 bg-white px-6 border-y border-brand-slate-pale/30">
        <div className="max-w-[1000px] mx-auto text-left space-y-12">
          
          <div className="text-center md:text-left mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block font-ui">
              Activation
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              How Communities Join the Newlist Network.
            </h2>
            <p className="text-xs md:text-sm text-brand-slate-dark max-w-[620px]">
              Communities join by adopting core principles of shared custody, transparent governance, and environmental care. We promise complete partnership and operational support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF9F5] rounded-[2rem] p-8 border border-brand-slate-pale/40 space-y-4">
              <span className="text-[9px] uppercase font-extrabold font-ui tracking-wider text-[#D66C3E] bg-brand-orange/5 px-2.5 py-1 rounded inline-block">
                Action Step
              </span>
              <h3 className="text-xl font-serif font-black text-brand-indigo">
                Node Activation Blueprint
              </h3>
              <p className="text-xs text-brand-slate-dark leading-relaxed">
                By dedicating local collective land or cooperative solar infrastructure to the local land trust, community groups can initiate feasibility alignment studies with our technical unit.
              </p>
            </div>

            <div className="bg-[#FAF9F5] rounded-[2rem] p-8 border border-brand-slate-pale/40 space-y-4">
              <span className="text-[9px] uppercase font-extrabold font-ui tracking-wider text-brand-teal bg-brand-teal/5 px-2.5 py-1 rounded inline-block">
                Our Promise
              </span>
              <h3 className="text-xl font-serif font-black text-brand-indigo">
                Complete Integrity & Rigor
              </h3>
              <p className="text-xs text-[#13222F]/90 leading-relaxed font-sans font-medium">
                We promise a partnership grounded in evidence and operational rigor. We will provide full access to blueprints, data models, legal structures, and coordination guidelines to help local nodes run smoothly.
              </p>
            </div>
          </div>

          <div className="pt-8 text-center">
            <button
              onClick={() => handleNav('involved')}
              className="inline-flex items-center gap-2 bg-[#D66C3E] hover:bg-[#3B9BA8] text-[#FAF9F5] px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer"
            >
              Start Node Alignment Study
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: FINAL MOVEMENT CTA              */}
      {/* ========================================== */}
      <section className="bg-gradient-to-tr from-brand-slate-pale/5 via-[#FAF9F5] to-brand-orange/5 py-24 px-6 text-center">
        <div className="max-w-[800px] mx-auto space-y-8">
          <h2 className="text-3xl md:text-4.5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
            Help Us Build Modular Community Systems.
          </h2>
          <p className="text-xs md:text-sm text-brand-slate-dark max-w-[620px] mx-auto leading-relaxed">
            The transition from extractive frameworks towards localized regenerative networks requires shared expertise, local node land trust structures, and persistent, focused community-driven action.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => handleNav('involved')}
              className="bg-[#13222F] hover:bg-brand-orange text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm transform hover:-translate-y-0.5 cursor-pointer"
            >
              Get Involved
            </button>
            <button
              onClick={() => handleNav('news')}
              className="bg-transparent border border-brand-indigo text-[#13222F] hover:bg-[#13222F] hover:text-[#FAF9F5] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-350 cursor-pointer"
            >
              Ecosystem Blog
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
