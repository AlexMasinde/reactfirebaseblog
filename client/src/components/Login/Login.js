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
  }

  function handlePassword(e) {
    setPassword(e.target.value);
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
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="login__container">
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="login__header">
          <p>IB</p>
          <p>LOGIN</p>
        </div>
        <label className={errors.email ? "danger" : ""}>
          {(errors && errors.email) || (errors && errors.userExists)
            ? errors.email || errors.userExists
            : "Email"}
          <input type="email" onChange={(e) => handleEmail(e)} required />
        </label>
        <label className={errors && errors.password ? "danger" : ""}>
          {errors && errors.password ? errors.password : "Password"}
          <input type="password" onChange={(e) => handlePassword(e)} required />
        </label>
        <button
          disabled={loading}
          className={
            loading ? "loadingButton loginButton__loading" : "loadingButton"
          }
          type="submit"
        >
          <span className={loading ? "loginLoading__text" : ""}>Login</span>
        </button>
      </form>
    </div>
  );
}
