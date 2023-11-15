import { useSearchParams } from "react-router-dom";
import { ITvDetails } from "../abstract/interfaces";

import DataTrailer from "../components/DataTrailer";
import useFetch from "../hooks/useFetch";
import TvEpisodes from "../components/TvEpisodes";
import { Divider, Grid, Segment } from "semantic-ui-react";
import DataDetails from "../components/DataDetails";
import DataRating from "../components/DataRating";
import DataInfo from "../components/DataInfo";
import DataCast from "../components/DataCast";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import DataPoster from "../components/DataPoster";
import DataGenre from "../components/DataGenre";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const TvPage = () => {
  const [id, _] = useSearchParams();

  const { data, loading, error } = useFetch<ITvDetails | null>(
    `${tmdbBaseUrl}/tv/${id.get(
      "id"
    )}?api_key=${apiKey}&language=pt-BR&append_to_response=credits`
  );

  useEffect(() => {
    if (data) {
      document.title = data.original_name;
    }

    return () => {
      document.title = "Movie Tracker";
    };
  }, [data]);

  if (loading) return <LoadingInfo />;

  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <Segment textAlign="center">
        <Grid>
          <Grid.Row>
            {/*  */}
            <Grid.Column width={16}>
              <DataTrailer mediaType="tv" id={id.get("id") + ""} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={4} textAlign="left">
              <DataPoster data={data} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={12} textAlign="left">
              <DataDetails
                data={{
                  title: data.name,
                  original_title: data.original_name,
                  overview: data.overview,
                  release_date: data.first_air_date,
                }}
              />
              <DataRating
                data={{
                  seasons: data.number_of_seasons,
                  episodes: data.number_of_episodes,
                  vote_average: data.vote_average,
                }}
              />

              <DataGenre genres={data.genres} />
            </Grid.Column>
            {/*  */}
            <Grid.Column width={16} textAlign="center">
              <Divider />
              Options
            </Grid.Column>
            {/*  */}
            <Grid.Column width={16} textAlign="center">
              <Divider />

              <DataInfo
                data={{
                  release_date: data.first_air_date,
                  status: data.status,
                  original_language: data.original_language,
                }}
              />
              <DataCast data={{ credits: data.credits }} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <TvEpisodes data={data} />
      </Segment>
    );
  else return null;
};

export default TvPage;
