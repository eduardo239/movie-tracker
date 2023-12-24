import LoadingInfo from "../components/Elements/LoadingInfo";
import MessageInfo from "../components/Info/Message";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { IMovieResults } from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import GridContainer from "../components/Layout/GridContainer";
import DataGroup from "../components/DataGroup";

import { useEffect, useState } from "react";
import TitleInfo from "../components/Elements/TitleInfo";
import PaginationBar from "../components/PaginationBar";
import { GENRES } from "../abstract/genres";
import { useAuth } from "../context/AuthContext";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieByGenre = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { mediaType, userTrackerTv, userTrackerMovie } = useMovie();
  const [page, setPage] = useState(1);

  const [genreName, setGenreName] = useState<string | null>(null);

  const genreUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&with_genres=${id}&page=${page}`;
  const { data, loading, error } = useFetch<IMovieResults>(genreUrl);

  useEffect(() => {
    if (id) {
      const genreName = GENRES.filter((x) => x.id === +id)[0];
      if (genreName) setGenreName(genreName.name);
    }
  }, [id]);

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
          userTrackerList={userTrackerTv.concat(userTrackerMovie)}
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
