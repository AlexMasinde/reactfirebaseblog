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

  const [displayFiileName, setDisplayFileName] = useState("Profile Photo");
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
      <div className="signup__container-header">
        <div className="navigation__container-logo">
          <p>IB</p>
        </div>
      </div>
      <div className="signup__container-form">
        <h1>Create your Insights Account</h1>
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
          <div className="singup__container-formFile">
            <label>
              <input type="file" onChange={(e) => handleFile(e)} />
              <span>{displayFiileName}</span>
              <p>Browse</p>
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
