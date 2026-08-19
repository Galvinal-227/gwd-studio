import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../data/stats';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const TrustSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const items = sectionRef.current.querySelectorAll('.stat-item');
    
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    // Counter animation
    items.forEach((item) => {
      const valueEl = item.querySelector('.stat-value');
      const targetValue = parseInt(valueEl.dataset.value);
      
      if (targetValue) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: targetValue,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%' },
          onUpdate: () => {
            valueEl.textContent = Math.round(counter.value) + '+';
          },
        });
      }
    });
  }, []);

  const statLabels = {
    'Projects Completed': 'trust_projects',
    'Years Experience': 'trust_years',
    'Technologies Mastered': 'trust_tech',
    'Custom Design': 'trust_custom',
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white border-y border-gray-200">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <p className="text-center text-sm uppercase tracking-widest text-gray-500 mb-10">
          Trusted by projects, brands & ideas
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div 
                className="stat-value text-4xl md:text-5xl font-heading font-bold" 
                data-value={parseInt(stat.value)}
              >
                0+
              </div>
              <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;