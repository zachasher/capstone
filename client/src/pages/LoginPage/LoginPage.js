import React from "react";
import Input from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./login-page.scss";

function LoginPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/users/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );

      sessionStorage.setItem("token", data.token);

      navigate("/profile");
      window.location.reload();
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div>
      <main className="login-page">
        <form className="login" onSubmit={handleSubmit}>
          <h1 className="login__title">LOG IN</h1>
          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <button className="login__button">Log in</button>
          {error && <div className="login__message">{error}</div>}
        </form>
        <p>
          Need an account? <Link to="/register">Sign up</Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
