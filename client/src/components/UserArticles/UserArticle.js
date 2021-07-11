import React, { useState } from "react";

import "./UserArticle.css";

import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

export default function UserArticles({ article }) {
  const { currentUser } = useAuth();
  const { articleId, title, tagline, createdAt, userId } = article;
  const { small } = article.coverImages;
  const allowed = currentUser && currentUser.uid === userId;
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const date = createdAt.toDate();
  const formatedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);

  console.log(formatedDate);

  async function handleDelete() {
    try {
      setLoading(true);
      setError("");
      await database.articles.doc(articleId).delete();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Could not Delete! Please try again");
      console.log(err);
    }
  }

  async function handleDelete() {}
  return (
    <div className="userArticle__container">
      <img src={small} alt={title} />
      <div className="userArticle__details">
        <h1>{title}</h1>
        <h3>{tagline}</h3>
        <p>{formatedDate}</p>
        {allowed && (
          <button
            disabled={loading}
            className={`userArticle__button${
              loading ? "button__loading userArticle__button-loading" : ""
            }`}
            onClick={handleDelete}
          >
            <span className={loading ? "loading__text" : ""}>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
