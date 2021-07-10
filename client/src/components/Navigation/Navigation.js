import React from "react";
import { useHistory } from "react-router-dom";

import "./Navigation.css";

import { useAuth } from "../../contexts/AuthContext";

export default function Navigation() {
  const { currentUser, userSignout } = useAuth();
  const history = useHistory();

  const auth = currentUser ? true : false;

  async function handleSignout() {
    await userSignout();
  }

  return (
    <div className="navigation__container">
      <div className="navigation__container-logo">
        <p>IB</p>
      </div>
      <div className="navigation__container-name">
        <p>InsightsBlog</p>
      </div>
      <div className="navigation__container-buttons">
        {auth && (
          <>
            <p onClick={() => history.push("/add")}>Add Article</p>
            <p onClick={handleSignout}>Logout</p>
          </>
        )}
        {!auth && (
          <>
            <p onClick={() => history.push("/signup")}>Sign Up</p>
            <p>Login</p>
          </>
        )}
      </div>
    </div>
  );
}
