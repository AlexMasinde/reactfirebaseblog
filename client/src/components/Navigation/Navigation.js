import React from "react";
import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="navigation__container">
      <div className="navigation__container-logo">
        <p>IB</p>
      </div>
      <div className="navigation__container-name">
        <p>InsightsBlog</p>
      </div>
      <div className="navigation__container-buttons">
        <p>Sign Up</p>
        <p>Login</p>
      </div>
    </div>
  );
}
