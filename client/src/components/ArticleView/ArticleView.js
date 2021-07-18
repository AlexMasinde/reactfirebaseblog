import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ArticleView.css";

import { database } from "../../firebase";

import Preview from "../Preview/Preview";
import Navigation from "../Navigation/Navigation";

import useGetAuthor from "../../Hooks/useGetAuthor";

export default function ArticleView() {
  const { id, userId } = useParams();

  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getArticle() {
      try {
        setLoading(true);
        const data = await database.articles.doc(id).get();
        setArticle(database.formatDocument(data));
        setLoading(false);
      } catch (err) {
        setError("Could not load article! Refresh page to try again");
        console.log(err);
        setLoading(false);
      }
    }
    getArticle();
  }, [id]);

  const { articleAuthor, authorError, authorLoading } = useGetAuthor(userId);

  return (
    <div className="articleview__container">
      {console.log(articleAuthor)}
      <Navigation />
      <div className="articleview__content">
        {loading && <div className="articleview__loader"></div>}
        {article && !loading && (
          <Preview
            article={article}
            imageUrl={article.coverImages.large}
            author={{ articleAuthor, authorError, authorLoading }}
          />
        )}
        {error && <div className="articleview__error">{error}</div>}
      </div>
    </div>
  );
}
