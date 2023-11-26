import { Link } from "react-router-dom";
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
  return (
    <Link to={`/${mediaType}?id=${id}`}>
      <DataPoster data={{ poster_path: poster }} />
    </Link>
  );
};

export default PosterLink;
