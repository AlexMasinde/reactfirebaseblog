import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { database } from "../../firebase";

import Preview from "../Preview/Preview";
import Navigation from "../Navigation/Navigation";

import useGetAuthor from "../../Hooks/useGetAuthor";

import ArticleViewStyles from "./ArticleView.module.css";

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
    <div>
      {console.log(articleAuthor)}
      <Navigation />
      <div>
        {loading && <div className={ArticleViewStyles.loader}></div>}
        {article && !loading && (
          <Preview
            article={article}
            imageUrl={article.coverImages.large}
            author={{ articleAuthor, authorError, authorLoading }}
          />
        )}
        {error && <div className={ArticleViewStyles.error}>{error}</div>}
      </div>
    </div>
  );
}
