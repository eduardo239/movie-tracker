import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ITvDetails } from "../abstract/interfaces";
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
import TvOptions from "../components/TvOptions";
import DataSimilar from "../components/DataSimilar";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const TvByIdPage = () => {
  const [params, _] = useSearchParams();
  const [id, setId] = useState<string>(params.get("id") + "");

  const urlDefault = `${tmdbBaseUrl}/tv/${id}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`;

  const { data, loading, error } = useFetch<ITvDetails | null>(urlDefault);

  useEffect(() => {
    if (data) document.title = data.original_name;
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
      <Grid>
        <Grid.Row>
          {/* -------------- trailer --------------   */}
          <Grid.Column width={16}>
            <DataTrailer mediaType="tv" id={params.get("id") + ""} />
          </Grid.Column>
          {/* -------------- poster --------------   */}
          <Grid.Column textAlign="center" mobile={16} tablet={4} computer={4}>
            <DataPoster data={data} />
          </Grid.Column>
          {/* -------------- details --------------   */}
          <Grid.Column textAlign="left" mobile={16} tablet={12} computer={12}>
            <DataDetails
              data={{
                title: data.name,
                original_title: data.original_name,
                overview: data.overview,
                release_date: data.first_air_date,
              }}
            />
            {/* -------------- rating --------------   */}
            <DataRating
              data={{
                runtime: data.number_of_episodes,
                vote_average: data.vote_average,
              }}
            />

            {/* -------------- genres --------------   */}
            <DataGenre genres={data.genres} />
          </Grid.Column>

          {/* -------------- options --------------   */}
          <Grid.Column width={16} textAlign="center">
            <Divider />
            <TvOptions data={data} />
            <Divider />
          </Grid.Column>

          <Grid.Column width={16} textAlign="center">
            {/* -------------- info --------------   */}
            <DataInfo
              data={{
                release_date: data.first_air_date,
                status: data.status,
                original_language: data.original_language,
              }}
            />
            {/* -------------- credits --------------   */}
            <DataCast data={{ credits: data.credits }} />
            {/* -------------- similar --------------   */}

            <DataSimilar id={data.id} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  else return null;
};

export default TvByIdPage;
