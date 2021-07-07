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
  const { title, category, tagline } = article;
  const trimmedTitle = title.length > 55 ? title.substr(0, 54) + "..." : title;
  const trimmedTagline =
    tagline.length > 200 ? tagline.substr(0, 199) + "..." : tagline;
  const { large } = article.coverImages;
  return (
    <div className="latestArticle__container">
      <div className="latestArticle__container-text">
        <h6>{category.toUpperCase()}</h6>
        <h1>{trimmedTitle}</h1>
        <p>{trimmedTagline}</p>
        <p style={{ marginTop: "0.8rem" }}>John Doe</p>
      </div>
      <div className="latestArticle__container-img">
        <img src={large} alt={title} />
      </div>
    </div>
  );
}
