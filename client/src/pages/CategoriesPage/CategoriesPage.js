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
  const [pages, setPages] = useState();
  const [activePage, setActivePage] = useState(1);
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

  const getPages = useCallback(
    async function () {
      const data = await database.counter.doc("B2ZJVxfS4FNo31PGf2ew").get();
      const numberOfPages = Math.ceil(data.get(category) / 3);
      const pagesArray = [];
      for (let i = 1; i <= numberOfPages; i++) {
        pagesArray.push(i);
      }
      setPages(pagesArray);
    },
    [category]
  );

  useEffect(() => {
    try {
      getArticles();
      getPages();
    } catch (err) {
      console.log(err);
    }
  }, [getArticles, getPages]);

  function nextPage(page) {
    setActivePage(page);
    if (page === 1) {
      setLastArticle(null);
    } else {
      setLastArticle(latestDoc);
    }
  }

  return (
    <div className="categoriesPage">
      {console.log(pages)}
      <Navigation />
      <CategoriesNav />
      {!articles ||
        (!pages && (
          <div>
            <p>Loading...</p>
          </div>
        ))}
      {articles && pages && (
        <div className="categoriesPage__container">
          <p>{category.toUpperCase()}</p>
          <div className="categoriesPage__grid">
            {articles &&
              articles.map((article) => {
                return <ArticleThumbnail key={nanoid()} article={article} />;
              })}
          </div>
          <div className="categoriesPage__pages">
            {pages.length > 1 &&
              pages.map((page) => {
                return (
                  <p
                    onClick={() => nextPage(page)}
                    className={page === activePage ? "activepage" : ""}
                  >
                    {page}
                  </p>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
