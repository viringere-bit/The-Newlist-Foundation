import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Users, Layers, Award, Target, HelpCircle, ArrowRight, CheckCircle, Shield, Linkedin } from 'lucide-react';
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

interface AboutViewProps {
  setActivePage: (page: ActivePage) => void;
}

export default function AboutView({ setActivePage }: AboutViewProps) {
  const [activeTab, setActiveTab] = useState<'story' | 'approach' | 'values'>('story');

  const approachSteps = [
    {
      title: 'Understand the system',
      subtitle: 'Analyze Structural Dynamics',
      desc: 'We begin by observing the system as it actually works. We listen closely, map the forces at play, and identify the constraints that shape people’s daily lives.',
    },
    {
      title: 'Prototype solutions',
      subtitle: 'Engineer System Prototypes',
      desc: 'We design small, practical interventions that respond directly to what we’ve learned. Each prototype is built to be tested, measured, and refined.',
    },
    {
      title: 'Evaluate performance',
      subtitle: 'Rigorous Empirical Testing',
      desc: 'We assess how each intervention behaves in real conditions. We look for reliability, cost-effectiveness, and the ability to deliver consistent outcomes across different contexts.',
    },
    {
      title: 'Refine and adapt',
      subtitle: 'Prepare for Replication',
      desc: 'We adjust the model based on what the evidence shows. The goal is steady improvement — removing what doesn’t work, strengthening what does, and preparing the system for responsible replication.',
    }
  ];

  const values = [
    {
      number: 1,
      title: 'Dignity',
      desc: 'Every person deserves to be treated as inherently valuable, without exception.',
      category: 'Foundation'
    },
    {
      number: 2,
      title: 'Equity',
      desc: 'Opportunity should not depend on circumstance; systems must distribute it fairly.',
      category: 'Foundation'
    },
    {
      number: 3,
      title: 'Integrity',
      desc: 'Institutions must act with honesty, coherence, and moral consistency.',
      category: 'Process'
    },
    {
      number: 4,
      title: 'Accountability',
      desc: 'Power must answer for its decisions and their impact on people’s lives.',
      category: 'Process'
    },
    {
      number: 5,
      title: 'Agency',
      desc: 'People deserve meaningful influence over the decisions that shape their futures.',
      category: 'Outcome'
    },
    {
      number: 6,
      title: 'Fairness',
      desc: 'Systems should produce outcomes that are consistent, impartial, and just.',
      category: 'Outcome'
    }
  ];

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
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-orange block font-ui">
            About The Foundation
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-indigo font-black tracking-tight leading-[1.08] max-w-[900px] mx-auto">
            Redesigning systems so people and planet can thrive.
          </h1>
          <p className="text-base md:text-lg text-brand-slate-dark max-w-[720px] mx-auto leading-relaxed">
            The Newlist Foundation exists to reduce economic inequity and regenerate the world we share. We bring together research, design, and community-driven action to build systems that enable lasting prosperity — for everyone.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: OUR PURPOSE                     */}
      {/* ========================================== */}
      <section className="bg-white py-24 px-6 border-b border-brand-slate-pale/35">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <div className="inline-flex p-3 bg-brand-teal/10 text-brand-teal rounded-full">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-4.5xl font-serif text-brand-indigo font-black tracking-tight">
            Our Purpose
          </h2>
          <p className="text-lg md:text-xl text-brand-indigo leading-relaxed font-serif font-light italic max-w-[820px] mx-auto">
            “Our purpose is to help create a world where prosperity and planetary health reinforce one another, not compete. The Newlist Foundation exists to reduce economic inequity by designing systems that are practical, regenerative, and shaped with communities. We believe that when people have access to stable foundations — from housing and mobility to financial tools and education — they can build futures that are secure, dignified, and full of possibility.”
          </p>
          <div className="pt-4">
            <span className="h-[2px] w-24 bg-brand-orange inline-block rounded-full"></span>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: TABBED STORY / VALUES / APPROACH*/}
      {/* ========================================== */}
      <section className="py-24 px-6 bg-[#FAF9F5]/30">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Navigation Tabs Bar */}
          <div className="flex justify-center border-b border-brand-slate-pale/60 max-w-[620px] mx-auto mb-16 px-1 gap-2 md:gap-6">
            {(['story', 'approach', 'values'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-ui text-xs md:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                  activeTab === tab 
                    ? 'text-brand-indigo' 
                    : 'text-brand-slate hover:text-brand-indigo'
                }`}
              >
                {tab === 'story' && 'Our Story'}
                {tab === 'approach' && 'Our Approach'}
                {tab === 'values' && 'Our Values'}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabsUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-orange rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="mt-8">
            
            {/* Tab 1: STORY - Told chronologically, very clean */}
            {activeTab === 'story' && (
              <div className="max-w-[1000px] mx-auto space-y-12 text-left animate-in fade-in duration-300">
                <div className="text-center md:text-left mb-8 max-w-[640px]">
                  <h3 className="text-2.5xl md:text-4xl font-serif text-brand-indigo font-black tracking-tight mb-3">
                    The Genesis of Newlist
                  </h3>
                  <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans">
                    A mission born not from academic observation, but from direct lived experience of systemic failures.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Side quote card & Human photo */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="rounded-3xl overflow-hidden shadow-md border border-brand-slate-pale/40 bg-white p-3">
                      <AestheticImage
                        src={workingTogether1}
                        alt="Beloved community and family members thriving in a secure system environment"
                        className="w-full h-48 md:h-64 rounded-2xl"
                        imgClassName="rounded-2xl"
                      />
                    </div>
                    <div className="bg-white border border-brand-slate-pale/40 rounded-3xl p-8 shadow-sm">
                      <p className="text-base md:text-lg text-brand-indigo font-serif font-black tracking-tight leading-relaxed italic">
                        "The systems meant to protect people often fail them at the exact moment they are needed most."
                      </p>
                      <div className="w-12 h-[2px] bg-brand-orange mt-6 rounded-full"></div>
                      <p className="text-[10px] text-brand-slate font-extrabold uppercase font-ui tracking-wider mt-4">
                        ❖ Victor Squiss-Banigo, Founder
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Chronological Story Blocks */}
                  <div className="md:col-span-7 space-y-8">
                    
                    {/* Block 1 */}
                    <div className="bg-white p-8 rounded-3xl border border-brand-slate-pale/40 shadow-sm relative overflow-hidden">
                      <span className="text-[9px] font-extrabold font-ui uppercase tracking-widest text-brand-teal bg-brand-teal/5 px-2.5 py-1 rounded border border-brand-teal/10 inline-block mb-3">
                        The Lived Reality
                      </span>
                      <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans">
                        Our founder Victor Squiss-Banigo learned the structural failures of our economic safety nets firsthand. Raised in a stable, middle-class home, surrounded by the quiet assumptions of safety, continuity, and opportunity, he watched those assumptions collapse overnight. Forced to navigate a systemic collapse as an asylum seeker, Victor was suddenly exposed to temporary housing, absolute vulnerability, and bureaucratic indifference.
                      </p>
                    </div>

                    {/* Block 2 */}
                    <div className="bg-white p-8 rounded-3xl border border-brand-slate-pale/40 shadow-sm relative overflow-hidden">
                      <span className="text-[9px] font-extrabold font-ui uppercase tracking-widest text-[#D66C3E] bg-brand-orange/5 px-2.5 py-1 rounded border border-brand-orange/10 inline-block mb-3">
                        The Cost of Inequality
                      </span>
                      <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans">
                        While working and studying to rebuild his life, Victor encountered a devastating truth: hardships are rarely due to individual failure, but are the direct outcome of current systemic design. When systems are designed without equity, those experiencing hardship are locked into an architecture that compound instability. Victor resolved to treat justice not as a rhetorical moral plea, but as an engineering blueprint.
                      </p>
                    </div>

                    {/* Block 3 */}
                    <div className="bg-white p-8 rounded-3xl border border-brand-slate-pale/40 shadow-sm relative overflow-hidden">
                      <span className="text-[9px] font-extrabold font-ui uppercase tracking-widest text-brand-indigo bg-brand-indigo/5 px-2.5 py-1 rounded border border-brand-indigo/10 inline-block mb-3">
                        The Mission
                      </span>
                      <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans">
                        Victor spent subsequent decades gathering multidisciplinary experience across product engineering, project management, charity operations, and strategic capitalization. Every career waypoint was a preparation step. The Newlist Foundation is the synthesis of those distinct disciplines: a machine designed to construct reliable, permanent scaffolds that keep families safe, secure, and resilient.
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: APPROACH - Process oriented Bento Grid */}
            {activeTab === 'approach' && (
              <div className="max-w-[1240px] mx-auto text-left space-y-12 animate-in fade-in duration-300">
                <div className="text-center max-w-[640px] mx-auto mb-12">
                  <h3 className="text-2.5xl md:text-4xl font-serif text-brand-indigo font-black tracking-tight mb-3">
                    Our Operational System
                  </h3>
                  <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans">
                    How the Newlist Foundation translates systemic ideals into verifiable field trials and robust blueprints.
                  </p>
                </div>

                {/* 4 Steps Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {approachSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-[2rem] p-8 border border-brand-slate-pale/35 flex flex-col justify-between hover:border-brand-teal transition-all duration-300 shadow-sm/30"
                    >
                      <span className="text-3xl font-serif font-black text-brand-orange/30 block mb-6">
                        0{idx + 1}
                      </span>
                      <div className="space-y-2">
                        <h4 className="text-base font-bold text-brand-indigo font-serif tracking-tight leading-snug">
                          {step.title}
                        </h4>
                        <p className="text-[10px] text-brand-teal font-extrabold uppercase font-ui tracking-widest pb-3 border-b border-brand-slate-pale/40">
                          {step.subtitle}
                        </p>
                        <p className="text-xs text-brand-slate-dark leading-relaxed font-sans mt-3">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Why This Matters editorial banner */}
                <div className="border-modular bg-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-mesh-grid opacity-10 pointer-events-none"></div>
                  <div className="relative z-10 max-w-[800px] mx-auto text-center space-y-4">
                    <h4 className="text-xl font-serif text-brand-indigo font-black">
                      Why This Matters
                    </h4>
                    <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed">
                      In every community, the same pattern appears: outcomes follow the structure of the system. If the system is extractive and fragmented, it drains a household’s energy, money, and hope. To change the outcomes, we must change the structure.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: VALUES - Styled beautifully like dynamic cards */}
            {activeTab === 'values' && (
              <div className="max-w-[1240px] mx-auto text-left space-y-12 animate-in fade-in duration-300">
                <div className="text-center max-w-[640px] mx-auto mb-12">
                  <h3 className="text-2.5xl md:text-4xl font-serif text-brand-indigo font-black tracking-tight mb-3">
                    The Justice Arc
                  </h3>
                  <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans">
                    Six core principles that structure our engineering processes and coordinate our networks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {values.map((val) => (
                    <div 
                      key={val.number} 
                      className="bg-white p-8 rounded-[2rem] border border-brand-slate-pale/40 flex flex-col justify-between hover:border-brand-orange hover:scale-[1.01] transition-all duration-300 shadow-sm"
                    >
                      <div className="space-y-4">
                        <span className="w-8 h-8 rounded-xl bg-brand-indigo/5 text-brand-indigo flex items-center justify-center font-serif font-black text-sm">
                          {val.number}
                        </span>
                        <h4 className="text-lg font-bold text-brand-indigo font-serif leading-tight pt-2">
                          {val.title}
                        </h4>
                        <p className="text-xs text-brand-slate-dark leading-relaxed font-sans">
                          {val.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-brand-slate-pale/30 mt-6 flex justify-between items-center">
                        <span className="text-[8px] font-extrabold uppercase font-ui tracking-widest text-brand-slate">
                          Standard Layer
                        </span>
                        <span className="text-[8px] font-extrabold uppercase tracking-wider font-ui text-[#D66C3E] px-2 py-0.5 rounded bg-brand-orange/5">
                          {val.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: TEAM LEADERS (Humanized)        */}
      {/* ========================================== */}
      <section className="bg-white py-24 md:py-32 px-6 border-y border-brand-slate-pale/40">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-left max-w-[760px] mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block font-ui">
              The Team
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              Our People
            </h2>
            <p className="text-base text-brand-slate-dark max-w-[560px]">
              Our work is carried out by a multidisciplinary team with experience across governance, social impact, engineering, community engagement, and organisational leadership.
            </p>
          </div>

          {/* Founder block - Large prominent spotlight bento */}
          <div className="bg-[#FAF9F5] rounded-[3rem] p-8 md:p-12 border border-brand-slate-pale/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left mb-16">
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              {/* Sleek aesthetic representation of Victor */}
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2.2rem] overflow-hidden border border-brand-slate-pale/80 shadow-lg relative group">
                <AestheticImage
                  src={communityCollaboration}
                  alt="Victor Squiss-Banigo co-designing with community leaders"
                  className="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 right-2 z-20 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl text-center border border-brand-slate-pale/30">
                  <p className="text-[8.5px] font-extrabold font-ui uppercase tracking-widest text-[#D66C3E]">Founder</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-wider font-ui">
                Founder & Director
              </span>
              <h3 className="text-2.5xl md:text-4xl font-serif font-black text-brand-indigo leading-tight">
                Victor Squiss-Banigo
              </h3>
              <p className="text-[10px] uppercase font-extrabold text-brand-teal tracking-widest font-ui bg-brand-teal/5 px-2.5 py-1 rounded inline-block border border-brand-teal/10">
                Coordinating Node Leader
              </p>
              <p className="text-xs md:text-sm lg:text-base text-brand-slate-dark leading-relaxed font-sans">
                Victor’s work is carried out by combining substantial multidisciplinary experience across asset development, product engineering, council-level services coordination, and charitable governance structures. Inspired by his own journey, he bridges operational details with permanent systems engineering, guaranteeing each pilot trial operates to pristine accountability standards.
              </p>
              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/in/viringere/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-indigo hover:text-brand-orange transition-colors"
                  referrerPolicy="no-referrer"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Trustees & Leadership placeholder */}
          <div className="bg-[#FAF9F5]/50 rounded-[3rem] p-12 md:p-16 border border-brand-slate-pale/70 text-center max-w-[800px] mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mx-auto animate-pulse">
              ❖
            </div>
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-serif font-black text-brand-indigo">
                Trustees & Operations Team
              </h3>
              <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans max-w-[500px] mx-auto">
                Our trustee roster and complete team details are currently being finalized. Relaunched organizational profiles and credentials will be released soon.
              </p>
            </div>
            <div className="pt-2 text-[10px] uppercase font-extrabold text-[#D66C3E] tracking-widest font-ui bg-[#FAF9F5] px-4 py-2 rounded-full border border-brand-slate-pale/60 inline-block">
              Details coming soon
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: ECOSYSTEM CO-OPS                */}
      {/* ========================================== */}
      <section className="bg-white py-24 px-6 border-b border-brand-slate-pale/40 relative">
        <div className="absolute inset-0 bg-mesh-grid opacity-[0.06] pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto text-center relative z-10 space-y-8">
          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-brand-teal block font-ui">
            Collaborators
          </span>
          <h2 className="text-3xl md:text-4.5xl font-serif text-brand-indigo font-black tracking-tight">
            Ecosystem Collaborations & Partners
          </h2>
          <p className="text-xs md:text-sm text-brand-slate-dark max-w-[700px] mx-auto font-sans leading-relaxed">
            We are actively looking to collaborate with organisations who share our values and believe in our mission including coops, community groups, charities, social enterprises, councils and businesses. We coordinate pathways and share resources to align our mutual structural stewardship goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="px-5 py-3 bg-[#FAF9F5] rounded-xl border border-brand-slate-pale flex items-center justify-center font-serif text-xs font-bold text-brand-indigo hover:border-brand-teal transition-all">
              Municipal Council Node
            </div>
            <div className="px-5 py-3 bg-[#FAF9F5] rounded-xl border border-brand-slate-pale flex items-center justify-center font-serif text-xs font-bold text-brand-indigo hover:border-brand-teal transition-all">
              Community Land Trust
            </div>
            <div className="px-5 py-3 bg-[#FAF9F5] rounded-xl border border-brand-slate-pale flex items-center justify-center font-serif text-xs font-bold text-brand-indigo hover:border-brand-teal transition-all">
              Micro-Housing Syndicate
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 6: CLOSING CTA PANEL               */}
      {/* ========================================== */}
      <section className="bg-gradient-to-tr from-brand-slate-pale/5 via-[#FAF9F5] to-brand-orange/5 py-24 px-6 text-center">
        <div className="max-w-[800px] mx-auto space-y-8">
          <h2 className="text-3xl md:text-4.5xl font-serif text-brand-indigo font-black tracking-tight">
            Join Us in Rebuilding System Structures.
          </h2>
          <p className="text-xs md:text-sm text-brand-slate-dark max-w-[650px] mx-auto leading-relaxed">
            The work ahead is larger than any single agency. Restructuring neighborhood mechanics requires physical assets, legal trust structures, and community participation. Let’s build them together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => handleNav('involved')}
              className="bg-brand-orange hover:bg-brand-teal text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm select-none cursor-pointer"
            >
              Get Involved
            </button>
            <button
              onClick={() => handleNav('work')}
              className="bg-transparent border border-brand-indigo text-brand-indigo hover:bg-brand-indigo hover:text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 select-none cursor-pointer"
            >
              Our Work Phases
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
