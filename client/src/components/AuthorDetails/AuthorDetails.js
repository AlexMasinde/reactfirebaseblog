import React from "react";
import { useHistory } from "react-router-dom";

import "./AuthorDetails.css";

import twittericon from "../../icons/twitter.svg";
import facebookicon from "../../icons/facebook.svg";
import websiteicon from "../../icons/global.svg";

export default function AuthorDetails({ author }) {
  const { articleAuthor, authorError, authorLoading } = author;
  const history = useHistory();

  function userProfile() {
    history.push("/dashboard");
  }

  return (
    <div className="authordetails__container">
      <div className="authorDetails__content">
        {authorLoading && <p>Loading...</p>}
        {articleAuthor && (
          <p>
            <div>
              <img src={articleAuthor.profilePicture.url} alt="twitter" />
            </div>
            <span onClick={userProfile}>{articleAuthor.username}</span>
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
