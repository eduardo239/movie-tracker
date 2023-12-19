import { useEffect, useState } from "react";
import FormField from "../components/Elements/FormField";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import LoadingInfo from "../components/Elements/LoadingInfo";
import TitleInfo from "../components/Elements/TitleInfo";

const SignIn = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [email, setEmail] = useState<string>("eucrieiumaconta@gmail.com");
  const [password, setPassword] = useState<string>("123123");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (user) navigate("/");
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user) return <LoadingInfo />;

  return (
    <Grid centered columns={3}>
      <Grid.Column mobile={16} tablet={10} computer={5}>
        <Segment padded>
          <Form onSubmit={handleSubmit}>
            <h3 style={{ color: "#232323" }}>Entrar</h3>

            <Divider inverted />

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
              Entrar
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
