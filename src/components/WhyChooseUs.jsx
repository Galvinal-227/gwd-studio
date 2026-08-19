import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Smartphone, Zap, Search, Code, Wrench } from 'lucide-react';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Palette, title: 'Custom Design', description: 'Every pixel crafted to reflect your brand identity.' },
  { icon: Smartphone, title: 'Responsive', description: 'Flawless experience on any device, any screen size.' },
  { icon: Zap, title: 'Fast Performance', description: 'Optimized for speed to keep visitors engaged.' },
  { icon: Search, title: 'SEO Friendly', description: 'Built with best practices to rank higher in search.' },
  { icon: Code, title: 'Modern Technology', description: 'Using the latest frameworks and tools for scalability.' },
  { icon: Wrench, title: 'Easy Maintenance', description: 'Clean code and documentation for hassle-free updates.' },
];

const WhyChooseUs = () => {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const items = gridRef.current.querySelectorAll('.feature-item');
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <SectionHeader 
          eyebrow="why_eyebrow"
          title="why_title"
          description="why_description"
        />
        <div ref={gridRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature) => (
            <div key={feature.title} className="feature-item flex flex-col">
              <feature.icon className="w-8 h-8 text-black mb-4" />
              <h3 className="text-xl md:text-2xl font-heading font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;