import React from "react";

import "./Homepage.css";

import Navigation from "../components/Navigation/Navigation";

import LatestArticles from "../components/Latest/LatestArticles";
import HomepageSidebar from "../components/HomepageSidebar/HomepageSidebar";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage__navigation">
        <Navigation />
      </div>
      <div className="navigation__categories-container">
        <CategoriesNav />
      </div>
      <section className="homepage__hero">
        <div className="homepage__latestArticles">
          <LatestArticles />
        </div>
        <div className="homepage__sidebarContainer">
          <HomepageSidebar />
        </div>
      </section>
    </div>
  );
}
