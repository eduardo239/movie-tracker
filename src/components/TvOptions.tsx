import React, { useEffect, useState } from "react";
import { IAddMovieToList, ITvDetails, TListType } from "../abstract/interfaces";
import { useAuth } from "../context/AuthContext";
import { Button, Divider, Header, Icon, Segment } from "semantic-ui-react";
import { DocumentData } from "firebase/firestore";
import { useMovie } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

const TvOptions = ({ tv }: { tv: ITvDetails | null }) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();
  const { addMovieToList, getUserMovieList } = useMovie();

  const [seasons, setSeasons] = useState<number[] | null>(null);
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

  useEffect(() => {
    getTvList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tv]);

  if (tv)
    return (
      <Segment basic>
        {isAuthenticated ? (
          <Button.Group fluid size="big" color="black">
            <Button
              icon
              basic={tracker?.listType === "see" ? false : true}
              onClick={() => handleClick("see")}
            >
              <Icon name="add" /> Add to List
            </Button>
            <Button
              icon
              basic={tracker?.listType === "saw" ? false : true}
              onClick={() => handleClick("saw")}
            >
              <Icon name="check" /> "I Already Saw
            </Button>
            <Button
              icon
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
          seasons.map((season, i) => <Button key={i + 1}>{i + 1}</Button>)}
      </Segment>
    );
  else return null;
};

export default TvOptions;
