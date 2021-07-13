import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ArticleView.css";

import { database } from "../../firebase";

import Preview from "../Preview/Preview";
import Navigation from "../Navigation/Navigation";

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
  });

  return (
    <div className="articleView__container">
      <Navigation />
      <div className="articleView__content">
        {article && (
          <Preview
            article={article}
            imageUrl={article.coverImages.large}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}
