import { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

import { database } from "../firebase";

export default function useGetAuthor(userId) {
  const { currentUser } = useAuth();
  const [articleAuthor, setArticleAuthor] = useState();
  const [authorError, setAuthorError] = useState();
  const [authorLoading, setAuthorLoading] = useState(false);

  useEffect(() => {
    async function getAuthor() {
      try {
        setAuthorLoading(true);
        if (currentUser && currentUser.id === userId) {
          setArticleAuthor(currentUser);
          setAuthorLoading(false);
        } else {
          const data = await database.users.doc(userId).get();
          setArticleAuthor(database.formatDocument(data));
          setAuthorLoading(false);
        }
      } catch (err) {
        setAuthorLoading(false);
        console.log(err);
        setAuthorError("Something went wrong! Please refresh to try again");
      }
    }
    getAuthor();
  });
  return { articleAuthor, authorLoading, authorError };
}
