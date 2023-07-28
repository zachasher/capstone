import Input from "../../components/Input/Input";
import "./sign-up-page.scss";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <main className="signup-page">
      <form className="signup">
        <h1 className="signup__title">SIGN UP</h1>
        <Input type="text" name="first_name" label="First name" />
        <Input type="text" name="last_name" label="Last name" />
        <Input type="text" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <button className="signup__button">Sign up</button>
        <p></p>
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default SignUpPage;
