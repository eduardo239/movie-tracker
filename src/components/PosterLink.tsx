import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { useMovie } from "../context/MovieContext";
import DataPoster from "./DataPoster";

const PosterLink = ({ id, poster }: { id: number; poster: string | null }) => {
  const { mediaType } = useMovie();

  return (
    <Link to={`/${mediaType}?id=${id}`}>
      <DataPoster data={{ poster_path: poster }} />
    </Link>
  );
};

export default PosterLink;
