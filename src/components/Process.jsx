import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/process';
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line
      gsap.from('.process-progress-fill', {
        height: '0%',
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.process-list',
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        }
      });

      // Step reveal
      gsap.from('.process-step', {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.process-list', start: 'top 75%' }
      });

      // Set active step berdasarkan scroll - per step
      processSteps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: `.process-step-${index}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px]">
        <SectionHeader 
          eyebrowKey="process_eyebrow"
          titleKey="process_title"
          descriptionKey="process_description"
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Steps */}
          <div className="process-list relative pl-8 lg:pl-12">
            {/* Vertical progress line */}
            <div className="absolute left-0 top-0 w-px h-full bg-gray-200">
              <div className="process-progress-fill w-full bg-black" style={{ height: '0%' }}></div>
            </div>

            <div className="space-y-32 lg:space-y-40">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`process-step process-step-${index} relative transition-all duration-700 ${activeStep === index ? 'opacity-100' : 'opacity-30'}`}
                >
                  {/* Dot indicator */}
                  <div className={`absolute -left-[41px] lg:-left-[57px] top-2 w-3 h-3 rounded-full border-2 transition-colors duration-500 ${activeStep === index ? 'bg-black border-black scale-125' : 'bg-white border-gray-300'}`}></div>
                  
                  <span className="text-sm font-mono text-gray-400">{step.id}</span>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mt-2">
                    {t(`process_${step.title.toLowerCase()}`) || step.title}
                  </h3>
                  <p className="mt-3 text-gray-600 max-w-md leading-relaxed">
                    {t(`process_${step.title.toLowerCase()}_desc`) || step.description}
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    {t('process_deliverable')}: {step.deliverable}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Sticky visual */}
          <div className="hidden lg:block relative">
            <div className="sticky top-24 bg-gray-50 border border-gray-200 rounded-lg p-8 min-h-[350px] flex items-center justify-center">
              <div className="text-center">
                <span className="text-7xl font-heading font-bold text-gray-200">
                  {processSteps[activeStep]?.id || '01'}
                </span>
                <h4 className="text-2xl font-heading font-semibold mt-4">
                  {t(`process_${processSteps[activeStep]?.title?.toLowerCase()}`) || processSteps[activeStep]?.title}
                </h4>
                <p className="mt-2 text-gray-600 max-w-sm leading-relaxed">
                  {t(`process_${processSteps[activeStep]?.title?.toLowerCase()}_desc`) || processSteps[activeStep]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
