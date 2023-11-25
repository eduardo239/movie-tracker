import { useEffect, useState } from "react";
import {
  IAddMovieToList,
  IAddTvToList,
  ITvDetails,
  TListType,
} from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Divider, Header, Icon, Segment } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import { MEDIA_TYPE } from "../abstract/constants";
import DataOptions from "./DataOptions";

const TvOptions = ({ tv }: { tv: ITvDetails | null }) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  const { addTvToList, getUserMovieList, handleSaveListType } = useMovie();

  const [seasons, setSeasons] = useState<number[] | null>(null);
  const [savedSeasons, setSavedSeasons] = useState<number[]>([]);
  const [tracker, setTracker] = useState<DocumentData | null>(null);

  const getTvList = async () => {
    if (user) {
      if (tv) {
        const response = await getUserMovieList({
          userId: user.uid,
          movieId: tv.id,
          fullList: false,
          mediaType: "tv",
        });

        const isTvListArray = Array.isArray(response.tvList);
        if (isTvListArray && response.tvList.length > 0) {
          setTracker(response.tvList[0]);
        }
      } else {
        alert("error tv get tv list");
      }
    } else {
      alert("error user get tv list");
    }
  };
  const getSeasons = async () => {
    if (user) {
      if (tv) {
        const response = await getUserMovieList({
          userId: user.uid,
          movieId: tv.id,
          fullList: false,
          mediaType: "tv",
        });

        if (response.tvList.length > 0) {
          const _seasons = response.tvList[0].seasons;

          const isArray = Array.isArray(_seasons);
          if (isArray && _seasons.length > 0) {
            setSavedSeasons(response.tvList[0].seasons);
          }
        }
      } else {
        alert("error, get seasons,tv required");
      }
    } else {
      alert("error, get seasons, user required");
    }
  };

  const handleClick = async (listType: TListType) => {
    const response = await handleSaveListType(listType, tv, "tv");
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
            await addTvToList(content);
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
            await addTvToList(content);
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
      <Segment basic inverted>
        {isAuthenticated ? (
          <DataOptions listType={tracker?.listType} handleClick={handleClick} />
        ) : (
          <Button icon color="green" onClick={() => navigate("/sign-in")}>
            <Icon name="sign in" /> Sign In
          </Button>
        )}

        <Header as="h3">Temporadas</Header>

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
      </Segment>
    );
  else return null;
};

export default TvOptions;
