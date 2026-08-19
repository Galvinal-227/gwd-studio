import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const SectionHeader = ({ eyebrowKey, titleKey, descriptionKey, align = 'left' }) => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-animate]');
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <div ref={ref} className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrowKey && <p data-animate className="text-sm uppercase tracking-widest text-gray-500 mb-4">{t(eyebrowKey)}</p>}
      <h2 data-animate className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight">{t(titleKey)}</h2>
      {descriptionKey && <p data-animate className="mt-6 text-lg text-gray-600">{t(descriptionKey)}</p>}
    </div>
  );
};

export default SectionHeader;