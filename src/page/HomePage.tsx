import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { IMovieDetails, IMovieResults } from "../abstract/interfaces";
import { getSearch } from "../fetch/tmdb";
import useFetch from "../hooks/useFetch";
import { useMovie } from "../context/MovieContext";
import {
  Button,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Pagination,
  Segment,
  Select,
} from "semantic-ui-react";
import MessageInfo from "../components/Message";
import LoadingInfo from "../components/LoadingInfo";
import PaginationC from "../components/PaginationC";
import PosterHome from "../components/PosterHome";
import HomeSearch from "../components/HomeSearch";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const HomePage = () => {
  const { mediaType, setMediaType, searchResults } = useMovie();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get the 'page' query parameter
  const queryPage = queryParams.get("page");
  const queryMedia = queryParams.get("media");

  const [page, setPage] = useState<number>(1);

  const { data, loading, error } = useFetch<IMovieResults | null>(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=${apiKey}&language=pt-BR&page=${page}`
  );

  // const onPageChange = async (_page: string | number | undefined) => {
  //   if (_page) {
  //     if (searchResults) {
  //       setPage(+_page);
  //       navigate(`/search?page=${_page}`);

  //       const data = await getSearch(mediaType, search, page);
  //       setSearchResults(data);
  //     } else {
  //       setPage(+_page);
  //       navigate(`/all?media=${mediaType}&page=${_page}`);
  //     }
  //   }
  // };

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (queryPage) setPage(parseInt(queryPage));

    if (queryMedia) {
      if (queryMedia === "movie" || queryMedia === "tv") {
        setMediaType(queryMedia);
      }
    }

    return () => {
      // setSearchResults([]);
    };
  }, [queryPage, queryMedia, setMediaType]);

  if (loading) return <LoadingInfo />;

  if (error) return <MessageInfo message={error.message} />;

  if (data)
    return (
      <>
        <HomeSearch />

        <Segment basic textAlign="center">
          <Button
            icon
            labelPosition="left"
            onClick={() => navigate(`/all?media=movie&page=${page}`)}
          >
            <Icon name="film" />
            Movie
          </Button>
          <Button
            icon
            labelPosition="left"
            onClick={() => navigate(`/all?media=tv&page=${page}`)}
          >
            <Icon name="television" />
            TV
          </Button>
        </Segment>

        {/* <PaginationC onPageChange={onPageChange} /> */}

        {searchResults && searchResults.length > 0 ? (
          <Segment textAlign="center">
            <Grid columns={5}>
              {searchResults &&
                searchResults.map((y) => (
                  <Grid.Column mobile={8} tablet={5} computer={4} key={y.id}>
                    <PosterHome id={y.id} poster={y.poster_path} />
                  </Grid.Column>
                ))}
            </Grid>
          </Segment>
        ) : (
          <Segment textAlign="center">
            <Grid columns={5}>
              {data?.results &&
                data.results.map((x) => (
                  <Grid.Column mobile={8} tablet={5} computer={4} key={x.id}>
                    <PosterHome id={x.id} poster={x.poster_path} />
                  </Grid.Column>
                ))}
            </Grid>
          </Segment>
        )}
        {/* <PaginationC onPageChange={onPageChange} /> */}
      </>
    );
  else return null;
};

export default HomePage;
