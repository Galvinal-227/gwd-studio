import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import TechMarquee from './components/TechMarquee';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Pricing from './components/Pricing';
import WhyChooseUs from './components/WhyChooseUs';
import BlogSection from './components/BlogSection';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FooterReveal from './components/FooterReveal';
import CookieConsent from './components/CookieConsent';
import ProjectDetail from './pages/ProjectDetail';
import BlogDetail from './pages/BlogDetail';
import { useLenis } from './hooks/useLenis';
import { useTranslation } from './hooks/useTranslation';

function App() {
  useLenis();
  const { lang } = useTranslation();

  useEffect(() => {
    document.title = lang === 'id' 
      ? 'GWD — Jasa Pembuatan Website Premium' 
      : 'GWD — Premium Web Development';
  }, [lang]);

  return (
    <Routes>
      <Route path="/" element={
        <div className="bg-white text-black relative">
          <Preloader />
          <ScrollProgress />
          <Navbar />

          {/* FooterReveal - Fixed di bawah, z-index PALING RENDAH */}
          <FooterReveal />

          {/* Konten utama - z-index 10, background putih solid */}
          <main className="content-layer">
            <Hero />
            <TechMarquee />
            <TrustSection />
            <Services />
            <Portfolio />
            <Process />
            <Pricing />
            <WhyChooseUs />
            <BlogSection />
            <FAQ />
            <Newsletter />
            <CTA />
            <Contact />
          </main>

          {/* Footer - z-index 20, background putih solid */}
          <Footer />

          {/* Spacer supaya FooterReveal punya ruang untuk terlihat */}
          <div style={{ height: '60vh' }} aria-hidden="true"></div>

          <BackToTop />
          <CookieConsent />
        </div>
      } />
      
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
    </Routes>
  );
}

export default App;
