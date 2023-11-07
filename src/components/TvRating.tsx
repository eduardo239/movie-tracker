import { Segment } from "semantic-ui-react";
import { ITvDetails } from "../abstract/interfaces";
import RoundedStatus from "./RoundedStatus";

const MovieRating = ({ data }: { data: ITvDetails }) => {
  return (
    <Segment>
      <RoundedStatus label="Seasons" value={data.number_of_seasons} />
      <RoundedStatus label="Episodes" value={data.number_of_episodes} />
      <RoundedStatus label="Rating" value={+data.vote_average.toFixed(2)} />
    </Segment>
  );
};

export default MovieRating;
