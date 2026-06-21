import React, { useEffect, useState, useRef } from 'react';
import { Target, Users, BarChart3, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

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

export default function About({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [mounted, setMounted] = useState(false);

  // Intersection Observers for scroll animations
  const [refHero, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refTeams, isTeamsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refJourney, isJourneyVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refTeamGrid, isTeamGridVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refWork, isWorkVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refCTA, isCTAVisible] = useIntersectionObserver({ threshold: 0.2 });

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen pt-32 pb-20 px-[8%] transition-opacity duration-1000 relative z-20 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. HERO SECTION */}
      <div ref={refHero} className={`max-w-4xl mx-auto text-center mb-16 md:mb-32 mt-12 transition-all duration-1000 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <p className="font-mono text-teal-400 mb-4 md:mb-6 tracking-widest text-xs md:text-sm uppercase font-semibold drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
          About TrevaTech
        </p>
        <h1 className="hero-title !text-[40px] md:!text-[75px] !leading-[1.1] md:!leading-[0.9] !tracking-tight mb-6 md:mb-8">
          Built by People Who<br className="hidden md:block"/>Have Done the Work
        </h1>
        <p className="font-[Manrope] text-lg md:text-2xl font-light text-white/80 leading-relaxed max-w-3xl mx-auto">
          TrevaTech is run by specialist teams with direct, hands-on experience in financial markets and B2B growth systems. Every methodology we apply comes from work we have done ourselves and continue to run every day.
        </p>
      </div>

      {/* 2. TWO TEAMS ONE STANDARD */}
      <div ref={refTeams} className={`max-w-6xl mx-auto mb-20 md:mb-40 relative transition-all duration-1000 delay-200 ease-out ${isTeamsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-10 md:mb-16 relative z-10">
          <h2 className="hero-title !text-[32px] md:!text-[55px] mb-4 md:mb-6">Two Teams, One Standard</h2>
          <p className="font-[Manrope] text-sm md:text-xl text-white/70 max-w-2xl mx-auto">TrevaTech operates across two specialist disciplines.</p>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 md:gap-8 relative z-10 pb-6 md:pb-0 snap-x snap-mandatory -mx-[8vw] px-[8vw] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="shrink-0 w-[85vw] md:w-auto snap-center group bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-14 rounded-[2rem] hover:border-teal-400/30 hover:bg-black/80 transition-all duration-1000 shadow-2xl flex flex-col items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700 pointer-events-none" />
            <ShieldCheck size={36} className="text-teal-400 mb-6 md:mb-8 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)] group-hover:scale-110 transition-transform duration-500 relative z-10" />
            <h3 className="text-2xl md:text-3xl font-semibold font-[Manrope] text-white mb-4 md:mb-6 relative z-10">Broker Infrastructure</h3>
            <p className="text-white/70 leading-relaxed text-sm md:text-lg font-light relative z-10">
              Our team has run dealing desks, managed risk, and administered trading platforms inside real brokerages and prop firms—work that requires precision because the cost of error is immediate and measurable.
            </p>
          </div>

          <div className="shrink-0 w-[85vw] md:w-auto snap-center group bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-14 rounded-[2rem] hover:border-teal-400/30 hover:bg-black/80 transition-all duration-1000 shadow-2xl flex flex-col items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700 pointer-events-none" />
            <BarChart3 size={36} className="text-teal-400 mb-6 md:mb-8 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)] group-hover:scale-110 transition-transform duration-500 relative z-10" />
            <h3 className="text-2xl md:text-3xl font-semibold font-[Manrope] text-white mb-4 md:mb-6 relative z-10">AI Marketing</h3>
            <p className="text-white/70 leading-relaxed text-sm md:text-lg font-light relative z-10">
              Our team builds and runs lead generation, automation, and performance marketing systems that B2B businesses rely on for growth—work that requires constant testing and refinement to keep pace with what works.
            </p>
          </div>
        </div>

        <div className={`mt-12 text-center max-w-3xl mx-auto relative z-10 transition-all duration-1000 delay-500 ${isTeamsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-block bg-teal-900/30 border border-teal-500/20 px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.15)]">
            <p className="font-[Manrope] text-xl font-medium text-white/90">
              Both teams operate the same way. We build the system, run it ourselves, and measure it against real outcomes from first setup through ongoing delivery.
            </p>
          </div>
        </div>
      </div>

      {/* 3. OUR JOURNEY (TIMELINE) */}
      <div ref={refJourney} className="max-w-5xl mx-auto mb-20 md:mb-40 relative">
        <h2 className={`hero-title !text-center !text-[32px] md:!text-[55px] mb-10 md:mb-16 transition-all duration-1000 ${isJourneyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>Our Journey</h2>
        <div className="relative border-l border-white/10 md:border-l-0 md:flex md:justify-center">
          
          {/* Mobile left line */}
          <div className={`block md:hidden absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400 via-teal-500/50 to-transparent origin-top transition-transform duration-[3s] ease-linear ${isJourneyVisible ? 'scale-y-100' : 'scale-y-0'}`}>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-transparent to-white rounded-full shadow-[0_0_20px_#2dd4bf] transition-all duration-[3s] ease-linear ${isJourneyVisible ? 'translate-y-[1000px] opacity-0' : 'translate-y-0 opacity-100'}`} />
          </div>

          {/* Desktop central line */}
          <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400 via-teal-500/50 to-transparent -translate-x-1/2 origin-top transition-transform duration-[3s] ease-linear ${isJourneyVisible ? 'scale-y-100' : 'scale-y-0'}`}>
            {/* Glowing snake head tracking down the center line */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-32 bg-gradient-to-b from-transparent to-white rounded-full shadow-[0_0_20px_#2dd4bf] transition-all duration-[3s] ease-linear ${isJourneyVisible ? 'translate-y-[1000px] opacity-0' : 'translate-y-0 opacity-100'}`} />
          </div>

          <div className="space-y-16 md:space-y-0 relative w-full">
            
            {[
              { year: '2016', title: 'Market Analysis & Financial Data', side: 'left' },
              { year: '2021', title: 'Operational Systems for Trading Businesses', side: 'right' },
              { year: '2023', title: 'Growth Systems & Marketing Infrastructure', side: 'left' },
              { year: '2025', title: 'TrevaTech – Two Teams, One Standard', side: 'right' },
            ].map((item, idx) => {
              const baseDelay = (idx * 0.7) + 0.3; // Staggered delays: 0.3s, 1.0s, 1.7s, 2.4s
              
              return (
                <div 
                  key={idx} 
                  className={`relative pl-8 md:pl-0 md:w-1/2 transition-all duration-1000 ease-out 
                    ${item.side === 'left' ? 'md:pr-16 md:text-right md:ml-0' : 'md:pl-16 md:ml-auto'}
                    ${isJourneyVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 translate-y-10 ${item.side === 'left' ? 'md:-translate-x-12' : 'md:translate-x-12'}`}`}
                  style={{ transitionDelay: `${baseDelay + 0.3}s` }}
                >
                  
                  {/* Snake Beam shooting into card */}
                  <div 
                    className={`hidden md:block absolute top-1/2 h-[2px] bg-teal-400 shadow-[0_0_15px_#2dd4bf] -translate-y-1/2 z-0 transition-all duration-[0.6s] ease-out ${isJourneyVisible ? 'w-16' : 'w-0'} ${item.side === 'left' ? 'right-0' : 'left-0'}`} 
                    style={{ transitionDelay: `${baseDelay}s` }}
                  >
                    {/* Glowing flash when it hits the card */}
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_#2dd4bf] transition-opacity duration-300 ${isJourneyVisible ? 'opacity-100' : 'opacity-0'} ${item.side === 'left' ? 'left-0' : 'right-0'}`} 
                      style={{ transitionDelay: `${baseDelay + 0.5}s` }} 
                    />
                  </div>
                  
                  <div className="bg-[#020e0c]/60 backdrop-blur-2xl border border-teal-500/20 p-6 md:p-10 rounded-[2rem] hover:bg-[#031512]/80 hover:border-teal-400/40 hover:shadow-[0_0_50px_rgba(45,212,191,0.2)] transition-all duration-700 group relative overflow-hidden transform hover:-translate-y-2 cursor-default">
                    
                    {/* Subtle animated internal lighting */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-150 group-hover:bg-teal-500/20 animate-pulse ${item.side === 'left' ? 'right-0' : 'left-0'}`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <span className="font-mono text-teal-400 text-xl md:text-4xl font-bold tracking-widest drop-shadow-[0_0_10px_rgba(45,212,191,0.5)] block mb-2 md:mb-4 relative z-10">{item.year}</span>
                    <h4 className="text-lg md:text-2xl font-[Manrope] text-white font-medium leading-snug relative z-10 group-hover:text-teal-50 transition-colors">{item.title}</h4>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* 4. HOW WE WORK */}
      <div ref={refWork} className={`max-w-4xl mx-auto mb-20 md:mb-40 transition-all duration-1000 ease-out ${isWorkVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="hero-title !text-[32px] md:!text-[55px] mb-3 md:mb-4 relative z-10">How We Work</h2>
          <p className="font-[Manrope] text-sm md:text-xl text-white/70 relative z-10">Principles, Not Promises</p>
        </div>

        <div className="flex overflow-x-auto md:flex-col md:space-y-6 gap-4 md:gap-0 relative z-10 pb-6 md:pb-0 snap-x snap-mandatory -mx-[8vw] px-[8vw] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { num: '01', title: 'We Run What We Build', desc: 'We do not hand off systems and walk away. Our teams operate what they build day to day, so we see exactly what works and what needs to change.' },
            { num: '02', title: 'Decisions Follow Data, Not Habit', desc: 'Every system we build is reviewed against real numbers and real outcomes. When something stops performing, we adjust it.' },
            { num: '03', title: 'Built to Fit, Not to Template', desc: 'Every business has different constraints, whether regulatory, operational, or competitive. We build systems around those constraints, not around a one-size-fits-all package.' }
          ].map((principle, idx) => (
            <div 
              key={idx} 
              className={`shrink-0 w-[85vw] md:w-auto snap-center bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-start gap-4 md:gap-8 hover:bg-black/60 hover:border-teal-400/40 hover:shadow-[inset_0_0_80px_rgba(45,212,191,0.1),0_0_30px_rgba(45,212,191,0.15)] transition-all duration-700 group relative overflow-hidden`}
              style={{ transitionDelay: isWorkVisible ? `${idx * 200}ms` : '0ms' }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 blur-[50px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700 pointer-events-none" />
              <span className="font-mono text-teal-400 text-3xl md:text-4xl font-bold tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(45,212,191,0.3)] relative z-10">{principle.num}.</span>
              <div className="relative z-10 mt-0 md:mt-1">
                <h3 className="text-xl md:text-2xl font-[Manrope] text-white font-semibold mb-2 md:mb-3">
                  {principle.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm md:text-lg font-light">
                  {principle.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. OUR TEAM */}
      <div ref={refTeamGrid} className={`max-w-6xl mx-auto mb-20 md:mb-40 transition-all duration-1000 ease-out ${isTeamGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="text-center mb-10 md:mb-16">
          <h2 className="hero-title !text-[32px] md:!text-[55px] mb-3 md:mb-4">Our Team</h2>
          <p className="font-[Manrope] text-sm md:text-xl text-white/70">The People Behind the Systems</p>
        </div>

        {/* Dummy Grid for Team */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-6 md:pb-0 snap-x snap-mandatory -mx-[8vw] px-[8vw] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[1, 2, 3].map((i, idx) => (
            <div 
              key={i} 
              className={`shrink-0 w-[85vw] md:w-auto snap-center group bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-teal-400/40 hover:shadow-[0_0_40px_rgba(45,212,191,0.15)] transition-all duration-700 delay-${idx * 100}`}
            >
              <div className="w-full h-48 md:h-72 bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center relative overflow-hidden border-b border-white/10">
                <Users size={48} className="md:w-[64px] md:h-[64px] text-white/20 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-teal-400 font-mono text-xs md:text-sm tracking-widest uppercase drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">Photo Pending</span>
                </div>
              </div>
              <div className="p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[40px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700 pointer-events-none" />
                <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-teal-900/40 border border-teal-500/30 text-teal-400 text-[10px] md:text-xs font-mono uppercase tracking-widest rounded-full mb-4 md:mb-5 relative z-10">
                  {i % 2 === 0 ? 'AI Marketing' : 'Broker Infrastructure'}
                </div>
                <h3 className="text-xl md:text-2xl font-[Manrope] text-white font-semibold mb-1 relative z-10">Name Pending</h3>
                <p className="text-teal-400/80 mb-3 md:mb-5 text-[10px] md:text-sm font-medium uppercase tracking-wider relative z-10">Role / Title</p>
                <p className="text-white/70 font-light text-[13px] md:text-[15px] leading-relaxed mb-6 md:mb-8 relative z-10">
                  Short bio describing their expertise and exact role within the operational standard of TrevaTech.
                </p>
                <a href="#" className="text-white hover:text-teal-400 transition-colors text-xs md:text-sm font-semibold flex items-center gap-2 w-fit group/link relative z-10">
                  LinkedIn Profile <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. FINAL CTA */}
      <div ref={refCTA} className={`max-w-4xl mx-auto text-center bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden hover:border-teal-400/40 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] transition-all duration-[1.5s] ease-out ${isCTAVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-teal-500/20 blur-[120px] pointer-events-none" />
        
        <h2 className="hero-title !text-[32px] md:!text-[65px] !leading-[1.1] md:!leading-[0.9] mb-4 md:mb-8 relative z-10">
          Ready to Build Something<br className="hidden md:block"/>That Works?
        </h2>
        <p className="font-[Manrope] text-sm md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-12 relative z-10 font-light">
          Whether you're scaling outreach or running a trading desk, let's talk about what TrevaTech can build for you.
        </p>

        <button 
          onClick={() => setCurrentPage('Contact')}
          className="group relative overflow-hidden rounded-full bg-teal-400 border-none outline-none px-10 py-4 md:px-16 md:py-6 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer inline-flex items-center gap-3 md:gap-4 relative z-10"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 text-black font-[Manrope] font-bold text-lg md:text-2xl tracking-wide flex items-center gap-2 md:gap-3">
            Book a Call 
            <ArrowRight size={20} className="md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </button>
      </div>

    </div>
  );
}
