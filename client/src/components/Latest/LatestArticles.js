import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

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
          console.log(documentSnapshot);
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
    return () => unsubscribe();
  }, []);

  return (
    <section className="latestArticles__container">
      <div className="latestArticles__container-articles">
        {latestArticles.map((article) => {
          return <ArticleThumbnail key={nanoid()} article={article} />;
        })}
      </div>
    </section>
  );
}
