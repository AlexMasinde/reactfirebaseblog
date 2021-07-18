import React from "react";

import "./Homepage.css";

import Navigation from "../components/Navigation/Navigation";

import LatestArticles from "../components/Latest/LatestArticles";
import CategoriesNav from "../components/CategoriesNav/CategoriesNav";
import AllArticles from "../components/AllArticles/AllArticles";

export default function Homepage() {
  console.log("Rendered");
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
      </section>
      <section>
        <div className="homepage__allarticles">
          <AllArticles />
        </div>
      </section>
    </div>
  );
}
