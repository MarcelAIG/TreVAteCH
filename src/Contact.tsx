import React, { useEffect, useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect(); // Animate only once
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options.threshold]);

  return [ref, isIntersecting] as const;
}

export default function Contact({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Scroll observers
  const [refHero, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refForm, isFormVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refInfo, isInfoVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(form);
    formData.append("access_key", "ce69ad56-10c7-4fd4-9ce1-41ba4975b2ad");
    if (selectedService) {
      formData.append("Service Interest", selectedService);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        form.reset();
        setSelectedService("");
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen pt-24 md:pt-32 pb-10 md:pb-20 px-[8%] transition-opacity duration-1000 relative z-20 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. HERO SECTION */}
      <div ref={refHero} className={`max-w-4xl mx-auto text-center mb-10 md:mb-24 mt-8 md:mt-12 transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <p className="font-mono text-teal-400 mb-4 md:mb-6 tracking-widest text-xs md:text-sm uppercase font-semibold drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
          Contact
        </p>
        <h1 className="hero-title !text-[40px] md:!text-[75px] !leading-[1] md:!leading-[0.9] !tracking-tight mb-6 md:mb-8">
          Let's Talk
        </h1>
        <p className="font-[Manrope] text-sm md:text-2xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto">
          Tell us about your business and what you need. We'll get back to you to schedule a discovery call.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
        
        {/* 2. CONTACT FORM (Left Column, 7/12 width) */}
        <div 
          ref={refForm} 
          className={`lg:col-span-7 transition-all duration-1000 ease-out delay-200 relative ${isFormVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
        >
          {/* Ambient Background Light for Form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-8 md:p-12 rounded-[2rem] relative z-10 hover:border-teal-500/30 hover:shadow-[0_0_40px_rgba(35,178,159,0.1)] transition-all duration-700 group">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full animate-pulse pointer-events-none" />

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-[Manrope] text-center relative z-20">
                Message sent successfully! We'll be in touch soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-[Manrope] text-center relative z-20">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-mono text-white/60 uppercase tracking-widest pl-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none text-white font-[Manrope] placeholder:text-white/20 focus:border-teal-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(45,212,191,0.1)] transition-all duration-300"
                  />
                </div>
                {/* Company */}
                <div className="space-y-2">
                  <label className="text-sm font-mono text-white/60 uppercase tracking-widest pl-1">Company</label>
                  <input 
                    type="text" 
                    name="company"
                    required
                    placeholder="Your Company Ltd"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none text-white font-[Manrope] placeholder:text-white/20 focus:border-teal-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(45,212,191,0.1)] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-mono text-white/60 uppercase tracking-widest pl-1">Email <span className="text-teal-400">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none text-white font-[Manrope] placeholder:text-white/20 focus:border-teal-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(45,212,191,0.1)] transition-all duration-300"
                  />
                </div>
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-mono text-white/60 uppercase tracking-widest pl-1">Phone <span className="text-white/30 lowercase tracking-normal">(optional)</span></label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+1 234 567 890"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none text-white font-[Manrope] placeholder:text-white/20 focus:border-teal-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(45,212,191,0.1)] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Service Interest */}
              <div className="space-y-2 relative z-50">
                <label className="text-sm font-mono text-white/60 uppercase tracking-widest pl-1">Service Interest</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-black/40 border transition-all duration-300 rounded-xl px-5 py-4 outline-none font-[Manrope] cursor-pointer flex items-center justify-between
                      ${isDropdownOpen ? 'border-teal-400/50 bg-white/[0.05] shadow-[0_0_20px_rgba(45,212,191,0.1)] text-white' : 'border-white/10 text-white/50 hover:bg-white/[0.02] hover:border-white/20'}
                      ${selectedService ? 'text-white' : 'text-white/20'}`}
                  >
                    {selectedService || "Select a service..."}
                    <ChevronDown size={20} className={`text-teal-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Custom Dropdown Menu */}
                  <div 
                    className={`absolute top-[calc(100%+8px)] left-0 w-full backdrop-blur-3xl bg-[#020e0c]/90 border border-teal-500/30 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(45,212,191,0.1)] overflow-hidden transition-all duration-300 transform origin-top
                      ${isDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                  >
                    {[
                      "Broker Infrastructure",
                      "AI Marketing Solutions",
                      "Both Services"
                    ].map((service) => (
                      <div 
                        key={service}
                        onClick={() => {
                          setSelectedService(service);
                          setIsDropdownOpen(false);
                        }}
                        className="px-5 py-4 cursor-pointer text-white/70 font-[Manrope] hover:bg-teal-500/10 hover:text-white transition-colors duration-200 border-b border-white/5 last:border-none flex items-center justify-between group/option"
                      >
                        {service}
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedService === service ? 'bg-teal-400 shadow-[0_0_10px_#2dd4bf]' : 'bg-transparent group-hover/option:bg-teal-400/50'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-mono text-white/60 uppercase tracking-widest pl-1">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help your business grow?"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 outline-none text-white font-[Manrope] placeholder:text-white/20 focus:border-teal-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(45,212,191,0.1)] transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full group/btn relative overflow-hidden rounded-xl bg-teal-400 border-none outline-none px-8 py-5 transition-all duration-300 hover:brightness-110 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(45,212,191,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10 text-black font-[Manrope] font-bold text-lg tracking-wide flex items-center gap-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* 3. CONTACT INFO & OFFICES (Right Column, 5/12 width) */}
        <div 
          ref={refInfo} 
          className={`lg:col-span-5 space-y-8 transition-all duration-1000 ease-out delay-400 ${isInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
        >
          {/* Get in Touch Card */}
          <div className="backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] bg-[#020e0c]/40 hover:bg-[#031512]/80 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(45,212,191,0.1)] transition-all duration-700 p-8 rounded-[2rem] group relative overflow-hidden transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-teal-500/20 transition-all duration-700" />
            <h3 className="text-2xl font-[Manrope] font-semibold text-white mb-6 relative z-10">Get in Touch</h3>
            
            <div className="space-y-6 relative z-10">
              <a href="mailto:info@trevatech.com" className="flex items-center gap-5 group/link">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover/link:bg-teal-500/20 group-hover/link:border-teal-500/40 group-hover/link:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-500 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white font-[Manrope] text-lg font-medium group-hover/link:text-teal-300 transition-colors">info@trevatech.com</p>
                </div>
              </a>

              <a href="https://wa.me/447457409190" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group/link">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover/link:bg-teal-500/20 group-hover/link:border-teal-500/40 group-hover/link:shadow-[0_0_15px_rgba(45,212,191,0.3)] transition-all duration-500 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-white/50 font-mono text-xs uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-white font-[Manrope] text-lg font-medium group-hover/link:text-teal-300 transition-colors">+44 7457 409190</p>
                </div>
              </a>
            </div>
          </div>

          {/* Offices Card */}
          <div className="backdrop-blur-3xl border border-teal-500/20 shadow-[inset_0_0_50px_rgba(45,212,191,0.05),0_0_30px_rgba(45,212,191,0.1)] bg-gradient-to-br from-teal-950/40 to-black hover:from-teal-900/60 hover:to-black hover:border-teal-400/40 transition-all duration-700 p-8 rounded-[2rem] group relative overflow-hidden transform hover:-translate-y-1">
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-teal-500/10 blur-[60px] rounded-full animate-pulse pointer-events-none" />
            <h3 className="text-2xl font-[Manrope] font-semibold text-white mb-8 relative z-10 flex items-center gap-3">
              <MapPin className="text-teal-400" size={24} />
              Our Offices
            </h3>
            
            <div className="space-y-8 relative z-10">
              {/* UK */}
              <div className="border-l-2 border-teal-500/30 pl-6 group/office hover:border-teal-400 transition-colors">
                <p className="text-teal-400 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  UK Headquarters
                </p>
                <p className="text-white/80 font-[Manrope] leading-relaxed group-hover/office:text-white transition-colors">
                  71-75 Shelton Street<br/>
                  Covent Garden<br/>
                  London, WC2H 9JQ<br/>
                  United Kingdom
                </p>
              </div>

              {/* Oman */}
              <div className="border-l-2 border-teal-500/30 pl-6 group/office hover:border-teal-400 transition-colors">
                <p className="text-teal-400 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Oman
                </p>
                <p className="text-white/80 font-[Manrope] leading-relaxed group-hover/office:text-white transition-colors">
                  McDonald's Building, P Floor<br/>
                  Al Mouj St, 138<br/>
                  Muscat, Oman
                </p>
              </div>
            </div>
            
            {/* Decorative Company Info */}
            <div className="mt-10 pt-6 border-t border-white/10 relative z-10 flex items-center justify-between opacity-50">
              <span className="font-[Manrope] text-sm text-white/80">TrevaTech Ltd</span>
              <span className="font-mono text-xs tracking-widest text-white/50">Company No. 16605222</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// Since we need ChevronDown for the select dropdown, let's make sure it's exported from lucide-react if needed, or we just import it.
// Oh wait, I didn't import ChevronDown above. Let me add it.
