import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, database } from "../firebase";

import { uploadImages } from "../utils/axiosRequests";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function userSignup(userDetails) {
    const { username, email, password, file } = userDetails;
    const url = "/api/profilepictures";
    const placeholderPictureUrl = `https://res.cloudinary.com/dclqr5vie/image/upload/v1625649523/blogimages/profilepictures/placeholder.png`;

    async function uploadProfilePhoto(image, endpoint) {
      const results = await uploadImages(image, endpoint);
      const { url, publicId } = results.data;
      return { url, publicId, photo: true };
    }

    // //upload image to cloudinary if available otherwise use placeholder image
    const profilePicture = file
      ? await uploadProfilePhoto(file, url)
      : {
          url: placeholderPictureUrl,
          publicId: "blogimages/profilepictures/placeholder.png",
          uploadedPhoto: false,
        };

    //create user on firebase and get the id
    const response = await auth.createUserWithEmailAndPassword(email, password);
    const user = response.user;

    //save url and user details to firebase using user id as document identifier
    await database.users.doc(user.uid).set({
      username,
      email,
      profilePicture,
    });
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
