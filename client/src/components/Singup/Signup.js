import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Signup.css";

import { validateSingup } from "../../utils/validate";

import { uploadImages } from "../../utils/axiosRequests";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

export default function Singup() {
  const { userSignup } = useAuth();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [displayFiileName, setDisplayFileName] = useState("Profile Photo");

  function handleUsername(e) {
    const username = e.target.value;
    setUserDetails({ ...userDetails, username });
    if (errors) {
      errors.username = "";
    }
  }

  function handleEmail(e) {
    const email = e.target.value;
    setUserDetails({ ...userDetails, email });
    if (errors) {
      errors.email = "";
    }
  }

  function handlePassword(e) {
    const password = e.target.value;
    setUserDetails({ ...userDetails, password });
    if (errors) {
      errors.password = "";
    }
  }

  function handleConfirmPassword(e) {
    const confirmPassword = e.target.value;
    setUserDetails({ ...userDetails, confirmPassword });
    if (errors && confirmPassword === userDetails.password) {
      errors.confirmPassword = "";
    }
  }

  function handleFile(e) {
    const file = e.target.files[0];
    const fileName = file.name;
    const allowedExtensions = ["jpeg", "jpg", "png"];
    const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

    if (file && !allowedExtensions.includes(extension)) {
      setDisplayFileName("Upload JPED, JPG and PNG only");
    }

    if (file && allowedExtensions.includes(extension)) {
      setUserDetails({ ...userDetails, file });
      setDisplayFileName(file.name.substring(0, 22) + "...");
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    const { username, email, password, confirmPassword, file } = userDetails;
    const { errors, valid } = validateSingup(
      username,
      email,
      password,
      confirmPassword
    );

    if (!valid) return setErrors(errors);

    const url = "/api/profilepictures";
    const placeholderPictureUrl = `https://res.cloudinary.com/dclqr5vie/image/upload/v1625649523/blogimages/profilepictures/placeholder.png`;

    try {
      setLoading(true);

      const user = await userSignup(email, password);
      if (!user) throw new Error();
      async function uploadProfilePhoto(image, endpoint) {
        const results = await uploadImages(image, endpoint);
        const { url, publicId } = results.data;
        return { url, publicId, photo: true };
      }

      // //upload image to cloudinary if available otherwise use placeholder url
      const profilePicture = file
        ? await uploadProfilePhoto(file, url)
        : {
            url: placeholderPictureUrl,
            publicId: "blogimages/profilepictures/placeholder.png",
            uploadedPhoto: false,
          };

      await database.users.doc(user.uid).set({
        username,
        email,
        profilePicture,
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        setErrors({ email: err.message });
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="signup__container">
      <div className="signup__container-header">
        <div className="navigation__container-logo">
          <p>IB</p>
        </div>
      </div>
      <div className="signup__container-form">
        <h1>Create your Insights Account</h1>
        <form onSubmit={(e) => handleSignup(e)}>
          <label className={errors && errors.username ? "danger" : ""}>
            {errors && errors.username ? errors.username : "Username"}
            <input type="text" onChange={(e) => handleUsername(e)} required />
          </label>
          <label className={errors.email ? "danger" : ""}>
            {(errors && errors.email) || (errors && errors.userExists)
              ? errors.email
              : "Email"}
            <input type="email" onChange={(e) => handleEmail(e)} required />
          </label>
          <label className={errors && errors.password ? "danger" : ""}>
            {errors && errors.password ? errors.password : "Password"}
            <input
              type="password"
              onChange={(e) => handlePassword(e)}
              required
            />
          </label>
          <label className={errors && errors.confirmPassword ? "danger" : ""}>
            {errors && errors.confirmPassword
              ? errors.confirmPassword
              : "Confirm Password"}
            <input
              type="password"
              onChange={(e) => handleConfirmPassword(e)}
              required
            />
          </label>
          <div className="singup__container-formFile">
            <label>
              <input type="file" onChange={(e) => handleFile(e)} />
              <span>{displayFiileName}</span>
              <p>Browse</p>
            </label>
          </div>
          <button
            disabled={loading}
            className={`signup__control ${loading ? "button__loading" : ""}`}
            type="submit"
          >
            <span className={loading ? "loading__text" : ""}>Sign Up</span>
          </button>
        </form>
      </div>
    </div>
  );
}
