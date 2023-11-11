import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieDetails, IMovieTrailers } from "../abstract/interfaces";
import { fetchTrailers } from "../fetch/tmdb";
import MovieOptions from "../components/MovieOptions";
import DataPoster from "../components/DataPoster";
import DataTrailer from "../components/DataTrailer";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { Divider, Grid, Segment } from "semantic-ui-react";
import DataDetails from "../components/DataDetails";
import DataRating from "../components/DataRating";
import DataCast from "../components/DataCast";
import DataInfo from "../components/DataInfo";
import DataGenre from "../components/DataGenre";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const MoviePage = () => {
  const [id, _] = useSearchParams();
  const [trailers, setTrailers] = useState<IMovieTrailers | null>(null);

  const { data, loading, error } = useFetch<IMovieDetails | null>(
    `${tmdbBaseUrl}/movie/${id.get(
      "id"
    )}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`
  );

  useEffect(() => {
    (async () => {
      const f = await fetchTrailers("movie", id.get("id"));
      setTrailers(f.data);
    })();
  }, [id]);
  console.log(data);

  if (loading) return <LoadingInfo />;

  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <Segment textAlign="center">
        <Grid>
          <Grid.Row>
            {/*  */}
            <Grid.Column width={16}>
              <DataTrailer
                hidden={false}
                trailerKey={
                  trailers?.results[trailers?.results.length - 1]?.key
                }
              />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={4} textAlign="left">
              <DataPoster data={data} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={12} textAlign="left">
              <DataDetails
                data={{
                  title: data.title,
                  original_title: data.original_title,
                  overview: data.overview,
                  release_date: data.release_date,
                }}
              />
              <DataRating
                data={{
                  runtime: data.runtime,
                  vote_average: data.vote_average,
                }}
              />

              <DataGenre genres={data.genres} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={16} textAlign="center">
              <MovieOptions movie={data} />
            </Grid.Column>

            <Grid.Column width={16} textAlign="center">
              <DataInfo
                data={{
                  release_date: data.release_date,
                  status: data.status,
                  original_language: data.original_language,
                }}
              />
              <DataCast data={{ credits: data.credits }} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  else return null;
};

export default MoviePage;
