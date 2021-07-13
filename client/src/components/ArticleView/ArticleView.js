import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ArticleView.css";

import { database } from "../../firebase";

import Preview from "../Preview/Preview";
import Navigation from "../Navigation/Navigation";

import { useAuth } from "../../contexts/AuthContext";

export default function ArticleView() {
  const { currentUser } = useAuth();

  const [article, setArticle] = useState();
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState({
    author: false,
    article: false,
  });

  const [error, setError] = useState("");
  const { id, userId } = useParams();

  useEffect(() => {
    async function getArticle() {
      try {
        setError("");
        const data = await database.articles.doc(id).get();
        setArticle(database.formatDocument(data));
      } catch (err) {
        console.log(err);
        setError("Could not retrieve article! Please try again");
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
