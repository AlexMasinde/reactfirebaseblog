import { createContext, useContext, useEffect, useState } from "react";

import { database } from "../firebase";
import { useAuth } from "./AuthContext";

const UserDetailsContext = createContext();

export function useUserDetails() {
  return useContext(UserDetailsContext);
}

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function getUserDetails() {
      const info = await database.users.doc(currentUser.uid).get();
      setUserDetails(database.formatDocument(info));
      setLoading(false);
    }
    getUserDetails();
  }, [currentUser.uid]);

  const value = {
    userDetails,
    setUserDetails,
  };

  return (
    <UserDetailsContext.Provider value={value}>
      {!loading && children}
    </UserDetailsContext.Provider>
  );
}
