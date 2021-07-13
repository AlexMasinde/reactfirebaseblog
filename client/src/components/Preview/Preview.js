import React from "react";
import ReactMarkdown from "react-markdown";
import "./preview.css";

export default function Preview({ article, imageUrl }) {
  const { author, createdAt, tagline, content, title, category } = article;

  const date = createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(createdAt.toDate())
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date());

  return (
    <div className="preview__container">
      <div className="preview__header">
        <h6>{category.toUpperCase()}</h6>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>
      <div className="preview__author">
        <p>
          By <span>{author}</span>
        </p>
        <p>{date}</p>
        {imageUrl && (
          <div className="preview__image">
            <img src={imageUrl} alt={title} loading="lazy" />
          </div>
        )}
      </div>
      <div className="preview__coverImage"></div>
      <div className="preview__text">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
