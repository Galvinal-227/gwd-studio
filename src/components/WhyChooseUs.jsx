import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSmartphone, FiZap, FiSearch, FiCode } from 'react-icons/fi';
import { FaPallet, FaWrench } from "react-icons/fa";
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: FaPallet, titleKey: 'why_custom_design', descKey: 'why_custom_design_desc' },
  { icon: FiSmartphone, titleKey: 'why_responsive', descKey: 'why_responsive_desc' },
  { icon: FiZap, titleKey: 'why_fast', descKey: 'why_fast_desc' },
  { icon: FiSearch, titleKey: 'why_seo', descKey: 'why_seo_desc' },
  { icon: FiCode, titleKey: 'why_modern', descKey: 'why_modern_desc' },
  { icon: FaWrench, titleKey: 'why_maintenance', descKey: 'why_maintenance_desc' },
];

const WhyChooseUs = () => {
  const gridRef = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current.querySelectorAll('.feature-item');
      gsap.fromTo(items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px]">
        <SectionHeader 
          eyebrowKey="why_eyebrow"
          titleKey="why_title"
          descriptionKey="why_description"
        />
        <div ref={gridRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature) => (
            <div key={feature.titleKey} className="feature-item flex flex-col">
              <feature.icon className="w-8 h-8 text-black mb-4" />
              <h3 className="text-xl md:text-2xl font-heading font-semibold">{t(feature.titleKey)}</h3>
              <p className="mt-2 text-gray-600">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
