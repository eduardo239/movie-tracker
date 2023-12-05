import { useEffect, useState } from "react";
import {
  IAddTvToList,
  ITvDetails,
  TListType,
  ISaveItemToWatchList,
} from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import DataOptions from "./DataOptions";
import TitleInfo from "./TitleInfo";

type TTvOptions = { data: ITvDetails | null };

const TvOptions = ({ data }: TTvOptions) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  const {
    handleAddSeasonToTvList,
    handleSaveToWatchList,
    handleGetUserWatchList,
  } = useMovie();

  const [seasons, setSeasons] = useState<number[] | null>(null);
  const [savedSeasons, setSavedSeasons] = useState<number[]>([]);
  const [tracker, setTracker] = useState<DocumentData | null>(null);

  // busca as temporadas do usuário
  const getSeasons = async () => {
    if (user) {
      //
      if (data) {
        await fetchUserWatchList();
      } else {
        alert("[getSeasons] - TV not found");
      }
    } else {
      alert("[getSeasons] - User not found");
    }
  };
  // salva na watch list
  const handleClick = async (listType: TListType) => {
    const _data: ISaveItemToWatchList = {
      listType,
      data: data,
      mediaType: "tv",
      user,
    };

    const response = await handleSaveToWatchList(_data);

    if (response) {
      setTracker(response.tvList[0]);
    } else {
      alert("[handleClick] - response not found");
    }
  };
  // salva a temporada na watch list do usuário
  const handleSaveSeason = async (season: number) => {
    if (user) {
      //
      if (data) {
        //
        if (tracker) {
          // check if exists, filter else add
          const _alreadySaved = savedSeasons.some((x) => season === x);

          if (_alreadySaved) {
            // remove
            const _updatedList = savedSeasons.filter((x) => x !== season);

            // update
            const content: IAddTvToList = {
              mediaType: "tv",
              listType: tracker.listType,
              movieId: data.id,
              userId: user.uid,
              poster: data.poster_path,
              title: data.name,
              seasons: _updatedList,
            };
            await handleAddSeasonToTvList(content);
            await fetchUserWatchList();
          } else {
            // save

            const content: IAddTvToList = {
              mediaType: "tv",
              listType: tracker.listType,
              movieId: data.id,
              userId: user.uid,
              poster: data.poster_path,
              title: data.name,
              seasons: [...savedSeasons, season],
            };
            await handleAddSeasonToTvList(content);
            await fetchUserWatchList();
          }

          await getSeasons();
        } else {
          alert("[handleSaveSeason] - tracker type not selected");
        }
      } else {
        alert("[handleSaveSeason] - data not found");
      }
    } else {
      alert("[handleSaveSeason] - user not found");
    }
  };
  // busca a watch list do usuário e carrega os valores
  const fetchUserWatchList = async () => {
    const response: DocumentData | null = await handleGetUserWatchList({
      data: data,
      mediaType: "tv",
      user,
    });

    if (response) {
      if (response.userWatchList.seasons) {
        setSavedSeasons(response.userWatchList.seasons);
      } else {
        setTracker(response.userWatchList);
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
    if (user && data) fetchUserWatchList();
    if (user) getSeasons();
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

        <TitleInfo title="Temporadas" />

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
