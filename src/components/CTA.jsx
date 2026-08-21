import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMessageCircle, FiMail } from 'react-icons/fi';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const ref = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current;
      gsap.fromTo(el.querySelectorAll('[data-animate]'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.15,
          scrollTrigger: { trigger: el, start: 'top 75%' }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const whatsappUrl = `https://wa.me/${(contactInfo.whatsapp || '6285801003353').replace(/\D/g, '')}?text=${encodeURIComponent('Halo, saya punya project website yang ingin didiskusikan.')}`;

  return (
    <section ref={ref} id="cta" className="py-24 md:py-32 lg:py-40 bg-black text-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px] text-center">
        <h2 data-animate className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight leading-[1.05]">
          {t('cta_have_idea')}
          <br />
          <span className="text-gray-500">{t('cta_lets_build')}</span>
        </h2>
        <p data-animate className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          {t('cta_subtitle')}
        </p>
        <div data-animate className="mt-12 flex flex-wrap justify-center gap-4">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <FiMessageCircle className="w-4 h-4" />
            {t('cta_whatsapp')}
          </a>
          <a 
            href={`mailto:${contactInfo.email}?subject=Project Inquiry`}
            className="inline-flex items-center gap-2 border border-gray-600 text-white px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <FiMail className="w-4 h-4" />
            {t('cta_email')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
