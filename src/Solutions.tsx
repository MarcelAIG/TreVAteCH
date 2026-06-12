import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Server, ShieldCheck, Crosshair, Users, Activity, BarChart3, MessageSquare } from 'lucide-react';

export default function Solutions() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-white font-[Manrope] relative bg-black pt-32 pb-20 w-full overflow-hidden">
      
      {/* Background gradients for dark premium feel */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-teal-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-teal-900/20 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- Hero Section --- */}
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="hero-title text-center !text-[60px] md:!text-[90px] !leading-[0.9] !tracking-tight mb-20 drop-shadow-xl">Our Solutions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
            {/* Card 1 */}
            <div className="group bg-black/60 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[2rem] hover:border-teal-400/30 hover:bg-black/80 transition-all duration-500 shadow-2xl flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700" />
              <p className="font-mono text-teal-400 mb-6 tracking-widest text-xs uppercase font-semibold">For Brokers & Prop Firms</p>
              <h2 className="hero-title !text-left !text-[40px] md:!text-[50px] !leading-[1] !tracking-tight mb-6">Broker<br/>Infrastructure</h2>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-sm relative z-10">
                Platform administration, dealing desk operations, and risk management, built for regulated trading environments.
              </p>
              <a href="#broker-infrastructure" className="mt-auto group/btn flex items-center gap-3 text-white font-semibold text-lg hover:text-teal-400 transition-colors">
                Explore Broker Infrastructure
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-teal-400 group-hover/btn:bg-teal-400/10 transition-all">
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Card 2 */}
            <div className="group bg-black/60 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[2rem] hover:border-teal-400/30 hover:bg-black/80 transition-all duration-500 shadow-2xl flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-all duration-700" />
              <p className="font-mono text-teal-400 mb-6 tracking-widest text-xs uppercase font-semibold">For B2B Growth</p>
              <h2 className="hero-title !text-left !text-[40px] md:!text-[50px] !leading-[1] !tracking-tight mb-6">AI Marketing<br/>Solutions</h2>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-sm relative z-10">
                AI-powered lead generation, automation, and performance marketing that bring qualified conversations to your business.
              </p>
              <a href="#ai-marketing-solutions" className="mt-auto group/btn flex items-center gap-3 text-white font-semibold text-lg hover:text-teal-400 transition-colors">
                Explore AI Marketing Solutions
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-teal-400 group-hover/btn:bg-teal-400/10 transition-all">
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* --- Broker Infrastructure Section --- */}
        <div id="broker-infrastructure" className="pt-24 pb-32 border-t border-white/10">
          <div className="mb-20 max-w-3xl">
            <p className="font-mono text-teal-400 mb-6 tracking-widest text-sm uppercase font-semibold flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Broker Infrastructure
            </p>
            <h2 className="hero-title !text-[50px] md:!text-[70px] !leading-[0.9] !tracking-tight mb-8">The Operational Backbone for Brokers & Prop Firms</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
              From platform setup to daily risk decisions, we run the infrastructure that keeps your trading operation accurate, compliant, and under control.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {/* Zigzag 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 w-full order-2 lg:order-1 relative">
                <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-black to-white/[0.02] border border-white/10 p-8 flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Server size={48} className="text-teal-400 mb-8" />
                  <ul className="space-y-4 text-white/80 font-light text-lg">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> MT4/MT5 server setup & configuration</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> Symbol, group, and account management</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> Bridge & liquidity provider integration</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> Ongoing technical administration & support</li>
                  </ul>
                </div>
              </div>
              <div className="lg:w-1/2 w-full order-1 lg:order-2">
                <h3 className="hero-title !text-[40px] mb-6">Platform<br/>Administration</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed mb-10">
                  We manage the technical and operational backbone of your trading platform: MetaTrader setup, configuration, and ongoing administration, so your systems run accurately and reliably without internal overhead.
                </p>
                <button className="px-8 py-4 rounded-full border border-teal-400 text-teal-400 font-bold hover:bg-teal-400 hover:text-black transition-colors">Book a Discovery Call</button>
              </div>
            </div>

            {/* Zigzag 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 w-full">
                <h3 className="hero-title !text-[40px] mb-6">Dealing Desk &<br/>Risk Management</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed mb-10">
                  Our dealing desk team monitors exposure, classifies accounts, and manages risk in real time, giving you the operational discipline of an institutional desk without building one in-house.
                </p>
                <button className="px-8 py-4 rounded-full border border-teal-400 text-teal-400 font-bold hover:bg-teal-400 hover:text-black transition-colors">Book a Discovery Call</button>
              </div>
              <div className="lg:w-1/2 w-full relative">
                <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-bl from-black to-white/[0.02] border border-white/10 p-8 flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <ShieldCheck size={48} className="text-teal-400 mb-8" />
                  <ul className="space-y-4 text-white/80 font-light text-lg">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> A-Book / B-Book classification & monitoring</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> Real-time exposure & risk tracking</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> Dynamic leverage & hedge management</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"/> Regular reporting, executive and internal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- AI Marketing Solutions Section --- */}
        <div id="ai-marketing-solutions" className="pt-24 pb-32 border-t border-white/10">
          <div className="mb-20 max-w-3xl">
            <p className="font-mono text-teal-400 mb-6 tracking-widest text-sm uppercase font-semibold flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              AI Marketing Solutions
            </p>
            <h2 className="hero-title !text-[50px] md:!text-[70px] !leading-[0.9] !tracking-tight mb-8">Systems That Find, Engage, and Convert</h2>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
              AI-powered lead generation, automation, and performance marketing, built to bring qualified conversations to your business, around the clock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[2rem]">
              <p className="font-mono text-teal-400 mb-4 text-xs uppercase tracking-widest">Outreach & Automation</p>
              <h3 className="hero-title !text-[32px] mb-4">AI Growth Systems</h3>
              <p className="text-white/60 font-light">Lead generation and AI-powered communication systems that work around the clock to find and engage your audience.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-10 rounded-[2rem]">
              <p className="font-mono text-teal-400 mb-4 text-xs uppercase tracking-widest">Paid & Organic Visibility</p>
              <h3 className="hero-title !text-[32px] mb-4">Performance Marketing</h3>
              <p className="text-white/60 font-light">Targeted advertising and search optimization that put your brand in front of the right audience at the right time.</p>
            </div>
          </div>

          {/* Tree Diagrams using CSS Grids/Flexbox */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 mt-16 pb-8">
            
            {/* Tree 1 */}
            <div className="flex-1 flex flex-col w-full">
              <div className="bg-[#0a0a0a] border border-teal-500/30 text-teal-400 font-bold px-8 py-5 rounded-2xl text-center shadow-[0_0_25px_rgba(35,178,159,0.1)] mb-10 relative z-10 w-full text-xl tracking-wide">
                AI Growth Systems
              </div>
              
              <div className="flex flex-col relative w-full px-4 md:px-10">
                {/* Main vertical line for Tree 1 */}
                <div className="absolute left-[1.5rem] md:left-[3rem] top-[-2.5rem] bottom-16 w-px border-l border-dashed border-teal-500/40" />
                
                {/* Node 1 */}
                <div className="relative flex items-center mb-8 pl-12 md:pl-16">
                  {/* Horizontal line */}
                  <div className="absolute left-[-1rem] md:left-[0.5rem] w-12 md:w-[2.5rem] h-px border-t border-dashed border-teal-500/40" />
                  <div className="w-full bg-[#111] border border-white/10 px-8 py-5 rounded-2xl text-white font-medium shadow-lg hover:border-teal-400/50 transition-colors">
                    Lead Generation System
                  </div>
                </div>

                {/* Node 2 */}
                <div className="relative flex flex-col mb-4 pl-12 md:pl-16">
                  <div className="absolute left-[-1rem] md:left-[0.5rem] w-12 md:w-[2.5rem] top-7 h-px border-t border-dashed border-teal-500/40" />
                  <div className="w-full bg-[#111] border border-teal-500/30 px-8 py-5 rounded-2xl text-white font-medium shadow-[0_0_15px_rgba(35,178,159,0.05)] hover:border-teal-400/70 transition-colors">
                    AI Receptionist
                  </div>
                  
                  {/* Nested sub-nodes container */}
                  <div className="mt-6 flex flex-col relative pl-10 md:pl-14">
                    {/* Nested vertical line */}
                    <div className="absolute left-[-1rem] md:left-[-1rem] top-[-1.5rem] bottom-6 w-px border-l border-dashed border-teal-500/30" />
                    
                    {/* Sub Node A */}
                    <div className="relative flex items-center mb-4 pl-8 md:pl-10">
                      <div className="absolute left-[-1rem] md:left-[0rem] w-8 md:w-[2.5rem] h-px border-t border-dashed border-teal-500/30" />
                      <div className="w-full bg-[#0d0d0d] border border-white/5 px-6 py-4 rounded-xl text-white/80 text-sm hover:text-white transition-colors">
                        Voice Agent
                      </div>
                    </div>
                    
                    {/* Sub Node B */}
                    <div className="relative flex items-center mb-4 pl-8 md:pl-10">
                      <div className="absolute left-[-1rem] md:left-[0rem] w-8 md:w-[2.5rem] h-px border-t border-dashed border-teal-500/30" />
                      <div className="w-full bg-[#0d0d0d] border border-white/5 px-6 py-4 rounded-xl text-white/80 text-sm hover:text-white transition-colors">
                        Chatbot
                      </div>
                    </div>

                    {/* Sub Node C */}
                    <div className="relative flex items-center mb-4 pl-8 md:pl-10">
                      <div className="absolute left-[-1rem] md:left-[0rem] w-8 md:w-[2.5rem] h-px border-t border-dashed border-teal-500/30" />
                      <div className="w-full bg-[#0d0d0d] border border-white/5 px-6 py-4 rounded-xl text-white/80 text-sm hover:text-white transition-colors">
                        WhatsApp Automation, Inbound & Outbound
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tree 2 */}
            <div className="flex-1 flex flex-col w-full">
              <div className="bg-[#0a0a0a] border border-teal-500/30 text-teal-400 font-bold px-8 py-5 rounded-2xl text-center shadow-[0_0_25px_rgba(35,178,159,0.1)] mb-10 relative z-10 w-full text-xl tracking-wide">
                Performance Marketing
              </div>
              
              <div className="flex flex-col relative w-full px-4 md:px-10">
                {/* Main vertical line for Tree 2 */}
                <div className="absolute left-[1.5rem] md:left-[3rem] top-[-2.5rem] bottom-10 w-px border-l border-dashed border-teal-500/40" />
                
                {/* Node 1 */}
                <div className="relative flex items-center mb-8 pl-12 md:pl-16">
                  <div className="absolute left-[-1rem] md:left-[0.5rem] w-12 md:w-[2.5rem] h-px border-t border-dashed border-teal-500/40" />
                  <div className="w-full bg-[#111] border border-white/10 px-8 py-5 rounded-2xl text-white font-medium shadow-lg hover:border-teal-400/50 transition-colors">
                    Meta Ads
                  </div>
                </div>

                {/* Node 2 */}
                <div className="relative flex items-center mb-8 pl-12 md:pl-16">
                  <div className="absolute left-[-1rem] md:left-[0.5rem] w-12 md:w-[2.5rem] h-px border-t border-dashed border-teal-500/40" />
                  <div className="w-full bg-[#111] border border-white/10 px-8 py-5 rounded-2xl text-white font-medium shadow-lg hover:border-teal-400/50 transition-colors">
                    Google Search & Display Ads
                  </div>
                </div>

                {/* Node 3 */}
                <div className="relative flex items-center mb-8 pl-12 md:pl-16">
                  <div className="absolute left-[-1rem] md:left-[0.5rem] w-12 md:w-[2.5rem] h-px border-t border-dashed border-teal-500/40" />
                  <div className="w-full bg-[#111] border border-white/10 px-8 py-5 rounded-2xl text-white font-medium shadow-lg hover:border-teal-400/50 transition-colors">
                    SEO & GEO Optimization
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* --- Why TrevaTech (Radial Hub) --- */}
        <div className="pt-32 pb-32 border-t border-white/10 relative overflow-hidden flex flex-col items-center">
          <h2 className="hero-title !text-center !text-[50px] md:!text-[70px] !leading-[0.9] !tracking-tight mb-24">Why TrevaTech</h2>
          
          <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center mt-10">
            {/* Center Logo Hub */}
            <div className="absolute z-20 w-32 h-32 rounded-full bg-black border border-teal-500/50 shadow-[0_0_40px_rgba(35,178,159,0.3)] flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
              <div className="font-serif text-teal-400 text-3xl font-bold italic">TVT</div>
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
              <div className="absolute top-[5%] left-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl">
                <Crosshair className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Specialist Teams</h4>
                <p className="text-white/60 text-sm font-light">Every service line is run by people with hands-on experience in that exact field.</p>
              </div>
              {/* Top Right */}
              <div className="absolute top-[5%] right-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl">
                <Activity className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">End-to-End Delivery</h4>
                <p className="text-white/60 text-sm font-light">We build, manage, and run the systems, not just advise on them.</p>
              </div>
              {/* Bottom Left */}
              <div className="absolute bottom-[5%] left-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl">
                <BarChart3 className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Outcome-Focused</h4>
                <p className="text-white/60 text-sm font-light">Every system is tracked against real results: leads, conversions, revenue.</p>
              </div>
              {/* Bottom Right */}
              <div className="absolute bottom-[5%] right-[5%] w-64 bg-black/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl">
                <ShieldCheck className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Regulated Built</h4>
                <p className="text-white/60 text-sm font-light">Operations designed to work within real-world compliance and platform constraints.</p>
              </div>
            </div>

            {/* Mobile Fallback for Radial Nodes */}
            <div className="flex flex-col gap-6 md:hidden w-full mt-32 z-10">
              <div className="w-full bg-black/80 border border-white/10 p-6 rounded-2xl">
                <Crosshair className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Specialist Teams</h4>
                <p className="text-white/60 text-sm">Every service line is run by people with hands-on experience in that exact field.</p>
              </div>
              <div className="w-full bg-black/80 border border-white/10 p-6 rounded-2xl">
                <Activity className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">End-to-End Delivery</h4>
                <p className="text-white/60 text-sm">We build, manage, and run the systems, not just advise on them.</p>
              </div>
              <div className="w-full bg-black/80 border border-white/10 p-6 rounded-2xl">
                <BarChart3 className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Outcome-Focused</h4>
                <p className="text-white/60 text-sm">Every system is tracked against real results: leads, conversions, revenue.</p>
              </div>
              <div className="w-full bg-black/80 border border-white/10 p-6 rounded-2xl">
                <ShieldCheck className="text-teal-400 mb-3" size={24} />
                <h4 className="font-bold text-white mb-2">Regulated Built</h4>
                <p className="text-white/60 text-sm">Operations designed to work within real-world compliance and platform constraints.</p>
              </div>
            </div>

          </div>
        </div>

        {/* --- Stats Bar --- */}
        <div className="py-16 border-t border-b border-white/10 mb-32 bg-white/[0.02] rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <h4 className="font-mono text-[60px] text-teal-400 font-bold mb-2">3</h4>
            <p className="text-white/60 uppercase tracking-widest text-sm font-semibold">Active Broker Partnerships</p>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <h4 className="font-mono text-[60px] text-teal-400 font-bold mb-2">6</h4>
            <p className="text-white/60 uppercase tracking-widest text-sm font-semibold">Marketing Clients Served</p>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <h4 className="font-mono text-[60px] text-teal-400 font-bold mb-2">5+</h4>
            <p className="text-white/60 uppercase tracking-widest text-sm font-semibold">Years in Industry</p>
          </div>
        </div>

        {/* --- Testimonials --- */}
        <div className="pb-32">
          <h2 className="hero-title !text-center !text-[50px] md:!text-[70px] !leading-[0.9] !tracking-tight mb-16">What Our Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/60 border border-white/10 p-10 rounded-[2rem] hover:border-teal-400/30 transition-colors">
              <MessageSquare className="text-teal-400/50 mb-6" size={32} />
              <p className="text-white/90 text-lg md:text-xl font-light italic leading-relaxed mb-8">"Their handling of our MT5 infrastructure has been flawless. They know exactly how dealing desks operate, and their risk management rules have saved us immense capital."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center font-bold text-lg">AL</div>
                <div>
                  <p className="text-white font-semibold">Alex L.</p>
                  <p className="text-white/50 text-sm">Head of Dealing, Retail Broker</p>
                </div>
              </div>
            </div>
            <div className="bg-black/60 border border-white/10 p-10 rounded-[2rem] hover:border-teal-400/30 transition-colors">
              <MessageSquare className="text-teal-400/50 mb-6" size={32} />
              <p className="text-white/90 text-lg md:text-xl font-light italic leading-relaxed mb-8">"The AI receptionists completely eliminated our lead leakage over the weekends. The ROI on their marketing systems is the best we've seen in the FX space."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center font-bold text-lg">RM</div>
                <div>
                  <p className="text-white font-semibold">Rachel M.</p>
                  <p className="text-white/50 text-sm">CMO, FX Prop Firm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CTA Section --- */}
        <div className="pb-20 flex flex-col justify-center items-center w-full text-center">
          <div className="bg-black/80 border border-teal-500/30 p-12 md:p-20 rounded-[3rem] w-full max-w-5xl shadow-[0_0_50px_rgba(35,178,159,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-50"></div>
            
            <h1 className="hero-title !text-[50px] md:!text-[80px] !leading-[0.9] !tracking-tight mb-8">Ready to Build Something That Works?</h1>
            <p className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
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
            
            <button className="cta-pulse-btn group relative overflow-hidden rounded-full bg-teal-400 border-none outline-none px-16 py-6 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer mx-auto">
              <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[0%] transition-transform duration-1000 ease-in-out"></div>
              <span className="relative z-10 flex items-center justify-center gap-4 text-black font-[Manrope] font-extrabold text-2xl tracking-wider">
                Book a Call
                <svg className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
