
const API_BASE = 'http://localhost:1337/api';
const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

function getToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem('jwt');
}

async function apiFetch(pathname, { searchParams, ...options } = {}) {
  const token = getToken();
  const url = new URL(pathname.startsWith('http') ? pathname : `${API_BASE}/${pathname}`);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        return;
      }

      url.searchParams.append(key, value);
    });
  }

  const headers = { ...DEFAULT_HEADERS, ...(options.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    error.details = await response.text().catch(() => null);
    throw error;
  }

  return response.json();
}

const statsDemo = {
  inProgress: 3,
  completed: 12,
  categoriesCompleted: 5,
  achievements: 2,
};

const categoriesDemo = [
  { id: 1, title: 'Math Basics', iconUrl: '/icons/math.svg' },
  { id: 2, title: 'Science Lab', iconUrl: '/icons/science.svg' },
  { id: 3, title: 'Reading', iconUrl: '/icons/reading.svg' },
  { id: 4, title: 'Art Studio', iconUrl: '/icons/art.svg' },
];

export async function getOverview() {
  return {
    overviewText: 'Keep track of your learning journey.',
    notifications: [
      { id: 1, text: 'New lesson assigned', icon: 'bell', type: 'info' },
      { id: 2, text: 'Achievement unlocked', icon: 'trophy', type: 'success' },
      { id: 3, text: 'Reminder: Finish homework', icon: 'journal', type: 'warning' },
    ],
  };
}

export async function getStats() {
  return statsDemo;
}

export async function getCategories() {
  try {
    const data = await apiFetch('categories', {
      searchParams: {
        sort: 'createdAt:desc',
      },
    });

    return Array.isArray(data?.data)
      ? data.data.map((entry) => ({
          id: entry.id,
          title: entry?.attributes?.title || `Category ${entry.id}`,
          iconUrl: entry?.attributes?.icon?.data?.attributes?.url || null,
        }))
      : categoriesDemo;
  } catch (error) {
    console.error('Failed to fetch categories from Strapi:', error, error.details);
    return categoriesDemo;
  }
}

function normalizeLesson(entry) {
  const attributes = entry?.attributes || {};
  const category = attributes.category?.data?.attributes?.title || '';
  const authors = attributes.authors?.data || [];
  const instructor = authors[0]?.attributes?.name || '';
  const duration = attributes.durationMinutes;
  const status = attributes.publishedAt ? 'completed' : 'active';

  return {
    id: entry?.id ?? attributes.id ?? Math.random().toString(36).slice(2),
    name: attributes.title || attributes.slug || 'Lesson',
    date: attributes.createdAt || attributes.updatedAt || new Date().toISOString(),
    duration: typeof duration === 'number' ? `${duration} min` : '',
    category,
    instructor,
    child: (attributes.locale || '').toUpperCase(),
    locale: attributes.locale || 'en',
    status,
  };
}

export async function getLessons(params = {}) {
  const { status, locale = 'all' } = params;

  try {
    const data = await apiFetch('lessons', {
      searchParams: {
        populate: 'category,authors',
        sort: 'createdAt:desc',
        locale: locale === 'all' ? 'all' : locale,
      },
    });

    let lessons = Array.isArray(data?.data) ? data.data.map(normalizeLesson) : [];

    if (locale !== 'all') {
      lessons = lessons.filter((lesson) => lesson.locale === locale);
    }

    if (status) {
      lessons = lessons.filter((lesson) => lesson.status === status);
    }

    return lessons;
  } catch (error) {
    console.error('Failed to fetch lessons from Strapi:', error, error.details);
    return [];
  }
}
