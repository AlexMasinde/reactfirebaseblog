import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import { validateLogin } from "../../utils/validate";

import Input from "../Input/Input";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";

import usericon from "../../icons/usericon.svg";
import passwordicon from "../../icons/passwordicon.svg";

import LoginStyles from "./Login.module.css";

export default function Login() {
  const { userLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const authError = errors && errors.auth;

  function handleEmail(e) {
    setEmail(e.target.value);
    if (errors) {
      errors.email = "";
    }
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    if (errors) {
      errors.password = "";
    }
    console.log(password);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { errors, valid } = validateLogin(email, password);

    if (!valid) {
      return setErrors(errors);
    }

    try {
      setErrors();
      setLoading(true);
      await userLogin(email, password);
      setLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        setErrors({ ...errors, auth: "User not found" });
      }
      if (err.code === "auth/wrong-password") {
        setErrors({ ...errors, auth: "Wrong password" });
      }
      setLoading(false);
    }
  }

  return (
    <div className={LoginStyles.container}>
      <Navigation />
      <div className={LoginStyles.formcontainer}>
        <h1>Welcome back!</h1>
        <p className={authError ? LoginStyles.red : ""}>
          {authError ? errors.auth : "Sign in to get the most out of IB"}
        </p>
        <form onSubmit={(e) => handleLogin(e)}>
          <Input
            type="text"
            icon={usericon}
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

          <Button type="submit" loading={loading} text="Login" />
        </form>
      </div>
    </div>
  );
}
