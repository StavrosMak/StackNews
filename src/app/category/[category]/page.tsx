"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import NewsCard from "@/components/NewsCard";
import { Article } from "../../../types";
import { fetchDevArticles } from "@/app/api/news";
import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

const devArticlesFetcher = async (category: string, page: number, pageSize: number) => {
  return await fetchDevArticles(category, page, pageSize);
};

export default function CategoryPage() {
  const { theme, toggleTheme } = useTheme();

  const params = useParams() as { category: string } | undefined;
  const category = params?.category?.toLowerCase() || "programming";

  const [page, setPage] = useState(1);
  const pageSize = 9;

  const { data: articles = [], error, isLoading } = useSWR<Article[]>(
    ["devArticles", category, page, pageSize],
    () => devArticlesFetcher(category, page, pageSize),
    { revalidateOnFocus: false }
  );

  const hasMore = articles.length === pageSize;

  return (
    <main className="w-full h-full mx-auto px-4 ">
      <h1 className="text-3xl font-bold mb-8 max-w-7xl mx-auto px-6 py-8 capitalize">
        {category} News
      </h1>

      {isLoading && (
        <div className="max-w-7xl m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} animate-pulse`}
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
      )}

      {error && (
        <div className="text-center text-red-500 p-4 bg-red-900/20 rounded-lg">
          Failed to fetch news. Please try again later.
        </div>
      )}

      {!isLoading && !error && (
        <>
          {articles.length === 0 ? (
            <div className="text-center text-gray-400 p-4">
              No articles found for this category.
            </div>
          ) : (
            <div className="grid max-w-7xl m-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <div
                  key={article.id || article.url || index}
                  className={` rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#e7f3f6] text-black'}`}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${page === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={!hasMore}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${!hasMore
              ? 'bg-gray-300 cursor-not-allowed'
              : theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
        >
          Next
        </button>
        <button
          onClick={toggleTheme}
          className="fixed cursor-pointer bottom-4 right-4 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-50"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ?
            <SunIcon className="w-6 h-6 text-yellow-400" /> :
            <MoonIcon className="w-6 h-6 text-white" />
          }
        </button>
      </div>
    </main>
  );
}
