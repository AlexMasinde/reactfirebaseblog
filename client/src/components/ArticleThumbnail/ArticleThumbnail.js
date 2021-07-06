import React from "react";
import "./ArticleThumbnail.css";

export default function ArticleThumbnail({ article }) {
  const category = article.category.toUpperCase();
  const title = article.title;
  const { small } = article.coverImages;
  return (
    <div className="thumbnail__container">
      <div className="thumbnail__container-text">
        <p>{category}</p>
        <h2>{title}</h2>
      </div>
      <img src={small} alt="article pictorial synopsis" />
    </div>
  );
}
