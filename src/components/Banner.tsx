"use client";
import "keen-slider/keen-slider.min.css";
import defaultImg from "../app/data/defImg.jpg";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoritesContext";
import { Article } from "@/types";

interface Props {
  newsList: Article[];
}

const BannerSlider: React.FC<Props> = ({ newsList }) => {
  const { theme, toggleTheme } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const getImageUrl = (news: Article) => {
    return news.urlToImage ?? news.cover_image ?? news.social_image ?? defaultImg;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImg.src;
  };

  const renderCard = (article: Article, large = false) => (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative w-full h-full block ${large ? "h-[400px] sm:h-[500px] lg:h-[600px]" : "h-[200px]"
        } rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300`}
    >
      <img
        src={getImageUrl(article)?.toString() || defaultImg.src}
        alt={article.title}
        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

      <button
        onClick={(e) => {
          e.preventDefault(); // prevent navigation on bookmark click
          isFavorite(article) ? removeFavorite(article) : addFavorite(article);
        }}
        className={`absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-20 ${large ? "" : "top-2 right-2"
          }`}
      >
        {isFavorite(article) ? (
          <BookmarkSolid className={`${large ? "w-6 h-6" : "w-5 h-5"} text-yellow-400`} />
        ) : (
          <BookmarkOutline className={`${large ? "w-6 h-6" : "w-5 h-5"} text-white`} />
        )}
      </button>

      <div className={`absolute bottom-0 left-0 p-${large ? "8" : "4"} z-20`}>
        <h2
          className={`${large ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl"
            } font-bold leading-snug drop-shadow-lg text-cyan-400 line-clamp-2`}
        >
          {article.title}
        </h2>
        <p
          className={`${large ? "text-base sm:text-lg lg:text-xl" : "text-sm"
            } text-gray-200 mt-2 mb-4 line-clamp-2 drop-shadow-md`}
        >
          {article.description}
        </p>
        <div className={`flex items-center ${large ? "text-sm" : "text-xs"} text-gray-300`}>
          <span className="mr-3">{article.source?.name}</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </a>
  );




  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto w-full pt-8 mt-8">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
          {/* Large left (newsList[0]) */}
          <div className="row-span-2 col-span-1">{newsList[0] && renderCard(newsList[0], true)}</div>

          {/* Small right top (newsList[2]) */}
          <div className="row-span-1 col-span-1">{newsList[2] && renderCard(newsList[2])}</div>

          {/* Large right bottom (newsList[1]) */}
          <div className="row-span-2 col-span-1">{newsList[1] && renderCard(newsList[1])}</div>

          {/* Small bottom right (newsList[3]) */}
          <div className="row-span-1 col-span-1">{newsList[3] && renderCard(newsList[3])}</div>
        </div>
      </div>

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed cursor-pointer bottom-4 right-4 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-50"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <SunIcon className="w-6 h-6 text-yellow-400" />
        ) : (
          <MoonIcon className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default BannerSlider;
