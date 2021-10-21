import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

import { validateSingup } from "../../utils/validate";

import uploadProfilePhoto from "../../utils/uploadProfilePhoto";

import emailicon from "../../icons/emailicon.svg";
import passwordicon from "../../icons/passwordicon.svg";
import usericon from "../../icons/usericon.svg";

import Input from "../Input/Input";
import Button from "../Button/Button";

import SignupStyles from "./Signup.module.css";

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

  const authError = errors && errors.auth;

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
    <div className={SignupStyles.container}>
      <div className={SignupStyles.formcontainer}>
        <h1>Welcome!</h1>
        <p className={authError ? SignupStyles.red : ""}>
          {authError ? errors.auth : "Sign up to get the most out of IB"}
        </p>
        <form onSubmit={(e) => handleSignup(e)}>
          <Input
            type="text"
            icon={usericon}
            placeholder="Username"
            alt="username"
            onChange={handleUsername}
          />
          <Input
            type="email"
            icon={emailicon}
            placeholder="Email"
            alt="Email"
            onChange={handleEmail}
          />
          {errors && errors.email && <p>{errors.email}</p>}
          <Input
            type="password"
            icon={passwordicon}
            placeholder="Password"
            alt="Password"
            onChange={handlePassword}
          />
          {errors && errors.password && <p>{errors.password}</p>}
          <div className={SignupStyles.file}>
            <label>
              <input type="file" onChange={(e) => handleFile(e)} />
              <span>{displayFiileName}</span>
              <p>Browse</p>
            </label>
          </div>
          <Button type="submit" loading={loading} text="Signup" />
        </form>
      </div>
    </div>
  );
}
