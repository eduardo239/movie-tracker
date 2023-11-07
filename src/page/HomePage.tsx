import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IMovieDetails, IMovieResults } from "../abstract/interfaces";
import { getSearch } from "../fetch/tmdb";
import useFetch from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import {
  Button,
  Dimmer,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Loader,
  Message,
  Segment,
  Select,
} from "semantic-ui-react";
import MessageInfo from "../components/Message";
import LoadingInfo from "../components/LoadingInfo";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const HomePage = () => {
  const { mediaType, setMediaType } = useMovie();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get the 'page' query parameter
  const pageQuery = queryParams.get("page");
  const pageMediaType = queryParams.get("media");

  const [searchResults, setSearchResults] = useState<IMovieDetails[] | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");

  const { data, loading, error } = useFetch<IMovieResults | null>(
    `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&language=en-US&page=${page}`
  );

  const options = [
    { key: "movie", text: "Movie", value: "movie" },
    { key: "tv", text: "TV", value: "tv" },
  ];

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      setSearchResults(null);
      navigate(`/all?media=${mediaType}&page=${page}`);
      return;
    }

    const data = await getSearch(mediaType, search, page);
    setSearchResults(data);
    setPage(1);
    navigate(`/search?page=${page}`);
  };

  const onPageChange = async (_page: number) => {
    if (searchResults) {
      setPage(_page);
      navigate(`/search?page=${_page}`);

      const data = await getSearch(mediaType, search, page);
      setSearchResults(data);
    } else {
      setPage(_page);
      navigate(`/all?media=${mediaType}&page=${_page}`);
    }
  };

  const onMediaChange = (_media: "movie" | "tv") => {
    setMediaType(_media);
    navigate(`/all?media=${mediaType}&page=${page}`);
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    // on home click, fetch default
    if (pageQuery) setPage(parseInt(pageQuery));
  }, [pageQuery]);

  if (loading) return <LoadingInfo />;

  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        <Form onSubmit={(e) => onSearchSubmit(e)}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fluid
            type="text"
            placeholder="Search..."
            action
          >
            <input />
            <Select
              onChange={() => setMediaType("tv")}
              compact
              options={options}
              defaultValue="movie"
            />
            <Button type="submit">Search</Button>
          </Input>
        </Form>

        <Segment basic textAlign="center">
          <Button
            icon
            labelPosition="left"
            onClick={() => onMediaChange("movie")}
          >
            <Icon name="film" />
            Movie
          </Button>
          <Button icon labelPosition="left" onClick={() => onMediaChange("tv")}>
            <Icon name="television" />
            TV
          </Button>
        </Segment>

        <Segment basic textAlign="center">
          <Button
            icon
            labelPosition="left"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <Icon name="arrow left" />
            Previous
          </Button>
          <Button
            icon
            labelPosition="left"
            onClick={() => onPageChange(page + 1)}
          >
            <Icon name="arrow right" />
            Next
          </Button>
        </Segment>

        {searchResults ? (
          <Segment textAlign="center">
            <Grid columns={5}>
              {searchResults &&
                searchResults.map((item) => (
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={4}
                    key={item.id}
                  >
                    <Link to={`/${mediaType}?id=${item.id}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        size="medium"
                      />
                    </Link>
                  </Grid.Column>
                ))}
            </Grid>
          </Segment>
        ) : (
          <Segment textAlign="center">
            <Grid columns={5}>
              {data?.results &&
                data.results.map((item) => (
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={4}
                    key={item.id}
                  >
                    <Link to={`/${mediaType}?id=${item.id}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        size="medium"
                      />
                    </Link>
                  </Grid.Column>
                ))}
            </Grid>
          </Segment>
        )}

        <Segment textAlign="center">
          <Button
            icon
            labelPosition="left"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <Icon name="arrow left" />
            Previous
          </Button>
          <Button
            icon
            labelPosition="left"
            onClick={() => onPageChange(page + 1)}
          >
            <Icon name="arrow right" />
            Next
          </Button>
        </Segment>
      </>
    );
  else return null;
};

export default HomePage;
