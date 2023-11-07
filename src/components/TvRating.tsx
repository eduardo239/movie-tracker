import { ITvDetails } from "../abstract/interfaces";
import RoundedStatus from "./RoundedStatus";

const MovieRating = ({ data }: { data: ITvDetails }) => {
  return (
    <section>
      <RoundedStatus label="Seasons" value={data.number_of_seasons} />
      <RoundedStatus label="Episodes" value={data.number_of_episodes} />
      <RoundedStatus label="Rating" value={+data.vote_average.toFixed(2)} />
    </section>
  );
};

export default MovieRating;
