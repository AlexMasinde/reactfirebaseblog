import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import "./CategoriesPage.css";

import { database } from "../../firebase";

import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import ArticleThumbnail from "../../components/ArticleThumbnail/ArticleThumbnail";
import Navigation from "../../components/Navigation/Navigation";
import fetchCount from "../../utils/fetchCount";

export default function CategoriesPage() {
  const [articles, setArticles] = useState();
  const [pages, setPages] = useState();
  const [loading, setLoading] = useState(false);
  const [latestDoc, setLatestDoc] = useState();
  const [lastArticle, setLastArticle] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [error, setError] = useState("");

  const { category } = useParams();

  const getArticles = useCallback(
    async function () {
      setLoading(true);
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
      setLoading(false);
    },
    [category, lastArticle]
  );

  const getPages = useCallback(
    async function () {
      const articlesPerPage = 3;
      const pagesArray = await fetchCount(category, articlesPerPage);
      setPages(pagesArray);
    },
    [category]
  );

  useEffect(() => {
    try {
      getArticles();
      getPages();
    } catch (err) {
      setLoading(false);
      setError("No articles found! Please reload the page to try again");
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
      {loading && <div className="latestArticles__loader"></div>}
      {articles && pages && !loading && (
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
              !loading &&
              pages.map((page) => {
                return (
                  <p
                    key={nanoid()}
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
      {!loading && articles && articles.length < 1 && (
        <div className="latestArticles__error">{`No articles on ${category} yet`}</div>
      )}
      {error && <div className="latestArticles__error">{error}</div>}
    </div>
  );
}
