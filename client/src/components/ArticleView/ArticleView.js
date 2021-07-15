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
  const [articleLoading, setArticleLoading] = useState(false);
  const [articleError, setArticleError] = useState();

  useEffect(() => {
    async function getArticle() {
      try {
        setArticleError("");
        const data = await database.articles.doc(id).get();
        setArticle(database.formatDocument(data));
      } catch (err) {
        console.log(err);
        setArticleError("Could not retrieve article! Please try again");
      }
    }
    getArticle();
  }, [id]);

  const { articleAuthor, authorError, authorLoading } = useGetAuthor(userId);

  return (
    <div className="articleView__container">
      {console.log(articleAuthor)}
      <Navigation />
      <div className="articleView__content">
        {article && (
          <Preview
            article={article}
            imageUrl={article.coverImages.large}
            author={{ articleAuthor, authorError }}
          />
        )}
      </div>
    </div>
  );
}
