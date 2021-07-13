import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, database } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function userSignup(email, password) {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    return response.user;
  }

  function userSignout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDetails = await database.users.doc(user.uid).get();
        setCurrentUser(database.formatDocument(userDetails));
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userSignup,
    userSignout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
