import React from "react";
import { useHistory } from "react-router-dom";

import useGetAuthor from "../../Hooks/useGetAuthor";

import "./ArticleThumbnail.css";

export default function ArticleThumbnail({ article }) {
  const category = article.category.toUpperCase();
  const title = article.title;
  const tagline = article.tagline;
  const trimmedTitle = title.length > 55 ? title.substr(0, 54) + "..." : title;
  const trimmedTagline =
    tagline.length > 100 ? tagline.substr(0, 99) + "..." : tagline;
  const { small } = article.coverImages;

  const { articleAuthor } = useGetAuthor(article.userId);

  const history = useHistory();

  function viewArticle() {
    history.push(`/article/${article.id}/${article.userId}`);
  }

  return (
    <div onClick={viewArticle} className="article__card">
      {!articleAuthor && !article && <div>Loading..</div>}
      {articleAuthor && article && (
        <div className="article__card-content">
          <img src={small} alt={title} loading="lazy" />
          <div className="thumbnail__container-text">
            <p>{category}</p>
            <h2>{trimmedTitle}</h2>
            <p className="tagline-text">{trimmedTagline}</p>
          </div>
          <div className="article__content-author">
            <img
              src={articleAuthor?.profilePicture.url}
              alt={articleAuthor?.username}
              loading="lazy"
            />
            <p>{articleAuthor?.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}
