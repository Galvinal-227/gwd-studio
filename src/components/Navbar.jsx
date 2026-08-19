import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGlobe, FiCpu } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';
import AIChatbot from './AIChatbot';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { t, lang, toggleLang } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_work'), href: '#work' },
    { label: t('nav_services'), href: '#services' },
    { label: t('nav_process'), href: '#process' },
    { label: t('nav_pricing'), href: '#pricing' },
    { label: t('nav_about'), href: '#about' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-offwhite/90 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="#" className="text-xl font-heading font-bold tracking-tight">GWD<span className="text-gray-400">.</span></a>
            
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
              {/* AI Chat Button */}
              <button
                onClick={() => setIsAIOpen(!isAIOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                aria-label="AI Chat"
              >
                <FiCpu className="w-4 h-4" />
                AI
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                aria-label="Toggle language"
              >
                <FiGlobe className="w-4 h-4" />
                {lang === 'id' ? 'ID' : 'EN'}
              </button>

              <a 
                href="#contact" 
                className="text-sm font-medium bg-black text-white px-5 py-2.5 uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                {t('nav_lets_talk')}
              </a>
            </div>

            <button 
              className="md:hidden p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="block py-2 text-base text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsAIOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2 text-base text-gray-700 hover:text-black w-full text-left"
              >
                <FiCpu className="w-4 h-4" />
                AI Assistant
              </button>
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 py-2 text-base text-gray-700 hover:text-black w-full text-left"
              >
                <FiGlobe className="w-4 h-4" />
                {lang === 'id' ? '🇬🇧 English' : '🇮🇩 Indonesia'}
              </button>
              <a 
                href="#contact" 
                className="block mt-4 text-center bg-black text-white px-5 py-3 uppercase tracking-wider text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav_lets_talk')}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* AI Chatbot */}
      <AIChatbot isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  );
};

export default Navbar;