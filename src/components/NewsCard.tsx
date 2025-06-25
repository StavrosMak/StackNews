"use client";
import { Article } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import defaultImg from '../app/data/defImg.jpg'

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { theme } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/default-news.jpg';
  };

  const getReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <article className={`news-card group ${theme === 'dark' ? 'bg-gray-800' : 'bg-[#e7f3f6]'}`}>
      <div className="relative h-48 sm:h-56">
        {article.urlToImage && (
          <img
             src={article.urlToImage || defaultImg.src}
            alt={article.title}
            className="w-full h-full object-cover transform transition-transform duration-500"
            loading="lazy"
            onError={handleImageError}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          onClick={() => isFavorite(article) ? removeFavorite(article) : addFavorite(article)}
          className="absolute top-2 right-2 p-2  cursor-pointer rounded-full bg-white/10 backdrop-blur-sm hover:bg-red/20 transition-colors"
        >
          {isFavorite(article) ? (
            <BookmarkSolid className="w-5 h-5 text-yellow-400" />
          ) : (
            <BookmarkOutline className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="news-meta flex items-center justify-between mb-2">
          <span className={`news-category ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {article.category || 'Uncategorized'}
          </span>
          <span className={`news-date ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {article.publishedAt || 'No date'}
          </span>
        </div>
        <h2 className={`text-lg font-semibold line-clamp-2 mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium hover:underline ${
              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
            }`}
          >
            {article.title || 'Untitled Article'}
          </a>
        </h2>
        {article.description && (
          <p className={`text-sm line-clamp-3 mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {article.description}
          </p>
        )}
        <div className="news-source">
          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Source: {article.source?.name || 'Unknown Source'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {getReadingTime(article.description || "No description found")} min read
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium cursor-pointer hover:underline ${
              theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
            }`}
          >
            Read more
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
