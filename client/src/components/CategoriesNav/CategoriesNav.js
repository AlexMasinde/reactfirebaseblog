import React from "react";

import "./CategoriesNav.css";

import categories from "../../utils/categories";

export default function CategoriesNav() {
  const trimmedCategories = categories.slice(1);
  return (
    <div className="navigation__categories">
      {trimmedCategories.map((category, index) => {
        return <p key={index}>{category}</p>;
      })}
    </div>
  );
}
