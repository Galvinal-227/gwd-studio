import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { blogPosts } from '../data/blog';
import SectionHeader from './SectionHeader';
import { useTranslation } from '../hooks/useTranslation';

gsap.registerPlugin(ScrollTrigger);

const BlogSection = () => {
  const gridRef = useRef(null);
  const { t, lang } = useTranslation();

  useLayoutEffect(() => {
    const items = gridRef.current.querySelectorAll('.blog-card');
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: gridRef.current, start: 'top 75%' }
      }
    );
  }, []);

  return (
    <section id="blog" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <SectionHeader 
          eyebrowKey="blog_eyebrow"
          titleKey="blog_title"
          descriptionKey="blog_description"
        />
        
        <div ref={gridRef} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <a
              href="#"
              key={post.id}
              className="blog-card group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-black transition-colors flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl font-heading font-bold text-gray-300 group-hover:scale-110 transition-transform">
                  {post.category.charAt(0)}
                </span>
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs">
                  {lang === 'id' ? post.category : post.categoryEn}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {lang === 'id' ? post.readTimeId : post.readTime}
                  </span>
                </div>
                
                <h3 className="text-xl font-heading font-semibold group-hover:underline">
                  {lang === 'id' ? post.title : post.titleEn}
                </h3>
                
                <p className="mt-2 text-gray-600 text-sm flex-1">
                  {lang === 'id' ? post.excerpt : post.excerptEn}
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-black">
                  {lang === 'id' ? 'Baca selengkapnya' : 'Read more'}
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;