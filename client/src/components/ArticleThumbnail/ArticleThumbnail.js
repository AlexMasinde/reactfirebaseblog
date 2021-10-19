import React from "react";
import { useHistory } from "react-router-dom";

import ArticleThumbnailStyles from "./ArticleThumbnail.module.css";

export default function ArticleThumbnail({ article }) {
  const category = article.category.toUpperCase();
  const title = article.title;
  const tagline = article.tagline;
  const trimmedTitle = title.length > 40 ? title.substr(0, 40) + "..." : title;
  const trimmedTagline =
    tagline.length > 200 ? tagline.substr(0, 200) + "..." : tagline;
  const { small } = article.coverImages;

  const history = useHistory();

  function viewArticle() {
    history.push(`/article/${article.id}/${article.userId}`);
  }

  return (
    <div onClick={viewArticle} className={ArticleThumbnailStyles.container}>
      <div className={ArticleThumbnailStyles.image}>
        <img src={small} alt={title} loading="lazy" />
      </div>
      <div className={ArticleThumbnailStyles.text}>
        <p className={ArticleThumbnailStyles.category}>{category}</p>
        <h2>{trimmedTitle}</h2>
        <span>Leslie Pena . April 25, 2012</span>
        <p className="tagline-text">{trimmedTagline}</p>
      </div>
    </div>
  );
}
