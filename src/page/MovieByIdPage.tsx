import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieDetails } from "../abstract/interfaces";
import MovieOptions from "../components/MovieOptions";
import DataPoster from "../components/DataPoster";
import DataTrailer from "../components/DataTrailer";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/Elements/LoadingInfo";
import MessageInfo from "../components/Info/Message";
import { Divider, Grid } from "semantic-ui-react";
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
    // load data when similar movie is selected
    const _id = params.get("id");
    if (_id) setId(_id);

    return () => {};
  }, [params]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <Grid>
        <Grid.Row>
          {/*  */}
          {/* -------------- trailer --------------   */}
          <Grid.Column width={16}>
            <DataTrailer mediaType="movie" id={params.get("id") + ""} />
          </Grid.Column>
          {/* -------------- poster --------------   */}
          <Grid.Column textAlign="center" mobile={16} tablet={4} computer={4}>
            <DataPoster data={data} />
          </Grid.Column>
          {/* -------------- details --------------   */}
          <Grid.Column textAlign="left" mobile={16} tablet={12} computer={12}>
            <DataDetails
              data={{
                title: data.title,
                original_title: data.original_title,
                overview: data.overview,
                release_date: data.release_date,
              }}
            />
            {/* -------------- rating --------------   */}
            <div className="p-2"></div>
            <DataRating
              data={{
                runtime: data.runtime,
                vote_average: data.vote_average,
              }}
            />

            {/* -------------- genres --------------   */}
            <div className="p-2"></div>
            <DataGenre genres={data.genres} />
          </Grid.Column>
          {/* -------------- options --------------   */}
          <Grid.Column width={16} textAlign="center">
            <MovieOptions data={data} />
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
            <Divider />
            <DataCast data={{ credits: data.credits }} />
            {/* -------------- similar --------------   */}

            <Divider />
            <DataSimilar id={data.id} mediaType="movie" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  else return null;
};

export default MovieByIdPage;
