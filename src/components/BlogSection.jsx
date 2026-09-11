import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../data/blog';
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

// ===== MOCKUP VISUAL PER KATEGORI (fallback kalau nggak ada cover) =====
const CategoryVisual = ({ category }) => {
  const visuals = {
    'Bisnis': (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="w-16 h-3 bg-gray-800 rounded-sm"></div>
          <div className="flex gap-2">
            <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-6 h-2 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[200px]">
            <div className="w-full h-4 bg-gray-800 rounded-sm mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded-sm mb-4"></div>
            <div className="w-24 h-6 bg-black rounded-sm"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-8 bg-white rounded-sm border border-gray-200"></div>
          <div className="h-8 bg-white rounded-sm border border-gray-200"></div>
          <div className="h-8 bg-white rounded-sm border border-gray-200"></div>
        </div>
      </div>
    ),
    'Tips': (
      <div className="w-full h-full bg-gray-50 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <div className="w-20 h-3 bg-gray-800 rounded-sm"></div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="w-full h-3 bg-gray-200 rounded-sm"></div>
          <div className="w-full h-3 bg-gray-200 rounded-sm"></div>
          <div className="w-2/3 h-3 bg-gray-200 rounded-sm"></div>
          <div className="w-full h-3 bg-gray-200 rounded-sm"></div>
          <div className="w-1/2 h-3 bg-gray-200 rounded-sm"></div>
        </div>
        <div className="mt-4 w-20 h-6 bg-black rounded-sm"></div>
      </div>
    ),
    'Edukasi': (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 p-6 flex flex-col">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">E</span>
          </div>
        </div>
        <div className="flex-1 text-center space-y-2">
          <div className="w-full h-3 bg-gray-400 rounded-sm"></div>
          <div className="w-3/4 h-3 bg-gray-300 rounded-sm mx-auto"></div>
          <div className="w-1/2 h-3 bg-gray-300 rounded-sm mx-auto"></div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <div className="w-8 h-8 bg-white rounded-sm border border-gray-300"></div>
          <div className="w-8 h-8 bg-white rounded-sm border border-gray-300"></div>
          <div className="w-8 h-8 bg-white rounded-sm border border-gray-300"></div>
        </div>
      </div>
    ),
    'Design': (
      <div className="w-full h-full bg-gray-50 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="w-14 h-14 bg-black rounded-sm"></div>
          <div className="flex gap-2">
            <div className="w-8 h-8 border border-gray-300 rounded-sm"></div>
            <div className="w-8 h-8 border border-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          <div className="bg-gray-200 rounded-sm"></div>
          <div className="bg-gray-300 rounded-sm"></div>
          <div className="bg-gray-300 rounded-sm"></div>
          <div className="bg-gray-200 rounded-sm"></div>
        </div>
        <div className="mt-4 w-full h-8 bg-black rounded-sm"></div>
      </div>
    ),
  };

  return (
    <div className="absolute inset-0">
      {visuals[category] || visuals['Bisnis']}
    </div>
  );
};

const BlogSection = () => {
  const sectionRef = useRef(null);
  const { t, lang } = useTranslation();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==================== FETCH DARI DEV.TO ====================
  useEffect(() => {
    let cancelled = false;

    fetchBlogPosts()
      .then((posts) => {
        if (!cancelled) setBlogPosts(posts);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
        console.error('Blog fetch error:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // ==================== GSAP ANIMATION ====================
  useLayoutEffect(() => {
    if (loading || !blogPosts.length) return;

    const ctx = gsap.context(() => {
      gsap.from('.blog-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.blog-header', start: 'top 80%' }
      });

      gsap.from('.blog-featured-visual', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.blog-featured', start: 'top 75%' }
      });

      gsap.from('.blog-featured-content > *', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.blog-featured', start: 'top 75%' }
      });

      gsap.from('.blog-secondary-item', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.blog-secondary-list', start: 'top 75%' }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, blogPosts.length]);

  // ==================== DATE FORMATTER ====================
  const formatDate = (dateStr) => {
    return new Date(dateStr)
      .toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase();
  };

  // ==================== LOADING SKELETON ====================
  if (loading) {
    return (
      <section id="blog" className="py-24 md:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px]">
          <div className="animate-pulse">
            <div className="h-3 w-24 bg-gray-200 mb-4"></div>
            <div className="h-10 w-80 bg-gray-200 mb-3"></div>
            <div className="h-4 w-64 bg-gray-200"></div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="aspect-[4/3] bg-gray-200"></div>
              <div className="space-y-4">
                <div className="h-3 w-40 bg-gray-200"></div>
                <div className="h-12 w-full bg-gray-200"></div>
                <div className="h-12 w-3/4 bg-gray-200"></div>
                <div className="h-16 w-full bg-gray-200 mt-4"></div>
              </div>
            </div>

            <div className="mt-20 border-t border-gray-200">
              {[1, 2, 3].map((i) => (
                <div key={i} className="py-10 border-b border-gray-200 flex gap-8">
                  <div className="h-4 w-8 bg-gray-200"></div>
                  <div className="h-4 w-24 bg-gray-200"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-2/3 bg-gray-200"></div>
                    <div className="h-4 w-full bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==================== ERROR STATE ====================
  if (error) {
    return (
      <section id="blog" className="py-24 md:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px] text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
            Blog unavailable
          </p>
          <p className="text-gray-600">
            {lang === 'id'
              ? 'Gagal memuat artikel. Coba refresh halaman ya.'
              : 'Failed to load articles. Please refresh the page.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2.5 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            {lang === 'id' ? 'Coba Lagi' : 'Retry'}
          </button>
        </div>
      </section>
    );
  }

  // ==================== EMPTY STATE ====================
  if (!blogPosts.length) return null;

  const featured = blogPosts[0];
  const secondary = blogPosts.slice(1);

  return (
    <section ref={sectionRef} id="blog" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-[1400px]">
        <div className="blog-header">
          <SectionHeader
            eyebrowKey="blog_eyebrow"
            titleKey="blog_title"
            descriptionKey="blog_description"
          />
        </div>

        {/* ==================== FEATURED ARTICLE ==================== */}
        <div className="blog-featured mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Link
            to={`/blog/${featured.slug}`}
            className="blog-featured-visual group relative aspect-[4/3] bg-gray-50 border border-gray-200 overflow-hidden cursor-pointer block"
          >
            {featured.coverImage ? (
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <CategoryVisual category={featured.category} />
            )}

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

            <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 bg-white px-2 py-1">
              Featured
            </div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border border-gray-300 flex items-center justify-center bg-white group-hover:bg-black group-hover:border-black transition-colors duration-300">
              <FiArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </Link>

          <div className="blog-featured-content">
            <div className="blog-meta flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-500">
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5" />
                {formatDate(featured.date)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5" />
                {lang === 'id' ? featured.readTime : featured.readTimeEn}
              </span>
              {featured.author && (
                <>
                  <span>·</span>
                  <span className="text-gray-400 normal-case tracking-normal">
                    {featured.author}
                  </span>
                </>
              )}
            </div>

            <h3 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.05] tracking-tight">
              <Link to={`/blog/${featured.slug}`} className="hover:underline">
                {featured.title}
              </Link>
            </h3>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-lg">
              {featured.excerpt}
            </p>

            <Link
              to={`/blog/${featured.slug}`}
              className="group inline-flex items-center gap-3 mt-8 text-sm font-medium uppercase tracking-wider relative pb-1"
            >
              {lang === 'id' ? 'Baca Artikel' : 'Read Article'}
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              <span className="absolute bottom-0 left-0 w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>
        </div>

        {/* ==================== SECONDARY ARTICLES ==================== */}
        <div className="blog-secondary-list mt-20 border-t border-gray-200">
          {secondary.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="blog-secondary-item group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 px-2 md:px-4 -mx-2 md:-mx-4 cursor-pointer"
            >
              <div className="md:col-span-1">
                <span className="text-sm font-mono text-gray-400 group-hover:text-black transition-colors duration-300">
                  {String(index + 2).padStart(2, '0')}
                </span>
              </div>

              <div className="md:col-span-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  {post.category}
                </span>
              </div>

              <div className="md:col-span-6">
                <h4 className="text-xl md:text-2xl font-heading font-semibold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {post.title}
                </h4>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  <span>{lang === 'id' ? post.readTime : post.readTimeEn}</span>
                </div>
              </div>

              <div className="md:col-span-1 flex items-start md:justify-end">
                <div className="w-8 h-8 border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors duration-300">
                  <FiArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
