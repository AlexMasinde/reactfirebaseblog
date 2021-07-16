import React from "react";
import { useHistory } from "react-router-dom";

import "./Navigation.css";

import { useAuth } from "../../contexts/AuthContext";
import { useArticles } from "../../contexts/ArticlesContext";

export default function Navigation() {
  const { currentUser, userSignout } = useAuth();
  const { setActiveCategory } = useArticles();

  const history = useHistory();

  const auth = currentUser ? true : false;

  async function handleSignout() {
    await userSignout();
    history.push("/");
  }

  function home() {
    setActiveCategory("");
    history.push("/");
  }

  function dashboard() {
    history.push("/dashboard");
  }

  return (
    <div className="navigation__container">
      <div onClick={home} className="navigation__container-logo">
        <p>IB</p>
      </div>
      {!auth && (
        <div className="navigation__container-name">
          <p>InsightsBlog</p>
        </div>
      )}
      <div className="navigation__container-buttons">
        {auth && (
          <>
            <p onClick={dashboard}>My Account</p>
            <p onClick={() => history.push("/add")}>Add Article</p>
            <p onClick={handleSignout}>Logout</p>
          </>
        )}
        {!auth && (
          <>
            <p onClick={() => history.push("/signup")}>Sign Up</p>
            <p onClick={() => history.push("/login")}>Login</p>
          </>
        )}
      </div>
    </div>
  );
}
