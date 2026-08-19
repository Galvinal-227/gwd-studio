import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { testimonials } from '../data/testimonials';
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }
      }
    );
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-offwhite">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <SectionHeader 
          eyebrowKey="testimonials_eyebrow"
          titleKey="testimonials_title"
          descriptionKey="testimonials_description"
        />
        
        <div ref={containerRef} className="mt-16 relative">
          {/* Testimonial Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 max-w-3xl mx-auto text-center relative">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              "{current.quote}"
            </p>
            
            <div className="mt-8">
              <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-500">
                  {current.author.charAt(0)}
                </span>
              </div>
              <p className="font-semibold text-gray-800">{current.author}</p>
              <p className="text-sm text-gray-500">{current.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-black w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;