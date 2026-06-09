import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Users, Leaf, Cpu, Compass, Activity, Globe, Heart, Shield, Landmark } from 'lucide-react';
import { ActivePage, NewsPost } from '../types';
import EmergenceDiagram from './EmergenceDiagram';
import AestheticImage from './AestheticImage';

// Images created during the design stage
import heroIllustration from '../assets/images/hero_connection_diagram_1780786538847.png';
import communityCollaboration from '../assets/images/community_collaboration_1.png';
import sustainableInfrastructure from '../assets/images/sustainable_infrastructure_1780786576712.png';
import workingTogether from '../assets/images/working_together.jpg';
import workingTogether1 from '../assets/images/working_together_1.jpg';
import workshop from '../assets/images/workshop.jpg';
import workship1 from '../assets/images/workship_1.jpg';
import colla2 from '../assets/images/community_collaboration_2.png';
import colla3 from '../assets/images/community_collaboration_3.png';
import colla4 from '../assets/images/community_collaboration_4.png';

interface HomeViewProps {
  setActivePage: (page: ActivePage) => void;
  setNewsPostFilter?: (category: NewsPost['category'] | 'All') => void;
  setSelectedArticle?: (post: NewsPost) => void;
}

export default function HomeView({ setActivePage, setNewsPostFilter, setSelectedArticle }: HomeViewProps) {
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | null>(null);
  const [activeMetricTab, setActiveMetricTab] = useState<'wealth' | 'soil' | 'mobility'>('wealth');

  // Solution items mapped to Apple-style benefit points
  const solutions = [
    {
      title: 'Designing Pathways to Wealth-Building',
      desc: 'We create accessible, sustainable models that help people build assets, reduce financial vulnerability, and participate in long-term economic opportunity.',
      icon: Users,
    },
    {
      title: 'Developing Regenerative Systems',
      desc: 'Our approach integrates environmental regeneration into every economic model we build. We design tools that restore ecosystems and strengthen local resilience.',
      icon: Leaf,
    },
    {
      title: 'Empowering Communities to Lead the Change',
      desc: 'We believe solutions are strongest when they are co-created. Our work is community-driven: shaped by lived experience and built through collaboration.',
      icon: Cpu,
    },
  ];

  // News items from the PDF
  const previewPosts = [
    {
      id: 'post-1',
      title: "Launching the Newlist Foundation’s feasibility study to explore integrated pathways to prosperity.",
      summary: "Launching the Newlist Foundation’s feasibility study to explore integrated pathways to prosperity. This marks the beginning of our systematic field investigations.",
      content: "The Newlist Foundation will begin with a small, multidisciplinary team — experts in law, finance, social support, systems engineering, and economics — to investigate the structural forces that drive economic inequality at its roots. Alongside this technical work, we will partner directly with communities to understand their lived experiences, needs, and aspirations. Together, we will design, build, and test holistic, regenerative solutions in real time and in real places, creating the first working version of the model and the foundations of The Newlist Network. To ensure transparency and replicability, we will publish our findings in accessible formats and media so other communities can learn from, adapt, and improve the approach.",
      date: 'June 4, 2026',
      category: 'Announcements' as NewsPost['category'],
      iconName: 'gateway' as NewsPost['iconName'],
      author: 'Victor Squiss-Banigo',
      readTime: '4 min read'
    },
    {
      id: 'post-2',
      title: "Why community-driven design is at the heart of our approach.",
      summary: "Explore the philosophy underpinning the Newlist Network: why lived-experience is not a secondary metric, but a primary structural driver for durable systems engineering.",
      content: "Traditional, top-down bureaucratic systems replace care with rules and reduce unique, vulnerable humans to file numbers. We believe that justice is not an aspiration — it is an architecture, and that system architectures cannot be built in a vacuum. Our work is carried out by a multidisciplinary team with experience across governance, social impact, engineering, community engagement, and organisational leadership. We also bring a wealth of lived experience of the problems that we are trying to solve. Together, we bring the skills needed to design systems that are fair, resilient, and grounded in the realities of the people they serve.",
      date: 'May 18, 2026',
      category: 'Stories from the Network' as NewsPost['category'],
      iconName: 'node' as NewsPost['iconName'],
      author: 'Community Team',
      readTime: '3 min read'
    },
    {
      id: 'post-3',
      title: "Early insights from our research partners and pilot conversations.",
      summary: "Initial field data and participant interviews suggest structural friction in transportation and housing are the primary catalysts of capital depletion.",
      content: "Our first-round localized diagnostic surveys reveal that high-expenditure silos (especially high-interest structural debts, unstable rentals, and unreliable green-mobility networks) work in tandem to keep households under terminal financial load. In response to these diagnostic nodes, our upcoming MVP Microsystem Build will integrate micro-housing stability bonds in conjunction with low-overhead electric mobility shares to protect families in moments of critical vulnerability.",
      date: 'May 02, 2026',
      category: 'Progress Updates' as NewsPost['category'],
      iconName: 'arc' as NewsPost['iconName'],
      author: 'Research Unit',
      readTime: '5 min read'
    }
  ];

  const handlePostClick = (post: typeof previewPosts[0]) => {
    if (setSelectedArticle) {
      const formattedPost: NewsPost = {
        ...post,
        iconName: post.iconName as NewsPost['iconName'],
        category: post.category as NewsPost['category']
      };
      setSelectedArticle(formattedPost);
    }
    setActivePage('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactive Live Metrics Configuration containing beautiful visual curves and values
  const systemMetrics = {
    wealth: {
      title: 'Wealth-Building Retention',
      badge: 'Integrated Asset Loop',
      value: '84%',
      detail: 'Increase in localized wealth retention when utilities, mobility, and community land equity are cross-hedged within the microsystem structure.',
      nodes: ['Equity Lands', 'Microgrid Pools', 'Community Vaults'],
      waveColor: '#FF7B47',
      path: 'M 10,120 Q 90,30 180,120 T 350,120 T 520,120'
    },
    soil: {
      title: 'Regenerative Soil Capacity',
      badge: 'Active Ecosystem Drawdown',
      value: '4.2x',
      detail: 'Multiplier boost in carbon storage and local soil bio-density designed via organic micro-farming integrated loops and circular gray-water recaptures.',
      nodes: ['Composting Vats', 'Bio-Intensive Poly', 'Moisture Sensors'],
      waveColor: '#3BC2D4',
      path: 'M 10,120 Q 90,195 180,90 T 350,140 T 520,70'
    },
    mobility: {
      title: 'Shared Fleet Displacement',
      badge: 'Emissions Deficit Output',
      value: '91%',
      detail: 'Reduction in localized fossil transportation footprint achieved by connecting neighborhood nodes with cooperative, solar-backed light electric cargo-shares.',
      nodes: ['Solar Charge Ports', 'Shared eVans', 'Smart Routing'],
      waveColor: '#EAD0A5',
      path: 'M 10,10 A 180,180 0 0,0 350,130 A 180,180 0 0,1 520,100'
    }
  };

  return (
    <div className="flex flex-col w-full bg-transparent">
      
      {/* ========================================== */}
      {/* SECTION 1: HOMEPAGE HERO                   */}
      {/* ========================================== */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 px-6 overflow-hidden">
        {/* Glowing Ambient Background Elements */}
        <div className="absolute inset-0 bg-mesh-grid opacity-[0.05] pointer-events-none"></div>
        <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-25 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[960px] w-full mx-auto flex flex-col items-center text-center relative z-10 py-12 md:py-16">
          
          {/* Main Hero Copy - Elegant Centered Layout */}
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-indigo/5 border border-brand-indigo/15 px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-indigo font-ui">
                The Newlist Foundation
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif text-brand-indigo font-black tracking-tight leading-[1.08] max-w-[850px]">
              Enabling prosperity for people and planet.
            </h1>

            <p className="text-base md:text-xl text-brand-slate-dark max-w-[720px] leading-relaxed font-sans">
              Reducing economic inequity by creating sustainable pathways to wealth-building while regenerating the planet we share. Unifying support systems into one modular, stackable network.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto pt-4 relative z-30">
              <button
                onClick={() => handleNav('involved')}
                className="bg-brand-orange hover:bg-brand-teal text-white px-8 py-4.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl hover:shadow-brand-orange/25 transition-all duration-350 transform hover:scale-[1.03] active:scale-[0.97] cursor-pointer text-center"
              >
                Join the Movement
              </button>
              <button
                onClick={() => handleNav('about')}
                className="bg-brand-indigo/5 hover:bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/15 px-8 py-4.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 text-center cursor-pointer backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: THE PROBLEM (Human/Scannable)   */}
      {/* ========================================== */}
      <section className="py-24 md:py-32 bg-brand-slate-light/10 px-6 border-y border-brand-slate-pale/45 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="max-w-[760px] text-left mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-orange block font-ui">
              The Challenges We Face
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              The Challenges We Face Are Deeply Connected.
            </h2>
            <p className="text-base text-brand-slate-dark max-w-[640px] leading-relaxed">
              We cannot solve economic inequity without addressing planetary health, and we cannot protect the planet without supporting the people who live on it.
            </p>
          </div>

          {/* Split Column Problem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start text-left">
            {/* Economic Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-brand-slate-pale/35 hover:border-brand-orange/30 transition-all duration-350 shadow-sm hover:shadow-xl group flex flex-col justify-between min-h-[320px] backdrop-blur-md">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-brand-orange/10 border border-brand-orange/20 rounded-2xl flex items-center justify-center text-brand-orange mb-6 transition-all duration-300 group-hover:scale-110">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-black text-brand-indigo group-hover:text-brand-orange transition-colors">
                  Economic Inequity
                </h3>
                <p className="text-sm md:text-base text-brand-slate-dark leading-relaxed">
                  Outward capital leakage, unstable rents, and predatory debt silos drain resources away from local neighborhoods, keeping families in a state of constant fragility.
                </p>
              </div>
            </div>

            {/* Planetary Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-brand-slate-pale/35 hover:border-brand-teal/30 transition-all duration-350 shadow-sm hover:shadow-xl group flex flex-col justify-between min-h-[320px] backdrop-blur-md">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-brand-teal/10 border border-brand-teal/20 rounded-2xl flex items-center justify-center text-brand-teal mb-6 transition-all duration-300 group-hover:scale-110">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-black text-brand-indigo group-hover:text-brand-teal transition-colors">
                  Planetary Degradation
                </h3>
                <p className="text-sm md:text-base text-brand-slate-dark leading-relaxed">
                  Extractive systems degrade our natural resources, accelerate warming, and exhaust the soils, threatening the very ecosystems that sustain all life.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Core Quote Area */}
          <div className="mt-16 md:mt-24 p-8 md:p-16 rounded-[3rem] bg-brand-teal/5 border border-brand-teal/20 text-brand-indigo relative overflow-hidden text-center shadow-sm">
            <div className="absolute inset-0 bg-mesh-grid opacity-[0.03] pointer-events-none"></div>
            <div className="relative z-10 max-w-[800px] mx-auto space-y-6">
              <p className="text-xl md:text-3xl font-serif tracking-tight leading-relaxed font-light italic text-brand-indigo">
                “We believe a fairer, regenerative future is possible — but only if we redesign the systems that shape how people live, work, and thrive.”
              </p>
              <div className="w-16 h-[2.5px] bg-brand-orange mx-auto rounded-full"></div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: WHAT WE'RE DOING                */}
      {/* ========================================== */}
      <section className="py-24 md:py-32 px-6 bg-transparent relative">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="max-w-[760px] text-left mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block font-ui">
              Our Active Mandate
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              Building Fairer, Regenerative Systems — Together.
            </h2>
            <p className="text-base text-brand-slate-dark max-w-[580px]">
              Our three-part framework integrates environmental regeneration and systemic community design.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutions.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-brand-slate-pale/35 flex flex-col justify-between text-left hover:border-brand-teal/30 hover:shadow-xl transition-all duration-300 group shadow-sm backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-brand-teal-light border border-brand-teal/20 rounded-xl flex items-center justify-center text-brand-teal">
                      <Icon className="w-6 h-6 group-hover:text-brand-orange group-hover:scale-105 transition-all duration-300" />
                    </div>
                    <h3 className="text-xl font-serif font-black text-brand-indigo mt-4 group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans mt-3">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* EXCITING NEW METRIC INTERACTIVE AREA       */}
      {/* ========================================== */}
      <section className="py-24 bg-brand-teal-light/25 border-y border-brand-slate-pale/45 px-6 relative overflow-hidden">
        {/* Curved vectors background */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-teal/5 blur-[90px] pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Dashboard Block - Left Copy */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-orange block font-ui">
                Modular Performance Node
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
                Data-Driven System Integrity.
              </h2>
              <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed">
                We believe that system blueprints must be structured on transparent, real-world proof. Click on the indicators to explore how our unified networks measure and preserve critical prosperity drivers. <span className="font-medium text-brand-orange block mt-2">Note: All values, metrics, and diagrams presented below are illustrative examples to demonstrate system dimensions.</span>
              </p>

              {/* Interaction selectors with rounded smooth curves */}
              <div className="flex flex-col gap-3 pt-4">
                {(Object.keys(systemMetrics) as Array<keyof typeof systemMetrics>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveMetricTab(key)}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      activeMetricTab === key
                        ? 'bg-brand-orange/10 border-brand-orange text-brand-indigo shadow-md font-bold'
                        : 'bg-white border-brand-slate-pale/45 text-brand-slate hover:bg-brand-teal-light hover:text-brand-indigo'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-brand-slate-dark font-ui font-black">
                        {systemMetrics[key].badge}
                      </span>
                      <span className="text-sm font-bold mt-0.5">{systemMetrics[key].title}</span>
                    </div>
                    <span className="text-xl font-black text-brand-orange">{systemMetrics[key].value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Alive Graphical representation with smooth curves & nodes */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-brand-slate-pale/40 p-8 md:p-12 rounded-[3rem] shadow-sm relative overflow-hidden min-h-[380px] flex flex-col justify-between">
                
                {/* Visual mesh */}
                <div className="absolute inset-0 bg-mesh-grid opacity-[0.04] pointer-events-none"></div>

                {/* Card Top Info */}
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider px-3 py-1 bg-brand-teal/10 border border-brand-teal/25 rounded-full text-brand-teal font-extrabold mr-2">
                      {systemMetrics[activeMetricTab].badge}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#D66C3E] border border-brand-orange/20 px-2 py-0.5 rounded-md bg-brand-orange/5 ml-1">
                      Illustrative
                    </span>
                    <h3 className="text-2xl font-serif font-black text-brand-indigo mt-3">
                      {systemMetrics[activeMetricTab].title}
                    </h3>
                  </div>
                  <div className="text-5xl font-serif font-black text-brand-orange tracking-tight">
                    {systemMetrics[activeMetricTab].value}
                  </div>
                </div>

                {/* Curved graph representation area */}
                <div className="relative h-40 w-full flex items-center justify-center my-6">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 530 150">
                    <defs>
                      <linearGradient id="waveGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={systemMetrics[activeMetricTab].waveColor} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={systemMetrics[activeMetricTab].waveColor} stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Background curved shading */}
                    <path
                      d={`${systemMetrics[activeMetricTab].path} L 520,150 L 10,150 Z`}
                      fill="url(#waveGlow)"
                      className="transition-all duration-700"
                    />

                    {/* Smooth curving wave path line */}
                    <path
                      d={systemMetrics[activeMetricTab].path}
                      fill="none"
                      stroke={systemMetrics[activeMetricTab].waveColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="transition-all duration-700 stroke-dasharray-[1000] animate-pulse"
                    />

                    {/* Floating pulsing physical nodes on curve */}
                    <circle cx="180" cy="100" r="10" fill={systemMetrics[activeMetricTab].waveColor} className="animate-ping opacity-60" />
                    <circle cx="180" cy="100" r="6" fill="#FFFFFF" stroke={systemMetrics[activeMetricTab].waveColor} strokeWidth="3" />

                    <circle cx="350" cy="120" r="10" fill={systemMetrics[activeMetricTab].waveColor} className="animate-ping opacity-40" />
                    <circle cx="350" cy="120" r="6" fill="#FFFFFF" stroke={systemMetrics[activeMetricTab].waveColor} strokeWidth="3" />
                  </svg>
                </div>

                {/* Subtitle / Details */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-end pt-6 border-t border-brand-slate-pale/40">
                  <p className="md:col-span-8 text-xs text-brand-slate-dark leading-relaxed font-sans">
                    {systemMetrics[activeMetricTab].detail}
                  </p>
                  <div className="md:col-span-4 flex flex-col gap-1.5 items-start md:items-end">
                    <span className="text-[9px] uppercase tracking-widest text-[#4A5764]/60 font-ui font-black">Interconnected Nodes</span>
                    <div className="flex flex-wrap gap-1 justify-start md:justify-end">
                      {systemMetrics[activeMetricTab].nodes.map((n) => (
                        <span key={n} className="text-[9px] font-bold px-2 py-0.5 bg-brand-teal-light border border-brand-teal/15 rounded text-brand-teal">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: THE NEWLIST JOURNEY (Diagram)   */}
      {/* ========================================== */}
      <section className="py-24 md:py-32 bg-transparent px-6 border-b border-brand-slate-pale/40">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="max-w-[760px] text-left mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-orange block font-ui">
              The Path Forward
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              Phased Development Towards Systemic Health.
            </h2>
            <p className="text-base text-brand-slate-dark max-w-[560px]">
              Our progress follows systematic pathways: from diagnostic feasibility towards fully-scaled, community-coordinated networks.
            </p>
          </div>

          {/* Interactive Stacked Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Phase Content Selection Cards (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Phase 1 card with smooth curved edges */}
              <div
                onClick={() => setActivePhase(1)}
                className={`p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 cursor-pointer ${
                  activePhase === 1 
                    ? 'border-brand-orange bg-[#FF7B47]/10 shadow-md' 
                    : 'border-brand-slate-pale/45 bg-white hover:bg-brand-teal-light/50 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded inline-block ${
                    activePhase === 1 ? 'bg-brand-orange text-[#FAF9F5]' : 'bg-brand-teal-light text-brand-slate'
                  }`}>
                    Phase 1
                  </span>
                  <p className="text-sm font-bold text-brand-indigo font-serif">Proof of Concept / Feasibility Study</p>
                </div>
                <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans mt-4">
                  We’re conducting a rigorous feasibility study to understand how integrated systems can reduce economic inequity while supporting regenerative practices. This work helps us identify what communities need most, what barriers they face, and which interventions create the greatest long-term impact. It’s the foundation for everything that follows.
                </p>
              </div>

              {/* Phase 2 card with smooth curved edges */}
              <div
                onClick={() => setActivePhase(2)}
                className={`p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 cursor-pointer ${
                  activePhase === 2 
                    ? 'border-brand-teal bg-brand-teal/10 shadow-md' 
                    : 'border-brand-slate-pale/45 bg-white hover:bg-brand-teal-light/50 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded inline-block ${
                    activePhase === 2 ? 'bg-brand-teal text-[#FAF9F5]' : 'bg-brand-teal-light text-brand-slate'
                  }`}>
                    Phase 2
                  </span>
                  <p className="text-sm font-bold text-brand-indigo font-serif">MVP Build</p>
                </div>
                <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans mt-4">
                  The MVP will be a small-scale, real-world demonstration of what a Newlist system could look like. This might include a microsystem that brings together housing, financial management, mobility support, and employment, entrepreneurship, or education support in a single pilot location. By testing these elements together, we learn how community-driven systems can enable prosperity for people and planet.
                </p>
              </div>

              {/* Phase 3 card with smooth curved edges */}
              <div
                onClick={() => setActivePhase(3)}
                className={`p-6 md:p-8 rounded-[2.5rem] border transition-all duration-300 cursor-pointer ${
                  activePhase === 3 
                    ? 'border-brand-indigo bg-brand-indigo/5 shadow-md' 
                    : 'border-brand-slate-pale/45 bg-white hover:bg-brand-teal-light/50 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded inline-block ${
                    activePhase === 3 ? 'bg-brand-indigo text-[#FAF9F5]' : 'bg-brand-teal-light text-brand-slate'
                  }`}>
                    Phase 3
                  </span>
                  <p className="text-sm font-bold text-brand-indigo font-serif">The Newlist Network</p>
                </div>
                <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed font-sans mt-4">
                  We’re building a network of people, partners, and communities who want to redesign the systems that shape how we live, work, and thrive. This network will grow as more people join, contribute your experience, and help co-create solutions that are fair, regenerative, and built for everyone.
                </p>
              </div>

            </div>

            {/* Renders the dynamic diagram in standard visual panel (lg:col-span-6) */}
            <div className="lg:col-span-6 flex justify-center">
              <EmergenceDiagram activePhase={activePhase} setActivePhase={setActivePhase} />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* HUMANISING IMAGE GRID & ASSET SECTION      */}
      {/* ========================================== */}
      <section className="py-24 bg-brand-indigo px-6 rounded-[3.5rem] mx-6 border border-white/5 my-16 shadow-2xl relative overflow-hidden">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute inset-0 bg-mesh-grid opacity-[0.03] pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-brand-teal/10 rounded-full blur-[80px]" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Editorial visual copy - Left (lg:col-span-12) */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#FF7B47] block font-ui">
                Human-Centered Impact
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white font-black tracking-tight leading-tight">
                Designed With Communities, Not Delivered to Them.
              </h2>
              <p className="text-[#BACCDA] text-xs md:text-sm leading-relaxed max-w-[480px]">
                Systems exist to serve humans. Our methodology places residents, thinkers, and builders at the core of the design loop. By ensuring lived experiences guide our prototypes, we build resilience and trust.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => handleNav('work')}
                  className="inline-flex items-center gap-2 group text-xs font-bold uppercase text-brand-teal-light hover:text-brand-orange tracking-widest font-ui transition-colors cursor-pointer"
                >
                  Explore Our Work Blueprints 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Split Grid for Real Photos - Right (lg:col-span-7) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-white/5 p-4.5 group">
                <AestheticImage
                  src={workingTogether1}
                  alt="Local community members cooperating in active co-design session"
                  className="w-full h-52 md:h-64 rounded-3xl"
                  imgClassName="rounded-3xl"
                />
                <p className="text-[10px] text-[#A5C3D1] font-extrabold font-ui uppercase tracking-wider text-left pt-4 px-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  ❖ Local Co-Design Workshops
                </p>
              </div>

              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-white/5 p-4.5 group">
                <AestheticImage
                  src={workship1}
                  alt="Regenerative design synthesis panel"
                  className="w-full h-52 md:h-64 rounded-3xl"
                  imgClassName="rounded-3xl"
                />
                <p className="text-[10px] text-[#A5C3D1] font-extrabold font-ui uppercase tracking-wider text-left pt-4 px-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
                  ❖ System Synthesis Panels
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* BRAND NEW SECTION: THE LIVING NETWORK MOSAIC*/}
      {/* ========================================== */}
      <section className="py-24 bg-brand-midnight px-6 border-t border-brand-slate-pale/45">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center max-w-[760px] mx-auto mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] font-ui font-black text-brand-teal block">
              Co-Creation Pathways
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              Human Blueprints in Active Development.
            </h2>
            <p className="text-xs md:text-sm text-brand-slate max-w-[560px] mx-auto">
              Our community workshops produce visual, structural models for local economic governance, ecosystem care, and resource distribution.
            </p>
          </div>

          {/* 4-Item Premium Bento Grid of Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Gallery Item 1 */}
            <div className="bg-white border border-brand-slate-pale/40 p-4.5 rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brand-orange/45 transition-all duration-300 group">
              <div className="overflow-hidden rounded-3xl aspect-square border border-brand-slate-pale/20 relative">
                <img 
                  src={communityCollaboration} 
                  alt="Interactive asset pathways co-design session" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left pt-4 px-1">
                <span className="text-[9px] font-extrabold uppercase font-ui tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">
                  Step 1: Diagnostic
                </span>
                <h4 className="text-base font-serif font-black text-brand-indigo mt-2">
                  Pathways Mapping
                </h4>
                <p className="text-[11px] text-brand-slate-dark leading-relaxed mt-1">
                  Tracing outward currency leakage and mapping direct household cost relief curves.
                </p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="bg-white border border-brand-slate-pale/40 p-4.5 rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brand-teal/45 transition-all duration-300 group">
              <div className="overflow-hidden rounded-3xl aspect-square border border-brand-slate-pale/20 relative">
                <img 
                  src={colla2} 
                  alt="System elements integration illustration" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left pt-4 px-1">
                <span className="text-[9px] font-extrabold uppercase font-ui tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">
                  Step 2: Synthesis
                </span>
                <h4 className="text-base font-serif font-black text-brand-indigo mt-2">
                  Systems Integration
                </h4>
                <p className="text-[11px] text-brand-slate-dark leading-relaxed mt-1">
                  Synthesizing cooperative transit loops directly connected with microgrid solar setups.
                </p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="bg-white border border-brand-slate-pale/40 p-4.5 rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brand-orange/45 transition-all duration-300 group">
              <div className="overflow-hidden rounded-3xl aspect-square border border-brand-slate-pale/20 relative">
                <img 
                  src={colla3} 
                  alt="Community governance blueprint" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left pt-4 px-1">
                <span className="text-[9px] font-extrabold uppercase font-ui tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full">
                  Step 3: Governance
                </span>
                <h4 className="text-base font-serif font-black text-brand-indigo mt-2">
                  Co-op Agreement Design
                </h4>
                <p className="text-[11px] text-brand-slate-dark leading-relaxed mt-1">
                  Drafting community shares and legal trust mandates that lock assets inside local boards.
                </p>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className="bg-white border border-brand-slate-pale/40 p-4.5 rounded-[2.5rem] flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brand-teal/45 transition-all duration-300 group">
              <div className="overflow-hidden rounded-3xl aspect-square border border-brand-slate-pale/20 relative">
                <img 
                  src={colla4} 
                  alt="Network scaling and feedback blueprint" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left pt-4 px-1">
                <span className="text-[9px] font-extrabold uppercase font-ui tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-full">
                  Step 4: Scale
                </span>
                <h4 className="text-base font-serif font-black text-brand-indigo mt-2">
                  Decentralized Replication
                </h4>
                <p className="text-[11px] text-brand-slate-dark leading-relaxed mt-1">
                  Packaging blueprints and tools to help auxiliary neighborhoods initiate custom nodes.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: JOIN THE MOVEMENT CTA (Centered)*/}
      {/* ========================================== */}
      <section className="py-24 bg-transparent px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          
          <div className="bg-brand-indigo border border-white/5 rounded-[3.5rem] p-8 md:p-16 my-6 relative overflow-hidden text-center shadow-2xl space-y-8">
            <div className="absolute inset-0 bg-mesh-grid opacity-[0.03] pointer-events-none"></div>

            <div className="relative z-10 max-w-[760px] mx-auto space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#FF7B47] block font-ui">
                Connect and Share
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white font-black tracking-tight leading-tight">
                Join a Growing Movement for Fairer, Regenerative Futures.
              </h2>
              <p className="text-xs md:text-sm text-[#BACCDA] leading-relaxed max-w-[660px] mx-auto font-sans">
                Real change happens when people come together with shared purpose. The Newlist Foundation is building a community of individuals, partners, and organisations who believe that prosperity and planetary health must be created together — and that everyone deserves access to the tools and systems that make thriving possible.
              </p>

              {/* Three-Point Invitation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-6 border-t border-white/10 max-w-[680px] mx-auto">
                <div className="flex gap-2.5 items-start">
                  <span className="text-brand-orange text-lg">✦</span>
                  <p className="text-xs text-[#FAF9F5] font-medium font-sans">Be part of something bigger.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-brand-orange text-lg">✦</span>
                  <p className="text-xs text-[#FAF9F5] font-medium font-sans">Contribute your voice and experience.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-brand-orange text-lg">✦</span>
                  <p className="text-xs text-[#FAF9F5] font-medium font-sans">Help build fairer, regenerative futures.</p>
                </div>
              </div>

              {/* Double CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button
                  onClick={() => handleNav('involved')}
                  className="bg-brand-orange hover:bg-brand-teal text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-350 transform hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                >
                  Join the Movement
                </button>
                <button
                  onClick={() => handleNav('work')}
                  className="bg-transparent text-[#FAF9F5] border border-white/20 hover:bg-white/5 px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-355 cursor-pointer"
                >
                  Our Blueprints
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 max-w-[420px] mx-auto">
                <p className="text-[10px] text-[#A5C3D1] leading-relaxed font-ui uppercase tracking-wider font-extrabold pb-1">
                  Everyone has a role to play — and the movement grows stronger with every person who joins.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 6: NEWS & UPDATES PREVIEW         */}
      {/* ========================================== */}
      <section className="py-24 md:py-32 bg-brand-slate-light/10 px-6">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left max-w-[620px] space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block font-ui">
                The Ledger
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
                News & Updates
              </h2>
              <p className="text-base text-brand-slate-dark">
                Stay informed about our progress, announcements, and stories from across the movement.
              </p>
            </div>
          </div>

          {/* Coming Soon styled placeholder */}
          <div className="bg-white rounded-[2.5rem] p-12 md:p-16 border border-brand-slate-pale/40 text-center max-w-[800px] mx-auto space-y-4">
            <h3 className="text-xl md:text-2xl font-serif font-black text-brand-indigo">
              Unified ledger of ongoing developments.
            </h3>
            <p className="text-xs md:text-sm text-brand-slate-dark max-w-[500px] mx-auto leading-relaxed">
              We are finalizing our active regional programs, field diaries, and academic disclosures. Announcements will appear here as updates are dispatched.
            </p>
            <div className="pt-2 text-[10px] uppercase font-extrabold text-[#D66C3E] tracking-widest font-ui bg-[#FAF9F5] px-4 py-2 rounded-full border border-brand-slate-pale/60 inline-block animate-pulse">
              Coming Soon
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 7: ABOUT TEASER CORNER             */}
      {/* ========================================== */}
      <section className="py-24 bg-transparent px-6 border-t border-brand-slate-pale/40">
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-left">
          
          <div className="max-w-[700px] space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-orange block font-ui">
              The Foundation
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              About the Newlist Foundation
            </h2>
            <p className="text-brand-slate-dark text-xs md:text-sm leading-relaxed">
              The Newlist Foundation is dedicated to reducing economic inequity and regenerating the planet we share. We run systematic field trials and co-design supportive structures to foster community wealth-building, sustainable mobility, and environmental care.
            </p>
            <p className="text-base md:text-lg text-brand-teal font-serif font-black tracking-tight italic">
              “Our mission is simple: enable prosperity for people and planet — together.”
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => handleNav('about')}
              className="group inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase font-ui text-brand-indigo hover:text-brand-orange underline underline-offset-8 transition-all duration-300 cursor-pointer"
            >
              Learn More About the Foundation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
