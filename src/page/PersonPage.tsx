import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { IMovieDetailsSimple, IPerson } from "../abstract/interfaces";
import { Divider, Grid, Header, Tab } from "semantic-ui-react";
import { useEffect, useState } from "react";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";

const PersonPage = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const posterDefault = import.meta.env.VITE_TMDB_POSTER_URL;

  const { id } = useParams();
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
            <DataGroup data={data ? movies : []} />
          </GridContainer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Séries",
      render: () => (
        <Tab.Pane attached={false} inverted>
          <GridContainer centered gap="gap-sm">
            <DataGroup data={data ? tvs : []} />
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
      const _tvs = data.combined_credits.cast.filter(
        (x: IMovieDetailsSimple) => x.media_type === "tv"
      );

      setTvs(_tvs);
      setMovies(_movies);
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
            <img
              src={`${posterDefault}${data.profile_path}`}
              alt={data.name}
              className="poster-lg"
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            <Header as="h1" inverted>
              {data.name}
            </Header>

            <p>Data de nascimento: {data.birthday}</p>
            <p>Local de nascimento: {data.place_of_birth}</p>
            <p>Popularidade: {data.popularity}</p>
            <Divider />
            {data.biography && (
              <div>
                <Header as="h3" inverted>
                  Biografia
                </Header>
                <p style={{ fontSize: "1.15rem" }}>{data.biography}</p>
                <Divider />
              </div>
            )}
            <div>
              <code>ID # {data.id}</code>
            </div>
          </Grid.Column>
        </Grid>

        <Divider />
        <Tab
          menu={{
            color: "green",
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
