import React from "react";
import { useHistory } from "react-router-dom";

import "./ArticleThumbnail.css";

export default function ArticleThumbnail({ article }) {
  const category = article.category.toUpperCase();
  const title = article.title;
  const trimmedTitle = title.length > 55 ? title.substr(0, 54) + "..." : title;
  const { small } = article.coverImages;

  const history = useHistory();

  function viewArticle() {
    history.push(`/article/${article.id}`);
  }

  return (
    <div onClick={viewArticle} className="thumbnail__container">
      <img src={small} alt="article pictorial synopsis" />
      <div className="thumbnail__container-text">
        <p>{category}</p>
        <h2>{trimmedTitle}</h2>
      </div>
    </div>
  );
}
