import { IMovieDetails } from "../abstract/interfaces";
import { getRandomNumberInRange } from "../helper";
import PosterLink from "./PosterLink";

type TDataGroup = {
  data: IMovieDetails[];
  mediaType: "tv" | "movie";
};

const DataGroup = ({ data, mediaType }: TDataGroup) => {
  return (
    data &&
    data.map((x) => {
      // const id = getRandomNumberInRange(0, 999999);
      return (
        <PosterLink
          key={x.id}
          id={x.id}
          poster={x.poster_path}
          mediaType={mediaType}
        />
      );
    })
  );
};

export default DataGroup;
