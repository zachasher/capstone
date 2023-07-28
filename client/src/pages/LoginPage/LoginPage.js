import React from "react";
import Input from "../../components/Input/Input"
import { Link } from "react-router-dom";
import "./login-page.scss"

function LoginPage() {
  return (
    <div>
      <main className="login-page">
        <form className="login">
          <h1 className="login__title">Log in</h1>
          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <button className="login__button">Log in</button>
          {/* {error && <div className="login__message">{error}</div>} */}
        </form>
        <p>
          Need an account? <Link to="/register">Sign up</Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
