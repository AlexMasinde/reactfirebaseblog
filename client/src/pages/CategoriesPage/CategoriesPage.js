import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";

import "./CategoriesPage.css";

import { database } from "../../firebase";

import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import ArticleThumbnail from "../../components/ArticleThumbnail/ArticleThumbnail";
import Navigation from "../../components/Navigation/Navigation";

export default function CategoriesPage() {
  const [articles, setArticles] = useState();
  const { category } = useParams();

  useEffect(() => {
    const unsubscribe = database.articles
      .where("category", "==", category)
      .orderBy("createdAt", "desc")
      .limit(6)
      .onSnapshot(
        (documentSnapshot) => {
          const formattedArticles = [];
          documentSnapshot.forEach((doc) => {
            formattedArticles.push(database.formatDocument(doc));
          });
          setArticles(formattedArticles);
        },
        (error) => {
          console.log(error);
        }
      );
    return () => unsubscribe();
  }, [category]);

  return (
    <div className="categoriesPage">
      {console.log(articles)}
      <Navigation />
      <CategoriesNav />
      <div></div>
      <div className="categoriesPage__container">
        <p>{category.toUpperCase()}</p>
        <div className="categoriesPage__grid">
          {articles &&
            articles.map((article) => {
              return <ArticleThumbnail key={nanoid()} article={article} />;
            })}
        </div>
      </div>
    </div>
  );
}
