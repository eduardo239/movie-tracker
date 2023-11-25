import { useEffect } from "react";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import useFetch from "../hooks/useFetch";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, Grid, Segment } from "semantic-ui-react";
import PaginationComponent from "../components/PaginationComponent";
import PosterLink from "../components/PosterLink";
import { IMovieResults } from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";

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
      <Card.Group itemsPerRow={6} className="gap-md flex flex-center">
        {data?.results &&
          data.results.map((x) => (
            <Grid.Column mobile={8} tablet={5} computer={4} key={x.id}>
              <PosterLink
                id={x.id}
                poster={x.poster_path}
                mediaType={mediaType}
              />
            </Grid.Column>
          ))}
      </Card.Group>
      {/* <PaginationComponent /> */}
    </Segment>
  );
};

export default MovieByGenre;
