import React, { useEffect, useState } from "react";

import "./UserDashboard.css";

import { useUserDetails } from "../../contexts/UserDetailsContext";

import { database } from "../../firebase";

import Navigation from "../Navigation/Navigation";
import EditProfile from "../EditProfile/EditProfile";
import UserArticle from "../UserArticles/UserArticle";

import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import email from "../../icons/email.svg";
import global from "../../icons/global.svg";
import pen from "../../icons/pen.svg";

export default function UserDashboard() {
  const { userDetails, setUserDetails } = useUserDetails();
  const [articles, setArticles] = useState();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getArticles() {
      try {
        const data = await database.articles
          .where("userId", "==", userDetails.id)
          .orderBy("createdAt", "desc")
          .get();
        const results = data.docs;
        const formattedArticles = results.map((result) => {
          return database.formatDocument(result);
        });
        console.log(formattedArticles);
        setArticles(formattedArticles);
      } catch (err) {
        console.log(err);
        setError("Could not fetch articles! Reload the page to try again");
      }
    }
    getArticles();
  }, [userDetails.id]);

  return (
    <div className="dashboard__container">
      <div className="dashboard__navigation">
        <Navigation />
      </div>
      <div className="dashboard__content">
        <div className="dashboard__content-profile">
          <div className="dashboard__content-profileImage">
            <img
              src={userDetails?.profilePicture.url}
              alt={userDetails?.username}
            />
            <p>{userDetails?.username}</p>
          </div>
          {editing && (
            <EditProfile
              setEditing={setEditing}
              setLoading={setLoading}
              setUserDetails={setUserDetails}
              userDetails={userDetails}
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
                  {userDetails?.email}
                </p>
                {userDetails.bio && (
                  <p>
                    <span>
                      <img src={pen} alt="User bio" />
                    </span>
                    {userDetails.bio}
                  </p>
                )}
                {userDetails.twitter && (
                  <p>
                    <span>
                      <img src={twitter} alt="User twitter" />
                    </span>
                    {userDetails.twitter}
                  </p>
                )}
                {userDetails.facebook && (
                  <p>
                    <span>
                      <img src={facebook} alt="User facebook" />
                    </span>
                    {userDetails.facebook}
                  </p>
                )}
                {userDetails.website && (
                  <p>
                    <span>
                      <img src={global} alt="User website" />
                    </span>
                    {userDetails.website}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="dashboard__content-articles">
          <p>Articles</p>
          {articles &&
            articles.map((article, index) => {
              return (
                <UserArticle
                  key={index}
                  article={article}
                  updateArtices={{ articles, setArticles }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
