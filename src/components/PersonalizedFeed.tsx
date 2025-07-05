import React, { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard/NewsCard";
import { useFetchNews } from "@/hooks/useFetchNews";
import { Category, Source } from "@/types";
import CustomizeFeedPopup from "@/components/CustomizeFeedPopup/CustomizeFeedPopup";
import SkeletonCard from "./SkeltonCard/SkeltonCard";

const PersonalizedFeed: React.FC = () => {
  const [preferences, setPreferences] = useState<{
    sources: Source[];
    categories: Category[];
  }>({
    sources: [],
    categories: [],
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const storedPreferences = localStorage.getItem("feedPreferences");
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  const { data, isLoading, error } = useFetchNews({
    category: preferences.categories.length
      ? preferences.categories
      : undefined,
    source: preferences.sources.length ? preferences.sources : undefined,
  });

  const handleSavePreferences = (newPreferences: {
    sources: Source[];
    categories: Category[];
  }) => {
    setPreferences(newPreferences);
    localStorage.setItem("feedPreferences", JSON.stringify(newPreferences));
    setIsPopupOpen(false);
  };

  if (error) {
    return <div>Error fetching personalized feed. Please try again later.</div>;
  }

  return (
    <div className="personalized-feed">
      <div className="heading-wrapper">
        <h2>Your Personalized Feed</h2>
        <button
          className="customize-feed-button"
          onClick={() => setIsPopupOpen(true)}
        >
          Customize Feed
        </button>
      </div>

      <div className="news-list">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
           : (!data || data?.length === 0) ? (
            <div className="no-article-wrapper">
              <h1>No aricles found, Please check back later.</h1>
            </div>
           )
          : data?.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                url={article.url}
                publishedAt={article.publishedAt}
                author={article.author}
                description={article?.description}
              />
            ))}
      </div>

      {isPopupOpen && (
        <CustomizeFeedPopup
          preferences={preferences}
          onSave={handleSavePreferences}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default PersonalizedFeed;
