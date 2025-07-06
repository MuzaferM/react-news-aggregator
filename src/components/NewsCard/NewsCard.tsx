import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { format } from "date-fns";
import "./NewsCard.scss";

interface NewsCardProps {
  title: string;
  url: string;
  publishedAt: string;
  author?: string | null;
  description?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  url,
  publishedAt,
  author,
  description,
}) => {
  const formattedDate = format(new Date(publishedAt), 'MMMM d, yyyy');
  
  return (
    <div className="news-card">
      <div className="news-content">
        <h3 className="news-title">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p className="news-description">
          {description && description.length > 300
            ? description.substring(0, 300) + "..."
            : description}
        </p>
        <div className="news-meta">
          <span className="news-date">
            {formattedDate}
          </span>
          <span className="news-author">
            {author ? `By ${author}` : "By Unknown"}
          </span>
        </div>
      </div>
      <div className="news-actions">
        <a
          href={url}
          className="news-read-more"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
