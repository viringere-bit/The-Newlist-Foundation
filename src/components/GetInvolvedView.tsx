import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Code, Coins, Building, Send, ShieldAlert, CheckCircle } from 'lucide-react';
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

interface GetInvolvedProps {
  setActivePage: (page: ActivePage) => void;
}

export default function GetInvolvedView({ setActivePage }: GetInvolvedProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channel: 'network',
    message: ''
  });

  const channels = [
    {
      id: 'network',
      title: 'Our Network',
      desc: 'We are building a network of people, partners, and communities who want to redesign the systems that shape how we live, work, and thrive. This network will grow as more people join, contribute their experience, and help co-create solutions.',
      tag: 'Join the Network',
      icon: Users
    },
    {
      id: 'volunteer',
      title: 'Volunteer Your Skills',
      desc: 'Contribute your professional skills to support our programs. We are looking for scholars, engineers, and community organizers specializing in sustainable development, legal trusts, and resource stewardship.',
      tag: 'Register to Volunteer',
      icon: Code
    },
    {
      id: 'donate',
      title: 'Support Our Work',
      desc: 'Every gift supports our capacity to run systemic feasibility studies, build real-world physical pilots, and maintain open resources for everyone. We operate with high cost-to-impact ratios and public accounts.',
      tag: 'Donate Today',
      icon: Coins
    },
    {
      id: 'partner',
      title: 'Partner with Us',
      desc: 'We work closely with local councils, community land trusts, housing associations, and research groups. Get in touch to discuss partnering on pilots, microgrid development, or systemic trials.',
      tag: 'Become a Partner',
      icon: Building
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('All marked fields (*) are required.');
      return;
    }
    setFormError('');
    setIsSubmitting(true);
    try {
      const resp = await fetch('/api/submit-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await resp.json();
      if (resp.ok && data.success) {
        setSubmitted(true);
      } else {
        setFormError(data.error || 'Failed to submit proposal.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Network error while transmitting metrics payload.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', channel: 'network', message: '' });
    setSubmitted(false);
    setFormError('');
  };

  return (
    <div className="flex flex-col w-full bg-[#FAF9F5]">
      
      {/* ========================================== */}
      {/* SECTION 1: HERO VIEW                       */}
      {/* ========================================== */}
      <section className="relative py-24 overflow-hidden px-6 border-b border-brand-slate-pale/40 bg-white">
        <div className="absolute inset-0 bg-mesh-grid opacity-[0.08] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#D66C3E] block font-ui">
              Connect & Participate
            </span>
            <h1 className="text-4xl md:text-5.5xl font-serif text-brand-indigo font-black tracking-tight leading-[1.1]">
              Find your role in the regenerative movement.
            </h1>
            <p className="text-base text-brand-slate-dark max-w-[640px] leading-relaxed">
              Whether you represent a community node, want to volunteer professional hours, make a donation, or seek organization partnerships, your support drives lasting change.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-slate-pale/40 bg-[#FAF9F5] p-3 h-64 md:h-80 select-none">
            <AestheticImage
              src={workingTogether}
              alt="Diverse and community members building together in unity"
              className="w-full h-full rounded-[2rem]"
              imgClassName="rounded-[2rem]"
            />
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: PATHWAY CHANNELS GRID           */}
      {/* ========================================== */}
      <section className="py-24 px-6 bg-white border-b border-brand-slate-pale/35">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="max-w-[760px] text-left mb-16 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block font-ui">
              Envolvement Options
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-indigo font-black tracking-tight leading-tight">
              Four Pathways to Participate.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <div 
                  key={ch.id}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, channel: ch.id }));
                    const formElement = document.getElementById('proposal-form-section');
                    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#FAF9F5]/40 rounded-[2rem] p-8 md:p-12 border border-brand-slate-pale/50 flex flex-col justify-between hover:border-brand-orange hover:scale-[1.01] transition-all duration-300 group cursor-pointer shadow-sm/25 min-h-[340px]"
                >
                  <div className="space-y-4 font-sans">
                    <div className="w-12 h-12 rounded-2xl bg-brand-orange/5 group-hover:bg-brand-orange/10 flex items-center justify-center text-[#D66C3E] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-black text-brand-indigo group-hover:text-brand-orange transition-colors">
                      {ch.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-slate-dark leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-brand-slate-pale/40 mt-6 flex justify-between items-center text-[10px] font-ui uppercase font-extrabold text-brand-indigo/60">
                    <span>{ch.tag}</span>
                    <span className="inline-flex items-center gap-1 text-brand-indigo group-hover:text-brand-orange">
                      Submit request ❖
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: INTEREST SUBMISSION FORM        */}
      {/* ========================================== */}
      <section id="proposal-form-section" className="py-24 px-6 bg-[#FAF9F5] border-b border-brand-slate-pale/30">
        <div className="max-w-[800px] mx-auto text-left">
          
          <div className="bg-white rounded-[2.5rem] border border-brand-slate-pale/85 p-8 md:p-16 shadow-sm relative overflow-hidden space-y-8">
            <div className="absolute inset-0 bg-mesh-grid opacity-10 pointer-events-none"></div>

            <div className="relative z-10 max-w-[650px] mx-auto">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="mb-8 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#D66C3E] block font-ui">
                      Connect Node
                    </span>
                    <h2 className="text-2.5xl md:text-3.5xl font-serif font-black text-brand-indigo">
                      Submit an Interest Proposal
                    </h2>
                    <p className="text-xs text-brand-slate-dark">
                      Select your pathway, enter your contact, and describe your thoughts or community assets.
                    </p>
                  </div>

                  {formError && (
                    <div className="text-xs text-brand-orange font-bold bg-brand-orange/5 p-4 rounded-xl border border-brand-orange/20 animate-in shake">
                      ✕ {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Arthur Dent"
                        className="w-full bg-[#FAF9F5] border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-teal font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="arthur@guide.org"
                        className="w-full bg-[#FAF9F5] border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-teal font-sans"
                      />
                    </div>
                  </div>

                  <div className="font-sans">
                    <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                      Participation Alignment
                    </label>
                    <select
                      name="channel"
                      value={formData.channel}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF9F5] border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none font-sans"
                    >
                      <option value="network">Our Network (Join Node Communities)</option>
                      <option value="volunteer">Volunteer Your Skills (Professional Hours)</option>
                      <option value="donate">Support Our Work (Financial Backer)</option>
                      <option value="partner">Partner with Us (Land Trusts, Local Councils)</option>
                    </select>
                  </div>

                  <div className="font-sans">
                    <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                      Message / Proposal Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell us about yourself, your skills, or how you would like to collaborate with the Newlist Foundation..."
                      className="w-full bg-[#FAF9F5] border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-teal font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-indigo hover:bg-brand-orange text-[#FAF9F5] py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm select-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                  </button>

                </form>
              ) : (
                <div className="text-center py-8 space-y-6 animate-in zoom-in duration-350">
                  <div className="w-16 h-16 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-brand-teal" />
                  </div>
                  <h3 className="text-2.5xl font-serif font-black text-brand-indigo">
                    Proposal Submitted
                  </h3>
                  <p className="text-xs md:text-sm text-brand-slate-dark max-w-[500px] mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your alignment interest for the <strong>{formData.channel}</strong> pathway has been successfully transmitted. Our coordination node administrator will email you at <strong>{formData.email}</strong> within our review window.
                  </p>
                  <div className="pt-6">
                    <button
                      onClick={handleReset}
                      className="text-xs font-bold uppercase tracking-widest text-[#D66C3E] hover:underline cursor-pointer font-ui"
                    >
                      ✦ Submit Another Proposal
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
