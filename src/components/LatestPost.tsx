"use client";
import useSWR from "swr";
import { Article, FetchResult } from "../types";
import NewsCard from "./NewsCard";
import { newsFetcher } from "@/lib/fetcher";
import { useTheme } from '../context/ThemeContext';

const LatestPosts = () => {
  const { theme } = useTheme();
  const {
    data: newsData,
    error: newsError,
    isLoading: newsLoading,
  } = useSWR("news:technology:1:6", newsFetcher);

  const {
    data: devData,
    error: devError,
    isLoading: devLoading,
  } = useSWR("dev:latest:1:6", newsFetcher);

  // Handle different return types from fetcher
  const articles: Article[] = Array.isArray(newsData) 
    ? newsData 
    : (newsData as FetchResult<Article>)?.articles || [];

  const devArticles: Article[] = Array.isArray(devData) 
    ? devData 
    : (devData as FetchResult<Article>)?.articles || [];

  const isLoading = newsLoading || devLoading;
  const hasError = newsError || devError;

  if (hasError) return <div className="text-red-500 text-center p-4">Error loading articles.</div>;
  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <h2 className={`text-3xl font-bold mt-12 mb-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
        Latest Dev News
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg bg-gray-800 animate-pulse"
          >
            <div className="h-48 bg-gray-700 w-full" />
            <div className="p-4 space-y-4">
              <div className="h-4 w-3/4 bg-gray-700 rounded" />
              <div className="h-3 w-full bg-gray-700 rounded" />
              <div className="h-3 w-2/3 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={`max-w-7xl mx-auto px-6 py-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h2 className={`text-3xl font-bold mt-12 mb-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
        Latest Dev News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devArticles.map((article, index) => (
          <div key={article.id || article.url || index} className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-800' : 'bg-[#e7f3f6]'}`}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>
      <h2 id='latestGenNews' className={`text-3xl font-bold mt-12 mb-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
        Latest General Tech News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={article.id || article.url || index} className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-800' : 'bg-[#e7f3f6]'}`}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
