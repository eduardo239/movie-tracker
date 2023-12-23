import { useEffect, useState } from "react";
import { ITvDetails, TListType } from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DataOptions from "./DataOptions";
import TitleInfo from "./Elements/TitleInfo";
import { IGetUserTracker, ISetUserTracker } from "../abstract/interfaces2";
import { useData } from "../context/DataContext";
import { toast } from "react-toastify";
import { ERR_USER_NOT_FOUND } from "../abstract/constants";

type TTvOptions = { data: ITvDetails | null };

const TvOptions = ({ data }: TTvOptions) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();

  const [seasons, setSeasons] = useState<number[] | null>(null);
  const [savedSeasons, setSavedSeasons] = useState<number[]>([]);
  const [tracker, setTracker] = useState<DocumentData | null>(null);
  //
  const {
    getUserTracker,
    setUserTracker,
    setUserTrackerSeason,
    delUserTracker,
  } = useData();

  // salva na watch list
  const handleClick = async (listType: TListType) => {
    if (user) {
      if (data) {
        const _payload: ISetUserTracker = {
          listType,
          data: data,
          mediaType: "tv",
          user,
        };

        if (tracker) {
          const saved = _payload.listType === tracker.listType;
          if (saved) {
            await delUserTracker(tracker.id);
            setTracker(null);
            setSavedSeasons([]);
            return;
          }
        }
        await setUserTracker(_payload);
        const response = await getUserTracker(_payload);
        if (response) setTracker(response);
      }
    }
  };
  // salva a temporada na watch list do usuário
  const handleSaveSeason = async (season: number) => {
    if (user) {
      //
      if (data) {
        //
        if (tracker) {
          // check if exists
          const _alreadySaved = savedSeasons.some((x) => season === x);
          const _payload2: ISetUserTracker = {
            listType: tracker.listType,
            data: data,
            mediaType: "tv",
            user: user,
          };

          if (_alreadySaved) {
            // remove
            const _updatedList = savedSeasons.filter((x) => x !== season);

            const _payload: ISetUserTracker = {
              ..._payload2,
              seasons: _updatedList,
            };

            await setUserTrackerSeason(_payload);
            await handleGetUserTrackerItem();
          } else {
            // save
            const _payload: ISetUserTracker = {
              ..._payload2,
              seasons: [...savedSeasons, season],
            };

            await setUserTrackerSeason(_payload);
            await handleGetUserTrackerItem();
          }
        } else {
          toast.info("Selecione primeiro o Tracker (Vou Ver, Já Vi, Bloquear)");
        }
      } else {
        toast.info("Filme/Série não encontrado.");
      }
    } else {
      toast.info(ERR_USER_NOT_FOUND);
    }
  };
  //
  const handleGetUserTrackerItem = async () => {
    if (user) {
      if (data) {
        const _payload: IGetUserTracker = {
          data: data,
          mediaType: "tv",
          user,
        };
        const response = await getUserTracker(_payload);
        if (response) setTracker(response);

        if (response && !response.seasons) return;
        else if (response) setSavedSeasons(response.seasons);
      }
    }
  };

  useEffect(() => {
    if (data) {
      //
      if (data.seasons && data.seasons.length > 0) {
        // adiciona as temporadas dinamicamente na página
        const _array = Array.from(Array(data.seasons.length).keys());
        setSeasons(_array);
      }
    }
    return () => {};
  }, [data]);

  useEffect(() => {
    if (user && data) handleGetUserTrackerItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data]);

  if (data)
    return (
      <>
        {isAuthenticated ? (
          <DataOptions
            data={data}
            listType={tracker?.listType}
            handleClick={handleClick}
          />
        ) : (
          <Button icon color="green" onClick={() => navigate("/sign-in")}>
            <Icon name="sign in" /> Sign In
          </Button>
        )}

        <TitleInfo center title="Temporadas" />

        {seasons &&
          seasons.map((season, i) => {
            const isSaved = savedSeasons.some((x) => x === season + 1);
            return (
              <Button
                basic={isSaved ? false : true}
                color={`${isSaved ? "green" : "grey"}`}
                onClick={() => handleSaveSeason(i + 1)}
                key={i + 1}
              >
                {i + 1}
              </Button>
            );
          })}
      </>
    );
  else return null;
};

export default TvOptions;
