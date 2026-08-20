import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const Hero = () => {
  const heroRef = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      tl.from('.hero-badge', { opacity: 0, y: 20 })
        .from('.hero-headline span', { opacity: 0, y: 80, stagger: 0.1 }, '-=0.5')
        .from('.hero-sub', { opacity: 0, y: 30 }, '-=0.6')
        .from('.hero-cta', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.4')
        .from('.hero-visual', { opacity: 0, scale: 0.95, y: 50 }, '-=0.6');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background putih dengan grid pattern */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
      </div>

      {/* Cutout shape di kiri bawah dengan border hitam tebal */}
      <div className="absolute bottom-0 left-0 w-[30%] h-[130px] bg-white border-4 border-black z-10 rounded-tr-[48px] hidden lg:block">
        <div className="absolute bottom-0 left-full w-[48px] h-[48px] bg-white border-4 border-black border-l-0 border-b-0 [mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))] [-webkit-mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))]" />
        <div className="absolute bottom-full left-0 w-[48px] h-[48px] bg-white border-4 border-black border-r-0 border-t-0 [mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))] [-webkit-mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))]" />
        
        {/* Teks berjalan di area cutout */}
        <div className="absolute inset-0 flex items-center overflow-hidden px-4">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-black font-black text-2xl md:text-3xl lg:text-4xl tracking-widest">
              GWD STUDIO • GWD STUDIO • GWD STUDIO • GWD STUDIO • GWD STUDIO • GWD STUDIO • 
            </span>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="container relative mx-auto px-6 md:px-8 lg:px-12 max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Kolom Kiri - Text Content */}
          <div>
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs uppercase tracking-widest text-gray-600">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {t('hero_available')}
            </div>
            <h1 className="hero-headline mt-8 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.95] tracking-tight">
              <span className="block">{t('hero_we_build')}</span>
              <span className="block">{t('hero_websites')}</span>
              <span className="block text-gray-400">{t('hero_that_people')}</span>
              <span className="block">{t('hero_remember')}</span>
            </h1>
            <p className="hero-sub mt-8 text-lg md:text-xl text-gray-600 max-w-lg">
              {t('hero_subtitle')}
            </p>
            <div className="hero-cta mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition-colors">
                {t('hero_start_project')} <FiArrowRight className="w-4 h-4" />
              </a>
              <a href="#work" className="inline-flex items-center gap-2 border border-gray-300 text-black px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-gray-100 transition-colors">
                {t('hero_view_work')}
              </a>
            </div>
          </div>

          {/* Kolom Kanan - Visual / Preview dengan border hitam tebal */}
          <div className="hero-visual hidden lg:block">
            <div className="bg-white border-4 border-black rounded-xl p-4 shadow-2xl">
              <div className="bg-gray-100 rounded-lg aspect-[16/10] overflow-hidden">
                <iframe
                  src="https://galvinalfito.my.id"
                  title="Website preview"
                  className="w-full h-full"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
              <div className="flex justify-between items-center mt-4 px-2">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                <span className="text-xs text-gray-500">galvinalfito.my.id</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS untuk animasi marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
