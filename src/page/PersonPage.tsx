import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { IMovieDetailsSimple, IPerson } from "../abstract/interfaces";
import { Divider, Grid, Image, Item, Segment, Tab } from "semantic-ui-react";
import { useEffect, useState } from "react";
import PosterLink from "../components/PosterLink";

const PersonPage = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const posterDefault = import.meta.env.VITE_TMDB_POSTER_URL;
  const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;

  const { id } = useParams();

  const navigate = useNavigate();

  const personUrl = `${tmdbBaseUrl}/person/${id}?api_key=${apiKey}&language=pt-BR&append_to_response=combined_credits`;

  const { data, loading, error } = useFetch<IPerson | null>(personUrl);

  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);

  const panes = [
    {
      menuItem: "Movies",
      render: () => (
        <Tab.Pane attached={false}>
          {movies && movies.length > 0 && (
            <Grid columns={5}>
              {movies.map((x: IMovieDetailsSimple) => (
                <Grid.Column
                  mobile={8}
                  tablet={5}
                  computer={4}
                  key={Math.random()}
                >
                  <PosterLink
                    id={x.id}
                    poster={x.poster_path}
                    mediaType={x.media_type}
                  />
                </Grid.Column>
              ))}
            </Grid>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "TV",
      render: () => (
        <Tab.Pane attached={false}>
          {tvs && tvs.length > 0 && (
            <Grid columns={5}>
              {tvs.map((x: IMovieDetailsSimple) => (
                <Grid.Column
                  mobile={8}
                  tablet={5}
                  computer={4}
                  key={Math.random()}
                >
                  <PosterLink
                    id={x.id}
                    poster={x.poster_path}
                    mediaType={x.media_type}
                  />
                </Grid.Column>
              ))}
            </Grid>
          )}
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
      <div>
        <Segment style={{ margin: 0 }}>
          <Grid columns={16}>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <Image
                size="medium"
                src={`${posterDefault}${data.profile_path}`}
                alt={data.name}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={12} computer={12}>
              <h2>{data.name}</h2>
              <p>Data de nascimento: {data.birthday}</p>
              <p>Local de nascimento: {data.place_of_birth}</p>
              <p>Popularidade: {data.popularity}</p>
              <Divider />
              {data.biography && (
                <div>
                  <h4>Biografia</h4>
                  <p style={{ fontSize: "1.15rem" }}>{data.biography}</p>
                  <Divider />
                </div>
              )}
              <small>ID # {data.id}</small>
            </Grid.Column>
          </Grid>

          <Divider />
          <Tab
            menu={{ color: "orange", attached: false, tabular: false }}
            panes={panes}
          />
        </Segment>
      </div>
    );
  else return null;
};

export default PersonPage;
