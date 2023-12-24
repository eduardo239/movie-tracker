import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IMovieDetails, TListType } from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { Button, Divider, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import DataOptions from "./DataOptions";
import { useData } from "../context/DataContext";
import { IGetUserTracker, ISetUserTracker } from "../abstract/interfaces2";

type TMovieOptions = { data: IMovieDetails | null };

const MovieOptions = ({ data }: TMovieOptions) => {
  const navigate = useNavigate();

  const { setUserTracker, getUserTracker } = useData();
  const { isAuthenticated, user } = useAuth();
  const [tracker, setTracker] = useState<DocumentData | null>(null);
  const [params, _] = useSearchParams();

  const handleClick = async (listType: TListType) => {
    if (user && data) {
      const _payload: ISetUserTracker = {
        listType,
        data,
        mediaType: "movie",
        user,
      };
      await setUserTracker(_payload);
      const response = await getUserTracker(_payload);
      if (response) setTracker(response);
      else setTracker(null);
    }
  };

  const handleGetUserTrackerItem = async () => {
    if (user && data) {
      const payload: IGetUserTracker = {
        data,
        mediaType: "movie",
        user,
      };
      const response = await getUserTracker(payload);
      if (response) setTracker(response);
    }
  };

  useEffect(() => {
    if (user && data) {
      handleGetUserTrackerItem();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data, params.get("id")]);

  if (data)
    return (
      <>
        <Divider />
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
        <Divider />
      </>
    );
  else return null;
};

export default MovieOptions;
