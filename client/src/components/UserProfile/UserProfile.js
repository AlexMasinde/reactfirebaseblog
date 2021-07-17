import React from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

import useGetAuthor from "../../Hooks/useGetAuthor";
import useGetAuthorArticles from "../../Hooks/useGetAuthorArticles";

import Navigation from "../Navigation/Navigation";
import UserArticle from "../UserArticles/UserArticle";

import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import global from "../../icons/global.svg";
import pen from "../../icons/pen.svg";

export default function UserProfile() {
  const { id } = useParams();
  const { articleAuthor } = useGetAuthor(id);
  const userArticles = useGetAuthorArticles(id);
  const currentUser = articleAuthor;

  return (
    <div className="dashboard__container">
      <div className="dashboard__navigation">
        {console.log(currentUser)}
        <Navigation />
      </div>
      <div className="dashboard__content">
        <div className="dashboard__content-profile">
          <div className="dashboard__content-profileImage">
            <img
              src={currentUser?.profilePicture.url}
              alt={currentUser?.username}
            />
            <p>{currentUser?.username}</p>
          </div>
          <div className="dashborad__content-user">
            <div className="dashborad__content-userDetails">
              {currentUser?.bio && (
                <p>
                  <span>
                    <img src={pen} alt="User bio" />
                  </span>
                  {currentUser?.bio}
                </p>
              )}
              {currentUser?.twitter && (
                <p>
                  <span>
                    <img src={twitter} alt="User twitter" />
                  </span>
                  {currentUser?.twitter}
                </p>
              )}
              {currentUser?.facebook && (
                <p>
                  <span>
                    <img src={facebook} alt="User facebook" />
                  </span>
                  {currentUser?.facebook}
                </p>
              )}
              {currentUser?.website && (
                <p>
                  <span>
                    <img src={global} alt="User website" />
                  </span>
                  {currentUser?.website}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="dashboard__content-articles">
          <p>Articles</p>
          {userArticles &&
            userArticles.map((article) => {
              return <UserArticle key={nanoid()} article={article} />;
            })}
        </div>
      </div>
    </div>
  );
}
