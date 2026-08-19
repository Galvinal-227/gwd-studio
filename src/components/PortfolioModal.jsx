import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const PortfolioModal = ({ project, onClose }) => {
  const { t, lang } = useTranslation();
  
  if (!project) return null;

  const renderProjectVisual = () => {
    if (project.type === 'iframe' && project.url) {
      return (
        <iframe
          src={project.url}
          title={project.title}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
        />
      );
    }
    const MockupComponent = project.mockup;
    return <MockupComponent />;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
          
          <div className="aspect-[16/9] bg-gray-50 overflow-hidden border-b border-gray-200">
            {renderProjectVisual()}
          </div>
          
          <div className="p-6 md:p-8">
            <h3 className="text-3xl font-heading font-bold">{project.title}</h3>
            <p className="mt-2 text-gray-600">{project.description}</p>
            
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <span className="text-sm text-gray-500 uppercase tracking-wider">{project.category}</span>
              <div className="flex gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700">{tech}</span>
                ))}
              </div>
              
              <div className="ml-auto flex gap-3">
                {project.url && (
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm underline hover:text-gray-600"
                  >
                    {lang === 'id' ? 'Live' : 'Live'}
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link
                  to={`/project/${project.id}`}
                  className="inline-flex items-center gap-2 text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  {lang === 'id' ? 'Detail' : 'Details'}
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioModal;