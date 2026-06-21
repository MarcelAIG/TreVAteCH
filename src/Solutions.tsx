import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Server, ShieldCheck, Crosshair, Users, Activity, BarChart3, MessageSquare, CheckCircle2, Mic, Phone } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import logoCircle from '../assets/Artboard 3 copy 15.png';

// Hook for scroll animations
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
  }, [options]);

  return [ref, isIntersecting] as const;
}

const TESTIMONIALS = [
  { quote: "Treva Tech completely transformed our lead generation pipeline. The AI voice agent alone doubled our conversion rates within the first month. They truly understand the brokerage space.", name: "Michael Jordan", title: "CEO, Global Markets FX", initials: "MJ" },
  { quote: "The compliance-first approach gave us the confidence to scale across borders. Best growth partners we've worked with. Outstanding.", name: "Sarah Jenkins", title: "CMO, Prime Trading", initials: "SJ" },
  { quote: "Our FTDs skyrocketed by 150% in quarter one. Their AI systems are lightyears ahead of traditional agencies.", name: "David Chen", title: "Director, Apex Brokers", initials: "DC" },
  { quote: "Finally, an agency that understands the nuances of IB networks and lot volume requirements. Exceptional results.", name: "Elena Rostova", title: "Head of Growth, Vertex FX", initials: "ER" },
  { quote: "The automated content creation saves us hundreds of hours a month while keeping engagement at all-time highs.", name: "Marcus Wright", title: "Founder, Alpha Capital", initials: "MW" }
];

export default function Solutions() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Observers for different sections
  const [refHero, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refBroker, isBrokerVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refTree1, isTree1Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [refTree2, isTree2Visible] = useIntersectionObserver({ threshold: 0.1 });
  const [refWhy, isWhyVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [refStats, isStatsVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [refTestimonials, isTestimonialsVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-white font-[Manrope] relative bg-black pt-28 md:pt-20 pb-20 w-full overflow-hidden">
      
      {/* Background gradients for dark premium feel */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-teal-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-teal-900/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- Hero Section --- */}
        <div ref={refHero} className="mb-16 md:mb-32">
          <h1 className={`hero-title mt-12 md:mt-8 text-center !text-[40px] md:!text-[75px] !leading-[0.9] !tracking-tight mb-6 md:mb-10 drop-shadow-xl transition-all duration-1000 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our Solutions
          </h1>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 pb-6 md:pb-0 snap-x snap-mandatory -mx-[6vw] px-[6vw] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Card 1 - Slide in from left */}
            <div className={`shrink-0 w-[85vw] md:w-auto snap-center group bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-14 rounded-[2rem] hover:border-teal-400/30 hover:bg-black/80 transition-all duration-1000 shadow-2xl flex flex-col items-start relative overflow-hidden ${isHeroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[100px]'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700" />
              <p className="font-mono text-teal-400 mb-4 md:mb-6 tracking-widest text-[10px] md:text-xs uppercase font-semibold">For Brokers & Prop Firms</p>
              <h2 className="hero-title !text-left !text-[32px] md:!text-[50px] !leading-[1] !tracking-tight mb-4 md:mb-6">Broker<br/>Infrastructure</h2>
              <p className="text-white/70 text-sm md:text-xl font-light leading-relaxed mb-6 md:mb-10 max-w-sm relative z-10">
                Platform administration, dealing desk operations, and risk management, built for regulated trading environments.
              </p>
              <a href="#broker-infrastructure" className="mt-auto group/btn flex items-center gap-3 text-white font-semibold text-sm md:text-lg hover:text-teal-400 transition-colors">
                Explore Broker Infrastructure
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-teal-400 group-hover/btn:bg-teal-400/10 transition-all">
                  <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Card 2 - Slide in from right */}
            <div className={`shrink-0 w-[85vw] md:w-auto snap-center group bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-14 rounded-[2rem] hover:border-teal-400/30 hover:bg-black/80 transition-all duration-1000 delay-100 shadow-2xl flex flex-col items-start relative overflow-hidden ${isHeroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700" />
              <p className="font-mono text-teal-400 mb-4 md:mb-6 tracking-widest text-[10px] md:text-xs uppercase font-semibold">For B2B Growth</p>
              <h2 className="hero-title !text-left !text-[32px] md:!text-[50px] !leading-[1] !tracking-tight mb-4 md:mb-6">AI Marketing<br/>Solutions</h2>
              <p className="text-white/70 text-sm md:text-xl font-light leading-relaxed mb-6 md:mb-10 max-w-sm relative z-10">
                AI-powered lead generation, automation, and performance marketing that bring qualified conversations to your business.
              </p>
              <a href="#ai-marketing-solutions" className="mt-auto group/btn flex items-center gap-3 text-white font-semibold text-sm md:text-lg hover:text-teal-400 transition-colors">
                Explore AI Marketing Solutions
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-teal-400 group-hover/btn:bg-teal-400/10 transition-all">
                  <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* --- Broker Infrastructure Section --- */}
        <div id="broker-infrastructure" className="pt-16 pb-20 md:pt-24 md:pb-32 border-t border-white/10 overflow-hidden text-center md:text-left">
          <div className="mb-12 md:mb-20 max-w-3xl mx-auto md:mx-0 flex flex-col items-center md:items-start">
            <p className="font-mono text-teal-400 mb-2 tracking-widest text-[10px] md:text-sm uppercase font-semibold flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Broker Infrastructure
            </p>
            <h2 className="hero-title !text-center md:!text-left !text-[36px] md:!text-[70px] !leading-[1] md:!leading-[0.9] !tracking-tight mb-4 md:mb-8">The Operational Backbone</h2>
            <p className="text-sm md:text-2xl text-white/70 font-light leading-relaxed">
              From platform setup to daily risk decisions, we run the infrastructure that keeps your trading operation accurate, compliant, and under control.
            </p>
          </div>

          <div ref={refBroker} className={`flex overflow-x-auto md:grid md:grid-cols-2 gap-4 lg:gap-12 pb-6 md:pb-0 snap-x snap-mandatory -mx-[6vw] px-[6vw] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-1000 transform ${isBrokerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[50px]'}`}>
            
            {/* Box 1: Platform Administration */}
            <div className="shrink-0 w-[85vw] md:w-auto snap-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col xl:flex-row gap-6 md:gap-8 items-center group">
              <div className="w-full xl:w-2/5 aspect-video md:aspect-[4/3] rounded-xl bg-gradient-to-br from-teal-900/40 to-black border border-teal-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Server size={36} className="md:w-[56px] md:h-[56px] text-teal-400 drop-shadow-[0_0_15px_rgba(35,178,159,0.5)] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="w-full xl:w-3/5 text-center md:text-left">
                <h3 className="hero-title !text-center md:!text-left !text-[28px] md:!text-[32px] mb-3 md:mb-4">Platform<br className="hidden md:block"/>Administration</h3>
                <p className="text-white/70 font-light leading-relaxed text-xs md:text-base">
                  MetaTrader setup, configuration, and ongoing administration, so your systems run accurately and reliably without internal overhead.
                </p>
                <ul className="mt-4 md:mt-6 space-y-2 text-white/60 text-xs md:text-sm font-light flex flex-col items-center md:items-start">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400"/> MT4/MT5 server setup</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400"/> Bridge & liquidity integration</li>
                </ul>
              </div>
            </div>

            {/* Box 2: Dealing Desk */}
            <div className="shrink-0 w-[85vw] md:w-auto snap-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col xl:flex-row gap-6 md:gap-8 items-center group">
              <div className="w-full xl:w-2/5 aspect-video md:aspect-[4/3] rounded-xl bg-gradient-to-bl from-teal-900/40 to-black border border-teal-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <ShieldCheck size={36} className="md:w-[56px] md:h-[56px] text-teal-400 drop-shadow-[0_0_15px_rgba(35,178,159,0.5)] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="w-full xl:w-3/5 text-center md:text-left">
                <h3 className="hero-title !text-center md:!text-left !text-[28px] md:!text-[32px] mb-3 md:mb-4">Dealing Desk &<br className="hidden md:block"/>Risk Management</h3>
                <p className="text-white/70 font-light leading-relaxed text-xs md:text-base">
                  Our dealing desk team monitors exposure, classifies accounts, and manages risk in real time, giving you institutional discipline.
                </p>
                <ul className="mt-4 md:mt-6 space-y-2 text-white/60 text-xs md:text-sm font-light flex flex-col items-center md:items-start">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400"/> Real-time risk tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-400"/> A-Book/B-Book classification</li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* --- AI Marketing Solutions Section --- */}
        <div id="ai-marketing-solutions" className="pt-16 pb-20 md:pt-24 md:pb-32 border-t border-white/10 overflow-hidden text-center md:text-left">
          <div className="mb-12 md:mb-20 max-w-3xl mx-auto md:mx-0 flex flex-col items-center md:items-start">
            <p className="font-mono text-teal-400 mb-2 tracking-widest text-[10px] md:text-sm uppercase font-semibold flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Marketing Services
            </p>
            <h2 className="hero-title !text-center md:!text-left !text-[36px] md:!text-[70px] !leading-[1] md:!leading-[0.9] !tracking-tight mb-4 md:mb-8">Systems That Find, Engage, and Convert</h2>
          </div>

          <div className="flex flex-col gap-24">
            
            {/* Tree 1: AI Growth System */}
            <div ref={refTree1} className={`transition-all duration-1000 transform ${isTree1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50px]'}`}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                
                {/* Vertical Line for Desktop */}
                <div className="hidden lg:block absolute left-[324px] top-[10%] bottom-[10%] w-[2px] bg-gradient-to-b from-transparent via-teal-500/40 to-transparent z-0 shadow-[0_0_10px_rgba(35,178,159,0.3)]" />

                {/* Left Column */}
                <div className="lg:w-[300px] shrink-0 flex items-center justify-center lg:justify-end z-10 relative group">
                  {/* Outer glow aura */}
                  <div className="absolute inset-0 bg-teal-500/20 blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 rounded-full" />
                  
                  <div className="bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_40px_rgba(35,178,159,0.2)] rounded-[2rem] w-full max-w-[280px] py-8 md:py-12 flex items-center justify-center relative overflow-hidden group-hover:border-teal-400/40 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="font-serif italic text-[28px] md:text-[36px] text-white leading-tight text-center tracking-wide relative z-10 drop-shadow-lg">AI Growth<br/>System</h3>
                  </div>
                  <div className="hidden lg:block absolute right-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/40 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.3)]" />
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col gap-4 md:gap-6 z-10 mt-6 md:mt-8 lg:mt-0">
                  
                  {/* Node 1: Lead Gen */}
                  <div className="relative group/node">
                    <div className="hidden lg:block absolute left-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/30 group-hover/node:bg-teal-400/80 transition-colors duration-500 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.2)]" />
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(35,178,159,0.15)] transition-all duration-500 md:hover:-translate-y-1 cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0 group-hover/node:scale-110 transition-transform duration-500">
                        <Users size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover/node:text-teal-50 transition-colors duration-300">Lead Generation System</h4>
                        <p className="text-white/50 font-light text-xs md:text-sm group-hover/node:text-white/70 transition-colors duration-300">Automated outreach and continuous top-of-funnel filling tailored for your brokerage.</p>
                      </div>
                    </div>
                  </div>

                  {/* Node 2: AI Receptionist */}
                  <div className="relative group/node">
                    <div className="hidden lg:block absolute left-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/30 group-hover/node:bg-teal-400/80 transition-colors duration-500 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.2)]" />
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(35,178,159,0.15)] transition-all duration-500 md:hover:-translate-y-1 cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0 group-hover/node:scale-110 transition-transform duration-500">
                        <Mic size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover/node:text-teal-50 transition-colors duration-300">AI Receptionist</h4>
                        <p className="text-white/50 font-light text-xs md:text-sm group-hover/node:text-white/70 transition-colors duration-300">Human-like conversational AI for inbound & outbound calls.</p>
                      </div>
                    </div>
                  </div>

                  {/* Node 3: Chatbot */}
                  <div className="relative group/node">
                    <div className="hidden lg:block absolute left-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/30 group-hover/node:bg-teal-400/80 transition-colors duration-500 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.2)]" />
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(35,178,159,0.15)] transition-all duration-500 md:hover:-translate-y-1 cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0 group-hover/node:scale-110 transition-transform duration-500">
                        <MessageSquare size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover/node:text-teal-50 transition-colors duration-300">Chatbot</h4>
                        <p className="text-white/50 font-light text-xs md:text-sm group-hover/node:text-white/70 transition-colors duration-300">Smart 24/7 web chat resolution and lead qualification.</p>
                      </div>
                    </div>
                  </div>

                  {/* Node 4: WhatsApp bot */}
                  <div className="relative group/node">
                    <div className="hidden lg:block absolute left-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/30 group-hover/node:bg-teal-400/80 transition-colors duration-500 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.2)]" />
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(35,178,159,0.15)] transition-all duration-500 md:hover:-translate-y-1 cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0 group-hover/node:scale-110 transition-transform duration-500">
                        <Phone size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover/node:text-teal-50 transition-colors duration-300">WhatsApp bot</h4>
                        <p className="text-white/50 font-light text-xs md:text-sm group-hover/node:text-white/70 transition-colors duration-300">Direct messaging automation and instant replies.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Tree 2: Performance Marketing */}
            <div ref={refTree2} className={`transition-all duration-1000 transform delay-200 ${isTree2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50px]'}`}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                
                {/* Vertical Line for Desktop */}
                <div className="hidden lg:block absolute left-[324px] top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-teal-500/40 to-transparent z-0 shadow-[0_0_10px_rgba(35,178,159,0.3)]" />

                {/* Left Column */}
                <div className="lg:w-[300px] shrink-0 flex items-center justify-center lg:justify-end z-10 relative group">
                  {/* Outer glow aura */}
                  <div className="absolute inset-0 bg-teal-500/20 blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 rounded-full" />
                  
                  <div className="bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_40px_rgba(35,178,159,0.2)] rounded-[2rem] w-full max-w-[280px] py-8 md:py-12 flex items-center justify-center relative overflow-hidden group-hover:border-teal-400/40 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="font-serif italic text-[28px] md:text-[32px] text-white leading-tight text-center tracking-wide relative z-10 drop-shadow-lg">Performance<br/>Marketing</h3>
                  </div>
                  <div className="hidden lg:block absolute right-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/40 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.3)]" />
                </div>

                {/* Right Column */}
                <div className="flex-1 flex flex-col gap-4 md:gap-6 z-10 mt-6 md:mt-8 lg:mt-0">
                  
                  {/* Node 1 */}
                  <div className="relative group/node">
                    <div className="hidden lg:block absolute left-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/30 group-hover/node:bg-teal-400/80 transition-colors duration-500 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.2)]" />
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(35,178,159,0.15)] transition-all duration-500 md:hover:-translate-y-1 cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0 group-hover/node:scale-110 transition-transform duration-500">
                        <Activity size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover/node:text-teal-50 transition-colors duration-300">Meta Ads</h4>
                        <p className="text-white/50 font-light text-xs md:text-sm group-hover/node:text-white/70 transition-colors duration-300">Hyper-targeted campaigns across Facebook and Instagram to attract retail traders.</p>
                      </div>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div className="relative group/node">
                    <div className="hidden lg:block absolute left-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/30 group-hover/node:bg-teal-400/80 transition-colors duration-500 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.2)]" />
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(35,178,159,0.15)] transition-all duration-500 md:hover:-translate-y-1 cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0 group-hover/node:scale-110 transition-transform duration-500">
                        <BarChart3 size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover/node:text-teal-50 transition-colors duration-300">Google Search & Display Ads</h4>
                        <p className="text-white/50 font-light text-xs md:text-sm group-hover/node:text-white/70 transition-colors duration-300">Capture high-intent traffic actively searching for brokerage services and trading platforms.</p>
                      </div>
                    </div>
                  </div>

                  {/* Node 3 */}
                  <div className="relative group/node">
                    <div className="hidden lg:block absolute left-[-24px] top-1/2 w-[24px] h-[2px] bg-teal-500/30 group-hover/node:bg-teal-400/80 transition-colors duration-500 -translate-y-1/2 shadow-[0_0_10px_rgba(35,178,159,0.2)]" />
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left hover:bg-white/[0.04] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(35,178,159,0.15)] transition-all duration-500 md:hover:-translate-y-1 cursor-default">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400 shrink-0 group-hover/node:scale-110 transition-transform duration-500">
                        <Crosshair size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-1 group-hover/node:text-teal-50 transition-colors duration-300">SEO & GEO Optimization</h4>
                        <p className="text-white/50 font-light text-xs md:text-sm group-hover/node:text-white/70 transition-colors duration-300">Long-term organic visibility to dominate search engine results globally.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- Why TrevaTech (Radial Hub) --- */}
        <div ref={refWhy} className={`pt-20 pb-20 md:pt-32 md:pb-32 border-t border-white/10 relative overflow-hidden flex flex-col items-center transition-all duration-1000 ${isWhyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="hero-title !text-center !text-[36px] md:!text-[70px] !leading-[0.9] !tracking-tight mb-16 md:mb-24">Why TrevaTech</h2>
          
          <div className="hidden md:flex relative w-full max-w-4xl aspect-video items-center justify-center mt-10">
            
            {/* Center Logo Hub */}
            <div className="absolute z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-black border border-teal-500/50 shadow-[0_0_50px_rgba(35,178,159,0.3)] flex items-center justify-center animate-pulse overflow-hidden p-6" style={{ animationDuration: '4s' }}>
              <img src={logoCircle} alt="TrevaTech" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Connecting SVG Lines (pseudo-animated via dashed stroke) */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-40 hidden md:block" style={{ pointerEvents: 'none' }}>
              <style>{`
                .line-draw {
                  stroke-dasharray: 20;
                  animation: dash-move 30s linear infinite;
                }
                @keyframes dash-move {
                  from { stroke-dashoffset: 1000; }
                  to { stroke-dashoffset: 0; }
                }
              `}</style>
              <path className="line-draw" d="M 50% 50% L 20% 20%" stroke="#2dd4bf" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M 50% 50% L 80% 20%" stroke="#2dd4bf" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M 50% 50% L 20% 80%" stroke="#2dd4bf" strokeWidth="2" fill="none" />
              <path className="line-draw" d="M 50% 50% L 80% 80%" stroke="#2dd4bf" strokeWidth="2" fill="none" />
            </svg>

            {/* Radial Nodes */}
            <div className="absolute top-0 left-0 w-full h-full z-10 hidden md:block">
              {/* Top Left */}
              <div className="absolute top-[5%] left-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl hover:border-teal-400/50 transition-colors">
                <Crosshair className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Specialist Teams</h4>
                <p className="text-white/60 text-sm font-light">Every service line is run by people with hands-on experience in that exact field.</p>
              </div>
              {/* Top Right */}
              <div className="absolute top-[5%] right-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl hover:border-teal-400/50 transition-colors">
                <Activity className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">End-to-End Delivery</h4>
                <p className="text-white/60 text-sm font-light">We build, manage, and run the systems, not just advise on them.</p>
              </div>
              {/* Bottom Left */}
              <div className="absolute bottom-[5%] left-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl hover:border-teal-400/50 transition-colors">
                <BarChart3 className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Outcome-Focused</h4>
                <p className="text-white/60 text-sm font-light">Every system is tracked against real results: leads, conversions, revenue.</p>
              </div>
              {/* Bottom Right */}
              <div className="absolute bottom-[5%] right-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl hover:border-teal-400/50 transition-colors">
                <ShieldCheck className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Regulated Built</h4>
                <p className="text-white/60 text-sm font-light">Operations designed to work within real-world compliance and platform constraints.</p>
              </div>
            </div>
          </div>

          {/* Mobile Fallback for Radial Nodes (Reordered) */}
          <div className="flex flex-col items-center gap-6 md:hidden w-full z-10">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full bg-black/80 border border-white/10 p-5 rounded-2xl text-center flex flex-col items-center">
                <Crosshair className="text-teal-400 mb-2" size={20} />
                <h4 className="font-bold text-white mb-1 text-sm">Specialist Teams</h4>
                <p className="text-white/60 text-xs font-light">Every service line is run by people with hands-on experience in that exact field.</p>
              </div>
              <div className="w-full bg-black/80 border border-white/10 p-5 rounded-2xl text-center flex flex-col items-center">
                <Activity className="text-teal-400 mb-2" size={20} />
                <h4 className="font-bold text-white mb-1 text-sm">End-to-End Delivery</h4>
                <p className="text-white/60 text-xs font-light">We build, manage, and run the systems, not just advise on them.</p>
              </div>
            </div>

            <div className="relative z-20 w-24 h-24 rounded-full bg-black border border-teal-500/50 shadow-[0_0_30px_rgba(35,178,159,0.3)] flex items-center justify-center overflow-hidden p-4">
              <img src={logoCircle} alt="TrevaTech" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full bg-black/80 border border-white/10 p-5 rounded-2xl text-center flex flex-col items-center">
                <BarChart3 className="text-teal-400 mb-2" size={20} />
                <h4 className="font-bold text-white mb-1 text-sm">Outcome-Focused</h4>
                <p className="text-white/60 text-xs font-light">Every system is tracked against real results: leads, conversions, revenue.</p>
              </div>
              <div className="w-full bg-black/80 border border-white/10 p-5 rounded-2xl text-center flex flex-col items-center">
                <ShieldCheck className="text-teal-400 mb-2" size={20} />
                <h4 className="font-bold text-white mb-1 text-sm">Regulated Built</h4>
                <p className="text-white/60 text-xs font-light">Operations designed to work within real-world compliance and platform constraints.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Simple Numbers Stats Bar --- */}
        <div ref={refStats} className={`py-4 md:py-16 md:border-t md:border-b border-white/10 mb-20 md:mb-32 md:bg-white/[0.02] md:rounded-[3rem] text-center md:shadow-2xl transition-all duration-1000 transform ${isStatsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-12 md:divide-x divide-white/10 px-[6vw] md:px-8 pb-4 md:pb-0 snap-x snap-mandatory -mx-[6vw] md:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className={`shrink-0 w-[55vw] md:w-auto snap-center aspect-square md:aspect-auto flex flex-col items-center justify-center bg-white/[0.02] md:bg-transparent border border-white/10 md:border-none rounded-3xl md:rounded-none transition-all duration-700 delay-100 ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h4 className="font-mono text-[40px] md:text-[70px] leading-none text-teal-400 font-bold mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(35,178,159,0.4)]">3</h4>
              <p className="text-white/80 uppercase tracking-[0.2em] text-[10px] md:text-sm font-semibold">Active Broker<br/>Partnerships</p>
            </div>
            <div className={`shrink-0 w-[55vw] md:w-auto snap-center aspect-square md:aspect-auto flex flex-col items-center justify-center bg-white/[0.02] md:bg-transparent border border-white/10 md:border-none rounded-3xl md:rounded-none transition-all duration-700 delay-300 ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h4 className="font-mono text-[40px] md:text-[70px] leading-none text-teal-400 font-bold mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(35,178,159,0.4)]">6</h4>
              <p className="text-white/80 uppercase tracking-[0.2em] text-[10px] md:text-sm font-semibold">Marketing Clients<br/>Served</p>
            </div>
            <div className={`shrink-0 w-[55vw] md:w-auto snap-center aspect-square md:aspect-auto flex flex-col items-center justify-center bg-white/[0.02] md:bg-transparent border border-white/10 md:border-none rounded-3xl md:rounded-none transition-all duration-700 delay-500 ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h4 className="font-mono text-[40px] md:text-[70px] leading-none text-teal-400 font-bold mb-2 md:mb-4 drop-shadow-[0_0_15px_rgba(35,178,159,0.4)]">5+</h4>
              <p className="text-white/80 uppercase tracking-[0.2em] text-[10px] md:text-sm font-semibold">Years in<br/>Industry</p>
            </div>
          </div>
        </div>

        {/* --- Testimonials --- */}
        <div ref={refTestimonials} className={`pb-20 md:pb-32 transition-all duration-1000 ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="hero-title !text-center !text-[36px] md:!text-[70px] !leading-[0.9] !tracking-tight mb-10 md:mb-16">What Our Partners Say</h2>
          
          <div className="max-w-5xl mx-auto backdrop-blur-md bg-black/60 border border-white/10 p-6 md:p-14 rounded-[2rem] shadow-2xl relative overflow-hidden text-center">
            <style>{`
              .testimonial-swiper-sol { padding-bottom: 2rem !important; }
              @media (min-width: 768px) {
                .testimonial-swiper-sol { padding-bottom: 3rem !important; }
              }
              .testimonial-swiper-sol .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.3); width: 8px; height: 8px; }
              @media (min-width: 768px) {
                .testimonial-swiper-sol .swiper-pagination-bullet { width: 10px; height: 10px; }
              }
              .testimonial-swiper-sol .swiper-pagination-bullet-active { background: #2dd4bf; width: 20px; border-radius: 4px; }
              @media (min-width: 768px) {
                .testimonial-swiper-sol .swiper-pagination-bullet-active { width: 30px; border-radius: 5px; }
              }
              .testimonial-swiper-sol .swiper-pagination { text-align: center !important; bottom: 0 !important; left: 0 !important; width: 100% !important; }
            `}</style>

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              grabCursor={true}
              loop={true}
              className="testimonial-swiper-sol w-full"
            >
              {TESTIMONIALS.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col h-full text-center items-center px-2 md:px-4">
                    <svg className="w-8 h-8 md:w-12 md:h-12 text-teal-400/40 mb-6 md:mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                    <p className="font-[Manrope] text-[15px] md:text-3xl font-light text-white/90 italic leading-relaxed mb-8 md:mb-12 max-w-4xl">"{t.quote}"</p>
                    <div className="flex flex-col items-center gap-3 md:gap-4 mt-auto">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-black font-bold text-lg md:text-2xl shadow-[0_0_20px_rgba(35,178,159,0.4)]">{t.initials}</div>
                      <div>
                        <p className="text-white font-medium text-sm md:text-xl">{t.name}</p>
                        <p className="text-teal-400/80 text-[10px] md:text-sm tracking-wide uppercase mt-1">{t.title}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* --- CTA Section --- */}
        <div className="pb-10 md:pb-20 flex flex-col justify-center items-center w-full text-center">
          <div className="bg-black/80 border border-teal-500/30 p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] w-full max-w-5xl shadow-[0_0_50px_rgba(35,178,159,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-50"></div>
            
            <h1 className="hero-title !text-[32px] md:!text-[80px] !leading-[1.1] md:!leading-[0.9] !tracking-tight mb-4 md:mb-8">Ready to Build Something<br className="hidden md:block"/>That Works?</h1>
            <p className="text-sm md:text-2xl font-light text-white/80 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
              Whether you're scaling outreach or running a trading desk, let's talk about what TrevaTech can build for you.
            </p>
            
            <style>{`
              @keyframes cta-pulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(45, 212, 191, 0.3); }
                50% { transform: scale(1.05); box-shadow: 0 0 70px rgba(45, 212, 191, 0.7); }
              }
              .cta-pulse-btn {
                animation: cta-pulse 3s ease-in-out infinite;
              }
            `}</style>
            
            <button className="cta-pulse-btn group/btn relative overflow-hidden rounded-full bg-teal-400 border-none outline-none px-10 py-4 md:px-16 md:py-6 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer mx-auto">
              <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[0%] transition-transform duration-1000 ease-in-out"></div>
              <span className="relative z-10 flex items-center justify-center gap-3 text-black font-[Manrope] font-extrabold text-lg md:text-2xl tracking-wider">
                Book a Call
                <svg className="w-5 h-5 md:w-8 md:h-8 group-hover/btn:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
