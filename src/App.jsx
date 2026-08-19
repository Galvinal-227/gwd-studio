import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectDetail from './pages/ProjectDetail';
import Preloader from './components/Preloader';
import BlogSection from './components/BlogSection';
import Newsletter from './components/Newsletter';
import CookieConsent from './components/CookieConsent';
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
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
        <div className="bg-offwhite text-ink">
          <Preloader />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <TrustSection />
            <Services />
            <Portfolio />
            <Process />
            <Pricing />
            <WhyChooseUs />
            <BlogSection />
            <Testimonials />
            <FAQ />
            <Newsletter />
            <CTA />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
          <CookieConsent />
        </div>
      } />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;