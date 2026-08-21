import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCheck, FiMessageCircle, FiMail } from 'react-icons/fi';
import { services } from '../data/pricing';
import SectionHeader from './SectionHeader';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const cardsRef = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.querySelectorAll('.pricing-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      );
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = (service) => {
    const phoneNumber = contactInfo.whatsapp || contactInfo.phone || '6285801003353';
    const message = `Halo, saya tertarik dengan layanan ${service.title}.\n\nBisa info lebih lanjut tentang estimasi biaya dan proses pengerjaannya?`;
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmail = (service) => {
    const subject = `Inquiry: ${service.title}`;
    const body = `Halo, saya tertarik dengan layanan ${service.title}.\n\nBerikut kebutuhan saya:\n- ...\n\nMohon info estimasi biaya dan timeline pengerjaannya. Terima kasih.`;
    const url = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40 bg-offwhite">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px]">
        <SectionHeader 
          eyebrowKey="pricing_eyebrow"
          titleKey="pricing_title"
          descriptionKey="pricing_description"
        />

        {/* Info banner */}
        <div className="mt-10 bg-black text-white rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400">{t('pricing_free_consultation')}</p>
            <p className="text-lg font-semibold mt-1">{t('pricing_consultation_text')}</p>
          </div>
          <a
            href={`https://wa.me/${(contactInfo.whatsapp || '6285801003353').replace(/\D/g, '')}?text=${encodeURIComponent('Halo, saya ingin konsultasi tentang project website.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            <FiMessageCircle className="w-4 h-4" />
            {t('pricing_chat_now')}
          </a>
        </div>

        {/* Services list */}
        <div ref={cardsRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="pricing-card bg-white border border-gray-200 rounded-lg p-8 flex flex-col hover:border-black transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-mono text-gray-400">{service.id}</span>
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                  {service.timeline}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-heading font-semibold group-hover:translate-x-1 transition-transform">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{service.description}</p>
              
              <ul className="mt-6 space-y-3 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-700">
                    <FiCheck className="w-4 h-4 text-black flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
                <button
                  onClick={() => handleWhatsApp(service)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <FiMessageCircle className="w-4 h-4" />
                  {t('pricing_tanya_wa')}
                </button>
                <button
                  onClick={() => handleEmail(service)}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <FiMail className="w-4 h-4" />
                  {t('pricing_email')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            {t('pricing_note')}{' '}
            <a 
              href={`https://wa.me/${(contactInfo.whatsapp || '6285801003353').replace(/\D/g, '')}?text=${encodeURIComponent('Halo, saya bingung pilih layanan yang cocok. Bisa bantu?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black font-medium"
            >
              {t('pricing_chat_me')}
            </a>
            , {t('pricing_recommend')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
