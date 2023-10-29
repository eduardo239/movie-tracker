import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiCheckCircle, FiClock, FiLogIn, FiSlash } from "react-icons/fi";
import { AddMovieToList, useMovie } from "../context/MovieContext";
import { MovieDetails } from "../abstract/interfaces";

const MovieOptions = ({ movie, id }: { movie: MovieDetails; id: string }) => {
  const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addMovieToList } = useMovie();

  const handleAdd = (listType: "saw" | "see" | "block") => {
    console.log(movie);
    if (user) {
      if (movie) {
        const content: AddMovieToList = {
          type: "movie",
          list: listType,
          movieId: id,
          userId: user.uid,
          poster: `${apiPosterUrl}${movie.poster_path}`,
          title: movie.title,
        };
        console.log(content);
        addMovieToList(content);
      } else {
        //TODO: movie id not found
      }
    } else {
      //TODO: user not found
    }
  };

  return (
    <div className="flex gap">
      {isAuthenticated ? (
        <>
          <button className="btn btn-primary" onClick={() => handleAdd("see")}>
            <FiClock /> I Will See
          </button>
          <button className="btn btn-primary" onClick={() => handleAdd("saw")}>
            <FiCheckCircle /> I Saw
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleAdd("block")}
          >
            <FiSlash /> Block
          </button>
        </>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/sign-in")}
        >
          <FiLogIn />
          Sign In
        </button>
      )}
    </div>
  );
};

export default MovieOptions;
