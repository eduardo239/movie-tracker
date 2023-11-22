import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieDetails } from "../abstract/interfaces";
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
import DataSimilar from "../components/DataSimilar";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const MovieByIdPage = () => {
  const [params, _] = useSearchParams();
  const [id, setId] = useState<string>(params.get("id") + "");

  const urlDefault = `${tmdbBaseUrl}/movie/${id}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`;

  const { data, loading, error } = useFetch<IMovieDetails | null>(urlDefault);

  useEffect(() => {
    if (data) document.title = data.original_title;
    return () => {
      document.title = "Movie Tracker";
    };
  }, [data]);

  useEffect(() => {
    const _id = params.get("id");
    if (_id) setId(_id);

    return () => {};
  }, [params]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <Segment textAlign="center" inverted basic>
        <Grid>
          <Grid.Row>
            {/*  */}
            <Grid.Column width={16}>
              {/* -------------- trailer --------------   */}
              <DataTrailer mediaType="movie" id={params.get("id") + ""} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={4} textAlign="left">
              {/* -------------- poster --------------   */}
              <DataPoster data={data} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={12} textAlign="left">
              {/* -------------- details --------------   */}
              <DataDetails
                data={{
                  title: data.title,
                  original_title: data.original_title,
                  overview: data.overview,
                  release_date: data.release_date,
                }}
              />
              {/* -------------- rating --------------   */}
              <DataRating
                data={{
                  runtime: data.runtime,
                  vote_average: data.vote_average,
                }}
              />

              {/* -------------- genres --------------   */}
              <DataGenre genres={data.genres} />
            </Grid.Column>
            {/* -------------- options --------------   */}
            <Grid.Column width={16} textAlign="center">
              <Divider />
              <MovieOptions movie={data} />
              <Divider />
            </Grid.Column>

            <Grid.Column width={16} textAlign="center">
              {/* -------------- info --------------   */}
              <DataInfo
                data={{
                  release_date: data.release_date,
                  status: data.status,
                  original_language: data.original_language,
                }}
              />
              {/* -------------- credits --------------   */}
              <DataCast data={{ credits: data.credits }} />
              {/* -------------- similar --------------   */}
              <Divider />
              <DataSimilar id={data.id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  else return null;
};

export default MovieByIdPage;
