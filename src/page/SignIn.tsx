import { useState } from "react";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState<string>("eucrieiumaconta@gmail.com");
  const [password, setPassword] = useState<string>("123123");

  const { isAuthenticated, login, logout } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <section>
      <div className="flex flex-center">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <FormField
              type="email"
              label="Email"
              value={email}
              setState={setEmail}
              id="sign-in-email"
            />

            <FormField
              type="password"
              label="Password"
              value={password}
              setState={setPassword}
              id="sign-in-password"
            />

            <button className="btn btn-primary" type="submit">
              Sign In
            </button>

            <Link to="">Forgot Password?</Link>
          </form>

          <div>
            <Link to="/sign-up">Your first time? Create an account</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
