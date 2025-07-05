import { getArticlesFromGuardianAPI } from "@/services/guadrianApi";
import { getArticlesFromNewsOrgAPI } from "@/services/newsOrgApi";
import { getArticlesFromNewYorkTimesApi } from "@/services/nyTimesApi";
import { Category, News, Source } from "@/types";

interface NewsParams {
  query: string;
  date?: Date;
  category?: Category | Category[];
  source?: Source | Source[];
}

export const getNews = async ({
  query,
  date,
  category,
  source,
}: NewsParams): Promise<News[]> => {
  try {
    let sourcesToFetch: Source[] = [];
    let categoriesToFetch: Category[] = [];
    sourcesToFetch = source
      ? Array.isArray(source)
        ? source
        : [source]
      : [Source.NewsOrg, Source.NYT, Source.Guardian];

    categoriesToFetch = category
      ? Array.isArray(category)
        ? category
        : [category]
      : [];

    // If no categories specified, fetch without category filter
    if (categoriesToFetch.length === 0) {
      const newsPromises = sourcesToFetch.map((src) => {
        switch (src) {
          case Source.NewsOrg:
            return getArticlesFromNewsOrgAPI(query, date);
          case Source.NYT:
            return getArticlesFromNewYorkTimesApi(query, date);
          case Source.Guardian:
            return getArticlesFromGuardianAPI(query, date);
          default:
            return Promise.resolve([]);
        }
      });

      const results = await Promise.allSettled(newsPromises);
      return results
        .filter(
          (result): result is PromiseFulfilledResult<News[]> =>
            result.status === "fulfilled"
        )
        .flatMap((result) => result.value);
    }

    // Fetch with category filters
    const newsPromises = sourcesToFetch.flatMap((src) =>
      categoriesToFetch.map((cat) => {
        switch (src) {
          case Source.NewsOrg:
            return getArticlesFromNewsOrgAPI(query, date, cat);
          case Source.NYT:
            return getArticlesFromNewYorkTimesApi(query, date, cat);
          case Source.Guardian:
            return getArticlesFromGuardianAPI(query, date, cat);
          default:
            return Promise.resolve([]);
        }
      })
    );

    const results = await Promise.allSettled(newsPromises);
    return results
      .filter(
        (result): result is PromiseFulfilledResult<News[]> =>
          result.status === "fulfilled"
      )
      .flatMap((result) => result.value);
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};
