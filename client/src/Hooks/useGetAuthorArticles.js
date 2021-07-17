import { useCallback, useEffect } from "react";
import { useArticles } from "../contexts/ArticlesContext";
import { database } from "../firebase";

export default function useGetAuthorArticles(userId) {
  const { setUserArticles, userArticles } = useArticles();
  const getArticles = useCallback(
    async function () {
      try {
        const data = await database.articles
          .where("userId", "==", userId)
          .orderBy("createdAt", "desc")
          .get();
        const formattedArticles = [];
        data.docs.forEach((doc) => {
          formattedArticles.push(database.formatDocument(doc));
        });
        setUserArticles(formattedArticles);
      } catch (err) {
        console.log(err);
      }
    },
    [userId]
  );

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return userArticles;
}
