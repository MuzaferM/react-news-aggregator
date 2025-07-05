import React from "react";
import "./SkeltonCard.scss";

const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-meta"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
