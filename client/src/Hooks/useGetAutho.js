import { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

export default function useGetAuthor(userId) {
  const { currentUser } = useAuth();
  const [author, setAuthor] = useState();
  const [authorError, setAuthorError] = useState();
  const [authorLoading, setAuthorLoading] = useState(false);

  useEffect(() => {
    async function getAuthor() {
      try {
        setAuthorLoading(true);
        if (currentUser && currentUser.id === userId) {
          setAuthor(currentUser);
          setAuthorLoading(false);
        } else {
          const data = await database.users.doc(userId).get();
          setAuthor(database.formatDocument(data));
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

  return { author, authorLoading, authorError };
}
