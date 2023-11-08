import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  IMovieTrailers,
  ITrackerEpisodes,
  ITvDetails,
} from "../abstract/interfaces";
import { fetchTrailers } from "../fetch/tmdb";
import TvCast from "../components/TvCast";
import TvRating from "../components/TvRating";
import MovieTrailer from "../components/MovieTrailer";
import TvPoster from "../components/TvPoster";
import useFetch from "../hooks/useFetch";
import TvDetails from "../components/TvDetails";
import TvEpisodes from "../components/TvEpisodes";
import { Divider, Grid, Segment } from "semantic-ui-react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiToken = import.meta.env.VITE_TMDB_API_TOKEN;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const TvPage = () => {
  const [id, _] = useSearchParams();
  const [trailers, setTrailers] = useState<IMovieTrailers | null>(null);

  const { data, loading, error } = useFetch<ITvDetails | null>(
    `${tmdbBaseUrl}/tv/${id.get("id")}?api_key=${apiKey}&language=pt-BR`
  );

  useEffect(() => {
    (async () => {
      const f = await fetchTrailers("tv", id.get("id"));
      setTrailers(f.data);
    })();
  }, [id]);

  if (loading)
    return (
      <section>
        <div></div>
      </section>
    );

  if (error)
    return (
      <section>
        <div>{error.message}</div>
      </section>
    );

  if (data)
    return (
      <Segment textAlign="center">
        <Grid>
          <Grid.Row>
            {/*  */}
            <Grid.Column width={16}>
              <MovieTrailer
                hidden={false}
                trailerKey={
                  trailers?.results[trailers?.results.length - 1]?.key
                }
              />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={4} textAlign="left">
              <TvPoster data={data} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={12} textAlign="left">
              <TvDetails data={data} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={16} textAlign="center">
              <Divider />
              Options
              <Divider />
            </Grid.Column>
            <Grid.Column width={16} textAlign="center">
              <TvRating data={data} />
            </Grid.Column>
            <Grid.Column width={16} textAlign="center">
              <Divider />
              {/* <MovieCast data={data} /> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <TvCast data={data} />

        <TvEpisodes data={data} />
      </Segment>
    );
  else return null;
};

export default TvPage;
