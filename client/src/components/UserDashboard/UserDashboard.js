import React, { useState } from "react";

import "./UserDashboard.css";

import { useAuth } from "../../contexts/AuthContext";

import useGetAuthorArticles from "../../Hooks/useGetAuthorArticles";

import Navigation from "../Navigation/Navigation";
import EditProfile from "../EditProfile/EditProfile";
import UserArticle from "../UserArticles/UserArticle";

import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import email from "../../icons/email.svg";
import global from "../../icons/global.svg";
import pen from "../../icons/pen.svg";
import { nanoid } from "nanoid";

export default function UserDashboard() {
  const { currentUser, setCurrentUser } = useAuth();
  const { userArticles, articlesLoading, error } = useGetAuthorArticles(
    currentUser?.id
  );
  const [editing, setEditing] = useState(false);

  return (
    <div className="dashboard__container">
      <div className="dashboard__navigation">
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
          {editing && (
            <EditProfile
              setEditing={setEditing}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          )}
          {!editing && (
            <div className="dashborad__content-user">
              <button onClick={() => setEditing(true)}>Update Profile</button>
              <div className="dashborad__content-userDetails">
                <p>
                  <span>
                    <img src={email} alt="User email" />
                  </span>
                  {currentUser?.email}
                </p>
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
          )}
        </div>
        {articlesLoading && userArticles.length < 1 && (
          <div className="latestArticles__loader"></div>
        )}
        {userArticles && (
          <div className="dashboard__content-articles">
            <p>Articles</p>
            {userArticles &&
              userArticles.map((article) => {
                return <UserArticle key={nanoid()} article={article} />;
              })}
          </div>
        )}
        {error && <div className="latestArticles__error">{error}</div>}
        {!articlesLoading && userArticles.length < 1 && (
          <div className="latestArticles__error">No article written yet</div>
        )}
      </div>
    </div>
  );
}
