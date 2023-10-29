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

function App() {
  const { authMessage } = useAuth();

  return (
    <div className="relative">
      {authMessage && <Message authMessage={authMessage} />}
      <Navigation />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/tvs" element={<TvPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
