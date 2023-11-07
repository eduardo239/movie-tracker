import { Segment, Statistic } from "semantic-ui-react";
import { IMovieDetails } from "../abstract/interfaces";
import RoundedStatus from "./RoundedStatus";

const MovieRating = ({ data }: { data: IMovieDetails | null }) => {
  if (data)
    return (
      <>
        {/* <RoundedStatus label="Runtime" value={data.runtime} />
        <RoundedStatus label="Rating" value={+data.vote_average.toFixed(2)} /> */}
        <Statistic horizontal>
          <Statistic.Group size="tiny">
            <Statistic>
              <Statistic.Value>{data.runtime}</Statistic.Value>
              <Statistic.Label>Runtime</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{+data.vote_average.toFixed(2)}</Statistic.Value>
              <Statistic.Label>Rating</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Statistic>
      </>
    );
};

export default MovieRating;
