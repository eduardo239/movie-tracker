import useFetch from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import { Card, Divider, Grid, Header, Segment } from "semantic-ui-react";
import PosterLink from "./PosterLink";
import { IMovieResults } from "../abstract/interfaces";
import LoadingInfo from "./LoadingInfo";
import MessageInfo from "./Message";

const DataSimilar = ({ id }: { id: number }) => {
  const { mediaType } = useMovie();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const similarUrl = `${tmdbBaseUrl}/${mediaType}/${id}/similar?api_key=${apiKey}&language=pt-BR&include_adult=${false}&page=${1}`;

  const { data, loading, error } = useFetch<IMovieResults | null>(similarUrl);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        <Divider />
        <Header as="h3" inverted>
          Similar
        </Header>

        <Segment basic style={{ margin: 0 }}>
          <Card.Group className="gap-md flex flex-center">
            {data?.results &&
              data.results
                .map((x) => {
                  return (
                    <PosterLink
                      id={x.id}
                      poster={x.poster_path}
                      mediaType={mediaType}
                    />
                  );
                })
                .slice(0, 10)}
          </Card.Group>
        </Segment>
      </>
    );
  else return null;
};

export default DataSimilar;
