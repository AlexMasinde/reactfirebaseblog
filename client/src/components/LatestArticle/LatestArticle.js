import React from "react";

export default function LatestArticle({ latestArticle }) {
  if (!latestArticle)
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  const article = latestArticle[0];
  const { title, category, tagline } = article;
  const { large } = article.coverImages;
  return (
    <section className="latestArticle__container">
      <div>
        <p>{category}</p>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>
      <div className="latestArticle__container-img">
        <img src={large} alt={title} />
      </div>
    </section>
  );
}
