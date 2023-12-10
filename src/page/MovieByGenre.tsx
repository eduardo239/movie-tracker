import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { IMovieResults } from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";

import { useEffect, useState } from "react";
import TitleInfo from "../components/TitleInfo";
import PaginationBar from "../components/PaginationBar";
import { GENRES } from "../abstract/genres";
import { useAuth } from "../context/AuthContext";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieByGenre = () => {
  const { id } = useParams();

  const { mediaType, userTrackerList, handleGetUserWatchListAndReturn } =
    useMovie();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [genreName, setGenreName] = useState<string | null>(null);

  const genreUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&with_genres=${id}&page=${page}`;
  const { data, loading, error } = useFetch<IMovieResults>(genreUrl);

  useEffect(() => {
    if (id) {
      const _genreName = GENRES.filter((x) => x.id === +id)[0];
      if (_genreName) setGenreName(_genreName.name);
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      handleGetUserWatchListAndReturn();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <Segment inverted basic style={{ margin: 0 }}>
      {genreName && <TitleInfo center as="h1" title={genreName} />}

      <PaginationBar
        page={page}
        setPage={setPage}
        url={`/genre/${id}?page=${page}`}
      />

      <GridContainer centered gap="gap-sm">
        <DataGroup
          data={data ? data.results : []}
          userTrackerList={userTrackerList}
        />
      </GridContainer>

      <PaginationBar
        page={page}
        setPage={setPage}
        url={`/genre/${id}?page=${page}`}
      />
    </Segment>
  );
};

export default MovieByGenre;
