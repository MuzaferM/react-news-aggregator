import { getNews } from "@/services/getNews";
import { Category, Source } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface UseFetchNewsProps {
  date?: string;
  category?: Category | Category[];
  source?: Source | Source[];
  searchQuery?: string;
}

/**
 * Custom hook to fetch news articles based on query parameters and personalization settings.
 * @param {string} [options.date] - The selected date to filter news articles.
 * @param {Category} [options.category] - The selected category to filter news articles.
 * @param {Source} [options.source] - The selected source to filter news articles.
 * @param {string} [options.searchQuery] - Search input to search articles by keyword.
 * @returns {Object} - The result of the React Query `useQuery` hook containing the news data, loading state, and error state.
 */
export function useFetchNews({
  date,
  category,
  source,
  searchQuery,
}: UseFetchNewsProps) {

  // Function to fetch news articles
  function fetchNews() {
    return getNews({
      query: searchQuery ?? 'any',
      date: date ? new Date(date) : undefined,
      category: category,
      source: source,
    });
  }

  return useQuery({
    queryKey: [
      "news",
      searchQuery,
      date,
      category,
      source,
    ],
    queryFn: fetchNews,
    staleTime: 0,
    gcTime: 0, 
    refetchOnMount: true, 
    refetchOnWindowFocus: true,
  });
}
