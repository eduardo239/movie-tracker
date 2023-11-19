import { Link } from "react-router-dom";
import { useMovie } from "../context/MovieContext";
import DataPoster from "./DataPoster";

const PosterLink = ({
  id,
  poster,
  mediaType,
}: {
  id: number;
  poster: string | null;
  mediaType: "movie" | "tv";
}) => {
  // const { mediaType } = useMovie();

  return (
    <Link to={`/${mediaType}?id=${id}`}>
      <DataPoster data={{ poster_path: poster }} />
    </Link>
  );
};

export default PosterLink;
