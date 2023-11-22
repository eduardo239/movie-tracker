import useFetch from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import { Grid, Header, Segment } from "semantic-ui-react";
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
      <Segment basic style={{ margin: 0 }}>
        <Grid columns={5}>
          {data?.results &&
            data.results
              .map((x) => (
                <Grid.Column mobile={8} tablet={5} computer={4} key={x.id}>
                  <PosterLink
                    id={x.id}
                    poster={x.poster_path}
                    mediaType={mediaType}
                  />
                </Grid.Column>
              ))
              .slice(0, 4)}
        </Grid>
      </Segment>
    );
  else return null;
};

export default DataSimilar;
