import { Segment, Statistic } from "semantic-ui-react";

const DataRating = ({
  data,
}: {
  data: {
    runtime?: number;
    vote_average: number;
    episodes?: number;
    seasons?: number;
  };
}) => {
  const checkRating = (rating: number) => {
    if (rating > 8) {
      return "green";
    } else if (rating > 5) {
      return "yellow";
    } else {
      return "orange";
    }
  };

  if (data)
    return (
      <Segment basic inverted>
        <Statistic horizontal inverted>
          <Statistic.Group size="tiny">
            <Statistic>
              <Statistic.Value>
                <span className={checkRating(data.vote_average)}>
                  {data.vote_average.toFixed(2)}
                </span>
              </Statistic.Value>
              <Statistic.Label>Rating</Statistic.Label>
            </Statistic>
            {data.seasons && (
              <Statistic>
                <Statistic.Value>{data.seasons}</Statistic.Value>
                <Statistic.Label>Seasons</Statistic.Label>
              </Statistic>
            )}

            {data.episodes && (
              <Statistic>
                <Statistic.Value>{data.episodes}</Statistic.Value>
                <Statistic.Label>Episodes</Statistic.Label>
              </Statistic>
            )}

            {data.runtime && (
              <Statistic>
                <Statistic.Value>{data.runtime}</Statistic.Value>
                <Statistic.Label>Runtime Min.</Statistic.Label>
              </Statistic>
            )}
          </Statistic.Group>
        </Statistic>
      </Segment>
    );
};

export default DataRating;
