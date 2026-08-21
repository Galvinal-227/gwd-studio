import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiArrowRight } from 'react-icons/fi';
import { blogPosts } from '../data/blog';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useTranslation } from '../hooks/useTranslation';

// ===== MOCKUP VISUAL PER KATEGORI =====
const CategoryVisual = ({ category }) => {
  const visuals = {
    'Bisnis': (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="w-20 h-4 bg-gray-800 rounded-sm"></div>
          <div className="flex gap-3">
            <div className="w-8 h-3 bg-gray-300 rounded-sm"></div>
            <div className="w-8 h-3 bg-gray-300 rounded-sm"></div>
            <div className="w-8 h-3 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[300px]">
            <div className="w-full h-6 bg-gray-800 rounded-sm mb-3"></div>
            <div className="w-3/4 h-6 bg-gray-300 rounded-sm mb-6"></div>
            <div className="w-32 h-10 bg-black rounded-sm"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="h-12 bg-white rounded-sm border border-gray-200"></div>
          <div className="h-12 bg-white rounded-sm border border-gray-200"></div>
          <div className="h-12 bg-white rounded-sm border border-gray-200"></div>
        </div>
      </div>
    ),
    'Tips': (
      <div className="w-full h-full bg-gray-50 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-lg font-bold">T</span>
          </div>
          <div className="w-32 h-4 bg-gray-800 rounded-sm"></div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="w-full h-4 bg-gray-200 rounded-sm"></div>
          <div className="w-full h-4 bg-gray-200 rounded-sm"></div>
          <div className="w-2/3 h-4 bg-gray-200 rounded-sm"></div>
          <div className="w-full h-4 bg-gray-200 rounded-sm"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded-sm"></div>
          <div className="w-full h-4 bg-gray-200 rounded-sm"></div>
        </div>
        <div className="mt-8 w-28 h-10 bg-black rounded-sm"></div>
      </div>
    ),
    'Edukasi': (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 p-8 flex flex-col">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">E</span>
          </div>
        </div>
        <div className="flex-1 text-center space-y-3">
          <div className="w-full h-4 bg-gray-400 rounded-sm"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded-sm mx-auto"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded-sm mx-auto"></div>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <div className="w-12 h-12 bg-white rounded-sm border border-gray-300"></div>
          <div className="w-12 h-12 bg-white rounded-sm border border-gray-300"></div>
          <div className="w-12 h-12 bg-white rounded-sm border border-gray-300"></div>
        </div>
      </div>
    ),
    'Design': (
      <div className="w-full h-full bg-gray-50 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="w-16 h-16 bg-black rounded-sm"></div>
          <div className="flex gap-3">
            <div className="w-10 h-10 border border-gray-300 rounded-sm"></div>
            <div className="w-10 h-10 border border-gray-300 rounded-sm"></div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-sm"></div>
          <div className="bg-gray-300 rounded-sm"></div>
          <div className="bg-gray-300 rounded-sm"></div>
          <div className="bg-gray-200 rounded-sm"></div>
        </div>
        <div className="mt-8 w-full h-12 bg-black rounded-sm"></div>
      </div>
    ),
  };

  return (
    <div className="absolute inset-0">
      {visuals[category] || visuals['Bisnis']}
    </div>
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const { lang } = useTranslation();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Pilih content sesuai bahasa
  const content = lang === 'id' ? post.content : (post.contentEn || post.content);

  return (
    <div className="bg-white text-black min-h-screen">
      <main className="pb-16">
        {/* Back button */}
        <div className="fixed top-6 left-6 z-50">
          <Link 
            to="/#blog" 
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-black hover:text-white transition-colors shadow-lg"
          >
            <FiArrowLeft className="w-4 h-4" />
            {lang === 'id' ? 'Kembali' : 'Back'}
          </Link>
        </div>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-4xl pt-28 md:pt-32">
          {/* Meta */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 flex-wrap">
            <span className="flex items-center gap-2">
              <FiTag className="w-3.5 h-3.5" />
              {lang === 'id' ? post.category : post.categoryEn}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="w-3.5 h-3.5" />
              {lang === 'id' ? post.readTimeId : post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
            {lang === 'id' ? post.title : post.titleEn}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            {lang === 'id' ? post.excerpt : post.excerptEn}
          </p>

          {/* Divider */}
          <div className="mt-10 h-px bg-gray-200"></div>

          {/* Visual - Category Mockup */}
          <div className="mt-10 aspect-[16/8] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden relative">
            <CategoryVisual category={post.category} />
          </div>

          {/* Content - ikut bahasa */}
          <div className="mt-12 space-y-6">
            {content?.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
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

          {/* Navigasi artikel */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center gap-4 flex-wrap">
            {prevPost ? (
              <Link 
                to={`/blog/${prevPost.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {lang === 'id' ? 'Artikel Sebelumnya' : 'Previous Article'}
              </Link>
            ) : (
              <span></span>
            )}
            
            {nextPost ? (
              <Link 
                to={`/blog/${nextPost.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {lang === 'id' ? 'Artikel Berikutnya' : 'Next Article'}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default BlogDetail;
