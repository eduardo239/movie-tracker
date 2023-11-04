import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiCheckCircle, FiClock, FiLogIn, FiSlash } from "react-icons/fi";
import { useMovie } from "../context/MovieContext";
import {
  IAddMovieToList,
  IMovieDetails,
  ITvDetails,
  TListType,
} from "../abstract/interfaces";
import { useEffect } from "react";

const MovieOptions = ({ movie }: { movie: IMovieDetails }) => {
  const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addMovieToList, trackerList, getUserMovieTracker } = useMovie();

  const handleAdd = (listType: TListType, savedStatus: boolean = false) => {
    const listType_ = {
      see: listType === "see",
      saw: listType === "saw",
      block: listType === "block",
    };

    if (user) {
      if (movie) {
        const content: IAddMovieToList = {
          mediaType: "movie",
          listType: listType_,
          movieId: movie.id + "",
          userId: user.uid,
          poster: `${apiPosterUrl}${movie.poster_path}`,
          title: movie.title,
        };
        addMovieToList(content);

        getUserMovieTracker(movie.id + "", user.uid);
      } else {
        //TODO: movie id not found
      }
    } else {
      //TODO: user not found
    }
  };

  useEffect(() => {
    (async () => {
      if (user && movie.id) {
        getUserMovieTracker(movie.id + "", user.uid);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, movie.id]);

  return (
    <div className="flex gap">
      {isAuthenticated ? (
        <>
          <button
            className={`btn  ${
              trackerList?.listType?.see ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handleAdd("see", trackerList?.listType?.see)}
          >
            <FiClock /> {trackerList?.listType?.see ? "Remove" : "I Will See"}
          </button>
          <button
            className={`btn  ${
              trackerList?.listType?.saw ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handleAdd("saw", trackerList?.listType?.saw)}
          >
            <FiCheckCircle />{" "}
            {trackerList?.listType?.saw ? "Remove" : "I've seen"}
          </button>
          <button
            className={`btn  ${
              trackerList?.listType?.block ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handleAdd("block", trackerList?.listType?.block)}
          >
            <FiSlash />
            {trackerList?.listType?.block ? "Remove" : "I don't want to see"}
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
