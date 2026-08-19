import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiExternalLink } from 'react-icons/fi';
import { services } from '../data/pricing';
import { contactInfo } from '../data/contact';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold">GWD</h3>
            <p className="mt-4 text-gray-600 max-w-sm">{t('footer_description')}</p>
            <div className="mt-6 flex space-x-4">
              <a href={contactInfo.socials[0]?.url} target="_blank" rel="noopener noreferrer" aria-label="Github" className="text-gray-500 hover:text-black transition-colors"><FiGithub className="w-5 h-5" /></a>
              <a href={contactInfo.socials[1]?.url} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-black transition-colors"><FiTwitter className="w-5 h-5" /></a>
              <a href={contactInfo.socials[2]?.url} target="_blank" rel="noopener noreferrer" aria-label="Linkedin" className="text-gray-500 hover:text-black transition-colors"><FiLinkedin className="w-5 h-5" /></a>
              <a href={contactInfo.socials[3]?.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-black transition-colors"><FiInstagram className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">{t('footer_navigation')}</h4>
            <ul className="space-y-3">
              <li><a href="#work" className="text-gray-700 hover:text-black transition-colors">{t('nav_work')}</a></li>
              <li><a href="#services" className="text-gray-700 hover:text-black transition-colors">{t('nav_services')}</a></li>
              <li><a href="#process" className="text-gray-700 hover:text-black transition-colors">{t('nav_process')}</a></li>
              <li><a href="#pricing" className="text-gray-700 hover:text-black transition-colors">{t('nav_pricing')}</a></li>
              <li><a href="#contact" className="text-gray-700 hover:text-black transition-colors">{t('nav_about')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">{t('footer_contact')}</h4>
            <ul className="space-y-3">
              <li><a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-black transition-colors">{contactInfo.email}</a></li>
              <li><a href={`https://wa.me/${(contactInfo.whatsapp || contactInfo.phone).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black transition-colors">{contactInfo.whatsapp || contactInfo.phone}</a></li>
              <li className="text-gray-700">{contactInfo.location}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} GWD. {t('footer_rights')}</p>
          
          {/* Link ke website pribadi */}
          <a 
            href="https://galvinalfito.my.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors group"
          >
            {t('footer_made')}
            <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;