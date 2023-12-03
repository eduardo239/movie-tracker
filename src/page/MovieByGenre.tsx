import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { IMovieResults } from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieByGenre = () => {
  const { id } = useParams();

  const { mediaType } = useMovie();

  const genreUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&with_genres=${id}&page=1`;

  const { data, loading, error } = useFetch<IMovieResults>(genreUrl);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <Segment inverted basic style={{ margin: 0 }}>
      {/* <PaginationComponent /> */}

      <GridContainer centered gap="gap-sm">
        <DataGroup data={data ? data.results : []} />
      </GridContainer>

      {/* <PaginationComponent /> */}
    </Segment>
  );
};

export default MovieByGenre;
