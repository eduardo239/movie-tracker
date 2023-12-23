import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/Elements/LoadingInfo";
import MessageInfo from "../components/Info/Message";
import { IMovieDetailsSimple, IPerson } from "../abstract/interfaces";
import { Divider, Grid, Header, Tab } from "semantic-ui-react";
import { useEffect, useState } from "react";
import GridContainer from "../components/Layout/GridContainer";
import DataGroup from "../components/DataGroup";
import TitleInfo from "../components/Elements/TitleInfo";
import { useMovie } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;
const profileDefaultUrl = import.meta.env.VITE_FIREBASE_PROFILE_DEFAULT_URL;

const PersonPage = () => {
  const { id } = useParams();

  const { userTrackerList, setUserTrackerList } = useMovie();
  const { getUserLists } = useData();
  const { user } = useAuth();

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
              userTrackerList={userTrackerList}
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
            <DataGroup
              data={data ? tvs : []}
              userTrackerList={userTrackerList}
            />
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

  const handleGetPersonList = async () => {
    const response = await getUserLists();
    if (response) setUserTrackerList(response);
    else setUserTrackerList([]);
  };

  useEffect(() => {
    if (user) {
      // handleGetUserWatchListAndReturn();
      handleGetPersonList();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        <Grid>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            {/* profileDefaultUrl */}
            <img
              src={`${
                data.profile_path
                  ? tmdbPosterUrl + data.profile_path
                  : profileDefaultUrl
              }`}
              alt={data.name}
              className="poster-lg"
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            <TitleInfo as="h1" title={data.name} />

            <p>
              Data de nascimento:{" "}
              {data.birthday ? data.biography : "Informação não encontrada."}
            </p>
            <p>
              Local de nascimento:{" "}
              {data.place_of_birth
                ? data.place_of_birth
                : "Informação não encontrada."}
            </p>
            <p>Popularidade: {data.popularity}</p>
            <Divider />
            {data.biography ? (
              <div>
                <TitleInfo title="Biografia" />

                <p style={{ fontSize: "1.15rem" }}>{data.biography}</p>
                <Divider />
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "1.15rem" }}>Biografia não encontrada.</p>
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
