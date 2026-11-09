import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiArrowUpRight } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const FAQ_ITEMS = [
  { q: 'faq_q1', a: 'faq_a1' },
  { q: 'faq_q2', a: 'faq_a2' },
  { q: 'faq_q3', a: 'faq_a3' },
  { q: 'faq_q4', a: 'faq_a4' },
  { q: 'faq_q5', a: 'faq_a5' },
  { q: 'faq_q6', a: 'faq_a6' },
];

const EASE = [0.4, 0, 0.2, 1];

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  // Uses the dedicated CTA key when it exists in the translation files,
  // otherwise falls back to a label so a raw key is never rendered.
  const rawCtaLabel = t('faq_cta');
  const ctaLabel =
    !rawCtaLabel || rawCtaLabel === 'faq_cta' ? 'Start a project' : rawCtaLabel;

  return (
    <section id="faq" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          {/* ---------- Left: editorial header ---------- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-neutral-300" aria-hidden="true" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                {t('faq_eyebrow')}
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-black md:text-5xl lg:text-[3.5rem]">
              {t('faq_title')}
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 md:text-lg">
              {t('faq_description')}
            </p>

            <div className="mt-10">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-black py-3 pl-6 pr-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                {ctaLabel}
                <FiArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* ---------- Right: accordion ---------- */}
          <div className="lg:col-span-7">
            <div className="border-t border-neutral-200">
              {FAQ_ITEMS.map((faq, index) => {
                const isOpen = openIndex === index;
                const number = String(index + 1).padStart(2, '0');

                return (
                  <div key={faq.q} className="border-b border-neutral-200">
                    <div
                      className={`-mx-3 rounded-2xl px-3 transition-colors duration-300 md:-mx-4 md:px-4 ${
                        isOpen ? 'bg-neutral-50' : 'bg-transparent'
                      }`}
                    >
                      <h3>
                        <button
                          type="button"
                          id={`faq-trigger-${index}`}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${index}`}
                          onClick={() => toggle(index)}
                          className="group flex w-full items-start gap-4 rounded-xl py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-4 md:gap-5 md:py-7"
                        >
                          <span
                            className={`mt-1 w-7 shrink-0 text-[11px] font-medium tabular-nums tracking-[0.14em] transition-colors duration-300 ${
                              isOpen
                                ? 'text-black'
                                : 'text-neutral-400 group-hover:text-neutral-600'
                            }`}
                            aria-hidden="true"
                          >
                            {number}
                          </span>

                          <span
                            className={`flex-1 text-base font-medium leading-snug transition-colors duration-300 md:text-lg ${
                              isOpen
                                ? 'text-black'
                                : 'text-neutral-800 group-hover:text-black'
                            }`}
                          >
                            {t(faq.q)}
                          </span>

                          <span
                            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                              isOpen
                                ? 'border-black bg-black text-white'
                                : 'border-neutral-200 text-neutral-500 group-hover:border-neutral-400 group-hover:text-black'
                            }`}
                            aria-hidden="true"
                          >
                            <motion.span
                              className="absolute inset-0 flex items-center justify-center"
                              animate={{
                                opacity: isOpen ? 0 : 1,
                                rotate: isOpen ? 90 : 0,
                              }}
                              transition={{ duration: 0.25, ease: EASE }}
                            >
                              <FiPlus className="h-4 w-4" />
                            </motion.span>
                            <motion.span
                              className="absolute inset-0 flex items-center justify-center"
                              animate={{
                                opacity: isOpen ? 1 : 0,
                                rotate: isOpen ? 0 : -90,
                              }}
                              transition={{ duration: 0.25, ease: EASE }}
                            >
                              <FiMinus className="h-4 w-4" />
                            </motion.span>
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            id={`faq-panel-${index}`}
                            role="region"
                            aria-labelledby={`faq-trigger-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.35, ease: EASE },
                              opacity: { duration: 0.25, ease: 'easeOut' },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pb-7 pl-11 pr-12 text-sm leading-relaxed text-neutral-600 md:pl-12 md:pr-16 md:text-[15px]">
                              {t(faq.a)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;