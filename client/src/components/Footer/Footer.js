import React from "react";
import { useHistory } from "react-router-dom";

import "./Footer.css";

import facebookIcon from "../../icons/facebook.svg";
import twitterIcon from "../../icons/twitter.svg";
import instagramIcon from "../../icons/instagram.svg";
import linkedinIcon from "../../icons/linkedin.svg";

export default function HomepageSidebar() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <p>IB</p>
        </div>
        <div className="footer__copyright">
          <p>&copy; 2021</p>
        </div>
        <div className="footer__links">
          <a>
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a>
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a>
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a>
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
}
