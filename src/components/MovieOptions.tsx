import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { ERR_RESPONSE_NOT_FOUND } from "../abstract/constants";

type TMovieOptions = { data: IMovieDetails | null };

const MovieOptions = ({ data }: TMovieOptions) => {
  const navigate = useNavigate();
  const { handleSetTracker, getTracker } = useMovie();
  const { isAuthenticated, user } = useAuth();
  const [tracker, setTracker] = useState<DocumentData | null>(null);

  const handleClick = async (listType: TListType) => {
    const _payload: ISaveItemToWatchList = {
      listType,
      data: data,
      mediaType: "movie",
      user,
    };
    await handleSetTracker(_payload);
    await handleGetUserTrackerItem();
  };

  const handleGetUserTrackerItem = async () => {
    if (user) {
      const payload: IGetUserWatchList = {
        data: data,
        mediaType: "movie",
        userId: user.uid,
      };
      const response = await getTracker(payload);
      if (response) {
        console.log(response.movieList);
        setTracker(response.movieList[0]);
      }
    }
  };

  useEffect(() => {
    if (user && data) {
      handleGetUserTrackerItem();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data]);

  if (data)
    return (
      <>
        {isAuthenticated ? (
          <DataOptions
            listType={tracker?.listType}
            handleClick={handleClick}
            data={data}
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
