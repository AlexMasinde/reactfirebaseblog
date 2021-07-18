import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import "./LatestArticles.css";

import { database } from "../../firebase";

import { useArticles } from "../../contexts/ArticlesContext";

import ArticleThumbnail from "../ArticleThumbnail/ArticleThumbnail";

export default function LatestArticles() {
  const { setLatestArticles, latestArticles } = useArticles();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          setError("Could not fetch articles. Please reload to try again");
        }
      );
    console.log("run");
    return () => unsubscribe();
  }, []);

  return (
    <section className="latestArticles__container">
      {loading && <div className="latestArticles__loader"></div>}
      {!loading && latestArticles && !error && (
        <div>
          <p className="latest__title">LATEST ARTICLES</p>
          <div className="latestArticles__container-articles">
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
    </section>
  );
}
