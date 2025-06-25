// Base types for common properties
export interface BaseArticle {
  id: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  author: string | null;
  content: string | null;
  publishedAt: string;
  source: Source;
  category: string;
}

// Source interface
export interface Source {
  id: string | null;
  name: string;
}

// NewsAPI specific types
export interface NewsApiArticle extends BaseArticle {
  // NewsAPI specific properties
  cover_image?: string | null;
  social_image?: string | null;
}

// Dev.to API specific types
export interface DevToUser {
  name: string;
  username: string;
}

export interface DevToOrganization {
  name: string;
  username: string;
}

export interface DevToArticle {
  id: number;
  title: string;
  description: string | null;
  url: string;
  cover_image: string | null;
  social_image: string | null;
  published_at: string;
  body_markdown: string;
  tag_list: string[];
  user: DevToUser;
  organization?: DevToOrganization | null;
}

// NYT API specific types
export interface NYTApiArticle {
  url: string;
  title: string;
  abstract: string;
  byline: string;
  published_date: string;
  multimedia?: Array<{ url: string }>;
}

// Unified Article type for the application
export interface Article extends BaseArticle {
  // Additional properties that might be present
  cover_image?: string | null;
  social_image?: string | null;
}

// API Response types
export interface NewsApiResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsApiArticle[];
  message?: string;
}

export type DevToApiResponse = DevToArticle[];

export interface NYTApiResponse {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: NYTApiArticle[];
}

// Category types
export type Category = 'all' |'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

// Cache types
export interface CacheItem<T = unknown> {
  data: T;
  timestamp: number;
}

export interface CacheStore {
  [key: string]: CacheItem;
}

// Specific cache types for better type safety
export type ArticleCacheItem = CacheItem<Article[]>;
export type ArticleCacheStore = Record<string, ArticleCacheItem>;

// State management types
export interface NewsState {
  news: Article[];
  filteredNews: Article[];
  searchQuery: string;
  selectedCategory: Category;
  loading: boolean;
  error: string | null;
  cache: ArticleCacheStore;
}

// API function return types
export interface FetchResult<T = Article> {
  articles: T[];
  totalResults: number;
}

// Component prop types
export interface NewsCardProps {
  article: Article;
  onFavoriteToggle?: (article: Article) => void;
  isFavorite?: boolean;
}

export interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  categories: Category[];
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Favorites context types
export interface FavoritesContextType {
  favorites: Article[];
  addFavorite: (article: Article) => void;
  removeFavorite: (article: Article) => void;
  isFavorite: (article: Article) => boolean;
}

// Utility types
export type ApiSource = 'newsapi' | 'devto' | 'nytimes';

export interface ApiConfig {
  source: ApiSource;
  category: string;
  page: number;
  pageSize: number;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Formatted date type
export type FormattedDate = string;

// Environment variables type
export interface EnvironmentVariables {
  NEXT_PUBLIC_NEWS_API_KEY: string;
  NEXT_PUBLIC_NYT_API_KEY: string;
} 