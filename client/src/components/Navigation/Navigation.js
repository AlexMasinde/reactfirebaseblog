import React from "react";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const history = useHistory();
  return (
    <div className="navigation__container">
      <div className="navigation__container-logo">
        <p>IB</p>
      </div>
      <div className="navigation__container-name">
        <p>InsightsBlog</p>
      </div>
      <div className="navigation__container-buttons">
        <p onClick={() => history.push("/signup")}>Sign Up</p>
        <p>Login</p>
      </div>
    </div>
  );
}
