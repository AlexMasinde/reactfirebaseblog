import React, { useEffect, useState } from "react";

import "./UserDashboard.css";

import { database } from "../../firebase";

import Navigation from "../Navigation/Navigation";
import EditProfile from "../EditProfile/EditProfile";
import UserArticle from "../UserArticles/UserArticle";

import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import email from "../../icons/email.svg";
import global from "../../icons/global.svg";
import pen from "../../icons/pen.svg";

import { useAuth } from "../../contexts/AuthContext";
import { useArticles } from "../../contexts/ArticlesContext";

export default function UserDashboard() {
  const { currentUser, setCurrentUser } = useAuth();
  const { setUserArticles, userArticles } = useArticles();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getArticles() {
      try {
        const data = await database.articles
          .where("userId", "==", currentUser.id)
          .orderBy("createdAt", "desc")
          .get();
        const results = data.docs;
        const formattedArticles = results.map((result) => {
          return database.formatDocument(result);
        });
        setUserArticles(formattedArticles);
      } catch (err) {
        console.log(err);
        setError("Could not fetch articles! Reload the page to try again");
      }
    }
    getArticles();
  }, [currentUser.id]);

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
              setLoading={setLoading}
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
                {currentUser.bio && (
                  <p>
                    <span>
                      <img src={pen} alt="User bio" />
                    </span>
                    {currentUser.bio}
                  </p>
                )}
                {currentUser.twitter && (
                  <p>
                    <span>
                      <img src={twitter} alt="User twitter" />
                    </span>
                    {currentUser.twitter}
                  </p>
                )}
                {currentUser.facebook && (
                  <p>
                    <span>
                      <img src={facebook} alt="User facebook" />
                    </span>
                    {currentUser.facebook}
                  </p>
                )}
                {currentUser.website && (
                  <p>
                    <span>
                      <img src={global} alt="User website" />
                    </span>
                    {currentUser.website}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="dashboard__content-articles">
          <p>Articles</p>
          {userArticles &&
            userArticles.map((article, index) => {
              return <UserArticle key={index} article={article} />;
            })}
        </div>
      </div>
    </div>
  );
}
