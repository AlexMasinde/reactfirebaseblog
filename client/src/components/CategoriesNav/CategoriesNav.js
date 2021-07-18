import React from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

import "./CategoriesNav.css";

import { useArticles } from "../../contexts/ArticlesContext";

import categories from "../../utils/categories";

export default function CategoriesNav() {
  const { setActiveCategory, activeCategory } = useArticles();
  const history = useHistory();
  const trimmedCategories = categories.slice(1);

  return (
    <div className="navigation__categories">
      {trimmedCategories.map((category) => {
        return (
          <p
            className={category === activeCategory ? "active-category" : ""}
            onClick={() => {
              setActiveCategory(category);
              history.push(`/categories/${category.toLowerCase()}`);
            }}
            key={nanoid()}
          >
            {category.toUpperCase()}
          </p>
        );
      })}
    </div>
  );
}
