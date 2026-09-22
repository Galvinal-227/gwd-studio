import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGlobe, FiCpu, FiArrowUpRight } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';
import AIChatbot from './AIChatbot';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_work'), href: '#work' },
    { label: t('nav_services'), href: '#services' },
    { label: t('nav_pricing'), href: '#pricing' },
    { label: t('nav_about'), href: '#about' },
  ];

  return (
    <>
      {/* ===== DESKTOP NAVBAR - TOP (Belum Scroll) ===== */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'}`}>
        <div className="container mx-auto px-8 lg:px-12 max-w-[1400px]">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="text-xl font-heading font-bold tracking-tight">
              GWD<span className="text-gray-400">.</span>
            </a>

            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium bg-black text-white px-5 py-2.5 uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                {t('nav_lets_talk')}
                <FiArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== DESKTOP SIDEBAR (Setelah Scroll) - FIXED AT TOP ===== */}
      <div
        className={`hidden md:block fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}
      >
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-xl px-4 py-2 flex items-center gap-3">
          <a href="#" className="text-sm font-heading font-bold tracking-tight px-1">
            GWD<span className="text-gray-400">.</span>
          </a>

          <div className="h-6 w-px bg-gray-200"></div>

          <div className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium text-gray-500 hover:text-black hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200"></div>

          <button
            onClick={() => setIsAIOpen(!isAIOpen)}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="AI Chat"
          >
            <FiCpu className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button
            onClick={toggleLang}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle language"
          >
            <FiGlobe className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <a
            href="#contact"
            className="bg-black text-white px-3 py-2 rounded-md text-[9px] uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            {t('nav_lets_talk')}
          </a>
        </div>
      </div>

      {/* ===== MOBILE NAVBAR ===== */}
      <nav className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'}`}>
        <div className="container mx-auto px-5">
          <div className="relative flex justify-between items-center h-14">
            <button
              className="p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>

            <a
              href="#"
              className="absolute left-1/2 -translate-x-1/2 text-lg font-heading font-bold tracking-tight"
            >
              GWD<span className="text-gray-400">.</span>
            </a>

            <button
              onClick={() => setIsAIOpen(true)}
              className="p-2 -mr-2"
              aria-label="AI Chat"
            >
              <FiCpu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="bg-white border-t border-gray-200">
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between py-3 text-base text-gray-700 hover:text-black border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  <FiArrowUpRight className="w-4 h-4 text-gray-400" />
                </a>
              ))}

              <button
                onClick={toggleLang}
                className="flex items-center justify-between py-3 text-base text-gray-700 hover:text-black w-full border-b border-gray-100"
              >
                <span className="flex items-center gap-2">
                  <FiGlobe className="w-4 h-4" />
                  {lang === 'id' ? 'English' : 'Indonesia'}
                </span>
                <span className="text-xs text-gray-400">{lang === 'id' ? 'EN' : 'ID'}</span>
              </button>

              <a
                href="#contact"
                className="mt-4 flex items-center justify-center gap-2 bg-black text-white px-5 py-4 uppercase tracking-wider text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav_lets_talk')}
                <FiArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      <AIChatbot isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  );
};

export default Navbar;
