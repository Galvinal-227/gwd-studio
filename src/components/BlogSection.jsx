import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const sectionRef = useRef(null);
  const { t, lang } = useTranslation();

  useLayoutEffect(() => {
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
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  const featured = blogPosts[0];
  const secondary = blogPosts.slice(1);

  // Translation key helper
  const getBlogTitleKey = (postId) => `blog_post_${postId}_title`;
  const getBlogExcerptKey = (postId) => `blog_post_${postId}_excerpt`;
  const getBlogCategoryKey = (category) => {
    const map = {
      'Bisnis': 'blog_cat_business',
      'Business': 'blog_cat_business',
      'Tips': 'blog_cat_tips',
      'Edukasi': 'blog_cat_education',
      'Education': 'blog_cat_education',
      'Design': 'blog_cat_design',
    };
    return map[category] || 'blog_cat_business';
  };

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

        {/* FEATURED ARTICLE */}
        <div className="blog-featured mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual */}
          <Link to={`/blog/${featured.slug}`} className="blog-featured-visual group relative aspect-[4/3] bg-gray-50 border border-gray-200 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:30px_30px] opacity-50 transition-opacity duration-300 group-hover:opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center transition-transform duration-500 group-hover:scale-105">
                <p className="text-5xl md:text-7xl font-heading font-extrabold text-gray-200 leading-none">
                  {featured.category.toUpperCase()}
                </p>
                <p className="mt-2 text-sm text-gray-400 font-mono">01</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 bg-white px-2 py-1">
              {t('blog_featured')}
            </div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border border-gray-300 flex items-center justify-center bg-white group-hover:bg-black group-hover:border-black transition-colors duration-300">
              <FiArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </Link>

          {/* Content */}
          <div className="blog-featured-content">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-500">
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5" />
                {formatDate(featured.date)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5" />
                {lang === 'id' ? featured.readTimeId : featured.readTime}
              </span>
              <span>·</span>
              <span>{t(getBlogCategoryKey(featured.category))}</span>
            </div>

            <h3 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.05] tracking-tight">
              <Link to={`/blog/${featured.slug}`} className="hover:underline">
                {t(getBlogTitleKey(featured.id)) || featured.title}
              </Link>
            </h3>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-lg">
              {t(getBlogExcerptKey(featured.id)) || featured.excerpt}
            </p>

            <Link 
              to={`/blog/${featured.slug}`} 
              className="group inline-flex items-center gap-3 mt-8 text-sm font-medium uppercase tracking-wider relative pb-1"
            >
              {t('blog_read_article')}
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              <span className="absolute bottom-0 left-0 w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </div>
        </div>

        {/* SECONDARY ARTICLES */}
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
                  {t(getBlogCategoryKey(post.category)) || post.category}
                </span>
              </div>

              <div className="md:col-span-6">
                <h4 className="text-xl md:text-2xl font-heading font-semibold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {t(getBlogTitleKey(post.id)) || post.title}
                </h4>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {t(getBlogExcerptKey(post.id)) || post.excerpt}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-col gap-1 text-[10px] uppercase tracking-wider text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  <span>{lang === 'id' ? post.readTimeId : post.readTime}</span>
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
