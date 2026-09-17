import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const Hero = () => {
  const heroRef = useRef(null);
  const previewRef = useRef(null);
  const { t } = useTranslation();

  const rotatingTexts = [
    t('hero_boring_web_1'),
    t('hero_boring_app_1'),
  ];

  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = rotatingTexts[textIndex];

    if (!isDeleting && displayText.length < currentFullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
      }, 70);
      return () => clearTimeout(timeout);
    }

    // Selesai ngetik → tahan
    if (!isDeleting && displayText.length === currentFullText.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    // Hapus
    if (isDeleting && displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length - 1));
      }, 35);
      return () => clearTimeout(timeout);
    }

    // Selesai hapus → ganti text
    if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }
  }, [displayText, isDeleting, textIndex, rotatingTexts]);

  // ==================== GSAP ANIMATION ====================
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('.hero-editorial-label', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      })

      .from('.hero-headline-line', {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
      }, '-=0.4')

      .from('.hero-sub', {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, '-=0.6')

      .from('.hero-preview-wrapper', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.4,
        ease: 'power4.inOut',
      }, '-=0.5')

      .from('.hero-cta-primary', {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.8')

      .from('.hero-cta-secondary', {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.5')

      .from('.hero-micro-info', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.4')

      .from('.hero-scroll-indicator', {
        opacity: 0,
        y: 10,
        duration: 0.6,
      }, '-=0.3')

      .from('.hero-marquee', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.5');

      gsap.to('.hero-blink-text', {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 2.5,
      });

      const handleMouseMove = (e) => {
        if (!previewRef.current) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        gsap.to(previewRef.current, {
          x: xPercent * 8,
          y: yPercent * 6,
          rotationY: xPercent * 1.2,
          rotationX: -yPercent * 1.2,
          duration: 0.8,
          ease: 'power3.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-white"
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

        <div className="absolute left-[25%] top-0 w-px h-full bg-gray-100 hidden lg:block"></div>
        <div className="absolute left-[50%] top-0 w-px h-full bg-gray-100 hidden lg:block"></div>
        <div className="absolute left-[75%] top-0 w-px h-full bg-gray-100 hidden lg:block"></div>
      </div>

      <div className="container relative mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px] z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-28 lg:pt-24 pb-16 lg:pb-24">

          <div className="lg:col-span-7">
            <div className="hero-editorial-label flex items-center gap-4 mb-6 lg:mb-8">
              <span className="w-8 h-px bg-black"></span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gray-500">
                {t('hero_editorial_label')}
              </span>
              <span className="w-8 h-px bg-gray-300"></span>
            </div>

            <h1 className="hero-headline text-[clamp(2.8rem,6vw,6.5rem)] font-heading font-extrabold leading-[1.05] tracking-tight text-black">

              {/* Baris 1: TYPEWRITER — "Bosen website" ↔ "Bosen aplikasi" */}
              <span className="block overflow-hidden pb-2 -mb-2 min-h-[1.1em]">
                <span className="hero-headline-line block">
                  {displayText}
                  <span className="typewriter-cursor" aria-hidden="true">|</span>
                </span>
              </span>

              {/* Baris 2: STATIS — "biasa-biasa aja?" */}
              <span className="block overflow-hidden pb-2 -mb-2">
                <span className="hero-headline-line block text-gray-400">
                  {t('hero_boring_web_2')}
                </span>
              </span>

              {/* Baris 3: "Sini bikin" — blink */}
              <span className="block overflow-hidden pb-2 -mb-2">
                <span className="hero-headline-line block text-gray-400">
                  <span className="hero-blink-text">{t('hero_that_people')} </span>
                </span>
              </span>

              {/* Baris 4: "yang beda." */}
              <span className="block overflow-hidden pb-2 -mb-2">
                <span className="hero-headline-line block">
                  {t('hero_remember')}
                </span>
              </span>
            </h1>

            <p className="hero-sub mt-6 text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
              {t('hero_subtitle')}
            </p>

            <div className="hero-cta mt-8 hidden md:flex items-center gap-8">
              <a
                href="#contact"
                className="hero-cta-primary group inline-flex items-center gap-3 bg-black text-white px-7 py-3.5 text-sm uppercase tracking-wider font-medium transition-colors hover:bg-gray-800"
              >
                {t('hero_start_project')}
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </a>

              <a
                href="#work"
                className="hero-cta-secondary group inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium text-black relative"
              >
                {t('hero_view_work')}
                <span className="absolute bottom-0 left-0 w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative lg:translate-x-6">
            <div className="hero-micro-info absolute -top-8 -left-2 hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400">
              <span className="text-black font-bold">01</span>
              <span>/</span>
              <span>04</span>
            </div>

            <div
              ref={previewRef}
              className="hero-preview-wrapper relative"
              style={{ perspective: '1000px' }}
            >
              <div className="bg-white border border-black rounded-lg overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  </div>
                  <div className="flex-1 mx-3 bg-white border border-gray-200 rounded-md px-3 py-1 text-[10px] md:text-xs text-gray-500 truncate">
                    galvinalfito.my.id
                  </div>
                </div>

                <div className="bg-gray-100 aspect-[16/10] md:aspect-[16/9]">
                  <iframe
                    src="https://galvinalfito.my.id"
                    title="Website preview"
                    className="w-full h-full"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              </div>
            </div>

            <div className="hero-micro-info mt-3 flex justify-between text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400">
              <span>Design</span>
              <span>Development</span>
              <span>Mobile App</span>
            </div>

            <div className="hero-cta mt-6 flex md:hidden flex-col gap-3">
              <a
                href="#contact"
                className="hero-cta-primary group inline-flex items-center justify-center gap-3 bg-black text-white px-6 py-4 text-sm uppercase tracking-wider font-medium"
              >
                {t('hero_start_project')}
                <FiArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#work"
                className="hero-cta-secondary group inline-flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-medium text-black"
              >
                {t('hero_view_work')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="hero-marquee relative border-t border-b border-gray-200 overflow-hidden py-3 bg-white">
        <div className="hero-marquee-track">
          <div className="hero-marquee-content">
            <span className="text-xl md:text-3xl font-heading font-bold text-black tracking-wider px-6">GWD STUDIO</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-gray-400 tracking-wider px-6">WEB DESIGN</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-black tracking-wider px-6">MOBILE APPS</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-gray-400 tracking-wider px-6">DEVELOPMENT</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
          </div>
          <div className="hero-marquee-content" aria-hidden="true">
            <span className="text-xl md:text-3xl font-heading font-bold text-black tracking-wider px-6">GWD STUDIO</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-gray-400 tracking-wider px-6">WEB DESIGN</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-black tracking-wider px-6">MOBILE APPS</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
            <span className="text-xl md:text-3xl font-heading font-bold text-gray-400 tracking-wider px-6">DEVELOPMENT</span>
            <span className="text-gray-300 text-xl md:text-3xl px-4">—</span>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="hero-scroll-indicator absolute bottom-28 lg:bottom-32 left-6 md:left-12 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
          {t('hero_scroll')}
        </span>
        <FiArrowDown className="w-3 h-3 text-gray-400 animate-bounce" />
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 20s linear infinite;
        }
        .hero-marquee-content {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .typewriter-cursor {
          display: inline-block;
          margin-left: 4px;
          font-weight: 300;
          animation: blinkCursor 0.8s step-end infinite;
          color: black;
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
