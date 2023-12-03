import { useEffect, useState } from "react";
import {
  IAddTvToList,
  ITvDetails,
  IGetUserWatchList,
  TListType,
  ISaveItemToWatchList,
} from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Header, Icon } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import DataOptions from "./DataOptions";
import { getUserWatchList } from "../fetch/firebase";

type TTvOptions = { tv: ITvDetails | null };

const TvOptions = ({ tv }: TTvOptions) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  const { handleAddSeasonToTvList, handleSaveToWatchList } = useMovie();

  const [seasons, setSeasons] = useState<number[] | null>(null);
  const [savedSeasons, setSavedSeasons] = useState<number[]>([]);
  const [tracker, setTracker] = useState<DocumentData | null>(null);

  const getTvList = async () => {
    if (user) {
      //
      if (tv) {
        const _data: IGetUserWatchList = {
          data: tv,
          mediaType: "tv",
          user,
        };
        const response = await getUserWatchList(_data);
        if (!response) {
          alert("response not found, get movie list");
          return;
        }
        console.log(response.tvList);
        if (response.tvList.length > 0) {
          setTracker(response.tvList[0]);
          // atualiza as temporadas salvas
          setSavedSeasons(response.tvList[0].seasons);
        }
      } else {
        alert("error movie get movie list");
      }
    } else {
      alert("error user get movie list");
    }
  };
  // TODO: refazer get seasons
  const getSeasons = async () => {
    if (user) {
      if (tv) {
        await getTvList();

        // get user watch list, tv seasons

        // if contains, remove

        // else add
      } else {
        alert("error, get seasons,tv required");
      }
    } else {
      alert("error, get seasons, user required");
    }
  };

  const handleClick = async (listType: TListType) => {
    const _data: ISaveItemToWatchList = {
      listType,
      data: tv,
      mediaType: "tv",
      user,
    };
    const response = await handleSaveToWatchList(_data);
    // const response = await handleSaveToWatchList(listType, tv, "tv");
    if (response) {
      setTracker(response.tvList[0]);
    } else {
      alert("error get response, handle click");
    }
  };

  const handleSaveSeason = async (season: number) => {
    if (user) {
      //
      if (tv) {
        //
        if (tracker) {
          // get seasons, and update

          // check if exists, filter else add

          const _alreadySaved = savedSeasons.some((x) => season === x);

          if (_alreadySaved) {
            // remove
            const _updatedList = savedSeasons.filter((x) => x !== season);

            // update
            const content: IAddTvToList = {
              mediaType: "tv",
              listType: tracker.listType,
              movieId: tv.id,
              userId: user.uid,
              poster: tv.poster_path,
              title: tv.name,
              seasons: _updatedList,
            };
            await handleAddSeasonToTvList(content);
          } else {
            // save
            // update
            const content: IAddTvToList = {
              mediaType: "tv",
              listType: tracker.listType,
              movieId: tv.id,
              userId: user.uid,
              poster: tv.poster_path,
              title: tv.name,
              seasons: [...savedSeasons, season],
            };
            await handleAddSeasonToTvList(content);
          }

          await getTvList();
          await getSeasons();
        } else {
          alert("select see,saw,block");
        }
      } else {
        alert("tv required");
      }
    } else {
      alert("login required");
    }
  };

  useEffect(() => {
    if (tv) {
      if (tv.seasons && tv.seasons.length > 0) {
        // add seasons to buttons options
        const _array = Array.from(Array(tv.seasons.length).keys());
        setSeasons(_array);
      }
    }
    return () => {};
  }, [tv]);

  useEffect(() => {
    if (user) getTvList();
    if (user) getSeasons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tv]);

  if (tv)
    return (
      <>
        {isAuthenticated ? (
          <DataOptions
            data={tv}
            listType={tracker?.listType}
            handleClick={handleClick}
          />
        ) : (
          <Button icon color="green" onClick={() => navigate("/sign-in")}>
            <Icon name="sign in" /> Sign In
          </Button>
        )}

        <Header as="h3" inverted>
          Temporadas
        </Header>

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
