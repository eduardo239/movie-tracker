import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import {
  IMovieDetails,
  IGetUserWatchList,
  TListType,
  ISaveItemToWatchList,
} from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import DataOptions from "./DataOptions";
import { getUserWatchList } from "../fetch/firebase";

type TMovieOptions = { movie: IMovieDetails | null };

const MovieOptions = ({ movie }: TMovieOptions) => {
  const navigate = useNavigate();

  const { handleSaveToWatchList, handleGetUserWatchList } = useMovie();
  const { isAuthenticated, user } = useAuth();

  const [params, _] = useSearchParams();
  const [id, setId] = useState<string>(params.get("id") + "");

  const [tracker, setTracker] = useState<DocumentData | null>(null);

  const handleClick = async (listType: TListType) => {
    const _data: ISaveItemToWatchList = {
      listType,
      data: movie,
      mediaType: "movie",
      user,
    };
    const response = await handleSaveToWatchList(_data);

    if (response) {
      setTracker(response.movieList[0]);
    } else {
      alert("[handleClick] - response not found");
    }
  };

  useEffect(() => {
    if (user && movie) {
      (async () => {
        const response: DocumentData | null = await handleGetUserWatchList({
          data: movie,
          mediaType: "movie",
          user,
        });
        if (response) setTracker(response.userWatchList);
      })();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, movie]);

  if (movie)
    return (
      <>
        {isAuthenticated ? (
          <DataOptions
            listType={tracker?.listType}
            handleClick={handleClick}
            data={movie}
          />
        ) : (
          <Button icon color="green" onClick={() => navigate("/sign-in")}>
            <Icon name="sign in" /> Entrar
          </Button>
        )}
      </>
    );
  else return null;
};

export default MovieOptions;
