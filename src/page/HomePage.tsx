import MoviePage from "./MoviesPage";
import TvPage from "./TvPage";
import HomeSearch from "../components/HomeSearch";
import { useMovie } from "../context/MovieContext";
import MediaType from "../components/MediaType";

const HomePage = () => {
  const { mediaType } = useMovie();

  return (
    <>
      <HomeSearch />
      <MediaType />
      {mediaType === "movie" && <MoviePage />}
      {mediaType === "tv" && <TvPage />}
    </>
  );
};

export default HomePage;
