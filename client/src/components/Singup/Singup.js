import React, { useState } from "react";

import "./Singup.css";

export default function Singup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  });

  const [displayFiileName, setDisplayFileName] = useState("No file selected");
  function handleUsername(e) {
    const username = e.target.value;
    setUserDetails({ ...userDetails, username });
  }

  function handleEmail(e) {
    const email = e.target.value;
    setUserDetails({ ...userDetails, email });
  }

  function handlePassword(e) {
    const password = e.target.value;
    setUserDetails({ ...userDetails, password });
  }

  function handleConfirmPassword(e) {
    const confirmPassword = e.target.value;
    setUserDetails({ ...userDetails, confirmPassword });
  }

  function handleFile(e) {
    const file = e.target.files[0];
    setUserDetails({ ...userDetails, file });
    if (file) setDisplayFileName(file.name);
  }

  function handleSignup(e) {
    e.preventDefault();
  }

  return (
    <div className="signup__container">
      <div className="signup__container-form">
        <form onSubmit={(e) => handleSignup(e)}>
          <label>
            UserName
            <input type="text" onChange={(e) => handleUsername(e)} required />
          </label>
          <label>
            Email
            <input type="email" onChange={(e) => handleEmail(e)} required />
          </label>
          <label>
            Password
            <input
              type="pasword"
              onChange={(e) => handlePassword(e)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="pasword"
              onChange={(e) => handleConfirmPassword(e)}
              required
            />
          </label>
          <label>
            <input type="file" onChange={(e) => handleFile(e)} />
            <p className="vendor-details-fileUpload">Browse</p>
            <p className="vendor-details-fileName">{displayFiileName}</p>
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
