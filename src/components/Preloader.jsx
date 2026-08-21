import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1;
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, 80);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    }, 2400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  const ease = [0.76, 0, 0.24, 1];

  const containerVariants = {
    exit: {
      y: '-100%',
      transition: { duration: 0.8, ease },
    },
  };

  const logoVariants = {
    hidden: { y: '110%' },
    visible: {
      y: 0,
      transition: { duration: 1.2, ease },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.5, ease, delay: 0.6 },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10, letterSpacing: '0.1em' },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: '0.3em',
      transition: { duration: 1.2, ease, delay: 1.2 },
    },
  };

  const statusVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease, delay: 1.6 },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
          variants={containerVariants}
          exit="exit"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative text-center px-6">
            <div className="overflow-hidden">
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white tracking-tight"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
              >
                GWD<span className="text-gray-600">.</span>
              </motion.h1>
            </div>

            <motion.div
              className="mt-8 h-px bg-white/15 mx-auto max-w-[200px] md:max-w-[300px]"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: 'center' }}
            />

            <motion.p
              className="mt-6 text-[10px] md:text-xs uppercase text-gray-500 tracking-[0.1em]"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              {t('preloader_studio')}
            </motion.p>

            <motion.p
              className="mt-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-600"
              variants={statusVariants}
              initial="hidden"
              animate="visible"
            >
              {t('preloader_initializing')}
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-8 right-8 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 1 }}
          >
            <span className="font-mono text-xs md:text-sm text-gray-500 tabular-nums">
              {Math.round(progress).toString().padStart(3, '0')}
            </span>
            <span className="font-mono text-xs md:text-sm text-gray-700 tabular-nums">
              {' '}
              / 100
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-white/10"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
