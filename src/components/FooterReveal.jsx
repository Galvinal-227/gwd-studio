import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FooterReveal = () => {
  const sectionRef = useRef(null);
  const typographyRef = useRef(null);
  const metaRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Tanpa animasi untuk user yang prefer reduced motion
      gsap.set(typographyRef.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(metaRef.current, { opacity: 1 });
      gsap.set(lineRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Typography muncul dari balik footer
      tl.fromTo(typographyRef.current,
        {
          yPercent: 45,
          opacity: 0,
          scale: 0.92,
          clipPath: 'inset(0 0 85% 0)',
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0 0 0% 0)',
          ease: 'power3.out',
          duration: 1.8,
        },
        0
      );

      // Metadata muncul lebih lambat
      tl.fromTo(metaRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 1.2,
        },
        0.6
      );

      // Garis horizontal melebar
      tl.fromTo(lineRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          ease: 'power3.inOut',
          duration: 1.5,
        },
        0.3
      );

      // Parallax subtle - typography bergerak lebih lambat dari scroll
      gsap.to(typographyRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="footer-reveal-layer bg-[#0A0A0A] relative overflow-hidden"
      style={{ height: '55vh' }}
    >
      {/* Thin borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>

      {/* Vertical guides sangat subtle */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/5 hidden md:block"></div>
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block"></div>
      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/5 hidden md:block"></div>

      {/* Typography utama */}
      <div
        ref={typographyRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h2
          className="font-heading font-bold text-white select-none whitespace-nowrap leading-none tracking-tight"
          style={{ fontSize: 'clamp(5rem, 18vw, 20rem)' }}
        >
          GWD<span className="text-white/30">.</span>
        </h2>
      </div>

      {/* Garis horizontal */}
      <div
        ref={lineRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 md:w-40 h-px bg-white/20"
        style={{ transformOrigin: 'center' }}
      ></div>

      {/* Metadata */}
      <div
        ref={metaRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center"
      >
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 whitespace-nowrap">
          GWD Studio — Web Development
        </p>
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">
          Nganjuk · Indonesia · 2026
        </p>
      </div>
    </div>
  );
};

export default FooterReveal;
