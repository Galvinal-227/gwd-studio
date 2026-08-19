import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink, FiTag, FiCode } from 'react-icons/fi';
import { portfolio } from '../data/portfolio';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useTranslation } from '../hooks/useTranslation';

const ProjectDetail = () => {
  const { id } = useParams();
  const { t, lang } = useTranslation();
  const project = portfolio.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold">404</h1>
          <p className="mt-2 text-gray-600">
            {lang === 'id' ? 'Project tidak ditemukan' : 'Project not found'}
          </p>
          <Link 
            to="/" 
            className="mt-4 inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            {lang === 'id' ? 'Kembali ke Home' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  const MockupComponent = project.mockup;

  return (
    <div className="bg-offwhite text-ink min-h-screen">
      <main className="pb-16">
        {/* Back button - Fixed */}
        <div className="fixed top-6 left-6 z-50">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-colors shadow-lg"
          >
            <FiArrowLeft className="w-4 h-4" />
            {lang === 'id' ? 'Kembali' : 'Back'}
          </Link>
        </div>

        {/* Project content */}
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl pt-24 md:pt-28">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs uppercase tracking-widest text-gray-600">
              <FiTag className="w-3 h-3" />
              {project.category}
            </div>
            
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
              {project.title}
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              {project.description}
            </p>
            
            {/* Tech stack */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <FiCode className="w-4 h-4" />
                {lang === 'id' ? 'Teknologi:' : 'Tech:'}
              </span>
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="mt-12 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-[16/9] md:aspect-[16/7]">
              {project.type === 'iframe' && project.url ? (
                <iframe 
                  src={project.url} 
                  title={project.title}
                  className="w-full h-full"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <MockupComponent />
              )}
            </div>
          </div>

          {/* Live link */}
          {project.url && (
            <div className="mt-10 text-center">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {lang === 'id' ? 'Lihat Project Live' : 'View Live Project'}
                <FiExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Next project */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
            <Link 
              to="/" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              {lang === 'id' ? '← Semua Project' : '← All Projects'}
            </Link>
            
            {portfolio[portfolio.indexOf(project) + 1] && (
              <Link 
                to={`/project/${portfolio[portfolio.indexOf(project) + 1].id}`}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {lang === 'id' ? 'Project Berikutnya' : 'Next Project'} →
              </Link>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProjectDetail;