import React, { useEffect, useState } from "react";

import "./LatestArticles.css";

import { database } from "../../firebase";

import { useArticles } from "../../contexts/ArticlesContext";

import ArticleThumbnail from "../ArticleThumbnail/ArticleThumbnail";

export default function LatestArticles() {
  const { setLatestArticles, latestArticles } = useArticles();
  const [error, setError] = useState("");

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
          setLatestArticles(formattedArticles);
        },
        (error) => {
          console.log(error);
          setError("Could not fetch articles. Please try again");
        }
      );
    console.log("rendered");
    return () => unsubscribe();
  }, []);

  return (
    <section className="latestArticles__container">
      {console.log(latestArticles)}
      <div className="latestArticles__container-articles">
        {latestArticles.map((article, index) => {
          return <ArticleThumbnail key={index} article={article} />;
        })}
      </div>
    </section>
  );
}
