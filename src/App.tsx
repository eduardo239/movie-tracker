import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import MoviePage from "./page/MoviePage";
import Navigation from "./components/Navigation";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import { useAuth } from "./context/AuthContext";
import Message from "./components/Message";
import TvPage from "./page/TvPage";
import ListPage from "./page/ListPage";
import { Container } from "semantic-ui-react";

function App() {
  const { authMessage } = useAuth();

  return (
    <>
      {authMessage && <Message message={authMessage} />}
      <Navigation />

      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all" element={<HomePage />} />
          <Route path="/search" element={<HomePage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
