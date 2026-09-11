import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiCalendar, FiClock, FiTag, FiExternalLink 
} from 'react-icons/fi';
import { fetchBlogPostBySlug } from '../data/blog';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useTranslation } from '../hooks/useTranslation';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0);

    fetchBlogPostBySlug(slug)
      .then((data) => {
        if (!cancelled) setPost(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // ==================== LOADING ====================
  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <main className="pb-16">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-4xl pt-28 md:pt-32 animate-pulse">
            <div className="h-4 w-48 bg-gray-200 mb-6"></div>
            <div className="h-16 w-full bg-gray-200 mb-4"></div>
            <div className="h-16 w-3/4 bg-gray-200 mb-8"></div>
            <div className="h-6 w-full bg-gray-200 mb-3"></div>
            <div className="h-6 w-2/3 bg-gray-200 mb-10"></div>
            <div className="aspect-[16/8] bg-gray-200 rounded-lg mb-12"></div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200"></div>
              <div className="h-4 w-full bg-gray-200"></div>
              <div className="h-4 w-3/4 bg-gray-200"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ==================== ERROR / NOT FOUND ====================
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-heading font-bold">404</h1>
          <p className="mt-2 text-gray-600">
            {lang === 'id' ? 'Artikel tidak ditemukan' : 'Article not found'}
          </p>
          <Link 
            to="/" 
            className="mt-4 inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            {lang === 'id' ? 'Kembali ke Home' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <main className="pb-16">
        {/* Back button */}
        <div className="fixed top-6 left-6 z-50">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-colors shadow-lg"
          >
            <FiArrowLeft className="w-4 h-4" />
            {lang === 'id' ? 'Kembali' : 'Back'}
          </button>
        </div>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-4xl pt-28 md:pt-32">
          {/* Meta */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 flex-wrap">
            {post.tags?.[0] && (
              <span className="flex items-center gap-2">
                <FiTag className="w-3.5 h-3.5" />
                {post.tags[0]}
              </span>
            )}
            <span className="flex items-center gap-2">
              <FiCalendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="w-3.5 h-3.5" />
              {post.readTime} {lang === 'id' ? 'menit' : 'min read'}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Author + source */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {post.author.image && (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <a
                  href={post.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-black hover:underline"
                >
                  @{post.author.username}
                </a>
              </div>
            </div>

            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
            >
              {lang === 'id' ? 'Baca di Dev.to' : 'Read on Dev.to'}
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="mt-10 aspect-[16/8] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content — dari Dev.to body_html */}
          <div
            className="mt-12 prose prose-base md:prose-lg max-w-none 
              prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-black prose-a:underline hover:prose-a:text-gray-600
              prose-img:rounded-lg prose-img:my-8
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg
              prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-ul:list-disc prose-ol:list-decimal
              prose-strong:text-black prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />

          {/* Credit */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-4">
              {lang === 'id'
                ? 'Artikel ini dipublikasikan di Dev.to oleh'
                : 'This article was published on Dev.to by'}{' '}
              <a
                href={post.author.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-black"
              >
                {post.author.name}
              </a>
            </p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              {lang === 'id' ? 'Baca Artikel Original' : 'Read Original Article'}
              <FiExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-black text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">
              {lang === 'id' ? 'Butuh bantuan dengan website?' : 'Need help with your website?'}
            </h2>
            <p className="mt-3 text-gray-400 text-sm">
              {lang === 'id'
                ? 'Konsultasi gratis, tanpa komitmen.'
                : 'Free consultation, no commitment.'}
            </p>
            <a
              href="https://wa.me/6285801003353?text=Halo, saya mau konsultasi tentang website"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {lang === 'id' ? 'Chat WhatsApp' : 'Chat WhatsApp'}
            </a>
          </div>

          {/* Back to list */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-center">
            <Link 
              to="/#blog"
              className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {lang === 'id' ? 'Lihat semua artikel' : 'View all articles'}
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default BlogDetail;
