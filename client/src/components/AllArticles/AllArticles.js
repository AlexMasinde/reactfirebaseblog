import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { database } from "../../firebase";
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

  useEffect(() => {
    async function getArticles() {
      try {
        setLoading(true);
        const query = database.articles.limit(3);
        if (lastArticle) {
          query = database.articles.startAfter(lastArticle).limit(3);
        }
        const data = await query.get();
        const category = "allArticles";
        const articlesPerPage = 3;
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
      {console.log(articles)}
      <div className="allarticles__title">
        <p>All Articles</p>
      </div>
      {articles && !loading && (
        <div className="allarticles__grid">
          {articles.map((article) => {
            return <ArticleThumbnail article={article} />;
          })}
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
    </div>
  );
}
