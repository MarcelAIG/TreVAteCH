import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown, Volume2, VolumeX, Instagram, Facebook, Linkedin, Cpu, MapPin, Phone, Mail } from 'lucide-react';
import Hls from 'hls.js';
import logoImg from '../assets/Artboard 6 copy 4.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Solutions from './Solutions';
import About from './About';
import FAQ from './FAQ';
import Contact from './Contact';


const NAV_LINKS = ['Home', 'About', 'Solutions', 'FAQ', 'Contact'];
const HERO_SLIDES = [
  {
    subtitle: '01 // THE ENGINE',
    title: 'AI-Powered Lead<br />Generation',
    description: 'We find, qualify, and engage your ideal clients, automatically.',
    ctaText: 'Explore Lead Generation →',
    targetPage: 'Solutions',
    hash: '#ai-marketing-solutions'
  },
  {
    subtitle: '02 // THE ALWAYS-ON',
    title: 'AI Voice, Chat & WhatsApp<br />Automation',
    description: 'Round-the-clock conversations, bookings, and support, handled by AI.',
    ctaText: 'See AI Automation →',
    targetPage: 'Solutions',
    hash: '#ai-marketing-solutions'
  },
  {
    subtitle: '03 // THE INFRASTRUCTURE',
    title: 'Dealing Desk & Risk,<br />Done Right',
    description: 'Platform administration and risk operations built for brokers and prop firms.',
    ctaText: 'View Broker Solutions →',
    targetPage: 'Solutions',
    hash: '#broker-infrastructure'
  },
  {
    subtitle: '04 // THE PARTNER',
    title: 'Two Disciplines.<br />One Standard.',
    description: 'AI growth systems and financial operations, built by specialists, run to an institutional standard.',
    ctaText: 'Start a Conversation →',
    targetPage: 'Contact',
    hash: ''
  }
];
const VIDEO_SRC = 'https://res.cloudinary.com/dn1ejg82q/video/upload/v1/green-digital-dna-helix-with-binary-code-stream-ba-2026-01-28-03-25-11-utc_ljevwg.mp4';
const HERO_VIDEO_SRC = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';
const TESTIMONIALS = [
  { quote: "Treva Tech completely transformed our lead generation pipeline. The AI voice agent alone doubled our conversion rates within the first month. They truly understand the brokerage space.", name: "Michael Jordan", title: "CEO, Global Markets FX", initials: "MJ" },
  { quote: "The compliance-first approach gave us the confidence to scale across borders. Best growth partners we've worked with. Outstanding.", name: "Sarah Jenkins", title: "CMO, Prime Trading", initials: "SJ" },
  { quote: "Our FTDs skyrocketed by 150% in quarter one. Their AI systems are lightyears ahead of traditional agencies.", name: "David Chen", title: "Director, Apex Brokers", initials: "DC" },
  { quote: "Finally, an agency that understands the nuances of IB networks and lot volume requirements. Exceptional results.", name: "Elena Rostova", title: "Head of Growth, Vertex FX", initials: "ER" },
  { quote: "The automated content creation saves us hundreds of hours a month while keeping engagement at all-time highs.", name: "Marcus Wright", title: "Founder, Alpha Capital", initials: "MW" }
];
import bgMusic from '../assets/deep-work-music-discipline-consistent-effort-mental-control-steady-work_HaYFwfbh.mp3';

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
  const [currentPage, setCurrentPage] = useState('Home');

  const handleSlideAction = (targetPage: string, hash: string) => {
    setCurrentPage(targetPage);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      videoRef.current.playbackRate = 1.5; // Capture at lower speed for much smoother frames
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
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (darkOverlayRef.current) {
        darkOverlayRef.current.style.opacity = '0'; // Lightens up when scrolling
      }
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (darkOverlayRef.current) {
          darkOverlayRef.current.style.opacity = '0.85'; // Very dark when idle
        }
      }, 50);

      if (heroVideoRef.current) {
        // Fade out between 0 and 90vh
        const opacity = Math.max(0, 1 - (scrollY / (vh * 0.9)));
        heroVideoRef.current.style.opacity = opacity.toString();
        // Move slightly to create a parallax effect as it fades
        const yOffset = scrollY * 0.3;
        heroVideoRef.current.style.transform = `translateY(${yOffset}px)`;
      }

      if (videoBgRef.current) {
        // Keep the scrolling video completely hidden in the initial Hero section.
        // It remains at 0 opacity until 80vh scroll, then fades in fully by 100vh.
        const bgOpacity = Math.min(1, Math.max(0, (scrollY - vh * 0.8) / (vh * 0.2)));
        videoBgRef.current.style.opacity = bgOpacity.toString();
      }
    };

    window.addEventListener('scroll', handleHeroFade, { passive: true });
    handleHeroFade();

    if (!framesReady || framesRef.current.length === 0) return;

    let rafId: number;
    const len = framesRef.current.length;
    let currentRenderFrame = 0;

    const renderLoop = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      // Map scroll directly to the exact frame timeline (0 to len - 1)
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const targetFrame = progress * (len - 1);
      
      // Initialize currentRenderFrame on first run
      if (currentRenderFrame === 0 && targetFrame > 0) {
        currentRenderFrame = targetFrame;
      }

      // Calculate distance to target
      const diff = targetFrame - currentRenderFrame;

      // Smooth lerp (interpolation) or snap if very close (to prevent micro-vibrations)
      if (Math.abs(diff) < 0.05) {
        currentRenderFrame = targetFrame;
      } else {
        currentRenderFrame += diff * 0.08; // slightly faster ease for responsive scroll
      }

      // Round to nearest whole frame to avoid fractional stutter
      const actualFrame = Math.round(currentRenderFrame);
      const safeFrame = Math.max(0, Math.min(actualFrame, len - 1)); // Strict bounds

      const frame = framesRef.current[safeFrame];
      if (frame && displayCanvasRef.current) {
        const cvs = displayCanvasRef.current;
        const ctx = cvs.getContext('2d');
        if (ctx) {
          ctx.drawImage(frame, 0, 0, cvs.width, cvs.height);
        }
      }
      
      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleHeroFade);
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
      <div className={currentPage === 'Home' ? 'block' : 'hidden'}>
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
          <div ref={darkOverlayRef} className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 ease-in-out opacity-0" />
        </div>
      </div>

      {/* Nav */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
        <div className="liquid-glass flex items-center justify-center rounded px-6 py-2.5">
          <div className="flex items-center gap-5 pointer-events-auto">
            {NAV_LINKS.map((link) => (
              <a 
                key={link} 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage(link); }}
                className={`text-sm font-[Manrope] transition-colors duration-200 ${currentPage === link ? 'text-teal-400 font-medium' : 'font-light text-white/70 hover:text-white'}`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Top Right Actions */}
      <div className="fixed top-20 md:top-4 right-[4%] md:right-[8%] z-50 flex items-center gap-2 md:gap-4 pointer-events-auto origin-top-right">
        <div className="relative flex items-center justify-center group">
          {/* Smooth modern green breathing aura */}
          <div className="absolute -inset-1 bg-teal-400/40 rounded-full blur-md animate-pulse" style={{ animationDuration: '3s' }}></div>
          
          <button 
            onClick={() => {
              setCurrentPage('Contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group/btn relative bg-white text-black text-[10px] md:text-sm font-[Manrope] font-semibold rounded-full px-4 py-1.5 md:px-6 md:py-2.5 overflow-hidden active:scale-[0.97] transition-all duration-500 shadow-[0_0_15px_rgba(45,212,191,0.4)] hover:shadow-[0_0_30px_rgba(45,212,191,0.8)] hover:scale-[1.03]"
          >
            <span className="relative z-10 flex items-center gap-1 md:gap-2">Let's talk</span>
            <span className="absolute inset-0 bg-gradient-to-b from-white to-teal-50/80 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 md:p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md text-white/80 hover:text-white shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          {isMuted ? <VolumeX size={14} className="md:w-[18px] md:h-[18px]" /> : <Volume2 size={14} className="md:w-[18px] md:h-[18px]" />}
        </button>
      </div>

      {/* Dynamic Sections Content - Fully Native Scrolling */}
      <div className="relative z-10 w-full pointer-events-none">

        <div className={currentPage === 'Home' ? 'block' : 'hidden'}>
          {/* Section 0: Main Hero Component */}
          <div className="min-h-[100vh] flex flex-col justify-center items-start px-[8%] w-full relative pt-[15vh]">

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
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10 w-1/2" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
            <video
              ref={heroVideoElementRef}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover object-right opacity-80 mix-blend-screen"
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
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: false }}
              observer={true}
              observeParents={true}
              grabCursor={true}
              loop={true}
              className="hero-swiper w-full max-w-5xl !mx-0"
            >
              {HERO_SLIDES.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="max-w-4xl text-left flex flex-col items-start">
                    <p className="font-mono text-teal-400 mb-4 tracking-widest text-xs uppercase drop-shadow-md">{slide.subtitle}</p>
                    <h1 
                      className="hero-title !text-left !text-[60px] md:!text-[85px] !leading-[0.9] !tracking-tight mb-6 drop-shadow-lg"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                    <p className="font-[Manrope] text-lg font-light text-white/90 drop-shadow-md max-w-lg mb-10">{slide.description}</p>
                    
                    <button 
                      onClick={() => handleSlideAction(slide.targetPage, slide.hash)}
                      className="group relative text-teal-400 text-lg font-[Manrope] font-semibold flex items-center gap-2 active:scale-[0.97] transition-all duration-500 hover:text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.4)] hover:drop-shadow-[0_0_20px_rgba(45,212,191,0.8)]"
                    >
                      <span>{slide.ctaText.replace('→', '')}</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-500 text-teal-400 drop-shadow-[0_0_12px_rgba(45,212,191,0.6)]">→</span>
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Section 1: Center Right */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-end px-[5%] md:pr-[8%] md:pl-0 w-full text-center md:text-right">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase drop-shadow-md">02 // The Advantage</p>
            <h1 className="hero-title !text-center md:!text-right !text-[36px] md:!text-[70px] !leading-[1.1] md:!leading-[0.85] !tracking-tight mb-4 md:mb-6 drop-shadow-lg">Built by Specialists,<br />Not Generalists</h1>
            <p className="font-[Manrope] text-sm md:text-xl font-light text-white/90 drop-shadow-md">Our teams have run broker operations and built growth systems from the inside. We speak both languages: lot volumes and retention funnels, lead funnels and conversion data.</p>
          </div>
        </div>

        {/* Section 2: Center Left */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-start px-[5%] md:pl-[8%] md:pr-0 w-full text-center md:text-left">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center items-center md:items-start">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase">03 // THE PROCESS</p>
            <h1 className="hero-title !text-center md:!text-left !text-[40px] md:!text-[85px] !leading-[1.1] md:!leading-[0.85] !tracking-tight mb-4 md:mb-6">Outcome<br />Obsessed</h1>
            <p className="font-[Manrope] text-sm md:text-xl font-light text-white/80">No vanity metrics. Every system is tracked against real outcomes: qualified leads, conversions, and revenue. What does not perform gets rebuilt or removed.</p>
          </div>
        </div>

        {/* Section 3: Bottom Right */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-end px-[5%] md:pr-[8%] md:pl-0 w-full text-center md:text-right">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center items-center md:items-end">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase">04 // The Boundary</p>
            <h1 className="hero-title !text-center md:!text-right !text-[40px] md:!text-[85px] !leading-[1.1] md:!leading-[0.85] !tracking-tight mb-4 md:mb-6">Compliance<br />Built In</h1>
            <p className="font-[Manrope] text-sm md:text-xl font-light text-white/80">DFSA, FCA, CySEC, SC Malaysia — we build within the boundaries, not around them. Every campaign, asset, and system is designed for regulated environments.</p>
          </div>
        </div>

        {/* Section 4: Top Left */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-start px-[5%] md:pl-[8%] md:pr-0 w-full text-center md:text-left">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center items-center md:items-start">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase">05 // THE ENGINE</p>
            <h1 className="hero-title !text-center md:!text-left !text-[40px] md:!text-[85px] !leading-[1.1] md:!leading-[0.85] !tracking-tight mb-4 md:mb-6">AI Growth<br />Systems</h1>
            <ul className="font-[Manrope] text-sm md:text-xl font-light text-white/80 space-y-2 md:space-y-3 w-full text-left">
              <li>• AI lead gen & automated outreach</li>
              <li>• AI receptionist & WhatsApp</li>
              <li>• Automated social media mgmt</li>
            </ul>
          </div>
        </div>

        {/* Section 5: Center Right */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-end px-[5%] md:pr-[8%] md:pl-0 w-full text-center md:text-right">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center items-center md:items-end">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase">06 // THE STRATEGY</p>
            <h1 className="hero-title !text-center md:!text-right !text-[40px] md:!text-[85px] !leading-[1.1] md:!leading-[0.85] !tracking-tight mb-4 md:mb-6">Performance<br />Marketing</h1>
            <ul className="font-[Manrope] text-sm md:text-xl font-light text-white/80 list-none space-y-2 md:space-y-3 w-full text-left md:text-right">
              <li><span className="hidden md:inline">Meta Ads &bull;</span><span className="md:hidden">&bull; Meta Ads</span></li>
              <li><span className="hidden md:inline">Google Search & Display Ads &bull;</span><span className="md:hidden">&bull; Google Search & Display</span></li>
              <li><span className="hidden md:inline">SEO & GEO Optimization &bull;</span><span className="md:hidden">&bull; SEO & GEO Optimization</span></li>
            </ul>
          </div>
        </div>

        {/* Section 6: Center -> Left */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-start px-[5%] md:pl-[8%] md:pr-0 w-full text-center md:text-left">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center items-center md:items-start">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase">07 // THE INFRASTRUCTURE</p>
            <h1 className="hero-title !text-center md:!text-left !text-[34px] md:!text-[70px] !leading-[1.1] md:!leading-[0.85] !tracking-tight mb-4 md:mb-6">Operations Built for<br />Regulated Brokers</h1>
            <p className="font-[Manrope] text-sm md:text-xl font-light text-white/80">Platform administration, dealing desk operations, and risk management for brokers and prop firms, built within regulatory and platform boundaries from day one.</p>
          </div>
        </div>

        {/* Section 7: Center -> Right */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-end px-[5%] md:pr-[8%] md:pl-0 w-full text-center md:text-right">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center items-center md:items-end">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase">08 // THE CONVERGENCE</p>
            <h1 className="hero-title !text-center md:!text-right !text-[32px] md:!text-[65px] !leading-[1.1] md:!leading-[0.85] !tracking-tight mb-4 md:mb-6">From the First Conversation<br className="hidden md:block"/>to the Last Trade</h1>
            <p className="font-[Manrope] text-sm md:text-xl font-light text-white/80">TrevaTech builds the systems that move businesses and brokers forward, growth on one side, infrastructure on the other.</p>
          </div>
        </div>

        {/* Section 8: Testimonials -> Left */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center md:items-start px-[5%] md:pl-[8%] md:pr-0 w-full text-center md:text-left">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-6 md:p-14 rounded-[2rem] w-full max-w-[340px] md:max-w-none md:w-[700px] min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center relative overflow-hidden items-center md:items-start">
            <p className="font-mono text-teal-400 mb-2 md:mb-4 tracking-widest text-[10px] md:text-xs uppercase">09 // What Our Partners Say</p>
            
            <style>{`
              .testimonial-swiper { padding-bottom: 2rem !important; }
              @media (min-width: 768px) { .testimonial-swiper { padding-bottom: 3rem !important; } }
              .testimonial-swiper .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.3); }
              .testimonial-swiper .swiper-pagination-bullet-active { background: #2dd4bf; }
              .testimonial-swiper .swiper-pagination { text-align: center !important; bottom: 0 !important; left: 0 !important; width: 100% !important; }
              @media (min-width: 768px) { .testimonial-swiper .swiper-pagination { text-align: left !important; } }
            `}</style>

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              grabCursor={true}
              loop={true}
              className="testimonial-swiper w-full !mx-0"
            >
              {TESTIMONIALS.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col h-full text-center md:text-left items-center md:items-start">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-teal-400/50 mb-4 md:mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                    <p className="font-[Manrope] text-sm md:text-2xl font-light text-white/90 italic leading-relaxed mb-6 md:mb-8">"{t.quote}"</p>
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 mt-auto">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-black font-bold text-sm md:text-xl shadow-[0_0_15px_rgba(35,178,159,0.5)]">{t.initials}</div>
                      <div className="text-center md:text-left">
                        <p className="text-white font-medium text-sm md:text-lg">{t.name}</p>
                        <p className="text-teal-400/80 text-xs md:text-sm tracking-wide">{t.title}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Section 10: CTA -> Center */}
        <div className="py-[10vh] md:py-[15vh] flex flex-col justify-center items-center w-full text-center px-[5%] md:px-[8%]">
          <div className="pointer-events-auto backdrop-blur-md bg-black/80 border border-white/10 p-8 md:p-16 rounded-[2rem] w-full max-w-[340px] md:max-w-4xl min-h-[auto] md:min-h-[450px] shadow-2xl transition-all duration-500 hover:bg-black/90 hover:border-teal-400/30 hover:shadow-[inset_0_0_100px_rgba(45,212,191,0.15),0_0_40px_rgba(45,212,191,0.2)] flex flex-col justify-center items-center relative overflow-hidden">
            <p className="font-mono text-teal-400 mb-4 md:mb-6 tracking-widest text-[10px] md:text-sm uppercase font-semibold">10 // Ready to scale?</p>
            <h1 className="hero-title !text-center !text-[32px] md:!text-[75px] !leading-[1.1] md:!leading-[0.9] !tracking-tight mb-4 md:mb-8">Ready to Build Something<br className="hidden md:block"/>That Works?</h1>
            <p className="font-[Manrope] text-sm md:text-2xl font-light text-white/80 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">Whether you're scaling outreach or running a trading desk, let's talk about what TrevaTech can build for you.</p>
            
            <style>{`
              @keyframes ultra-pulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(45, 212, 191, 0.3); }
                50% { transform: scale(1.05); box-shadow: 0 0 70px rgba(45, 212, 191, 0.7); }
              }
              .ultra-pulse-btn {
                animation: ultra-pulse 3s ease-in-out infinite;
              }
            `}</style>
            
            <button 
              onClick={() => {
                setCurrentPage('Contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="ultra-pulse-btn group relative overflow-hidden rounded-full bg-teal-400 border-none outline-none px-10 py-4 md:px-16 md:py-6 transition-all duration-300 hover:brightness-110 active:scale-95 cursor-pointer"
            >
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 text-black font-[Manrope] font-bold text-lg md:text-2xl tracking-wide flex items-center gap-3 md:gap-4">
                Book a Call 
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl md:text-3xl">→</span>
              </span>
            </button>
          </div>
        </div>
        </div>

        {currentPage === 'Solutions' && (
          <div className="pointer-events-auto w-full relative z-20">
            <Solutions />
          </div>
        )}

        {currentPage === 'About' && (
          <div className="pointer-events-auto w-full relative z-20">
            <About setCurrentPage={setCurrentPage} />
          </div>
        )}

        {currentPage === 'FAQ' && (
          <div className="pointer-events-auto w-full relative z-20">
            <FAQ setCurrentPage={setCurrentPage} />
          </div>
        )}

        {currentPage === 'Contact' && (
          <div className="pointer-events-auto w-full relative z-20">
            <Contact setCurrentPage={setCurrentPage} />
          </div>
        )}

        {/* Footer Section */}
        <div className="w-full bg-black/95 backdrop-blur-xl border-t border-white/10 pt-10 pb-6 md:pt-16 md:pb-8 px-[5%] md:px-[8%] relative z-20 pointer-events-auto mt-10 md:mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 text-left">
            
            {/* Column 1: Brand & Socials */}
            <div className="flex flex-col group p-0 md:p-6 md:-ml-6 rounded-[2rem] hover:bg-white/[0.03] transition-all duration-500 border border-transparent hover:border-white/[0.05] cursor-default mb-4 md:mb-0">
              <img 
                src={logoImg} 
                alt="Treva Tech" 
                className="h-10 md:h-20 w-auto mb-4 md:mb-6 object-contain self-start opacity-100 drop-shadow-md transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(35,178,159,0.5)] group-hover:scale-[1.02] origin-left" 
              />
              <p className="font-[Manrope] text-xs md:text-sm text-white/50 leading-relaxed mb-6 md:mb-8 max-w-xs group-hover:text-white/70 transition-colors duration-500">
                AI-powered growth systems designed for regulated environments. We build within the boundaries.
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <a href="#" className="group/social w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-[0_0_20px_rgba(35,178,159,0.3)] transition-all duration-500 hover:scale-[1.05]">
                  <Linkedin size={16} className="md:w-5 md:h-5 transition-transform duration-500" />
                </a>
                <a href="#" className="group/social w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-[0_0_20px_rgba(35,178,159,0.3)] transition-all duration-500 hover:scale-[1.05]">
                  <Instagram size={16} className="md:w-5 md:h-5 transition-transform duration-500" />
                </a>
                <a href="#" className="group/social w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-[0_0_20px_rgba(35,178,159,0.3)] transition-all duration-500 hover:scale-[1.05]">
                  <Facebook size={16} className="md:w-5 md:h-5 transition-transform duration-500" />
                </a>
              </div>
            </div>

            {/* Column 2: UK Office */}
            <div className="flex flex-col">
              <h3 className="font-mono text-teal-400 text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-6 flex items-center gap-2 mt-2 md:mt-6">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-teal-400 animate-pulse"></span>
                UK Headquarters
              </h3>
              <div className="flex items-start gap-3 md:gap-4 text-white/50 mb-2 md:mb-4 p-3 md:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:border-teal-400/30 hover:bg-white/[0.05] transition-all duration-500 group hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <MapPin size={14} className="md:w-[18px] md:h-[18px] text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <div className="flex flex-col">
                  <p className="font-[Manrope] text-xs md:text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                    71-75 Shelton Street,<br />
                    Covent Garden, London,<br />
                    WC2H 9JQ, United Kingdom
                  </p>
                  <p className="font-[Manrope] text-[10px] md:text-xs text-white/40 mt-1 md:mt-3 group-hover:text-white/60 transition-colors duration-500">
                    Reg. Number: 16605222
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Oman Office */}
            <div className="flex flex-col">
              <h3 className="font-mono text-teal-400 text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-6 flex items-center gap-2 mt-2 md:mt-6">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-teal-400 animate-pulse"></span>
                Oman Office
              </h3>
              <div className="flex items-start gap-3 md:gap-4 text-white/50 mb-2 md:mb-4 p-3 md:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:border-teal-400/30 hover:bg-white/[0.05] transition-all duration-500 group hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <MapPin size={14} className="md:w-[18px] md:h-[18px] text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <p className="font-[Manrope] text-xs md:text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500 mt-0 md:mt-1">
                  McDonald’s building, P floor,<br />
                  Al Mouj St, 138,<br />
                  Muscat, Oman
                </p>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="flex flex-col">
              <h3 className="font-mono text-teal-400 text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-6 flex items-center gap-2 mt-2 md:mt-6">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-teal-400 animate-pulse"></span>
                Contact Us
              </h3>
              <a href="https://wa.me/447457409190" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 text-white/50 hover:text-white transition-all duration-500 mb-2 md:mb-4 font-[Manrope] text-xs md:text-sm group bg-white/[0.02] hover:bg-white/[0.05] p-3 md:p-4 rounded-2xl border border-white/[0.03] hover:border-teal-400/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-[1.02] cursor-pointer">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <Phone size={14} className="md:w-[18px] md:h-[18px] text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <span className="font-medium tracking-wide">+44 7457 409190</span>
              </a>
              <a href="mailto:info@trevatech.com" className="flex items-center gap-3 md:gap-4 text-white/50 hover:text-white transition-all duration-500 font-[Manrope] text-xs md:text-sm group bg-white/[0.02] hover:bg-white/[0.05] p-3 md:p-4 rounded-2xl border border-white/[0.03] hover:border-teal-400/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-[1.02] cursor-pointer">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-teal-400/20 transition-colors duration-500 border border-white/[0.05] group-hover:border-teal-400/30">
                  <Mail size={14} className="md:w-[18px] md:h-[18px] text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <span className="font-medium tracking-wide">info@trevatech.com</span>
              </a>
            </div>

          </div>

          <div className="max-w-7xl mx-auto w-full h-[1px] bg-white/10 mt-8 md:mt-12 mb-6 md:mb-8" />
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[10px] md:text-xs font-[Manrope] text-white/40">
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Treva Tech. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

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
