
const DEV_TO_API = 'https://dev.to/api/articles';

const TAGS = ['webdev', 'design', 'flutter'];
const PER_PAGE = 2;

const CACHE_KEY = 'gwd_blog_cache';
const CACHE_DATE_KEY = 'gwd_blog_cache_date';

// ============================================
// CACHE HELPERS
// ============================================

const getToday = () => new Date().toLocaleDateString('en-CA');

const isCacheValid = () => {
  try {
    return localStorage.getItem(CACHE_DATE_KEY) === getToday();
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
    localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
    localStorage.setItem(CACHE_DATE_KEY, getToday());
  } catch (err) {
    console.warn('[Blog] Cache save failed:', err);
  }
};

// ============================================
// NORMALIZE AUTHOR
// ============================================

const normalizeAuthor = (user = {}) => ({
  name: user.name || 'Unknown',
  username: user.username || '',
  image: user.profile_image_90 || '',
  url: user.username
    ? `https://dev.to/${user.username}`
    : 'https://dev.to',
});

// ============================================
// NORMALIZE LIST ARTICLE
// ============================================

const normalizeListPost = (post, index) => ({
  id: index + 1,
  devToId: post.id,
  slug: post.slug,
  title: post.title,
  titleEn: post.title,
  excerpt: post.description || 'Read the full article on Dev.to',
  excerptEn: post.description || 'Read the full article on Dev.to',
  category: post.tag_list?.[0] || 'Tech',
  categoryEn: post.tag_list?.[0] || 'Tech',
  date: post.published_at,
  readTime: `${post.reading_time_minutes || 1} menit`,
  readTimeEn: `${post.reading_time_minutes || 1} min read`,
  coverImage: post.cover_image || post.social_image || '',
  url: post.url || `https://dev.to`,
  author: normalizeAuthor(post.user),
});

// ============================================
// NORMALIZE DETAIL ARTICLE
// ============================================

const normalizeDetail = (detail) => ({
  id: detail.id,
  devToId: detail.id,
  slug: detail.slug,
  title: detail.title,
  description: detail.description || '',
  bodyHtml: detail.body_html || '',
  bodyMarkdown: detail.body_markdown || '',
  coverImage: detail.cover_image || detail.social_image || '',
  date: detail.published_at,
  readTime: detail.reading_time_minutes || 1,
  tags: detail.tag_list || [],
  url: detail.url || 'https://dev.to',
  author: normalizeAuthor(detail.user),
});

// ============================================
// FETCH HELPER
// ============================================

const fetchJSON = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// ============================================
// FETCH ARTICLE LIST
// ============================================

export const fetchBlogPosts = async (forceRefresh = false) => {
  if (!forceRefresh && isCacheValid()) {
    const cached = getCachedPosts();

    if (cached?.length) {
      console.log('[Blog] Using daily cache');
      return cached;
    }
  }

  try {
    console.log('[Blog] Fetching Dev.to articles...');

    const responses = await Promise.all(
      TAGS.map((tag) =>
        fetchJSON(`${DEV_TO_API}?tag=${tag}&per_page=${PER_PAGE}`)
      )
    );

    const allPosts = responses.flat();

    const uniquePosts = Array.from(
      new Map(allPosts.map((post) => [post.id, post])).values()
    );

    uniquePosts.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );

    const normalized = uniquePosts.map(normalizeListPost);

    savePostsToCache(normalized);

    return normalized;
  } catch (error) {
    console.warn('[Blog] API failed, using cache:', error);

    const cached = getCachedPosts();

    if (cached?.length) {
      return cached;
    }

    throw new Error('Unable to load blog articles');
  }
};

// ============================================
// FETCH ARTICLE DETAIL BY SLUG
// ============================================

export const fetchBlogPostBySlug = async (slug) => {
  if (!slug) {
    throw new Error('Article slug is required');
  }

  const cached = getCachedPosts();

  // Cari artikel dari cache
  const cachedPost = cached?.find((post) => post.slug === slug);

  // Gunakan ID Dev.to asli, bukan ID internal
  if (cachedPost?.devToId) {
    try {
      console.log('[Blog] Fetching cached article detail');

      const detail = await fetchJSON(
        `${DEV_TO_API}/${cachedPost.devToId}`
      );

      return normalizeDetail(detail);
    } catch (error) {
      console.warn('[Blog] Detail API failed:', error);
    }
  }

  // Jika tidak ada di cache, cari melalui API
  try {
    console.log('[Blog] Searching article by slug:', slug);

    const responses = await Promise.all(
      TAGS.map((tag) =>
        fetchJSON(`${DEV_TO_API}?tag=${tag}&per_page=100`)
      )
    );

    const allPosts = responses.flat();

    const uniquePosts = Array.from(
      new Map(allPosts.map((post) => [post.id, post])).values()
    );

    const article = uniquePosts.find((post) => post.slug === slug);

    if (!article) {
      throw new Error('Article not found');
    }

    const detail = await fetchJSON(
      `${DEV_TO_API}/${article.id}`
    );

    return normalizeDetail(detail);
  } catch (error) {
    console.warn('[Blog] API detail unavailable:', error);
  }

  // FALLBACK: gunakan cache jika API gagal
  if (cachedPost) {
    console.log('[Blog] Using cached article fallback');

    return {
      ...cachedPost,
      description: cachedPost.excerpt || '',
      bodyHtml: '',
      bodyMarkdown: '',
      readTime: parseInt(cachedPost.readTime, 10) || 1,
      tags: [cachedPost.category || 'Tech'],
      author: cachedPost.author || normalizeAuthor(),
    };
  }

  throw new Error('Article not found');
};
