import { useState } from "react";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

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
    <Grid centered columns={3}>
      <Grid.Column mobile={16} tablet={10} computer={5}>
        <Segment padded>
          <Form onSubmit={handleSubmit}>
            <Header as="h3">Registrar</Header>

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

            <Button color="green" type="submit">
              Sign In
            </Button>
          </Form>

          <Segment>
            <Link to="/sign-in">Já possui uma conta?</Link>
          </Segment>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default SignIn;
