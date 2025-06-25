"use client";
import LatestPosts from "@/components/LatestPost";
import CategoryTabs from "@/components/CategoryTabs";
import Header from "./Header";
import BannerSlider from "@/components/Banner";
import useSWR from "swr";
import { newsFetcher } from "@/lib/fetcher";
import { Article } from "@/types";

export default function Home() {
  const { data, error, isLoading } = useSWR("header:technology:1:50", newsFetcher);
  
  // Get articles from the data
  const articles: Article[] = Array.isArray(data) 
    ? data 
    : data?.articles || [];

  return (
    <main className="w-full mx-auto px-4">
   
      <Header />
    {isLoading ?
    (
      
        <div className="max-w-7xl mx-auto w-full pt-8 mt-8">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[200px] sm:h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl" />
            ))}
          </div>
        </div>)
        :(
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        { error ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <h2 className="text-2xl font-bold mb-4">Error Loading News</h2>
            <p>Please try again later</p>
          </div>
        ) : (
          <BannerSlider newsList={articles.slice(0, 5)} />
        )}
      </div>
)}
      <div id="latest">
        <LatestPosts />
      </div>
      <div id="categories">
        <CategoryTabs />
      </div>
    </main>
  );
}
