import { useState, useEffect, useCallback } from 'react';
import NewsCard from './components/NewsCard';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ThemeToggle } from './components/ThemeToggle';
import { Article, Category, NewsApiResponse, NewsState } from './types';
import './App.css';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const initialState: NewsState = {
  news: [],
  filteredNews: [],
  searchQuery: '',
  selectedCategory: 'all',
  loading: true,
  error: null,
  cache: {}
};

function App() {
  const [state, setState] = useState<NewsState>(initialState);

  const fetchNews = useCallback(async (category: Category = 'all') => {
    if (!API_KEY) {
      setState(prev => ({
        ...prev,
        error: 'News API key is not configured. Please check your environment variables.',
        loading: false
      }));
      return;
    }

    const cacheKey = category;
    const cachedData = state.cache[cacheKey];
    const now = Date.now();

    if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      setState(prev => ({
        ...prev,
        news: cachedData.data,
        filteredNews: cachedData.data,
        loading: false
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const url = category === 'all'
        ? `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }

      const data: NewsApiResponse = await response.json();

      if (data.status !== 'ok') {
        throw new Error(data.message || 'Failed to fetch news');
      }

      const newsData: Article[] = data.articles.map((article) => ({
        id: article.url,
        title: article.title,
        description: article.description ?? null,
        url: article.url,
        urlToImage: article.urlToImage ?? null,
        author: article.author ?? null,
        content: article.content ?? null,
        cover_image: article.cover_image ?? null,
        social_image: article.social_image ?? null,
        publishedAt: new Date(article.publishedAt).toLocaleDateString(),
        source: {
          id: article.source.id ?? null,
          name: article.source.name
        },
        category: category
      }));

      setState(prev => ({
        ...prev,
        cache: {
          ...prev.cache,
          [cacheKey]: {
            data: newsData,
            timestamp: now
          }
        },
        news: newsData,
        filteredNews: newsData,
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred while fetching news',
        news: [],
        filteredNews: [],
        loading: false
      }));
    }
  }, [state.cache]);

  useEffect(() => {
    fetchNews(state.selectedCategory);
  }, [state.selectedCategory, fetchNews]);

  useEffect(() => {
    const filtered = state.news.filter(article =>
      article.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      (article.description?.toLowerCase().includes(state.searchQuery.toLowerCase()) ?? false)
    );
    setState(prev => ({ ...prev, filteredNews: filtered }));
  }, [state.searchQuery, state.news]);

  const handleCategoryChange = (category: Category) => {
    setState(prev => ({
      ...prev,
      selectedCategory: category,
      searchQuery: ''
    }));
  };

  const handleSearchChange = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>StackFeed</h1>
        <ThemeToggle />
      </header>
      <div className="filters">
        <SearchBar value={state.searchQuery} onChange={handleSearchChange} />
        <CategoryFilter
          selectedCategory={state.selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      {state.loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading news...</p>
        </div>
      )}
      {state.error && (
        <div className="error-container">
          <p className="error-message">{state.error}</p>
          <button onClick={() => fetchNews(state.selectedCategory)} className="retry-button">
            Retry
          </button>
        </div>
      )}
      {!state.loading && !state.error && state.filteredNews.length === 0 && (
        <div className="no-results">
          <p>No news articles found. Try adjusting your search or category.</p>
        </div>
      )}
      <div className="news-grid">
        {state.filteredNews.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default App; 