import { useCallback, useEffect, useState } from "react";
import { useArticles } from "../contexts/ArticlesContext";
import { database } from "../firebase";

export default function useGetAuthorArticles(userId) {
  const { setUserArticles, userArticles } = useArticles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getArticles = useCallback(
    async function () {
      try {
        setLoading(true);
        const data = await database.articles
          .where("userId", "==", userId)
          .orderBy("createdAt", "desc")
          .get();
        const formattedArticles = [];
        data.docs.forEach((doc) => {
          formattedArticles.push(database.formatDocument(doc));
        });
        setUserArticles(formattedArticles);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Could not fetch articles! refresh to try again");
        console.log(err);
      }
    },
    [userId]
  );

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return { userArticles, loading, error };
}
