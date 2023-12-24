import MoviePage from "./MoviesPage";
import TvPage from "./TvPage";
import SearchBar from "../components/Layout/SearchBar";
import { useMovie } from "../context/MovieContext";
import MediaType from "../components/MediaType";
import { MEDIA_MOVIE, MEDIA_TV } from "../abstract/constants";

const HomePage = () => {
  const { mediaType } = useMovie();

  return (
    <>
      <SearchBar />
      <MediaType />

      {mediaType === MEDIA_MOVIE && <MoviePage />}
      {mediaType === MEDIA_TV && <TvPage />}
    </>
  );
};

export default HomePage;
