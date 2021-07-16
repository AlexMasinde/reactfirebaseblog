import React from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

import "./CategoriesNav.css";

import categories from "../../utils/categories";

export default function CategoriesNav() {
  const history = useHistory();
  const trimmedCategories = categories.slice(1);

  return (
    <div className="navigation__categories">
      {trimmedCategories.map((category) => {
        return (
          <p
            onClick={() => {
              history.push(`/categories/${category.toLowerCase()}`);
            }}
            key={nanoid()}
          >
            {category}
          </p>
        );
      })}
    </div>
  );
}
