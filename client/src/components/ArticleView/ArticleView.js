import React from "react";

import "./ArticleView.css";

import Preview from "../Preview/Preview";

export default function ArticleView(props) {
  console.log(props);
  const article = props.article;
  const { title } = article;
  const { large } = article.coverImages;
  return (
    <div className="articleView__container">
      <div className="articleView__container-image">
        <img src={large} alt={title} loading="lazy" />
      </div>
      <Preview article={article} />
    </div>
  );
}
