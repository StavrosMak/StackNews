import { ApiError } from "@/types";

// Generic cached fetcher with proper typing
export const cachedFetcher = async <T = unknown>(key: string): Promise<T> => {
  try {
    // Check cache
    const cached = localStorage.getItem(key);
    const cachedTime = localStorage.getItem(`${key}_time`);
    
    // Use cache if less than 1 minute old
    if (cached && cachedTime && Date.now() - Number(cachedTime) < 60000) {
      return JSON.parse(cached) as T;
    }

    // Fetch new data
    const response = await fetch(key);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: T = await response.json();
    
    // Save to cache
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_time`, Date.now().toString());
    
    return data;
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
    console.error('Cached fetcher error:', apiError);
    throw apiError;
  }
};

// Specific cached fetcher for articles
export const cachedArticleFetcher = async (key: string) => {
  return cachedFetcher(key);
}; 