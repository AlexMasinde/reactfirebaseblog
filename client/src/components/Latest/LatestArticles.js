import React, { useEffect, useState } from "react";

import { database } from "../../firebase";

import "./LatestArticles.css";

import ArticleThumbnail from "../ArticleThumbnail/ArticleThumbnail";
import LatestArticle from "../LatestArticle/LatestArticle";

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  const [latestArticle, setLatestArticle] = useState();

  useEffect(() => {
    const unsubscribe = database.articles
      .orderBy("createdAt", "desc")
      .limit(6)
      .onSnapshot(
        (documentSnapshot) => {
          const formattedArticles = [];
          documentSnapshot.forEach((doc) => {
            formattedArticles.push(database.formatDocument(doc));
          });
          const findLatest = formattedArticles.slice(0, 1);
          setLatestArticle(findLatest);
          setArticles(formattedArticles);
        },
        (error) => {
          console.log(error);
          setError("Could not fetch articles. Please try again");
        }
      );
    return () => unsubscribe();
  }, []);

  return (
    <section className="latestArticles__container">
      {console.log(articles)}
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
