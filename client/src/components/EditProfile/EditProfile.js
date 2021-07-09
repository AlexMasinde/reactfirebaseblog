import React, { useState } from "react";

export default function EditProfile({ previousUserDetails }) {
  const { username, bio, twitter, facebook, website } = previousUserDetails;
  const [updatedUserDetails, setUpdatedDetails] = useState([]);

  function handleInputeChange(e, field) {
    if (e.target.value !== field && e.target.value.trim() !== "") {
      setUpdatedDetails([
        ...updatedDetails,
        { field: e.target.value, updated: true },
      ]);
    } else {
      setUpdatedDetails([...updatedDetails, { field, updated: false }]);
    }
  }

  return (
    <div className="editprofile">
      <div className="editprofile__details">
        <input
          value={username}
          onChange={(e) => handleInputeChange(e, username)}
          type="text"
          placeholder="Name"
        />
        <input
          value={bio}
          onChange={(e) => handleInputeChange(e, bio)}
          type="text"
          placeholder="Short bio"
        />
        <input
          value={twitter}
          onChange={(e) => handleInputeChange(e, twitter)}
          type="text"
          placeholder="Twitter"
        />
        <input
          value={facebook}
          onChange={(e) => handleInputeChange(e, facebook)}
          type="text"
          placeholder="Facebook"
        />
        <input
          value={website}
          onChange={(e) => handleInputeChange(e, website)}
          type="text"
          placeholder="Website"
        />
      </div>
      <div className="editprofile__buttons">
        <p>Update</p>
        <p>Cancel</p>
      </div>
    </div>
  );
}
