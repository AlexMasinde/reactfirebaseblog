import React from "react";
import ReactMarkdown from "react-markdown";

import linkedin from "../../icons/linkedin.svg";
import twitter from "../../icons/twitter.svg";

import PreviewStyles from "./Preview.module.css";

export default function Preview({ article, imageUrl, author }) {
  const { createdAt, tagline, content, title, category } = article;
  const { articleAuthor } = author;
  const { profilePicture, username } = articleAuthor;

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
    <div className={PreviewStyles.container}>
      {console.log(author)}
      <div className={PreviewStyles.header}>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>
      <div className={PreviewStyles.coverimage}>
        {imageUrl && <img src={imageUrl} alt={title} loading="lazy" />}
      </div>
      <div className={PreviewStyles.author}>
        <div className={PreviewStyles.authordetails}>
          <div className={PreviewStyles.authorimage}>
            <img src={profilePicture?.url} alt="profile picture" />
          </div>
          <div className={PreviewStyles.authorname}>
            <p>{articleAuthor?.username}</p>
            <p>{date}</p>
          </div>
        </div>
        <div className={PreviewStyles.authorsocial}>
          <div>
            <img src={linkedin} alt="linkedin" />
          </div>
          <div>
            <img src={twitter} alt="twitter" />
          </div>
        </div>
      </div>
      <div className={PreviewStyles.text}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
