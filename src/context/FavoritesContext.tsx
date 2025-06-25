"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, FavoritesContextType } from '../types';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps): React.JSX.Element {
  const [favorites, setFavorites] = useState<Article[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites) as Article[];
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addFavorite = (article: Article): void => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.url === article.url)) {
        return [...prev, article];
      }
      return prev;
    });
  };

  const removeFavorite = (article: Article): void => {
    setFavorites(prev => prev.filter(fav => fav.url !== article.url));
  };

  const isFavorite = (article: Article): boolean => {
    return favorites.some(fav => fav.url === article.url);
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 