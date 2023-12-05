import { IMovieDetails } from "../abstract/interfaces";
import { getRandomNumberInRange } from "../helper";
import PosterLink from "./PosterLink";

type TDataGroup = {
  data: IMovieDetails[];
};

const DataGroup = ({ data }: TDataGroup) => {
  return (
    data &&
    data.map((x) => {
      const id = getRandomNumberInRange(0, 999999);

      return (
        <PosterLink
          key={x.id + id}
          id={x.id}
          poster={x.poster_path}
          mediaType={
            x.media_type ? x.media_type : "title" in x ? "movie" : "tv"
          }
        />
      );
    })
  );
};

export default DataGroup;
