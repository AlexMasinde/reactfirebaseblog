import React from "react";

import "./Homepage.css";

import LatestArticles from "../components/Latest/LatestArticles";
import HomepageSidebar from "../components/HomepageSidebar/HomepageSidebar";

export default function Homepage() {
  return (
    <div className="homepage">
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
