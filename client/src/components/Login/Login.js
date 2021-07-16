import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Login.css";

import { useAuth } from "../../contexts/AuthContext";

import { validateLogin } from "../../utils/validate";

export default function Login() {
  const { userLogin } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
      history.push("/dashboard");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrors({ ...errors, email: "User not found" });
      }
      if (err.code === "auth/wrong-password") {
        setErrors({ ...errors, password: "Wrong password" });
      }
      setLoading(false);
    }
  }

  function goHome() {
    history.push("/");
  }

  return (
    <div className="login__container">
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="login__header">
          <p onClick={goHome}>IB</p>
          <p>LOGIN</p>
        </div>
        <label className={errors && errors.email ? "danger" : ""}>
          {errors && errors.email ? errors.email : "Email"}
          <input type="email" onChange={(e) => handleEmail(e)} required />
        </label>
        <label className={errors && errors.password ? "danger" : ""}>
          {errors && errors.password ? errors.password : "Password"}
          <input type="password" onChange={(e) => handlePassword(e)} required />
        </label>
        <button
          disabled={loading}
          className={loading ? "loadingButton loginButton__loading" : ""}
          type="submit"
        >
          <span className={loading ? "loginLoading__text" : ""}>Login</span>
        </button>
      </form>
    </div>
  );
}
