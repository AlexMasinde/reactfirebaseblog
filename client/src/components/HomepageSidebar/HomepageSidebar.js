import React from "react";
import { useHistory } from "react-router-dom";

import "./HomepageSidebar.css";

import facebookIcon from "../../icons/facebook.svg";
import twitterIcon from "../../icons/twitter.svg";
import instagramIcon from "../../icons/instagram.svg";
import linkedinIcon from "../../icons/linkedin.svg";

export default function HomepageSidebar() {
  const history = useHistory();
  return (
    <div className="homepage__sidebar">
      <div className="homepage__sidebar-join">
        <h2>Join Us</h2>
        <p>
          InsightsB provides you with a unique opportunity to write about your
          favorite topics about life and your surroundings. Joining us allows
          you to change the world by sharing your opinions with a wider audience
        </p>
        <button onClick={() => history.push("/signup")}>Sign Up</button>
      </div>
      <div className="homepage__sidebar-follow">
        <h2>Follow Us</h2>
        <a
          href="https://github.com/AlexMasinde"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <p>Facebook</p>
            <img src={facebookIcon} alt="Facebook" />
          </div>
        </a>
        <a
          href="https://github.com/AlexMasinde"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <p>Twitter</p>
            <img src={twitterIcon} alt="Twitter" />
          </div>
        </a>
        <a
          href="https://github.com/AlexMasinde"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <p>Instagram</p>
            <img src={instagramIcon} alt="Instagram" />
          </div>
        </a>
        <a
          href="https://github.com/AlexMasinde"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <p>LinkedIn</p>
            <img src={linkedinIcon} alt="Linkedin" />
          </div>
        </a>
      </div>
    </div>
  );
}
