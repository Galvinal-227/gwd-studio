import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FiCode, FiCpu, FiDatabase, FiGlobe, FiSmartphone, FiZap } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const TechMarquee = () => {
  const marqueeRef = useRef(null);

  const technologies = [
    { icon: FiCode, name: 'React' },
    { icon: FiZap, name: 'Next.js' },
    { icon: FiCpu, name: 'Vite' },
    { icon: FiGlobe, name: 'Tailwind CSS' },
    { icon: FiDatabase, name: 'MongoDB' },
    { icon: FiSmartphone, name: 'TypeScript' },
    { icon: FiCode, name: 'GSAP' },
    { icon: FiZap, name: 'Framer Motion' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={marqueeRef} className="py-6 bg-black overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap">
        {[...technologies, ...technologies].map((tech, index) => (
          <span key={index} className="mx-8 flex items-center gap-3 text-white/70 hover:text-white transition-colors">
            <tech.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tech.name}</span>
            <span className="ml-8 w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;