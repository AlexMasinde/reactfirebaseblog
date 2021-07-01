import React from "react";
import ReactMarkdown from "react-markdown";
import "./preview.css";

export default function Preview({ articleContent, author }) {
  const { category, title, content } = articleContent;
  const date = new Date();
  console.log(content);
  return (
    <div className="preview__container">
      <div className="preview__header">
        <h6>{category.toUpperCase()}</h6>
        <h1>{title}</h1>
        <p>
          A small excerpt of the text, a few characters long to help get a gist
          of what is coming in. Hot stuff
        </p>
      </div>
      <div className="preview__author">
        <p>
          By <span>{`${author.firstName} ${author.lastName}`}</span>
        </p>
        <p>{date.toDateString()}</p>
      </div>
      <div className="preview__coverImage"></div>
      <div className="preview__text">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
