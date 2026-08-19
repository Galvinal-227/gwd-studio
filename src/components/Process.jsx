import { useState, useEffect, useRef } from 'react';
import { processSteps } from '../data/process';
import SectionHeader from './SectionHeader';

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.5 }
    );
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <SectionHeader 
          eyebrowKey="process_eyebrow"
          titleKey="process_title"
          descriptionKey="process_description"
        />
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-12 lg:space-y-20">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => (stepRefs.current[index] = el)}
                data-index={index}
                className={`transition-opacity duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-2xl md:text-3xl font-heading font-bold text-gray-300">{step.id}</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold">{step.title}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                    <p className="mt-3 text-sm text-gray-500">Deliverable: {step.deliverable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block relative">
            <div className="sticky top-24 bg-gray-50 p-8 rounded-lg min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl font-heading font-bold">{processSteps[activeStep].id}</span>
                <h4 className="text-2xl font-heading font-semibold mt-4">{processSteps[activeStep].title}</h4>
                <p className="mt-2 text-gray-600">{processSteps[activeStep].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;