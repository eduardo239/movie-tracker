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
    <div>
      <PaginationComponent />
      <Segment textAlign="left" basic>
        <Grid centered>
          {data?.results &&
            data.results.map((x) => (
              <Grid.Column key={x.id} mobile={5} computer={3}>
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
    </div>
  );
};

export default MoviePage;
