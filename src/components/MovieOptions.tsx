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
import { Button, Icon } from "semantic-ui-react";

const MovieOptions = ({ movie }: { movie: IMovieDetails | null }) => {
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
      if (movie) {
        if (user && movie.id) {
          getUserMovieTracker(movie.id + "", user.uid);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, movie]);

  if (movie)
    return (
      <div>
        {isAuthenticated ? (
          <Button.Group basic>
            <Button
              icon
              onClick={() => handleAdd("see", trackerList?.listType?.see)}
            >
              <Icon name="add" />{" "}
              {trackerList?.listType?.see ? "Remove" : "I Will See"}
            </Button>
            <Button
              icon
              onClick={() => handleAdd("saw", trackerList?.listType?.saw)}
            >
              <Icon name="check" />{" "}
              {trackerList?.listType?.saw ? "Remove" : "I've seen"}
            </Button>
            <Button
              icon
              onClick={() => handleAdd("block", trackerList?.listType?.block)}
            >
              <Icon name="delete" />{" "}
              {trackerList?.listType?.block ? "Remove" : "I don't want to see"}
            </Button>
          </Button.Group>
        ) : (
          <Button icon color="orange" onClick={() => navigate("/sign-in")}>
            <Icon name="sign in" /> Sign In
          </Button>
        )}
      </div>
    );
  else return null;
};

export default MovieOptions;
