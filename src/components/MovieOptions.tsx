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
import { toast } from "react-toastify";
import { ERR_RESPONSE_NOT_FOUND } from "../abstract/constants";

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
      toast.error(ERR_RESPONSE_NOT_FOUND);
    }
  };

  const handleGetUserTrackerItem = async () => {
    const payload: IGetUserWatchList = {
      data: movie,
      mediaType: "movie",
      user,
    };
    const response = await handleGetUserWatchList(payload);

    if (response) setTracker(response.userWatchList);
  };

  useEffect(() => {
    if (user && movie) {
      handleGetUserTrackerItem();
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
