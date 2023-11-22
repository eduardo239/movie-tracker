import { useState } from "react";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";

const SignIn = () => {
  const [email, setEmail] = useState<string>("eucrieiumaconta@gmail.com");
  const [password, setPassword] = useState<string>("123123");

  const { isAuthenticated, login, logout } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <Grid centered columns={3}>
      <Grid.Column mobile={16} tablet={10} computer={5}>
        <Segment padded>
          <Form onSubmit={handleSubmit}>
            <Header as="h3">Entrar</Header>
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
              label="Senha"
              value={password}
              setState={setPassword}
              id="sign-in-password"
            />
            <Button color="green" type="submit" fluid>
              Sign In
            </Button>
          </Form>

          <Segment>
            <Link to="">Esqueceu a senha?</Link>
          </Segment>

          <Segment>
            <Link to="/sign-up">Primeira vez aqui? Crie uma conta</Link>
          </Segment>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default SignIn;
