import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/Elements/LoadingInfo";
import MessageInfo from "../components/Info/Message";
import { IMovieDetailsSimple, IPerson } from "../abstract/interfaces";
import { Divider, Grid, Tab } from "semantic-ui-react";
import { useEffect, useState } from "react";
import GridContainer from "../components/Layout/GridContainer";
import DataGroup from "../components/DataGroup";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import PersonInfo from "../components/Person/PersonInfo";
import PersonPoster from "../components/Person/PersonPoster";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;

const PersonPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { userTrackerTv, userTrackerMovie } = useMovie();

  const personUrl = `${tmdbBaseUrl}/person/${id}?api_key=${apiKey}&language=pt-BR&append_to_response=combined_credits`;

  const { data, loading, error } = useFetch<IPerson | null>(personUrl);

  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);

  const panes = [
    {
      menuItem: "Filmes",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <GridContainer centered gap="gap-sm">
            <DataGroup
              data={data ? movies : []}
              userTrackerList={userTrackerMovie}
            />
          </GridContainer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Séries",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <GridContainer centered gap="gap-sm">
            <DataGroup data={data ? tvs : []} userTrackerList={userTrackerTv} />
          </GridContainer>
        </Tab.Pane>
      ),
    },
  ];

  useEffect(() => {
    if (data) {
      const _movies = data.combined_credits.cast.filter(
        (x: IMovieDetailsSimple) => x.media_type === "movie"
      );
      setMovies(_movies);

      const _tvs = data.combined_credits.cast.filter(
        (x: IMovieDetailsSimple) => x.media_type === "tv"
      );
      setTvs(_tvs);
    }

    return () => {};
  }, [data]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        <Grid>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <PersonPoster data={data} />
          </Grid.Column>

          <Grid.Column mobile={16} tablet={12} computer={12}>
            <PersonInfo data={data} />

            <div>
              <code>ID # {data.id}</code>
            </div>
          </Grid.Column>
        </Grid>
        <Divider />

        <Tab
          menu={{
            color: "orange",
            pointing: true,
            inverted: true,
          }}
          panes={panes}
        />
      </>
    );
  else return null;
};

export default PersonPage;
