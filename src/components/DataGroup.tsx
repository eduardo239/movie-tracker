import { IMovieDetails } from "../abstract/interfaces";
import PosterLink from "./PosterLink";

const DataGroup = ({
  data,
  mediaType,
}: {
  data: IMovieDetails[];
  mediaType: "tv" | "movie";
}) => {
  return (
    data &&
    data.map((x) => (
      <PosterLink id={x.id} poster={x.poster_path} mediaType={mediaType} />
    ))
  );
};

export default DataGroup;
