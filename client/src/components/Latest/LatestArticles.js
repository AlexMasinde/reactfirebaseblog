import React, { useEffect, useState } from "react";

import { database } from "../../firebase";

import "./LatestArticles.css";

import ArticleThumbnail from "../ArticleThumbnail/ArticleThumbnail";
import LatestArticle from "../LatestArticle/LatestArticle";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [latestArticle, setLatestArticle] = useState();
  useEffect(() => {
    async function fetchArticles() {
      const data = await database.articles
        .orderBy("createdAt", "desc")
        .limit(6)
        .get();
      const results = data.docs;
      const formattedArticles = results.map((result) => {
        const formattedArticle = database.formatDocument(result);
        return formattedArticle;
      });

      const findLatest = formattedArticles.slice(0, 1);
      setLatestArticle(findLatest);
      setArticles(formattedArticles);
      console.log(findLatest);
    }
    fetchArticles();
  }, []);

  return (
    <section className="latestArticles__container">
      <div className="latestArticles__container-latest">
        <LatestArticle latestArticle={latestArticle} />
      </div>
      <div className="latestArticles__container-articles">
        {articles.map((article, index) => {
          return <ArticleThumbnail key={index} article={article} />;
        })}
      </div>
    </section>
  );
}
