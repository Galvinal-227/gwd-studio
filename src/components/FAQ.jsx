import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { faqs } from '../data/faq';
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // Auto-open first item

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-4xl">
        <SectionHeader 
          eyebrowKey="faq_eyebrow"
          titleKey="faq_title"
          descriptionKey="faq_description"
          align="center"
        />
        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`border-b border-gray-200 ${openIndex === index ? 'bg-gray-50' : ''} transition-colors`}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-6 text-left group px-4"
                aria-expanded={openIndex === index}
              >
                <span className={`text-lg md:text-xl font-medium ${openIndex === index ? 'text-black' : 'text-gray-700'} group-hover:text-black transition-colors`}>
                  {faq.question}
                </span>
                <span className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <FiMinus className="w-5 h-5 text-black" />
                  ) : (
                    <FiPlus className="w-5 h-5 text-gray-400 group-hover:text-black" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 px-4 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;