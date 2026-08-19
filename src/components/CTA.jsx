import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMessageCircle, FiMail } from 'react-icons/fi';
import { contactInfo } from '../data/contact';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    gsap.fromTo(el.querySelectorAll('[data-animate]'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: 'top 75%' }
      }
    );
  }, []);

  const whatsappUrl = `https://wa.me/${(contactInfo.whatsapp || '6281234567890').replace(/\D/g, '')}?text=${encodeURIComponent('Halo, saya punya project website yang ingin didiskusikan.')}`;

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 lg:py-40 bg-offwhite border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl text-center">
        <h2 data-animate className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight">
          Have an idea?
          <br />
          Let's build it.
        </h2>
        <p data-animate className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto">
          Konsultasikan project kamu sekarang. Gratis, tanpa komitmen. Saya bantu estimasi biaya dan timeline.
        </p>
        <div data-animate className="mt-12 flex flex-wrap justify-center gap-4">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <FiMessageCircle className="w-4 h-4" />
            Chat via WhatsApp
          </a>
          <a 
            href={`mailto:${contactInfo.email}?subject=Project Inquiry`}
            className="inline-flex items-center gap-2 border border-gray-300 text-black px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <FiMail className="w-4 h-4" />
            Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;