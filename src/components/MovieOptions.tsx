import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IMovieDetails, TListType } from "../abstract/interfaces";
import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import DataOptions from "./DataOptions";
import { useData } from "../context/DataContext";
import { IGetUserTracker, ISetUserTracker } from "../abstract/interfaces2";

type TMovieOptions = { data: IMovieDetails | null };

const MovieOptions = ({ data }: TMovieOptions) => {
  const navigate = useNavigate();
  // const { handleSetTracker, getTracker } = useMovie(); REMOVED
  const { setUserTracker } = useData();
  const { isAuthenticated, user } = useAuth();
  const [tracker, setTracker] = useState<DocumentData | null>(null);
  //
  const { getUserTracker } = useData();

  const handleClick = async (listType: TListType) => {
    if (user) {
      if (data) {
        const _payload: ISetUserTracker = {
          listType,
          data: data,
          mediaType: "movie",
          user,
        };
        await setUserTracker(_payload);
        const response = await getUserTracker(_payload);
        if (response) setTracker(response);
      }
    }
  };

  const handleGetUserTrackerItem = async () => {
    if (user) {
      if (data) {
        const payload: IGetUserTracker = {
          data: data,
          mediaType: "movie",
          user: user,
        };
        const response = await getUserTracker(payload);
        if (response) setTracker(response);
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
