import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import "./CategoriesPage.css";

import { database } from "../../firebase";

import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import ArticleThumbnail from "../../components/ArticleThumbnail/ArticleThumbnail";
import Navigation from "../../components/Navigation/Navigation";

export default function CategoriesPage() {
  const [articles, setArticles] = useState();
  const [latestDoc, setLatestDoc] = useState();
  const [lastArticle, setLastArticle] = useState(null);
  const [count, setCount] = useState(null);
  const { category } = useParams();

  const getArticles = useCallback(
    async function () {
      let query = database.articles
        .where("category", "==", category)
        .orderBy("createdAt", "desc")
        .limit(3);

      if (lastArticle) {
        query = database.articles
          .where("category", "==", category)
          .orderBy("createdAt", "desc")
          .startAfter(lastArticle)
          .limit(3);
      }

      const data = await query.get();
      setLatestDoc(data.docs[data.docs.length - 1]);
      const formattedArticles = [];
      data.docs.forEach((doc) => {
        formattedArticles.push(database.formatDocument(doc));
      });
      setArticles(formattedArticles);
    },
    [category, lastArticle]
  );

  const getCount = useCallback(
    async function () {
      const data = await database.counter.doc("B2ZJVxfS4FNo31PGf2ew").get();
      console.log(data.get(category));
      console.log(category);
      setCount(data.get(category));
    },
    [category]
  );

  useEffect(() => {
    getArticles();
    console.log("ran getArticles");
  }, [getArticles]);

  useEffect(() => {
    getCount();
    console.log("ran getCount");
  }, [getCount]);

  function nextPage() {
    setLastArticle(latestDoc);
  }

  return (
    <div className="categoriesPage">
      <Navigation />
      <CategoriesNav />
      <div></div>
      <div className="categoriesPage__container">
        <p>{category.toUpperCase()}</p>
        <div className="categoriesPage__grid">
          {articles &&
            articles.map((article) => {
              return <ArticleThumbnail key={nanoid()} article={article} />;
            })}
        </div>
      </div>
      <button onClick={nextPage}>Paginate</button>
    </div>
  );
}
