"use client";
import React, { useState, useCallback, useMemo } from "react";
import useSWR from "swr";
import { nytFetcher } from "@/lib/fetcher";
import { Article } from "../types";
import Link from "next/link";
import NewsCard from "./NewsCard";
import { useTheme } from "../context/ThemeContext";
import { categoryToSectionMap } from "@/constants/categories";
import { capitalizeFirst } from "@/utils/format";

const PAGE_SIZE = 17;

const CATEGORIES = Object.fromEntries(
  Object.entries(categoryToSectionMap).map(([label, section]) => [
    capitalizeFirst(label),
    section,
  ])
) as Record<string, string>;

const categoriesKeys = Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[];

const LoadingSkeleton = React.memo(({ theme }: { theme: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className={`rounded-xl overflow-hidden shadow-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } animate-pulse`}
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
));
LoadingSkeleton.displayName = "LoadingSkeleton";

const CategoryTabs: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>(
    categoriesKeys[0]
  );

  const queryParams = useMemo(
    () => ({
      query: CATEGORIES[selectedCategory] || "home",
      page: 1,
      pageSize: PAGE_SIZE,
    }),
    [selectedCategory]
  );

  const { data, error, isLoading } = useSWR(
    [queryParams.query, queryParams.page, queryParams.pageSize],
    nytFetcher,
    {
      dedupingInterval: 60000, // 1 minute
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const articles: Article[] = Array.isArray(data) ? data : data?.articles || [];

  const handleCategoryChange = useCallback((category: keyof typeof CATEGORIES) => {
    setSelectedCategory(category);
  }, []);

  return (
    <section
      className={`max-w-7xl mx-auto px-6 py-12 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      <h1 className="font-bold text-3xl mb-6 underline">General News</h1>

      {/* Category Tabs */}
      <div className="overflow-x-auto scrollbar-hide mb-8">
        <div className="flex gap-3 flex-wrap whitespace-nowrap">
          {categoriesKeys.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 cursor-pointer py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  selectedCategory === category
                    ? "bg-cyan-500 text-white border-cyan-500 shadow"
                    : theme === "dark"
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"
                }`}
              aria-pressed={selectedCategory === category}
              aria-current={selectedCategory === category ? "true" : undefined}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Section Heading */}
      <h3
        className={`text-2xl font-bold mb-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        } pb-2`}
      >
        {selectedCategory} News
      </h3>

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 p-4 bg-red-900/20 rounded-lg">
          Failed to fetch news. Please try again later.
        </div>
      )}

      {/* Loading State */}
      {isLoading && <LoadingSkeleton theme={theme} />}

      {/* News Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={article.id || article.url || index}
              className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 ${
                theme === "dark" ? "bg-gray-800" : "bg-[#e7f3f6]"
              }`}
            >
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && articles.length === 0 && (
        <div className="text-center text-gray-400 p-4">
          No articles found for this category.
        </div>
      )}

      {/* See More Link */}
      <div className="mt-8 text-center">
        <Link
          href={`/category/${queryParams.query}`}
          className={`inline-block px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            theme === "dark"
              ? "bg-cyan-500 text-white hover:bg-cyan-600"
              : "bg-cyan-500 text-white hover:bg-cyan-600"
          }`}
        >
          See more...
        </Link>
      </div>
    </section>
  );
};

export default CategoryTabs;
