// fetcher.ts
import { fetchDevArticles, fetchNYTimesArticles, fetchArticles } from "@/app/api/news";
import { FetchResult, Article, ApiError, CacheItem } from "@/types";

// Type for fetcher key parsing
interface FetcherKey {
  type: 'news' | 'dev' | 'header';
  category: string;
  page: number;
  pageSize: number;
}

// Parse fetcher key into structured object
const parseFetcherKey = (key: string): FetcherKey => {
  const [type, category, pageStr, pageSizeStr] = key.split(":");
  return {
    type: type as FetcherKey['type'],
    category,
    page: parseInt(pageStr, 10) || 1,
    pageSize: pageSizeStr ? parseInt(pageSizeStr, 10) : 10
  };
};

// Cache utility functions
const getCacheKey = (type: string, category: string, page: number, pageSize: number): string => {
  return `${type}:${category}:${page}:${pageSize}`;
};

const getCachedData = <T = unknown>(cacheKey: string): T | null => {
  try {
    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}_time`);
    
    // Use cache if less than 1 minute old
    if (cached && cachedTime && Date.now() - Number(cachedTime) < 60000) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error('Error reading from cache:', error);
  }
  return null;
};

const setCachedData = <T = unknown>(cacheKey: string, data: T): void => {
  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};

// For tabs - uses SWR's built-in caching
export const nytFetcher = async ([category, page, pageSize]: [string, number, number]): Promise<FetchResult<Article>> => {
  return fetchNYTimesArticles(category, page, pageSize);
};

// For initial loads - uses localStorage caching
export const newsFetcher = async (key: string): Promise<FetchResult<Article> | Article[]> => {
  const { type, category, page, pageSize } = parseFetcherKey(key);
  
  // Check cache
  const cacheKey = getCacheKey(type, category, page, pageSize);
  const cached = getCachedData(cacheKey);
  
  if (cached) {
    return cached as FetchResult<Article> | Article[];
  }

  let data: FetchResult<Article> | Article[];
  
  try {
    switch (type) {
      case "news":
        data = await fetchArticles(category, page, pageSize);
        break;
      case "dev":
        data = await fetchDevArticles(category, page, pageSize || 9);
        break;
      case "header":
        data = await fetchArticles(category, page, pageSize);
        break;
      default:
        throw new Error(`Invalid fetcher type: ${type}`);
    }

    // Save to cache
    setCachedData(cacheKey, data);
    
    return data;
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    console.error('Fetcher error:', apiError);
    throw apiError;
  }
};

// Specific cache types for better type safety
export type ArticleCacheItem = CacheItem<Article[]>;
export type ArticleCacheStore = Record<string, ArticleCacheItem>;
