import React, { useState } from "react";

import "./UserDashboard.css";

import { useUserDetails } from "../../contexts/UserDetailsContext";

import Navigation from "../Navigation/Navigation";
import EditProfile from "../EditProfile/EditProfile";

import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import email from "../../icons/email.svg";
import global from "../../icons/global.svg";
import pen from "../../icons/pen.svg";

export default function UserDashboard() {
  const { userDetails, setUserDetails } = useUserDetails();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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
            <div className="dashborad__content-userDetails">
              <button onClick={() => setEditing(true)}>Update Profile</button>
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
          )}
        </div>
        <div className="dashboard__content-articles">
          <p>Articles go Here</p>
        </div>
      </div>
    </div>
  );
}
