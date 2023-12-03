import { Link } from "react-router-dom";
import DataPoster from "./DataPoster";

type TPosterLink = {
  id: number;
  poster: string | null;
  mediaType: "movie" | "tv";
};

const PosterLink = ({ id, poster, mediaType }: TPosterLink) => {
  return (
    <Link to={`/${mediaType}?id=${id}`} key={id}>
      <DataPoster data={{ poster_path: poster }} />
    </Link>
  );
};

export default PosterLink;
