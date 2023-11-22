import { useEffect } from "react";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { Grid, Segment } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import PosterLink from "../components/PosterLink";
import PaginationComponent from "../components/PaginationComponent";

const MoviePage = () => {
  const { data, loading, error, page, mediaType, setMediaType, setPage } =
    useMovie();

  useEffect(() => {
    setMediaType("movie");
    if (page && page !== 1) setPage(page);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <Segment textAlign="center" inverted>
      <PaginationComponent />

      <Segment basic style={{ margin: 0 }}>
        <Grid columns={5}>
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
        </Grid>
      </Segment>

      <PaginationComponent />
    </Segment>
  );
};

export default MoviePage;
