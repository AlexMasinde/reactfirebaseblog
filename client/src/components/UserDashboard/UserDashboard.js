import React, { useEffect, useState } from "react";

import "./UserDashboard.css";

import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    async function getUserData() {
      try {
        const userDoc = await database.users.doc(currentUser.uid).get();
        const user = database.formatDocument(userDoc);
        setUserDetails(user);
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  });

  if (!userDetails) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="dashboard__container">
      <div className="dashboard__navigation">
        <Navigation />
      </div>
      <div className="dasboard__content">
        <div className="dashboard__content-profile">
          <div className="dashboard__content-profileImage">
            <img
              src={userDetails.profilePicture.url}
              alt={userDetails.username}
            />
          </div>
          <p>{userDetails.username}</p>
          <p>Update Profile</p>
          <p>{userDetails.email}</p>
          {userDetails.bio && <p>{userDetails.bio}</p>}
          {userDetails.twitter && <p>{userDetails.twitter}</p>}
          {userDetails.facebook && <p>{userDetails.facebook}</p>}
          {userDetails.website && <p>{userDetails.website}</p>}
        </div>
        <div className="dashboard__content-articles">
          <p>Articles go Here</p>
        </div>
      </div>
    </div>
  );
}
