import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import { IMovieDetails, TListType } from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { Button, Icon, Segment } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import DataOptions from "./DataOptions";

const MovieOptions = ({ movie }: { movie: IMovieDetails | null }) => {
  const navigate = useNavigate();

  const { getUserMovieList, handleSaveListType } = useMovie();
  const { isAuthenticated, user } = useAuth();

  const [tracker, setTracker] = useState<DocumentData | null>(null);

  const getMovieList = async () => {
    if (user) {
      if (movie) {
        const response = await getUserMovieList({
          userId: user.uid,
          movieId: movie.id,
          fullList: false,
          mediaType: "movie",
        });
        console.log(response);
        if (response.movieList.length > 0) {
          setTracker(response.movieList[0]);
        }
      } else {
        alert("error movie get movie list");
      }
    } else {
      alert("error user get movie list");
    }
  };

  const handleClick = async (listType: TListType) => {
    const response = await handleSaveListType(listType, movie, "movie");

    if (response) {
      setTracker(response.movieList[0]);
    } else {
      alert("error get response, handle click");
    }
  };

  useEffect(() => {
    if (user) getMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, movie]);

  if (movie)
    return (
      <Segment basic inverted>
        {isAuthenticated ? (
          <DataOptions listType={tracker?.listType} handleClick={handleClick} />
        ) : (
          <Button
            inverted
            icon
            color="orange"
            onClick={() => navigate("/sign-in")}
          >
            <Icon name="sign in" /> Entrar
          </Button>
        )}
      </Segment>
    );
  else return null;
};

export default MovieOptions;
