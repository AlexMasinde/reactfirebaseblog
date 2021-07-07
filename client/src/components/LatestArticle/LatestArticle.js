import React from "react";

import "./LatestArticle.css";

export default function LatestArticle({ latestArticle }) {
  if (!latestArticle)
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  const article = latestArticle[0];
  const { title, category } = article;
  const { large } = article.coverImages;
  return (
    <div className="latestArticle__container">
      <div className="latestArticle__container-text">
        <h6>{category.toUpperCase()}</h6>
        <h1>{title}</h1>
        <p>
          This is Alex's attempt to become one of the best React and web
          developers in the world. So help me god
        </p>
        <p style={{ marginTop: "0.8rem" }}>Alex Masinde</p>
      </div>
      <div className="latestArticle__container-img">
        <img src={large} alt={title} />
      </div>
    </div>
  );
}
