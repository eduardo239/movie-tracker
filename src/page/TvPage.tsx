import { useEffect } from "react";
import { IMovieResults } from "../abstract/interfaces";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { Grid, Segment } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import PosterLink from "../components/PosterLink";
import PaginationComponent from "../components/PaginationComponent";

const MoviePage = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

  const { page, setPage, setMovieData, setMediaType } = useMovie();

  const { data, loading, error } = useFetch<IMovieResults | null>(
    `${tmdbBaseUrl}/trending/tv/day?api_key=${apiKey}&language=pt-BR&page=${
      page ? page : 1
    }`
  );

  useEffect(() => {
    setMediaType("tv");
    if (data) setMovieData(data);
    if (page && page !== "1") setPage(page);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <Segment textAlign="center">
      <PaginationComponent />

      <Segment basic style={{ margin: 0 }}>
        <Grid columns={5}>
          {data?.results &&
            data.results.map((x) => (
              <Grid.Column mobile={8} tablet={5} computer={4} key={x.id}>
                <PosterLink id={x.id} poster={x.poster_path} />
              </Grid.Column>
            ))}
        </Grid>
      </Segment>

      <PaginationComponent />
    </Segment>
  );
};

export default MoviePage;
