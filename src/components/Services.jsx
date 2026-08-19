import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const listRef = useRef(null);

  useLayoutEffect(() => {
    const rows = listRef.current.querySelectorAll('.service-row');
    gsap.fromTo(rows,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: listRef.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section id="services" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <SectionHeader 
        eyebrowKey="services_eyebrow"
        titleKey="services_title"
        descriptionKey="services_description"
        />
        <div ref={listRef} className="mt-16 border-t border-gray-200">
          {services.map((service) => (
            <div key={service.id} className="service-row group border-b border-gray-200 py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:bg-gray-50 transition-colors duration-300 px-4 md:px-6 -mx-4 md:-mx-6">
              <span className="text-sm font-mono text-gray-400 md:w-16">{service.id}</span>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-heading font-semibold group-hover:translate-x-2 transition-transform">{service.title}</h3>
                <p className="mt-2 text-gray-600 max-w-2xl">{service.description}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-black group-hover:translate-x-2 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;