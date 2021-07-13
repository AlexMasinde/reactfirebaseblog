import React from "react";

import useGetAuthor from "../../Hooks/useGetAuthor";

import twittericon from "../../icons/twitter.svg";
import facebookicon from "../../icons/facebook.svg";
import websiteicon from "../../icons/global.svg";

export default function AuthorDetails({ userId }) {
  const { articleAuthor, authorError, authorLoading } = useGetAuthor(userId);

  return (
    <div className="authordetails__container">
      <div className="authorDetails__content">
        {console.log(articleAuthor)}
        {authorLoading && <p>Loading...</p>}
        {(!authorLoading && articleAuthor)(
          <p>
            <span>{articleAuthor.author}</span>
            {articleAuthor.twitter && (
              <span>
                <img src={twittericon} alt="twitter" />
              </span>
            )}
            {articleAuthor.facebook && (
              <span>
                <img src={facebookicon} alt="facebook" />
              </span>
            )}
            {articleAuthor.website && (
              <span>
                <img src={websiteicon} alt="website" />
              </span>
            )}
          </p>
        )}
        {authorError && <p>{authorError}</p>}
      </div>
    </div>
  );
}
