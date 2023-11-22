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
import { DocumentData } from "firebase/firestore";

const MovieOptions = ({ movie }: { movie: IMovieDetails | null }) => {
  const navigate = useNavigate();

  const { addMovieToList, getUserMovieList } = useMovie();
  const { isAuthenticated, user } = useAuth();

  const [tracker, setTracker] = useState<DocumentData | null>(null);

  const handleClick = async (listType: TListType) => {
    if (user) {
      //
      if (movie) {
        //
        const content: IAddMovieToList = {
          mediaType: "movie",
          listType: listType,
          movieId: movie.id,
          userId: user.uid,
          poster: movie.poster_path,
          title: movie.title,
        };

        await addMovieToList(content);
        await getMovieList();
      } else {
        alert("movie required");
      }
    } else {
      alert("login required");
    }
  };

  const getMovieList = async () => {
    if (user && movie) {
      const response = await getUserMovieList({
        userId: user.uid,
        movieId: movie.id,
        fullList: false,
        mediaType: "movie",
      });

      if (Array.isArray(response.movieList) && response.movieList.length > 0) {
        setTracker(response.movieList[0]);
      }
    }
  };

  useEffect(() => {
    getMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, movie]);

  if (movie)
    return (
      <Segment basic>
        {isAuthenticated ? (
          <Button.Group fluid size="big" positive>
            <Button
              icon
              color={tracker?.listType === "see" ? "orange" : "grey"}
              basic={tracker?.listType === "see" ? false : true}
              onClick={() => handleClick("see")}
            >
              <Icon name="add" /> Add to List
            </Button>
            <Button
              icon
              color={tracker?.listType === "saw" ? "black" : "grey"}
              basic={tracker?.listType === "saw" ? false : true}
              onClick={() => handleClick("saw")}
            >
              <Icon name="check" /> "I Already Saw
            </Button>
            <Button
              icon
              color={tracker?.listType === "block" ? "black" : "grey"}
              basic={tracker?.listType === "block" ? false : true}
              onClick={() => handleClick("block")}
            >
              <Icon name="delete" /> Block
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
