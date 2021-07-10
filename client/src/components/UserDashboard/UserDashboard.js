import React, { useEffect, useState } from "react";

import "./UserDashboard.css";

import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import EditProfile from "../EditProfile/EditProfile";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [editing, setEditing] = useState(true);
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        setLoading(true);
        const userDoc = await database.users.doc(currentUser.uid).get();
        const user = database.formatDocument(userDoc);
        setUserDetails(user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getUserData();
  }, [currentUser.uid]);

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
      <div className="dashboard__content">
        {editing && (
          <EditProfile
            setEditing={setEditing}
            setLoading={setLoading}
            setUserDetails={setUserDetails}
            userDetails={userDetails}
          />
        )}
        {!editing && (
          <div className="dashboard__content-profile">
            <div className="dashboard__content-profileImage">
              <img
                src={userDetails.profilePicture.url}
                alt={userDetails.username}
              />
            </div>
            <p>{userDetails.username}</p>
            <p onClick={() => setEditing(true)}>Update Profile</p>
            <p>{userDetails.email}</p>
            {userDetails.bio && <p>{userDetails.bio}</p>}
            {userDetails.twitter && <p>{userDetails.twitter}</p>}
            {userDetails.facebook && <p>{userDetails.facebook}</p>}
            {userDetails.website && <p>{userDetails.website}</p>}
            <p>{editing ? "Editing" : "Not Editing"}</p>
          </div>
        )}
        <div className="dashboard__content-articles">
          <p>Articles go Here</p>
        </div>
      </div>
    </div>
  );
}
