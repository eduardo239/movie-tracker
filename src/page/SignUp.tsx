import { useState } from "react";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [username, setUsername] = useState<string>("eu_1");
  const [email, setEmail] = useState<string>("eucrieiumaconta@gmail.com");
  const [password, setPassword] = useState<string>("123123");

  const { isAuthenticated, register } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await register({ username, email, password });
  };

  return (
    <section>
      <div className="flex flex-center">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <FormField
              type="email"
              label="E-mail"
              value={email}
              setState={setEmail}
              id="sign-in-email"
            />

            <FormField
              type="text"
              label="Username"
              value={username}
              setState={setUsername}
              id="sign-in-username"
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
          </form>

          <div>
            <Link to="/sign-in">Already have an account?</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
