import { useEffect } from "react";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import useFetch from "../hooks/useFetch";
import { useParams, useSearchParams } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import PaginationComponent from "../components/PaginationComponent";
import PosterLink from "../components/PosterLink";
import { IMovieResults } from "../abstract/interfaces";

// https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const MovieByGenre = () => {
  const { id } = useParams();

  const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`;

  const { data, loading, error } = useFetch<IMovieResults>(genreUrl);

  useEffect(() => {
    return () => {};
  }, []);

  console.log(data);
  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <Segment textAlign="center">
      {/* <PaginationComponent /> */}

      <Segment basic style={{ margin: 0 }}>
        <Grid columns={5}>
          {data?.results &&
            data.results.map((x) => (
              <Grid.Column mobile={8} tablet={5} computer={4} key={x.id}>
                <PosterLink
                  id={x.id}
                  poster={x.poster_path}
                  mediaType="movie"
                />
              </Grid.Column>
            ))}
        </Grid>
      </Segment>

      {/* <PaginationComponent /> */}
    </Segment>
  );
};

export default MovieByGenre;
