import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, database } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);

  async function userSignup(email, password) {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    return response.user;
  }

  async function userSignout() {
    await auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userSignup,
    userSignout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
