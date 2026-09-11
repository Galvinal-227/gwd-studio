// ============================================
// BLOG DATA — Fetch dari Dev.to API
// Cache: 24 jam, ganti tiap tengah malam
// ============================================

const DEV_TO_API = 'https://dev.to/api/articles';

// ============================================
// KONFIGURASI
// ============================================
const TAGS = ['webdev', 'design', 'flutter'];
const PER_PAGE = 2;

const CACHE_KEY = 'gwd_blog_cache';
const CACHE_DATE_KEY = 'gwd_blog_cache_date';

// ============================================
// HELPER — cek apakah cache masih valid
// Cache valid kalau tanggal fetch == tanggal hari ini
// ============================================
const isCacheValid = () => {
  try {
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
    if (!cachedDate) return false;

    // Ambil tanggal hari ini (format YYYY-MM-DD, pakai timezone lokal)
    const today = new Date().toLocaleDateString('en-CA'); // en-CA = YYYY-MM-DD

    return cachedDate === today;
  } catch {
    return false;
  }
};

const getCachedPosts = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const savePostsToCache = (posts) => {
  try {
    const today = new Date().toLocaleDateString('en-CA');
    localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
    localStorage.setItem(CACHE_DATE_KEY, today);
  } catch (err) {
    console.warn('Failed to save blog cache:', err);
  }
};

// ============================================
// FETCH LIST ARTIKEL (buat BlogSection)
// ============================================
export const fetchBlogPosts = async (forceRefresh = false) => {
  // Kalau nggak force refresh DAN cache masih valid → pakai cache
  if (!forceRefresh && isCacheValid()) {
    const cached = getCachedPosts();
    if (cached && cached.length) {
      console.log('[Blog] Using cached posts (from today)');
      return cached;
    }
  }

  console.log('[Blog] Fetching fresh posts from Dev.to...');

  const responses = await Promise.all(
    TAGS.map((tag) =>
      fetch(`${DEV_TO_API}?tag=${tag}&per_page=${PER_PAGE}`)
        .then((res) => res.json())
        .catch(() => [])
    )
  );

  const allPosts = responses.flat();
  const uniquePosts = Array.from(
    new Map(allPosts.map((p) => [p.id, p])).values()
  );

  uniquePosts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  const normalized = uniquePosts.map((post, i) => ({
    id: i + 1,
    slug: post.slug,
    title: post.title,
    titleEn: post.title,
    excerpt: post.description || 'Read the full article on Dev.to',
    excerptEn: post.description || 'Read the full article on Dev.to',
    category: post.tag_list?.[0] || 'Tech',
    categoryEn: post.tag_list?.[0] || 'Tech',
    date: post.published_at,
    readTime: `${post.reading_time_minutes} menit`,
    readTimeEn: `${post.reading_time_minutes} min read`,
    coverImage: post.cover_image || post.social_image,
    url: post.url,
    author: post.user?.name || 'Unknown',
    authorImage: post.user?.profile_image_90,
  }));

  savePostsToCache(normalized);
  return normalized;
};

// ============================================
// FETCH 1 ARTIKEL BY SLUG (buat BlogDetail)
// ============================================
export const fetchBlogPostBySlug = async (slug) => {
  // Cek cache dulu (biar nggak fetch 2x)
  const cached = getCachedPosts();
  if (cached) {
    const found = cached.find((p) => p.slug === slug);
    if (found) {
      // Fetch detail lengkap by ID
      const detailRes = await fetch(`${DEV_TO_API}/${found.id}`);
      if (detailRes.ok) {
        const detail = await detailRes.json();
        return normalizeDetail(detail);
      }
    }
  }

  // Kalau nggak ada di cache, fetch list besar
  const responses = await Promise.all(
    TAGS.map((tag) =>
      fetch(`${DEV_TO_API}?tag=${tag}&per_page=100`)
        .then((res) => res.json())
        .catch(() => [])
    )
  );

  const allPosts = responses.flat();
  const uniquePosts = Array.from(
    new Map(allPosts.map((p) => [p.id, p])).values()
  );

  const post = uniquePosts.find((p) => p.slug === slug);
  if (!post) throw new Error('Article not found');

  const detailRes = await fetch(`${DEV_TO_API}/${post.id}`);
  if (!detailRes.ok) throw new Error('Failed to load article detail');
  const detail = await detailRes.json();

  return normalizeDetail(detail);
};

const normalizeDetail = (detail) => ({
  id: detail.id,
  slug: detail.slug,
  title: detail.title,
  description: detail.description,
  bodyHtml: detail.body_html,
  bodyMarkdown: detail.body_markdown,
  coverImage: detail.cover_image || detail.social_image,
  date: detail.published_at,
  readTime: detail.reading_time_minutes,
  tags: detail.tag_list,
  url: detail.url,
  author: {
    name: detail.user?.name || 'Unknown',
    username: detail.user?.username,
    image: detail.user?.profile_image_90,
    url: `https://dev.to/${detail.user?.username}`,
  },
});
