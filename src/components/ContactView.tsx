import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, Send, HelpCircle, Linkedin, Instagram, Youtube, MessageSquare } from 'lucide-react';

export default function ContactView() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: 'general',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('All marked fields (*) are strictly required.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const resp = await fetch('/api/submit-contact', {
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
        setErrorMsg(data.error || 'Failed to dispatch transmission to backend system.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error while transmitting alignment payload.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      enquiryType: 'general',
      message: ''
    });
    setSubmitted(false);
    setErrorMsg('');
  };

  const socials = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/128484126' }
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      
      {/* 1. HERO BLOCK */}
      <section className="relative overflow-hidden bg-mesh-grid bg-mesh-soft py-24 lg:py-32 text-center border-b border-brand-slate-pale/60">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-orange block mb-4 font-ui">
            Get in touch
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-indigo font-black tracking-tight leading-[1.1] mb-6">
            We’d like to hear from you.
          </h1>
          <p className="text-base md:text-lg text-brand-indigo/80 max-w-[800px] mx-auto leading-relaxed font-sans">
            Whether you are interested in partnering with us, contributing technical skills, or supporting the Newlist Network, we invite your enquiry. Our coordination node responds promptly and thoroughly.
          </p>
        </div>
      </section>

      {/* 2. CHANNELS GRID & FORM */}
      <section className="bg-white py-24 mb-10">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Organized Specialized Channels (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-brand-teal block mb-4 font-ui">
              Our Specific Channels
            </span>

            {/* General Enquiries */}
            <div className="border-modular bg-[#FAF9F5]/30 p-6 rounded-2xl text-left hover:border-brand-orange hover:scale-[1.01] transition-all">
              <h4 className="text-base font-bold text-brand-indigo font-serif mb-2">
                General Enquiries
              </h4>
              <p className="text-xs text-brand-indigo/80 leading-relaxed mb-4 font-sans">
                For administrative questions regarding charter guidelines, licensing, or local node alignment studies.
              </p>
              <p className="text-xs font-bold text-brand-indigo mb-1 font-ui">
                Email: <a href="mailto:general@newlist.foundation" className="text-brand-orange hover:underline">general@newlist.foundation</a>
              </p>
              <p className="text-[9px] text-brand-teal font-extrabold font-ui uppercase tracking-widest mt-2 block">
                ❖ Response target: 48 hours
              </p>
            </div>

            {/* Partnerships & Collaboration */}
            <div className="border-modular bg-[#FAF9F5]/30 p-6 rounded-2xl text-left hover:border-brand-orange hover:scale-[1.01] transition-all">
              <h4 className="text-base font-bold text-brand-indigo font-serif mb-2">
                Partnerships & Co-ops
              </h4>
              <p className="text-xs text-brand-indigo/80 leading-relaxed mb-4 font-sans">
                For municipal housing authorities, community land trusts, and microgrid technology providers.
              </p>
              <p className="text-xs font-bold text-brand-indigo mb-1 font-ui">
                Email: <a href="mailto:partnerships@newlist.foundation" className="text-brand-orange hover:underline">partnerships@newlist.foundation</a>
              </p>
            </div>

            {/* Volunteering & Skills Contribution */}
            <div className="border-modular bg-[#FAF9F5]/30 p-6 rounded-2xl text-left hover:border-brand-orange hover:scale-[1.01] transition-all">
              <h4 className="text-base font-bold text-brand-indigo font-serif mb-2">
                Technical Contribution
              </h4>
              <p className="text-xs text-brand-indigo/80 leading-relaxed mb-4 font-sans">
                For legal scholars, econometricians, systems architects, and neighborhood organizers.
              </p>
              <p className="text-xs font-bold text-brand-indigo mb-1 font-ui">
                Email: <a href="mailto:volunteer@newlist.foundation" className="text-brand-orange hover:underline">volunteer@newlist.foundation</a>
              </p>
            </div>

            {/* Registered Office */}
            <div className="border-modular bg-[#FAF9F5]/50 p-6 rounded-2xl text-left flex items-start gap-4 hover:border-brand-teal transition-colors">
              <div className="p-2.5 bg-brand-teal/10 text-brand-teal rounded-xl flex-shrink-0 node-pulse">
                <MapPin className="w-5 h-5 text-brand-teal" />
              </div>
              <div className="font-ui shrink text-xs space-y-0.5">
                <p className="font-extrabold text-[#D66C3E] uppercase tracking-wider text-[9px]">Registered UK Office</p>
                <p className="font-bold text-brand-indigo text-sm font-serif">The Newlist Foundation Limited</p>
                <p className="text-brand-indigo/80 font-sans">85 Great Portland Street, First Floor, London, W1W 7LT</p>
                <p className="text-brand-orange font-bold text-[9px] uppercase tracking-wider block pt-2">
                  ❖ Registered Non-Profit Entity Pending
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Fully Polished Interactive Form Card (lg:col-span-7) */}
          <div className="lg:col-span-7 border-modular bg-[#FAF9F5] rounded-[2rem] p-8 md:p-12 text-left shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh-grid opacity-15 pointer-events-none"></div>
            
            <div className="relative z-10 font-sans">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="mb-8 flex gap-4 items-center">
                    <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl node-pulse">
                      <MessageSquare className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-black text-brand-indigo leading-tight">
                        Write to the Node
                      </h3>
                      <p className="text-xs text-brand-indigo/70 mt-0.5">
                        Submissions are securely routed to the relevant program directors.
                      </p>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-brand-orange font-bold bg-brand-orange/5 p-4 rounded-xl border border-brand-orange/20 animate-in shake duration-300">
                      ✕ {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Diana Prince"
                        className="w-full bg-white border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-teal"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="diana@themyscira.io"
                        className="w-full bg-white border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44 7123 456789"
                        className="w-full bg-white border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-teal"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                        Enquiry Taxonomy
                      </label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-brand-slate-pale rounded-xl px-4 py-3.5 text-xs md:text-sm text-brand-indigo/90 focus:outline-none"
                      >
                        <option value="general">General Enquiry</option>
                        <option value="partnership">Partnership Proposal</option>
                        <option value="volunteer">Volunteering & Skills</option>
                        <option value="press">Press Relations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-brand-indigo uppercase tracking-wider font-ui mb-2">
                      Message Body *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Describe your design criteria, node target location, or programmatic focus..."
                      className="w-full bg-white border border-brand-slate-pale rounded-xl px-4 py-3 text-xs md:text-sm text-brand-indigo/90 focus:outline-none focus:border-brand-teal whitespace-pre-wrap"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-indigo hover:bg-brand-orange text-[#FAF9F5] py-4.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Transmitting...' : 'Dispatch Message'}
                  </button>

                </form>
              ) : (
                <div className="text-center py-10 space-y-6 animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-10 h-10 text-brand-teal" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-black text-brand-indigo">
                    Transmission Dispatched
                  </h3>
                  
                  <p className="text-xs md:text-sm text-brand-indigo/85 max-w-[500px] mx-auto leading-relaxed font-sans">
                    Thank you, <strong>{formData.name}</strong>. Your message categorized under <strong>{formData.enquiryType}</strong> has been successfully recorded in our central administrative ledger. We will reply to <strong>{formData.email}</strong> within our standard review windows.
                  </p>

                  <div className="pt-6">
                    <button
                      onClick={handleReset}
                      className="text-xs font-bold uppercase tracking-widest text-brand-indigo hover:text-brand-orange underline cursor-pointer"
                    >
                      Send Another message
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 3. SOCIAL ICON LINKS */}
      <section className="bg-gradient-to-t from-brand-slate-pale/10 to-white py-16 text-center border-t border-brand-slate-pale/30">
        <div className="max-w-[800px] mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-indigo font-ui mb-6">
            Connect Across Social Channels
          </p>
          
          <div className="flex justify-center gap-6">
            {socials.map((social) => {
              const IconComp = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="p-3.5 bg-white text-brand-indigo hover:text-white hover:bg-brand-orange rounded-full border border-brand-slate-pale shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer"
                  aria-label={social.name}
                  id={`contact-soc-${social.name.toLowerCase()}`}
                  referrerPolicy="no-referrer"
                >
                  <IconComp className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          
          <p className="text-[9px] text-brand-indigo/55 mt-8 font-ui uppercase tracking-widest">
            Official social channels are moderated under our Dignity & Equity charter protocols.
          </p>
        </div>
      </section>

    </div>
  );
}
