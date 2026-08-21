import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Zap, Globe, ShoppingCart, Code2, PenTool, Wrench } from 'lucide-react';
import { services } from '../data/services';
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const { t } = useTranslation();

  const icons = [Zap, Globe, ShoppingCart, Code2, PenTool, Wrench];

  const serviceTitleKeys = [
    'service_landing_title',
    'service_company_title',
    'service_ecommerce_title',
    'service_webapp_title',
    'service_maintenance_title',
  ];

  const serviceDescKeys = [
    'service_landing_desc',
    'service_company_desc',
    'service_ecommerce_desc',
    'service_webapp_desc',
    'service_maintenance_desc',
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const rows = listRef.current.querySelectorAll('.service-row');

      gsap.fromTo(rows,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 75%' }
        }
      );

      // Progress bar kiri
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=60%',
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.services-progress-bar', {
            height: `${progress * 100}%`,
            duration: 0.05,
            ease: 'none'
          });
        }
      });

      // Hover interaction
      rows.forEach((row) => {
        const title = row.querySelector('.service-row-title');
        const arrow = row.querySelector('.service-row-arrow');
        const line = row.querySelector('.service-row-line');

        row.addEventListener('mouseenter', () => {
          gsap.to(title, { x: 16, duration: 0.4, ease: 'power3.out' });
          gsap.to(arrow, { x: 4, y: -4, duration: 0.4, ease: 'power3.out' });
          gsap.to(line, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' });
        });

        row.addEventListener('mouseleave', () => {
          gsap.to(title, { x: 0, duration: 0.4, ease: 'power3.out' });
          gsap.to(arrow, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' });
          gsap.to(line, { scaleX: 0, duration: 0.5, ease: 'power3.inOut' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32 lg:py-40 bg-white">
      {/* Progress bar kiri */}
      <div className="absolute left-0 top-0 w-[2px] h-full bg-gray-100 hidden lg:block">
        <div className="services-progress-bar w-full bg-black" style={{ height: '0%' }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px]">
        <SectionHeader
          eyebrowKey="services_eyebrow"
          titleKey="services_title"
          descriptionKey="services_description"
        />

        <div ref={listRef} className="mt-16 border-t border-gray-200">
          {services.map((service, index) => {
            const IconComponent = icons[index] || Code2;

            return (
              <div
                key={service.id}
                className="service-row group relative border-b border-gray-200 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start cursor-pointer hover:bg-gray-50 transition-colors duration-300 px-2 md:px-4 -mx-2 md:-mx-4"
              >
                {/* Nomor */}
                <div className="md:col-span-1">
                  <span className="text-sm font-mono text-gray-400">{service.id}</span>
                </div>

                {/* Title & Description */}
                <div className="md:col-span-6">
                  <h3 className="service-row-title text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-[1.05]">
                    {t(serviceTitleKeys[index]) || service.title}
                  </h3>
                  <p className="mt-3 text-gray-600 max-w-lg leading-relaxed text-sm md:text-base">
                    {t(serviceDescKeys[index]) || service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="md:col-span-3 hidden md:flex flex-col gap-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">
                  {service.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Icon + Arrow */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                  <IconComponent className="w-5 h-5 text-gray-400 hidden md:block" />
                  <div className="service-row-arrow w-10 h-10 border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Active line */}
                <div className="service-row-line absolute bottom-0 left-0 w-full h-[2px] bg-black origin-left scale-x-0" />
              </div>
            );
          })}
        </div>

        {/* Mobile features */}
        <div className="md:hidden mt-8 space-y-6">
          {services.map((service) => (
            <div key={service.id} className="flex flex-wrap gap-2">
              {service.features.slice(0, 3).map((feature) => (
                <span key={feature} className="text-[10px] uppercase tracking-wider text-gray-500 border border-gray-200 px-3 py-1.5">
                  {feature}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
