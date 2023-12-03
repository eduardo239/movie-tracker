import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import {
  IMovieDetails,
  IGetUserWatchList,
  TListType,
  ISaveListType,
  ISaveItemToWatchList,
} from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import DataOptions from "./DataOptions";
import { getUserWatchList } from "../fetch/firebase";
import { MEDIA_TYPE } from "../abstract/constants";

type TMovieOptions = { movie: IMovieDetails | null };

const MovieOptions = ({ movie }: TMovieOptions) => {
  const navigate = useNavigate();

  const { handleSaveToWatchList } = useMovie();

  const { isAuthenticated, user } = useAuth();

  const [params, _] = useSearchParams();
  const [id, setId] = useState<string>(params.get("id") + "");

  const [tracker, setTracker] = useState<DocumentData | null>(null);

  const getMovieList = async () => {
    if (user) {
      if (movie) {
        const _data: IGetUserWatchList = {
          data: movie,
          mediaType: "movie",
          user,
        };
        const response = await getUserWatchList(_data);
        if (!response) {
          alert("response not found, get movie list");
          return;
        }
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
      alert("error get response, handle click");
    }
  };

  useEffect(() => {
    if (user) getMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, movie, params]);

  useEffect(() => {
    // FIXME: remover bug - ao mudar de movie page, a opção de watch list não altera
    const _id = params.get("id");
    if (_id) setId(_id);
  }, [params]);

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
