import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, lang } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem('gwd-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('gwd-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('gwd-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:max-w-md z-50 bg-white border border-gray-200 rounded-lg shadow-2xl p-6"
        >
          <button
            onClick={declineCookies}
            className="absolute top-3 right-3 text-gray-400 hover:text-black"
            aria-label="Close cookie banner"
          >
            <FiX className="w-4 h-4" />
          </button>
          
          <h4 className="font-semibold text-gray-800">
            {lang === 'id' ? '🍪 Cookie Consent' : '🍪 Cookie Consent'}
          </h4>
          <p className="mt-2 text-sm text-gray-600">
            {lang === 'id'
              ? 'Website ini menggunakan cookie untuk meningkatkan pengalaman Anda. Dengan melanjutkan, Anda menyetujui penggunaan cookie.'
              : 'This website uses cookies to improve your experience. By continuing, you agree to the use of cookies.'}
          </p>
          
          <div className="mt-4 flex gap-3">
            <button
              onClick={acceptCookies}
              className="flex-1 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {lang === 'id' ? 'Terima' : 'Accept'}
            </button>
            <button
              onClick={declineCookies}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              {lang === 'id' ? 'Tolak' : 'Decline'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;