import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import { portfolio } from '../data/portfolio';
import SectionHeader from './SectionHeader';
import PortfolioModal from './PortfolioModal';
import { useTranslation } from '../hooks/useTranslation';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const gridRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const { t, lang } = useTranslation();

  const categories = ['All', ...new Set(portfolio.map(p => p.category))];
  const filteredProjects = activeFilter === 'All' 
    ? portfolio 
    : portfolio.filter(p => p.category === activeFilter);

  useLayoutEffect(() => {
    const items = gridRef.current.querySelectorAll('.project-item');
    gsap.fromTo(items,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%' }
      }
    );
  }, [activeFilter]);

  const renderProjectVisual = (project) => {
    if (project.type === 'iframe' && project.url) {
      return (
        <iframe
          src={project.url}
          title={project.title}
          className="w-full h-full pointer-events-none"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      );
    }
    const MockupComponent = project.mockup;
    return <MockupComponent />;
  };

  return (
    <section id="work" className="py-24 md:py-32 lg:py-40 bg-offwhite">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <SectionHeader 
          eyebrowKey="portfolio_eyebrow"
          titleKey="portfolio_title"
          descriptionKey="portfolio_description"
        />

        {/* Filter buttons */}
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-item group ${project.large ? 'md:col-span-2' : ''}`}
            >
              {/* Visual */}
              <Link
                to={`/project/${project.id}`}
                className="block relative overflow-hidden rounded-lg bg-white border border-gray-200 aspect-[16/10] md:aspect-[16/8] cursor-pointer"
              >
                <div className="absolute inset-0">
                  {renderProjectVisual(project)}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-white/80 uppercase tracking-wider">{project.category}</p>
                      <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white mt-1">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* View Detail */}
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiExternalLink className="w-4 h-4 text-white" />
                      </span>
                      <FiArrowUpRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Tech tags & Quick action */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 border border-gray-300 rounded-full text-gray-600">{tech}</span>
                ))}
                
                {/* Quick view button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="ml-auto text-xs text-gray-500 hover:text-black underline transition-colors"
                >
                  {lang === 'id' ? 'Quick view' : 'Quick view'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Portfolio;