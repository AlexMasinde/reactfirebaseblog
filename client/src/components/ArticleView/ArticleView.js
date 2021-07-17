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

  useEffect(() => {
    async function getArticle() {
      try {
        const data = await database.articles.doc(id).get();
        setArticle(database.formatDocument(data));
      } catch (err) {}
    }
    getArticle();
  }, [id]);

  const { articleAuthor, authorError } = useGetAuthor(userId);

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
