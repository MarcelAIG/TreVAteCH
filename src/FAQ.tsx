import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

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

export default function FAQ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [mounted, setMounted] = useState(false);
  
  // Accordion states
  const [openGeneral, setOpenGeneral] = useState<number | null>(0);
  const [openBroker, setOpenBroker] = useState<number | null>(null);
  const [openAI, setOpenAI] = useState<number | null>(null);

  // Scroll observers
  const [refHero, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refGeneral, isGeneralVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refColumns, isColumnsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refCTA, isCTAVisible] = useIntersectionObserver({ threshold: 0.2 });

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const generalFaqs = [
    {
      q: "What does TrevaTech do?",
      a: "TrevaTech operates across two specialist disciplines: Broker Infrastructure platform administration, dealing desk, and risk management and AI Marketing Solutions lead generation, automation, and performance marketing."
    },
    {
      q: "Who does TrevaTech work with?",
      a: "We work with brokers and prop firms on the infrastructure side, and B2B businesses looking to scale outreach and growth on the marketing side."
    },
    {
      q: "Does TrevaTech only work with one type of business?",
      a: "No. Our two teams operate independently, so you can work with us for broker infrastructure, marketing systems, or both."
    },
    {
      q: "Where is TrevaTech based?",
      a: "TrevaTech has offices in London, United Kingdom, and Muscat, Oman, and works with clients globally."
    },
    {
      q: "How do I get started?",
      a: "Book a discovery call through our Contact page. We will walk through your specific needs and outline how TrevaTech can help."
    }
  ];

  const brokerFaqs = [
    {
      q: "What platforms do you support?",
      a: "We work with MetaTrader 4 and MetaTrader 5, with specialized experience in T4B and Centroid bridge integration, along with connections to prime liquidity providers across the industry."
    },
    {
      q: "Do you manage risk for live trading accounts?",
      a: "Yes. Our dealing desk team monitors exposure, classifies accounts A-Book/B-Book, and manages risk in real time."
    },
    {
      q: "Can you work with our existing setup, or do we need to start from scratch?",
      a: "Both. We can audit and optimize an existing setup, or build the infrastructure from the ground up."
    },
    {
      q: "Do you work within regulatory requirements?",
      a: "Yes. Every system we build operates within the regulatory and platform boundaries relevant to your jurisdiction."
    },
    {
      q: "Is this an ongoing service or a one-time setup?",
      a: "Both options are available. Many clients start with a setup phase and move into ongoing dealing desk and risk management support."
    },
    {
      q: "How quickly can you start?",
      a: "Timelines depend on the scope of work. We typically begin with a discovery call to assess your setup before proposing a timeline."
    }
  ];

  const aiFaqs = [
    {
      q: "What channels do you work with for lead generation?",
      a: "We build outreach systems across email, LinkedIn, and other relevant channels, combined with AI-powered qualification to focus on leads that are ready to convert."
    },
    {
      q: "Can you build a voice agent or chatbot for our specific business?",
      a: "Yes. Voice agents, chatbots, and WhatsApp automation are built around your business, your FAQs, your booking flow, and your CRM."
    },
    {
      q: "Do you manage paid ad campaigns, or just set them up?",
      a: "We manage campaigns end-to-end: strategy, setup, ongoing optimization, and reporting, across Meta and Google."
    },
    {
      q: "What is GEO optimization?",
      a: "GEO (Generative Engine Optimization) improves how your business appears in AI-powered search and answer engines, alongside traditional SEO."
    },
    {
      q: "Will the content match our brand voice?",
      a: "Yes. We learn your brand voice and messaging before building any automated content or outreach system."
    },
    {
      q: "How long before we see results?",
      a: "Timelines vary by channel. Paid campaigns typically show early data within weeks, while SEO and organic systems build over months."
    }
  ];

  return (
    <div className={`min-h-screen pt-24 md:pt-32 pb-10 md:pb-20 px-[8%] transition-opacity duration-1000 relative z-20 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. HERO SECTION */}
      <div ref={refHero} className={`max-w-4xl mx-auto text-center mb-16 md:mb-32 mt-8 md:mt-12 transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <p className="font-mono text-teal-400 mb-4 md:mb-6 tracking-widest text-xs md:text-sm uppercase font-semibold drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
          FAQ
        </p>
        <h1 className="hero-title !text-[36px] md:!text-[75px] !leading-[1] md:!leading-[0.9] !tracking-tight mb-6 md:mb-8">
          Questions, Answered
        </h1>
        <p className="font-[Manrope] text-sm md:text-2xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto">
          Common questions about how TrevaTech works, across Broker Infrastructure and AI Marketing Solutions. Can't find what you're looking for? Reach out directly.
        </p>
      </div>

      {/* 2. GENERAL FAQ (Full Width) */}
      <div ref={refGeneral} className={`max-w-4xl mx-auto mb-20 md:mb-32 transition-all duration-1000 delay-200 ease-out relative ${isGeneralVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <h2 className="text-[28px] md:text-4xl font-[Manrope] font-semibold text-white mb-8 md:mb-10 text-center relative z-10">
          General
        </h2>

        <div className="space-y-4 relative z-10">
          {generalFaqs.map((faq, idx) => {
            const isOpen = openGeneral === idx;
            return (
              <div 
                key={idx} 
                className={`backdrop-blur-3xl transition-all duration-700 rounded-[2rem] overflow-hidden cursor-pointer group relative transform border
                  ${isOpen 
                    ? 'border-teal-500/50 shadow-[inset_0_0_80px_rgba(35,178,159,0.1),0_0_50px_rgba(35,178,159,0.2)] bg-gradient-to-br from-teal-950/60 to-black scale-[1.01] md:scale-100' 
                    : 'border-white/10 bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/[0.04] hover:border-teal-500/40 hover:shadow-[0_0_40px_rgba(35,178,159,0.15)] hover:-translate-y-1'}`}
                onClick={() => setOpenGeneral(isOpen ? null : idx)}
              >
                {/* Premium Animated Internal Lighting */}
                {isOpen && (
                  <>
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full animate-pulse pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,178,159,0.05)_0%,transparent_100%)] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
                  </>
                )}
                
                <div className="px-5 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left relative z-10 gap-3 md:gap-0">
                  <h3 className={`text-[15px] md:text-xl font-[Manrope] font-semibold transition-all duration-500 md:pr-8
                    ${isOpen ? 'text-teal-300 drop-shadow-[0_0_10px_rgba(35,178,159,0.4)] tracking-wide' : 'text-white/90 group-hover:text-teal-50'}`}>
                    {faq.q}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-700
                    ${isOpen ? 'bg-teal-400 text-black shadow-[0_0_25px_#2dd4bf] rotate-180 scale-110' : 'bg-white/5 text-white/50 group-hover:bg-teal-500/20 group-hover:text-teal-400 group-hover:scale-110'}`}>
                    <ChevronDown size={16} className="md:w-6 md:h-6" />
                  </div>
                </div>
                <div 
                  className={`px-5 md:px-8 overflow-hidden transition-all duration-700 ease-in-out relative z-10 text-center md:text-left
                    ${isOpen ? 'max-h-96 opacity-100 pb-5 md:pb-8 translate-y-0' : 'max-h-0 opacity-0 pb-0 -translate-y-4'}`}
                >
                  <div className={`transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-white/70 leading-relaxed font-light text-[13px] md:text-lg">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. TWO COLUMNS FAQ */}
      <div ref={refColumns} className={`max-w-7xl mx-auto mb-20 md:mb-40 transition-all duration-1000 ease-out relative ${isColumnsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          
          {/* Broker Infrastructure Column */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="mb-8 md:mb-10 text-center lg:text-left relative z-10">
              <h2 className="text-[26px] md:text-3xl font-[Manrope] font-semibold text-white mb-2 md:mb-3">Broker Infrastructure</h2>
              <p className="text-teal-400/80 font-mono text-[10px] md:text-sm uppercase tracking-widest">For Brokers & Prop Firms</p>
            </div>
            <div className="space-y-4 relative z-10">
              {brokerFaqs.map((faq, idx) => {
                const isOpen = openBroker === idx;
                return (
                  <div 
                    key={idx} 
                    className={`backdrop-blur-3xl transition-all duration-700 rounded-[2rem] overflow-hidden cursor-pointer group relative transform border
                      ${isOpen 
                        ? 'border-teal-500/50 shadow-[inset_0_0_80px_rgba(35,178,159,0.1),0_0_50px_rgba(35,178,159,0.2)] bg-gradient-to-br from-teal-950/60 to-black scale-[1.01] md:scale-100' 
                        : 'border-white/10 bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/[0.04] hover:border-teal-500/40 hover:shadow-[0_0_40px_rgba(35,178,159,0.15)] hover:-translate-y-1'}`}
                    onClick={() => setOpenBroker(isOpen ? null : idx)}
                  >
                    {/* Premium Animated Internal Lighting */}
                    {isOpen && (
                      <>
                        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-teal-500/20 blur-[60px] rounded-full animate-pulse pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,178,159,0.05)_0%,transparent_100%)] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
                      </>
                    )}
                    
                    <div className="px-5 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left relative z-10 gap-3 md:gap-0">
                      <h3 className={`text-[14px] md:text-lg font-[Manrope] font-semibold transition-all duration-500 md:pr-6
                        ${isOpen ? 'text-teal-300 drop-shadow-[0_0_10px_rgba(35,178,159,0.4)] tracking-wide' : 'text-white/90 group-hover:text-teal-50'}`}>
                        {faq.q}
                      </h3>
                      <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-700
                        ${isOpen ? 'bg-teal-400 text-black shadow-[0_0_20px_#2dd4bf] rotate-180 scale-110' : 'bg-white/5 text-white/50 group-hover:bg-teal-500/20 group-hover:text-teal-400 group-hover:scale-110'}`}>
                        <ChevronDown size={14} className="md:w-[20px] md:h-[20px]" />
                      </div>
                    </div>
                    <div 
                      className={`px-5 md:px-8 overflow-hidden transition-all duration-700 ease-in-out relative z-10 text-center md:text-left
                        ${isOpen ? 'max-h-96 opacity-100 pb-5 md:pb-8 translate-y-0' : 'max-h-0 opacity-0 pb-0 -translate-y-4'}`}
                    >
                      <div className={`transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-white/70 leading-relaxed font-light text-[12px] md:text-base">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Marketing Solutions Column */}
          <div className="relative mt-12 lg:mt-0">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="mb-8 md:mb-10 text-center lg:text-left relative z-10">
              <h2 className="text-[26px] md:text-3xl font-[Manrope] font-semibold text-white mb-2 md:mb-3">AI Marketing Solutions</h2>
              <p className="text-teal-400/80 font-mono text-[10px] md:text-sm uppercase tracking-widest">For B2B Growth</p>
            </div>
            <div className="space-y-4 relative z-10">
              {aiFaqs.map((faq, idx) => {
                const isOpen = openAI === idx;
                return (
                  <div 
                    key={idx} 
                    className={`backdrop-blur-3xl transition-all duration-700 rounded-[2rem] overflow-hidden cursor-pointer group relative transform border
                      ${isOpen 
                        ? 'border-teal-500/50 shadow-[inset_0_0_80px_rgba(35,178,159,0.1),0_0_50px_rgba(35,178,159,0.2)] bg-gradient-to-br from-teal-950/60 to-black scale-[1.01] md:scale-100' 
                        : 'border-white/10 bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/[0.04] hover:border-teal-500/40 hover:shadow-[0_0_40px_rgba(35,178,159,0.15)] hover:-translate-y-1'}`}
                    onClick={() => setOpenAI(isOpen ? null : idx)}
                  >
                    {/* Premium Animated Internal Lighting */}
                    {isOpen && (
                      <>
                        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-teal-500/20 blur-[60px] rounded-full animate-pulse pointer-events-none" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,178,159,0.05)_0%,transparent_100%)] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />
                      </>
                    )}
                    
                    <div className="px-5 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left relative z-10 gap-3 md:gap-0">
                      <h3 className={`text-[14px] md:text-lg font-[Manrope] font-semibold transition-all duration-500 md:pr-6
                        ${isOpen ? 'text-teal-300 drop-shadow-[0_0_10px_rgba(35,178,159,0.4)] tracking-wide' : 'text-white/90 group-hover:text-teal-50'}`}>
                        {faq.q}
                      </h3>
                      <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-700
                        ${isOpen ? 'bg-teal-400 text-black shadow-[0_0_20px_#2dd4bf] rotate-180 scale-110' : 'bg-white/5 text-white/50 group-hover:bg-teal-500/20 group-hover:text-teal-400 group-hover:scale-110'}`}>
                        <ChevronDown size={14} className="md:w-[20px] md:h-[20px]" />
                      </div>
                    </div>
                    <div 
                      className={`px-5 md:px-8 overflow-hidden transition-all duration-700 ease-in-out relative z-10 text-center md:text-left
                        ${isOpen ? 'max-h-96 opacity-100 pb-5 md:pb-8 translate-y-0' : 'max-h-0 opacity-0 pb-0 -translate-y-4'}`}
                    >
                      <div className={`transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-white/70 leading-relaxed font-light text-[12px] md:text-base">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* 4. FINAL CTA */}
      <div ref={refCTA} className={`max-w-4xl mx-auto text-center bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-20 rounded-3xl md:rounded-[3rem] relative overflow-hidden hover:border-teal-400/40 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] transition-all duration-[1.5s] ease-out ${isCTAVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-teal-500/20 blur-[120px] pointer-events-none" />
        
        <h2 className="hero-title !text-[36px] md:!text-[65px] !leading-[1] md:!leading-[0.9] mb-4 md:mb-8 relative z-10">
          Still Have Questions?
        </h2>
        <p className="font-[Manrope] text-xs md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-12 relative z-10 font-light">
          Book a call and we'll walk you through exactly how TrevaTech can help your business.
        </p>

        <button 
          onClick={() => setCurrentPage('Contact')}
          className="group relative overflow-hidden rounded-full bg-teal-400 border-none outline-none px-10 py-4 md:px-16 md:py-6 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer inline-flex items-center gap-3 md:gap-4 relative z-10"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 text-black font-[Manrope] font-bold text-lg md:text-2xl tracking-wide flex items-center gap-2 md:gap-3">
            Book a Call 
            <ArrowRight size={18} className="md:w-[24px] md:h-[24px] group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </button>
      </div>

    </div>
  );
}
