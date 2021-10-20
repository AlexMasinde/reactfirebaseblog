import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { database } from "../../firebase";

import { useArticles } from "../../contexts/ArticlesContext";

import ArticleThumbnail from "../ArticleThumbnail/ArticleThumbnail";

import LatestArticlesStyles from "./LatestArticles.module.css";

export default function LatestArticles() {
  const { setLatestArticles, latestArticles } = useArticles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const rawArticles = await database.articles
          .orderBy("createdAt", "desc")
          .limit(4)
          .get();
        const formattedArticles = rawArticles.docs.map((article) => {
          return database.formatDocument(article);
        });
        setLatestArticles(formattedArticles);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className={LatestArticlesStyles.container}>
      {loading && <div className="latestArticles__loader"></div>}
      {!loading && latestArticles && !error && (
        <div>
          <p className={LatestArticlesStyles.title}>Latest Articles</p>
          <div className={LatestArticlesStyles.articles}>
            {latestArticles.map((article) => {
              return <ArticleThumbnail key={nanoid()} article={article} />;
            })}
          </div>
        </div>
      )}
      {error && (
        <div className="latestArticles__error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
