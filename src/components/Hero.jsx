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
      {/* Background dengan efek gelap dan gradien */}
      <div className="absolute inset-0 bg-[#050b1a]">
        {/* Radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(30,90,255,0.25)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(10,150,250,0.15)_0%,transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(100,50,255,0.10)_0%,transparent_40%)]" />
      </div>

      {/* Background PNG - ganti src dengan path gambar Anda */}
      <img 
        src="/path/to/your/background-image.png" 
        alt="Background"
        className="absolute top-[12%] left-0 w-full pointer-events-none z-1 opacity-50 hidden lg:block"
        style={{ objectFit: 'contain' }}
      />

      {/* Cutout shape di kiri bawah */}
      <div className="absolute bottom-0 left-0 w-[30%] h-[130px] bg-white z-10 rounded-tr-[48px] lg:block hidden">
        <div className="absolute bottom-0 left-full w-[48px] h-[48px] bg-white [mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))] [-webkit-mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))]" />
        <div className="absolute bottom-full left-0 w-[48px] h-[48px] bg-white [mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))] [-webkit-mask-image:radial-gradient(circle_at_100%_0%,transparent_48px,black_calc(48px+0.5px))]" />
      </div>

      {/* Container */}
      <div className="container relative mx-auto px-6 md:px-8 lg:px-12 max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Kolom Kiri - Text Content */}
          <div className="text-center lg:text-left pb-0 lg:pb-16">
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs uppercase tracking-widest text-white/50">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {t('hero_available')}
            </div>
            <h1 className="hero-headline mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] tracking-tight text-white">
              <span className="block font-normal">{t('hero_we_build')}</span>
              <span className="block">
                <span className="bg-gradient-to-r from-[#f7971e] to-[#ffd200] bg-clip-text text-transparent">
                  {t('hero_websites')}
                </span>
              </span>
              <span className="block font-normal text-white/70">{t('hero_that_people')}</span>
              <span className="block font-normal">{t('hero_remember')}</span>
            </h1>
            <p className="hero-sub mt-6 text-base md:text-lg text-white/50 max-w-lg mx-auto lg:mx-0">
              {t('hero_subtitle')}
            </p>
            <div className="hero-cta mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#contact" className="inline-flex items-center gap-2 bg-white text-[#050b1a] px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-white/90 transition-colors rounded-full">
                {t('hero_start_project')} <FiArrowRight className="w-4 h-4" />
              </a>
              <a href="#work" className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-white/10 transition-colors rounded-full">
                {t('hero_view_work')}
              </a>
            </div>
          </div>

          {/* Kolom Tengah - Visual / Preview */}
          <div className="hero-visual w-full max-w-[560px] mx-auto lg:mx-0">
            <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[20px] p-4 shadow-2xl">
              <div className="bg-gray-800/50 rounded-lg aspect-[16/10] overflow-hidden">
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
                <span className="text-xs text-white/50">galvinalfito.my.id</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Stats */}
          <div className="text-center lg:text-right max-w-[280px] mx-auto lg:mx-0 lg:justify-self-end pb-0 lg:pb-10">
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4">
              {t('hero_stats_text') || 'Koleksi eksklusif dengan desain modern dan kualitas terbaik.'}
            </p>
            <div>
              <div className="text-4xl md:text-5xl font-light text-white leading-none">
                500+
              </div>
              <div className="text-white/70 font-semibold text-sm md:text-base mt-1">
                {t('hero_stats_label') || 'Produk Tersedia'}
              </div>
            </div>
            <div className="w-10 h-[2px] bg-gradient-to-r from-[#f7971e] to-[#ffd200] rounded mx-auto lg:ml-auto mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
