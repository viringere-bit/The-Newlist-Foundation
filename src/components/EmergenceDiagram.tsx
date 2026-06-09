import React from 'react';
import { motion } from 'motion/react';

interface EmergenceDiagramProps {
  activePhase: 1 | 2 | 3 | null;
  setActivePhase: (phase: 1 | 2 | 3 | null) => void;
}

export default function EmergenceDiagram({ activePhase, setActivePhase }: EmergenceDiagramProps) {
  // Brand Colors Redesigned for our light elegant theme
  const orange = '#DF5726';
  const teal = '#1F6C80';
  const indigo = '#162C4E';
  const cream = '#FFFFFF';

  return (
    <div className="relative w-full max-w-[620px] mx-auto bg-brand-slate-light/95 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/45 shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-mesh-grid opacity-[0.06] pointer-events-none"></div>
      
      <div className="text-center mb-6 relative z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block mb-1 font-ui">
          Visualizing the Journey
        </span>
        <h4 className="text-lg font-serif font-extrabold text-brand-indigo">
          One Continuous Living System
        </h4>
        <p className="text-xs text-brand-slate-dark max-w-[340px] mx-auto mt-1 font-sans">
          Hover over the cards above or click on the diagram layers below to explore their connections.
        </p>
      </div>

      <div className="relative h-[480px] w-full flex items-center justify-center relative z-10">
        <svg
          viewBox="0 0 300 400"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS & GRADIENTS */}
          <defs>
            <linearGradient id="canopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={orange} />
              <stop offset="100%" stopColor="#FFA05E" />
            </linearGradient>
            <linearGradient id="sproutGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={teal} />
              <stop offset="100%" stopColor="#2CD4D4" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* GRIDLINES / BACKGROUND */}
          <path d="M150 40V360" stroke="rgba(22, 44, 78, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="150" cy="200" r="140" stroke="rgba(22, 44, 78, 0.08)" strokeWidth="1" />
          <circle cx="150" cy="200" r="90" stroke="rgba(22, 44, 78, 0.08)" strokeWidth="1" />

          {/* ========================================================= */}
          {/* BASE LAYER: PROOF OF CONCEPT (Roots / Seed) - Bottom      */}
          {/* ========================================================= */}
          <g 
            className="cursor-pointer group select-none"
            onClick={() => setActivePhase(1)}
            onMouseEnter={() => setActivePhase(1)}
          >
            {/* Background Glow when active */}
            {activePhase === 1 && (
              <circle cx="150" cy="330" r="50" fill={`${orange}1C`} filter="url(#glow)" />
            )}

            {/* Taproot & branching roots */}
            <motion.path
              d="M150 330 C130 350 120 365 110 380"
              stroke={activePhase === 1 ? orange : 'rgba(22, 44, 78, 0.3)'}
              strokeWidth={activePhase === 1 ? "4" : "2"}
              strokeLinecap="round"
              animate={{ opacity: activePhase === 1 ? 1 : 0.65 }}
            />
            <motion.path
              d="M150 338 C170 355 180 370 195 385"
              stroke={activePhase === 1 ? orange : 'rgba(22, 44, 78, 0.3)'}
              strokeWidth={activePhase === 1 ? "4" : "2"}
              strokeLinecap="round"
              animate={{ opacity: activePhase === 1 ? 1 : 0.65 }}
            />
            <motion.path
              d="M150 345 C150 365 155 380 152 395"
              stroke={activePhase === 1 ? orange : 'rgba(22, 44, 78, 0.3)'}
              strokeWidth={activePhase === 1 ? "3" : "1.5"}
              strokeLinecap="round"
              animate={{ opacity: activePhase === 1 ? 1 : 0.65 }}
            />

            {/* Seed / Core Gate Shape */}
            <motion.path
              d="M130 330 C130 310 140 295 150 295 C160 295 170 310 170 330 C170 340 160 345 150 345 C140 345 130 340 130 330 Z"
              fill={activePhase === 1 ? orange : 'rgba(22, 44, 78, 0.15)'}
              stroke={activePhase === 1 ? orange : 'rgba(22, 44, 78, 0.4)'}
              strokeWidth="2"
              animate={{ 
                scale: activePhase === 1 ? 1.08 : 1,
                y: activePhase === 1 ? -4 : 0
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            
            {/* Seed Center Core Label */}
            <circle cx="150" cy="320" r="4" fill={teal} />
            
            {/* Text Tag */}
            <rect x="25" y="310" width="90" height="24" rx="12" fill={activePhase === 1 ? orange : 'rgba(255, 255, 255, 0.85)'} stroke={orange} strokeWidth="1" />
            <text x="70" y="326" textAnchor="middle" fill={activePhase === 1 ? '#FFFFFF' : indigo} className="text-[10px] font-extrabold font-ui">
              ROOTS (Study)
            </text>
          </g>

          {/* ========================================================= */}
          {/* MIDDLE LAYER: MVP BUILD (Sprout / Stem) - Center          */}
          {/* ========================================================= */}
          <g 
            className="cursor-pointer group select-none"
            onClick={() => setActivePhase(2)}
            onMouseEnter={() => setActivePhase(2)}
          >
            {/* Background Glow when active */}
            {activePhase === 2 && (
              <circle cx="150" cy="210" r="55" fill={`${teal}2B`} filter="url(#glow)" />
            )}

            {/* Rising Stem from Roots towards MVP */}
            <motion.path
              d="M150 295 L150 160"
              stroke={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.25)'}
              strokeWidth={activePhase === 2 ? "6" : "3"}
              strokeLinecap="round"
              animate={{ stroke: activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.25)' }}
            />

            {/* System Branch 1: Housing */}
            <motion.path
              d="M150 250 C120 240 100 230 80 230"
              stroke={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.2)'}
              strokeWidth={activePhase === 2 ? "3.5" : "1.5"}
              strokeLinecap="round"
            />
            <circle cx="80" cy="230" r="5" fill={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.4)'} />
            <text x="75" y="220" textAnchor="middle" fill={indigo} className="text-[9px] font-bold font-ui">Housing</text>

            {/* System Branch 2: Finance */}
            <motion.path
              d="M150 220 C180 215 200 210 220 210"
              stroke={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.2)'}
              strokeWidth={activePhase === 2 ? "3.5" : "1.5"}
              strokeLinecap="round"
            />
            <circle cx="220" cy="210" r="5" fill={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.4)'} />
            <text x="225" y="200" textAnchor="middle" fill={indigo} className="text-[9px] font-bold font-ui">Finance</text>

            {/* System Branch 3: Mobility */}
            <motion.path
              d="M150 190 C125 185 110 175 95 175"
              stroke={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.2)'}
              strokeWidth={activePhase === 2 ? "3.5" : "1.5"}
              strokeLinecap="round"
            />
            <circle cx="95" cy="175" r="5" fill={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.4)'} />
            <text x="95" y="165" textAnchor="middle" fill={indigo} className="text-[9px] font-bold font-ui">Mobility</text>

            {/* Stem Leaves/Sprouts */}
            <motion.path
              d="M150 230 C165 220 170 205 168 195"
              stroke={teal}
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ opacity: activePhase === 2 ? 1 : 0.5 }}
            />
            <motion.path
              d="M150 200 C135 190 130 180 132 170"
              stroke={teal}
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ opacity: activePhase === 2 ? 1 : 0.5 }}
            />

            {/* Center Core Sprout Node (Gateway Arched Dome) */}
            <motion.path
              d="M138 160 C138 145 145 138 150 138 C155 138 162 145 162 160"
              stroke={activePhase === 2 ? teal : 'rgba(22, 44, 78, 0.3)'}
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ 
                scale: activePhase === 2 ? 1.12 : 1,
                y: activePhase === 2 ? -3 : 0
              }}
            />

            {/* Text Tag */}
            <rect x="185" y="240" width="90" height="24" rx="12" fill={activePhase === 2 ? teal : 'rgba(255, 255, 255, 0.85)'} stroke={teal} strokeWidth="1" />
            <text x="230" y="256" textAnchor="middle" fill={activePhase === 2 ? '#FFFFFF' : indigo} className="text-[10px] font-extrabold font-ui">
              SPROUT (MVP)
            </text>
          </g>

          {/* ========================================================= */}
          {/* TOP LAYER: THE NEWLIST NETWORK (Canopy / Branches) - Top  */}
          {/* ========================================================= */}
          <g 
            className="cursor-pointer group select-none"
            onClick={() => setActivePhase(3)}
            onMouseEnter={() => setActivePhase(3)}
          >
            {/* Background Glow when active */}
            {activePhase === 3 && (
              <circle cx="150" cy="90" r="65" fill={`${orange}2C`} filter="url(#glow)" />
            )}

            {/* Trunk extending from sprout to canopy */}
            <motion.path
              d="M150 148 L150 90"
              stroke={activePhase === 3 ? orange : 'rgba(22, 44, 78, 0.15)'}
              strokeWidth={activePhase === 3 ? "7" : "3.5"}
              strokeLinecap="round"
            />

            {/* Branch Spreads: Left, Mid, Right */}
            <motion.path
              d="M150 90 C120 70 85 70 65 85"
              stroke={activePhase === 3 ? orange : 'rgba(22, 44, 78, 0.15)'}
              strokeWidth={activePhase === 3 ? "5" : "2"}
              strokeLinecap="round"
            />
            <motion.path
              d="M150 90 C130 65 110 40 150 30"
              stroke={activePhase === 3 ? orange : 'rgba(22, 44, 78, 0.15)'}
              strokeWidth={activePhase === 3 ? "5" : "2"}
              strokeLinecap="round"
            />
            <motion.path
              d="M150 90 C180 70 215 70 235 85"
              stroke={activePhase === 3 ? orange : 'rgba(22, 44, 78, 0.15)'}
              strokeWidth={activePhase === 3 ? "5" : "2"}
              strokeLinecap="round"
            />

            {/* Interactive Node Clusters representing community nodes */}
            {/* Community Node 1 */}
            <motion.g animate={{ scale: activePhase === 3 ? 1.15 : 1 }}>
              <circle cx="65" cy="85" r="8" fill={orange} stroke={cream} strokeWidth="1.5" />
              <circle cx="65" cy="85" r="4" fill={cream} />
            </motion.g>
            <text x="65" y="105" textAnchor="middle" fill={indigo} className="text-[9px] font-bold font-ui">Node Alpha</text>

            {/* Community Node 2 */}
            <motion.g animate={{ scale: activePhase === 3 ? 1.15 : 1 }}>
              <circle cx="150" cy="30" r="10" fill={orange} stroke={cream} strokeWidth="2" />
              <circle cx="150" cy="30" r="5" fill={cream} />
            </motion.g>
            <text x="150" y="15" textAnchor="middle" fill={indigo} className="text-[9px] font-bold font-ui">Inter-Node Hub</text>

            {/* Community Node 3 */}
            <motion.g animate={{ scale: activePhase === 3 ? 1.15 : 1 }}>
              <circle cx="235" cy="85" r="8" fill={orange} stroke={cream} strokeWidth="1.5" />
              <circle cx="235" cy="85" r="4" fill={cream} />
            </motion.g>
            <text x="235" y="105" textAnchor="middle" fill={indigo} className="text-[9px] font-bold font-ui">Node Beta</text>

            {/* Minor Floating Node Elements to give emergence feels */}
            <circle cx="100" cy="45" r="3" fill="#FFA05E" opacity="0.6" />
            <circle cx="200" cy="45" r="3" fill="#FFA05E" opacity="0.6" />
            <circle cx="150" cy="65" r="4.5" fill={teal} />

            {/* Text Tag */}
            <rect x="25" y="120" width="100" height="24" rx="12" fill={activePhase === 3 ? orange : 'rgba(255, 255, 255, 0.85)'} stroke={orange} strokeWidth="1" />
            <text x="75" y="136" textAnchor="middle" fill={activePhase === 3 ? '#FFFFFF' : indigo} className="text-[10px] font-extrabold font-ui">
              CANOPY (Network)
            </text>
          </g>

        </svg>

        {/* Dynamic Detail Overlay inside the diagram based on selection */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-brand-slate-pale/45 rounded-2xl p-4 text-center transition-all duration-300 shadow-xl relative z-20">
          {activePhase === null && (
            <p className="text-xs font-bold text-brand-indigo font-ui tracking-wider uppercase">
              🔍 Click on diagram layers to explore the living system
            </p>
          )}
          {activePhase === 1 && (
            <p className="text-xs text-brand-slate-dark leading-relaxed font-sans">
              <strong className="block text-brand-orange font-serif text-sm font-black mb-1 font-extrabold">1. Research & Community Feasibility (The Roots)</strong>
              The foundation supplying all data, community insights, and localized constraints.
            </p>
          )}
          {activePhase === 2 && (
            <p className="text-xs text-brand-slate-dark leading-relaxed font-sans">
              <strong className="block text-brand-teal font-serif text-sm font-black mb-1 font-extrabold">2. Tightly-Scoped Microsystem (The Sprout)</strong>
              First proof of systemic health: housing, finances, and mobility unified under a single pilot model.
            </p>
          )}
          {activePhase === 3 && (
            <p className="text-xs text-brand-slate-dark leading-relaxed font-sans">
              <strong className="block text-brand-orange font-serif text-sm font-black mb-1">3. Multi-Node Distributed Network (The Canopy)</strong>
              Decentralized replication. Communities adapt the blueprint and run self-sufficient local nodes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
