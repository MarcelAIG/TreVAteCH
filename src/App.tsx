import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown, Volume2, VolumeX, Instagram, Facebook, Linkedin, Cpu, MapPin, Phone, Mail } from 'lucide-react';
import Hls from 'hls.js';
import logoImg from '../assets/Artboard 6 copy 4.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const NAV_LINKS = ['Home', 'About', 'Solutions', 'FAQ', 'Contact'];
const HERO_SLIDES = [
  {
    subtitle: '01 // The Foundation',
    title: 'We Build Growth<br />Machines for Brokers',
    description: 'AI-powered systems that find, convert, and retain traders.',
  },
  {
    subtitle: '02 // The Innovation',
    title: 'Next-Gen Trading<br />Infrastructure',
    description: 'Scalable and secure platforms built for modern brokerage demands.',
  },
  {
    subtitle: '03 // The Scale',
    title: 'Global Reach,<br />Local Expertise',
    description: 'Expand your brokerage across borders with targeted precision.',
  }
];
const VIDEO_SRC = 'https://res.cloudinary.com/dn1ejg82q/video/upload/v1/green-digital-dna-helix-with-binary-code-stream-ba-2026-01-28-03-25-11-utc_ljevwg.mp4';
const HERO_VIDEO_SRC = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';
// Temporary placeholder because the .mp3 file is missing from the assets folder.
// Place the .mp3 file in the 'assets' folder and uncomment the line below to restore audio.
// import bgMusic from '../assets/deep-work-music-discipline-consistent-effort-mental-control-steady-work_39Ne05ef.mp3';
const bgMusic = '';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const heroVideoElementRef = useRef<HTMLVideoElement>(null);
  const [framesReady, setFramesReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Parallax tracking
  useEffect(() => {
    // HLS for Hero Video
    if (heroVideoElementRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({ startLevel: 2 });
        hls.loadSource(HERO_VIDEO_SRC);
        hls.attachMedia(heroVideoElementRef.current);
      } else if (heroVideoElementRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        heroVideoElementRef.current.src = HERO_VIDEO_SRC;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!videoBgRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const targetX = ((e.clientX - cx) / cx) * 20;
      const targetY = ((e.clientY - cy) / cy) * 20;

      gsap.to(videoBgRef.current, {
        x: targetX,
        y: targetY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Background Audio Management
  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      const { currentTime, duration } = audioRef.current;
      if (isNaN(duration)) return;

      const fadeDuration = 4;
      const remainingTime = duration - currentTime;

      if (remainingTime <= fadeDuration && remainingTime > 0) {
        audioRef.current.volume = Math.max(0, remainingTime / fadeDuration);
      } else {
        if (audioRef.current.volume !== 1) {
          audioRef.current.volume = 1;
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    const attemptPlay = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log("Autoplay blocked. Waiting for user interaction.");
      }
    };
    attemptPlay();

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  // Frame capture loop
  useEffect(() => {
    setMounted(true);
    let capturing = true;
    let lastTime = -1;
    const MAX_WIDTH = 960;
    const frames: HTMLCanvasElement[] = [];

    const captureFrame = () => {
      if (!capturing || !videoRef.current) return;
      const video = videoRef.current;

      if (video.readyState >= 2 && video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        const scale = Math.min(1, MAX_WIDTH / video.videoWidth) || 1;
        const w = (video.videoWidth * scale) || 960;
        const h = (video.videoHeight * scale) || 540;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, w, h);
          frames.push(canvas);

          // Draw first frame immediately
          if (frames.length === 1 && displayCanvasRef.current) {
            const cvs = displayCanvasRef.current;
            cvs.width = w;
            cvs.height = h;
            const dCtx = cvs.getContext('2d');
            if (dCtx) {
              dCtx.drawImage(canvas, 0, 0);
            }
          }
          if (Number.isFinite(video.duration) && video.duration > 0) {
            const progress = Math.min(100, Math.floor((video.currentTime / video.duration) * 100));
            setLoadingProgress(progress);
          }
        }
      }

      if (capturing) {
        if ('requestVideoFrameCallback' in video) {
          (video as any).requestVideoFrameCallback(captureFrame);
        } else {
          requestAnimationFrame(captureFrame);
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (!videoRef.current) return;
      videoRef.current.playbackRate = 3.0; // Play faster to reduce loading time
      videoRef.current.play().catch(() => { });
      captureFrame();
    };

    const handleEnded = () => {
      capturing = false;
      framesRef.current = frames;
      setLoadingProgress(100);
      setFramesReady(true);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('ended', handleEnded);
      if (video.readyState >= 1) handleLoadedMetadata();
    }

    return () => {
      capturing = false;
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  // Direct, continuous mapping from scroll position to video frame.
  useEffect(() => {
    const handleHeroFade = () => {
      if (heroVideoRef.current) {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        // Fade out between 0 and 90vh
        const opacity = Math.max(0, 1 - (scrollY / (vh * 0.9)));
        heroVideoRef.current.style.opacity = opacity.toString();
        // Move slightly to create a parallax effect as it fades
        const yOffset = scrollY * 0.3;
        heroVideoRef.current.style.transform = `translateY(${yOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleHeroFade, { passive: true });
    handleHeroFade();

    if (!framesReady || framesRef.current.length === 0) return;

    let rafId: number;
    const totalFrames = framesRef.current.length - 1;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Map scroll directly to frame with exactly zero delay or gap.
        const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
        const targetFrame = Math.round(progress * totalFrames);

        const frame = framesRef.current[targetFrame];
        if (frame && displayCanvasRef.current) {
          const cvs = displayCanvasRef.current;
          const ctx = cvs.getContext('2d');
          if (ctx) {
            ctx.drawImage(frame, 0, 0, cvs.width, cvs.height);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize first frame

    return () => {
      window.removeEventListener('scroll', handleHeroFade);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [framesReady]);

  const handleGlobalInteraction = () => {
    if (audioRef.current && audioRef.current.paused && !isMuted) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div 
      className={`min-h-screen bg-black text-white font-[Manrope] overflow-x-hidden relative transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      onPointerDown={handleGlobalInteraction}
      onKeyDown={handleGlobalInteraction}
      onWheel={handleGlobalInteraction}
      onTouchStart={handleGlobalInteraction}
    >

      {/* Video Background Layer */}
      <div ref={videoBgRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none origin-center">
        {!framesReady && (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          />
        )}
        <canvas
          ref={displayCanvasRef}
          className={`w-full h-full object-cover transition-opacity duration-500 origin-center ${framesReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'hue-rotate(55deg)' }}
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
        <div className="liquid-glass flex items-center justify-center rounded px-6 py-2.5">
          <div className="flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="text-sm font-[Manrope] font-light text-white/70 hover:text-white transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Audio Controls */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-[28px] right-[8%] z-50 p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md text-white/80 hover:text-white"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Dynamic Sections Content - Fully Native Scrolling */}
      <div className="relative z-10 w-full pointer-events-none">

        {/* Section 0: Main Hero Component */}
        <div className="min-h-[100vh] flex flex-col justify-center items-start px-[8%] w-full relative">

          {/* Logo positioning - Top left near navbar */}
          <div className="absolute top-[10px] left-[8%] z-50 pointer-events-auto flex items-center">
            <img src={logoImg} alt="Treva Tech" className="h-14 md:h-[60px] w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] object-contain transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(35,178,159,0.5)]" />
          </div>

          {/* Main Hero Background Video */}
          <div
            ref={heroVideoRef}
            className="absolute top-0 left-0 w-full h-[120vh] z-0 pointer-events-none will-change-transform"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 90%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
            <video
              ref={heroVideoElementRef}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover object-center opacity-80 mix-blend-screen"
            />
          </div>

          <div className="pointer-events-auto w-full z-10 relative">
            <style>{`
              .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.5); }
              .swiper-pagination-bullet-active { background: #2dd4bf; }
              .hero-swiper { padding-bottom: 3rem !important; }
              .hero-swiper .swiper-pagination {
                text-align: left !important;
                bottom: 0 !important;
              }
            `}</style>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              grabCursor={true}
              loop={true}
              className="hero-swiper max-w-4xl !mx-0"
            >
              {HERO_SLIDES.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="max-w-2xl text-left">
                    <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase drop-shadow-md">{slide.subtitle}</p>
                    <h1 
                      className="hero-title !text-left !text-[60px] md:!text-[100px] !leading-[0.85] !tracking-tight mb-6 drop-shadow-lg"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                    <p className="font-[Manrope] text-lg font-light text-white/90 drop-shadow-md max-w-lg">{slide.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Section 1: Center Right */}
        <div className="min-h-screen flex flex-col justify-center items-end pr-[8%] w-full text-right">
          <div className="pointer-events-auto max-w-2xl">
            <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase drop-shadow-md">02 // The Advantage</p>
            <h1 className="hero-title !text-right !text-[60px] md:!text-[100px] !leading-[0.85] !tracking-tight mb-6 drop-shadow-lg">Trading<br />Industry DNA</h1>
            <p className="font-[Manrope] text-lg font-light text-white/90 drop-shadow-md">Our team built and ran broker operations before building growth systems. We speak your language IBs, lot volumes, retention funnels, compliance gates.</p>
          </div>
        </div>

        {/* Section 2: Center Left */}
        <div className="min-h-screen flex flex-col justify-center items-start pl-[8%] w-full">
          <div className="pointer-events-auto backdrop-blur-md bg-black/30 border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-2xl shadow-2xl transition-all duration-500 hover:bg-black/40">
            <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase">03 // The Process</p>
            <h1 className="hero-title !text-left !text-[60px] md:!text-[100px] !leading-[0.85] !tracking-tight mb-6">Outcome<br />Obsessed</h1>
            <p className="font-[Manrope] text-lg font-light text-white/80">No vanity metrics. Every system is tracked against FTDs, qualified leads, and revenue. If it does not move the needle, we kill it.</p>
          </div>
        </div>

        {/* Section 3: Bottom Right */}
        <div className="min-h-screen flex flex-col justify-end items-end pb-[25vh] pr-[8%] w-full text-right">
          <div className="pointer-events-auto backdrop-blur-md bg-black/30 border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-2xl shadow-2xl transition-all duration-500 hover:bg-black/40">
            <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase">04 // The Boundary</p>
            <h1 className="hero-title !text-right !text-[60px] md:!text-[100px] !leading-[0.85] !tracking-tight mb-6">Compliance<br />Built In</h1>
            <p className="font-[Manrope] text-lg font-light text-white/80">DFSA, FCA, CySEC, SC Malaysia — we build within the boundaries, not around them. Every campaign, asset, and system is designed for regulated environments.</p>
          </div>
        </div>

        {/* Section 4: Top Left */}
        <div className="min-h-screen flex flex-col justify-start items-start pt-[25vh] pl-[8%] w-full">
          <div className="pointer-events-auto backdrop-blur-md bg-black/30 border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-2xl shadow-2xl transition-all duration-500 hover:bg-black/40">
            <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase">05 // The Engine</p>
            <h1 className="hero-title !text-left !text-[60px] md:!text-[100px] !leading-[0.85] !tracking-tight mb-6">AI Growth<br />Systems</h1>
            <ul className="font-[Manrope] text-lg font-light text-white/80 list-disc list-inside space-y-2">
              <li>Lead gen & automated outreach system</li>
              <li>AI voice agent</li>
              <li>AI chat agent & CRM integration</li>
              <li>AI automated content creation</li>
              <li>AI automated social media</li>
            </ul>
          </div>
        </div>

        {/* Section 5: Center Right */}
        <div className="min-h-screen flex flex-col justify-center items-end pr-[8%] w-full text-right">
          <div className="pointer-events-auto backdrop-blur-md bg-black/30 border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-2xl shadow-2xl transition-all duration-500 hover:bg-black/40">
            <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase">06 // The Strategy</p>
            <h1 className="hero-title !text-right !text-[60px] md:!text-[100px] !leading-[0.85] !tracking-tight mb-6">Performance<br />Marketing</h1>
            <ul className="font-[Manrope] text-lg font-light text-white/80 list-none space-y-2">
              <li>Meta Ads &bull;</li>
              <li>Google Search Ads &bull;</li>
              <li>Google Display Ads &bull;</li>
              <li>SEO & GEO Optimization &bull;</li>
            </ul>
          </div>
        </div>

        {/* Section 6: Center */}
        <div className="min-h-screen flex flex-col justify-center items-center w-full text-center">
          <div className="pointer-events-auto backdrop-blur-md bg-black/30 border border-white/10 p-8 md:p-12 rounded-[2rem] max-w-4xl shadow-2xl transition-all duration-500 hover:bg-black/40">
            <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase">07 // Global Scale</p>
            <h1 className="hero-title !text-[50px] md:!text-[80px] !leading-[0.95] !tracking-tight mb-6">Traders from more than 150<br />countries around the world<br />have registered!</h1>
          </div>
        </div>

        {/* Footer Section */}
        <div className="w-full bg-black/60 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 px-[8%] relative z-20 pointer-events-auto mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
            
            {/* Column 1: Brand & Socials */}
            <div className="flex flex-col group p-6 -ml-6 rounded-[2rem] hover:bg-white/[0.03] transition-all duration-500 border border-transparent hover:border-white/[0.05] cursor-default">
              <img 
                src={logoImg} 
                alt="Treva Tech" 
                className="h-16 md:h-20 w-auto mb-6 object-contain self-start opacity-100 drop-shadow-md transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(35,178,159,0.5)] group-hover:scale-[1.02] origin-left" 
              />
              <p className="font-[Manrope] text-sm text-white/50 leading-relaxed mb-8 max-w-xs group-hover:text-white/70 transition-colors duration-500">
                AI-powered growth systems designed for regulated environments. We build within the boundaries.
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <a href="#" className="group/social w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-[0_0_20px_rgba(35,178,159,0.3)] transition-all duration-500 hover:scale-[1.05]">
                  <Linkedin size={20} className="transition-transform duration-500" />
                </a>
                <a href="#" className="group/social w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-[0_0_20px_rgba(35,178,159,0.3)] transition-all duration-500 hover:scale-[1.05]">
                  <Instagram size={20} className="transition-transform duration-500" />
                </a>
                <a href="#" className="group/social w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-[0_0_20px_rgba(35,178,159,0.3)] transition-all duration-500 hover:scale-[1.05]">
                  <Facebook size={20} className="transition-transform duration-500" />
                </a>
              </div>
            </div>

            {/* Column 2: UK Office */}
            <div className="flex flex-col">
              <h3 className="font-mono text-teal-400 text-xs tracking-widest uppercase mb-6 flex items-center gap-2 mt-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                UK Headquarters
              </h3>
              <div className="flex items-start gap-4 text-white/50 mb-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:border-teal-400/30 hover:bg-white/[0.05] transition-all duration-500 group hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default">
                <div className="w-10 h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <MapPin size={18} className="text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <div className="flex flex-col">
                  <p className="font-[Manrope] text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                    71-75 Shelton Street,<br />
                    Covent Garden, London,<br />
                    WC2H 9JQ, United Kingdom
                  </p>
                  <p className="font-[Manrope] text-xs text-white/40 mt-3 group-hover:text-white/60 transition-colors duration-500">
                    Reg. Number: 16605222
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Oman Office */}
            <div className="flex flex-col">
              <h3 className="font-mono text-teal-400 text-xs tracking-widest uppercase mb-6 flex items-center gap-2 mt-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                Oman Office
              </h3>
              <div className="flex items-start gap-4 text-white/50 mb-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:border-teal-400/30 hover:bg-white/[0.05] transition-all duration-500 group hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default">
                <div className="w-10 h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <MapPin size={18} className="text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <p className="font-[Manrope] text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500 mt-1">
                  McDonald’s building, P floor,<br />
                  Al Mouj St, 138,<br />
                  Muscat, Oman
                </p>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="flex flex-col">
              <h3 className="font-mono text-teal-400 text-xs tracking-widest uppercase mb-6 flex items-center gap-2 mt-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                Contact Us
              </h3>
              <a href="tel:+447457409190" className="flex items-center gap-4 text-white/50 hover:text-white transition-all duration-500 mb-4 font-[Manrope] text-sm group bg-white/[0.02] hover:bg-white/[0.05] p-4 rounded-2xl border border-white/[0.03] hover:border-teal-400/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-[1.02] cursor-pointer">
                <div className="w-10 h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <Phone size={18} className="text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <span className="font-medium tracking-wide">+44 7457 409190</span>
              </a>
              <a href="mailto:info@trevatech.com" className="flex items-center gap-4 text-white/50 hover:text-white transition-all duration-500 font-[Manrope] text-sm group bg-white/[0.02] hover:bg-white/[0.05] p-4 rounded-2xl border border-white/[0.03] hover:border-teal-400/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-[1.02] cursor-pointer">
                <div className="w-10 h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <Mail size={18} className="text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <span className="font-medium tracking-wide">info@trevatech.com</span>
              </a>
            </div>

          </div>

          <div className="max-w-7xl mx-auto w-full h-[1px] bg-white/10 mt-12 mb-8" />
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-[Manrope] text-white/40">
            <p>&copy; {new Date().getFullYear()} Treva Tech. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 transition-all duration-1000 delay-300 ${framesReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button className="group relative bg-white text-black text-sm font-[Manrope] font-medium rounded px-6 py-3 overflow-hidden active:scale-[0.97] transition-all duration-200 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03]">
          <span className="relative z-10">Let's talk</span>
          <span className="absolute inset-0 bg-gradient-to-b from-white to-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
        <button className="liquid-glass group text-white text-sm font-[Manrope] font-medium rounded px-6 py-3 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_2px_rgba(255,255,255,0.07)]">
          Strategic marketing
        </button>
      </div>

      {/* Global Loading Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${framesReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
          
          {/* Tech/Intelligence Icon Animation */}
          <div className="relative mb-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border border-teal-500/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
            <Cpu size={48} className="text-teal-400 drop-shadow-[0_0_15px_rgba(35,178,159,0.8)] relative z-10 animate-pulse" />
          </div>

          <div className="font-mono text-5xl text-white font-light tracking-widest mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            {loadingProgress}<span className="text-xl text-white/40 ml-1">%</span>
          </div>

          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-teal-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(35,178,159,0.8)]" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <p className="mt-6 text-xs font-[Manrope] text-teal-400/80 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(35,178,159,0.5)]">Initializing Systems</p>
        </div>
      </div>
    </div>
  );
}
