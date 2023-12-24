import { Statistic } from "semantic-ui-react";

type TDataRating = {
  runtime?: number;
  vote_average: number;
  episodes?: number;
  seasons?: number;
};

const DataRating = ({ data }: { data: TDataRating }) => {
  const checkRating = (rating: number) => {
    if (rating > 8) {
      return "label-success";
    } else if (rating > 5) {
      return "label-warning";
    } else {
      return "label-danger";
    }
  };

  if (data)
    return (
      <div className="p-4 my-2 app-dark-theme">
        <Statistic horizontal inverted>
          <Statistic.Group size="tiny">
            <Statistic>
              <Statistic.Value>
                <span className={checkRating(data.vote_average)}>
                  {data.vote_average.toFixed(2)}
                </span>
              </Statistic.Value>
              <Statistic.Label>Avaliação</Statistic.Label>
            </Statistic>
            {data.seasons && (
              <Statistic>
                <Statistic.Value>{data.seasons}</Statistic.Value>
                <Statistic.Label>Temporadas</Statistic.Label>
              </Statistic>
            )}

            {data.episodes && (
              <Statistic>
                <Statistic.Value>{data.episodes}</Statistic.Value>
                <Statistic.Label>Episódios</Statistic.Label>
              </Statistic>
            )}

            {data.runtime && (
              <Statistic>
                <Statistic.Value>{data.runtime}</Statistic.Value>
                <Statistic.Label>Duração (min)</Statistic.Label>
              </Statistic>
            )}
          </Statistic.Group>
        </Statistic>
      </div>
    );
};

export default DataRating;
