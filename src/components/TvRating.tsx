import { Header, Segment, Statistic } from "semantic-ui-react";
import { ITvDetails } from "../abstract/interfaces";
import RoundedStatus from "./RoundedStatus";

const MovieRating = ({ data }: { data: ITvDetails }) => {
  return (
    <Segment basic>
      <Header as="h2">Rating</Header>

      <Statistic horizontal>
        <Statistic.Group size="tiny">
          <Statistic>
            <Statistic.Value>{data.number_of_seasons}</Statistic.Value>
            <Statistic.Label>Seasons</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{data.number_of_episodes}</Statistic.Value>
            <Statistic.Label>Episodes</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{+data.vote_average.toFixed(2)}</Statistic.Value>
            <Statistic.Label>Rating</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Statistic>
    </Segment>
  );
};

export default MovieRating;
