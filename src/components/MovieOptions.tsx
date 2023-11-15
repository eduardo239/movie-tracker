import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import {
  IAddMovieToList,
  IMovieDetails,
  TListType,
} from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

const MovieOptions = ({ movie }: { movie: IMovieDetails | null }) => {
  const apiPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addMovieToList, trackerList, getUserMovieTracker } = useMovie();

  const [see, setSee] = useState(false);
  const [saw, setSaw] = useState(false);
  const [block, setBlock] = useState(false);

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
    if (trackerList) {
      setSee(trackerList?.listType?.see);
      setSaw(trackerList?.listType?.saw);
      setBlock(trackerList?.listType?.block);
    }
  }, [trackerList]);

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
      <Segment basic>
        {isAuthenticated ? (
          <Button.Group basic>
            <Button
              icon
              color={`${see ? "orange" : "instagram"}`}
              basic
              onClick={() => handleAdd("see", see)}
            >
              <Icon name="add" /> {see ? "Remove" : "I Will See"}
            </Button>
            <Button
              icon
              color={`${saw ? "orange" : "instagram"}`}
              basic
              onClick={() => handleAdd("saw", saw)}
            >
              <Icon name="check" /> {saw ? "Remove" : "I've seen"}
            </Button>
            <Button
              icon
              color={`${block ? "orange" : "instagram"}`}
              basic
              onClick={() => handleAdd("block", block)}
            >
              <Icon name="delete" /> {block ? "Remove" : "I don't want to see"}
            </Button>
          </Button.Group>
        ) : (
          <Button icon color="orange" onClick={() => navigate("/sign-in")}>
            <Icon name="sign in" /> Sign In
          </Button>
        )}
      </Segment>
    );
  else return null;
};

export default MovieOptions;
