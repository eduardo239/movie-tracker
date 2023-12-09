import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./page/HomePage";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Message from "./components/Message";
import ListsPage from "./page/ListsPage";
import ListPage from "./page/ListPage";
import Navigation from "./components/Navigation";
import MovieByIdPage from "./page/MovieByIdPage";
import TvByIdPage from "./page/TvByIdPage";
import PersonPage from "./page/PersonPage";
import MovieByGenre from "./page/MovieByGenre";
import TrackerPage from "./page/TrackerPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <ToastContainer />

      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<HomePage />} />
        <Route path="/tvs" element={<HomePage />} />
        <Route path="/movies" element={<HomePage />} />
        {/*  */}
        <Route path="/tv" element={<TvByIdPage />} />
        <Route path="/movie" element={<MovieByIdPage />} />
        {/*  */}
        <Route path="/person/:id" element={<PersonPage />} />

        {/*  */}
        <Route path="/genre/:id" element={<MovieByGenre />} />
        {/*  */}
        <Route path="/lists" element={<ListsPage />} />
        <Route path="/list" element={<ListPage />} />
        {/*  */}
        <Route path="/tracker" element={<TrackerPage />} />

        {/*  */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
