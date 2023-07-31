import Input from "../../components/Input/Input";
import "./sign-up-page.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function SignUpPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/register", {
        email: event.target.email.value,
        password: event.target.password.value,
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
      });
      navigate("/login");
    } catch (error) {
      event.target.reset();
      setError(error.response.data);
    }
  };

  return (
    <main className="signup-page">
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup__title">SIGN UP</h1>
        <Input type="text" name="first_name" label="First name" />
        <Input type="text" name="last_name" label="Last name" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <button className="signup__button">Sign up</button>
        <p>{error}</p>
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default SignUpPage;
