import { useState } from 'react';
import { FiSend, FiCheck, FiMail, FiLoader } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { useTranslation } from '../hooks/useTranslation';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_NEWSLETTER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const { lang } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;

    setStatus('loading');

    try {
      const templateParams = {
        subscriber_email: email,
        date: new Date().toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        message: `Newsletter subscriber baru: ${email}`,
        to_email: 'akunmasukanweb@gmail.com',
        from_name: 'GWD Newsletter',
        from_email: email,
        reply_to: email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NEWSLETTER_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setEmail('');
      
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error('Newsletter Error:', error);
      setStatus('error');
      
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-4xl text-center">
        <FiMail className="w-10 h-10 text-white/50 mx-auto mb-4" />
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
          {lang === 'id' ? 'Dapatkan Update Terbaru' : 'Get Latest Updates'}
        </h3>
        <p className="mt-2 text-gray-400 text-sm">
          {lang === 'id'
            ? 'Subscribe untuk mendapatkan tips web development dan promo spesial.'
            : 'Subscribe to get web development tips and special offers.'}
        </p>

        {status === 'success' ? (
          <div className="mt-6 inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-6 py-3 rounded-md">
            <FiCheck className="w-5 h-5" />
            {lang === 'id' ? 'Terima kasih sudah subscribe!' : 'Thanks for subscribing!'}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col md:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'id' ? 'Email kamu...' : 'Your email...'}
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  {lang === 'id' ? 'Subscribe' : 'Subscribe'}
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="mt-4 bg-red-500/20 text-red-400 px-6 py-3 rounded-md inline-block text-sm">
            {lang === 'id'
              ? 'Gagal subscribe. Coba lagi ya kak!'
              : 'Failed to subscribe. Please try again.'}
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;