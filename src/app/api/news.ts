import axios from "axios";
import { formatDate, capitalizeFirst } from "@/utils/format";
import { techTags } from "@/constants/tags";
import { categoryToSectionMap } from "@/constants/categories";
import { handleApiError } from "@/utils/errorHandling";
import {
  Article,
  NewsApiArticle,
  DevToArticle,
  NYTApiArticle,
  FetchResult,
} from "../../types";

const API_URL = process.env.NEXT_PUBLIC_NEWS_API_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY as string;
const NYT_API_URL = process.env.NEXT_PUBLIC_NYT_API_URL as string;
const NYT_API_KEY = process.env.NEXT_PUBLIC_NYT_API_KEY as string;

export const fetchArticles = async (
  categoryQuery: string,
  page: number = 1,
  pageSize: number | null = 50
): Promise<FetchResult<Article>> => {
  try {
    const normalizedCategory = categoryQuery?.toLowerCase() || "general";
    const formattedCategory = capitalizeFirst(normalizedCategory);
    const size = pageSize ?? 50;

    const response = await axios.get(API_URL, {
      params: {
        category: normalizedCategory,
        apiKey: API_KEY,
        pageSize: size,
        page,
      },
    });

    const formattedArticles: Article[] = response.data.articles.map((article: NewsApiArticle) => ({
      ...article,
      publishedAt: formatDate(article.publishedAt),
      category: formattedCategory,
    }));

    return {
      articles: formattedArticles,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    handleApiError(error, "NewsAPI");
    return {
      articles: [],
      totalResults: 0,
    };
  }
};

export const fetchDevArticles = async (
  category: string,
  page: number = 1,
  pageSize: number = 9
): Promise<Article[]> => {
  try {
    const normalizedCategory = category?.toLowerCase() || "programming";

    const response = await axios.get<DevToArticle[]>("https://dev.to/api/articles", {
      params: {
        tag: normalizedCategory,
        page,
        per_page: pageSize * 2, // Fetch more to account for filtering
      },
    });

    const filteredArticles: Article[] = response.data
      .filter((article: DevToArticle) =>
        article.tag_list.some(tag => techTags.includes(tag.toLowerCase()))
      )
      .slice(0, pageSize)
      .map((article: DevToArticle) => {
        const formattedDate = formatDate(article.published_at);

        const techTag = article.tag_list.find(tag => techTags.includes(tag.toLowerCase()));
        const articleCategory = techTag ? capitalizeFirst(techTag) : "Technology";

        return {
          id: article.id.toString(),
          source: {
            id: article.organization?.username || article.user.username,
            name: article.organization?.name || article.user.name || "Dev.to",
          },
          author: article.user.name,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.cover_image || article.social_image || null,
          cover_image: article.cover_image || null,
          social_image: article.social_image || null,
          publishedAt: formattedDate,
          content: article.body_markdown,
          category: articleCategory,
        };
      });

    return filteredArticles;
  } catch (error) {
    handleApiError(error, "Dev.to");
    return [];
  }
};
const isValidUrl = (url: string | null | undefined): url is string => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


export const fetchNYTimesArticles = async (
  category: string,
  page: number = 1,
  pageSize: number = 10
): Promise<FetchResult<Article>> => {
  try {
    const normalizedCategory = category.toLowerCase();
    const section = categoryToSectionMap[normalizedCategory] || "home";
    const formattedCategory = capitalizeFirst(section);

    const response = await axios.get(`${NYT_API_URL}/${section}.json`, {
      params: { "api-key": NYT_API_KEY },
    });

    const allArticles = response.data.results;

    const articles: Article[] = allArticles
      .filter((item: NYTApiArticle) => isValidUrl(item.url))
      .map((item: NYTApiArticle) => ({
        id: item.url,
        source: {
          id: null,
          name: "NYTimes",
        },
        author: item.byline || null,
        title: item.title,
        description: item.abstract || null,
        url: item.url, // guaranteed valid by filter
        category: formattedCategory,
        urlToImage: item.multimedia?.[0]?.url ?? null,
        publishedAt: formatDate(item.published_date),
        content: null,
      }));

    const startIndex = (page - 1) * pageSize;
    const pagedArticles = articles.slice(startIndex, startIndex + pageSize);

    return {
      articles: pagedArticles,
      totalResults: articles.length,
    };
  } catch (error) {
    handleApiError(error, "NYTimes");
    return { articles: [], totalResults: 0 };
  }
};
