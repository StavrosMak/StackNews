"use client";
import { useFavorites } from "@/context/FavoritesContext";
import NewsCard from "@/components/NewsCard";
// import Navigation from "@/components/Navigation";
import Header from "../Header";
export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Favorite Articles
        </h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl">No favorite articles yet</p>
            <p className="mt-2">Click the bookmark icon on any article to add it to your favorites</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 