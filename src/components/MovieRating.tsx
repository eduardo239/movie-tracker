import { IMovieDetails } from "../abstract/interfaces";
import RoundedStatus from "./RoundedStatus";

const MovieRating = ({ data }: { data: IMovieDetails | null }) => {
  if (data)
    return (
      <section>
        <RoundedStatus label="Runtime" value={data.runtime} />
        <RoundedStatus label="Rating" value={+data.vote_average.toFixed(2)} />
      </section>
    );
};

export default MovieRating;
