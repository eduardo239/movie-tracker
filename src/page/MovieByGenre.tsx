import LoadingInfo from "../components/LoadingInfo";
import MessageInfo from "../components/Message";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination, Segment } from "semantic-ui-react";
import { IMovieResults } from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";
import PaginationGenre from "../components/PaginationGenre";
import { useEffect, useState } from "react";
import TitleInfo from "../components/TitleInfo";
import PaginationBar from "../components/PaginationBar";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const MovieByGenre = () => {
  const { id } = useParams();

  const { mediaType } = useMovie();

  const [page, setPage] = useState(1);
  const [genreName, setGenreName] = useState<string | null>(null);

  const genreUrl = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&with_genres=${id}&page=${page}`;
  const { data, loading, error } = useFetch<IMovieResults>(genreUrl);

  useEffect(() => {
    if (id) {
      const _genreName = genres.filter((x) => x.id === +id)[0];
      if (_genreName) setGenreName(_genreName.name);
    }
  }, [id]);

  if (loading) return <LoadingInfo />;
  if (error) return <MessageInfo message={error.message} />;

  return (
    <Segment inverted basic style={{ margin: 0 }}>
      {genreName && <TitleInfo center as="h1" title={genreName} />}

      <PaginationBar
        page={page}
        setPage={setPage}
        url={`/genre/${id}?page=${page}`}
      />

      <GridContainer centered gap="gap-sm">
        <DataGroup data={data ? data.results : []} />
      </GridContainer>

      <PaginationBar
        page={page}
        setPage={setPage}
        url={`/genre/${id}?page=${page}`}
      />
    </Segment>
  );
};

export default MovieByGenre;
