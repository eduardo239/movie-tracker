import { useState } from "react";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("eucrieiumaconta@gmail.com");
  const [password, setPassword] = useState<string>("123123");

  const { isAuthenticated, login, logout } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <Grid centered columns={3}>
      <Grid.Column mobile={16} tablet={10} computer={5}>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <h2>Sign In</h2>

            <Divider />

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

            <Button color="orange" type="submit">
              Sign In
            </Button>
          </Form>

          <div>
            <Link to="">Forgot Password?</Link>
          </div>

          <div>
            <Link to="/sign-up">Your first time? Create an account</Link>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default SignIn;
