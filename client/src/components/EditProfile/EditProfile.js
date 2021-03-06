import React, { useState } from "react";

import "./EditProfile.css";

import { database } from "../../firebase";

export default function EditProfile({
  currentUser,
  setEditing,
  setLoading,
  setCurrentUser,
}) {
  const { id, username, bio, twitter, facebook, website } = currentUser;

  const [updatedUserDetails, setUpdatedUserDetails] = useState([]);

  function handleInputeChange(e, data, field) {
    if (!data || (e.target.value !== data && e.target.value.trim() !== "")) {
      setUpdatedUserDetails([
        ...updatedUserDetails,
        { [field]: e.target.value, updated: true },
      ]);
    } else {
      setUpdatedUserDetails([
        ...updatedUserDetails,
        { [field]: data, updated: false },
      ]);
    }
  }

  async function updateUserDetails() {
    try {
      setLoading(true);
      let newDetails = {};
      updatedUserDetails.forEach((updatedUserDetail) => {
        if (updatedUserDetail.updated) {
          for (const key in updatedUserDetail) {
            if (key !== "updated" && updatedUserDetail.hasOwnProperty(key)) {
              newDetails[key] = updatedUserDetail[key];
            }
          }
        }
      });

      if (!Object.keys(newDetails).length < 1) {
        const keys = Object.keys(newDetails).map((key) => {
          return key;
        });
        let trimmedUserDetails = currentUser;
        keys.forEach((key) => {
          delete trimmedUserDetails[key];
        });
        setCurrentUser({ ...trimmedUserDetails, ...newDetails });
        console.log({ ...trimmedUserDetails, ...newDetails });
        await database.users.doc(id).update(newDetails);
        setLoading(false);
        setEditing(false);
      } else {
        setLoading(false);
        setEditing(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  function cancelUpdate() {
    setEditing(false);
  }

  return (
    <div className="editprofile">
      <div className="editprofile__details">
        <label>
          User Name
          <input
            onChange={(e) => {
              const field = "username";
              handleInputeChange(e, username, field);
            }}
            type="text"
            placeholder={username ?? ""}
          />
        </label>
        <label>
          Bio
          <input
            onChange={(e) => {
              const field = "bio";
              handleInputeChange(e, bio, field);
            }}
            type="text"
            placeholder={bio ?? ""}
          />
        </label>
        <label>
          Twitter
          <input
            onChange={(e) => {
              const field = "twitter";
              handleInputeChange(e, twitter, field);
            }}
            type="text"
            placeholder={twitter ?? ""}
          />
        </label>
        <label>
          Facebook
          <input
            onChange={(e) => {
              const field = "facebook";
              handleInputeChange(e, facebook, field);
            }}
            type="text"
            placeholder={facebook ?? ""}
          />
        </label>
        <label>
          <p>Website</p>
          <input
            onChange={(e) => {
              const field = "website";
              handleInputeChange(e, website, field);
            }}
            type="text"
            placeholder={website ?? ""}
          />
        </label>
      </div>
      <div className="editprofile__buttons">
        <p className="editprofile__buttons-Update" onClick={updateUserDetails}>
          Update
        </p>
        <p className="editprofile__buttons-Cancel" onClick={cancelUpdate}>
          Cancel
        </p>
      </div>
    </div>
  );
}
