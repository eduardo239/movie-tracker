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

const TvOptions = ({ tv }: { tv: ITvDetails | null }) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  const { addMovieToList, addTvToList, getUserMovieList } = useMovie();

  const [seasons, setSeasons] = useState<number[] | null>(null);
  const [savedSeasons, setSavedSeasons] = useState<number[]>([]);
  const [tracker, setTracker] = useState<DocumentData | null>(null);

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

  const handleClick = async (listType: TListType) => {
    if (user) {
      //
      if (tv) {
        //
        const content: IAddMovieToList = {
          mediaType: "tv",
          listType: listType,
          movieId: tv.id,
          userId: user.uid,
          poster: tv.poster_path,
          title: tv.name,
        };

        await addMovieToList(content);
        await getTvList();
      } else {
        alert("tv required");
      }
    } else {
      alert("login required");
    }
  };

  const getTvList = async () => {
    if (user && tv) {
      const response = await getUserMovieList({
        userId: user.uid,
        movieId: tv.id,
        fullList: false,
        mediaType: "tv",
      });

      if (Array.isArray(response.tvList) && response.tvList.length > 0) {
        setTracker(response.tvList[0]);
      }
    }
  };
  const getSeasons = async () => {
    if (user && tv) {
      const response = await getUserMovieList({
        userId: user.uid,
        movieId: tv.id,
        fullList: false,
        mediaType: "tv",
      });
      if (Array.isArray(response.tvList) && response.tvList.length > 0) {
        const _seasons = response.tvList[0].seasons;
        if (_seasons.length > 0) {
          setSavedSeasons(response.tvList[0].seasons);
        } else {
          return;
        }
      }
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
    getTvList();
    getSeasons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tv]);

  if (tv)
    return (
      <Segment basic>
        {isAuthenticated ? (
          <Button.Group fluid size="big" positive>
            <Button
              icon
              color={tracker?.listType === "see" ? "orange" : "grey"}
              basic={tracker?.listType === "see" ? false : true}
              onClick={() => handleClick("see")}
            >
              <Icon name="add" /> Add to List
            </Button>
            <Button
              icon
              color={tracker?.listType === "saw" ? "black" : "grey"}
              basic={tracker?.listType === "saw" ? false : true}
              onClick={() => handleClick("saw")}
            >
              <Icon name="check" /> I Already Saw
            </Button>
            <Button
              icon
              color={tracker?.listType === "block" ? "black" : "grey"}
              basic={tracker?.listType === "block" ? false : true}
              onClick={() => handleClick("block")}
            >
              <Icon name="delete" /> Block
            </Button>
          </Button.Group>
        ) : (
          <Button icon color="orange" onClick={() => navigate("/sign-in")}>
            <Icon name="sign in" /> Sign In
          </Button>
        )}

        <Divider />
        <Header as="h3">Temporadas</Header>

        {seasons &&
          seasons.map((season, i) => {
            const _saved = savedSeasons.some((x) => x === season + 1);

            return (
              <Button
                basic={_saved ? false : true}
                color={`${_saved ? "orange" : "grey"}`}
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
