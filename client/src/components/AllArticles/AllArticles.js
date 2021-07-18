import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { database } from "../../firebase";

import { useArticles } from "../../contexts/ArticlesContext";

import fetchCount from "../../utils/fetchCount";

import ArticleThumbnail from "../ArticleThumbnail/ArticleThumbnail";

import "./AllArticles.css";

export default function AllArticles() {
  const [articles, setArticles] = useState();
  const [pages, setPages] = useState();
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState();
  const [lastArticle, setLastArticle] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [error, setError] = useState("");

  const { latestArticles } = useArticles();

  useEffect(() => {
    async function getArticles() {
      try {
        setLoading(true);
        let query = database.articles.limit(12);
        if (lastArticle) {
          query = database.articles.startAfter(lastArticle).limit(12);
        }
        const data = await query.get();
        const category = "allArticles";
        const articlesPerPage = 12;
        const pagesArray = await fetchCount(category, articlesPerPage);
        setPages(pagesArray);
        setLastDoc(data.docs[data.docs.length - 1]);
        const formattedArticles = [];
        data.docs.forEach((doc) => {
          formattedArticles.push(database.formatDocument(doc));
        });
        setArticles(formattedArticles);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(
          "Cannot retrieve articles! Please refresh the page to try again"
        );
        setLoading(false);
      }
    }
    getArticles();
  }, [lastArticle]);

  function nextPage(page) {
    setActivePage(page);
    if (page === 1) {
      setLastArticle(null);
    } else {
      setLastArticle(lastDoc);
    }
  }

  return (
    <div className="allarticles__container">
      {loading && latestArticles && <div className="allarticles__loader"></div>}
      {articles && !loading && (
        <div className="allarticles__content">
          <p className="allarticles__title">ALL ARTICLES</p>
          <div className="allarticles__grid">
            {articles.map((article) => {
              return <ArticleThumbnail article={article} />;
            })}
          </div>
        </div>
      )}
      {!loading && pages && pages.length > 1 && (
        <div className="allarticles__pages">
          {pages.map((page) => {
            return (
              <p
                className={page === activePage ? "allarticles__activepage" : ""}
                key={nanoid()}
                onClick={() => nextPage(page)}
              >
                {page}
              </p>
            );
          })}
        </div>
      )}
      {error && (
        <div className="allarticles__error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
