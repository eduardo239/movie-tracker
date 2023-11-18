import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import { IMovieDetailsSimple, IPerson } from "../abstract/interfaces";
import { Divider, Grid, Image, Item, Segment } from "semantic-ui-react";

const PersonPage = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const posterDefault = import.meta.env.VITE_TMDB_POSTER_URL;
  const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;

  const { id } = useParams();

  const navigate = useNavigate();

  const personUrl = `${tmdbBaseUrl}/person/${id}?api_key=${apiKey}&language=pt-BR&append_to_response=combined_credits`;

  const { data, loading, error } = useFetch<IPerson | null>(personUrl);

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
                alt=""
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={12} computer={12}>
              <p>
                <small># {data.id}</small>
              </p>
              <h2>{data.name}</h2>
              <p>Data de nascimento: {data.birthday}</p>
              <p>Local de nascimento: {data.place_of_birth}</p>
              <p>Popularidade: {data.popularity}</p>
            </Grid.Column>
          </Grid>

          <Divider />

          <Item.Group link>
            {data &&
              data.combined_credits.cast.map(
                (movie: IMovieDetailsSimple, i: number) => (
                  <Item
                    onClick={() =>
                      navigate(
                        `/${movie.media_type === "movie" ? "movie" : "tv"}?id=${
                          movie.id
                        }`
                      )
                    }
                    key={movie.id}
                  >
                    {movie.poster_path ? (
                      <Item.Image
                        size="tiny"
                        src={`${posterDefault}${movie.poster_path}`}
                      />
                    ) : (
                      <Item.Image size="tiny" src={fbPosterDefault} />
                    )}
                    <Item.Content>
                      <small>
                        # {i} {movie.id}
                      </small>
                      <br />
                      <Item.Header>
                        {movie.media_type === "movie"
                          ? movie.title
                          : movie.name}
                      </Item.Header>
                      <Item.Description>
                        {movie.media_type === "movie"
                          ? movie.release_date
                          : movie.first_air_date}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                )
              )}
          </Item.Group>
        </Segment>
      </div>
    );
  else return null;
};

export default PersonPage;
